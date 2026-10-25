'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 44 },
  down: { x: 0, y: -44 },
  left: { x: 44, y: 0 },
  right: { x: -44, y: 0 },
  none: { x: 0, y: 0 },
};

export function Reveal({
  children,
  className,
  as = 'div',
  direction = 'up',
  delay = 0,
  duration = 0.9,
  blur = false,
  distance,
  once = true,
  amount = 0.25,
  style,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'span' | 'li' | 'header' | 'article' | 'footer' | 'p' | 'aside' | 'h2';
  direction?: Direction;
  delay?: number;
  duration?: number;
  blur?: boolean;
  once?: boolean;
  amount?: number;
  distance?: number;
  style?: React.CSSProperties;
  [key: string]: unknown;
}) {
  const reduce = useReducedMotion();
  const base = offsets[direction];
  const resolved = distance ?? (Math.abs(base.x) || Math.abs(base.y) || 44);
  const dx = base.x === 0 ? 0 : base.x > 0 ? resolved : -resolved;
  const dy = base.y === 0 ? 0 : base.y > 0 ? resolved : -resolved;

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: dx,
      y: dy,
      filter: blur ? 'blur(8px)' : undefined,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: reduce ? 0 : duration, delay: reduce ? 0 : delay, ease: EASE },
    },
  };

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      data-motion-reveal=""
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

export function MaskLine({
  children,
  className,
  as = 'span',
  delay = 0,
  duration = 1,
  yOffset = '112%',
  once = true,
  amount = 0,
}: {
  children: ReactNode;
  className?: string;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p';
  delay?: number;
  duration?: number;
  yOffset?: string;
  once?: boolean;
  amount?: number;
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <span className={className ? `${className} reveal-mask` : 'reveal-mask'} aria-hidden="true">
      <MotionTag
        className="reveal-mask__inner"
        initial={{ y: yOffset }}
        whileInView={{ y: '0%' }}
        viewport={{ once, amount }}
        transition={{ duration: reduce ? 0 : duration, delay: reduce ? 0 : delay, ease: EASE }}
      >
        {children}
      </MotionTag>
    </span>
  );
}

export function Stagger({
  children,
  className,
  as = 'div',
  delay = 0,
  stagger = 0.08,
  once = true,
  amount = 0,
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'span' | 'ul';
  delay?: number;
  stagger?: number;
  once?: boolean;
  amount?: number;
}) {
  const reduce = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: delay },
    },
  };

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerItem({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'span' | 'li' | 'article';
}) {
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      data-motion-reveal=""
      variants={{
        hidden: { opacity: 0, y: 32 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
      }}
    >
      {children}
    </MotionTag>
  );
}
