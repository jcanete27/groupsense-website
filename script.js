"use strict";

// EDIT THESE VALUES BEFORE PUBLISHING.
// Use your PUBLIC GitHub release asset URL. Keep the APK filename consistent.
const APP_CONFIG = {
  downloadUrl: "https://github.com/jcanete27/groupsense-downloads/releases/latest/download/GroupSense.apk", // Example: https://github.com/YOUR_USERNAME/groupsense-downloads/releases/latest/download/GroupSense.apk
  version: "1.0.0",     // Optional: enter the actual release version, e.g. "1.0.0".
  fileSize: "79 MB",    // Optional: enter the actual APK size, e.g. "45 MB".
  supportEmail: "jcanet@groupsense.com" // Optional: enter your real support email address.
};

document.documentElement.classList.add("js");

// Mobile navigation. The links remain visible when JavaScript is unavailable.
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#navigation");
const mobileViewport = window.matchMedia("(max-width: 720px)");

function closeMenu(returnFocus = false) {
  navigation.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.textContent = "Menu";
  if (returnFocus) menuButton.focus();
}

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.textContent = isOpen ? "Close" : "Menu";
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => closeMenu());
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navigation.classList.contains("is-open")) closeMenu(true);
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".site-header")) closeMenu();
});

mobileViewport.addEventListener("change", () => closeMenu());

// Enable downloads only after a real HTTPS URL has been supplied.
const downloadButton = document.querySelector("#apk-download");
const releaseInfo = document.querySelector("#release-info");
let downloadUrl;

try {
  const candidate = new URL(APP_CONFIG.downloadUrl.trim());
  if (candidate.protocol === "https:" && !candidate.username && !candidate.password &&
      !candidate.href.includes("YOUR_USERNAME")) downloadUrl = candidate;
} catch {
  // Keep the honest "coming soon" state when the URL has not been configured.
}

if (downloadUrl) {
  downloadButton.href = downloadUrl.href;
  downloadButton.textContent = "Download Android APK ↓";
  downloadButton.removeAttribute("aria-disabled");
  downloadButton.removeAttribute("tabindex");
  releaseInfo.textContent = [
    "Android APK",
    APP_CONFIG.version ? `Version ${APP_CONFIG.version}` : "",
    APP_CONFIG.fileSize
  ].filter(Boolean).join(" · ");
}

// Open the installation instructions when the corresponding link is selected.
document.querySelector(".installation-link").addEventListener("click", () => {
  document.querySelector("#installation").open = true;
});
if (window.location.hash === "#installation") document.querySelector("#installation").open = true;

const contactLink = document.querySelector("#contact-link");
const supportEmail = APP_CONFIG.supportEmail.trim();
if (/^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(supportEmail)) {
  contactLink.href = `mailto:${supportEmail}`;
  contactLink.hidden = false;
}

document.querySelector("#year").textContent = new Date().getFullYear();
