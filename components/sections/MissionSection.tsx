/* eslint-disable @next/next/no-img-element */
export function MissionSection() {
  return (
    <section className="w-full pb-[60px] inline-flex flex-col items-center">
      <div className="self-stretch pt-[100px] pb-[80px] px-[80px] flex flex-col items-center gap-6">
        <div className="text-[#161A1E] text-[56px] font-title font-black uppercase leading-[78.40px]">
          Notre mission
        </div>
        <div className="w-[800px] text-center text-black text-[18px] font-normal font-['Figtree'] leading-[27px]">
          Chez SOLITEK, nous croyons qu’une transition énergétique réussie passe par la proximité, la transparence et la confiance.
          Nous accompagnons chaque client avec une approche sur mesure, du conseil à l’installation, pour garantir la performance et la durabilité de chaque projet.
        </div>
      </div>
      <div className="w-[1240px] h-[412px] overflow-hidden inline-flex justify-center items-center gap-4">
        <div className="inline-flex items-center gap-4">
          <div className="w-[324px] h-[404px] flex-none overflow-hidden rounded-[4px]">
            <img
              className="w-full h-full object-cover"
              src="/images/mission-installation-01.jpg"
              alt="Installation de panneaux solaires sur une toiture résidentielle"
            />
          </div>
          <div className="w-[388px] h-[404px] flex-none overflow-hidden rounded-[4px]">
            <img
              className="w-full h-full object-cover"
              src="/images/mission-panneaux-02.jpg"
              alt="Rangée de panneaux solaires captant la lumière du soleil"
            />
          </div>
          <div className="w-[412px] h-[412px] flex-none overflow-hidden rounded-[4px] p-8">
            <img
              className="w-full h-full object-cover rounded-[4px]"
              src="/images/mission-detail-technique-03.jpg"
              alt="Détail technique d’un panneau solaire et de son câblage"
            />
          </div>
          <div className="w-[388px] h-[412px] flex-none overflow-hidden rounded-[4px]">
            <img
              className="w-full h-full object-cover"
              src="/images/mission-technicien-04.jpg"
              alt="Technicien solaire vérifiant une installation"
            />
          </div>
          <div className="w-[324px] h-[412px] flex-none overflow-hidden rounded-[4px]">
            <img
              className="w-full h-full object-cover"
              src="/images/mission-toiture-05.jpg"
              alt="Vue aérienne d’une toiture équipée de panneaux solaires"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
