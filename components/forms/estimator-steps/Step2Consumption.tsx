"use client";

import { useState } from "react";
import type { EstimatorFormData } from "../MultiStepEstimatorForm";

interface Step2Props {
  formData: Partial<EstimatorFormData>;
  updateFormData: (data: Partial<EstimatorFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step2Consumption({ formData, updateFormData, onNext, onBack }: Step2Props) {
  const [unit, setUnit] = useState<"kwh" | "euro">(formData.consumptionUnit || "kwh");
  const [consumption, setConsumption] = useState(formData.consumptionValue?.toString() || "");
  const [electricityPrice, setElectricityPrice] = useState(
    formData.electricityPrice?.toString() || ""
  );

  const handleUnitChange = (newUnit: "kwh" | "euro") => {
    setUnit(newUnit);
    updateFormData({ consumptionUnit: newUnit });
  };

  const handleNext = () => {
    const consumptionValue = Number.parseFloat(consumption);
    const priceValue = electricityPrice ? Number.parseFloat(electricityPrice) : undefined;

    if (!Number.isNaN(consumptionValue) && consumptionValue > 0) {
      updateFormData({
        consumptionValue,
        consumptionUnit: unit,
        electricityPrice: unit === "euro" ? priceValue : undefined,
      });
      onNext();
    }
  };

  const isValid =
    consumption &&
    !Number.isNaN(Number.parseFloat(consumption)) &&
    Number.parseFloat(consumption) > 0 &&
    (unit === "kwh" || (unit === "euro" && electricityPrice && !Number.isNaN(Number.parseFloat(electricityPrice))));

  return (
    <div className="space-y-8">
      <h2 className="font-semibold text-[32px] text-slate-900">
        PROFIL DE CONSOMMATION
      </h2>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => handleUnitChange("kwh")}
          className={`flex-1 rounded-lg border-2 px-6 py-3 font-medium transition-colors ${
            unit === "kwh"
              ? "border-[#5CB88F] bg-[#5CB88F] text-white"
              : "border-slate-300 bg-white text-slate-700 hover:border-[#5CB88F]"
          }`}
        >
          En kWh
        </button>
        <button
          type="button"
          onClick={() => handleUnitChange("euro")}
          className={`flex-1 rounded-lg border-2 px-6 py-3 font-medium transition-colors ${
            unit === "euro"
              ? "border-[#5CB88F] bg-[#5CB88F] text-white"
              : "border-slate-300 bg-white text-slate-700 hover:border-[#5CB88F]"
          }`}
        >
          En €
        </button>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <input
            type="number"
            value={consumption}
            onChange={(e) => setConsumption(e.target.value)}
            placeholder="Consommation annuelle*"
            className="w-full rounded-lg border-2 border-slate-300 px-4 py-3 pr-24 text-base transition-colors focus:border-[#5CB88F] focus:outline-none"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
            {unit === "kwh" ? "kWh par an" : "€ TTC / an"}
          </span>
        </div>

        {unit === "euro" && (
          <div className="relative">
            <input
              type="number"
              step="0.01"
              value={electricityPrice}
              onChange={(e) => setElectricityPrice(e.target.value)}
              placeholder="Prix sur la facture d'électricité*"
              className="w-full rounded-lg border-2 border-slate-300 px-4 py-3 pr-32 text-base transition-colors focus:border-[#5CB88F] focus:outline-none"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
              € TTC / kWh
            </span>
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#5CB88F] text-white transition-colors hover:bg-[#4da77e]"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={!isValid}
          className="flex-1 rounded-lg bg-[#5CB88F] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#4da77e] disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
