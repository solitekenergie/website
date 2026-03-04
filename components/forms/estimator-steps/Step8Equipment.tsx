"use client";

import { useState } from "react";
import type { EstimatorFormData } from "../MultiStepEstimatorForm";

interface Step8Props {
  formData: Partial<EstimatorFormData>;
  updateFormData: (data: Partial<EstimatorFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step8Equipment({ formData, updateFormData, onNext, onBack }: Step8Props) {
  const [selected, setSelected] = useState<string[]>(formData.otherEquipment || []);
  const [otherText, setOtherText] = useState<string>(() => {
    const existing = formData.otherEquipment || [];
    const custom = existing.find((item) => item.startsWith("other:"));
    return custom ? custom.replace("other:", "") : "";
  });

  const handleSelect = (equipment: string) => {
    setSelected((prev) => {
      if (prev.includes(equipment)) {
        return prev.filter((item) => item !== equipment);
      }
      return [...prev, equipment];
    });
  };

  const handleOtherToggle = () => {
    if (selected.includes("other")) {
      setSelected((prev) => prev.filter((item) => item !== "other"));
      setOtherText("");
    } else {
      setSelected((prev) => [...prev, "other"]);
    }
  };

  const handleNext = () => {
    const equipment = selected.filter((item) => item !== "other");
    if (selected.includes("other") && otherText.trim()) {
      equipment.push(`other:${otherText.trim()}`);
    }
    updateFormData({ otherEquipment: equipment });
    onNext();
  };

  const options = [
    { value: "electric-vehicle", label: "Voiture électrique" },
    { value: "pool", label: "Piscine" },
    { value: "air-conditioning", label: "Climatisation" },
  ];

  return (
    <div className="space-y-8">
      <h2 className="font-semibold text-[32px] text-slate-900">
        AUTRES ÉQUIPEMENTS
      </h2>

      <div className="space-y-3">
        {options.map((option) => {
          const isSelected = selected.includes(option.value);

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

        <button
          type="button"
          onClick={handleOtherToggle}
          className={`w-full rounded-lg border-2 px-6 py-4 text-center text-lg transition-colors ${
            selected.includes("other")
              ? "border-[#5CB88F] bg-[#5CB88F] text-white"
              : "border-slate-300 bg-white text-slate-700 hover:border-[#5CB88F]"
          }`}
        >
          Autre
        </button>

        {selected.includes("other") && (
          <input
            type="text"
            value={otherText}
            onChange={(e) => setOtherText(e.target.value)}
            placeholder="Précisez vos équipements..."
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
          className="flex-1 rounded-lg bg-[#5CB88F] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#4da77e]"
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
