import RequestForm from "./RequestForm";
import { BRAND, CITY, TARIFFS } from "./config";

export default function HomePage() {
  return (
    <main>
      <header className="hero">
        <div className="hero-inner">
          <span className="badge">{CITY}</span>
          <img className="logo-img" src="/tuma-logo.png" alt={BRAND} />
          <p className="tagline">
            Occupé ? On récupère et on livre votre colis à votre place.
            Gagnez du temps, on s'occupe du trajet.
          </p>
          <div className="pills">
            <span className="pill">Même zone · {TARIFFS.sameZone.toLocaleString("fr-FR")} {TARIFFS.currency}</span>
            <span className="pill">Entre zones · {TARIFFS.interZone.toLocaleString("fr-FR")} {TARIFFS.currency}</span>
            <span className="pill">Code de confirmation à la livraison</span>
          </div>
        </div>
      </header>

      <section className="form-section">
        <RequestForm />
      </section>

      <footer className="foot">
        <p>
          Paiement des frais par mobile money à la commande · un seul motard,
          chaque course tracée.
        </p>
      </footer>
    </main>
  );
}
