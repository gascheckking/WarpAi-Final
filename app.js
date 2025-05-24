let walletConnected = false;

document.getElementById("connectWallet").addEventListener("click", () => {
  walletConnected = !walletConnected;

  const button = document.getElementById("connectWallet");
  const xpDisplay = document.getElementById("xpDisplay");

  if (walletConnected) {
    button.textContent = "Connected";
    xpDisplay.textContent = "🔥 87 XP";
  } else {
    button.textContent = "Connect Wallet";
    xpDisplay.textContent = "0 XP 🔥";
  }
});

// Tab switching
const tabs = document.querySelectorAll(".tab-button");
const sections = document.querySelectorAll(".tab-content");

tabs.forEach((tab, i) => {
  tab.addEventListener("click", () => {
    tabs.forEach(btn => btn.classList.remove("active"));
    tab.classList.add("active");

    sections.forEach(sec => (sec.style.display = "none"));
    sections[i].style.display = "block";
  });
});

// Settings toggle
const settingsBtn = document.getElementById("settingsBtn");
const settingsMenu = document.getElementById("settingsMenu");

settingsBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  const isVisible = settingsMenu.style.display === "block";
  settingsMenu.style.display = isVisible ? "none" : "block";
});

// Auto-close settings menu when clicking outside
document.addEventListener("click", (e) => {
  if (!settingsMenu.contains(e.target) && e.target !== settingsBtn) {
    settingsMenu.style.display = "none";
  }
});

// Dark Mode toggle
document.getElementById("toggleTheme").addEventListener("change", (e) => {
  if (e.target.checked) {
    document.body.style.backgroundColor = "#ffffff";
    document.body.style.color = "#000000";
  } else {
    document.body.style.backgroundColor = "#0f1115";
    document.body.style.color = "#ffffff";
  }
});
// Onboarding screen
window.addEventListener("load", () => {
  setTimeout(() => {
    const overlay = document.getElementById("onboardingOverlay");
    overlay.classList.add("hidden");
  }, 1500);
});