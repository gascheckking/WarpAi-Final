let walletConnected = false;

document.getElementById("connectWallet").addEventListener("click", () => {
  walletConnected = !walletConnected;

  const button = document.getElementById("connectWallet");
  const xpDisplay = document.getElementById("xpDisplay");

  if (walletConnected) {
    button.textContent = "Wallet Connected";
    xpDisplay.textContent = "🔥 87 XP";
  } else {
    button.textContent = "Connect Wallet";
    xpDisplay.textContent = "0 XP 🔥";
  }
});

// Tab switching (if needed for later)
document.querySelectorAll(".tab-button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const tab = btn.getAttribute("data-tab");

    document.querySelectorAll(".tab").forEach((s) => s.classList.remove("active"));
    document.getElementById(tab).classList.add("active");

    document.querySelectorAll(".tab-button").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});
