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

// Tab Switching
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

// Settings Menu Toggle
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

// Dark Mode Toggle
document.getElementById("toggleTheme").addEventListener("change", (e) => {
  if (e.target.checked) {
    document.body.style.backgroundColor = "#ffffff";
    document.body.style.color = "#000000";
  } else {
    document.body.style.backgroundColor = "#0f1115";
    document.body.style.color = "#ffffff";
  }
});

// Onboarding Animation
window.addEventListener("load", () => {
  const onboarding = document.getElementById("onboardingOverlay");
  setTimeout(() => {
    onboarding.classList.add("fade-out");
    setTimeout(() => {
      onboarding.style.display = "none";
    }, 1000); // Match fadeOut duration
  }, 3000);
});

// Modal Toggles
function toggleHowToEarn() {
  document.getElementById("earnExplanation").classList.toggle("hidden");
}

function toggleFAQ() {
  document.getElementById("faqModal").classList.toggle("hidden");
}

// Referral Functions
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

// Surprise Bonus Toast
window.addEventListener("load", () => {
  const toast = document.createElement("div");
  toast.textContent = "Bonus unlocked! Check the rewards tab.";
  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.background = "#4caf50";
  toast.style.color = "#fff";
  toast.style.padding = "0.8rem 1.2rem";
  toast.style.borderRadius = "10px";
  toast.style.boxShadow = "0 0 10px #000";
  toast.style.zIndex = "10000";
  toast.style.opacity = "0";
  toast.style.transition = "opacity 0.5s ease-in-out";

  document.body.appendChild(toast);
  setTimeout(() => (toast.style.opacity = "1"), 1000);
  setTimeout(() => (toast.style.opacity = "0"), 4000);
});