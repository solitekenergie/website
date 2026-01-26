"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { estimatePvSystem } from "@/lib/pv/estimate";
import type { PvEstimateResult } from "@/lib/pv/types";

const DEFAULTS = {
  annualConsumptionKwh: 4200,
  coveragePercent: 70,
  irradiation: 1200,
};

export default function EstimatorForm() {
  const [inputs, setInputs] = useState(DEFAULTS);
  const [result, setResult] = useState<PvEstimateResult | null>(null);

  const updateField = (key: keyof typeof inputs) => (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setInputs((prev) => ({ ...prev, [key]: Number.isNaN(value) ? 0 : value }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const coverageRatio = Math.min(Math.max(inputs.coveragePercent / 100, 0), 1);

    const estimation = estimatePvSystem({
      annualConsumptionKwh: inputs.annualConsumptionKwh,
      coverage: coverageRatio,
      irradiation: inputs.irradiation,
    });

    setResult(estimation);
  };

  return (
    <div className="space-y-4">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-800" htmlFor="annualConsumptionKwh">
              Consommation annuelle (kWh)
            </label>
            <input
              id="annualConsumptionKwh"
              type="number"
              min={0}
              value={inputs.annualConsumptionKwh}
              onChange={updateField("annualConsumptionKwh")}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-inner focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100"
            />
            <p className="text-xs text-slate-500">Basez-vous sur vos factures ou votre espace fournisseur.</p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-800" htmlFor="coveragePercent">
              Couverture visée (%)
            </label>
            <input
              id="coveragePercent"
              type="number"
              min={10}
              max={100}
              step={5}
              value={inputs.coveragePercent}
              onChange={updateField("coveragePercent")}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-inner focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100"
            />
            <p className="text-xs text-slate-500">
              60-80 % correspond souvent au meilleur équilibre investissement / autonomie.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-800" htmlFor="irradiation">
            Irradiation annuelle locale (kWh/kWc)
          </label>
          <input
            id="irradiation"
            type="number"
            min={800}
            max={1500}
            value={inputs.irradiation}
            onChange={updateField("irradiation")}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-inner focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100"
          />
          <p className="text-xs text-slate-500">
            Par défaut : 1 200 kWh/kWc pour la France métropolitaine. Ajustez selon votre région.
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-500">Calcul local, vos données ne sont pas stockées.</p>
          <button
            type="submit"
            className="rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sky-700"
          >
            Calculer
          </button>
        </div>
      </form>

      {result && (
        <div className="grid gap-4 rounded-xl border border-slate-200 bg-slate-50 p-6 shadow-inner md:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Puissance recommandée</p>
            <p className="text-2xl font-semibold text-slate-900">{result.recommendedKw} kWc</p>
            <p className="text-xs text-slate-600">Formule : (conso annuelle × couverture) / irradiation</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Production estimée</p>
            <p className="text-2xl font-semibold text-slate-900">{result.annualProductionKwh} kWh/an</p>
            <p className="text-xs text-slate-600">Hypothèse : irradiation constante sur l’année</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Taux de couverture</p>
            <p className="text-2xl font-semibold text-slate-900">
              {Math.round(result.coverageRate * 100)}%
            </p>
            <p className="text-xs text-slate-600">Ajustez la couverture visée pour moduler l’investissement</p>
          </div>
        </div>
      )}
    </div>
  );
}
