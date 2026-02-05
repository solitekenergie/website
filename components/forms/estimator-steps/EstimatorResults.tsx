"use client";

import { useState, useEffect } from "react";
import type { EstimatorFormData } from "../MultiStepEstimatorForm";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
}

interface EstimatorResultsProps {
  formData: EstimatorFormData;
  onBack: () => void;
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
}

export default function EstimatorResults({ formData, onBack }: EstimatorResultsProps) {
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

      let usedGoogleSolar = false;
      let panelsCount = 0;
      let annualProductionKwh = 0;
      let recommendedKwc = 0;
      let roofAreaMeters2: number | undefined;

      // Try Google Solar API first
      if (formData.coordinates) {
        try {
          const solarResponse = await fetch("/api/solar", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              latitude: formData.coordinates.lat,
              longitude: formData.coordinates.lng,
            }),
          });

          if (solarResponse.ok) {
            const googleSolarData: GoogleSolarData = await solarResponse.json();

            usedGoogleSolar = true;
            panelsCount = googleSolarData.optimalPanelsCount;
            annualProductionKwh = Math.round(googleSolarData.optimalYearlyEnergyKwh);
            roofAreaMeters2 = googleSolarData.maxAreaMeters2;

            // Calculate kWc from panels count and panel capacity
            recommendedKwc = Math.round((panelsCount * googleSolarData.panelCapacityWatts) / 1000 * 10) / 10;

            console.log("Google Solar API data retrieved successfully");
          } else {
            console.log("Google Solar API not available, falling back to PVGIS estimation");
          }
        } catch (error) {
          console.error("Error fetching Google Solar data:", error);
        }
      }

      // Fallback to PVGIS + estimation if Google Solar failed
      if (!usedGoogleSolar) {
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
        recommendedKwc = Math.round((adjustedConsumption * coverageTarget) / irradiation * 10) / 10;

        // Calculate expected production
        annualProductionKwh = Math.round(recommendedKwc * irradiation);

        // Estimate panels count (average panel is 400W)
        panelsCount = Math.round((recommendedKwc * 1000) / 400);
      }

      // Calculate savings (assuming 0.20€/kWh average price)
      const electricityPrice = formData.electricityPrice || 0.20;
      const annualSavings = Math.round(annualProductionKwh * electricityPrice);
      const totalSavings = Math.round(annualSavings * 25); // 25 year lifespan

      // Calculate installation cost (average 2500€/kWc in France)
      const installationCost = Math.round(recommendedKwc * 2500);

      // Calculate payback period
      const paybackYears = annualSavings > 0 ? Math.round((installationCost / annualSavings) * 10) / 10 : 0;

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
        headers: {
          "Content-Type": "application/json",
        },
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
                {/* Number of solar panels - Primary metric */}
                <div className="rounded-2xl border-2 border-[#5CB88F] bg-[#5CB88F] p-6 text-white">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#5CB88F]">
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
                          d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-5xl font-bold">{results.panelsCount}</p>
                      <p className="mt-2 text-lg">
                        Panneaux solaires installables
                        {results.usedGoogleSolar && (
                          <span className="ml-2 rounded-full bg-white/20 px-2 py-1 text-xs">
                            Données Google Solar
                          </span>
                        )}
                      </p>
                      {results.roofAreaMeters2 && (
                        <p className="mt-1 text-sm opacity-90">
                          Surface de toit: {Math.round(results.roofAreaMeters2)} m²
                        </p>
                      )}
                    </div>
                  </div>
                </div>

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

              {!showContactForm ? (
                <button
                  type="button"
                  onClick={handleQuoteRequest}
                  className="w-full rounded-lg bg-[#5CB88F] px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-[#4da77e]"
                >
                  Faire un devis
                </button>
              ) : (
                <div className="space-y-6">
                  <div className="rounded-lg border-2 border-slate-200 bg-slate-50 p-6">
                    <h2 className="mb-4 text-xl font-bold text-slate-900">
                      Finaliser votre demande
                    </h2>
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
                </div>
              )}
            </div>
        </div>
      </div>
    </div>
      <Footer />
    </>
  );
}
