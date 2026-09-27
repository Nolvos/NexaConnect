import Icon, { type IconName } from '@/components/Icon';

interface TopicArtworkProps {
  icon: IconName;
  label: string;
  brand?: string;
  large?: boolean;
}

/** A topic illustration for offerings without an approved product photograph. */
export default function TopicArtwork({ icon, label, brand, large = false }: TopicArtworkProps) {
  return (
    <div className={`relative isolate flex items-center justify-center overflow-hidden bg-mist ${large ? 'h-52' : 'h-36'}`}>
      <div className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full border border-pine/10" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-24 -left-10 h-48 w-48 rounded-full border border-pine/10" aria-hidden="true" />
      {brand && <span className="absolute left-4 top-4 rounded-full border border-pine/15 bg-white/90 px-3 py-1 font-display text-xs font-semibold tracking-wide text-pine">{brand}</span>}
      <div className={`flex items-center justify-center rounded-full border border-pine/15 bg-white/75 text-pine shadow-card ${large ? 'h-28 w-28' : 'h-20 w-20'}`}>
        <Icon name={icon} size={large ? 60 : 43} strokeWidth={1.5} />
      </div>
      <span className="absolute bottom-3 left-4 right-4 text-center font-mono text-[0.625rem] uppercase tracking-label text-ink-soft">{label} illustration</span>
    </div>
  );
}
