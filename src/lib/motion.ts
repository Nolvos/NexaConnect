import type { Transition, Variants } from 'framer-motion';

/**
 * Shared motion vocabulary.
 *
 * One easing curve and two duration bands across the whole site, so nothing
 * animates in a rhythm the rest of the page does not share:
 *   MICRO   200-400ms - hover, focus, toggles
 *   SECTION 400-700ms - viewport reveals, page entrances
 */
export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const MICRO = 0.24;
export const SECTION = 0.6;

export const sectionTransition: Transition = { duration: SECTION, ease: EASE_OUT };

/** Fade + short rise. The default entrance for anything entering the viewport. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: sectionTransition },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: sectionTransition },
};

/** Parent variant - children using `fadeUp` will enter one after another. */
export const staggerChildren = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

/** Reveals fire once, slightly before the element is fully on screen. */
export const viewportOnce = { once: true, margin: '-80px 0px -80px 0px' } as const;
