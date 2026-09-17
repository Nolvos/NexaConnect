import Button from '@/components/Button';
import Reveal from '@/components/Reveal';
import { contact } from '@/lib/site';

interface CTABandProps {
  title: string;
  lead: string;
  /** Label for the primary action. Always routes to /contact. */
  action: string;
}

export default function CTABand({ title, lead, action }: CTABandProps) {
  return (
    <section className="relative overflow-hidden bg-pine">
      <div className="pine-grid absolute inset-0" aria-hidden="true" />
      <div className="container-page relative py-16 sm:py-20">
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2 className="text-display-sm text-paper">{title}</h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-paper/70">{lead}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
            <Button href="/contact" variant="accent" size="lg" icon="ArrowRight">
              {action}
            </Button>
            <Button href={`tel:${contact.tel}`} variant="outlineDark" size="lg" leadingIcon="Phone">
              {contact.phoneDisplay}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
