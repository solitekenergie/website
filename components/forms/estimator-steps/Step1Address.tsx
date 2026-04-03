"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { EstimatorFormData } from "../MultiStepEstimatorForm";

interface Step1Props {
  formData: Partial<EstimatorFormData>;
  updateFormData: (data: Partial<EstimatorFormData>) => void;
  onNext: () => void;
}

interface AddressFeature {
  properties: {
    label: string;
  };
  geometry: {
    coordinates: [number, number];
  };
}

export default function Step1Address({ formData, updateFormData, onNext }: Step1Props) {
  const [address, setAddress] = useState(formData.address || "");
  const [suggestions, setSuggestions] = useState<AddressFeature[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCoords, setSelectedCoords] = useState(formData.coordinates);
  const [showMap, setShowMap] = useState(!!formData.address);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchAddressSuggestions = useCallback(async (query: string) => {
    setIsLoading(true);
    setError(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
      const response = await fetch(
        `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=5`,
        {
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      setSuggestions(data.features || []);
      setShowSuggestions(data.features && data.features.length > 0);
    } catch (error) {
      clearTimeout(timeoutId);
      console.error("Error fetching address suggestions:", error);

      if (error instanceof Error && error.name === 'AbortError') {
        setError("La recherche a pris trop de temps. Veuillez réessayer.");
      } else {
        setError("Service d'adresse temporairement indisponible. Vous pouvez saisir votre adresse manuellement.");
      }
      setSuggestions([]);
      setShowSuggestions(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (address.length > 3) {
        fetchAddressSuggestions(address);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [address, fetchAddressSuggestions]);

  const selectAddress = (feature: AddressFeature) => {
    const selectedAddress = feature.properties.label;
    const coords = {
      lat: feature.geometry.coordinates[1],
      lng: feature.geometry.coordinates[0],
    };

    setAddress(selectedAddress);
    setSelectedCoords(coords);
    setShowMap(true);
    setShowSuggestions(false);
    updateFormData({ address: selectedAddress, coordinates: coords });
  };

  const handleManualValidation = () => {
    // Permet de continuer même sans coordonnées (PVGIS utilisera un défaut France)
    if (address) {
      updateFormData({
        address,
        coordinates: selectedCoords || undefined,
      });
      onNext();
    }
  };

  const handleNext = () => {
    if (address && selectedCoords) {
      onNext();
    } else if (address && !selectedCoords) {
      // Si l'utilisateur a saisi une adresse mais pas de coordonnées (API down)
      handleManualValidation();
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="font-semibold text-[32px] text-slate-900">
        QUELLE EST VOTRE ADRESSE ?
      </h2>

      <div className="relative space-y-4">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="votre adresse*"
            className="w-full rounded-lg border-2 border-slate-300 px-4 py-3 text-base transition-colors focus:border-[#5CB88F] focus:outline-none"
          />
          {isLoading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-[#5CB88F]"></div>
            </div>
          )}
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-10 mt-1 w-full rounded-lg border border-slate-200 bg-white shadow-lg">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                onClick={() => selectAddress(suggestion)}
                className="w-full px-4 py-3 text-left text-sm hover:bg-slate-50 first:rounded-t-lg last:rounded-b-lg"
              >
                {suggestion.properties.label}
              </button>
            ))}
          </div>
        )}

        {showMap && selectedCoords && (
          <div className="space-y-3">
            <div className="rounded-lg bg-[#5CB88F] px-4 py-3 text-white">
              <p className="text-center font-medium">
                Cliquez sur votre habitation
                <br />
                sur la carte ci-dessous
              </p>
            </div>

            <div className="relative h-[300px] w-full overflow-hidden rounded-lg border-2 border-slate-200">
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${selectedCoords.lng - 0.005},${selectedCoords.lat - 0.005},${selectedCoords.lng + 0.005},${selectedCoords.lat + 0.005}&layer=mapnik&marker=${selectedCoords.lat},${selectedCoords.lng}`}
                allowFullScreen
              />
            </div>

            <p className="text-center text-sm text-slate-600">
              {address}
            </p>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={handleNext}
        disabled={!address}
        className="w-full rounded-lg bg-[#5CB88F] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#4da77e] disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        Suivant
      </button>

      {address && !selectedCoords && (
        <p className="text-center text-sm text-slate-500">
          Vous pouvez continuer avec l&apos;adresse saisie manuellement
        </p>
      )}
    </div>
  );
}
