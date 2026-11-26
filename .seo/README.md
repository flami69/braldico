# Bucla de articole SEO / AEO / GEO — reguli pentru fiecare rulare

Repo: /Users/AndreiBularca/Desktop/site Braldico (GitHub: flami69/braldico, publicat prin GitHub Pages).
Site live: https://flami69.github.io/braldico/ — o rulare = UN articol nou.

## 1. Pregătire
- `git pull --rebase`. Dacă există modificări necomise în fișiere urmărite, OPREȘTE și raportează (nu le suprascrie).
- Fișierul `Braldico_bread_prices_2026-10-30.xlsx` nu se comite niciodată.
- Citește `.seo/facts.md` (singura sursă de fapte), `.seo/topics.md` și 2 articole existente, ca reper de calitate și ton.

## 2. Alegerea subiectului
- Primul `[todo]` al cărui sezon include luna curentă sau următoarele ~2 luni; altfel primul `[todo]` cu sezon „oricând”.
- Verifică să nu se suprapună cu un articol existent (titluri din `articole.html`, `sitemap.xml`). Dacă se suprapune, marchează `[skip]` cu motiv și ia următorul.
- Dacă nu mai e niciun `[todo]`: NU inventa subiecte; raportează că lista trebuie completată.

## 3. Cercetare (înainte de a scrie — nu sări peste)
- Caută pe web cuvântul-cheie principal (în română) și citește primele 5–8 rezultate relevante: ce acoperă, ce lipsește, ce întrebări apar („Oamenii întreabă și”, forumuri, grupuri locale).
- Notează în `.seo/research/<slug>.md` (nu se publică): intenția de căutare (informare / comandă / comparație), 8–12 întrebări reale ale oamenilor, ce fac bine concurenții, golurile pe care le acoperim noi și 2–4 surse de încredere pentru afirmațiile generale (ex. ANSVSA, Comisia Europeană, Regulamentul UE 1169/2011, ghiduri oficiale). Fără surse slabe (bloguri anonime, conținut generat).
- Stabilește UNGHIUL ARTICOLULUI: ce oferă acest articol în plus față de ce există deja (un tabel comparativ util, un calcul, un ghid pas cu pas, o listă de verificare, context local Brașov). Dacă nu găsești un unghi care aduce ceva nou, marchează subiectul `[skip]` cu motivul și treci la următorul.

## 4. Plan, scriere, editare (`<slug>.html` în rădăcina repo-ului)
- Fă întâi planul: H1, caseta „Pe scurt”, 6–9 H2-uri formulate ca întrebările reale găsite la cercetare, unde intră tabelul și lista de verificare, ce întrebări intră la FAQ.
- Copiază EXACT structura unui articol existent (ex. `torturi-la-comanda-brasov.html`): același `<head>` (title ≤ 65 caractere cu cuvântul-cheie + „Brașov” unde e natural, meta description ≤ 160 de caractere care promite un răspuns concret, canonical, Open Graph), același header, același footer, `consent.js` + `script.js`.
- Româna corectă, naturală, cu diacritice (ș, ț cu virgulă), ton cald și practic, ca un meșter brutar care explică unui client. Fraze scurte, paragrafe de 2–4 rânduri, fără clișee de tip „în lumea de azi”, „nu este un secret că”, fără repetarea mecanică a cuvântului-cheie.
- Lungimea o dă subiectul: de regulă 1.400–2.200 de cuvinte. Mai bine 1.400 de cuvinte dense decât 2.200 cu umplutură.
- Structură AEO: breadcrumb, H1 cu cuvântul-cheie, caseta „Pe scurt” (2–3 propoziții care răspund complet la întrebarea principală, citabile singure), fiecare H2 începe cu un răspuns direct de 1–2 propoziții, apoi detaliile; cel puțin un tabel și o listă; 5–6 întrebări frecvente cu răspunsuri de 2–4 propoziții.
- GEO: caseta „Braldico pe scurt” identică cu celelalte articole; afirmații precise și verificabile (cifre, intervale, date); fapte despre Braldico DOAR din `facts.md`; afirmațiile generale importante au sursă (link extern cu `target="_blank" rel="noopener"`, 1–3 pe articol).
- Legătura cu Braldico se face natural, acolo unde chiar ajută cititorul (unde cumpără, cum comandă), nu în fiecare paragraf. Un singur bloc CTA la final.
- JSON-LD: Article (author/publisher Organization Braldico, datePublished = azi), FAQPage (aceleași întrebări ca pe pagină), BreadcrumbList.
- Linkuri interne: 3–5 către articole existente relevante (în text, nu doar la final) + pagina principală sau `pentru-firme.html`; secțiunea „Citește și”.
- INTERZIS: prețuri/nume de produse/gramaje Braldico care nu sunt în `facts.md`; afirmații medicale sau nutriționale fără sursă oficială (și niciodată sfaturi medicale); recenzii, clienți sau citate inventate; promisiuni de livrare/prețuri. Cantitățile orientative se marchează „orientativ”.
- EDITARE: după prima variantă, recitește articolul ca un editor exigent și rescrie: taie repetițiile și frazele goale, verifică fiecare afirmație față de `facts.md` sau sursa citată, verifică diacriticele și acordurile, asigură-te că fiecare secțiune răspunde la întrebarea din titlu.

## 5. Control de calitate (OBLIGATORIU — publici doar dacă trece tot)
Notează scorurile în `.seo/research/<slug>.md`. Fiecare criteriu de la 1 la 5; publici doar dacă TOATE sunt ≥ 4:
1. Răspunde complet și direct la intenția de căutare (caseta „Pe scurt” e suficientă singură).
2. Aduce ceva în plus față de primele rezultate Google (unghiul notat la cercetare).
3. Corectitudine: zero afirmații despre Braldico în afara `facts.md`; afirmațiile generale importante sunt susținute de surse bune.
4. Calitatea limbii: română naturală, corectă, fără clișee, fără umplutură, lizibilă pe telefon.
5. Utilitate practică: cititorul știe ce să facă după lectură (tabel, pași, listă de verificare).
6. Nu canibalizează un articol existent (subiect și cuvânt-cheie diferite; dacă se atinge un subiect vecin, trimite cu link la el).
Dacă un criteriu e sub 4: rescrie secțiunea și renotează (maximum 2 runde). Dacă tot nu trece, NU publica: păstrează draftul în `.seo/drafts/<slug>.html` (necomis), lasă subiectul `[todo]` și raportează de ce.

Verificări tehnice:
- Toate blocurile JSON-LD se parsează; FAQPage are exact întrebările de pe pagină.
- Toate linkurile `.html` interne duc la fișiere existente; linkurile externe răspund (HTTP 200/301).
- Title ≤ 65 de caractere, meta description ≤ 160; un singur H1; nu există text în engleză sau placeholder.
- Deschide pagina local (de ex. `python3 -m http.server` dintr-o copie în scratchpad) și verifică în browser că arată ca celelalte articole, pe desktop și la lățime de telefon (375px), fără elemente care ies din ecran.

## 6. Integrare (articolele rămân ASCUNSE din site)
- Adaugă un card în `articole.html` (aceeași structură `guide-card`).
- Adaugă URL-ul în `sitemap.xml` (lastmod = azi) și o linie în secțiunea „Pagini” din `llms.txt`.
- Adaugă un link „Citește și” către noul articol în 1–2 articole existente relevante.
- NU adăuga linkuri în meniu, pe pagina principală sau în footer.

- Marchează subiectul `[done]` în `topics.md` cu data.

## 7. Publicare
- `git add` DOAR fișierele atinse, inclusiv `.seo/research/<slug>.md` și `.seo/topics.md` (niciodată `git add -A`). Commit în engleză, cu ultima linie:
  `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`
- `git push`; așteaptă build-ul GitHub Pages (`gh api repos/flami69/braldico/pages/builds/latest`), apoi verifică HTTP 200 pentru noul URL.
- Trimite noul URL + `articole.html` + `sitemap.xml` la IndexNow (POST JSON către https://api.indexnow.org/indexnow și https://www.bing.com/indexnow):
  host `flami69.github.io`, key `ddbd97d4daad1db9caefacfb632537f6`, keyLocation `https://flami69.github.io/braldico/ddbd97d4daad1db9caefacfb632537f6.txt`.
- Dacă ceva eșuează, nu publica parțial; raportează problema.

## 8. Raport final (scurt)
Titlul, URL-ul, cuvântul-cheie, numărul de cuvinte, unghiul articolului (ce aduce în plus), scorurile de calitate, sursele externe folosite, statusul IndexNow și următorul subiect din coadă. Dacă nu s-a publicat, motivul.
