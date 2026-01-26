export default function ContactPage() {
  return (
    <section className="w-full h-full pt-[160px] pb-20 px-[100px] inline-flex justify-start items-start gap-[120px] bg-[#F5F7FA]">
      <div className="flex-1 overflow-hidden rounded-[8px] inline-flex flex-col justify-start items-start gap-8 p-0">
        <div className="w-full flex flex-col justify-start items-start gap-6">
          <div className="text-[#161A1E] text-[72px] leading-[72px] font-title font-black uppercase">
            Demandez <br />
            un devis
          </div>
          <form className="w-full flex flex-col justify-start items-start gap-4">
            <div className="w-full inline-flex gap-4">
              <Field label="Nom*" type="text" />
              <Field label="Prenom*" type="text" />
            </div>
            <div className="w-full inline-flex gap-4">
              <Field label="E-mail*" type="email" full />
            </div>
            <Field label="Numéro de téléphone*" type="tel" full />
            <Field label="Code postal*" type="text" full />
            <Field label="Message*" type="text" full />
            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-[8px] bg-[#2DB180] px-6 py-4"
            >
              <span className="text-white text-[14px] leading-[16.8px] font-['Figtree'] font-bold uppercase">
                Envoyer
              </span>
            </button>
          </form>
        </div>
      </div>

      <div className="relative w-[536px] h-[698px] pt-10 pb-10 overflow-hidden rounded-[24px]">
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.20)_0%,rgba(0,0,0,0.20)_100%)] pointer-events-none" />
        <video
          className="h-full w-full rounded-[24px] object-cover scale-110"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/images/mission-toiture-05.jpg"
        >
          <source src="/images/contact-hero.mp4" type="video/mp4" />
          Votre navigateur ne supporte pas la vidéo HTML5.
        </video>
      </div>
    </section>
  );
}

type FieldProps = {
  label: string;
  type: string;
  full?: boolean;
};

function Field({ label, type, full }: FieldProps) {
  return (
    <div className={`inline-flex flex-col justify-start items-start gap-2 ${full ? "flex-1" : "flex-1"}`}>
      <div className="text-[16px] leading-[19.2px] font-title font-normal text-black/60">{label}</div>
      <input
        type={type}
        className="h-[50px] w-full rounded-[8px] border border-[rgba(128,128,128,0.55)] px-6 py-4 text-[16px] text-[#161A1E] focus:outline-none"
      />
    </div>
  );
}
