import { PvEstimateInput, PvEstimateResult } from "./types";

export function estimatePvSystem(input: PvEstimateInput): PvEstimateResult {
  const coverage = Math.min(Math.max(input.coverage, 0), 1);
  const recommendedKw = Number(
    ((input.annualConsumptionKwh * coverage) / input.irradiation).toFixed(2),
  );
  const annualProductionKwh = Number((recommendedKw * input.irradiation).toFixed(0));
  const coverageRate = input.annualConsumptionKwh
    ? Number((annualProductionKwh / input.annualConsumptionKwh).toFixed(2))
    : 0;

  return {
    recommendedKw,
    annualProductionKwh,
    coverageRate,
  };
}
