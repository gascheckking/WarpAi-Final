
let currentAddress = '';

function switchTab(id) {
  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

async function connectWallet() {
  if (window.ethereum) {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    currentAddress = accounts[0];
    document.getElementById('walletAddress').innerText = currentAddress;
    loadActivity(currentAddress);
  } else {
    alert('MetaMask not detected');
  }
}

async function loadActivity(address) {
  const apiKey = 'Y1VRJKQB1A4K2JTA8GE1YDH3W54W4I35D5';
  const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  const list = document.getElementById('activityFeed');
  if (!data.result || data.result.length === 0) {
    list.innerHTML = '<li>No transactions found</li>';
    return;
  }
  list.innerHTML = '';
  data.result.slice(0, 10).forEach(tx => {
    const ether = (parseFloat(tx.value) / 1e18).toFixed(4);
    const dir = tx.to.toLowerCase() === address.toLowerCase() ? 'Received' : 'Sent';
    list.innerHTML += `<li>${dir} ${ether} ETH | ${tx.hash.slice(0, 10)}...</li>`;
  });
}
