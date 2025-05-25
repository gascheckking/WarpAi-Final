document.addEventListener('DOMContentLoaded', () => {
  const onboardingOverlay = document.getElementById('onboardingOverlay');
  const appContent = document.getElementById('appContent');
  const qrModal = document.getElementById('qrModal');
  const qrCodeDiv = document.getElementById('qrCode');

  // Onboarding Animation (3 sekunder totalt)
  onboardingOverlay.classList.add('fade-in-logo');
  setTimeout(() => {
    onboardingOverlay.classList.remove('fade-in-logo');
    onboardingOverlay.classList.add('fade-out-logo');
    setTimeout(() => {
      onboardingOverlay.style.display = 'none';
      appContent.style.display = 'block';

      // Initialize elements after appContent is visible
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
      
      function toggleWarpInfo() {
  const warpInfoModal = document.getElementById('warpInfoModal');
  if (warpInfoModal) {
    warpInfoModal.classList.toggle('hidden');
  } else {
    console.error('warpInfoModal not found');
  }
}

      // Close QR Modal
      window.closeQrModal = function() {
        qrModal.classList.add('hidden');
        qrCodeDiv.innerHTML = ''; // Rensa QR-kod
      };

      // Disconnect Wallet
      function disconnectWallet() {
        if (provider && provider.close) {
          provider.close(); // Stäng WalletConnect
        }
        provider = null;
        signer = null;
        userAddress = null;
        if (connectWalletBtn) {
          connectWalletBtn.textContent = 'Connect Wallet';
        }
        xpDisplay.textContent = '0 XP 🔥';
        totalXP.textContent = '0';
        currentXP.textContent = '🔥 0 XP';
        walletAddress.textContent = 'Not Connected';
        document.querySelector('.subtitle').textContent = 'Track your own wallet activity';
      }

      // Wallet Connection with Ethers.js and WalletConnect
      const ETHERSCAN_KEY = 'Y1VRJKQB1A4K2JTA8GE1YDH3W54W4I35D5';
      const ALCHEMY_KEY = 'aH4-X2bNp1BarPcBcHiWR6vHxJz_lGbA';
      let provider, signer, userAddress;

      async function connectWithWalletConnect() {
        try {
          const walletConnectProvider = new WalletConnectProvider({
            rpc: {
              8453: `https://base-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`,
            },
            chainId: 8453,
          });
          // Visa QR-kod
          walletConnectProvider.on('display_uri', (uri) => {
            if (qrCodeDiv) {
              qrCodeDiv.innerHTML = '';
              new QRCode(qrCodeDiv, {
                text: uri,
                width: 200,
                height: 200,
              });
              qrModal.classList.remove('hidden');
            }
          });
          await walletConnectProvider.enable();
          provider = new ethers.providers.Web3Provider(walletConnectProvider);
          signer = provider.getSigner();
          userAddress = await signer.getAddress();
          if (connectWalletBtn) {
            connectWalletBtn.textContent = 'Disconnect';
          }
          if (xpDisplay) xpDisplay.textContent = '180 XP 🔥';
          if (totalXP) totalXP.textContent = '180';
          if (currentXP) currentXP.textContent = '🔥 180 XP';
          if (walletAddress) walletAddress.textContent = `${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`;
          if (qrModal) qrModal.classList.add('hidden');
          loadOnchainData();
        } catch (error) {
          console.error('WalletConnect failed:', error);
          alert('WalletConnect failed: ' + error.message);
          if (qrModal) qrModal.classList.add('hidden');
        }
      }

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
    if (xpFill) {
      xpFill.style.transition = 'width 1s ease-in-out';
      xpFill.style.width = `${progressPercent}%`;
    }
    const gasUsed = await alchemyProvider.getGasPrice();
    const level = Math.floor(xp / 200) + 1;
    const nextLevelXP = level * 200;
    if (document.getElementById('level')) document.getElementById('level').textContent = level;
    if (document.getElementById('nextLevelXP')) document.getElementById('nextLevelXP').textContent = nextLevelXP;
    if (document.getElementById('currentXPProgress')) document.getElementById('currentXPProgress').textContent = xp;
    const streak = 5; // Mockad streak
    if (document.getElementById('badge') && streak >= 5) {
      document.getElementById('badge').style.display = 'block';
    }
    if (gasSpent) gasSpent.textContent = `${ethers.utils.formatEther(gasUsed)} ETH (~$${(ethers.utils.formatEther(gasUsed) * 3000).toFixed(2)})`;
    if (latestActivity) latestActivity.textContent = `Bought Token on Zora`;
    if (activityResult) activityResult.textContent = `+ $${(ethers.utils.formatEther(balance) * 3000).toFixed(2)} Win`;
    if (tokensMinted) tokensMinted.textContent = `${txCount} st`;
    if (ethMoved) ethMoved.textContent = `${ethers.utils.formatEther(balance)} ETH total`;
    if (connectedDapps) connectedDapps.innerHTML = `<li>Zora</li><li>OpenSea</li><li>Base</li>`;
    if (document.querySelector('.subtitle')) {
      document.querySelector('.subtitle').textContent = `Track your own wallet activity (Connected wallet: ${userAddress.slice(0, 6)}...${userAddress.slice(-4)})`;
    }
    if (viewHistoryBtn) {
      viewHistoryBtn.addEventListener('click', () => {
        alert('Full NFT history for your wallet: Check console for details');
      });
    }
  } catch (error) {
    console.error('Error fetching onchain data:', error);
  }
}

      if (connectWalletBtn) {
  connectWalletBtn.addEventListener('click', async () => {
    if (userAddress) {
      disconnectWallet();
      return;
    }

    if (!confirm('Are you sure you want to connect your wallet?')) {
      return;
    }

    if (window.ethereum && typeof ethers !== 'undefined') {
      try {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x2105' }],
        });
        signer = provider.getSigner();
        userAddress = await signer.getAddress();
        if (connectWalletBtn) connectWalletBtn.textContent = 'Disconnect';
        if (xpDisplay) xpDisplay.textContent = '180 XP 🔥';
        if (totalXP) totalXP.textContent = '180';
        if (currentXP) currentXP.textContent = '🔥 180 XP';
        if (walletAddress) walletAddress.textContent = `${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`;
        loadOnchainData();
      } catch (error) {
        console.error('MetaMask failed:', error);
        alert('MetaMask failed: ' + error.message);
      }
    } else {
      if (typeof ethers === 'undefined') {
        alert('Ethers.js failed to load. Please refresh the page or check your internet connection.');
        return;
      }
      await connectWithWalletConnect();
    }
  });
}

      if (claimXpBtn) {
        claimXpBtn.addEventListener('click', () => {
          let xp = parseInt(currentXP.textContent.match(/\d+/)[0]) || 0;
          xp += 10;
          currentXP.textContent = `🔥 ${xp} XP`;
          totalXP.textContent = xp;
          xpDisplay.textContent = `${xp} XP 🔥`;
          alert('Claimed 10 XP!');
        });
      }

      if (buyTokenBtn) {
        buyTokenBtn.addEventListener('click', () => {
          toggleWarpInfo();
        });
      }

      if (claimAddressBtn) {
        claimAddressBtn.addEventListener('click', () => {
          if (!userAddress) {
            alert('Please connect your wallet first.');
            return;
          }
          alert('Claim another address feature is premium only.');
        });
      }

      if (trackRandomBtn) {
        trackRandomBtn.addEventListener('click', () => {
          alert('Track random wallet feature is premium only.');
        });
      }

      if (copyReferralBtn) {
        copyReferralBtn.addEventListener('click', () => {
          navigator.clipboard.writeText('https://warpai.com/referral/' + userAddress);
          alert('Referral link copied!');
        });
      }

      if (shareOnXBtn) {
        shareOnXBtn.addEventListener('click', () => {
          window.open('https://twitter.com/intent/tweet?text=Check out WarpAi! https://warpai.com/referral/' + userAddress + ' @YOUR_X_USERNAME', '_blank');
        });
      }

      if (shareOnFarcasterBtn) {
        shareOnFarcasterBtn.addEventListener('click', () => {
          window.open('https://warpcast.com/~/compose?text=Check out WarpAi! https://warpai.com/referral/' + userAddress, '_blank');
        });
      }

      if (shareFarcasterBtn) {
        shareFarcasterBtn.addEventListener('click', () => {
          window.open('https://warpcast.com/~/compose?text=Check out WarpAi! https://warpai.com/referral/' + userAddress, '_blank');
        });
      }

      if (shareXBtn) {
        shareXBtn.addEventListener('click', () => {
          window.open('https://twitter.com/intent/tweet?text=Check out WarpAi! https://warpai.com/referral/' + userAddress + ' @YOUR_X_USERNAME', '_blank');
        });
      }

      if (upgradeBtn) {
        upgradeBtn.addEventListener('click', () => {
          alert('Upgrade to Premium for $5 to unlock all features!');
        });
      }

      if (claimTokenBtn) {
        claimTokenBtn.addEventListener('click', () => {
          let balance = parseFloat(waiBalance.textContent.match(/\d+\.\d+/)[0]) || 0;
          balance += 5;
          waiBalance.textContent = `Balance: ${balance} WAI`;
          let history = claimHistory.innerHTML;
          claimHistory.innerHTML = `<li>+5 WAI – claimed token</li>${history}`;
          alert('Claimed 5 WAI!');
        });
      }

      if (viewHistoryBtn) {
        viewHistoryBtn.addEventListener('click', () => {
          alert('View full NFT history (premium feature).');
        });
      }
    }, 500);
  }, 3000);
});
