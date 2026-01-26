import EstimatorForm from "@/components/forms/EstimatorForm";

export default function EstimatorPage() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-wide text-sky-700">Estimateur</p>
        <h1 className="text-3xl font-semibold text-slate-900">Dimensionnez votre installation photovoltaïque</h1>
        <p className="max-w-4xl text-slate-600">
          Un calcul rapide pour estimer la puissance kWc recommandée en fonction de votre consommation annuelle, de la couverture souhaitée et de l’irradiation locale.
        </p>
      </div>

      <EstimatorForm />

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">Formule de calcul</h2>
          <p className="mt-2 text-sm text-slate-600">
            kWc recommandé = (consommation annuelle × taux de couverture) / irradiation locale.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">Hypothèses</h2>
          <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-slate-600">
            <li>Irradiation moyenne 1 100 à 1 400 kWh/kWc selon la région.</li>
            <li>Perte standard incluse : rendement onduleur et température.</li>
            <li>Résultat indicatif : une visite technique affinera le dimensionnement.</li>
          </ul>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">Prochaines étapes</h2>
          <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-slate-600">
            <li>Envoyer vos factures pour valider les profils de charge.</li>
            <li>Programmer une visite technique pour vérifier la toiture.</li>
            <li>Recevoir une simulation de production horaire et financière.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
