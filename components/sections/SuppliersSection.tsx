type Logo = {
  width: string;
  height: string;
  src: string;
  alt: string;
};

const logos: Logo[] = [
  { width: "w-[150px]", height: "h-[35.74px]", src: "/images/supplier-01.svg", alt: "Supplier 01" },
  { width: "w-[132.72px]", height: "h-[27.9px]", src: "/images/supplier-02.svg", alt: "Supplier 02" },
  { width: "w-[150px]", height: "h-[42px]", src: "/images/supplier-03.svg", alt: "Supplier 03" },
  { width: "w-[150px]", height: "h-[63.46px]", src: "/images/supplier-04.svg", alt: "Supplier 04" },
  { width: "w-[32.34px]", height: "h-[28.33px]", src: "/images/supplier-05.svg", alt: "Supplier 05" },
  { width: "w-[150px]", height: "h-[20.34px]", src: "/images/supplier-06.svg", alt: "Supplier 06" },
  { width: "w-[150px]", height: "h-[30px]", src: "/images/supplier-07.svg", alt: "Supplier 07" },
  { width: "w-[150px]", height: "h-[34.88px]", src: "/images/supplier-08.svg", alt: "Supplier 08" },
  { width: "w-[150px]", height: "h-[58.83px]", src: "/images/supplier-09.svg", alt: "Supplier 09" },
  { width: "w-[32.4px]", height: "h-[36.68px]", src: "/images/supplier-10.svg", alt: "Supplier 10" },
  { width: "w-[150px]", height: "h-[20px]", src: "/images/supplier-11.svg", alt: "Supplier 11" },
  { width: "w-[150px]", height: "h-[36px]", src: "/images/supplier-12.svg", alt: "POMPAC" },
  { width: "w-[150px]", height: "h-[36px]", src: "/images/supplier-13.svg", alt: "AUBAD" },
  { width: "w-[150px]", height: "h-[36px]", src: "/images/supplier-14.svg", alt: "SIEHR" },
  { width: "w-[150px]", height: "h-[36px]", src: "/images/supplier-15.svg", alt: "BAYWA\u00b7RE" },
  { width: "w-[150px]", height: "h-[36px]", src: "/images/supplier-16.svg", alt: "VOLTEC" },
  { width: "w-[150px]", height: "h-[36px]", src: "/images/supplier-17.svg", alt: "AP SYSTEM" },
  { width: "w-[150px]", height: "h-[36px]", src: "/images/supplier-18.svg", alt: "ATLANTIC" },
  { width: "w-[150px]", height: "h-[36px]", src: "/images/supplier-19.svg", alt: "DAIKIN" },
  { width: "w-[150px]", height: "h-[36px]", src: "/images/supplier-20.svg", alt: "AIRWELL" },
  { width: "w-[180px]", height: "h-[36px]", src: "/images/supplier-21.svg", alt: "WILLY LEISSNER" },
];

export function SuppliersSection() {
  return (
    /* eslint-disable @next/next/no-img-element */
    <section className="inline-flex h-full w-full flex-col items-center justify-center gap-8 px-4 pb-12 pt-8 sm:gap-10 sm:px-8 sm:pb-16 sm:pt-10 lg:gap-10 lg:px-[100px] lg:pb-[100px] lg:pt-[40px]">
      <h2 className="h-auto self-stretch text-center font-title text-3xl font-black uppercase leading-tight text-black sm:text-4xl sm:leading-tight lg:h-14 lg:text-[56px] lg:leading-[56px]">
        Nos FournisseurS
      </h2>

      <div className="flex flex-col items-center justify-center gap-12 overflow-hidden rounded-lg p-6 self-stretch sm:gap-16 sm:rounded-xl sm:p-8 lg:gap-20 lg:p-[44px]">
        <div className="content-center inline-flex flex-wrap items-center justify-center gap-4 self-stretch sm:gap-6">
          {logos.map((logo, idx) => (
            <div key={`${logo.alt}-${idx}`} className={`${logo.width} ${logo.height} flex items-center justify-center`}>
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-full w-full rounded object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
