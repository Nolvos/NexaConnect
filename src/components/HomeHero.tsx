'use client';

import { motion, useReducedMotion } from 'framer-motion';

import Button from '@/components/Button';
import SignalMotif from '@/components/SignalMotif';
import { EASE_OUT, SECTION } from '@/lib/motion';
import { contact } from '@/lib/site';

export default function HomeHero() {
  const reduced = useReducedMotion();

  const item = {
    hidden: { opacity: 0, y: reduced ? 0 : 22 },
    show: { opacity: 1, y: 0, transition: { duration: SECTION, ease: EASE_OUT } },
  };

  return (
    <section className="relative isolate overflow-hidden bg-pine-deep">
      {/* Signature element - the routing topology, pulsing on a slow loop. */}
      <SignalMotif className="absolute inset-0 h-full w-full" />

      {/* Scrim: keeps the motif visible on the right while guaranteeing contrast
          under the copy on the left. */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-pine-deep via-pine-deep/90 to-pine-deep/30"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-pine-deep"
        aria-hidden="true"
      />

      <motion.div
        className="container-page relative flex min-h-[38rem] flex-col justify-center py-24 pt-[calc(var(--nav-h)+5rem)] sm:min-h-[42rem]"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: reduced ? 0 : 0.11 } } }}
      >
        <motion.p variants={item} className="eyebrow-on-dark">
          PBX · Support · Software · Web
        </motion.p>

        <motion.h1 variants={item} className="mt-5 max-w-3xl text-display-lg text-paper">
          Your phones, network and software. Handled by one team
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-xl text-lg leading-relaxed text-paper/75"
        >
          We install and maintain business phone systems, build the software around them, and keep
          the whole stack running. One provider, one number to call.
        </motion.p>

        <motion.div variants={item} className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button href="/contact" variant="accent" size="lg" icon="ArrowRight">
            Request a quote
          </Button>
          <Button href={`tel:${contact.tel}`} variant="outlineDark" size="lg" leadingIcon="Phone">
            {contact.phoneDisplay}
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
