'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';

import { EASE_OUT, SECTION, viewportOnce } from '@/lib/motion';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds. Use small increments (0.06-0.1) to stagger sibling reveals. */
  delay?: number;
  /** Direction the element rises from. `none` fades only. */
  from?: 'up' | 'none';
  as?: 'div' | 'section' | 'li' | 'article' | 'header';
}

/**
 * Fade + slide-up as the element enters the viewport, once.
 *
 * With `prefers-reduced-motion` the element renders in its final state
 * immediately - no transform, no opacity ramp, nothing to wait for.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  from = 'up',
  as = 'div',
}: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const variants: Variants = {
    hidden: { opacity: 0, y: from === 'up' ? 18 : 0 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: SECTION, ease: EASE_OUT, delay },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {children}
    </MotionTag>
  );
}
