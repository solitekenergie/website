/* eslint-disable @next/next/no-img-element */

export default function DebugImages() {
  return (
    <div className="flex flex-col gap-6 p-8">
      <h1 className="text-xl font-semibold">Debug Images</h1>
      <div className="flex gap-4 flex-wrap">
        <img className="h-32 w-48 object-cover rounded" src="/images/mission-installation-01.jpg" alt="mission 1" />
        <img className="h-32 w-48 object-cover rounded" src="/images/mission-panneaux-02.jpg" alt="mission 2" />
        <img className="h-32 w-48 object-cover rounded" src="/images/mission-detail-technique-03.jpg" alt="mission 3" />
        <img className="h-32 w-48 object-cover rounded" src="/images/mission-technicien-04.jpg" alt="mission 4" />
        <img className="h-32 w-48 object-cover rounded" src="/images/mission-toiture-05.jpg" alt="mission 5" />
      </div>
      <div className="flex gap-4 flex-wrap">
        <img className="h-32 w-48 object-cover rounded" src="/images/services-photovoltaique.jpg" alt="service photovoltaïque" />
        <img className="h-32 w-48 object-cover rounded" src="/images/services-chauffage.jpg" alt="service chauffage" />
        <img className="h-32 w-48 object-cover rounded" src="/images/services-climatisation.jpg" alt="service climatisation" />
        <img className="h-32 w-48 object-cover rounded" src="/images/services-ventilation.jpg" alt="service ventilation" />
        <img className="h-32 w-48 object-cover rounded" src="/images/services-electricite.jpg" alt="service electricité" />
        <img className="h-32 w-48 object-cover rounded" src="/images/services-entretien.jpg" alt="service entretien" />
      </div>
    </div>
  );
}
