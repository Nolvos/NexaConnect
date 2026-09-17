import Reveal from '@/components/Reveal';
import { cn } from '@/lib/cn';

export interface Step {
  title: string;
  body: string;
}

/**
 * Numbered sequence on a connecting rail.
 *
 * Numbers are deliberate here: this component is only used where the order is
 * genuinely load-bearing (a delivery process, an installation sequence). Lists
 * that merely happen to have several items use plain cards instead.
 */
export default function Steps({ steps, tone = 'light' }: { steps: Step[]; tone?: 'light' | 'dark' }) {
  const dark = tone === 'dark';

  return (
    <ol className="relative">
      {/* The rail - same hairline language as the hero motif. */}
      <span
        className={cn(
          'absolute bottom-6 left-[1.1875rem] top-6 w-px',
          dark ? 'bg-line-dark' : 'bg-line',
        )}
        aria-hidden="true"
      />

      {steps.map((step, i) => (
        <Reveal as="li" key={step.title} delay={i * 0.07} className="relative flex gap-5 pb-9 last:pb-0">
          <span
            className={cn(
              'relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border font-mono text-[0.8125rem]',
              dark
                ? 'border-signal/40 bg-pine-deep text-signal'
                : 'border-line bg-white text-signal-deep',
            )}
          >
            {String(i + 1).padStart(2, '0')}
          </span>

          <div className="pt-1.5">
            <h3
              className={cn(
                'font-display text-[1.0625rem] font-semibold',
                dark ? 'text-paper' : 'text-pine',
              )}
            >
              {step.title}
            </h3>
            <p
              className={cn(
                'mt-2 max-w-prose text-[0.9375rem] leading-relaxed',
                dark ? 'text-paper/70' : 'text-ink-soft',
              )}
            >
              {step.body}
            </p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
