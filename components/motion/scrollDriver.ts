type ScrollSubscriber = () => void;

const subscribers = new Set<ScrollSubscriber>();

/** One page scroll source fans out updates to the custom scroll scenes. */
export function subscribeToScroll(update: ScrollSubscriber) {
  subscribers.add(update);
  update();
  return () => subscribers.delete(update);
}

export function updateScrollScenes() {
  subscribers.forEach((update) => update());
}
