/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { SolitekLogo } from "../layout/Header";
import { AnimatedLink } from "../ui/AnimatedLink";

const exploreLinks = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Nos réalisations", href: "/realisations" },
  { label: "Estimer son besoin", href: "/estimateur" },
  { label: "Blog", href: "/blog" },
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
        <div className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4" style={{ color: '#FFFFFF' }}>

          {/* Téléphone */}
          <div className="flex flex-col items-center py-8 text-center sm:px-8 lg:px-10">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2DB180]/15">
              <svg className="h-4 w-4 text-[#1E9A66]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
            </div>
            <span className="mt-4 font-ui text-xs font-semibold uppercase tracking-wide text-[#1E9A66]">Téléphone</span>
            <a
              href="tel:+33783289777"
              className="mt-1 font-ui text-sm font-medium text-white transition-opacity hover:opacity-70"
              style={{ color: "#FFFFFF" }}
            >
              +33 7 83 28 97 77
            </a>
          </div>

          {/* Adresse */}
          <div className="flex flex-col items-center py-8 text-center sm:px-8 lg:px-10">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2DB180]/15">
              <svg className="h-4 w-4 text-[#1E9A66]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
            </div>
            <span className="mt-4 font-ui text-xs font-semibold uppercase tracking-wide text-[#1E9A66]">Adresse</span>
            <a
              href="https://maps.google.com/?q=7+Rue+de+Bucarest+67100+Strasbourg"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 font-ui text-sm font-medium text-white transition-opacity hover:opacity-70"
              style={{ color: "#FFFFFF" }}
            >
              7 Rue de Bucarest, 67100 Strasbourg
            </a>
          </div>

          {/* Horaires */}
          <div className="flex flex-col items-center py-8 text-center sm:px-8 lg:px-10">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2DB180]/15">
              <svg className="h-4 w-4 text-[#1E9A66]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <span className="mt-4 font-ui text-xs font-semibold uppercase tracking-wide text-[#1E9A66]">Horaires</span>
            <p className="mt-1 text-center font-ui text-sm font-medium text-white">Lun - Ven</p>
            <p className="text-center font-ui text-xs text-white/60">08h00 - 12h00 / 14h00 - 18h00</p>
          </div>

          {/* Activité */}
          <div className="flex flex-col items-center py-8 text-center sm:px-8 lg:px-10">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2DB180]/15">
              <svg className="h-4 w-4 text-[#1E9A66]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
              </svg>
            </div>
            <span className="mt-4 font-ui text-xs font-semibold uppercase tracking-wide text-[#1E9A66]">Activité</span>
            <span className="mt-1 max-w-[26ch] font-ui text-sm leading-relaxed text-white/80">
              Photovoltaïque, chauffage, climatisation, ventilation et électricité
            </span>
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
            <p className="self-stretch text-left font-ui text-base font-normal leading-relaxed text-white sm:text-lg sm:leading-[27px]">
              Installateur RGE à Strasbourg et en Alsace, SOLITEK est un partenaire engagé, humain et fiable, à vos côtés dans
              chaque étape de votre transition énergétique.
            </p>
          </div>

          {/* Explorer links */}
          <div className="flex flex-col items-start justify-start gap-4 sm:gap-6">
            <h3 className="font-ui text-xl font-bold text-white sm:text-2xl sm:leading-[28.8px]">Explorer</h3>
            <nav className="flex w-full flex-col items-start justify-start">
              {exploreLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group inline-flex w-full items-center justify-between border-b border-b-white/30 py-3 transition-all duration-300 hover:border-b-[#2DB180]"
                  style={{ color: '#ffffff' }}
                >
                  <AnimatedLink className="font-ui text-sm font-bold text-white transition-colors duration-300 group-hover:text-[#1E9A66] sm:text-[14px] sm:leading-[19.6px]">
                    {link.label}
                  </AnimatedLink>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="h-5 w-5 text-white transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#1E9A66]"
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
            <h3 className="font-ui text-xl font-bold text-white sm:text-2xl sm:leading-[28.8px]">Nous retrouver</h3>
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
                  <AnimatedLink className="font-ui text-sm font-bold text-white transition-colors duration-300 group-hover:text-[#1E9A66] sm:text-[14px] sm:leading-[19.6px]">
                    {link.label}
                  </AnimatedLink>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="h-5 w-5 text-white transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#1E9A66]"
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
            className="font-ui text-xs font-normal text-white transition-colors duration-300 hover:text-[#1E9A66] sm:text-[13px] sm:leading-[13px]"
            style={{ color: '#ffffff' }}
          >
            <AnimatedLink>Mentions légales</AnimatedLink>
          </Link>
          <Link
            href="/politique-de-confidentialite"
            className="font-ui text-xs font-normal text-white transition-colors duration-300 hover:text-[#1E9A66] sm:text-[13px] sm:leading-[13px]"
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
