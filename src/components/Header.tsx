import { memo } from "react";

type Props = { logoSrc: string };

function HeaderBase({ logoSrc }: Props) {
  return (
    <header
      className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur supports-[backdrop-filter]:bg-black/40"
      role="banner"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo / link do strony głównej */}
        <a
          href="#top"
          className="group inline-flex items-center gap-3"
          aria-label="Strona główna PRO-SHOOTING"
        >
          <img
            src={logoSrc}
            alt="Logo PRO-SHOOTING"
            className="h-8 w-auto rounded-md ring-1 ring-white/10 shadow-sm"
            loading="eager"
            decoding="async"
            draggable={false}
          />
          <span className="font-semibold tracking-wide">PRO-SHOOTING</span>
        </a>

        {/* Nawigacja główna */}
        <nav
          aria-label="Główne sekcje strony"
          className="hidden items-center gap-6 text-sm md:flex"
        >
          {[
            { href: "#offer", label: "Oferta" },
            { href: "#process", label: "Jak to działa" },
            { href: "#reviews", label: "Opinie" },
            { href: "#booking", label: "Rezerwacje" },
            { href: "#faq", label: "FAQ" },
            { href: "#portfolio", label: "Portfolio" },
            { href: "#contact", label: "Kontakt" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-1 py-0.5 transition hover:text-[var(--brand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/60"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#booking"
          className="hidden rounded-full bg-[var(--brand)] px-4 py-2 text-sm font-medium text-black shadow transition hover:brightness-110 active:scale-[0.99] md:inline-flex"
        >
          Zarezerwuj termin
        </a>
      </div>
    </header>
  );
}

export default memo(HeaderBase);
