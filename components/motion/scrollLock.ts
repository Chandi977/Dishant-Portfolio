type ScrollSource = {
  stop: () => void;
  start: () => void;
};

let source: ScrollSource | null = null;
let depth = 0;
let teardown: Array<() => void> = [];

const BLOCKED_KEYS = new Set([
  ' ',
  'Spacebar',
  'ArrowUp',
  'ArrowDown',
  'PageUp',
  'PageDown',
  'Home',
  'End',
]);

/** The smooth-scroll instance is shared so locks can freeze and release it. */
export function registerScrollSource(next: ScrollSource | null) {
  source = next;
}

export function isScrollLocked() {
  return depth > 0;
}

/** Freezes the page so a section can finish its animation before scrolling on. */
export function lockScroll() {
  depth += 1;
  if (depth > 1) return;

  source?.stop();

  const blockWheel = (event: WheelEvent) => event.preventDefault();
  const blockTouch = (event: TouchEvent) => event.preventDefault();
  const blockKeys = (event: KeyboardEvent) => {
    if (BLOCKED_KEYS.has(event.key)) event.preventDefault();
  };

  window.addEventListener('wheel', blockWheel, { passive: false, capture: true });
  window.addEventListener('touchmove', blockTouch, { passive: false, capture: true });
  window.addEventListener('keydown', blockKeys, { capture: true });

  // Lenis hides the scrollbar when it stops, which would reflow the page.
  // Keeping the scroll gutter reserved avoids that jump.
  const html = document.documentElement;
  html.style.setProperty('overflow-y', 'scroll');
  html.style.setProperty('overflow-x', 'hidden');

  teardown = [
    () => window.removeEventListener('wheel', blockWheel, { capture: true }),
    () => window.removeEventListener('touchmove', blockTouch, { capture: true }),
    () => window.removeEventListener('keydown', blockKeys, { capture: true }),
    () => {
      html.style.removeProperty('overflow-y');
      html.style.removeProperty('overflow-x');
    },
  ];
}

/** Releases the page once the section animation has finished. */
export function unlockScroll() {
  if (depth === 0) return;
  depth -= 1;
  if (depth > 0) return;

  teardown.forEach((dispose) => dispose());
  teardown = [];
  source?.start();
}
