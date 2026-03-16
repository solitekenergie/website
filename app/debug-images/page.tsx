/* eslint-disable @next/next/no-img-element */

export default function DebugImages() {
  return (
    <div className="flex flex-col gap-6 p-8">
      <h1 className="text-xl font-semibold">Debug Images</h1>
      <div className="flex gap-4 flex-wrap">
        <img className="h-32 w-48 object-cover rounded" src="/images/solitek-installation-panneaux-solaires-alsace.jpg" alt="mission 1" />
        <img className="h-32 w-48 object-cover rounded" src="/images/solitek-panneaux-solaires-photovoltaiques-maison.jpg" alt="mission 2" />
        <img className="h-32 w-48 object-cover rounded" src="/images/solitek-detail-technique-installation-photovoltaique.jpg" alt="mission 3" />
        <img className="h-32 w-48 object-cover rounded" src="/images/solitek-technicien-pose-panneaux-solaires-strasbourg.jpg" alt="mission 4" />
        <img className="h-32 w-48 object-cover rounded" src="/images/solitek-toiture-equipee-panneaux-solaires-alsace.jpg" alt="mission 5" />
      </div>
      <div className="flex gap-4 flex-wrap">
        <img className="h-32 w-48 object-cover rounded" src="/images/solitek-installation-photovoltaique-residentiel-alsace.jpg" alt="service photovoltaïque" />
        <img className="h-32 w-48 object-cover rounded" src="/images/solitek-installation-pompe-chaleur-air-eau-alsace.jpg" alt="service chauffage" />
        <img className="h-32 w-48 object-cover rounded" src="/images/solitek-installation-climatisation-reversible-alsace.jpg" alt="service climatisation" />
        <img className="h-32 w-48 object-cover rounded" src="/images/solitek-installation-vmc-double-flux-alsace.jpg" alt="service ventilation" />
        <img className="h-32 w-48 object-cover rounded" src="/images/solitek-electricien-rge-strasbourg-mise-aux-normes.jpg" alt="service electricité" />
        <img className="h-32 w-48 object-cover rounded" src="/images/solitek-entretien-nettoyage-panneaux-solaires.jpg" alt="service entretien" />
      </div>
    </div>
  );
}
