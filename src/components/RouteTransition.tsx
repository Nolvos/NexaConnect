'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import { EASE_OUT } from '@/lib/motion';

/**
 * Branded route transition.
 *
 * A pine curtain wipes up over the page, draws the Nexa Connect mark, then
 * lifts away to reveal the new route. The curtain has to cover the screen
 * *before* the route changes, which is why this intercepts link clicks rather
 * than reacting to the pathname - by the time `usePathname` reports a new
 * route, the new page has already painted.
 *
 * The interception is a single delegated listener rather than a custom Link
 * component, so it covers every internal link on the site - navbar, footer,
 * service cards, CTAs, the mobile menu - without touching any of them. It
 * deliberately ignores modifier-clicks, middle-clicks, `target="_blank"`,
 * downloads, and `#`/`tel:`/`mailto:` hrefs, so "open in new tab" and the skip
 * link keep working exactly as before.
 */

/* Tuning knobs - the whole transition is these three numbers. */
const COVER_IN = 0.4; // seconds for the curtain to wipe up over the page
const COVER_OUT = 0.4; // seconds for it to lift away
const MIN_COVER_MS = 620; // minimum time covered, so the mark is always seen

const SIGNAL = '#3FA679';

function Mark() {
  return (
    <div className="relative flex flex-col items-center">
      <motion.svg
        width="72"
        height="72"
        viewBox="0 0 26 26"
        fill="none"
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: EASE_OUT }}
      >
        {/* The two strokes draw themselves, apex first, then the base. */}
        <motion.path
          d="M5 18.5 L13 6.5 L21 18.5"
          stroke={SIGNAL}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.42, ease: EASE_OUT, delay: 0.06 }}
        />
        <motion.path
          d="M5 18.5 L21 18.5"
          stroke={SIGNAL}
          strokeWidth={1.5}
          strokeOpacity={0.4}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.32, ease: EASE_OUT, delay: 0.2 }}
        />
        {/* Nodes land on the ends of the strokes as they arrive. `r` is
            animated rather than scale - SVG circles have no transform-box. */}
        {[
          { cx: 13, cy: 6.5, r: 2.75, o: 1, d: 0.3 },
          { cx: 5, cy: 18.5, r: 2.25, o: 0.75, d: 0.38 },
          { cx: 21, cy: 18.5, r: 2.25, o: 0.75, d: 0.44 },
        ].map((n) => (
          <motion.circle
            key={`${n.cx}-${n.cy}`}
            cx={n.cx}
            cy={n.cy}
            fill={SIGNAL}
            fillOpacity={n.o}
            initial={{ r: 0 }}
            animate={{ r: n.r }}
            transition={{ duration: 0.3, ease: EASE_OUT, delay: n.d }}
          />
        ))}
      </motion.svg>

      <motion.p
        className="mt-5 font-display text-xl font-semibold tracking-tight text-paper"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: EASE_OUT, delay: 0.22 }}
      >
        Nexa Connect
      </motion.p>

      {/* A pulse running the rail - the same motif as the hero, at logo scale. */}
      <motion.span
        className="mt-5 block h-px w-32 bg-line-dark"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.3 }}
      >
        <span className="animate-rail-sweep block h-px w-full bg-[linear-gradient(90deg,transparent_0%,#3FA679_50%,transparent_100%)] bg-[length:200%_100%] bg-no-repeat" />
      </motion.span>
    </div>
  );
}

export default function RouteTransition() {
  const [covering, setCovering] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const reduced = useReducedMotion();

  const targetRef = useRef<string | null>(null);
  const startedAtRef = useRef(0);
  const pushedRef = useRef(false);

  const start = useCallback((href: string) => {
    targetRef.current = href;
    startedAtRef.current = Date.now();
    pushedRef.current = false;
    setCovering(true);
  }, []);

  /*
   * Navigate once the curtain has had time to cover the page.
   *
   * This is a timer rather than the curtain's `onAnimationComplete` on purpose:
   * Framer drives animations off requestAnimationFrame, which the browser
   * pauses entirely in a backgrounded tab. Hanging navigation off the animation
   * would mean a user who clicks a link and switches tabs comes back to a page
   * that never moved. Timers keep running, so this always fires.
   */
  useEffect(() => {
    if (!covering || pushedRef.current) return;
    const timer = setTimeout(() => {
      if (!targetRef.current) return;
      pushedRef.current = true;
      router.push(targetRef.current);
    }, COVER_IN * 1000);
    return () => clearTimeout(timer);
  }, [covering, router]);

  /* Delegated link interception. */
  useEffect(() => {
    if (reduced) return;

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as HTMLElement | null)?.closest?.('a');
      if (!anchor) return;

      const raw = anchor.getAttribute('href');
      if (!raw || raw.startsWith('#') || raw.startsWith('tel:') || raw.startsWith('mailto:')) return;
      if (anchor.hasAttribute('download')) return;
      if (anchor.target && anchor.target !== '_self') return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return;

      /*
       * Capture phase, and stop the event dead.
       *
       * React attaches its own listeners to the document during hydration, so a
       * bubble-phase listener registered here in an effect would run *after*
       * next/link had already started navigating. Capturing puts us first;
       * stopping propagation means the Link's onClick never runs at all, so
       * this is the only thing that decides when navigation happens.
       */
      event.preventDefault();
      event.stopPropagation();
      start(url.pathname + url.search);
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [reduced, start]);

  /* Once the new route has committed, hold briefly, then lift the curtain. */
  useEffect(() => {
    if (!covering || !targetRef.current) return;
    const target = new URL(targetRef.current, window.location.origin).pathname;
    if (pathname !== target) return;

    const wait = Math.max(0, MIN_COVER_MS - (Date.now() - startedAtRef.current));
    const timer = setTimeout(() => {
      targetRef.current = null;
      setCovering(false);
    }, wait);
    return () => clearTimeout(timer);
  }, [pathname, covering]);

  /* Safety net: never leave the page stuck behind a curtain. */
  useEffect(() => {
    if (!covering) return;
    const timer = setTimeout(() => {
      targetRef.current = null;
      setCovering(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, [covering]);

  if (reduced) return null;

  return (
    <AnimatePresence>
      {covering && (
        <motion.div
          key="route-curtain"
          // Above the navbar (z-50), below the skip link (z-100).
          className="pointer-events-auto fixed inset-0 z-[90] flex items-center justify-center overflow-hidden bg-pine-deep"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          // Exit timing lives on the variant: by the time it plays, `covering`
          // is already false, so a ternary in `transition` would read the wrong
          // value.
          exit={{ y: '-100%', transition: { duration: COVER_OUT, ease: EASE_OUT } }}
          transition={{ duration: COVER_IN, ease: EASE_OUT }}
          aria-hidden="true"
        >
          <div className="pine-grid absolute inset-0" />
          <Mark />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
