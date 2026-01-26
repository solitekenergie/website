"use client";

import { useState } from "react";
import type { EstimatorFormData } from "../MultiStepEstimatorForm";

interface Step3Props {
  formData: Partial<EstimatorFormData>;
  updateFormData: (data: Partial<EstimatorFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step3Household({ formData, updateFormData, onNext, onBack }: Step3Props) {
  const [selected, setSelected] = useState<number>(formData.householdSize || 1);

  const handleSelect = (size: number) => {
    setSelected(size);
    updateFormData({ householdSize: size });
  };

  const handleNext = () => {
    if (selected) {
      onNext();
    }
  };

  const options = [1, 2, 3, 4, "5 et +"];

  return (
    <div className="space-y-8">
      <h2 className="font-semibold text-[32px] text-slate-900">
        NOMBRE DE PERSONNES DANS LE FOYER
      </h2>

      <div className="space-y-3">
        {options.map((option, index) => {
          const value = typeof option === "string" ? 5 : option;
          const isSelected = selected === value;

          return (
            <button
              key={index}
              type="button"
              onClick={() => handleSelect(value)}
              className={`w-full rounded-lg border-2 px-6 py-4 text-center text-lg transition-colors ${
                isSelected
                  ? "border-[#5CB88F] bg-[#5CB88F] text-white"
                  : "border-slate-300 bg-white text-slate-700 hover:border-[#5CB88F]"
              }`}
            >
              {option}
            </button>
          );
        })}
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
          className="flex-1 rounded-lg bg-[#5CB88F] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#4da77e]"
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
