# Solar Production Analysis - Toulon Region (PACA)

## Date: 2026-03-02

## Question: Is 0.35 kWh/panel/sunshine-hour realistic?

### Short Answer: YES, it is realistic and correct.

The calculation `annualProductionKwh / panelsCount / maxSunshineHoursPerYear` produces a value around 0.35 kWh/panel/hour, which is correct because:

1. maxSunshineHoursPerYear from Google Solar API = Peak Sun Hours (PSH), NOT total sunshine hours
2. A 400W panel produces 0.4 kWh per peak sun hour under ideal conditions (by definition)
3. After real-world losses (temperature, inverter, wiring, soiling, shading), 0.35 kWh is expected

### The Math

For a 400W panel:
- Theoretical max per PSH: 0.400 kWh
- Real-world efficiency factor (performance ratio): ~85-90%
- Expected production per PSH: 0.400 x 0.875 = **0.35 kWh**

This 0.35 figure represents a performance ratio of 87.5%, which is excellent but realistic for a well-designed residential installation in the south of France.

## Toulon Solar Data (PVGIS - European Commission)

### Annual Solar Irradiation
- Horizontal surface: 1,612 kWh/m2/year
- Optimal tilt (38 degrees, south-facing): 1,981 kWh/m2/year

### Annual Production for 1 kWp System (optimally tilted)
- Annual energy output: 1,756 kWh/year
- Performance ratio: 1,756 / 1,981 = 88.6%

### Per 400W Panel (optimally tilted)
- Annual production: 1,756 x 0.4 = **702 kWh/year**
- Per peak sun hour: 702 / 1,981 = **0.354 kWh** (confirms the 0.35 figure)

### Per 400W Panel (horizontal surface)
- Annual production: ~1,612 x 0.886 x 0.4 = **571 kWh/year**

## Key Distinction: Sunshine Hours vs Peak Sun Hours

| Metric | Toulon Value | What it measures |
|--------|-------------|-----------------|
| Meteorological sunshine hours | ~2,800-2,900 h/year | Hours when sun disc is visible |
| Peak sun hours (horizontal) | ~1,612 h/year | Equivalent hours at 1000 W/m2 |
| Peak sun hours (optimal tilt) | ~1,981 h/year | Equivalent hours at 1000 W/m2, tilted |
| Google Solar maxSunshineHours | ~1,400-1,700 h/year | Peak sun hours for best roof point |

## Production Per Panel Summary (400W, Toulon region)

| Scenario | Annual kWh | Per PSH |
|----------|-----------|---------|
| Theoretical maximum | 792 | 0.400 |
| Optimal tilt, minimal losses | 702 | 0.354 |
| Good residential installation | 600-680 | 0.33-0.37 |
| Suboptimal orientation | 500-600 | 0.30-0.35 |

## Conclusion

The value of 0.35 kWh/panel/sunshine-hour displayed in the estimator is:
- Mathematically correct (since maxSunshineHoursPerYear = peak sun hours)
- Physically meaningful (represents ~87.5% performance ratio)
- Consistent with PVGIS reference data for the Toulon region
- A reasonable expectation for a well-installed residential system

## Sources

- PVGIS (European Commission JRC): https://pvgis.com/en/solar-panels-calculator/toulon/france
- Google Solar API Documentation: https://developers.google.com/maps/documentation/solar/concepts
- Toulon sunshine hours: https://www.annuaire-mairie.fr/ensoleillement-toulon.html
