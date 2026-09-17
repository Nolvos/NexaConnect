import type { ReactNode } from 'react';

import Reveal from '@/components/Reveal';
import { cn } from '@/lib/cn';

interface SectionHeadingProps {
  eyebrow: string;
  /** Plain string in most cases; JSX only to force a line break at a chosen word. */
  title: ReactNode;
  lead?: string;
  tone?: 'light' | 'dark';
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = 'light',
  align = 'left',
  className,
}: SectionHeadingProps) {
  const dark = tone === 'dark';
  return (
    <Reveal className={cn(align === 'center' && 'mx-auto text-center', 'max-w-2xl', className)}>
      <p className={dark ? 'eyebrow-on-dark' : 'eyebrow'}>{eyebrow}</p>
      <h2
        className={cn('mt-3 text-display-sm', dark ? 'text-paper' : 'text-pine')}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={cn(
            'mt-4 max-w-prose text-[1.0625rem] leading-relaxed',
            align === 'center' && 'mx-auto',
            dark ? 'text-paper/70' : 'text-ink-soft',
          )}
        >
          {lead}
        </p>
      )}
    </Reveal>
  );
}
