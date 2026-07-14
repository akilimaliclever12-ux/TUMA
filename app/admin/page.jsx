import { cookies } from "next/headers";
import { getAdminClient } from "../../lib/supabaseAdmin";
import { login, logout, updateStatus } from "./actions";
import {
  BRAND,
  TARIFFS,
  STATUSES,
  STATUS_LABELS,
} from "../config";

export const dynamic = "force-dynamic";

export default async function AdminPage({ searchParams }) {
  const authed =
    cookies().get("op_auth")?.value &&
    cookies().get("op_auth")?.value === process.env.ADMIN_PASSWORD;

  if (!authed) {
    return (
      <main className="admin-login">
        <form className="card" action={login}>
          <h2>Tableau opérateur</h2>
          <label>
            Mot de passe
            <input name="password" type="password" required autoFocus />
          </label>
          {searchParams?.error && (
            <p className="error">Mot de passe incorrect.</p>
          )}
          <button className="btn primary" type="submit">
            Entrer
          </button>
        </form>
      </main>
    );
  }

  const supabase = getAdminClient();
  let requests = [];
  let dbError = false;
  if (supabase) {
    const { data, error } = await supabase
      .from("delivery_requests")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) dbError = true;
    requests = data || [];
  } else {
    dbError = true;
  }

  const active = requests.filter(
    (r) => r.status !== "livre" && r.status !== "annule"
  ).length;
  const delivered = requests.filter((r) => r.status === "livre").length;
  const revenue = requests
    .filter((r) => r.status === "livre")
    .reduce((s, r) => s + (r.price_fc || 0), 0);

  return (
    <main className="admin">
      <div className="admin-top">
        <div className="admin-brand">
          <img className="admin-logo" src="/tuma-logo.jpg" alt={BRAND} />
          <h1>Opérateur</h1>
        </div>
        <form action={logout}>
          <button className="btn ghost small">Déconnexion</button>
        </form>
      </div>

      <div className="stats">
        <div className="stat">
          <span className="stat-num">{active}</span>
          <span className="stat-label">En cours</span>
        </div>
        <div className="stat">
          <span className="stat-num">{delivered}</span>
          <span className="stat-label">Livrées</span>
        </div>
        <div className="stat">
          <span className="stat-num">
            {revenue.toLocaleString("fr-FR")} {TARIFFS.currency}
          </span>
          <span className="stat-label">Encaissé (livré)</span>
        </div>
      </div>

      {dbError && (
        <p className="error">
          Base de données non configurée ou inaccessible. Vérifie
          NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY dans .env.local.
        </p>
      )}

      {requests.length === 0 && !dbError && (
        <p className="muted">Aucune demande pour l'instant.</p>
      )}

      <div className="requests">
        {requests.map((r) => (
          <div className={`req status-${r.status}`} key={r.id}>
            <div className="req-head">
              <span className="req-code">#{r.confirmation_code}</span>
              <span className="req-badge">{STATUS_LABELS[r.status] || r.status}</span>
              <span className="req-price">
                {(r.price_fc || 0).toLocaleString("fr-FR")} {TARIFFS.currency}
              </span>
            </div>
            <div className="req-body">
              <p>
                <strong>{r.customer_name}</strong> · {r.customer_phone}
              </p>
              <p>
                <span className="tag">Ramassage</span> {r.pickup_address} (
                {r.pickup_zone})
              </p>
              <p>
                <span className="tag">Livraison</span> {r.dropoff_address} (
                {r.dropoff_zone})
              </p>
              <p className="muted">
                {r.item_description}
                {r.scheduled_for ? ` · ${r.scheduled_for}` : ""}
              </p>
              <p className="muted small">
                {new Date(r.created_at).toLocaleString("fr-FR")}
              </p>
            </div>
            <form className="req-form" action={updateStatus}>
              <input type="hidden" name="id" value={r.id} />
              <select name="status" defaultValue={r.status}>
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {STATUS_LABELS[s]}
                  </option>
                ))}
              </select>
              <input
                name="operator_note"
                placeholder="Note (motard, remarque...)"
                defaultValue={r.operator_note || ""}
              />
              <button className="btn primary small" type="submit">
                Mettre à jour
              </button>
            </form>
          </div>
        ))}
      </div>
    </main>
  );
}
