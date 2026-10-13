// Cookie consent (Legea 506/2004, GDPR). Choice is kept in localStorage,
// which is strictly necessary to remember it. Google Maps loads only with consent.
(() => {
  const KEY = "braldico-consent-v1";
  const MAX_AGE = 1000 * 60 * 60 * 24 * 180; // re-ask after 6 months

  const read = () => {
    try {
      const c = JSON.parse(localStorage.getItem(KEY));
      if (c && Date.now() - c.date < MAX_AGE) return c;
    } catch (e) {}
    return null;
  };
  const save = (maps) => {
    const prev = read();
    const c = { maps, date: Date.now() };
    try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {}
    hide();
    if (maps) loadMaps();
    else if (prev && prev.maps) location.reload(); // remove already-loaded maps
  };

  function loadMaps() {
    document.querySelectorAll("[data-map-src]").forEach((box) => {
      const f = document.createElement("iframe");
      f.className = "map";
      f.src = box.dataset.mapSrc;
      f.title = box.dataset.mapTitle || "Hartă";
      f.loading = "lazy";
      f.referrerPolicy = "no-referrer-when-downgrade";
      box.replaceWith(f);
    });
  }

  const banner = document.createElement("div");
  banner.className = "cookie-banner";
  banner.setAttribute("role", "dialog");
  banner.setAttribute("aria-label", "Setări cookie");
  banner.hidden = true;
  banner.innerHTML = `
    <div class="cookie-inner">
      <h2>Folosim cookie-uri</h2>
      <p>Folosim doar ce este strict necesar pentru funcționarea site-ului. Cu acordul tău, afișăm și harta Google Maps, care poate seta cookie-uri proprii. Detalii în <a href="politica-cookies.html">Politica de cookie-uri</a> și <a href="politica-de-confidentialitate.html">Politica de confidențialitate</a>.</p>
      <div class="cookie-prefs" hidden>
        <label class="cookie-opt">
          <input type="checkbox" checked disabled>
          <span><strong>Strict necesare</strong> — memorează alegerea ta privind cookie-urile. Mereu active.</span>
        </label>
        <label class="cookie-opt">
          <input type="checkbox" id="cookie-maps">
          <span><strong>Hărți (Google Maps)</strong> — afișează harta cu locația noastră. Google poate seta cookie-uri și poate prelua adresa IP.</span>
        </label>
      </div>
      <div class="cookie-actions">
        <button type="button" class="btn btn-small" data-c="all">Accept toate</button>
        <button type="button" class="btn btn-small" data-c="none">Doar necesare</button>
        <button type="button" class="btn btn-small btn-outline" data-c="custom">Personalizează</button>
        <button type="button" class="btn btn-small" data-c="save" hidden>Salvează alegerea</button>
      </div>
    </div>`;

  const prefs = banner.querySelector(".cookie-prefs");
  const mapsBox = banner.querySelector("#cookie-maps");
  const btn = (k) => banner.querySelector(`[data-c="${k}"]`);

  function show(withPrefs) {
    const c = read();
    mapsBox.checked = !!(c && c.maps);
    prefs.hidden = !withPrefs;
    btn("save").hidden = !withPrefs;
    btn("custom").hidden = withPrefs;
    banner.hidden = false;
  }
  function hide() { banner.hidden = true; }

  btn("all").onclick = () => save(true);
  btn("none").onclick = () => save(false);
  btn("custom").onclick = () => show(true);
  btn("save").onclick = () => save(mapsBox.checked);

  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-cookie-settings]")) { e.preventDefault(); show(true); }
    if (e.target.closest("[data-load-map]")) save(true);
  });

  document.body.appendChild(banner);
  const c = read();
  if (!c) show(false);
  else if (c.maps) loadMaps();
})();
