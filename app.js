document.addEventListener('DOMContentLoaded', () => {
  const onboardingOverlay = document.getElementById('onboardingOverlay');
  const settingsBtn = document.getElementById('settingsBtn');
  const settingsMenu = document.getElementById('settingsMenu');
  const toggleTheme = document.getElementById('toggleTheme');
  const connectWalletBtn = document.getElementById('connectWallet');
  const xpDisplay = document.getElementById('xpDisplay');
  const walletAddress = document.getElementById('walletAddress');
  const totalXP = document.getElementById('totalXP');
  const currentXP = document.getElementById('currentXP');
  const claimXpBtn = document.getElementById('claimXpBtn');
  const buyTokenBtn = document.getElementById('buyTokenBtn');
  const claimAddressBtn = document.getElementById('claimAddressBtn');
  const trackRandomBtn = document.getElementById('trackRandomBtn');
  const copyReferralBtn = document.getElementById('copyReferralBtn');
  const shareOnXBtn = document.getElementById('shareOnXBtn');
  const shareOnFarcasterBtn = document.getElementById('shareOnFarcasterBtn');
  const upgradeBtn = document.getElementById('upgradeBtn');
  const addWalletBtn = document.getElementById('addWalletBtn');
  const claimTokenBtn = document.getElementById('claimTokenBtn');
  const shareFarcasterBtn = document.getElementById('shareFarcasterBtn');
  const shareXBtn = document.getElementById('shareXBtn');
  const viewHistoryBtn = document.getElementById('viewHistoryBtn');
  const latestActivity = document.getElementById('latestActivity');
  const activityResult = document.getElementById('activityResult');
  const tokensMinted = document.getElementById('tokensMinted');
  const ethMoved = document.getElementById('ethMoved');
  const gasSpent = document.getElementById('gasSpent');
  const connectedDapps = document.getElementById('connectedDapps');
  const nftHistory = document.getElementById('nftHistory');
  const followedWallets = document.getElementById('followedWallets');
  const waiBalance = document.getElementById('waiBalance');
  const claimHistory = document.getElementById('claimHistory');
  const faqModal = document.getElementById('faqModal');
  const xpInfoModal = document.getElementById('xpInfoModal');
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  // Onboarding Animation Fix
  setTimeout(() => {
    onboardingOverlay.classList.add('fade-out-logo');
    setTimeout(() => {
      onboardingOverlay.style.display = 'none';
    }, 500);
  }, 2000);

  // Tab Switching
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      tabContents.forEach(content => {
        content.style.display = 'none';
        if (content.getAttribute('data-tab') === button.getAttribute('data-tab')) {
          content.style.display = 'block';
        }
      });
    });
  });

  // Settings Menu
  settingsBtn.addEventListener('click', () => {
    settingsMenu.classList.toggle('active');
  });

  // Theme Toggle
  toggleTheme.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode', toggleTheme.checked);
  });

  // Modal Functions
  function toggleFAQ() {
    faqModal.classList.toggle('hidden');
  }

  function toggleXpInfo() {
    xpInfoModal.classList.toggle('hidden');
  }

  // Wallet Connection with Ethers.js and Alchemy
  const ETHERSCAN_KEY = 'Y1VRJKQB1A4K2JTA8GE1YDH3W54W4I35D5';
  const ALCHEMY_KEY = 'aH4-X2bNp1BarPcBcHiWR6vHxJz_lGbA';
  let provider, signer, userAddress;

  connectWalletBtn.addEventListener('click', async () => {
    if (window.ethereum) {
      try {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        signer = provider.getSigner();
        userAddress = await signer.getAddress();
        walletAddress.textContent = `${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`;
        connectWalletBtn.style.display = 'none';
        xpDisplay.textContent = '180 XP 🔥';
        totalXP.textContent = '180';
        currentXP.textContent = '🔥 180 XP';
        loadOnchainData();
      } catch (error) {
        console.error('Wallet connection failed:', error);
        alert('Wallet connection failed: ' + error.message);
      }
    } else {
      alert('Please install MetaMask or a compatible wallet.');
    }
  });

  async function loadOnchainData() {
    if (!provider || !userAddress) return;

    try {
      const alchemyProvider = new ethers.providers.AlchemyProvider('mainnet', ALCHEMY_KEY);
      const balance = await alchemyProvider.getBalance(userAddress);
      const txCount = await alchemyProvider.getTransactionCount(userAddress);
      const gasUsed = await alchemyProvider.getGasPrice();

      latestActivity.textContent = `Bought Token on Zora`;
      activityResult.textContent = `+ $${(ethers.utils.formatEther(balance) * 3000).toFixed(2)} Win`;
      tokensMinted.textContent = `${txCount} st`;
      ethMoved.textContent = `${ethers.utils.formatEther(balance)} ETH total`;
      gasSpent.textContent = `${ethers.utils.formatEther(gasUsed)} ETH (~$${(ethers.utils.formatEther(gasUsed) * 3000).toFixed(2)})`;
      connectedDapps.innerHTML = `<li>Zora</li><li>OpenSea</li><li>Base</li>`;
    } catch (error) {
      console.error('Error fetching onchain data:', error);
    }
  }

  // Button Actions
  claimXpBtn.addEventListener('click', () => {
    let xp = parseInt(currentXP.textContent.match(/\d+/)[0]) || 0;
    xp += 10;
    currentXP.textContent = `🔥 ${xp} XP`;
    totalXP.textContent = xp;
    xpDisplay.textContent = `${xp} XP 🔥`;
    alert('Claimed 10 XP!');
  });

  buyTokenBtn.addEventListener('click', async () => {
    if (!signer) {
      alert('Please connect your wallet first.');
      return;
    }
    try {
      const tx = await signer.sendTransaction({
        to: '0x0cd1e9c691af8d4d34efcc089a40b31c691d0482',
        value: ethers.utils.parseEther('0.01')
      });
      await tx.wait();
      alert('Token purchase successful!');
      let xp = parseInt(currentXP.textContent.match(/\d+/)[0]) || 0;
      xp += 50;
      currentXP.textContent = `🔥 ${xp} XP`;
      totalXP.textContent = xp;
      xpDisplay.textContent = `${xp} XP 🔥`;
    } claimAddressBtn.addEventListener('click', () => {
      if (!userAddress) {
        alert('Please connect your wallet first.');
        return;
      }
      alert('Claim another address feature is premium only.');
    });

    trackRandomBtn.addEventListener('click', () => {
      alert('Track random wallet feature is premium only.');
    });

    copyReferralBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('https://warpai.com/referral/' + userAddress);
      alert('Referral link copied!');
    });

    shareOnXBtn.addEventListener('click', () => {
      window.open('https://twitter.com/intent/tweet?text=Check out WarpAi! https://warpai.com/referral/' + userAddress, '_blank');
    });

    shareOnFarcasterBtn.addEventListener('click', () => {
      window.open('https://warpcast.com/~/compose?text=Check out WarpAi! https://warpai.com/referral/' + userAddress, '_blank');
    });

    shareFarcasterBtn.addEventListener('click', () => {
      window.open('https://warpcast.com/~/compose?text=Check out WarpAi! https://warpai.com/referral/' + userAddress, '_blank');
    });

    shareXBtn.addEventListener('click', () => {
      window.open('https://twitter.com/intent/tweet?text=Check out WarpAi! https://warpai.com/referral/' + userAddress, '_blank');
    });

    upgradeBtn.addEventListener('click', () => {
      alert('Upgrade to Premium for $5 to unlock all features!');
    });

    claimTokenBtn.addEventListener('click', () => {
      let balance = parseFloat(waiBalance.textContent.match(/\d+\.\d+/)[0]) || 0;
      balance += 5;
      waiBalance.textContent = `Balance: ${balance} WAI`;
      let history = claimHistory.innerHTML;
      claimHistory.innerHTML = `<li>+5 WAI – claimed token</li>${history}`;
      alert('Claimed 5 WAI!');
    });

    viewHistoryBtn.addEventListener('click', () => {
      alert('View full NFT history (premium feature).');
    });
  });
});
