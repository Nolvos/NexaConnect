'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

import { EASE_OUT } from '@/lib/motion';

interface StatCounterProps {
  /**
   * CONTENT RULE: pass `null` until the business supplies a real figure. A null
   * value renders a visible `[X]` placeholder instead of a number, so nothing
   * fabricated ever ships. The count-up runs the moment a real number is set.
   */
  value: number | null;
  label: string;
  suffix?: string;
}

export default function StatCounter({ value, label, suffix = '' }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (value === null || !inView) return;
    if (reduced) {
      setShown(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.4,
      ease: EASE_OUT,
      onUpdate: (v) => setShown(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduced]);

  return (
    <div ref={ref}>
      <p className="font-display text-[2rem] font-semibold leading-none tracking-tight text-pine tabular-nums sm:text-[2.5rem]">
        {value === null ? '[X]' : shown}
        <span className="text-signal-deep">{suffix}</span>
      </p>
      <p className="mt-2 font-mono text-[0.6875rem] uppercase tracking-label text-ink-soft">
        {label}
      </p>
    </div>
  );
}
