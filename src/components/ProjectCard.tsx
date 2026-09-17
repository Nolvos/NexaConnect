import Image from 'next/image';

import { cn } from '@/lib/cn';

interface ProjectCardProps {
  title: string;
  description: string;
  category: string;
  image: string;
  imageAlt: string;
  /** CSS object-position for the crop. Defaults to centre. */
  imagePosition?: string;
  priority?: boolean;
  className?: string;
}

export default function ProjectCard({
  title,
  description,
  category,
  image,
  imageAlt,
  imagePosition,
  priority,
  className,
}: ProjectCardProps) {
  return (
    <article
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-card border border-line bg-white shadow-card',
        'transition-[transform,box-shadow,border-color] duration-300 ease-out',
        'hover:-translate-y-1.5 hover:border-signal/45 hover:shadow-card-hover',
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-mist">
        {/* TODO: swap for a photo of the delivered project once one is available. */}
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          priority={priority}
          style={imagePosition ? { objectPosition: imagePosition } : undefined}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        {/* Light pine wash keeps stock photography in the site palette. */}
        <div className="absolute inset-0 bg-pine-deep/15 mix-blend-multiply" aria-hidden="true" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-[0.625rem] uppercase tracking-label text-signal-deep">
          {category}
        </p>
        <h3 className="mt-2 font-display text-[1.0625rem] font-semibold text-pine">{title}</h3>
        <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-ink-soft">{description}</p>
      </div>
    </article>
  );
}
