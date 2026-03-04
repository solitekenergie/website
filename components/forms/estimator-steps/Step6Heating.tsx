"use client";

import { useState } from "react";
import type { EstimatorFormData } from "../MultiStepEstimatorForm";

interface Step6Props {
  formData: Partial<EstimatorFormData>;
  updateFormData: (data: Partial<EstimatorFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step6Heating({ formData, updateFormData, onNext, onBack }: Step6Props) {
  const [selected, setSelected] = useState<string>(formData.mainHeating || "");
  const [otherText, setOtherText] = useState<string>(formData.mainHeatingOther || "");

  const handleSelect = (heating: string) => {
    setSelected(heating);
    updateFormData({
      mainHeating: heating as EstimatorFormData["mainHeating"],
      mainHeatingOther: heating === "other" ? otherText : undefined,
    });
  };

  const handleOtherText = (text: string) => {
    setOtherText(text);
    updateFormData({ mainHeatingOther: text });
  };

  const handleNext = () => {
    if (selected && (selected !== "other" || otherText.trim())) {
      onNext();
    }
  };

  const options = [
    { value: "heat-pump", label: "Pompe à chaleur" },
    { value: "electric-radiator", label: "Radiateur électrique" },
    { value: "non-electric", label: "Chauffage non-électrique (gaz, fioul...)" },
    { value: "unknown", label: "Je ne sais pas" },
    { value: "other", label: "Autre" },
  ];

  const isValid = selected && (selected !== "other" || otherText.trim());

  return (
    <div className="space-y-8">
      <h2 className="font-semibold text-[32px] text-slate-900">
        CHAUFFAGE PRINCIPAL
      </h2>

      <div className="space-y-3">
        {options.map((option) => {
          const isSelected = selected === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={`w-full rounded-lg border-2 px-6 py-4 text-center text-lg transition-colors ${
                isSelected
                  ? "border-[#5CB88F] bg-[#5CB88F] text-white"
                  : "border-slate-300 bg-white text-slate-700 hover:border-[#5CB88F]"
              }`}
            >
              {option.label}
            </button>
          );
        })}

        {selected === "other" && (
          <input
            type="text"
            value={otherText}
            onChange={(e) => handleOtherText(e.target.value)}
            placeholder="Précisez votre type de chauffage..."
            className="w-full rounded-lg border-2 border-slate-300 px-6 py-4 text-lg text-slate-700 placeholder:text-slate-400 focus:border-[#5CB88F] focus:outline-none"
          />
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
