/* eslint-disable @next/next/no-img-element */
export function NeedsSection() {
  return (
    <section className="relative w-full h-full p-[100px] bg-[#161A1E] overflow-hidden inline-flex flex-col justify-start items-start gap-12">
      {/* Decorative background blocks */}
      <div className="pointer-events-none absolute -left-40 -top-[500px] w-[1256px] h-[1549px] bg-black opacity-20" />
      <div className="pointer-events-none absolute right-[-500px] -top-[400px] w-[1256px] h-[1549px] bg-black opacity-10" />

      <div className="self-stretch flex flex-col justify-start items-center gap-12">
        <div className="self-stretch text-center text-white text-[56px] leading-[56px] font-title font-black uppercase">
          Connaitre votre <br />
          besoins
        </div>
      </div>

      <div className="self-stretch inline-flex justify-start items-start gap-6 relative z-10">
        <div className="flex-1 self-stretch px-5 py-10 bg-white rounded-[12px] inline-flex flex-col justify-start items-center gap-10">
          <div className="self-stretch flex flex-col justify-start items-center gap-3">
            <div className="p-3 rounded-[26px] outline outline-2 outline-black inline-flex justify-start items-center gap-2">
              <div className="relative h-6 w-6 overflow-hidden">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="absolute inset-0"
                >
                  <path
                    d="M4 12.5C4 10.567 5.567 9 7.5 9H13.5C15.433 9 17 10.567 17 12.5V16H7.5C5.567 16 4 14.433 4 12.5Z"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11 8C11 6.34315 12.3431 5 14 5C15.6569 5 17 6.34315 17 8V16"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path d="M10 12H7" stroke="black" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <div className="self-stretch text-center text-black text-[18px] leading-[18px] font-title font-medium">
              Faites votre demande de devis <br />
              en moins de 2 minutes
            </div>
          </div>

          <div className="self-stretch px-6 inline-flex justify-start items-center gap-6 relative">
            <div className="relative flex-1 h-0.5 border-t-[4px] border-black/40" />
            <div className="absolute left-6 top-1/2 -translate-y-1/2 w-[10px] h-0 border-t-[4px] border-black" />
            <div className="flex flex-col justify-end text-[16px] leading-[19.2px] font-title font-normal text-black/80">
              0%
            </div>
          </div>

          <div className="self-stretch text-center text-black text-[32px] leading-[32px] font-title font-semibold uppercase">
            Quel type de logement souhaitez-vous équiper ?
          </div>

          <div className="self-stretch flex flex-col justify-start items-start gap-4">
            {["Maison", "Appartement", "Autre..."].map((label) => (
              <div
                key={label}
                className="self-stretch h-[50px] px-6 py-4 bg-white rounded-[8px] outline outline-[2px] outline-[#2DB180] inline-flex justify-center items-center gap-2"
              >
                <div className="flex flex-col justify-end text-black/80 text-[16px] leading-[19.2px] font-title font-normal">
                  {label}
                </div>
              </div>
            ))}
          </div>

          <div className="self-stretch h-14 relative">
            <div className="absolute left-0 top-0 inline-flex h-14 w-14 items-center justify-center gap-2 rounded-full bg-[#2DB180]">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="-rotate-180"
              >
                <path d="M5 12H19" stroke="#161A1E" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 5L19 12L12 19" stroke="#161A1E" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex-1 self-stretch">
          <div className="h-full w-full rounded-[8px] p-10">
            <img
              className="h-full w-full rounded-[8px] object-cover"
              src="/images/mission-technicien-04.jpg"
              alt="Technicien solarisé présentant une installation"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
