const root = document.documentElement;
const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const themeButton = document.querySelector(".theme-toggle");
const toast = document.querySelector(".toast");

const setThemeButtonLabel = () => {
  const isDark = root.dataset.theme === "dark";
  themeButton.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} theme`);
};

setThemeButtonLabel();

themeButton.addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("portfolio-theme", root.dataset.theme);
  setThemeButtonLabel();
});

menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  navLinks.classList.toggle("open", !open);
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("open");
  });
});

document.addEventListener("click", (event) => {
  if (!navLinks.contains(event.target) && !menuButton.contains(event.target)) {
    menuButton.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("open");
  }
});

window.addEventListener(
  "scroll",
  () => header.classList.toggle("scrolled", window.scrollY > 10),
  { passive: true }
);

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      document.querySelectorAll(".nav-links a").forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-35% 0px -55%", threshold: 0 }
);

document.querySelectorAll("main section[id]").forEach((section) => sectionObserver.observe(section));

let toastTimer;
const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 2400);
};

document.querySelector("[data-copy]").addEventListener("click", async (event) => {
  const button = event.currentTarget;
  try {
    await navigator.clipboard.writeText(button.dataset.copy);
    button.querySelector("span").textContent = "Copied";
    showToast("Email copied to clipboard");
    setTimeout(() => (button.querySelector("span").textContent = "Copy email"), 2000);
  } catch {
    showToast("Copy failed — select the email address instead");
  }
});

document.querySelectorAll("[data-placeholder-link]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    showToast("Add your profile URL in index.html");
  });
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
