-- Braldico — tabela pentru abonații la newsletter.
-- Rulează o singură dată în Supabase: SQL Editor → New query → lipește → Run.

create table if not exists public.newsletter_subscribers (
  id          bigint generated always as identity primary key,
  email       text not null
              check (char_length(email) <= 254 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  consent     boolean not null check (consent),
  source_page text check (char_length(source_page) <= 100),
  created_at  timestamptz not null default now()
);

-- O adresă apare o singură dată, indiferent de majuscule.
create unique index if not exists newsletter_subscribers_email_key
  on public.newsletter_subscribers (lower(email));

-- Site-ul (cheia publică) poate doar să adauge rânduri, nu să le citească,
-- modifice sau șteargă. Lista se vede doar din panoul Supabase.
alter table public.newsletter_subscribers enable row level security;

revoke all on public.newsletter_subscribers from anon, authenticated;
grant insert (email, consent, source_page) on public.newsletter_subscribers to anon;

drop policy if exists "Public poate să se aboneze" on public.newsletter_subscribers;
create policy "Public poate să se aboneze"
  on public.newsletter_subscribers
  for insert to anon
  with check (consent);
