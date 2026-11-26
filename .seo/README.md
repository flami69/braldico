# Bucla de articole SEO / AEO / GEO — reguli pentru fiecare rulare

Repo: /Users/AndreiBularca/Desktop/site Braldico (GitHub: flami69/braldico, publicat prin GitHub Pages).
Site live: https://flami69.github.io/braldico/ — o rulare = UN articol nou.

## 1. Pregătire
- `git pull --rebase`. Dacă există modificări necomise în fișiere urmărite, OPREȘTE și raportează (nu le suprascrie).
- Fișierul `Braldico_bread_prices_2026-10-30.xlsx` nu se comite niciodată.
- Citește `.seo/facts.md` (singura sursă de fapte) și `.seo/topics.md`.

## 2. Alegerea subiectului
- Primul `[todo]` al cărui sezon include luna curentă sau următoarele ~2 luni; altfel primul `[todo]` cu sezon „oricând”.
- Verifică să nu se suprapună cu un articol existent (titluri din `articole.html`, `sitemap.xml`). Dacă se suprapune, marchează `[skip]` cu motiv și ia următorul.
- Dacă nu mai e niciun `[todo]`: NU inventa subiecte; raportează că lista trebuie completată.

## 3. Scrierea articolului (`<slug>.html` în rădăcina repo-ului)
- Copiază EXACT structura unui articol existent (ex. `torturi-la-comanda-brasov.html`): același `<head>` (title ≤ 65 caractere cu cuvântul-cheie + „Brașov” unde e natural, meta description ≤ 160, canonical, Open Graph), același header, același footer, `consent.js` + `script.js`.
- Româna corectă, cu diacritice (ș, ț cu virgulă). 1.500–2.200 de cuvinte, util, fără umplutură.
- Structură AEO: breadcrumb, H1 cu cuvântul-cheie, caseta „Pe scurt” (2–3 propoziții care răspund direct), H2-uri formulate ca întrebări, liste și cel puțin un tabel, 5–6 întrebări frecvente.
- GEO: caseta „Braldico pe scurt” identică cu celelalte articole; fapte locale (Brașov, magazine) doar din `facts.md`.
- JSON-LD: Article (author/publisher Organization Braldico, datePublished = azi), FAQPage (aceleași întrebări ca pe pagină), BreadcrumbList.
- Linkuri interne: 3–5 către articole existente relevante + pagina principală sau `pentru-firme.html`; secțiunea „Citește și”.
- INTERZIS: prețuri/nume de produse/gramaje Braldico care nu sunt în `facts.md`; afirmații medicale; recenzii sau clienți inventați; promisiuni de livrare/prețuri. Cantitățile orientative se marchează „orientativ”.

## 4. Integrare (articolele rămân ASCUNSE din site)
- Adaugă un card în `articole.html` (aceeași structură `guide-card`).
- Adaugă URL-ul în `sitemap.xml` (lastmod = azi) și o linie în secțiunea „Pagini” din `llms.txt`.
- Adaugă un link „Citește și” către noul articol în 1–2 articole existente relevante.
- NU adăuga linkuri în meniu, pe pagina principală sau în footer.

## 5. Verificare (înainte de commit)
- Toate blocurile JSON-LD se parsează; toate linkurile `.html` interne duc la fișiere existente; nu există text în engleză sau placeholder.
- Marchează subiectul `[done]` în `topics.md` cu data.

## 6. Publicare
- `git add` DOAR fișierele atinse (niciodată `git add -A`). Commit în engleză, cu ultima linie:
  `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`
- `git push`; așteaptă build-ul GitHub Pages (`gh api repos/flami69/braldico/pages/builds/latest`), apoi verifică HTTP 200 pentru noul URL.
- Trimite noul URL + `articole.html` + `sitemap.xml` la IndexNow (POST JSON către https://api.indexnow.org/indexnow și https://www.bing.com/indexnow):
  host `flami69.github.io`, key `ddbd97d4daad1db9caefacfb632537f6`, keyLocation `https://flami69.github.io/braldico/ddbd97d4daad1db9caefacfb632537f6.txt`.
- Dacă ceva eșuează, nu publica parțial; raportează problema.

## 7. Raport final (scurt)
Titlul, URL-ul, cuvântul-cheie, numărul de cuvinte, statusul IndexNow, următorul subiect din coadă.
