"use client";

import { useMemo, useState } from "react";
import { createRequest } from "./actions";
import {
  ZONES,
  TARIFFS,
  computePrice,
  OPERATOR_WHATSAPP,
  BRAND,
} from "./config";

const EMPTY = {
  customerName: "",
  customerPhone: "",
  pickupAddress: "",
  pickupZone: ZONES[0],
  dropoffAddress: "",
  dropoffZone: ZONES[0],
  itemDescription: "",
  scheduledFor: "",
};

export default function RequestForm() {
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null); // { price_fc, confirmation_code }

  const price = useMemo(
    () => computePrice(form.pickupZone, form.dropoffZone),
    [form.pickupZone, form.dropoffZone]
  );

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await createRequest(form);
    setLoading(false);
    if (res?.error) {
      setError(res.error);
      return;
    }
    setSuccess({ price_fc: res.price_fc, confirmation_code: res.confirmation_code });
  }

  if (success) {
    const waText = encodeURIComponent(
      `Bonjour ${BRAND}, je confirme ma demande de livraison.\n` +
        `Code : ${success.confirmation_code}\n` +
        `Client : ${form.customerName} (${form.customerPhone})\n` +
        `Ramassage : ${form.pickupAddress} (${form.pickupZone})\n` +
        `Livraison : ${form.dropoffAddress} (${form.dropoffZone})\n` +
        `Objet : ${form.itemDescription}\n` +
        (form.scheduledFor ? `Quand : ${form.scheduledFor}\n` : "") +
        `Prix : ${success.price_fc} ${TARIFFS.currency}`
    );
    const waUrl = `https://wa.me/${OPERATOR_WHATSAPP}?text=${waText}`;

    return (
      <div className="card success">
        <div className="check">✓</div>
        <h2>Demande enregistrée</h2>
        <p className="muted">Garde ce code, il sera demandé à la livraison.</p>
        <div className="code-box">
          <span className="code-label">Code de confirmation</span>
          <span className="code">{success.confirmation_code}</span>
        </div>
        <div className="price-row big">
          <span>Frais de livraison</span>
          <strong>
            {success.price_fc.toLocaleString("fr-FR")} {TARIFFS.currency}
          </strong>
        </div>
        <a className="btn wa" href={waUrl} target="_blank" rel="noreferrer">
          Confirmer sur WhatsApp
        </a>
        <button
          className="btn ghost"
          onClick={() => {
            setSuccess(null);
            setForm(EMPTY);
          }}
        >
          Nouvelle demande
        </button>
      </div>
    );
  }

  return (
    <form className="card" onSubmit={onSubmit}>
      <h2>Demander une livraison</h2>

      <label>
        Votre nom *
        <input
          value={form.customerName}
          onChange={(e) => update("customerName", e.target.value)}
          placeholder="Ex : Amani K."
          required
        />
      </label>

      <label>
        Votre téléphone *
        <input
          value={form.customerPhone}
          onChange={(e) => update("customerPhone", e.target.value)}
          placeholder="Ex : 097 000 0000"
          inputMode="tel"
          required
        />
      </label>

      <fieldset>
        <legend>Ramassage</legend>
        <label>
          Adresse *
          <input
            value={form.pickupAddress}
            onChange={(e) => update("pickupAddress", e.target.value)}
            placeholder="Où récupérer l'objet ?"
            required
          />
        </label>
        <label>
          Zone *
          <select
            value={form.pickupZone}
            onChange={(e) => update("pickupZone", e.target.value)}
          >
            {ZONES.map((z) => (
              <option key={z} value={z}>
                {z}
              </option>
            ))}
          </select>
        </label>
      </fieldset>

      <fieldset>
        <legend>Livraison</legend>
        <label>
          Adresse *
          <input
            value={form.dropoffAddress}
            onChange={(e) => update("dropoffAddress", e.target.value)}
            placeholder="Où livrer l'objet ?"
            required
          />
        </label>
        <label>
          Zone *
          <select
            value={form.dropoffZone}
            onChange={(e) => update("dropoffZone", e.target.value)}
          >
            {ZONES.map((z) => (
              <option key={z} value={z}>
                {z}
              </option>
            ))}
          </select>
        </label>
      </fieldset>

      <label>
        Que faut-il transporter ? *
        <input
          value={form.itemDescription}
          onChange={(e) => update("itemDescription", e.target.value)}
          placeholder="Ex : documents, petit colis, clés..."
          required
        />
      </label>

      <label>
        Quand ? (optionnel)
        <input
          value={form.scheduledFor}
          onChange={(e) => update("scheduledFor", e.target.value)}
          placeholder="Ex : maintenant, aujourd'hui 15h..."
        />
      </label>

      <div className="price-row">
        <span>Frais de livraison estimés</span>
        <strong>
          {price.toLocaleString("fr-FR")} {TARIFFS.currency}
        </strong>
      </div>
      <p className="muted small">
        {form.pickupZone === form.dropoffZone
          ? "Même zone"
          : "Entre deux zones"}{" "}
        · à payer par mobile money à la commande. La marchandise se paie
        directement au vendeur, à la livraison.
      </p>

      {error && <p className="error">{error}</p>}

      <button className="btn primary" type="submit" disabled={loading}>
        {loading ? "Envoi..." : "Envoyer la demande"}
      </button>
    </form>
  );
}
