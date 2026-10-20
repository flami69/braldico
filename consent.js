// Cookie consent (Legea 506/2004, GDPR). Choice is kept in localStorage,
// which is strictly necessary to remember it. Google Maps and Google Analytics
// load only with consent.

// Google Analytics 4 — paste your Measurement ID here (e.g. "G-XXXXXXXXXX").
// While empty, Analytics never loads.
const GA_MEASUREMENT_ID = "";

(() => {
  const KEY = "braldico-consent-v2";
  const MAX_AGE = 1000 * 60 * 60 * 24 * 180; // re-ask after 6 months

  const read = () => {
    try {
      const c = JSON.parse(localStorage.getItem(KEY));
      if (c && Date.now() - c.date < MAX_AGE) return c;
    } catch (e) {}
    return null;
  };
  const save = (maps, analytics) => {
    const prev = read();
    const c = { maps, analytics, date: Date.now() };
    try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {}
    hide();
    apply(c);
    const withdrawn = prev && ((prev.maps && !maps) || (prev.analytics && !analytics));
    if (withdrawn) { deleteGaCookies(); location.reload(); }
  };

  function apply(c) {
    if (c.maps) loadMaps();
    if (c.analytics) loadAnalytics();
  }

  // ---- Google Analytics (GA4) ----
  let gaLoaded = false;
  function loadAnalytics() {
    if (gaLoaded || !GA_MEASUREMENT_ID) return;
    gaLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag("consent", "default", {
      analytics_storage: "granted",
      ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied",
    });
    gtag("js", new Date());
    gtag("config", GA_MEASUREMENT_ID);
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_MEASUREMENT_ID;
    document.head.appendChild(s);
  }
  const track = (name, params) => { if (gaLoaded) gtag("event", name, params); };

  function deleteGaCookies() {
    const host = location.hostname;
    const domains = ["", host, "." + host, "." + host.split(".").slice(-2).join(".")];
    document.cookie.split(";").map((x) => x.split("=")[0].trim())
      .filter((n) => n.startsWith("_ga") || n === "_gid")
      .forEach((n) => domains.forEach((d) => {
        document.cookie = `${n}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d ? "; domain=" + d : ""}`;
      }));
  }

  // Useful events for a bakery: calls, emails, directions, contact form
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    const href = a.getAttribute("href") || "";
    if (href.startsWith("tel:")) track("click_telefon", { numar: href.slice(4) });
    else if (href.includes("wa.me/")) track("click_whatsapp", { sectiune: a.closest("section, .mobile-cta")?.id || a.closest(".mobile-cta") && "bara_mobil" || "" });
    else if (href.startsWith("mailto:")) track("click_email", {});
    else if (href.includes("google.com/maps")) track("click_harta", { locatie: a.closest(".store")?.querySelector("h3")?.textContent || "contact" });
  });
  document.getElementById("contact-form")?.addEventListener("submit", (e) =>
    track("trimitere_formular", { canal: e.submitter?.dataset.send || "whatsapp", tip: e.target.elements.tip?.value }));

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
      <p>Folosim cookie-uri strict necesare pentru funcționarea site-ului. Cu acordul tău, folosim și Google Analytics, ca să înțelegem cum este folosit site-ul, și afișăm harta Google Maps. Detalii în <a href="politica-cookies.html">Politica de cookie-uri</a> și <a href="politica-de-confidentialitate.html">Politica de confidențialitate</a>.</p>
      <div class="cookie-prefs" hidden>
        <label class="cookie-opt">
          <input type="checkbox" checked disabled>
          <span><strong>Strict necesare</strong> — memorează alegerea ta privind cookie-urile. Mereu active.</span>
        </label>
        <label class="cookie-opt">
          <input type="checkbox" id="cookie-analytics">
          <span><strong>Statistici (Google Analytics)</strong> — ne ajută să vedem câte persoane vizitează site-ul și ce pagini sunt utile, prin date agregate. Google setează cookie-uri și preia adresa IP.</span>
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
  const gaBox = banner.querySelector("#cookie-analytics");
  const btn = (k) => banner.querySelector(`[data-c="${k}"]`);

  function show(withPrefs) {
    const c = read();
    mapsBox.checked = !!(c && c.maps);
    gaBox.checked = !!(c && c.analytics);
    prefs.hidden = !withPrefs;
    btn("save").hidden = !withPrefs;
    btn("custom").hidden = withPrefs;
    banner.hidden = false;
  }
  function hide() { banner.hidden = true; }

  btn("all").onclick = () => save(true, true);
  btn("none").onclick = () => save(false, false);
  btn("custom").onclick = () => show(true);
  btn("save").onclick = () => save(mapsBox.checked, gaBox.checked);

  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-cookie-settings]")) { e.preventDefault(); show(true); }
    if (e.target.closest("[data-load-map]")) { const c = read(); save(true, !!(c && c.analytics)); }
  });

  document.body.appendChild(banner);
  const c = read();
  if (!c) show(false);
  else apply(c);
})();
