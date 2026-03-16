/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { SolitekLogo } from "../layout/Header";
import { AnimatedLink } from "../ui/AnimatedLink";

const exploreLinks = [
  { label: "À propos", href: "/a-propos" },
  { label: "Services", href: "/#services" },
  { label: "Estimer son besoin", href: "/estimateur" },
  { label: "Nos réalisations", href: "/realisations" },
  { label: "Nos fournisseurs", href: "/#fournisseurs" },
  { label: "Les avis", href: "/#avis" },
];

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
  { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
];

export function BrandPanelSection() {
  return (
    <footer className="inline-flex h-full w-full flex-col items-start justify-start">
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
              Bien plus qu&apos;un simple installateur, SOLITEK incarne un partenaire engagé, humain et fiable, à vos côtés dans
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
