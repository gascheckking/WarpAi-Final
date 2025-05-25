let walletConnected = false;

// Wallet Connect Button Toggle
document.getElementById("connectWallet").addEventListener("click", async () => {
  walletConnected = !walletConnected;
  const button = document.getElementById("connectWallet");
  const xpDisplay = document.getElementById("xpDisplay");

  if (walletConnected) {
    try {
      // Modern dApp browsers
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        button.textContent = "Connected";
        xpDisplay.textContent = "🔥 87 XP";
      } else {
        alert("MetaMask or WalletConnect not found.");
        walletConnected = false;
      }
    } catch (err) {
      console.error("Wallet connection error:", err);
      walletConnected = false;
    }
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

// Onboarding animation delay
window.addEventListener("load", () => {
  const onboarding = document.getElementById("onboardingOverlay");

  setTimeout(() => {
    onboarding.classList.add("fade-out");
    setTimeout(() => {
      onboarding.style.display = "none";
    }, 1000);
  }, 3000);
});

// Referral link + share buttons
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

// FAQ toggle
function toggleFAQ() {
  document.getElementById("faqModal").classList.toggle("hidden");
}

// XP Info toggle
function toggleXpInfo() {
  document.getElementById("xpInfoModal").classList.toggle("hidden");
}

// Earn XP modal toggle (if used)
function toggleHowToEarn() {
  const modal = document.getElementById("earnExplanation");
  if (modal) {
    modal.classList.toggle("hidden");
  }
}
