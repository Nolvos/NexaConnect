import Link from 'next/link';

export interface BreadcrumbItem { label: string; href?: string }

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-line bg-paper py-4">
      <ol className="container-page flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-soft">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex min-w-0 items-center gap-2">
            {index > 0 && <span aria-hidden="true" className="text-ink-soft">/</span>}
            {item.href ? (
              <Link href={item.href} className="inline-flex min-h-[44px] items-center underline decoration-line underline-offset-4 hover:text-pine">{item.label}</Link>
            ) : (
              <span aria-current="page" className="py-2 text-pine">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
