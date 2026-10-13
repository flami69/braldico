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

// Contact form: opens the visitor's email client (no server needed)
document.getElementById("contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const subject = encodeURIComponent(`Mesaj de la ${data.get("nume")}`);
  const body = encodeURIComponent(`${data.get("mesaj")}\n\n— ${data.get("nume")} (${data.get("email")})`);
  window.location.href = `mailto:contact@braldico.ro?subject=${subject}&body=${body}`;
});

document.getElementById("year").textContent = new Date().getFullYear();
