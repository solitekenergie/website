/* eslint-disable @next/next/no-img-element */

export function TestimonialsSection() {
  return (
    <section className="w-full h-full px-[100px] pb-[60px] pt-[60px] inline-flex flex-col justify-center items-center gap-10">
      <div className="self-stretch h-14 text-[#161A1E] text-[56px] leading-[56px] font-title font-bold uppercase">
        Ce qu’on dis de nous
      </div>

      <div className="self-stretch p-[44px] bg-[rgba(45,177,128,0.20)] overflow-hidden rounded-[12px] flex flex-col justify-center items-end gap-20">
        <div className="self-stretch inline-flex justify-between items-center">
          <img
            className="w-[250px] h-[249px] relative rounded-[12px] object-cover"
            src="/images/mission-installation-01.jpg"
            alt="Portrait ou réalisation client"
          />
          <div className="inline-flex flex-col justify-end items-start gap-[18px]">
            <div className="flex flex-col justify-start items-start gap-6">
              <div className="inline-flex justify-center items-center gap-1">
                <div className="flex flex-col justify-end text-[#5D6B6C] text-[11px] leading-[22px] font-['Figtree'] font-medium uppercase">
                  Romain Huck | Head of Product
                </div>
              </div>
              <div className="text-[#2DB180] text-[48px] leading-[52px] font-title font-bold uppercase">
                Groupe EDF
              </div>
            </div>
            <div className="flex flex-col justify-start items-start gap-[10px]">
              <div className="w-[524px] text-[#5D6B6C] text-[15px] leading-[22.5px] font-['Figtree'] font-normal">
                “Bien plus qu’un simple installateur, un véritable partenaire de confiance à vos côtés, qui vous accompagne
                avec rigueur, transparence et engagement pour garantir la qualité et la pérennité de chaque installation.”
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="inline-flex justify-start items-start gap-2">
        <NavButton direction="left" />
        <NavButton direction="right" />
      </div>
    </section>
  );
}

function NavButton({ direction }: { direction: "left" | "right" }) {
  const isLeft = direction === "left";
  return (
    <button
      type="button"
      aria-label={isLeft ? "Précédent" : "Suivant"}
      className="flex h-14 w-14 items-center justify-center gap-2 rounded-full bg-[rgba(22,26,30,0.07)]"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={isLeft ? "-rotate-180" : ""}
        aria-hidden="true"
      >
        <path d="M5 12H19" stroke="#161A1E" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 5L19 12L12 19" stroke="#161A1E" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </button>
  );
}
