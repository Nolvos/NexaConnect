'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import ProjectCard from '@/components/ProjectCard';
import SolutionCard from '@/components/SolutionCard';
import { EASE_OUT } from '@/lib/motion';
import { cn } from '@/lib/cn';
import type { Project } from '@/lib/projects';
import type { EnterpriseSolution } from '@/lib/solutions';
import { services } from '@/lib/site';

type PortfolioEntry =
  | { kind: 'project'; key: string; project: Project }
  | { kind: 'solution'; key: string; solution: EnterpriseSolution };

const filters = [
  { value: 'all', label: 'All' },
  { value: 'projects', label: 'Projects' },
  { value: 'solutions', label: 'Solutions' },
  ...services.map((service) => ({
    value: `project:${service.slug}`,
    label: `${service.slug === 'pbx' ? 'PBX' : service.slug === 'maintenance' ? 'Maintenance' : service.slug === 'software' ? 'Software' : 'Web design'} projects`,
  })),
];

export default function PortfolioGrid({ projects, solutions }: { projects: Project[]; solutions: EnterpriseSolution[] }) {
  const [active, setActive] = useState('all');
  const reduced = useReducedMotion();

  // Mix entry types in the combined view without implying a solution is a delivered project.
  const all: PortfolioEntry[] = projects.flatMap((project, index) => [
    { kind: 'project' as const, key: project.seed, project },
    ...(solutions[index] ? [{ kind: 'solution' as const, key: solutions[index].slug, solution: solutions[index] }] : []),
  ]);
  const shown = active === 'all' ? all
    : active === 'solutions' ? all.filter((entry) => entry.kind === 'solution')
      : active === 'projects' ? all.filter((entry) => entry.kind === 'project')
        : all.filter((entry) => entry.kind === 'project' && entry.project.category === active.replace('project:', ''));

  return (
    <div>
      <div role="group" aria-label="Filter portfolio entries" className="flex flex-wrap gap-2">
        {filters.map((filter) => {
          const selected = active === filter.value;
          return (
            <button
              key={filter.value}
              type="button"
              onClick={() => setActive(filter.value)}
              aria-pressed={selected}
              className={cn(
                'min-h-[44px] rounded-button border px-5 font-display text-[0.875rem] font-medium transition-colors duration-200',
                selected ? 'border-pine bg-pine text-paper' : 'border-line bg-white text-ink-soft hover:border-signal hover:text-pine',
              )}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <p className="mt-5 font-mono text-[0.6875rem] uppercase tracking-label text-ink-soft" aria-live="polite">
        Showing {shown.length} {shown.length === 1 ? 'entry' : 'entries'}
      </p>

      <motion.div layout={!reduced} className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((entry, index) => (
            <motion.div
              key={entry.key}
              layout={!reduced}
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, scale: 0.97 }}
              transition={{ duration: reduced ? 0 : 0.32, ease: EASE_OUT }}
              className="h-full"
            >
              {entry.kind === 'project' ? (
                <ProjectCard
                  title={entry.project.title}
                  description={entry.project.description}
                  category={entry.project.categoryLabel}
                  image={entry.project.image}
                  imageAlt={entry.project.imageAlt}
                  imagePosition={entry.project.imagePosition}
                  priority={index < 3}
                  compact
                />
              ) : <SolutionCard solution={entry.solution} />}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {shown.length === 0 && (
        <p className="mt-10 rounded-card border border-line bg-white p-8 text-center text-[0.9375rem] text-ink-soft">
          Nothing here yet for that selection. Ask us about similar work or capabilities.
        </p>
      )}
    </div>
  );
}
