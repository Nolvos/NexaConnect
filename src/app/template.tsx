'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { EASE_OUT } from '@/lib/motion';

/**
 * Route transition.
 *
 * `template.tsx` remounts on every navigation (unlike `layout.tsx`, which
 * persists), so wrapping it in a motion element gives each page an entrance
 * without needing AnimatePresence to hold on to an outgoing tree - something
 * the App Router can't do reliably without reaching into Next's private router
 * internals, which would break on upgrade.
 *
 * Enter-only by design: the outgoing page is replaced as soon as the new route
 * resolves. Every route here is statically prerendered and prefetched on hover,
 * so that swap is effectively instant and the incoming rise is what the eye
 * reads as the transition.
 *
 * The Navbar and Footer live in `layout.tsx`, outside this wrapper, so they
 * stay put while the page content moves - which is what makes the navigation
 * feel like a transition rather than a reload.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  // Render the final state directly - no wrapper, no transform, nothing to wait for.
  if (reduced) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
