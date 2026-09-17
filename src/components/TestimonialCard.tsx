import Icon from '@/components/Icon';

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
}

/**
 * PLACEHOLDER COMPONENT.
 *
 * Every instance on the site currently carries bracketed placeholder copy and a
 * visible "Placeholder" chip. Remove the chip in this file once real, approved
 * client quotes and attributions are in place - never before.
 */
export default function TestimonialCard({ quote, name, role }: TestimonialCardProps) {
  return (
    <figure className="flex h-full flex-col rounded-card border border-line bg-white p-6 shadow-card">
      <div className="flex items-start justify-between gap-4">
        <Icon name="Quote" size={22} className="shrink-0 text-signal/50" />
        <span className="rounded-full border border-line bg-mist px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-label text-ink-soft">
          Placeholder
        </span>
      </div>

      <blockquote className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-ink">
        {quote}
      </blockquote>

      <figcaption className="mt-6 border-t border-line pt-4">
        <p className="font-display text-sm font-medium text-pine">{name}</p>
        <p className="mt-0.5 text-[0.8125rem] text-ink-soft">{role}</p>
      </figcaption>
    </figure>
  );
}
