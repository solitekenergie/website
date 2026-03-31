/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { SolitekLogo } from "../layout/Header";
import { AnimatedLink } from "../ui/AnimatedLink";

const exploreLinks = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Nos réalisations", href: "/realisations" },
  { label: "Estimer son besoin", href: "/estimateur" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/solitek_", icon: "instagram" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/solitek-energie-82b6402a5/", icon: "linkedin" },
];

export function BrandPanelSection() {
  return (
    <footer className="inline-flex h-full w-full flex-col items-start justify-start">

      {/* NAP bar */}
      <div className="w-full bg-[#161A1E] px-4 sm:px-8 lg:px-[60px]" style={{ color: '#FFFFFF' }}>
        <div className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4 lg:items-stretch" style={{ color: '#FFFFFF' }}>

          {/* Téléphone */}
          <div className="flex flex-col items-center gap-4 py-8 text-center sm:px-8 lg:px-10">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2DB180]/15">
              <svg className="h-4 w-4 text-[#2DB180]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
            </div>
            <div className="flex flex-col items-center gap-0.5 text-center">
              <span className="font-['Figtree'] text-xs font-semibold uppercase tracking-widest text-[#2DB180]">Téléphone</span>
              <a
                href="tel:+33783289777"
                className="font-['Figtree'] text-sm font-medium text-white transition-opacity hover:opacity-70"
                style={{ color: "#FFFFFF" }}
              >
                +33 7 83 28 97 77
              </a>
            </div>
          </div>

          {/* Adresse */}
          <div className="flex flex-col items-center gap-4 py-8 text-center sm:px-8 lg:px-10">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2DB180]/15">
              <svg className="h-4 w-4 text-[#2DB180]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
            </div>
            <div className="flex flex-col items-center gap-0.5 text-center">
              <span className="font-['Figtree'] text-xs font-semibold uppercase tracking-widest text-[#2DB180]">Adresse</span>
              <a
                href="https://maps.google.com/?q=7+Rue+de+Bucarest+67100+Strasbourg"
                target="_blank"
                rel="noopener noreferrer"
                className="font-['Figtree'] text-sm font-medium text-white transition-opacity hover:opacity-70"
                style={{ color: "#FFFFFF" }}
              >
                7 Rue de Bucarest, 67100 Strasbourg
              </a>
            </div>
          </div>

          {/* Horaires */}
          <div className="flex flex-col items-center gap-4 py-8 text-center sm:px-8 lg:px-10">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2DB180]/15">
              <svg className="h-4 w-4 text-[#2DB180]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <div className="flex flex-col items-center gap-0.5 text-center">
              <span className="font-['Figtree'] text-xs font-semibold uppercase tracking-widest text-[#2DB180]">Horaires</span>
              <p className="text-center font-['Figtree'] text-sm font-medium text-white">Lun - Ven</p>
              <p className="text-center font-['Figtree'] text-xs text-white/60">08h00 - 12h00 / 14h00 - 18h00</p>
            </div>
          </div>

          {/* Activité */}
          <div className="flex flex-col items-center gap-4 py-8 text-center sm:px-8 lg:px-10">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2DB180]/15">
              <svg className="h-4 w-4 text-[#2DB180]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
              </svg>
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <span className="font-['Figtree'] text-xs font-semibold uppercase tracking-widest text-[#2DB180]">Activité</span>
              <span className="max-w-[26ch] font-['Figtree'] text-sm leading-relaxed text-white/80">
                Photovoltaïque, chauffage, climatisation, ventilation et électricité
              </span>
              <span className="mt-2 rounded-full border border-white/15 px-3 py-1 font-['Figtree'] text-[11px] uppercase tracking-[0.16em] text-white/50">
                NAF 43.21A
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Main footer content */}
      <div className="flex flex-col items-center justify-center gap-8 self-stretch overflow-hidden bg-[#161A1E] px-4 py-12 sm:gap-10 sm:px-8 sm:py-16 lg:gap-12 lg:px-[60px]">
        {/* Logo */}
        <div className="flex flex-col items-center justify-start gap-4 self-stretch">
          <div className="flex h-auto items-end justify-center gap-2 sm:h-[80px] lg:h-[120.43px]">
            <SolitekLogo variant="footer" />
          </div>
        </div>

        {/* Footer columns */}
        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {/* Description */}
          <div className="flex flex-col items-start justify-start gap-4 sm:gap-6">
            <p className="self-stretch font-['Figtree'] text-base font-normal leading-relaxed text-white sm:text-lg sm:leading-[27px]">
              Installateur RGE à Strasbourg et en Alsace, SOLITEK est un partenaire engagé, humain et fiable, à vos côtés dans
              chaque étape de votre transition énergétique.
            </p>
          </div>

          {/* Explorer links */}
          <div className="flex flex-col items-start justify-start gap-4 sm:gap-6">
            <h3 className="font-['Figtree'] text-xl font-bold text-white sm:text-2xl sm:leading-[28.8px]">Explorer</h3>
            <nav className="flex w-full flex-col items-start justify-start">
              {exploreLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group inline-flex w-full items-center justify-between border-b border-b-white/30 py-3 transition-all duration-300 hover:border-b-[#2DB180]"
                  style={{ color: '#ffffff' }}
                >
                  <AnimatedLink className="font-['Figtree'] text-sm font-bold text-white transition-colors duration-300 group-hover:text-[#2DB180] sm:text-[14px] sm:leading-[19.6px]">
                    {link.label}
                  </AnimatedLink>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="h-5 w-5 text-white transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#2DB180]"
                    aria-hidden="true"
                  >
                    <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              ))}
            </nav>
          </div>

          {/* Social links */}
          <div className="flex flex-col items-start justify-start gap-4 sm:gap-6">
            <h3 className="font-['Figtree'] text-xl font-bold text-white sm:text-2xl sm:leading-[28.8px]">Nous retrouver</h3>
            <nav className="flex w-full flex-col items-start justify-start">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-full items-center justify-between border-b border-b-white/30 py-3 transition-all duration-300 hover:border-b-[#2DB180]"
                  style={{ color: '#ffffff' }}
                >
                  <AnimatedLink className="font-['Figtree'] text-sm font-bold text-white transition-colors duration-300 group-hover:text-[#2DB180] sm:text-[14px] sm:leading-[19.6px]">
                    {link.label}
                  </AnimatedLink>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="h-5 w-5 text-white transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#2DB180]"
                    aria-hidden="true"
                  >
                    <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Footer bottom bar */}
      <div className="inline-flex w-full flex-col items-center justify-between gap-4 border-t border-t-white/15 bg-[#161A1E] px-4 py-4 sm:flex-row sm:px-8 lg:px-[60px]">
        <nav className="flex flex-wrap items-center justify-center gap-4 sm:justify-start sm:gap-6">
          <Link
            href="/mentions-legales"
            className="font-['Figtree'] text-xs font-normal text-white transition-colors duration-300 hover:text-[#2DB180] sm:text-[13px] sm:leading-[13px]"
            style={{ color: '#ffffff' }}
          >
            <AnimatedLink>Mentions légales</AnimatedLink>
          </Link>
          <Link
            href="/politique-de-confidentialite"
            className="font-['Figtree'] text-xs font-normal text-white transition-colors duration-300 hover:text-[#2DB180] sm:text-[13px] sm:leading-[13px]"
            style={{ color: '#ffffff' }}
          >
            <AnimatedLink>Politique de confidentialité</AnimatedLink>
          </Link>
        </nav>
        <a
          href="https://www.studiofief.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 transition-opacity hover:opacity-70 sm:gap-3"
        >
          <img src="/images/Made%20by.svg" alt="Made by" className="h-[30px] w-auto object-contain sm:h-[40px]" />
          <img src="/images/Footer%20Made%20By%20Logo.svg" alt="Fief logo" className="h-[30px] w-auto object-contain sm:h-[40px]" />
        </a>
      </div>
    </footer>
  );
}

function LogoStack() {
  return (
    <div className="relative h-[120.43px] w-[120.43px]">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 28 35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M0.976923 34.4096C0.228477 31.6186 -1.00845 25.3806 1.48165 18.5819C2.66617 15.3478 4.27942 13.1197 4.97912 12.2138C8.68624 7.41412 13.3127 5.34602 15.2184 4.52092C15.5245 4.38822 15.5596 4.37966 19.1121 3.12221C22.8402 1.8027 25.8769 0.723433 27.9095 0L7.49229 15.8021C7.171 16.0509 7.23337 16.5614 7.60497 16.7214L11.5689 18.4299C11.8797 18.5642 11.9877 18.9591 11.789 19.2379L0.976923 34.4096Z"
          fill="white"
        />
        <path
          d="M26.9325 0C27.681 2.791 28.9179 9.02901 26.4278 15.8278C25.2433 19.0618 23.63 21.2899 22.9303 22.1958C19.2232 26.9955 14.5968 29.0636 12.6911 29.8887C12.385 30.0214 12.3499 30.03 8.79739 31.2874C5.06931 32.6075 2.03255 33.6867 0 34.4102L20.4172 18.6081C20.7385 18.3593 20.6761 17.8488 20.3045 17.6888L16.3406 15.9803C16.0298 15.846 15.9218 15.4511 16.1204 15.1723L26.9325 0Z"
          fill="white"
        />
      </svg>
    </div>
  );
}

function Wordmark() {
  const parts = [
    { src: "/images/Vector-6.svg", label: "S" },
    { src: "/images/Vector-5.svg", label: "O" },
    { src: "/images/Vector-4.svg", label: "L" },
    { src: "/images/Vector-3.svg", label: "I" },
    { src: "/images/Vector-2.svg", label: "T" },
    { src: "/images/Vector-1.svg", label: "E" },
    { src: "/images/Vector.svg", label: "K" },
  ];
  return (
    <div className="flex items-end justify-center gap-[2px] h-[120.43px]">
      {parts.map((part) => (
        <img
          key={part.src}
          src={part.src}
          alt={`Solitek lettre ${part.label}`}
          className="h-full w-auto object-contain"
        />
      ))}
    </div>
  );
}
