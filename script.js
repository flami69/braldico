// Mobile menu
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");

toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});

links.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", false);
  })
);

// Quote request: builds a message and opens WhatsApp or email (no server needed)
const form = document.getElementById("contact-form");
if (form) {
  const dateInput = form.elements.data;
  const hint = document.getElementById("date-hint");
  const isoDate = (d) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  const daysFromToday = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return isoDate(d); };

  // Cakes need at least 2 days' notice
  const updateMinDate = () => {
    const cake = form.elements.tip.value === "Tort";
    dateInput.min = daysFromToday(cake ? 2 : 0);
    hint.hidden = !cake;
  };
  form.elements.tip.addEventListener("change", updateMinDate);
  updateMinDate();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const f = form.elements;
    const date = f.data.value ? f.data.value.split("-").reverse().join(".") : "";
    const lines = [
      "Bună ziua! Aș dori o ofertă:",
      `Nume: ${f.nume.value}`,
      `Telefon: ${f.telefon.value}`,
      `Comandă: ${f.tip.value}`,
      date && `Data dorită: ${date}`,
      f.persoane.value && `Nr. persoane: ${f.persoane.value}`,
      `Predare: ${f.predare.value}`,
      `Detalii: ${f.mesaj.value}`,
    ].filter(Boolean);
    const text = lines.join("\n");

    if (e.submitter?.dataset.send === "email") {
      const subject = `Cerere ofertă — ${f.tip.value} — ${f.nume.value}`;
      window.location.href = `mailto:office@braldico.ro?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    } else {
      window.open(`https://wa.me/40722498939?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    }
  });
}

// Business quote request: fields carry data-label; sent via WhatsApp or email
document.querySelectorAll(".quote-form").forEach((qf) =>
  qf.addEventListener("submit", (e) => {
    e.preventDefault();
    const lines = [`Bună ziua! ${qf.dataset.title}:`];
    qf.querySelectorAll("[data-label]").forEach((el) => {
      if (el.value.trim()) lines.push(`${el.dataset.label}: ${el.value.trim()}`);
    });
    const text = lines.join("\n");
    if (e.submitter?.dataset.send === "email") {
      const subject = `${qf.dataset.title} — ${qf.elements.firma?.value || ""}`;
      window.location.href = `mailto:office@braldico.ro?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    } else {
      window.open(`https://wa.me/40722498939?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    }
  })
);

// Newsletter: saves the email to Supabase (see supabase/schema.sql).
// The publishable/anon key is meant to be public; the table only allows inserts.
const SUPABASE_URL = "https://ecmerbkfcpwjeqjnmyqh.supabase.co";
const SUPABASE_KEY = "sb_publishable_MWLLvvuFmTpfZTTowqobaQ_NT5p7ufX";

const nl = document.getElementById("newsletter-form");
if (nl) {
  const status = nl.querySelector(".newsletter-status");
  const button = nl.querySelector("button");
  const show = (msg, ok) => {
    status.textContent = msg;
    status.className = `newsletter-status ${ok ? "ok" : "error"}`;
  };

  nl.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = nl.elements.email.value.trim();
    if (nl.elements.website.value) return; // honeypot: bots fill hidden fields
    if (!nl.elements.email.checkValidity() || !email) return show("Introdu o adresă de e-mail validă.");
    if (!nl.elements.consent.checked) return show("Bifează acordul pentru a te abona.");

    button.disabled = true;
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/newsletter_subscribers`, {
        method: "POST",
        headers: { apikey: SUPABASE_KEY, "Content-Type": "application/json", Prefer: "return=minimal" },
        body: JSON.stringify({ email, consent: true, source_page: location.pathname.split("/").pop() || "index.html" }),
      });
      if (res.ok || res.status === 409) {
        show(res.ok ? "Mulțumim! Te-ai abonat cu succes." : "Această adresă este deja abonată.", true);
        nl.reset();
      } else {
        throw new Error(res.status);
      }
    } catch {
      show("Nu am putut salva adresa. Încearcă din nou sau scrie-ne la office@braldico.ro.");
    } finally {
      button.disabled = false;
    }
  });
}

document.getElementById("year").textContent = new Date().getFullYear();
