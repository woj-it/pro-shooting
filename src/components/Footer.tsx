export default function Footer({ logoSrc }: { logoSrc: string }) {
  return (
    <footer
      role="contentinfo"
      className="border-t border-white/10 py-8 text-center text-white/60"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4">
        <img
          src={logoSrc}
          alt="Logo PRO-SHOOTING"
          className="h-6 w-auto select-none opacity-80"
          loading="lazy"
          decoding="async"
        />
        <span>
          © {new Date().getFullYear()} PRO-SHOOTING. Wszelkie prawa
          zastrzeżone.
        </span>
      </div>
    </footer>
  );
}
