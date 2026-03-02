# Google Solar API - maxSunshineHoursPerYear Research

## Date: 2026-03-02

## Official Definition

From the Google Solar API Reference (buildingInsights.findClosest):

> **maxSunshineHoursPerYear**: "Maximum number of sunshine hours received per year, by any point on the roof."
> "Sunshine hours are a measure of the total amount of insolation (energy) received per year. 1 sunshine hour = 1 kWh per kW"

This means: **1 sunshine hour = 1 peak sun hour = 1 kWh/kW of installed capacity under STC**

## What This IS

- maxSunshineHoursPerYear is equivalent to **Peak Sun Hours (PSH)**
- It represents the number of equivalent hours at 1000 W/m2 solar irradiance
- It corresponds to annual solar irradiation in kWh/m2 on the actual roof surface (accounting for tilt, orientation, shading)
- It is the MAXIMUM value across all points on the roof (best-case roof segment)

## What This IS NOT

- It is NOT total meteorological sunshine hours (hours with sun visible)
- It is NOT total daylight hours
- Toulon has ~2,800-2,900 hours of meteorological sunshine, but only ~1,500-1,700 peak sun hours

## Cross-Validation with Known Locations

### Palo Alto, California (Rinconada Library)
- Google Solar API maxSunshineHoursPerYear: **1842**
- Known GHI: 5.01 kWh/m2/day x 365 = **1829 kWh/m2/year**
- Tilted (at latitude): 5.72 kWh/m2/day x 365 = **2088 kWh/m2/year**
- The API value (1842) is between GHI and optimal tilt, consistent with actual roof orientation

### London, UK (10 Downing Street)
- Google Solar API maxSunshineHoursPerYear: **971.6**
- Known UK peak sun hours: **900-1,100 per year**
- Known London meteorological sunshine hours: **1,675 hours**
- The API value (972) matches peak sun hours, NOT meteorological sunshine hours

## Expected Values for Toulon, France

### Peak Sun Hours (what the API returns)
- Horizontal surface: ~1,612 kWh/m2/year (PVGIS data)
- Optimal tilt (38 degrees south): ~1,981 kWh/m2/year (PVGIS data)
- Expected maxSunshineHoursPerYear from API: **~1,400-1,700** depending on roof orientation
  (between horizontal and optimal tilt, accounting for shading and actual roof angle)

### Meteorological Sunshine Hours (NOT what the API returns)
- Toulon: ~2,800-2,900 hours/year
- This is simply the count of hours when the sun is visible

## Sources

- Google Solar API Reference: https://developers.google.com/maps/documentation/solar/reference/rest/v1/buildingInsights/findClosest
- Google Solar API Concepts: https://developers.google.com/maps/documentation/solar/concepts
- PVGIS Toulon data: https://pvgis.com/en/solar-panels-calculator/toulon/france
- Palo Alto solar data: https://www.solarenergylocal.com/states/california/palo-alto/
