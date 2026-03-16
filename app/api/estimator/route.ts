import { NextRequest, NextResponse } from "next/server";
import { estimatorSchema } from "@/lib/validation/estimator";
import { sendEmail } from "@/lib/email/send";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const rl = rateLimit(ip, { limit: 3, windowMs: 60_000 });
  if (!rl.success) {
    return NextResponse.json(
      { message: "Trop de requêtes. Réessayez dans quelques instants." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
    );
  }

  try {
    const body = await request.json();

    // Validate request body
    const validation = estimatorSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          message: "Données invalides",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validation.data;

    // Format equipment list
    const equipmentLabels: { [key: string]: string } = {
      "electric-vehicle": "Véhicule électrique",
      pool: "Piscine",
      "air-conditioning": "Climatisation",
    };
    const equipmentList =
      data.otherEquipment.length > 0
        ? data.otherEquipment.map((eq) => equipmentLabels[eq] || eq).join(", ")
        : "Aucun";

    // Format heating and hot water
    const heatingLabels: { [key: string]: string } = {
      "heat-pump": "Pompe à chaleur",
      "electric-radiator": "Radiateurs électriques",
      "non-electric": "Non électrique",
      unknown: "Ne sait pas",
      other: "Autre",
    };

    const hotWaterLabels: { [key: string]: string } = {
      electric: "Électrique",
      thermodynamic: "Thermodynamique",
      "heat-pump": "Pompe à chaleur",
      "non-electric": "Non électrique",
      unknown: "Ne sait pas",
      other: "Autre",
    };

    const presenceLabels: { [key: string]: string } = {
      "morning-evening": "Matin et soir",
      "all-day": "Toute la journée",
      "school-holidays": "Vacances scolaires",
    };

    // Construct email text with all form data and results
    const emailText = `
=== NOUVELLE DEMANDE D'ESTIMATION SOLAIRE ===

CONTACT
-------
Nom: ${data.name}
Email: ${data.email}
Téléphone: ${data.phone || "Non renseigné"}

ADRESSE
-------
${data.address}
${data.coordinates ? `Coordonnées GPS: ${data.coordinates.lat}, ${data.coordinates.lng}` : ""}

CONSOMMATION ÉLECTRIQUE
-----------------------
Valeur: ${data.consumptionValue} ${data.consumptionUnit === "kwh" ? "kWh/an" : "€/an"}
${data.electricityPrice ? `Prix de l'électricité: ${data.electricityPrice} €/kWh` : ""}

INFORMATIONS DU FOYER
---------------------
Nombre de personnes: ${data.householdSize}
Profil de présence: ${presenceLabels[data.presenceProfile] || data.presenceProfile}
Surface habitable: ${data.surface} m²

ÉQUIPEMENTS
-----------
Chauffage principal: ${heatingLabels[data.mainHeating] || data.mainHeating}${data.mainHeating === "other" && data.mainHeatingOther ? ` (${data.mainHeatingOther})` : ""}
Eau chaude: ${hotWaterLabels[data.hotWater] || data.hotWater}${data.hotWater === "other" && data.hotWaterOther ? ` (${data.hotWaterOther})` : ""}
Autres équipements: ${equipmentList}

========================================
RÉSULTATS DE L'ESTIMATION
========================================

Nombre de panneaux: ${data.panelsCount}
Puissance recommandée: ${data.recommendedKwc} kWc
${data.roofAreaMeters2 ? `Surface de toit utilisable: ${Math.round(data.roofAreaMeters2)} m²` : ""}

Production annuelle estimée: ${data.annualProductionKwh.toLocaleString("fr-FR")} kWh
Économies annuelles: ${data.annualSavings.toLocaleString("fr-FR")} €
Économies sur 25 ans: ${data.totalSavings.toLocaleString("fr-FR")} €

Coût d'installation estimé: ${data.installationCost.toLocaleString("fr-FR")} €
Retour sur investissement: ${data.paybackYears} ans
${data.maxSunshineHoursPerYear ? `Heures d'ensoleillement: ${data.maxSunshineHoursPerYear} h/an` : ""}
${data.irrPercent ? `Taux de rentabilité interne: ${data.irrPercent}% (vs Livret A à 1,7%)` : ""}

${data.usedGoogleSolar ? "✓ Estimation basée sur Google Solar API" : "⚠ Estimation basée sur PVGIS (données moyennes)"}

========================================

Cette estimation a été générée automatiquement depuis le formulaire estimateur du site Solitek.
    `.trim();

    // Send email
    const result = await sendEmail({
      to: process.env.CONTACT_TO_EMAIL,
      subject: `Nouvelle estimation solaire - ${data.name}`,
      text: emailText,
      replyTo: data.email,
    });

    if (!result.delivered) {
      console.error("[estimator] Email non délivré:", result.note);
      return NextResponse.json(
        {
          message: "Impossible d'envoyer la demande pour le moment.",
          delivered: false,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      delivered: result.delivered,
      note: result.note || "Votre estimation a été envoyée avec succès. Nous vous recontacterons rapidement.",
    });
  } catch (error) {
    console.error("[estimator] Erreur inattendue:", error);
    return NextResponse.json(
      { message: "Une erreur s'est produite lors de l'envoi." },
      { status: 500 }
    );
  }
}
