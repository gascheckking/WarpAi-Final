let provider = null;
let signer = null;
let userAddress = null;

const ALCHEMY_KEY = document.querySelector('meta[name="alchemy-key"]').content;
const ETHERSCAN_KEY = document.querySelector('meta[name="etherscan-key"]').content;

document.addEventListener('DOMContentLoaded', () => {
  const onboardingOverlay = document.getElementById('onboardingOverlay');
  const appContent = document.getElementById('appContent');
  const qrModal = document.getElementById('qrModal');
  const qrCodeDiv = document.getElementById('qrCode');
  const connectWalletBtn = document.getElementById('connectWallet');
  const xpDisplay = document.getElementById('xpDisplay');
  const walletAddress = document.getElementById('walletAddress');
  const totalXP = document.getElementById('totalXP');
  const currentXP = document.getElementById('currentXP');
  const claimXpBtn = document.getElementById('claimXpBtn');
  const buyTokenBtn = document.getElementById('buyTokenBtn');
  const copyReferralBtn = document.getElementById('copyReferralBtn');
  const shareOnXBtn = document.getElementById('shareOnXBtn');
  const shareOnFarcasterBtn = document.getElementById('shareOnFarcasterBtn');
  const upgradeBtn = document.getElementById('upgradeBtn');
  const claimTokenBtn = document.getElementById('claimTokenBtn');
  const waiBalance = document.getElementById('waiBalance');
  const claimHistory = document.getElementById('claimHistory');
  const latestActivity = document.getElementById('latestActivity');
  const activityResult = document.getElementById('activityResult');
  const tokensMinted = document.getElementById('tokensMinted');
  const ethMoved = document.getElementById('ethMoved');
  const gasSpent = document.getElementById('gasSpent');
  const connectedDapps = document.getElementById('connectedDapps');
  setTimeout(() => {
  onboardingOverlay.classList.add('fade-out-logo');
  setTimeout(() => {
    onboardingOverlay.style.display = 'none';
    appContent.style.display = 'block';
  }, 500);
}, 2000);


  // Visa onboarding och dölj efter 2 sekunder
  setTimeout(() => {
    onboardingOverlay.classList.add('fade-out-logo');
    setTimeout(() => {
      onboardingOverlay.style.display = 'none';
      appContent.style.display = 'block';
    }, 500);
  }, 2000);

  // Tab-hantering
  document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(content => content.style.display = 'none');
      button.classList.add('active');
      document.querySelector(`.tab-content[data-tab="${button.dataset.tab}"]`).style.display = 'block';
    });
  });

  // Connect-knapp
  if (connectWalletBtn) {
    connectWalletBtn.addEventListener('click', async () => {
      if (userAddress) {
        disconnectWallet();
        return;
      }
      await connectWithWalletConnect();
    });
  }

  // Disconnect-funktion
  function disconnectWallet() {
    if (provider && provider.disconnect) provider.disconnect();
    provider = null;
    signer = null;
    userAddress = null;
    if (connectWalletBtn) connectWalletBtn.textContent = 'Connect Wallet';
    if (walletAddress) walletAddress.textContent = 'Not Connected';
    if (xpDisplay) xpDisplay.textContent = '0 XP 🔥';
    if (totalXP) totalXP.textContent = '0';
    if (currentXP) currentXP.textContent = '🔥 0 XP';
    localStorage.clear();
  }

  // Connect-funktion med WalletConnect v2
  async function connectWithWalletConnect() {
    try {
      const walletConnectProvider = new window.WalletConnectProvider({
  projectId: 'c0aa1ca206eb7d58226102b102ec49e9',
  chains: [8453],
  rpcMap: {
    8453: `https://base-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`
  }
});

      walletConnectProvider.on('display_uri', (uri) => {
        if (/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)) {
          setTimeout(() => {
            window.open(`https://link.trustwallet.com/wc?uri=${encodeURIComponent(uri)}`, '_blank');
          }, 500);
          return;
        }

        if (qrCodeDiv) {
          qrCodeDiv.innerHTML = '';
          new QRCode(qrCodeDiv, { text: uri, width: 200, height: 200 });
          qrModal.classList.remove('hidden');
        }
      });

      await walletConnectProvider.enable();
      provider = new ethers.providers.Web3Provider(walletConnectProvider);
      signer = provider.getSigner();
      userAddress = await signer.getAddress();

      if (connectWalletBtn) connectWalletBtn.textContent = 'Disconnect';
      if (walletAddress) walletAddress.textContent = `${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`;

      loadOnchainData();
      if (qrModal) qrModal.classList.add('hidden');
    } catch (error) {
      console.error('WalletConnect failed:', error);
      alert('Failed to connect wallet: ' + error.message);
    }
  }

  // Hämta onchain-data
  async function loadOnchainData() {
    if (!provider || !userAddress) return;
    try {
      const alchemyProvider = new ethers.providers.AlchemyProvider('base', ALCHEMY_KEY);
      const balance = await alchemyProvider.getBalance(userAddress);
      const txCount = await alchemyProvider.getTransactionCount(userAddress);
      const xp = txCount * 10;
      if (currentXP) currentXP.textContent = `🔥 ${xp} XP`;
      if (totalXP) totalXP.textContent = xp;
      if (xpDisplay) xpDisplay.textContent = `${xp} XP 🔥`;
      const progressPercent = Math.min((xp / 200) * 100, 100);
      const xpFill = document.querySelector('.xp-fill');
      if (xpFill) xpFill.style.width = `${progressPercent}%`;

      if (latestActivity && activityResult) {
        const block = await alchemyProvider.getBlockNumber();
        const txs = await alchemyProvider.getHistory(userAddress, block - 1000, block);
        if (txs.length > 0) {
          const last = txs[txs.length - 1];
          const ethValue = ethers.utils.formatEther(last.value || 0);
          latestActivity.textContent = `↪ ${last.to.slice(0, 6)}... — ${ethValue} ETH`;
          activityResult.textContent = `+ $${(ethValue * 3000).toFixed(2)} est.`;
        } else {
          latestActivity.textContent = `No recent tx`;
          activityResult.textContent = `+ $0`;
        }
      }
    } catch (error) {
      console.error('Error fetching onchain data:', error);
    }
  }

  // XP-Claim
  if (claimXpBtn) {
    claimXpBtn.addEventListener('click', () => {
      let xp = parseInt(totalXP.textContent) || 0;
      xp += 10;
      currentXP.textContent = `🔥 ${xp} XP`;
      totalXP.textContent = xp;
      xpDisplay.textContent = `${xp} XP 🔥`;
      const progressPercent = Math.min((xp / 200) * 100, 100);
      const xpFill = document.querySelector('.xp-fill');
      if (xpFill) xpFill.style.width = `${progressPercent}%`;
      alert('Claimed 10 XP!');
    });
  }

  // Token claim
  if (claimTokenBtn) {
    claimTokenBtn.addEventListener('click', () => {
      let balance = parseFloat(waiBalance.textContent.match(/\d+\.\d+/)?.[0]) || 0;
      balance += 5;
      waiBalance.textContent = `Balance: ${balance.toFixed(2)} WAI`;
      let history = claimHistory.innerHTML;
      claimHistory.innerHTML = `<li>+5 WAI – claimed token</li>${history}`;

      const claimedPopup = document.createElement('div');
      claimedPopup.textContent = '🎉 5 WAI Claimed!';
      claimedPopup.style.position = 'fixed';
      claimedPopup.style.top = '40%';
      claimedPopup.style.left = '50%';
      claimedPopup.style.transform = 'translate(-50%, -50%)';
      claimedPopup.style.background = '#333';
      claimedPopup.style.color = '#fff';
      claimedPopup.style.padding = '1rem 2rem';
      claimedPopup.style.borderRadius = '10px';
      claimedPopup.style.fontSize = '1.2rem';
      claimedPopup.style.zIndex = '9999';
      document.body.appendChild(claimedPopup);
      setTimeout(() => claimedPopup.remove(), 2000);
    });
  }

  // Kopiera länk
  if (copyReferralBtn) {
    copyReferralBtn.addEventListener('click', () => {
      const referralLink = userAddress ? `https://warpai.com/referral/${userAddress}` : 'https://warpai.com';
      navigator.clipboard.writeText(referralLink);
      const toast = document.createElement('div');
      toast.textContent = '✅ Copied';
      toast.style.position = 'fixed';
      toast.style.bottom = '1rem';
      toast.style.right = '1rem';
      toast.style.background = '#4caf50';
      toast.style.color = '#fff';
      toast.style.padding = '0.5rem 1rem';
      toast.style.borderRadius = '6px';
      toast.style.zIndex = '9999';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 2000);
    });
  }

  // Delning
  if (shareOnXBtn) {
    shareOnXBtn.addEventListener('click', () => {
      const referralLink = userAddress ? `https://warpai.com/referral/${userAddress}` : 'https://warpai.com';
      window.open(`https://twitter.com/intent/tweet?text=Check out WarpAi! ${referralLink} @YOUR_X_USERNAME`, '_blank');
    });
  }
  if (shareOnFarcasterBtn) {
    shareOnFarcasterBtn.addEventListener('click', () => {
      const referralLink = userAddress ? `https://warpai.com/referral/${userAddress}` : 'https://warpai.com';
      window.open(`https://warpcast.com/~/compose?text=Check out WarpAi! ${referralLink}`, '_blank');
    });
  }

  // Köp-knapp
  if (buyTokenBtn) buyTokenBtn.addEventListener('click', () => alert('Token buy logic here'));
  if (upgradeBtn) upgradeBtn.addEventListener('click', () => alert('Upgrade to Premium for $5'));

  // Modal-stängning
  window.closeQrModal = () => qrModal.classList.add('hidden');
  window.toggleFAQ = () => document.getElementById('faqModal').classList.toggle('hidden');
  window.toggleXpInfo = () => document.getElementById('xpInfoModal').classList.toggle('hidden');
  window.toggleWarpInfo = () => document.getElementById('warpInfoModal').classList.toggle('hidden');
});

// ------------------ WAI CLAIM NOTIFICATION ------------------

function showWaiClaimedMessage() {
  const msg = document.createElement('div');
  msg.textContent = '✅ You claimed 5 WAI!';
  msg.style.position = 'fixed';
  msg.style.top = '20%';
  msg.style.left = '50%';
  msg.style.transform = 'translate(-50%, -50%)';
  msg.style.background = '#2c9463';
  msg.style.color = '#fff';
  msg.style.padding = '1rem 2rem';
  msg.style.borderRadius = '10px';
  msg.style.fontSize = '1.2rem';
  msg.style.fontWeight = 'bold';
  msg.style.zIndex = '9999';
  msg.style.boxShadow = '0 0 10px #000';
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 2000);
}

// ------------------ SIMPLE CONFETTI EFFECT ------------------

function showConfetti() {
  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = '8px';
    confetti.style.height = '8px';
    confetti.style.background = `hsl(${Math.random() * 360}, 100%, 60%)`;
    confetti.style.top = `${Math.random() * 20 + 10}%`;
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.borderRadius = '50%';
    confetti.style.opacity = '0.8';
    confetti.style.zIndex = '9999';
    confetti.style.transition = 'transform 1.5s ease-out, opacity 1.5s ease-out';
    document.body.appendChild(confetti);
    requestAnimationFrame(() => {
      confetti.style.transform = `translateY(${Math.random() * 100 + 100}px) rotate(${Math.random() * 360}deg)`;
      confetti.style.opacity = '0';
    });
    setTimeout(() => confetti.remove(), 2000);
  }
}

// Använd dessa två funktioner såhär i din claimTokenBtn-händelse:
if (claimTokenBtn) {
  claimTokenBtn.addEventListener('click', () => {
    // ...din vanliga kod här
    showWaiClaimedMessage();
    showConfetti();
  });
}
