'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import ProjectCard from '@/components/ProjectCard';
import { EASE_OUT } from '@/lib/motion';
import { cn } from '@/lib/cn';
import type { Project } from '@/lib/projects';
import { services } from '@/lib/site';

const filters = [
  { value: 'all', label: 'All work' },
  ...services.map((s) => ({ value: s.slug as string, label: s.title })),
];

export default function PortfolioGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<string>('all');
  const reduced = useReducedMotion();

  const shown = active === 'all' ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      <div
        role="group"
        aria-label="Filter projects by service"
        className="flex flex-wrap gap-2"
      >
        {filters.map((f) => {
          const selected = active === f.value;
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => setActive(f.value)}
              aria-pressed={selected}
              className={cn(
                'min-h-[44px] rounded-button border px-5 font-display text-[0.875rem] font-medium transition-colors duration-200',
                selected
                  ? 'border-pine bg-pine text-paper'
                  : 'border-line bg-white text-ink-soft hover:border-signal hover:text-pine',
              )}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* aria-live so the count change is announced rather than silently swapped */}
      <p className="mt-5 font-mono text-[0.6875rem] uppercase tracking-label text-ink-soft" aria-live="polite">
        Showing {shown.length} {shown.length === 1 ? 'project' : 'projects'}
      </p>

      <motion.div layout={!reduced} className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((p, i) => (
            <motion.div
              key={p.seed}
              layout={!reduced}
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, scale: 0.97 }}
              transition={{ duration: reduced ? 0 : 0.32, ease: EASE_OUT }}
              className="h-full"
            >
              <ProjectCard
                title={p.title}
                description={p.description}
                category={p.categoryLabel}
                image={p.image}
                imageAlt={p.imageAlt}
                imagePosition={p.imagePosition}
                priority={i < 3}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {shown.length === 0 && (
        <p className="mt-10 rounded-card border border-line bg-white p-8 text-center text-[0.9375rem] text-ink-soft">
          Nothing here yet for that service. Ask us and we can usually show something similar.
        </p>
      )}
    </div>
  );
}
