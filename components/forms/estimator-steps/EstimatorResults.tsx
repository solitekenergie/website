"use client";

import { useState, useEffect } from "react";
import type { EstimatorFormData } from "../MultiStepEstimatorForm";
import { calculateSolarIRR } from "@/lib/pv/irr";
import dynamic from "next/dynamic";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const SolarHeatMap = dynamic(() => import("@/components/solar/SolarHeatMap"), { ssr: false });

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
}

interface EstimatorResultsProps {
  formData: EstimatorFormData;
  onBack: () => void;
  onReset?: () => void;
}

interface GoogleSolarData {
  maxPanelsCount: number;
  maxAreaMeters2: number;
  maxSunshineHoursPerYear: number;
  panelCapacityWatts: number;
  panelLifetimeYears: number;
  optimalPanelsCount: number;
  optimalYearlyEnergyKwh: number;
  roofSegments: Array<{
    pitchDegrees: number;
    azimuthDegrees: number;
    panelsCount: number;
    yearlyEnergyDcKwh: number;
  }>;
}

interface SolarPotential {
  panelsCount: number;
  annualProductionKwh: number;
  recommendedKwc: number;
  installationCost: number;
  annualSavings: number;
  totalSavings: number;
  paybackYears: number;
  usedGoogleSolar: boolean;
  roofAreaMeters2?: number;
  maxSunshineHoursPerYear?: number;
  irrPercent: number | null;
}

export default function EstimatorResults({ formData, onBack, onReset }: EstimatorResultsProps) {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<SolarPotential | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactData, setContactData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    calculateSolarPotential();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const calculateSolarPotential = async () => {
    setLoading(true);

    try {
      // --- 1. Calculer la consommation réelle ajustée ---
      let annualConsumptionKwh = formData.consumptionValue;
      if (formData.consumptionUnit === "euro" && formData.electricityPrice) {
        annualConsumptionKwh = formData.consumptionValue / formData.electricityPrice;
      }

      // Ajustement équipements supplémentaires
      let adjustedConsumption = annualConsumptionKwh;
      if (formData.otherEquipment.includes("electric-vehicle")) adjustedConsumption += 2500;
      if (formData.otherEquipment.includes("pool")) adjustedConsumption += 1500;
      if (formData.otherEquipment.includes("air-conditioning")) adjustedConsumption += 1000;

      // Ajustement profil de présence (autoconsommation réelle)
      let selfConsumptionRate = 0.35; // matin-soir : 35% autoconsommation
      if (formData.presenceProfile === "all-day") selfConsumptionRate = 0.55;
      if (formData.presenceProfile === "school-holidays") selfConsumptionRate = 0.40;

      // Ajustement chauffage électrique (augmente la conso couvrable)
      if (formData.mainHeating === "electric-radiator") adjustedConsumption *= 1.1;
      if (formData.mainHeating === "heat-pump") adjustedConsumption *= 1.05;

      // --- 2. Récupérer l'irradiation locale (PVGIS) ---
      let irradiation = 1100; // Défaut conservateur Alsace
      const coords = formData.coordinates;

      if (coords && coords.lat !== 0 && coords.lng !== 0) {
        try {
          const pvgisResponse = await fetch(
            `https://re.jrc.ec.europa.eu/api/v5_2/PVcalc?lat=${coords.lat}&lon=${coords.lng}&peakpower=1&loss=14&outputformat=json`,
            { signal: AbortSignal.timeout(15000) },
          );
          if (pvgisResponse.ok) {
            const pvgisData = await pvgisResponse.json();
            if (pvgisData.outputs?.totals?.fixed?.E_y) {
              irradiation = pvgisData.outputs.totals.fixed.E_y;
            }
          }
        } catch {
          // PVGIS indisponible - on continue avec le défaut
        }
      }

      let usedGoogleSolar = false;
      let panelsCount = 0;
      let annualProductionKwh = 0;
      let recommendedKwc = 0;
      let roofAreaMeters2: number | undefined;
      let maxSunshineHoursPerYear: number | undefined = Math.round(irradiation);

      // --- 3. Essayer Google Solar (données toiture réelles) ---
      if (coords && coords.lat !== 0 && coords.lng !== 0) {
        try {
          const solarResponse = await fetch("/api/solar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ latitude: coords.lat, longitude: coords.lng }),
          });

          if (solarResponse.ok) {
            const gsd: GoogleSolarData = await solarResponse.json();

            usedGoogleSolar = true;
            roofAreaMeters2 = gsd.maxAreaMeters2;
            maxSunshineHoursPerYear = Math.round(gsd.maxSunshineHoursPerYear);

            // Dimensionner selon la conso réelle, pas la config "optimale" de Google
            // qui ne connait pas le profil du foyer
            const targetKwc = Math.round((adjustedConsumption * 0.7) / irradiation * 10) / 10;
            const panelWatts = gsd.panelCapacityWatts || 400;

            // Trouver la config Google Solar la plus proche du besoin
            const targetPanels = Math.ceil((targetKwc * 1000) / panelWatts);
            const maxPanels = gsd.maxPanelsCount;
            panelsCount = Math.min(targetPanels, maxPanels);
            recommendedKwc = Math.round((panelsCount * panelWatts) / 1000 * 10) / 10;

            // Production basée sur l'irradiation PVGIS locale (plus fiable que le ratio Google)
            annualProductionKwh = Math.round(recommendedKwc * irradiation * 0.85); // 0.85 = rendement système
          }
        } catch {
          // Google Solar indisponible - on continue avec PVGIS seul
        }
      }

      // --- 4. Fallback PVGIS pur si Google Solar a échoué ---
      if (!usedGoogleSolar) {
        const coverageTarget = 0.7;
        recommendedKwc = Math.round((adjustedConsumption * coverageTarget) / irradiation * 10) / 10;
        // Limiter a une installation réaliste résidentielle (max 9 kWc)
        recommendedKwc = Math.min(recommendedKwc, 9);
        annualProductionKwh = Math.round(recommendedKwc * irradiation * 0.85);
        panelsCount = Math.ceil((recommendedKwc * 1000) / 400);
      }

      // --- 5. Calculs financiers personnalisés ---
      const electricityPrice = formData.electricityPrice || 0.2516; // Tarif réglementé 2025
      const autoconsommationKwh = Math.round(annualProductionKwh * selfConsumptionRate);
      const surplusKwh = annualProductionKwh - autoconsommationKwh;
      const tarifRachat = 0.1269; // Tarif rachat surplus OA < 9kWc 2025
      const annualSavings = Math.round(autoconsommationKwh * electricityPrice + surplusKwh * tarifRachat);

      const totalSavings = Math.round(annualSavings * 25);
      const installationCost = Math.round(recommendedKwc <= 3 ? recommendedKwc * 2800 : recommendedKwc * 2400);
      const paybackYears = annualSavings > 0 ? Math.round((installationCost / annualSavings) * 10) / 10 : 0;

      // Calculate IRR (Taux de Rentabilité Interne)
      const irrPercent = calculateSolarIRR(installationCost, annualSavings, 25);

      setResults({
        panelsCount,
        annualProductionKwh,
        recommendedKwc,
        installationCost,
        annualSavings,
        totalSavings,
        paybackYears,
        usedGoogleSolar,
        roofAreaMeters2,
        maxSunshineHoursPerYear,
        irrPercent,
      });
    } catch (error) {
      console.error("Error calculating solar potential:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuoteRequest = () => {
    setShowContactForm(true);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!contactData.name || !contactData.email) {
      setSubmitMessage({ type: "error", text: "Veuillez remplir tous les champs obligatoires." });
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const payload = {
        ...contactData,
        ...formData,
        ...(results || {}),
      };

      const response = await fetch("/api/estimator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.delivered) {
        setSubmitMessage({
          type: "success",
          text: "Votre demande a été envoyée avec succès ! Nous vous recontacterons rapidement.",
        });
      } else {
        setSubmitMessage({
          type: "error",
          text: data.message || "Une erreur s'est produite. Veuillez réessayer.",
        });
      }
    } catch (error) {
      console.error("Error submitting estimator:", error);
      setSubmitMessage({
        type: "error",
        text: "Impossible d'envoyer votre demande pour le moment.",
      });
    } finally {
      setIsSubmitting(false);
    }
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
          {/* Title */}
          <div className="mb-12 text-center">
            <h1 className="font-[900] text-[36px] leading-tight tracking-tight text-slate-900 md:text-[48px]">
              VOTRE LOGEMENT PRÉSENTE UN FORT POTENTIEL SOLAIRE !
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            {/* Left side - Solar Heat Map */}
            <div className="hidden lg:block">
              {formData.coordinates ? (
                <SolarHeatMap coordinates={formData.coordinates} />
              ) : (
                <div className="flex h-[650px] items-center justify-center rounded-2xl bg-slate-100">
                  <p className="text-slate-500">Carte thermique non disponible</p>
                </div>
              )}
            </div>

            {/* Right side - VOTRE POTENTIEL SOLAIRE */}
            <div className="space-y-6">
              <div className="rounded-2xl border-2 border-[#5CB88F]/30 bg-white p-8">
                <h2 className="mb-8 text-center font-[900] text-[28px] tracking-tight text-slate-900">
                  VOTRE POTENTIEL SOLAIRE
                </h2>

                <div className="space-y-4">
                  {/* Metric 1: Sunshine hours (dark bg) */}
                  <div className="flex items-center gap-4 rounded-xl bg-slate-900 p-5 text-white">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/10">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">
                        {results.maxSunshineHoursPerYear?.toLocaleString("fr-FR") ?? "~1 200"} h
                      </p>
                      <p className="text-sm text-white/70">d&apos;ensoleillement par an</p>
                    </div>
                  </div>

                  {/* Metric 2: Number of panels */}
                  <div className="flex items-center gap-4 rounded-xl border-2 border-slate-200 p-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                      <svg className="h-6 w-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-900">
                        {results.panelsCount} panneaux
                      </p>
                      <p className="text-sm text-slate-500">
                        installables sur votre toit
                        {results.maxSunshineHoursPerYear && results.panelsCount > 0 && (
                          <span className="ml-1 text-slate-400">
                            ({Math.round(results.annualProductionKwh / results.panelsCount / results.maxSunshineHoursPerYear * 100) / 100} kWh/panneau/h)
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Metric 3: Annual kWh production */}
                  <div className="flex items-center gap-4 rounded-xl border-2 border-slate-200 p-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                      <svg className="h-6 w-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-900">
                        {results.annualProductionKwh.toLocaleString("fr-FR")} kWh
                      </p>
                      <p className="text-sm text-slate-500">produits par an</p>
                    </div>
                  </div>

                  {/* Metric 4: Annual savings */}
                  <div className="flex items-center gap-4 rounded-xl border-2 border-slate-200 p-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                      <svg className="h-6 w-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-900">
                        {results.annualSavings.toLocaleString("fr-FR")} &euro;
                      </p>
                      <p className="text-sm text-slate-500">économisés par an</p>
                    </div>
                  </div>

                  {/* Metric 5: Payback period */}
                  <div className="flex items-center gap-4 rounded-xl border-2 border-slate-200 p-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                      <svg className="h-6 w-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-900">
                        {results.paybackYears} ans
                      </p>
                      <p className="text-sm text-slate-500">avant rentabilité</p>
                    </div>
                  </div>
                </div>

                {/* CTA / Contact form */}
                <div className="mt-8">
                  {!showContactForm ? (
                    <button
                      type="button"
                      onClick={handleQuoteRequest}
                      className="w-full rounded-lg bg-[#5CB88F] px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-[#4da77e]"
                    >
                      Estimer mon projet
                    </button>
                  ) : (
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-slate-900">
                        Finaliser votre demande
                      </h3>
                      <form onSubmit={handleContactSubmit} className="space-y-4">
                        <div>
                          <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">
                            Nom complet *
                          </label>
                          <input
                            type="text"
                            id="name"
                            value={contactData.name}
                            onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                            className="w-full rounded-lg border-2 border-slate-300 px-4 py-3 text-slate-900 focus:border-[#5CB88F] focus:outline-none"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
                            Email *
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={contactData.email}
                            onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                            className="w-full rounded-lg border-2 border-slate-300 px-4 py-3 text-slate-900 focus:border-[#5CB88F] focus:outline-none"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="mb-2 block text-sm font-medium text-slate-700">
                            Téléphone
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            value={contactData.phone}
                            onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                            className="w-full rounded-lg border-2 border-slate-300 px-4 py-3 text-slate-900 focus:border-[#5CB88F] focus:outline-none"
                          />
                        </div>

                        {submitMessage && (
                          <div
                            className={`rounded-lg p-4 ${
                              submitMessage.type === "success"
                                ? "bg-green-50 text-green-800"
                                : "bg-red-50 text-red-800"
                            }`}
                          >
                            {submitMessage.text}
                          </div>
                        )}

                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={() => setShowContactForm(false)}
                            className="flex-1 rounded-lg border-2 border-slate-300 px-6 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-100"
                            disabled={isSubmitting}
                          >
                            Retour
                          </button>
                          <button
                            type="submit"
                            className="flex-1 rounded-lg bg-[#5CB88F] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#4da77e] disabled:opacity-50"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {onReset && (
        <div className="flex justify-center bg-white pb-12">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 rounded-full border-2 border-slate-300 px-8 py-3 font-ui text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100"
          >
            Nouvelle simulation
          </button>
        </div>
      )}
      <Footer />
    </>
  );
}
