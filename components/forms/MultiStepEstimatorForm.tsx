"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Step1Address from "./estimator-steps/Step1Address";
import Step2Consumption from "./estimator-steps/Step2Consumption";
import Step3Household from "./estimator-steps/Step3Household";
import Step4Presence from "./estimator-steps/Step4Presence";
import Step5Surface from "./estimator-steps/Step5Surface";
import Step6Heating from "./estimator-steps/Step6Heating";
import Step7HotWater from "./estimator-steps/Step7HotWater";
import Step8Equipment from "./estimator-steps/Step8Equipment";
import EstimatorResults from "./estimator-steps/EstimatorResults";

export interface EstimatorFormData {
  address: string;
  coordinates?: { lat: number; lng: number };
  consumptionValue: number;
  consumptionUnit: "kwh" | "euro";
  electricityPrice?: number;
  householdSize: number;
  presenceProfile: "morning-evening" | "all-day" | "school-holidays";
  surface: number;
  mainHeating: "heat-pump" | "electric-radiator" | "non-electric" | "unknown" | "other";
  mainHeatingOther?: string;
  hotWater: "electric" | "thermodynamic" | "heat-pump" | "non-electric" | "unknown" | "other";
  hotWaterOther?: string;
  otherEquipment: string[];
}

const TOTAL_STEPS = 8;

export default function MultiStepEstimatorForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<EstimatorFormData>>({
    consumptionUnit: "kwh",
    householdSize: 1,
    presenceProfile: "morning-evening",
    otherEquipment: [],
  });

  const [showResults, setShowResults] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);

  const updateFormData = (data: Partial<EstimatorFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const goToNextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const progressPercentage = ((currentStep - 1) / TOTAL_STEPS) * 100;

  if (showResults) {
    return (
      <EstimatorResults
        formData={formData as EstimatorFormData}
        onBack={() => {
          setShowResults(false);
          setCurrentStep(TOTAL_STEPS);
        }}
      />
    );
  }

  const stepsLeft = TOTAL_STEPS - currentStep + 1;

  return (
    <div className="flex min-h-screen w-full items-center bg-white">
      {/* Bouton quitter — coin supérieur gauche */}
      <button
        onClick={() => setShowExitModal(true)}
        className="absolute left-4 top-4 z-10 flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 sm:left-6 sm:top-6"
        aria-label="Quitter l'estimateur"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
        Quitter
      </button>

      {/* Modale de rétention */}
      {showExitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowExitModal(false)}
          />

          {/* Carte */}
          <div className="relative w-full max-w-[440px] overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* Bandeau vert en haut */}
            <div className="bg-[#5CB88F] px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/20">
                  <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className="font-title text-lg font-black uppercase text-white leading-tight">
                    Vous êtes si proche !
                  </p>
                  <p className="text-sm text-white/80">
                    {progressPercentage.toFixed(0)}% de votre simulation complétée
                  </p>
                </div>
              </div>

              {/* Barre de progression dans la modale */}
              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/30">
                <div
                  className="h-full rounded-full bg-white transition-all duration-500"
                  style={{ width: `${Math.max(progressPercentage, 8)}%` }}
                />
              </div>
            </div>

            {/* Corps */}
            <div className="px-6 py-6">
              <p className="font-['Figtree'] text-base font-semibold text-slate-800">
                Plus que {stepsLeft} question{stepsLeft > 1 ? "s" : ""} et vous découvrez :
              </p>

              <ul className="mt-4 flex flex-col gap-3">
                {[
                  "Vos économies annuelles en €",
                  "Le nombre de panneaux recommandés",
                  "La durée de retour sur investissement",
                  "Un devis gratuit et sans engagement",
                ].map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3">
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#5CB88F]/15">
                      <svg className="h-3 w-3 text-[#5CB88F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="font-['Figtree'] text-sm text-slate-700">{benefit}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-4 text-center font-['Figtree'] text-xs text-slate-400">
                100% gratuit · Sans engagement · Résultat immédiat
              </p>

              {/* CTA principal */}
              <button
                onClick={() => setShowExitModal(false)}
                className="mt-5 w-full rounded-xl bg-[#5CB88F] py-4 font-title text-base font-bold uppercase text-white transition-opacity hover:opacity-90"
              >
                Terminer ma simulation →
              </button>

              {/* Lien quitter — volontairement discret */}
              <button
                onClick={() => router.push("/")}
                className="mt-3 w-full text-center font-['Figtree'] text-xs text-slate-400 underline-offset-2 hover:underline"
              >
                Quitter quand même
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto w-full max-w-[1400px] px-4 py-8">
        {/* Centered Header */}
        <div className="mb-6 text-center">
          <h1 className="font-[900] text-[48px] leading-tight tracking-tight text-slate-900">
            CONNAÎTRE VOTRE BESOIN
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left side - Form */}
          <div className="flex flex-col">
            {/* Icon and Subtitle */}
            <div className="mb-6 flex flex-col items-center space-y-3">
              <img
                src="/images/EstimateurIcon.svg"
                alt="Icône estimateur"
                className="h-12 w-12"
              />
              <p className="text-center font-medium text-[16px] text-slate-700">
                Faites votre demande de devis
                <br />
                en moins de 2 minutes
              </p>
            </div>

            {/* Progress */}
            <div className="mb-6 space-y-2">
              {/* Progress bar */}
              <div className="space-y-2">
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full bg-[#5CB88F] transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <p className="text-right text-sm text-slate-600">{((currentStep - 1) / TOTAL_STEPS * 100).toFixed(0)}%</p>
              </div>
            </div>

            {/* Form steps */}
            <div className="flex-1">
              {currentStep === 1 && (
                <Step1Address
                  formData={formData}
                  updateFormData={updateFormData}
                  onNext={goToNextStep}
                />
              )}
              {currentStep === 2 && (
                <Step2Consumption
                  formData={formData}
                  updateFormData={updateFormData}
                  onNext={goToNextStep}
                  onBack={goToPreviousStep}
                />
              )}
              {currentStep === 3 && (
                <Step3Household
                  formData={formData}
                  updateFormData={updateFormData}
                  onNext={goToNextStep}
                  onBack={goToPreviousStep}
                />
              )}
              {currentStep === 4 && (
                <Step4Presence
                  formData={formData}
                  updateFormData={updateFormData}
                  onNext={goToNextStep}
                  onBack={goToPreviousStep}
                />
              )}
              {currentStep === 5 && (
                <Step5Surface
                  formData={formData}
                  updateFormData={updateFormData}
                  onNext={goToNextStep}
                  onBack={goToPreviousStep}
                />
              )}
              {currentStep === 6 && (
                <Step6Heating
                  formData={formData}
                  updateFormData={updateFormData}
                  onNext={goToNextStep}
                  onBack={goToPreviousStep}
                />
              )}
              {currentStep === 7 && (
                <Step7HotWater
                  formData={formData}
                  updateFormData={updateFormData}
                  onNext={goToNextStep}
                  onBack={goToPreviousStep}
                />
              )}
              {currentStep === 8 && (
                <Step8Equipment
                  formData={formData}
                  updateFormData={updateFormData}
                  onNext={goToNextStep}
                  onBack={goToPreviousStep}
                />
              )}
            </div>
          </div>

          {/* Right side - Image */}
          <div className="relative hidden lg:block">
            <img
              src="/images/EstimateurImage.png"
              alt="Installation de panneaux solaires"
              className="h-[450px] w-full rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
