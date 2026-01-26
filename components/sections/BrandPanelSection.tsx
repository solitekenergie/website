/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

const exploreLinks = ["À propos", "Services", "Estimer son besoin", "Nos réalisation", "Nos fournisseur", "Les avis"];
const socialLinks = ["Facebook", "Instagram", "LinkedIn"];

export function BrandPanelSection() {
  return (
    <section className="w-full h-full inline-flex flex-col justify-start items-start">
      <div className="self-stretch px-[60px] py-12 bg-[#161A1E] overflow-hidden flex flex-col justify-center items-center gap-12">
        <div className="self-stretch flex flex-col justify-start items-center gap-15">
          <div className="flex items-end justify-center gap-2 h-[120.43px]">
            <LogoStack />
            <Wordmark />
          </div>
        </div>

        <div className="self-stretch inline-flex justify-start items-start gap-15">
          <div className="flex-1 inline-flex flex-col justify-start items-start gap-6">
            <div className="self-stretch text-white text-[18px] leading-[27px] font-['Figtree'] font-normal">
              Bien plus qu’un simple installateur, SOLITEK incarne un partenaire engagé, humain et fiable, à vos côtés dans
              chaque étape de votre transition énergétique.
            </div>
          </div>

          <div className="flex-1 inline-flex flex-col justify-start items-start gap-6">
            <div className="text-white text-[24px] leading-[28.8px] font-['Figtree'] font-bold">Explorer</div>
            <div className="self-stretch flex flex-col justify-start items-start">
              {exploreLinks.map((label) => (
                <div
                  key={label}
                  className="self-stretch py-3 border-b border-b-white/30 inline-flex items-center justify-between"
                >
                  <div className="text-white text-[14px] leading-[19.6px] font-['Figtree'] font-bold">{label}</div>
                  <img
                    src="/images/01%20align%20center.svg"
                    alt=""
                    aria-hidden="true"
                    className="h-5 w-5 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 inline-flex flex-col justify-start items-start gap-6">
            <div className="text-white text-[24px] leading-[28.8px] font-['Figtree'] font-bold">Nous retrouver</div>
            <div className="self-stretch flex flex-col justify-start items-start">
              {socialLinks.map((label) => (
                <div
                  key={label}
                  className="self-stretch py-3 border-b border-b-white/30 inline-flex items-center justify-between"
                >
                  <div className="text-white text-[14px] leading-[19.6px] font-['Figtree'] font-bold">{label}</div>
                  <img
                    src="/images/01%20align%20center.svg"
                    alt=""
                    aria-hidden="true"
                    className="h-5 w-5 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="self-stretch px-[60px] py-4 bg-[#161A1E] border-t border-t-white/15 inline-flex items-center justify-between">
        <div className="flex items-center justify-start gap-6">
          <Link
            href="/mentions-legales"
            className="text-white text-[13px] leading-[13px] font-['Figtree'] font-normal hover:text-white"
          >
            Mentions légales
          </Link>
          <Link
            href="/politique-de-confidentialite"
            className="text-white text-[13px] leading-[13px] font-['Figtree'] font-normal hover:text-white"
          >
            Politique de confidentialité
          </Link>
        </div>
        <div className="flex items-center justify-end gap-3">
          <img src="/images/Made%20by.svg" alt="Made by" className="h-[40px] w-auto object-contain" />
          <img src="/images/Footer%20Made%20By%20Logo.svg" alt="Fief logo" className="h-[40px] w-auto object-contain" />
        </div>
      </div>
    </section>
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
