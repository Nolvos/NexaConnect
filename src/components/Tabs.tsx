'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion';

import { EASE_OUT, MICRO } from '@/lib/motion';
import { cn } from '@/lib/cn';

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

/** How far a panel travels on the way in and out. */
const SLIDE = 24;

/*
 * Panels travel in the direction you moved: pick a tab to the right and the new
 * panel comes in from the right while the old one leaves to the left, so the
 * motion matches the tablist you just clicked.
 *
 * The exit is deliberately faster than the enter (~55%) - outgoing content that
 * lingers reads as lag, incoming content that takes its time reads as composure.
 */
const panelVariants: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir >= 0 ? SLIDE : -SLIDE }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.34, ease: EASE_OUT },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir >= 0 ? -SLIDE : SLIDE,
    transition: { duration: 0.18, ease: EASE_OUT },
  }),
};

/**
 * Accessible tabs with a sliding indicator and an animated panel height.
 *
 * Follows the WAI-ARIA tabs pattern: roving tabindex, arrow/Home/End keys, and
 * `aria-controls` wiring. The indicator uses `layoutId` so it travels between
 * tabs rather than jumping.
 */
export default function Tabs({ items }: { items: TabItem[] }) {
  // Direction is stored alongside the index so the panel variants know which
  // way to travel; a plain `active` number can't tell you where it came from.
  const [[active, direction], setActive] = useState<[number, number]>([0, 0]);
  const uid = useId();
  const reduced = useReducedMotion();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | null>(null);

  /*
   * Only one panel is mounted at a time so the panels can animate between each
   * other, so the panel id has to be stable - pointing every tab's
   * aria-controls at a per-tab id would leave inactive tabs referencing an
   * element that is not in the DOM. `mode="wait"` guarantees the old panel
   * unmounts before the new one mounts, so the id is never duplicated.
   */
  const panelId = `${uid}-panel`;

  /*
   * The three panels are different heights. Without this the section below
   * would jump the instant the panel swaps, which undoes the whole point of
   * animating the swap. Measuring the mounted panel and animating the wrapper
   * to that height turns the jump into a glide.
   */
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setHeight(entry.contentRect.height));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const select = (i: number) => setActive(([prev]) => [i, i > prev ? 1 : -1]);

  const focusTab = (i: number) => {
    const next = (i + items.length) % items.length;
    select(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') focusTab(active + 1);
    else if (e.key === 'ArrowLeft') focusTab(active - 1);
    else if (e.key === 'Home') focusTab(0);
    else if (e.key === 'End') focusTab(items.length - 1);
    else return;
    e.preventDefault();
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Delivery stages"
        onKeyDown={onKeyDown}
        className="flex flex-wrap gap-1 border-b border-line"
      >
        {items.map((item, i) => {
          const selected = i === active;
          return (
            <button
              key={item.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`${uid}-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(i)}
              className={cn(
                'relative min-h-[44px] px-4 py-3 font-display text-[0.9375rem] font-medium transition-colors duration-200',
                selected ? 'text-pine' : 'text-ink-soft hover:text-pine',
              )}
            >
              {item.label}
              {selected && (
                <motion.span
                  layoutId={`${uid}-tab-indicator`}
                  className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-signal"
                  transition={reduced ? { duration: 0 } : { duration: MICRO, ease: EASE_OUT }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Padding sits outside the animated element so the measured height and
          the animated height are the same number. */}
      <div className="pt-8">
        <motion.div
          // Also clips the horizontal slide, so a panel on its way out can
          // never widen the page.
          className="overflow-hidden"
          initial={false}
          animate={{ height: height ?? 'auto' }}
          transition={reduced ? { duration: 0 } : { duration: 0.34, ease: EASE_OUT }}
        >
          <div ref={contentRef}>
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={items[active].id}
                custom={direction}
                /*
                 * Reduced motion drops the variant props entirely rather than
                 * passing `variants={undefined}` with "enter"/"exit" labels
                 * still attached - Framer cannot resolve a label with no
                 * variants, so the exit would never complete and `mode="wait"`
                 * would deadlock on the outgoing panel.
                 */
                {...(reduced
                  ? {}
                  : {
                      variants: panelVariants,
                      initial: 'enter' as const,
                      animate: 'center' as const,
                      exit: 'exit' as const,
                    })}
                role="tabpanel"
                id={panelId}
                aria-labelledby={`${uid}-tab-${items[active].id}`}
                tabIndex={0}
                // Ring is pulled inside so the overflow-hidden wrapper above
                // can't clip it.
                className="focus-visible:-outline-offset-2"
              >
                {items[active].content}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
