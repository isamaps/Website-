const BUSINESS_EMAIL = "projects@maisahbateman.com";

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.querySelector("span").textContent = isOpen ? "−" : "＋";
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.querySelector("span").textContent = "＋";
  });
});

const contactForm = document.querySelector("#contact-form");
if (contactForm) contactForm.addEventListener("submit", event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const name = form.get("name");
  const email = form.get("email");
  const message = form.get("message");

  const status = document.querySelector("#form-status");
  if (BUSINESS_EMAIL === "your-email@example.com") {
    status.textContent = "The contact form is not live yet. Please check back soon.";
    return;
  }
  status.textContent = "Opening your email app...";

  const subject = encodeURIComponent(`Website inquiry from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nProject details:\n${message}`);
  window.location.href = `mailto:${BUSINESS_EMAIL}?subject=${subject}&body=${body}`;
});
