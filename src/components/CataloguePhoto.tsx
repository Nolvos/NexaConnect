import Image from 'next/image';

interface CataloguePhotoProps {
  src: string;
  alt: string;
  large?: boolean;
}

/** Generic topic photography; accessible alt text identifies illustrative imagery. */
export default function CataloguePhoto({ src, alt, large = false }: CataloguePhotoProps) {
  return (
    <div className={`relative overflow-hidden bg-mist ${large ? 'h-52' : 'h-36'}`}>
      <Image src={src} alt={alt} fill sizes={large ? '(max-width: 1023px) 100vw, 400px' : '(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw'} className="object-cover" />
    </div>
  );
}
