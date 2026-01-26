/* eslint-disable @next/next/no-img-element */

const cards = [
  {
    image: "/images/mission-installation-01.jpg",
    title: "Titre projets",
    date: "12 juillet 2025",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec elit nec diam efficitur auctor. Praesent eros est, laoreet in ornare vitae, volutpat quis velit. Quisque condimentum finibus nisl vel viverra. Nunc sed lectus sem. Aenean non lacus ac lacus dictum tincidunt. Duis risus ligula, porttitor a orci vel, consequat feugiat nibh.",
  },
  {
    image: "/images/mission-panneaux-02.jpg",
    title: "Titre projets",
    date: "12 juillet 2025",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec elit nec diam efficitur auctor. Praesent eros est, laoreet in ornare vitae, volutpat quis velit. Quisque condimentum finibus nisl vel viverra. Nunc sed lectus sem. Aenean non lacus ac lacus dictum tincidunt. Duis risus ligula, porttitor a orci vel, consequat feugiat nibh.",
  },
  {
    image: "/images/mission-detail-technique-03.jpg",
    title: "Titre projets",
    date: "12 juillet 2025",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec elit nec diam efficitur auctor. Praesent eros est, laoreet in ornare vitae, volutpat quis velit. Quisque condimentum finibus nisl vel viverra. Nunc sed lectus sem. Aenean non lacus ac lacus dictum tincidunt. Duis risus ligula, porttitor a orci vel, consequat feugiat nibh.",
  },
  {
    image: "/images/mission-technicien-04.jpg",
    title: "Titre projets",
    date: "12 juillet 2025",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec elit nec diam efficitur auctor. Praesent eros est, laoreet in ornare vitae, volutpat quis velit. Quisque condimentum finibus nisl vel viverra. Nunc sed lectus sem. Aenean non lacus ac lacus dictum tincidunt. Duis risus ligula, porttitor a orci vel, consequat feugiat nibh.",
  },
  {
    image: "/images/mission-toiture-05.jpg",
    title: "Titre projets",
    date: "12 juillet 2025",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec elit nec diam efficitur auctor. Praesent eros est, laoreet in ornare vitae, volutpat quis velit. Quisque condimentum finibus nisl vel viverra. Nunc sed lectus sem. Aenean non lacus ac lacus dictum tincidunt. Duis risus ligula, porttitor a orci vel, consequat feugiat nibh.",
  },
  {
    image: "/images/services-photovoltaique.jpg",
    title: "Titre projets",
    date: "12 juillet 2025",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec elit nec diam efficitur auctor. Praesent eros est, laoreet in ornare vitae, volutpat quis velit. Quisque condimentum finibus nisl vel viverra. Nunc sed lectus sem. Aenean non lacus ac lacus dictum tincidunt. Duis risus ligula, porttitor a orci vel, consequat feugiat nibh.",
  },
];

export default function RealisationsPage() {
  return (
    <section className="w-full h-full pt-[200px] pb-[100px] px-[100px] inline-flex flex-col justify-start items-start gap-20">
      <div className="self-stretch text-center text-black text-[56px] leading-[56px] font-title font-black uppercase">
        Nos réalisation
      </div>

      <div className="self-stretch flex flex-col justify-start items-start gap-20">
        <div className="self-stretch inline-flex flex-wrap justify-start items-start gap-6">
          {cards.slice(0, 3).map((card) => (
            <Card key={card.image} {...card} />
          ))}
        </div>
        <div className="self-stretch inline-flex flex-wrap justify-start items-start gap-6">
          {cards.slice(3, 6).map((card) => (
            <Card key={card.image} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}

type CardProps = {
  image: string;
  title: string;
  date: string;
  description: string;
};

function Card({ image, title, date, description }: CardProps) {
  return (
    <div className="flex-1 min-w-[300px] max-w-[560px] inline-flex flex-col justify-start items-start gap-6">
      <div className="h-[278.13px] w-full p-10 bg-[#161A1E] overflow-hidden rounded-[8px] flex flex-col justify-end items-center gap-2">
        <img className="h-full w-full rounded-[6px] object-cover" src={image} alt={title} />
      </div>
      <div className="self-stretch flex flex-col justify-start items-start gap-6">
        <div className="self-stretch flex flex-col justify-start items-start gap-4">
          <div className="self-stretch text-[#161A1E] text-[28px] leading-[28px] font-title font-black uppercase">
            {title}
          </div>
          <div className="self-stretch text-[15px] leading-6 font-['Figtree'] font-normal text-black/60 opacity-80">
            {date}
          </div>
        </div>
        <div className="self-stretch text-black text-[18px] leading-[27px] font-['Figtree'] font-normal">
          {description}
        </div>
      </div>
    </div>
  );
}
