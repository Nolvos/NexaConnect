import Image from 'next/image';

import Icon, { type IconName } from '@/components/Icon';

interface CataloguePhotoProps {
  src: string;
  alt: string;
  icon: IconName;
  large?: boolean;
}

/** Generated topic photography. The caption avoids suggesting an exact product or vendor UI. */
export default function CataloguePhoto({ src, alt, icon, large = false }: CataloguePhotoProps) {
  return (
    <div className={`relative overflow-hidden bg-mist ${large ? 'h-52' : 'h-36'}`}>
      <Image src={src} alt={alt} fill sizes={large ? '(max-width: 1023px) 100vw, 400px' : '(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw'} className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-pine-deep/55 via-transparent to-transparent" aria-hidden="true" />
      <span className="absolute bottom-3 left-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-pine shadow-card"><Icon name={icon} size={18} /></span>
      <span className="absolute bottom-4 right-4 rounded-full bg-pine-deep/80 px-2 py-1 font-mono text-[0.625rem] uppercase tracking-label text-paper">Illustrative image</span>
    </div>
  );
}
