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

// Tabs
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

// Settings Menu
const settingsBtn = document.getElementById("settingsBtn");
const settingsMenu = document.getElementById("settingsMenu");

settingsBtn.addEventListener("click", () => {
  settingsMenu.style.display =
    settingsMenu.style.display === "block" ? "none" : "block";
});

// Hide Settings Menu If Clicked Outside
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

// Onboarding Delay (fixed fade-out!)
window.addEventListener("load", () => {
  const overlay = document.getElementById("onboardingOverlay");
  setTimeout(() => {
    overlay.classList.add("fade-out");
    setTimeout(() => {
      overlay.style.display = "none";
    }, 1000);
  }, 2500);
});

// Referral Links
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

// Modal Toggles
function toggleHowToEarn() {
  const modal = document.getElementById("earnExplanation");
  modal.classList.toggle("hidden");
}

function toggleFAQ() {
  const modal = document.getElementById("faqModal");
  modal.classList.toggle("hidden");
}