let currentAddress = '';

function switchTab(tabId) {
  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
}

document.getElementById("connectWallet").addEventListener("click", async () => {
  if (window.ethereum) {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    currentAddress = accounts[0];
    document.getElementById("walletAddress").innerText = currentAddress;
    document.getElementById("connectWallet").style.display = "none";
    loadActivity(currentAddress);
    document.getElementById("xpDisplay").innerText = "180 XP 🔥";
  } else {
    alert("MetaMask not found.");
  }
});

async function loadActivity(address) {
  const apiKey = "Y1VRJKQB1A4K2JTA8GE1YDH3W54W4I35D5"; // Use from .env in backend for security
  const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  const feed = document.getElementById("activityFeed");

  if (!data.result || data.result.length === 0) {
    feed.innerHTML = "<li>No transactions found.</li>";
    return;
  }

  feed.innerHTML = '';
  data.result.slice(0, 10).forEach(tx => {
    const ether = (parseFloat(tx.value) / 1e18).toFixed(4);
    const direction = tx.to.toLowerCase() === address.toLowerCase() ? "⬅️ Received" : "➡️ Sent";
    feed.innerHTML += `<li>${direction} ${ether} ETH<br/><small>${tx.hash.slice(0, 10)}...</small></li>`;
  });
}
