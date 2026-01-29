"use client";

import { useState, useEffect } from "react";
import type { EstimatorFormData } from "../MultiStepEstimatorForm";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface EstimatorResultsProps {
  formData: EstimatorFormData;
  onBack: () => void;
}

interface SolarPotential {
  annualProductionKwh: number;
  recommendedKwc: number;
  installationCost: number;
  annualSavings: number;
  totalSavings: number;
  paybackYears: number;
}

export default function EstimatorResults({ formData, onBack }: EstimatorResultsProps) {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<SolarPotential | null>(null);

  useEffect(() => {
    calculateSolarPotential();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const calculateSolarPotential = async () => {
    setLoading(true);

    try {
      // Convert consumption to kWh if in euros
      let annualConsumptionKwh = formData.consumptionValue;
      if (formData.consumptionUnit === "euro" && formData.electricityPrice) {
        annualConsumptionKwh = formData.consumptionValue / formData.electricityPrice;
      }

      // Adjust consumption based on household size, equipment, etc.
      let adjustedConsumption = annualConsumptionKwh;

      // Add consumption for equipment
      if (formData.otherEquipment.includes("electric-vehicle")) {
        adjustedConsumption += 2500; // Average EV consumption
      }
      if (formData.otherEquipment.includes("pool")) {
        adjustedConsumption += 1500; // Average pool consumption
      }
      if (formData.otherEquipment.includes("air-conditioning")) {
        adjustedConsumption += 1000; // Average AC consumption
      }

      // Use PVGIS API to get solar irradiation data
      let irradiation = 1200; // Default for France

      if (formData.coordinates) {
        try {
          const pvgisResponse = await fetch(
            `https://re.jrc.ec.europa.eu/api/v5_2/PVcalc?lat=${formData.coordinates.lat}&lon=${formData.coordinates.lng}&peakpower=1&loss=14&outputformat=json`
          );
          const pvgisData = await pvgisResponse.json();

          if (pvgisData.outputs?.totals?.fixed) {
            irradiation = pvgisData.outputs.totals.fixed["E_y"];
          }
        } catch (error) {
          console.error("Error fetching PVGIS data:", error);
        }
      }

      // Calculate recommended system size (kWc)
      // Target 70% coverage for optimal ROI
      const coverageTarget = 0.7;
      const recommendedKwc = Math.round((adjustedConsumption * coverageTarget) / irradiation * 10) / 10;

      // Calculate expected production
      const annualProductionKwh = Math.round(recommendedKwc * irradiation);

      // Calculate savings (assuming 0.20€/kWh average price)
      const electricityPrice = formData.electricityPrice || 0.20;
      const annualSavings = Math.round(annualProductionKwh * electricityPrice);
      const totalSavings = Math.round(annualSavings * 25); // 25 year lifespan

      // Calculate installation cost (average 2500€/kWc in France)
      const installationCost = Math.round(recommendedKwc * 2500);

      // Calculate payback period
      const paybackYears = annualSavings > 0 ? Math.round((installationCost / annualSavings) * 10) / 10 : 0;

      setResults({
        annualProductionKwh,
        recommendedKwc,
        installationCost,
        annualSavings,
        totalSavings,
        paybackYears,
      });
    } catch (error) {
      console.error("Error calculating solar potential:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuoteRequest = () => {
    // Redirect to contact form or open modal
    window.location.href = "/contact";
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-slate-200 border-t-[#5CB88F]" />
          <p className="mt-4 text-lg text-slate-600">Calcul en cours...</p>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-lg text-slate-600">Erreur lors du calcul</p>
          <button
            type="button"
            onClick={onBack}
            className="mt-4 rounded-lg bg-[#5CB88F] px-6 py-3 font-semibold text-white"
          >
            Retour
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen w-full bg-white">
        <div className="mx-auto max-w-[1400px] px-4 py-16">
          {/* Centered Title */}
          <div className="mb-12 text-center">
            <h1 className="font-[900] text-[48px] leading-tight tracking-tight text-slate-900">
              VOTRE LOGEMENT PRÉSENTE UN FORT POTENTIEL SOLAIRE !
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            {/* Left side - Image */}
            <div className="relative hidden lg:block">
              <div className="relative">
                <img
                  src="/images/solar-thermal-map.jpg"
                  alt="Carte thermique du bâtiment"
                  className="h-[650px] w-full rounded-2xl object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-white/90 p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900">
                      <svg
                        className="h-5 w-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <select className="flex-1 rounded-lg border-2 border-slate-300 px-3 py-2 text-sm">
                      <option>Jan</option>
                      <option>Fév</option>
                      <option>Mar</option>
                      <option>Avr</option>
                      <option>Mai</option>
                      <option>Juin</option>
                      <option>Juil</option>
                      <option>Août</option>
                      <option>Sep</option>
                      <option>Oct</option>
                      <option>Nov</option>
                      <option>Déc</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Results */}
            <div className="space-y-8">
              {/* Results cards */}
              <div className="space-y-4">
                <div className="rounded-2xl border-2 border-slate-900 bg-slate-900 p-6 text-white">
                  <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-900">
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
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-5xl font-bold">{results.annualProductionKwh.toLocaleString()} kWh</p>
                    <p className="mt-2 text-lg">Production estimée par an</p>
                  </div>
                </div>
                </div>

                <div className="rounded-2xl border-2 border-slate-200 bg-white p-6">
                  <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white">
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
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-5xl font-bold text-slate-900">{results.annualSavings.toLocaleString()} €</p>
                    <p className="mt-2 text-lg text-slate-600">Économies annuelles</p>
                  </div>
                </div>
                </div>

                <div className="rounded-2xl border-2 border-slate-200 bg-white p-6">
                  <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white">
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-5xl font-bold text-slate-900">{results.paybackYears} ans</p>
                    <p className="mt-2 text-lg text-slate-600">Temps de retour sur investissement</p>
                  </div>
                </div>
                </div>

                <div className="rounded-2xl border-2 border-slate-200 bg-white p-6">
                  <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white">
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
                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-5xl font-bold text-slate-900">{results.totalSavings.toLocaleString()} €</p>
                    <p className="mt-2 text-lg text-slate-600">Économies totales sur 25 ans</p>
                  </div>
                </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleQuoteRequest}
                className="w-full rounded-lg bg-[#5CB88F] px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-[#4da77e]"
              >
                Faire un devis
              </button>
            </div>
        </div>
      </div>
    </div>
      <Footer />
    </>
  );
}
