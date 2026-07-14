# Livraison MVP

Petit service de livraison A→B (déplacer un objet d'un point à un autre) pour valider le concept.
Page publique de demande + tableau opérateur. Next.js + Supabase.

## Ce que ça fait
- **/** : le client remplit une demande, le prix se calcule seul (5 000 FC même zone / 7 000 FC entre zones),
  un code de confirmation est généré, et un bouton envoie la course pré-remplie sur ton WhatsApp.
- **/admin** : liste des demandes, statuts (nouvelle → assignée → ramassée → livrée), notes, et chiffres du jour.
  Protégé par mot de passe.

Toute la base de données est accédée côté serveur uniquement (clé service role jamais exposée au navigateur).

## Mise en route

### 1. Créer le projet Supabase
1. Va sur https://supabase.com → New project.
2. Ouvre **SQL Editor** → colle le contenu de `supabase/schema.sql` → **Run**.
3. Va dans **Project Settings → API** et note :
   - `Project URL`
   - la clé **`service_role`** (secrète — ne jamais la mettre côté client)

### 2. Configurer les variables
```bash
cp .env.local.example .env.local
```
Puis remplis `.env.local` :
```
NEXT_PUBLIC_SUPABASE_URL=...        # Project URL
SUPABASE_SERVICE_ROLE_KEY=...       # clé service_role
ADMIN_PASSWORD=un-mot-de-passe-fort
```

### 3. Personnaliser le service
Tout est dans `app/config.js` : nom de la marque, ville, zones, tarifs, **numéro WhatsApp de l'opérateur**.

### 4. Lancer
```bash
npm install
npm run dev
```
- Client : http://localhost:3000
- Opérateur : http://localhost:3000/admin

## Déploiement (plus tard)
Vercel : importer le repo, ajouter les 3 variables d'environnement, déployer.

## Volontairement hors périmètre (v2)
- Achat-pour-le-compte-de (« achète-moi X ») — réintroduit la manipulation d'argent.
- Comptes professionnels / tarif 4 000 FC prépayé.
- Plusieurs motards.
