-- Dubai Residency Experts — lead-capture submissions
-- Run once against your Neon Postgres database before the API goes live.
-- Neon: paste into the SQL editor at console.neon.tech, or:
--   psql "$DATABASE_URL" -f schema.sql

create table if not exists submissions (
  id                bigserial    primary key,
  created_at        timestamptz  not null default now(),
  full_name         text         not null,
  phone             text         not null,
  email             text,
  service           text,
  purpose           text,
  arrival_timeline  text,
  current_location  text,
  budget_ready      text,
  notes             text
);
