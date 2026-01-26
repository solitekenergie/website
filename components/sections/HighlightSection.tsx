import Link from "next/link";

export function HighlightSection() {
  return (
    <section
      className="w-full h-full px-20 pt-[100px] pb-[100px] inline-flex flex-col justify-center items-start gap-2 bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(0deg, rgba(0, 0, 0, 0.30) 0%, rgba(0, 0, 0, 0.30) 100%), url('/images/cta-background.jpg')",
      }}
    >
      <div className="p-12 bg-[#D5EFE6] overflow-hidden rounded-[12px] flex flex-col justify-start items-start gap-6">
        <div className="flex flex-col justify-end items-start gap-[18px]">
          <div className="flex flex-col justify-start items-start gap-6">
            <div className="inline-flex justify-center items-center gap-1">
              <div className="flex flex-col justify-end text-[#5D6B6C] text-[11px] leading-[22px] font-['Outfit'] font-medium uppercase">
                Sous titre
              </div>
            </div>
            <div className="text-black text-[48px] leading-[52px] font-title font-black uppercase">
              Titre
            </div>
          </div>
          <div className="flex flex-col justify-start items-start gap-[10px]">
            <div className="w-[524px] text-[#5D6B6C] text-[15px] leading-[22.5px] font-['Elza'] font-normal">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec elit nec diam efficitur auctor. Praesent
              eros est, laoreet in ornare vitae, volutpat quis velit. Quisque condimentum finibus nisl vel viverra. Nunc sed lectus
              sem. Aenean non lacus ac lacus dictum tincidunt. Duis risus ligula, porttitor a orci vel, consequat feugiat nibh.
              Phasellus blandit aliquet lacus, lobortis facilisis tellus viverra quis.
            </div>
          </div>
          <Link
            href="/estimateur"
            className="inline-flex h-14 items-center justify-center gap-2 rounded-[4px] bg-[#161A1E] px-6 py-2 text-white text-[16px] leading-[22.4px] font-['Figtree'] font-bold"
          >
            Mon estimation
          </Link>
        </div>
      </div>
    </section>
  );
}
