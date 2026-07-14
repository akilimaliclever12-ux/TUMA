import "./globals.css";
import { BRAND } from "./config";

export const metadata = {
  title: `${BRAND} — Livraison rapide`,
  description: "Envoyez ou recevez un colis sans bouger. On s'en charge.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
