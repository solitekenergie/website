type ServiceCardProps = {
  title: string;
  description: string;
  image: string;
  className?: string;
  alt: string;
};

const cardBackground = (image: string) => ({
  backgroundColor: "rgba(0, 0, 0, 0.20)",
  backgroundImage: "linear-gradient(180deg, rgba(0, 0, 0, 0) 37%, black 89%), url('" + image + "')",
  backgroundSize: "cover",
  backgroundPosition: "center",
});

function ServiceCard({ title, description, image, className, alt }: ServiceCardProps) {
  return (
    <div
      className={`${className ?? ""} self-stretch px-[80px] py-12 bg-cover bg-center overflow-hidden rounded-[12px] inline-flex flex-col justify-center items-center gap-6`}
      style={cardBackground(image)}
    >
      <div className="w-[603px] flex flex-col justify-end items-center gap-12">
        <div className="w-full text-center text-white text-[56px] leading-[56px] font-title font-black uppercase">
          {title}
        </div>
        <div className="flex flex-col justify-start items-center gap-6">
          <div className="text-white text-[24px] leading-[24px] font-title font-normal">{description}</div>
          <div className="inline-flex h-14 px-6 py-2 bg-white rounded-[4px] justify-center items-center gap-2">
            <div className="flex flex-col justify-end text-[#161A1E] text-[16px] leading-[22.4px] font-['Figtree'] font-bold">
              Mon estimation
            </div>
          </div>
        </div>
      </div>
      <span className="sr-only">{alt}</span>
    </div>
  );
}

export function ServicesSection() {
  return (
    <section className="w-full h-full px-20 pt-[100px] pb-[100px] inline-flex flex-col justify-start items-start gap-12">
      <div className="self-stretch flex flex-col justify-start items-start gap-6">
        <div className="flex flex-col justify-end text-[#161A1E] text-[32px] leading-[44.8px] font-title font-bold uppercase">
          Nos Services
        </div>
      </div>

      <div className="self-stretch flex flex-col justify-start items-start gap-6">
        <ServiceCard
          title="Photovoltaïque"
          description="Lorem ipsum dolor sit amet"
          image="/images/services-photovoltaique.jpg"
          alt="Panneaux photovoltaïques en fonctionnement"
          className="h-[500px]"
        />

        <div className="self-stretch h-[600px] inline-flex justify-start items-start gap-6">
          <ServiceCard
            title="Chauffage"
            description="Lorem ipsum dolor sit amet"
            image="/images/services-chauffage.jpg"
            alt="Système de chauffage moderne"
            className="flex-1 h-full"
          />
          <ServiceCard
            title="Climatisation"
            description="Lorem ipsum dolor sit amet"
            image="/images/services-climatisation.jpg"
            alt="Installation de climatisation"
            className="flex-1 h-full"
          />
        </div>

        <div className="self-stretch h-[600px] inline-flex justify-start items-start gap-6">
          <ServiceCard
            title="Ventilation"
            description="Lorem ipsum dolor sit amet"
            image="/images/services-ventilation.jpg"
            alt="Système de ventilation résidentielle"
            className="flex-1 h-full"
          />
          <ServiceCard
            title="Electricité"
            description="Lorem ipsum dolor sit amet"
            image="/images/services-electricite.jpg"
            alt="Travaux et installations électriques"
            className="flex-1 h-full"
          />
        </div>

        <div className="self-stretch h-[600px] inline-flex justify-start items-start gap-6">
          <ServiceCard
            title="Entretiens et nettoyage"
            description="Lorem ipsum dolor sit amet"
            image="/images/services-entretien.jpg"
            alt="Prestations d’entretien et nettoyage"
            className="flex-1 h-full"
          />
        </div>
      </div>

      <div className="self-stretch pt-[60px] pb-[60px] inline-flex justify-start items-start gap-[300px]">
        <div className="flex flex-col justify-end text-[#161A1E] text-[32px] leading-[44.8px] font-title font-bold uppercase">
          Titre
        </div>
        <div className="flex-1 text-black text-[18px] leading-[27px] font-['Figtree'] font-normal">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec elit nec diam efficitur auctor. Praesent eros
          est, laoreet in ornare vitae, volutpat quis velit. Quisque condimentum finibus nisl vel viverra. Nunc sed lectus
          sem. Aenean non lacus ac lacus dictum tincidunt. Duis risus ligula, porttitor a orci vel, consequat feugiat
          nibh. Phasellus blandit aliquet lacus, lobortis facilisis tellus viverra quis. Sed neque purus, auctor vel
          lobortis nec, blandit id lorem. Quisque aliquet egestas cursus. Nulla porttitor justo ac urna pretium, quis
          suscipit ante sodales. Ut sed velit quam. Phasellus et mattis ipsum. Ut a libero vehicula, molestie magna
          convallis, malesuada lectus. Sed quis pulvinar arcu. Proin blandit libero vitae diam facilisis fringilla. Nullam
          dictum risus mauris, ullamcorper porta mauris sagittis non.
        </div>
      </div>
    </section>
  );
}
