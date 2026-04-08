/* eslint-disable @next/next/no-img-element */

export function TestimonialsSection() {
  return (
    <section className="inline-flex h-full w-full flex-col items-center justify-center gap-8 px-4 pb-12 pt-12 sm:gap-10 sm:px-8 sm:pb-[60px] sm:pt-[60px] lg:px-[100px]">
      <h2 className="h-auto self-stretch font-title text-3xl font-bold uppercase leading-tight text-[#161A1E] sm:text-4xl sm:leading-tight lg:h-14 lg:text-[56px] lg:leading-[56px]">
        Ce qu&apos;on dit de nous
      </h2>

      <div className="flex flex-col items-end justify-center gap-12 overflow-hidden rounded-lg bg-[rgba(45,177,128,0.20)] p-6 self-stretch sm:gap-16 sm:rounded-xl sm:p-8 lg:gap-20 lg:p-[44px]">
        <div className="inline-flex flex-col items-center justify-between gap-6 self-stretch sm:gap-8 lg:flex-row lg:items-center">
          <img
            className="relative h-[200px] w-[200px] rounded-lg object-cover sm:h-[240px] sm:w-[240px] lg:h-[249px] lg:w-[250px] lg:rounded-xl"
            src="/images/solitek-installation-panneaux-solaires-alsace.jpg"
            alt="Portrait ou réalisation client"
            style={{ objectPosition: '40% 35%' }}
          />
          <div className="inline-flex flex-col items-start justify-end gap-4 sm:gap-[18px]">
            <div className="flex flex-col items-start justify-start gap-4 sm:gap-6">
              <div className="inline-flex items-center justify-center gap-1">
                <p className="flex flex-col justify-end font-ui text-[11px] font-medium uppercase leading-[22px] text-[#5D6B6C]">
                  Romain Huck | Head of Product
                </p>
              </div>
              <h3 className="font-title text-3xl font-bold uppercase leading-tight text-[#1E9A66] sm:text-4xl sm:leading-tight lg:text-[48px] lg:leading-[52px]">
                Groupe EDF
              </h3>
            </div>
            <div className="flex flex-col items-start justify-start gap-2 sm:gap-[10px]">
              <blockquote className="max-w-[524px] font-ui text-sm font-normal leading-relaxed text-[#5D6B6C] sm:text-[15px] sm:leading-[22.5px]">
                &quot;Bien plus qu&apos;un simple installateur, un véritable partenaire de confiance à vos côtés, qui vous accompagne
                avec rigueur, transparence et engagement pour garantir la qualité et la pérennité de chaque installation.&quot;
              </blockquote>
            </div>
          </div>
        </div>
      </div>

      <div className="inline-flex items-start justify-start gap-2">
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
