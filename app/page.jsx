import RequestForm from "./RequestForm";
import { BRAND, CITY, TARIFFS, ZONES, OPERATOR_WHATSAPP } from "./config";

const waHref = `https://wa.me/${OPERATOR_WHATSAPP}?text=${encodeURIComponent(
  `Bonjour ${BRAND}, je voudrais une livraison.`
)}`;

const STEPS = [
  {
    n: "1",
    title: "Vous commandez",
    text: "Remplissez la demande en 30 secondes ou écrivez-nous sur WhatsApp. Le prix s'affiche tout de suite.",
  },
  {
    n: "2",
    title: "On récupère",
    text: "Notre motard passe prendre votre colis à l'adresse de ramassage, photo à l'appui.",
  },
  {
    n: "3",
    title: "On livre",
    text: "Livraison à destination. Le destinataire donne le code de confirmation, et c'est fait.",
  },
];

const FEATURES = [
  { icon: "⚡", title: "Rapide", text: "Un seul motard dédié, chaque course suivie de bout en bout." },
  { icon: "🔒", title: "Traçable", text: "Code de confirmation à la livraison + photos au ramassage et à la remise." },
  { icon: "💰", title: "Prix clair", text: "Tarif connu d'avance, payé par mobile money. Aucune surprise." },
  { icon: "📦", title: "Tout objet", text: "Documents, clés, petit colis — vous envoyez, on transporte." },
];

export default function HomePage() {
  return (
    <div className="page">
      {/* Barre de navigation */}
      <header className="nav">
        <div className="nav-inner">
          <img className="nav-logo" src="/tuma-logo.png" alt={BRAND} />
          <a className="btn wa small nav-cta" href={waHref} target="_blank" rel="noreferrer">
            <WaIcon /> WhatsApp
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero-inner">
          <span className="badge">Livraison · {CITY}</span>
          <h1>
            Envoyez et recevez vos colis, <span className="accent">sans bouger</span>.
          </h1>
          <p className="tagline">
            {BRAND} récupère et livre à votre place, partout à {CITY}. Vous êtes occupé ?
            On s'occupe du trajet — vous gagnez du temps.
          </p>
          <div className="cta-row">
            <a className="btn primary" href="#commander">Demander une livraison</a>
            <a className="btn wa" href={waHref} target="_blank" rel="noreferrer">
              <WaIcon /> Écrire sur WhatsApp
            </a>
          </div>
          <div className="hero-pills">
            <span className="pill">Même zone · {TARIFFS.sameZone.toLocaleString("fr-FR")} {TARIFFS.currency}</span>
            <span className="pill">Entre zones · {TARIFFS.interZone.toLocaleString("fr-FR")} {TARIFFS.currency}</span>
            <span className="pill">Paiement mobile money</span>
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="section">
        <h2 className="section-title">Comment ça marche</h2>
        <p className="section-sub">Trois étapes, et votre colis est en route.</p>
        <div className="steps">
          {STEPS.map((s) => (
            <div className="step" key={s.n}>
              <div className="step-num">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pourquoi TUMA */}
      <section className="section alt">
        <h2 className="section-title">Pourquoi {BRAND}</h2>
        <div className="features">
          {FEATURES.map((f) => (
            <div className="feature" key={f.title}>
              <span className="feature-icon">{f.icon}</span>
              <div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tarifs */}
      <section className="section">
        <h2 className="section-title">Tarifs simples</h2>
        <p className="section-sub">Le prix dépend seulement des zones. Payé à la commande.</p>
        <div className="pricing">
          <div className="price-card">
            <span className="price-tag">Même zone</span>
            <span className="price-amount">
              {TARIFFS.sameZone.toLocaleString("fr-FR")} <small>{TARIFFS.currency}</small>
            </span>
            <p>Ramassage et livraison dans la même zone.</p>
          </div>
          <div className="price-card featured">
            <span className="price-tag">Entre zones</span>
            <span className="price-amount">
              {TARIFFS.interZone.toLocaleString("fr-FR")} <small>{TARIFFS.currency}</small>
            </span>
            <p>D'une zone à une autre de {CITY}.</p>
          </div>
        </div>
        <p className="muted small center">
          La marchandise se paie directement au vendeur, à la livraison. {BRAND} ne facture que le transport.
        </p>
      </section>

      {/* Formulaire de commande */}
      <section id="commander" className="section form-section">
        <h2 className="section-title">Commander maintenant</h2>
        <p className="section-sub">Remplissez ci-dessous, ou <a href={waHref} target="_blank" rel="noreferrer">écrivez-nous sur WhatsApp</a>.</p>
        <RequestForm />
      </section>

      {/* Pied de page */}
      <footer className="foot">
        <img className="foot-logo" src="/tuma-logo.png" alt={BRAND} />
        <p className="foot-zones">Zones desservies : {ZONES.join(" · ")}</p>
        <a className="btn wa small foot-wa" href={waHref} target="_blank" rel="noreferrer">
          <WaIcon /> Nous contacter
        </a>
        <p className="foot-note">
          {BRAND} — livraison rapide à {CITY}. Paiement des frais par mobile money à la commande, chaque course tracée.
        </p>
      </footer>
    </div>
  );
}

function WaIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ verticalAlign: "-2px" }}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.8 14.16c-.24.68-1.42 1.32-1.95 1.36-.5.04-.5.4-3.16-.66-2.66-1.06-4.3-3.8-4.43-3.98-.13-.18-1.06-1.41-1.06-2.68 0-1.27.67-1.9.9-2.16.24-.26.53-.32.7-.32.18 0 .35 0 .5.01.16.01.38-.06.6.46.24.56.8 1.94.87 2.08.07.14.12.3.02.48-.09.18-.14.3-.28.46-.14.16-.29.36-.42.48-.14.14-.28.29-.12.56.16.28.72 1.18 1.54 1.91 1.06.94 1.95 1.24 2.23 1.38.28.14.44.12.6-.07.16-.18.7-.81.88-1.09.18-.28.36-.23.6-.14.24.09 1.55.73 1.82.87.28.14.46.2.53.32.07.12.07.68-.17 1.36Z"/>
    </svg>
  );
}
