import { cn } from '@/lib/cn';

/**
 * Wordmark plus a three-node glyph - the hero motif reduced to its smallest
 * legible form, so the identity and the signature element are the same idea.
 */
export default function Logo({ tone = 'dark' }: { tone?: 'light' | 'dark' }) {
  return (
    <span className="flex items-center gap-2.5">
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M5 18.5 L13 6.5 L21 18.5"
          stroke="#3FA679"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M5 18.5 L21 18.5" stroke="#3FA679" strokeWidth="1.5" strokeOpacity="0.4" />
        <circle cx="13" cy="6.5" r="2.75" fill="#3FA679" />
        <circle cx="5" cy="18.5" r="2.25" fill="#3FA679" fillOpacity="0.75" />
        <circle cx="21" cy="18.5" r="2.25" fill="#3FA679" fillOpacity="0.75" />
      </svg>
      <span
        className={cn(
          'font-display text-[1.0625rem] font-semibold tracking-tight',
          tone === 'light' ? 'text-paper' : 'text-pine',
        )}
      >
        Nexa Connect
      </span>
    </span>
  );
}
