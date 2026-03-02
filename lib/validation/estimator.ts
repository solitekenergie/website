import { z } from "zod";

export const estimatorSchema = z.object({
  // User information
  name: z.string().min(2, "Merci d'indiquer votre nom complet."),
  email: z.string().email("Merci de saisir un email valide."),
  phone: z
    .string()
    .trim()
    .transform((value) => (value === "" ? undefined : value))
    .optional(),

  // Address and location
  address: z.string().min(5, "Merci de saisir une adresse valide."),
  coordinates: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional(),

  // Consumption
  consumptionValue: z.number().positive("La consommation doit être positive."),
  consumptionUnit: z.enum(["kwh", "euro"]),
  electricityPrice: z.number().positive().optional(),

  // Household
  householdSize: z.number().int().min(1).max(20),
  presenceProfile: z.enum(["morning-evening", "all-day", "school-holidays"]),
  surface: z.number().positive("La surface doit être positive."),

  // Heating and hot water
  mainHeating: z.enum(["heat-pump", "electric-radiator", "non-electric"]),
  hotWater: z.enum(["electric", "thermodynamic", "heat-pump", "non-electric"]),

  // Equipment
  otherEquipment: z.array(z.string()),

  // Results (calculated data)
  panelsCount: z.number().int().nonnegative(),
  annualProductionKwh: z.number().nonnegative(),
  recommendedKwc: z.number().nonnegative(),
  installationCost: z.number().nonnegative(),
  annualSavings: z.number().nonnegative(),
  totalSavings: z.number().nonnegative(),
  paybackYears: z.number().nonnegative(),
  usedGoogleSolar: z.boolean(),
  roofAreaMeters2: z.number().positive().optional(),
  maxSunshineHoursPerYear: z.number().positive().optional(),
  irrPercent: z.number().optional().nullable(),
});

export type EstimatorData = z.infer<typeof estimatorSchema>;
