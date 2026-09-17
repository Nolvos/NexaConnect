import Link from 'next/link';

import Icon, { type IconName } from '@/components/Icon';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'accent' | 'outline' | 'outlineDark';
type Size = 'md' | 'lg';

/**
 * The one button style for the whole site. Anything that looks like a button -
 * links, phone numbers, form submits - should render through this component.
 *
 * Hover scale is CSS rather than Framer Motion so buttons stay server
 * components; the global reduced-motion rule flattens the transition.
 */
const base =
  'group inline-flex items-center justify-center gap-2 rounded-button font-display font-medium ' +
  'transition-[transform,background-color,border-color,color,box-shadow] duration-200 ease-out ' +
  'hover:scale-[1.02] active:scale-[0.99] disabled:pointer-events-none disabled:opacity-50';

const variants: Record<Variant, string> = {
  // On paper / mist surfaces.
  primary: 'bg-pine text-paper hover:bg-pine-soft',
  // On pine surfaces - signal carries enough contrast against pine-deep.
  accent: 'bg-signal text-pine-deep hover:bg-signal-soft',
  outline: 'border border-line bg-transparent text-pine hover:border-signal hover:text-signal-deep',
  outlineDark:
    'border border-signal/40 bg-transparent text-paper hover:border-signal hover:bg-signal/10',
};

/** Leading icons pick up the accent colour on outline buttons. */
const leadingIconTone: Record<Variant, string | undefined> = {
  primary: undefined,
  accent: undefined,
  outline: 'text-signal-deep',
  outlineDark: 'text-signal',
};

const sizes: Record<Size, string> = {
  // Both clear the 44px minimum touch target.
  md: 'h-12 px-5 text-[0.9375rem]',
  lg: 'h-[3.25rem] px-7 text-base',
};

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  /** Trailing icon that nudges right on hover - for "go somewhere" actions. */
  icon?: IconName;
  /** Static leading icon - for contact actions such as a phone number. */
  leadingIcon?: IconName;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  /** Set for links leaving the site - adds rel and a new tab. */
  external?: boolean;
}

export default function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  icon,
  leadingIcon,
  className,
  type = 'button',
  disabled,
  external,
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  const inner = (
    <>
      {leadingIcon && <Icon name={leadingIcon} size={17} className={leadingIconTone[variant]} />}
      <span>{children}</span>
      {icon && (
        <Icon
          name={icon}
          size={18}
          className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
        />
      )}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {inner}
        </a>
      );
    }
    // Same-page anchors use a plain <a>: routing them through next/link would
    // remount app/template.tsx and replay the page transition for a scroll.
    // tel: and mailto: aren't routes, so they skip next/link as well.
    if (href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:')) {
      return (
        <a href={href} className={classes}>
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled}>
      {inner}
    </button>
  );
}
