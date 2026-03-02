/**
 * Calculate Internal Rate of Return (IRR) using Newton-Raphson method.
 *
 * @param cashFlows - Array where index 0 is the initial investment (negative)
 *                    and subsequent values are periodic returns (positive).
 * @param guess - Initial guess for the rate (default 0.1 = 10%)
 * @param maxIterations - Maximum iterations before giving up
 * @param tolerance - Convergence threshold
 * @returns The IRR as a decimal (e.g., 0.05 for 5%), or null if no convergence
 */
export function calculateIRR(
  cashFlows: number[],
  guess: number = 0.1,
  maxIterations: number = 100,
  tolerance: number = 1e-6,
): number | null {
  if (cashFlows.length < 2) return null;

  let rate = guess;

  for (let i = 0; i < maxIterations; i++) {
    let npv = 0;
    let dnpv = 0;

    for (let t = 0; t < cashFlows.length; t++) {
      const factor = Math.pow(1 + rate, t);
      npv += cashFlows[t] / factor;
      if (t > 0) {
        dnpv -= (t * cashFlows[t]) / Math.pow(1 + rate, t + 1);
      }
    }

    if (Math.abs(dnpv) < 1e-12) return null;

    const newRate = rate - npv / dnpv;

    if (Math.abs(newRate - rate) < tolerance) {
      return newRate;
    }

    rate = newRate;
  }

  return null;
}

/**
 * Calculate solar installation IRR as a percentage.
 *
 * @param installationCost - Total cost of the installation in euros
 * @param annualSavings - Yearly savings in euros
 * @param years - System lifespan (default 25)
 * @returns IRR as percentage (e.g., 5.2 for 5.2%), or null if cannot compute
 */
export function calculateSolarIRR(
  installationCost: number,
  annualSavings: number,
  years: number = 25,
): number | null {
  if (installationCost <= 0 || annualSavings <= 0) return null;

  const cashFlows = [-installationCost, ...Array(years).fill(annualSavings)];
  const irr = calculateIRR(cashFlows);

  return irr !== null ? Math.round(irr * 1000) / 10 : null;
}
