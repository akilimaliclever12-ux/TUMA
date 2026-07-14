"use server";

import { getAdminClient } from "../lib/supabaseAdmin";
import { computePrice, ZONES } from "./config";

export async function createRequest(payload) {
  const {
    customerName,
    customerPhone,
    pickupAddress,
    pickupZone,
    dropoffAddress,
    dropoffZone,
    itemDescription,
    scheduledFor,
  } = payload || {};

  if (
    !customerName ||
    !customerPhone ||
    !pickupAddress ||
    !dropoffAddress ||
    !itemDescription
  ) {
    return { error: "Merci de remplir tous les champs obligatoires." };
  }
  if (!ZONES.includes(pickupZone) || !ZONES.includes(dropoffZone)) {
    return { error: "Zone de ramassage ou de livraison invalide." };
  }

  const supabase = getAdminClient();
  if (!supabase) {
    return {
      error:
        "Le service n'est pas encore configuré (base de données). Contacte l'opérateur par téléphone.",
    };
  }

  const price_fc = computePrice(pickupZone, dropoffZone);
  const confirmation_code = String(Math.floor(1000 + Math.random() * 9000));

  const { error } = await supabase.from("delivery_requests").insert({
    customer_name: customerName.trim(),
    customer_phone: customerPhone.trim(),
    pickup_address: pickupAddress.trim(),
    pickup_zone: pickupZone,
    dropoff_address: dropoffAddress.trim(),
    dropoff_zone: dropoffZone,
    item_description: itemDescription.trim(),
    scheduled_for: scheduledFor ? scheduledFor.trim() : null,
    price_fc,
    confirmation_code,
    status: "nouvelle",
  });

  if (error) {
    return { error: "Erreur lors de l'enregistrement. Réessaie dans un instant." };
  }

  return { ok: true, price_fc, confirmation_code };
}
