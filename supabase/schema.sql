-- Schéma MVP livraison A→B
-- À exécuter dans Supabase : SQL Editor > New query > coller > Run.

create table if not exists public.delivery_requests (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),
  customer_name     text not null,
  customer_phone    text not null,
  pickup_address    text not null,
  pickup_zone       text not null,
  dropoff_address   text not null,
  dropoff_zone      text not null,
  item_description  text not null,
  scheduled_for     text,
  price_fc          integer not null,
  status            text not null default 'nouvelle',
  confirmation_code text not null,
  operator_note     text
);

create index if not exists delivery_requests_created_at_idx
  on public.delivery_requests (created_at desc);

-- RLS activé SANS policy publique : seule la clé "service role" (côté serveur)
-- peut lire/écrire. Le navigateur n'a jamais accès direct à la table.
alter table public.delivery_requests enable row level security;
