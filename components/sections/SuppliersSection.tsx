/* eslint-disable @next/next/no-img-element */

type Logo = {
  src: string;
  alt: string;
  square?: boolean;
};

const logos: Logo[] = [
  { src: "/images/pompac.svg", alt: "POMPAC" },
  { src: "/images/aubade.svg", alt: "Aubade" },
  { src: "/images/siehr.svg", alt: "SIEHR" },
  { src: "/images/bayware.svg", alt: "BayWa r.e." },
  { src: "/images/voltec.svg", alt: "Voltec", square: true },
  { src: "/images/ap-storage.svg", alt: "AP Storage" },
  { src: "/images/atlantic.svg", alt: "Atlantic" },
  { src: "/images/daikin.svg", alt: "Daikin" },
  { src: "/images/airwell.svg", alt: "Airwell" },
  { src: "/images/willy-leissner.svg", alt: "Willy Leissner" },
];

export function SuppliersSection() {
  return (
    <section className="relative w-full overflow-hidden py-10 sm:py-14 lg:py-16">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-slate-50 to-transparent sm:w-32 lg:w-48" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-slate-50 to-transparent sm:w-32 lg:w-48" />
      <div className="animate-marquee flex w-max items-center gap-16 sm:gap-20 lg:gap-24">
        {[...logos, ...logos].map((logo, idx) => (
          <div
            key={idx}
            className="flex shrink-0 items-center justify-center"
            style={logo.square ? { width: 44, height: 44 } : { height: 32 }}
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className={logo.square ? "h-full w-full object-contain" : "h-full w-auto object-contain"}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
