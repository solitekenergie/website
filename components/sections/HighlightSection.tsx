import Link from "next/link";
import { AnimatedLink } from "../ui/AnimatedLink";

export function HighlightSection() {
  return (
    <section
      className="inline-flex h-full w-full flex-col items-start justify-center gap-2 bg-cover bg-center px-4 pb-12 pt-12 sm:px-8 sm:pb-16 sm:pt-16 lg:px-20 lg:pb-[100px] lg:pt-[100px]"
      style={{
        backgroundImage:
          "linear-gradient(0deg, rgba(0, 0, 0, 0.30) 0%, rgba(0, 0, 0, 0.30) 100%), url('/images/cta-background.jpg')",
      }}
    >
      <div className="flex flex-col items-start justify-start gap-6 overflow-hidden rounded-lg bg-[#D5EFE6] p-6 sm:rounded-xl sm:p-8 lg:p-12">
        <div className="flex flex-col items-start justify-end gap-4 sm:gap-[18px]">
          <div className="flex flex-col items-start justify-start gap-4 sm:gap-6">
            <div className="inline-flex items-center justify-center gap-1">
              <div className="flex flex-col justify-end font-['Outfit'] text-[11px] font-medium uppercase leading-[22px] text-[#5D6B6C]">
                Sous titre
              </div>
            </div>
            <h2 className="font-title text-3xl font-black uppercase leading-tight text-black sm:text-4xl sm:leading-tight lg:text-[48px] lg:leading-[52px]">
              Titre
            </h2>
          </div>
          <div className="flex flex-col items-start justify-start gap-2 sm:gap-[10px]">
            <p className="max-w-[524px] font-['Elza'] text-sm font-normal leading-relaxed text-[#5D6B6C] sm:text-[15px] sm:leading-[22.5px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec elit nec diam efficitur auctor. Praesent
              eros est, laoreet in ornare vitae, volutpat quis velit. Quisque condimentum finibus nisl vel viverra. Nunc sed lectus
              sem. Aenean non lacus ac lacus dictum tincidunt. Duis risus ligula, porttitor a orci vel, consequat feugiat nibh.
              Phasellus blandit aliquet lacus, lobortis facilisis tellus viverra quis.
            </p>
          </div>
          <Link
            href="/estimateur"
            className="inline-flex h-12 items-center justify-center gap-2 rounded bg-[#161A1E] px-6 py-2 font-['Figtree'] text-sm font-bold leading-tight text-white sm:h-14 sm:text-base sm:leading-[22.4px]"
          >
            <AnimatedLink className="text-white">Mon estimation</AnimatedLink>
          </Link>
        </div>
      </div>
    </section>
  );
}
