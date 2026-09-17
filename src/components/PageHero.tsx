'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { EASE_OUT, SECTION } from '@/lib/motion';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  lead: string;
  children?: React.ReactNode;
}

/**
 * Shared hero for every page except home. Pine field so the navbar's
 * transparent state has something dark to sit on, and copy enters in a
 * staggered sequence on mount rather than on scroll.
 */
export default function PageHero({ eyebrow, title, lead, children }: PageHeroProps) {
  const reduced = useReducedMotion();

  const item = {
    hidden: { opacity: 0, y: reduced ? 0 : 16 },
    show: { opacity: 1, y: 0, transition: { duration: SECTION, ease: EASE_OUT } },
  };

  return (
    <section className="relative overflow-hidden bg-pine-deep pb-16 pt-[calc(var(--nav-h)+3.5rem)] sm:pb-20 sm:pt-[calc(var(--nav-h)+5rem)]">
      <div className="pine-grid absolute inset-0" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-pine-deep" aria-hidden="true" />

      <motion.div
        className="container-page relative"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: reduced ? 0 : 0.09 } } }}
      >
        <motion.p variants={item} className="eyebrow-on-dark">
          {eyebrow}
        </motion.p>
        <motion.h1 variants={item} className="mt-4 max-w-3xl text-display-md text-paper">
          {title}
        </motion.h1>
        <motion.p
          variants={item}
          className="mt-5 max-w-prose text-[1.0625rem] leading-relaxed text-paper/70"
        >
          {lead}
        </motion.p>
        {children && (
          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            {children}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
