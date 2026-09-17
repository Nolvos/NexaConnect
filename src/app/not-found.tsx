import Button from '@/components/Button';
import { services } from '@/lib/site';

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-pine-deep pb-24 pt-[calc(var(--nav-h)+6rem)]">
      <div className="pine-grid absolute inset-0" aria-hidden="true" />
      <div className="container-page relative">
        <p className="eyebrow-on-dark">404</p>
        <h1 className="mt-4 max-w-2xl text-display-md text-paper">
          That page isn&apos;t routing anywhere
        </h1>
        <p className="mt-5 max-w-prose text-[1.0625rem] leading-relaxed text-paper/70">
          The link may be old, or the page may have moved. Here is where most people are heading.
        </p>

        <div className="mt-8">
          <Button href="/" variant="accent" icon="ArrowRight">
            Back to home
          </Button>
        </div>

        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <li key={s.slug}>
              <Button href={s.href} variant="outlineDark" className="w-full">
                {s.title}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
