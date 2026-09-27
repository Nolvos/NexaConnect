import Link from 'next/link';

import Icon, { type IconName } from '@/components/Icon';
import CataloguePhoto from '@/components/CataloguePhoto';
import { cn } from '@/lib/cn';

interface ServiceCardProps {
  href: string;
  title: string;
  blurb: string;
  icon: IconName;
  image?: { src: string; alt: string };
  className?: string;
}

/**
 * Hover lift is CSS-only - a transform + shadow change needs no JS, and the
 * global reduced-motion rule flattens it automatically.
 */
export default function ServiceCard({ href, title, blurb, icon, image, className }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-card border border-line bg-white p-6 shadow-card',
        'transition-[transform,box-shadow,border-color] duration-300 ease-out',
        'hover:-translate-y-1.5 hover:border-signal/45 hover:shadow-card-hover',
        className,
      )}
    >
      {image && <div className="-mx-6 -mt-6 mb-5 border-b border-line"><CataloguePhoto src={image.src} alt={image.alt} icon={icon} /></div>}
      {!image && <span className="flex h-11 w-11 items-center justify-center rounded-control bg-mist transition-colors duration-300 ease-out group-hover:bg-signal/12">
        <Icon
          name={icon}
          size={21}
          className="text-ink-soft transition-colors duration-300 ease-out group-hover:text-signal-deep"
        />
      </span>}

      <h3 className={`${image ? '' : 'mt-5 '}font-display text-[1.0625rem] font-semibold text-pine`}>{title}</h3>
      <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-ink-soft">{blurb}</p>

      <span className="mt-5 inline-flex items-center gap-1.5 font-display text-sm font-medium text-pine">
        Explore
        <Icon
          name="ArrowRight"
          size={15}
          className="text-signal-deep transition-transform duration-300 ease-out group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
}
