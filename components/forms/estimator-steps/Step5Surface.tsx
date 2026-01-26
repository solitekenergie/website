"use client";

import { useState } from "react";
import type { EstimatorFormData } from "../MultiStepEstimatorForm";

interface Step5Props {
  formData: Partial<EstimatorFormData>;
  updateFormData: (data: Partial<EstimatorFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step5Surface({ formData, updateFormData, onNext, onBack }: Step5Props) {
  const [surface, setSurface] = useState(formData.surface?.toString() || "");

  const handleNext = () => {
    const surfaceValue = Number.parseFloat(surface);
    if (!Number.isNaN(surfaceValue) && surfaceValue > 0) {
      updateFormData({ surface: surfaceValue });
      onNext();
    }
  };

  const isValid = surface && !Number.isNaN(Number.parseFloat(surface)) && Number.parseFloat(surface) > 0;

  return (
    <div className="space-y-8">
      <h2 className="font-semibold text-[32px] text-slate-900">
        SURFACE
      </h2>

      <div className="relative">
        <input
          type="number"
          value={surface}
          onChange={(e) => setSurface(e.target.value)}
          placeholder="Surface habitable*"
          className="w-full rounded-lg border-2 border-slate-300 px-4 py-3 pr-16 text-base transition-colors focus:border-[#5CB88F] focus:outline-none"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
          m2
        </span>
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
