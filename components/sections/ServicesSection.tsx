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
      className={`${className ?? ""} inline-flex flex-col items-center justify-center gap-4 self-stretch overflow-hidden rounded-lg bg-cover bg-center px-6 py-8 sm:gap-6 sm:rounded-xl sm:px-12 sm:py-10 lg:px-20 lg:py-12`}
      style={cardBackground(image)}
    >
      <div className="flex max-w-[603px] flex-col items-center justify-end gap-8 sm:gap-12">
        <h3 className="w-full text-center font-title text-3xl font-black uppercase leading-tight text-white sm:text-4xl sm:leading-tight lg:text-[56px] lg:leading-[56px]">
          {title}
        </h3>
        <div className="flex flex-col items-center justify-start gap-4 sm:gap-6">
          <p className="font-title text-lg font-normal leading-tight text-white sm:text-xl lg:text-2xl lg:leading-6">{description}</p>
          <div className="inline-flex h-12 items-center justify-center gap-2 rounded bg-white px-6 py-2 sm:h-14">
            <div className="flex flex-col justify-end font-['Figtree'] text-sm font-bold leading-tight text-[#161A1E] sm:text-base sm:leading-[22.4px]">
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
    <section className="inline-flex h-full w-full flex-col items-start justify-start gap-8 px-4 pb-12 pt-12 sm:gap-10 sm:px-8 sm:pb-16 sm:pt-16 lg:gap-12 lg:px-20 lg:pb-[100px] lg:pt-[100px]">
      <div className="flex flex-col items-start justify-start gap-6 self-stretch">
        <h2 className="flex flex-col justify-end font-title text-2xl font-bold uppercase leading-tight text-[#161A1E] sm:text-3xl sm:leading-[44.8px] lg:text-[32px]">
          Nos Services
        </h2>
      </div>

      <div className="flex flex-col items-start justify-start gap-4 self-stretch sm:gap-6">
        <ServiceCard
          title="Photovoltaïque"
          description="Lorem ipsum dolor sit amet"
          image="/images/services-photovoltaique.jpg"
          alt="Panneaux photovoltaïques en fonctionnement"
          className="h-[350px] sm:h-[400px] lg:h-[500px]"
        />

        <div className="inline-flex flex-col items-start justify-start gap-4 self-stretch sm:gap-6 lg:h-[600px] lg:flex-row">
          <ServiceCard
            title="Chauffage"
            description="Lorem ipsum dolor sit amet"
            image="/images/services-chauffage.jpg"
            alt="Système de chauffage moderne"
            className="h-[350px] flex-1 sm:h-[400px] lg:h-full"
          />
          <ServiceCard
            title="Climatisation"
            description="Lorem ipsum dolor sit amet"
            image="/images/services-climatisation.jpg"
            alt="Installation de climatisation"
            className="h-[350px] flex-1 sm:h-[400px] lg:h-full"
          />
        </div>

        <div className="inline-flex flex-col items-start justify-start gap-4 self-stretch sm:gap-6 lg:h-[600px] lg:flex-row">
          <ServiceCard
            title="Ventilation"
            description="Lorem ipsum dolor sit amet"
            image="/images/services-ventilation.jpg"
            alt="Système de ventilation résidentielle"
            className="h-[350px] flex-1 sm:h-[400px] lg:h-full"
          />
          <ServiceCard
            title="Electricité"
            description="Lorem ipsum dolor sit amet"
            image="/images/services-electricite.jpg"
            alt="Travaux et installations électriques"
            className="h-[350px] flex-1 sm:h-[400px] lg:h-full"
          />
        </div>

        <div className="inline-flex flex-col items-start justify-start gap-4 self-stretch sm:gap-6 lg:h-[600px] lg:flex-row">
          <ServiceCard
            title="Entretiens et nettoyage"
            description="Lorem ipsum dolor sit amet"
            image="/images/services-entretien.jpg"
            alt="Prestations d&apos;entretien et nettoyage"
            className="h-[350px] flex-1 sm:h-[400px] lg:h-full"
          />
        </div>
      </div>

      <div className="inline-flex flex-col items-start justify-start gap-6 self-stretch pb-12 pt-8 sm:pb-[60px] sm:pt-12 lg:flex-row lg:gap-[300px] lg:pb-[60px] lg:pt-[60px]">
        <h3 className="flex flex-col justify-end font-title text-2xl font-bold uppercase leading-tight text-[#161A1E] sm:text-3xl sm:leading-[44.8px] lg:text-[32px]">
          Titre
        </h3>
        <div className="flex-1 font-['Figtree'] text-base font-normal leading-relaxed text-black sm:text-lg sm:leading-[27px]">
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
