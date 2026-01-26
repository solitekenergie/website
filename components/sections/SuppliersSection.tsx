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
];

export function SuppliersSection() {
  return (
    /* eslint-disable @next/next/no-img-element */
    <section className="w-full h-full pt-[40px] pb-[100px] px-[100px] inline-flex flex-col justify-center items-center gap-10">
      <div className="self-stretch h-14 text-center text-black text-[56px] leading-[56px] font-title font-black uppercase">
        Nos FournisseurS
      </div>

      <div className="self-stretch p-[44px] overflow-hidden rounded-[12px] flex flex-col justify-center items-center gap-20">
        <div className="self-stretch inline-flex flex-wrap items-center justify-center gap-6 content-center">
          {logos.map((logo, idx) => (
            <div key={`${logo.alt}-${idx}`} className={`${logo.width} ${logo.height} flex items-center justify-center`}>
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-full w-full rounded-[4px] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
