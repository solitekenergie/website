"use client";

import { useState } from "react";
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
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<EstimatorFormData>>({
    consumptionUnit: "kwh",
    householdSize: 1,
    presenceProfile: "morning-evening",
    otherEquipment: [],
  });

  const [showResults, setShowResults] = useState(false);

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

  return (
    <div className="flex min-h-screen w-full items-center bg-white">
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
