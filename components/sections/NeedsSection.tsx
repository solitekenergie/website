/* eslint-disable @next/next/no-img-element */
export function NeedsSection() {
  return (
    <section className="relative inline-flex h-full w-full flex-col items-start justify-start gap-8 overflow-hidden bg-[#161A1E] p-4 sm:gap-10 sm:p-8 lg:gap-12 lg:p-[100px]">
      {/* Decorative background blocks */}
      <div className="pointer-events-none absolute -left-40 -top-[500px] h-[1549px] w-[1256px] bg-black opacity-20" />
      <div className="pointer-events-none absolute -top-[400px] right-[-500px] h-[1549px] w-[1256px] bg-black opacity-10" />

      <div className="flex flex-col items-center justify-start gap-8 self-stretch sm:gap-10 lg:gap-12">
        <h2 className="self-stretch text-center font-title text-3xl font-black uppercase leading-tight text-white sm:text-4xl sm:leading-tight lg:text-[56px] lg:leading-[56px]">
          Connaitre votre <br />
          besoins
        </h2>
      </div>

      <div className="relative z-10 inline-flex flex-col items-start justify-start gap-6 self-stretch lg:flex-row">
        <div className="inline-flex flex-1 flex-col items-center justify-start gap-6 self-stretch rounded-lg bg-white px-4 py-8 sm:gap-8 sm:rounded-xl sm:px-5 sm:py-10 lg:gap-10">
          <div className="flex flex-col items-center justify-start gap-3 self-stretch">
            <div className="inline-flex items-center justify-start gap-2 rounded-[26px] p-3 outline outline-2 outline-black">
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
            <p className="self-stretch text-center font-title text-base font-medium leading-tight text-black sm:text-lg sm:leading-[18px]">
              Faites votre demande de devis <br />
              en moins de 2 minutes
            </p>
          </div>

          <div className="relative inline-flex items-center justify-start gap-4 self-stretch px-4 sm:gap-6 sm:px-6">
            <div className="relative h-0.5 flex-1 border-t-4 border-black/40" />
            <div className="absolute left-4 top-1/2 h-0 w-[10px] -translate-y-1/2 border-t-4 border-black sm:left-6" />
            <div className="flex flex-col justify-end font-title text-sm font-normal text-black/80 sm:text-base sm:leading-[19.2px]">
              0%
            </div>
          </div>

          <h3 className="self-stretch text-center font-title text-xl font-semibold uppercase leading-tight text-black sm:text-2xl sm:leading-tight lg:text-[32px] lg:leading-[32px]">
            Quel type de logement souhaitez-vous équiper ?
          </h3>

          <div className="flex flex-col items-start justify-start gap-4 self-stretch">
            {["Maison", "Appartement", "Autre..."].map((label) => (
              <div
                key={label}
                className="inline-flex h-12 items-center justify-center gap-2 self-stretch rounded-lg bg-white px-4 py-4 outline outline-2 outline-[#2DB180] sm:h-[50px] sm:px-6"
              >
                <div className="flex flex-col justify-end font-title text-sm font-normal text-black/80 sm:text-base sm:leading-[19.2px]">
                  {label}
                </div>
              </div>
            ))}
          </div>

          <div className="relative h-12 self-stretch sm:h-14">
            <div className="absolute left-0 top-0 inline-flex h-12 w-12 items-center justify-center gap-2 rounded-full bg-[#2DB180] sm:h-14 sm:w-14">
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

        <div className="hidden flex-1 self-stretch lg:block">
          <div className="h-full w-full rounded-lg p-6 sm:p-8 lg:p-10">
            <img
              className="h-full w-full rounded-lg object-cover"
              src="/images/mission-technicien-04.jpg"
              alt="Technicien solarisé présentant une installation"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
