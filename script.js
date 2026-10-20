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

document.getElementById("year").textContent = new Date().getFullYear();
