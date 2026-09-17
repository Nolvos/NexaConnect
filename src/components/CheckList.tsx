import Icon from '@/components/Icon';
import { cn } from '@/lib/cn';

/**
 * Unordered feature list. Deliberately *not* numbered - numbers are reserved
 * for the process components where sequence actually matters.
 */
export default function CheckList({
  items,
  tone = 'light',
  className,
}: {
  items: string[];
  tone?: 'light' | 'dark';
  className?: string;
}) {
  const dark = tone === 'dark';
  return (
    <ul className={cn('space-y-2.5', className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <Icon
            name="Check"
            size={17}
            className={cn('mt-0.5 shrink-0', dark ? 'text-signal' : 'text-signal-deep')}
          />
          <span
            className={cn(
              'text-[0.9375rem] leading-relaxed',
              dark ? 'text-paper/75' : 'text-ink-soft',
            )}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
