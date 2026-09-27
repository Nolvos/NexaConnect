'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';

import Button from '@/components/Button';
import Icon from '@/components/Icon';
import Logo from '@/components/Logo';
import { EASE_OUT, MICRO } from '@/lib/motion';
import { cn } from '@/lib/cn';
import { contact, primaryNav, services } from '@/lib/site';

const links = primaryNav.filter((item) => item.label !== 'Services');
const isActive = (pathname: string, href: string) => pathname === href || (href !== '/' && pathname.startsWith(`${href}/`));

/** Underline that grows from the left instead of the colour snapping. */
function Underline({ active }: { active: boolean }) {
  return (
    <span
      className={cn(
        'absolute -bottom-1 left-0 h-px w-full origin-left bg-signal transition-transform duration-200 ease-out',
        active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100',
      )}
    />
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24));

  // Every page opens on a pine hero, so the bar starts transparent everywhere.
  const solid = scrolled || mobileOpen;
  const onServices = pathname.startsWith('/services');

  // Close everything on navigation.
  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  // Escape closes whichever layer is open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setMobileOpen(false);
      setServicesOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Prevent the page scrolling behind the mobile panel.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 h-[var(--nav-h)] transition-colors duration-300 ease-out',
        solid ? 'border-b border-line bg-paper/90 backdrop-blur-md' : 'border-b border-transparent',
      )}
    >
      <nav
        aria-label="Main"
        className="container-page flex h-full items-center justify-between gap-6"
      >
        <Link href="/" className="rounded-control" aria-label="Nexa Connect home">
          <Logo tone={solid ? 'dark' : 'light'} />
        </Link>

        {/* ---------------- Desktop ---------------- */}
        <div
          className={cn(
            'hidden items-center gap-5 xl:flex',
            solid ? 'text-ink' : 'text-paper',
          )}
        >
          <Link
            href="/"
            className="group relative font-display text-[0.9375rem] font-medium transition-colors hover:text-signal-deep"
          >
            Home
            <Underline active={pathname === '/'} />
          </Link>

          {/* Services dropdown - opens on hover and on keyboard focus */}
          <div
            ref={servicesRef}
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) setServicesOpen(false);
            }}
          >
            <button
              type="button"
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              onClick={() => setServicesOpen((v) => !v)}
              onFocus={() => setServicesOpen(true)}
              className="group relative flex items-center gap-1.5 font-display text-[0.9375rem] font-medium transition-colors hover:text-signal-deep"
            >
              Services
              <Icon
                name="ChevronDown"
                size={15}
                className={cn(
                  'transition-transform duration-200 ease-out',
                  servicesOpen && 'rotate-180',
                )}
              />
              <Underline active={onServices} />
            </button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6, transition: { duration: 0.15 } }}
                  transition={{ duration: MICRO, ease: EASE_OUT }}
                  className="absolute left-1/2 top-[calc(100%+1.15rem)] w-[22rem] -translate-x-1/2 overflow-hidden rounded-card border border-line bg-paper p-2 shadow-card-hover"
                >
                  <ul>
                    {services.map((s) => {
                      const active = pathname === s.href;
                      return (
                        <li key={s.slug}>
                          <Link
                            href={s.href}
                            className={cn(
                              'group flex gap-3 rounded-control p-3 transition-colors',
                              active ? 'bg-mist' : 'hover:bg-mist',
                            )}
                          >
                            <Icon
                              name={s.icon}
                              size={19}
                              className="mt-0.5 shrink-0 text-ink-soft transition-colors group-hover:text-signal-deep"
                            />
                            <span>
                              <span className="block font-display text-sm font-medium text-pine">
                                {s.title}
                              </span>
                              <span className="mt-0.5 block text-[0.8125rem] leading-snug text-ink-soft">
                                {s.blurb}
                              </span>
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {links.slice(1).map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(pathname, l.href) ? 'page' : undefined}
              className="group relative font-display text-[0.9375rem] font-medium transition-colors hover:text-signal-deep"
            >
              {l.label}
              <Underline active={isActive(pathname, l.href)} />
            </Link>
          ))}

          {/* Pine on the solid bar, signal while the bar floats over a dark hero. */}
          <Button href="/contact" variant={solid ? 'primary' : 'accent'} className="h-11">
            Request a quote
          </Button>
        </div>

        {/* ---------------- Mobile trigger ---------------- */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          className={cn(
            '-mr-2 flex h-11 w-11 items-center justify-center rounded-button transition-colors xl:hidden',
            solid ? 'text-pine' : 'text-paper',
          )}
        >
          <Icon name={mobileOpen ? 'X' : 'Menu'} size={22} />
        </button>
      </nav>

      {/* ---------------- Mobile slide-in ---------------- */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: MICRO }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 top-[var(--nav-h)] z-40 bg-pine-deep/50 xl:hidden"
            />
            <motion.div
              key="panel"
              id="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.32, ease: EASE_OUT }}
              className="fixed bottom-0 right-0 top-[var(--nav-h)] z-40 flex w-[min(20rem,85vw)] flex-col overflow-y-auto border-l border-line bg-paper px-5 py-6 xl:hidden"
            >
              <p className="eyebrow mb-3">Services</p>
              <ul className="mb-6 space-y-1">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={s.href}
                      className={cn(
                        'flex min-h-[44px] items-center gap-3 rounded-control px-3 py-2.5 font-display text-[0.9375rem] text-pine transition-colors',
                        pathname === s.href ? 'bg-mist' : 'hover:bg-mist',
                      )}
                    >
                      <Icon name={s.icon} size={18} className="text-signal-deep" />
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>

              <p className="eyebrow mb-3">Explore Nexa Connect</p>
              <ul className="space-y-1">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      aria-current={isActive(pathname, l.href) ? 'page' : undefined}
                      className={cn(
                        'flex min-h-[44px] items-center rounded-control px-3 py-2.5 font-display text-[0.9375rem] text-pine transition-colors',
                        isActive(pathname, l.href) ? 'bg-mist' : 'hover:bg-mist',
                      )}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-auto space-y-3 pt-8">
                <Button href="/contact" variant="primary" icon="ArrowRight" className="w-full">
                  Request a quote
                </Button>
                <Button
                  href={`tel:${contact.tel}`}
                  variant="outline"
                  leadingIcon="Phone"
                  className="w-full"
                >
                  {contact.phoneDisplay}
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
