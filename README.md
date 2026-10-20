# Braldico

Site de prezentare pentru Braldico (brutărie, patiserie, cofetărie — din 1997) — HTML, CSS și JavaScript simplu, fără dependențe.

## Structură

- `index.html` — pagina principală (clienți persoane fizice)
- `pentru-firme.html` — pagina pentru clienți firme (magazine, cantine, hoteluri, after-school-uri)
- `styles.css` — stiluri
- `script.js` — meniu mobil, formular de contact și newsletter
- `supabase/schema.sql` — tabela Supabase pentru abonații la newsletter
- `consent.js` — banner cookie; Google Maps și Google Analytics se încarcă doar cu acord
- `termeni-si-conditii.html`, `politica-de-confidentialitate.html`, `politica-cookies.html` — pagini legale
- `assets/` — logo, favicon și fonturi găzduite local

## Newsletter (Supabase)

Adresele de e-mail din formularul de newsletter se salvează în tabela `newsletter_subscribers` din Supabase.

1. Creează un proiect pe [supabase.com](https://supabase.com) (regiune recomandată: UE, ex. Frankfurt).
2. În **SQL Editor**, rulează `supabase/schema.sql`.
3. Din **Project Settings → API**, copiază *Project URL* și cheia *publishable* (sau *anon*) în `SUPABASE_URL` / `SUPABASE_KEY` din `script.js`.
4. Abonații se văd în **Table Editor → newsletter_subscribers** (se pot exporta în CSV).

Cheia publică poate fi în cod: tabela permite site-ului doar să adauge adrese, nu să le citească.

## Rulare locală

Deschide `index.html` în browser.

## Publicare

Site-ul este publicat automat prin GitHub Pages din ramura `main`.
