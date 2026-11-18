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

const FORM_ENDPOINT = "https://formsubmit.co/ajax/" + BUSINESS_EMAIL;
const proposalForm = document.querySelector("#proposal-form");
if (proposalForm) proposalForm.addEventListener("submit", async event => {
  event.preventDefault();
  const status = document.querySelector("#proposal-status");
  const button = proposalForm.querySelector("button");
  const data = Object.fromEntries(new FormData(proposalForm));
  if (data._honey) { status.textContent = "Thank you. Your proposal was sent."; return; }
  delete data._honey;
  data._subject = "New work proposal from " + (data.name || "your website");
  data._template = "table";
  data._captcha = "false";
  button.disabled = true;
  status.textContent = "Sending...";
  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(data)
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.success === "false" || result.success === false) throw new Error("send failed");
    proposalForm.reset();
    status.textContent = "Thank you. Your proposal was sent, and I will be in touch soon.";
  } catch (error) {
    status.textContent = "Something went wrong. Please email " + BUSINESS_EMAIL + " directly.";
  } finally {
    button.disabled = false;
  }
});
