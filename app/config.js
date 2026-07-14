// ⚙️ Personnalise ici — c'est le seul fichier à changer pour adapter le service.

export const BRAND = "TUMA";
export const CITY = "Bukavu";

// Zones desservies (les communes de Bukavu par défaut).
export const ZONES = ["Ibanda", "Kadutu", "Bagira"];

// Tarifs particuliers (FC)
export const TARIFFS = {
  sameZone: 5000,   // même zone
  interZone: 7000,  // entre zones différentes
  currency: "FC",
};

// Numéro WhatsApp de l'opérateur/motard, format international sans "+" ni espaces.
// Ex : 243970000000
export const OPERATOR_WHATSAPP = "243970000000";

export function computePrice(pickupZone, dropoffZone) {
  return pickupZone === dropoffZone ? TARIFFS.sameZone : TARIFFS.interZone;
}

export const STATUSES = ["nouvelle", "assignee", "ramasse", "livre", "annule"];

export const STATUS_LABELS = {
  nouvelle: "Nouvelle",
  assignee: "Assignée",
  ramasse: "Ramassée",
  livre: "Livrée",
  annule: "Annulée",
};
