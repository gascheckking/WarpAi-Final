let provider = null;
let signer = null;
let userAddress = null;

document.addEventListener('DOMContentLoaded', () => {
  const ALCHEMY_KEY = document.querySelector('meta[name="alchemy-key"]')?.content;
  const ETHERSCAN_KEY = document.querySelector('meta[name="etherscan-key"]')?.content;

  const onboardingOverlay = document.getElementById('onboardingOverlay');
  const appContent = document.getElementById('appContent');

  // Visa app efter onboarding
  if (onboardingOverlay && appContent) {
    setTimeout(() => {
      onboardingOverlay.classList.add('fade-out-logo');
      setTimeout(() => {
        onboardingOverlay.style.display = 'none';
        appContent.style.display = 'block';
      }, 500);
    }, 2000);
  }

  // Tabbar
  document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(content => content.style.display = 'none');
      button.classList.add('active');
      const targetTab = document.querySelector(`.tab-content[data-tab="${button.dataset.tab}"]`);
      if (targetTab) targetTab.style.display = 'block';
    });
  });

  const connectWalletBtn = document.getElementById('connectWallet');
  const walletAddress = document.getElementById('walletAddress');
  const xpDisplay = document.getElementById('xpDisplay');
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
  const connectedDapps = document.getElementById('connectedDapps');
  const qrModal = document.getElementById('qrModal');
  const qrCodeDiv = document.getElementById('qrCode');

  if (connectWalletBtn) {
  connectWalletBtn.addEventListener('click', async () => {
    if (userAddress) {
      disconnectWallet();
    } else {
      await connectWallet(); // ← Web3Modal v2
    }
  });
}

function disconnectWallet() {
  provider = null;
  signer = null;
  userAddress = null;
  if (connectWalletBtn) connectWalletBtn.textContent = 'Connect Wallet';
  if (walletAddress) walletAddress.textContent = 'Not Connected';
  updateXPUI(0);
  localStorage.clear();
}

// Web3Modal v2 Connect
async function connectWallet() {
  try {
    const projectId = 'c0aa1ca206eb7d58226102b102ec49e9'; // din riktiga
    const metadata = {
      name: 'WarpAI',
      description: 'Onchain Activity Tracker',
      url: 'https://warp-ai-final.vercel.app',
      icons: ['https://warp-ai-final.vercel.app/logo.png']
    };

    const modal = new window.WalletConnectModal.default({
      projectId,
      themeMode: 'dark',
      metadata,
    });

    const web3provider = await modal.connect();
    provider = new ethers.providers.Web3Provider(web3provider);
    signer = provider.getSigner();
    userAddress = await signer.getAddress();

    updateTrackTabData();
    if (connectWalletBtn) connectWalletBtn.textContent = 'Disconnect';
    if (walletAddress) walletAddress.textContent = `${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`;
    loadOnchainData();
  } catch (error) {
    console.error('Connection failed:', error);
    alert('Failed to connect wallet: ' + error.message);
  }
}
  

  async function loadOnchainData() {
    if (!userAddress || !ALCHEMY_KEY) return;
    try {
      const readProvider = new ethers.providers.AlchemyProvider('base', ALCHEMY_KEY);
      const txCount = await readProvider.getTransactionCount(userAddress);
      const xp = txCount * 10;
      updateXPUI(xp);

      if (latestActivity && activityResult) {
        const block = await readProvider.getBlockNumber();
        const txs = await readProvider.getHistory(userAddress, block - 1000, block);
        if (txs.length > 0) {
          const last = txs[txs.length - 1];
          const ethValue = ethers.utils.formatEther(last.value || 0);
          latestActivity.textContent = `↪ ${last.to.slice(0, 6)}... — ${ethValue} ETH`;
          activityResult.textContent = `+ $${(ethValue * 3000).toFixed(2)}`;
        } else {
          latestActivity.textContent = `No recent tx`;
          activityResult.textContent = `+ $0`;
        }
      }
    } catch (error) {
      console.error('Error fetching onchain data:', error);
    }
  }

  function updateXPUI(xp) {
    if (currentXP) currentXP.textContent = `🔥 ${xp} XP`;
    if (totalXP) totalXP.textContent = xp;
    if (xpDisplay) xpDisplay.textContent = `${xp} XP 🔥`;

    const progressPercent = Math.min((xp / 200) * 100, 100);
    document.querySelectorAll('.xp-fill, #xpBannerFill').forEach(el => {
      el.style.width = `${progressPercent}%`;
    });
  }

  if (claimXpBtn) {
    claimXpBtn.addEventListener('click', () => {
      const xp = parseInt(totalXP?.textContent) || 0;
      updateXPUI(xp + 10);
      alert('Claimed 10 XP!');
    });
  }

  if (claimTokenBtn) {
    claimTokenBtn.addEventListener('click', () => {
      let balance = parseFloat(waiBalance?.textContent.match(/\d+\.\d+/)?.[0]) || 0;
      balance += 5;
      if (waiBalance) waiBalance.textContent = `Balance: ${balance.toFixed(2)} WAI`;
      if (claimHistory) claimHistory.innerHTML = `<li>+5 WAI – claimed token</li>` + claimHistory.innerHTML;
      showWaiClaimedMessage();
      showConfetti();
    });
  }

  if (copyReferralBtn) {
    copyReferralBtn.addEventListener('click', () => {
      const link = userAddress ? `https://warpai.com/referral/${userAddress}` : 'https://warpai.com';
      navigator.clipboard.writeText(link);
      showToast('✅ Copied');
    });
  }

  if (shareOnXBtn) {
    shareOnXBtn.addEventListener('click', () => {
      const link = userAddress ? `https://warpai.com/referral/${userAddress}` : 'https://warpai.com';
      window.open(`https://twitter.com/intent/tweet?text=Check out WarpAi! ${link}`, '_blank');
    });
  }

  if (shareOnFarcasterBtn) {
    shareOnFarcasterBtn.addEventListener('click', () => {
      const link = userAddress ? `https://warpai.com/referral/${userAddress}` : 'https://warpai.com';
      window.open(`https://warpcast.com/~/compose?text=Check out WarpAi! ${link}`, '_blank');
    });
  }

  if (buyTokenBtn) buyTokenBtn.addEventListener('click', () => alert('Token buy logic here'));
  if (upgradeBtn) upgradeBtn.addEventListener('click', () => alert('Upgrade to Premium for $5'));

  window.closeQrModal = () => qrModal?.classList.add('hidden');
  window.toggleFAQ = () => document.getElementById('faqModal')?.classList.toggle('hidden');
  window.toggleXpInfo = () => document.getElementById('xpInfoModal')?.classList.toggle('hidden');
  window.toggleWarpInfo = () => document.getElementById('warpInfoModal')?.classList.toggle('hidden');
});

function showWaiClaimedMessage() {
  const msg = document.createElement('div');
  msg.textContent = '✅ You claimed 5 WAI!';
  Object.assign(msg.style, {
    position: 'fixed',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'transparent',
    color: '#4caf50',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    zIndex: '9999',
    textShadow: '0 0 5px black'
  });
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 2500);
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.textContent = message;
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '1rem',
    right: '1rem',
    background: '#4caf50',
    color: '#fff',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    zIndex: '9999'
  });
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}

function showConfetti() {
  for (let i = 0; i < 40; i++) {
    const confetti = document.createElement('div');
    Object.assign(confetti.style, {
      position: 'fixed',
      width: '10px',
      height: '10px',
      background: `hsl(${Math.random() * 360}, 100%, 60%)`,
      top: `${Math.random() * 10 + 10}%`,
      left: `${Math.random() * 100}%`,
      borderRadius: '50%',
      opacity: '0.9',
      zIndex: '9999',
      transition: 'transform 2.5s ease-out, opacity 2.5s ease-out'
    });
    document.body.appendChild(confetti);
    requestAnimationFrame(() => {
      confetti.style.transform = `translateY(${Math.random() * 200 + 100}px) rotate(${Math.random() * 360}deg)`;
      confetti.style.opacity = '0';
    });
    setTimeout(() => confetti.remove(), 3000);
  }
}

async function updateTrackTabData() {
  if (!userAddress) return;
  try {
    const readProvider = new ethers.providers.AlchemyProvider('base', document.querySelector('meta[name="alchemy-key"]')?.content);
    const gasPrice = await readProvider.getGasPrice();
    document.getElementById('baseGas').textContent = parseFloat(ethers.utils.formatUnits(gasPrice, 'gwei')).toFixed(2);
    document.getElementById('gasFees30d').textContent = "$12.34";
    document.getElementById('avgGas').textContent = "45.67 Gwei";
    document.getElementById('pnlToday').textContent = "+ $1.25";

    const txCount = await readProvider.getTransactionCount(userAddress);
    document.getElementById('tokensMinted').textContent = txCount;

    const balance = await readProvider.getBalance(userAddress);
    document.getElementById('ethMoved').textContent = ethers.utils.formatEther(balance) + " ETH";
    document.getElementById('volume30d').textContent = "$" + (parseFloat(ethers.utils.formatEther(balance)) * 3000).toFixed(2);
    document.getElementById('connectedDapps').innerHTML = "<li>Zora</li><li>OpenSea</li><li>Mirror</li>";
  } catch (error) {
    console.error("Track tab data error:", error);
  }
}
