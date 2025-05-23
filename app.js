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

    sections.forEach(sec => sec.style.display = "none");
    sections[i].style.display = "block";
  });
});
