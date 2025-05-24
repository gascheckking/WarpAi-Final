let walletConnected = false;

// Wallet Connect Button Toggle
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

// Tab switching logic
const tabs = document.querySelectorAll(".tab-button");
const sections = document.querySelectorAll(".tab-content");

tabs.forEach((tab, i) => {
  tab.addEventListener("click", () => {
    tabs.forEach(btn => btn.classList.remove("active"));
    tab.classList.add("active");

    sections.forEach(sec => sec.style.display = "none");
    sections[i].style.display = "block";
  });
});

// Settings dropdown toggle
const settingsBtn = document.getElementById("settingsBtn");
const settingsMenu = document.getElementById("settingsMenu");

settingsBtn.addEventListener("click", () => {
  const isVisible = settingsMenu.style.display === "block";
  settingsMenu.style.display = isVisible ? "none" : "block";
});

// Hide settings menu if clicking outside
document.addEventListener("click", (e) => {
  if (!settingsBtn.contains(e.target) && !settingsMenu.contains(e.target)) {
    settingsMenu.style.display = "none";
  }
});

// Dark mode toggle
document.getElementById("toggleTheme").addEventListener("change", (e) => {
  if (e.target.checked) {
    document.body.style.backgroundColor = "#ffffff";
    document.body.style.color = "#000000";
  } else {
    document.body.style.backgroundColor = "#0f1115";
    document.body.style.color = "#ffffff";
  }
});

// Onboarding fade-out logic
setTimeout(() => {
  const onboarding = document.getElementById("onboardingOverlay");
  onboarding.classList.add("fade-out");

  setTimeout(() => {
    onboarding.style.display = "none";
  }, 800); // Matches CSS fade-out time
}, 2000); // Initial delay before fade out starts