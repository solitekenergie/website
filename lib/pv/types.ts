export type PvEstimateInput = {
  annualConsumptionKwh: number;
  coverage: number; // between 0 and 1
  irradiation: number; // kWh/m²/year
};

export type PvEstimateResult = {
  recommendedKw: number;
  annualProductionKwh: number;
  coverageRate: number;
};
