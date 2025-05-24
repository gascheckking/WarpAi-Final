let walletConnected = false;

// Wallet Connect Toggle
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

// Tabs switching
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

// Settings toggle
const settingsBtn = document.getElementById("settingsBtn");
const settingsMenu = document.getElementById("settingsMenu");
settingsBtn.addEventListener("click", () => {
  const isVisible = settingsMenu.style.display === "block";
  settingsMenu.style.display = isVisible ? "none" : "block";
});
document.addEventListener("click", (e) => {
  if (!settingsBtn.contains(e.target) && !settingsMenu.contains(e.target)) {
    settingsMenu.style.display = "none";
  }
});

// Theme toggle with localStorage
const themeToggle = document.getElementById("toggleTheme");
if (localStorage.getItem("darkMode") === "false") {
  document.body.style.backgroundColor = "#ffffff";
  document.body.style.color = "#000000";
  themeToggle.checked = true;
}
themeToggle.addEventListener("change", (e) => {
  const isDark = !e.target.checked;
  if (isDark) {
    document.body.style.backgroundColor = "#0f1115";
    document.body.style.color = "#ffffff";
    localStorage.setItem("darkMode", "true");
  } else {
    document.body.style.backgroundColor = "#ffffff";
    document.body.style.color = "#000000";
    localStorage.setItem("darkMode", "false");
  }
});

// Onboarding animation
window.addEventListener("load", () => {
  const onboarding = document.getElementById("onboardingOverlay");
  setTimeout(() => {
    onboarding.classList.add("fade-out");
    setTimeout(() => {
      onboarding.style.display = "none";
    }, 1000);
  }, 3000);
});

// XP Journey fill (static for now)
document.addEventListener("DOMContentLoaded", () => {
  const fill = document.querySelector(".xp-fill");
  if (fill) fill.style.width = "87%";
});

// Info Modal for How to Earn
function toggleHowToEarn() {
  const modal = document.getElementById("earnExplanation");
  modal.classList.toggle("hidden");
}

// Referral and Share Buttons
function copyReferral() {
  const link = "https://warp-ai-final.vercel.app/?ref=yourUser123";
  navigator.clipboard.writeText(link);
  alert("Referral link copied!");
}
function shareOnX() {
  const text = encodeURIComponent("Track your wallet live with WarpAi! Get XP + WAI rewards:");
  const url = encodeURIComponent("https://warp-ai-final.vercel.app");
  window.open(`https://twitter.com/intent/tweet?text=${text}%20${url}`, "_blank");
}
function shareOnFarcaster() {
  alert("Farcaster share coming soon – stay tuned!");
}