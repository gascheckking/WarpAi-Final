document.addEventListener('DOMContentLoaded', () => {
  const onboardingOverlay = document.getElementById('onboardingOverlay');
  const appContent = document.getElementById('appContent');
  const qrModal = document.getElementById('qrModal');
  const qrCodeDiv = document.getElementById('qrCode');
const shareFarcasterBtn = document.getElementById('shareFarcasterBtn');
const shareXBtn = document.getElementById('shareXBtn');
const waiBalance = document.getElementById('waiBalance');
const claimHistory = document.getElementById('claimHistory');
const claimTokenBtn = document.getElementById('claimTokenBtn');
const refreshTrackBtn = document.getElementById('refreshTrackBtn');
if (refreshTrackBtn) {
  refreshTrackBtn.addEventListener('click', () => {
    loadOnchainData();
  });
}


if (shareFarcasterBtn) shareFarcasterBtn.addEventListener('click', () => window.open('https://warpcast.com/~/compose?text=Check out WarpAi! https://warpai.com/referral/' + userAddress, '_blank'));

if (shareXBtn) shareXBtn.addEventListener('click', () => window.open('https://twitter.com/intent/tweet?text=Check out WarpAi! https://warpai.com/referral/' + userAddress + ' @YOUR_X_USERNAME', '_blank'));

if (claimTokenBtn) claimTokenBtn.addEventListener('click', () => {
  let balance = parseFloat(waiBalance.textContent.match(/\d+\.\d+/)[0]) || 0;
  balance += 5;
  waiBalance.textContent = `Balance: ${balance} WAI`;
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

  // Onboarding Animation (3 sekunder totalt)
  onboardingOverlay.classList.add('fade-in-logo');
  setTimeout(() => {
    onboardingOverlay.classList.remove('fade-in-logo');
    onboardingOverlay.classList.add('fade-out-logo');
    setTimeout(() => {
      onboardingOverlay.style.display = 'none';
      if (appContent) appContent.style.display = 'block';

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
      const viewHistoryBtn = document.getElementById('viewHistoryBtn');
      const latestActivity = document.getElementById('latestActivity');
      const activityResult = document.getElementById('activityResult');
      const tokensMinted = document.getElementById('tokensMinted');
      const ethMoved = document.getElementById('ethMoved');
      const gasSpent = document.getElementById('gasSpent');
      const connectedDapps = document.getElementById('connectedDapps');
      const nftHistory = document.getElementById('nftHistory');
      const followedWallets = document.getElementById('followedWallets');
      const viewRecentMintBtn = document.getElementById('viewRecentMintBtn');
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

        // ⏱️ Refresh funktioner beroende på flik
        const selectedTab = button.getAttribute('data-tab');
        if (selectedTab === 'track') loadOnchainData();
        if (selectedTab === 'profile') updateProfileUI(); // om du har nån
        // Lägg till fler flik-refresh om du vill
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
        if (warpInfoModal) warpInfoModal.classList.toggle('hidden');
      }

      // Close QR Modal
      window.closeQrModal = function() {
        qrModal.classList.add('hidden');
        qrCodeDiv.innerHTML = '';
      };

      // Disconnect Wallet
      function disconnectWallet() {
        if (provider && provider.close) provider.close();
        provider = null;
        signer = null;
        userAddress = null;
        if (connectWalletBtn) {
  connectWalletBtn.addEventListener('click', async () => {
    if (userAddress) {
      disconnectWallet(); // ✅ Använd funktionen
      return;
    }

    // 🔄 Connect-läge
    await connectWithWalletConnect();
  });
}


      // Wallet Connection with Ethers.js and WalletConnect
      const ETHERSCAN_KEY = 'Y1VRJKQB1A4K2JTA8GE1YDH3W54W4I35D5';
      const ALCHEMY_KEY = 'aH4-X2bNp1BarPcBcHiWR6vHxJz_lGbA';
      let provider, signer, userAddress;

      async function connectWithWalletConnect() {
        try {
          const walletConnectProvider = new window.WalletConnectProvider.default({
            rpc: { 8453: `https://base-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}` },
            chainId: 8453
          });
          walletConnectProvider.on('display_uri', (uri) => {
  // 📱 Om mobil → öppna direkt i TrustWallet
  if (/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)) {
    window.open(`https://link.trustwallet.com/wc?uri=${encodeURIComponent(uri)}`, '_blank');
    return;
  }

  // 💻 Visa QR + länkar (desktop)
  if (qrCodeDiv) {
    qrCodeDiv.innerHTML = '';
    new QRCode(qrCodeDiv, { text: uri, width: 200, height: 200 });
    qrModal.classList.remove('hidden');

    const encodedUri = encodeURIComponent(uri);
    const walletLinks = {
      MetaMask: `https://metamask.app.link/wc?uri=${encodedUri}`,
      TrustWallet: `https://link.trustwallet.com/wc?uri=${encodedUri}`,
      CoinbaseWallet: `https://go.cb-w.com/wc?uri=${encodedUri}`,
      Rainbow: `https://rnbwapp.com/wc?uri=${encodedUri}`,
      Uniswap: `https://uniswap.wallet/wc?uri=${encodedUri}`
    };

    const walletLinksDiv = document.getElementById('walletLinks');
    if (walletLinksDiv) {
      walletLinksDiv.innerHTML = `
        <button onclick="window.open('${walletLinks.MetaMask}', '_blank')">MetaMask</button>
        <button onclick="window.open('${walletLinks.TrustWallet}', '_blank')">TrustWallet</button>
        <button onclick="window.open('${walletLinks.CoinbaseWallet}', '_blank')">Coinbase</button>
        <button onclick="window.open('${walletLinks.Rainbow}', '_blank')">Rainbow</button>
        <button onclick="window.open('${walletLinks.Uniswap}', '_blank')">Uniswap</button>
      `;
    }
  }
});

          await walletConnectProvider.enable();
          provider = new ethers.providers.Web3Provider(walletConnectProvider);
          signer = provider.getSigner();
          userAddress = await signer.getAddress();
         if (connectWalletBtn) connectWalletBtn.textContent = 'Disconnect';
if (walletAddress) walletAddress.textContent = `${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`;
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
            // Hämta senaste transaktionen
const latestTx = await alchemyProvider.getHistory(userAddress, "latest");

if (latestTx.length > 0) {
  const last = latestTx[latestTx.length - 1];
  const ethValue = ethers.utils.formatEther(last.value);
  if (latestActivity) latestActivity.textContent = `↪ ${last.to.slice(0, 6)}... — ${ethValue} ETH`;
  if (activityResult) activityResult.textContent = `+ $${(ethValue * 3000).toFixed(2)} est.`;
} else {
  if (latestActivity) latestActivity.textContent = `No recent tx`;
  if (activityResult) activityResult.textContent = `+ $0`;
}
          }
          const gasUsed = await alchemyProvider.getGasPrice();
          const level = Math.floor(xp / 200) + 1;
          const nextLevelXP = level * 200;
          if (document.getElementById('level')) document.getElementById('level').textContent = level;
          if (document.getElementById('nextLevelXP')) document.getElementById('nextLevelXP').textContent = nextLevelXP;
          if (document.getElementById('currentXPProgress')) document.getElementById('currentXPProgress').textContent = xp;
          const streak = 5;
          if (document.getElementById('badge') && streak >= 5) document.getElementById('badge').style.display = 'block';
          if (gasSpent) gasSpent.textContent = `${ethers.utils.formatEther(gasUsed)} ETH (~$${(ethers.utils.formatEther(gasUsed) * 3000).toFixed(2)})`;
          if (tokensMinted) tokensMinted.textContent = `${txCount} st`;
          if (ethMoved) ethMoved.textContent = `${ethers.utils.formatEther(balance)} ETH total`;
          if (connectedDapps) connectedDapps.innerHTML = `<li>Zora</li><li>OpenSea</li><li>Base</li>`;
          if (document.querySelector('.subtitle')) document.querySelector('.subtitle').textContent = `Track your own wallet activity (Connected wallet: ${userAddress.slice(0, 6)}...${userAddress.slice(-4)})`;
          if (viewHistoryBtn) viewHistoryBtn.addEventListener('click', () => alert('Full NFT history for your wallet: Check console for details'));
          if (viewRecentMintBtn) viewRecentMintBtn.addEventListener('click', () => alert('View more NFT mint history on the Track tab!'));
        } catch (error) {
          console.error('Error fetching onchain data:', error);
        }
      }

      if (connectWalletBtn) {
  connectWalletBtn.addEventListener('click', async () => {
    if (userAddress) {
      // 🔌 Disconnect-läge
      provider = null;
      signer = null;
      userAddress = null;
      connectWalletBtn.textContent = 'Connect Wallet';
      if (walletAddress) walletAddress.textContent = 'Not Connected';
      if (xpDisplay) xpDisplay.textContent = '0 XP 🔥';
      if (totalXP) totalXP.textContent = '0';
      if (currentXP) currentXP.textContent = '🔥 0 XP';
      localStorage.clear();
      return;
    }

    // 🔄 Connect-läge
    await connectWithWalletConnect();
  });
}


          }

          if (!confirm('Are you sure you want to connect your wallet?')) return;

          if (window.ethereum && typeof ethers !== 'undefined') {
            try {
              provider = new ethers.providers.Web3Provider(window.ethereum);
              await window.ethereum.request({ method: 'eth_requestAccounts' });
              await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: '0x2105' }] });
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
          } else if (typeof ethers === 'undefined') {
            alert('Ethers.js failed to load. Please refresh the page or check your internet connection.');
          } else {
            await connectWithWalletConnect();
          }
        });
      }

      if (claimXpBtn) claimXpBtn.addEventListener('click', () => {
        let xp = parseInt(currentXP.textContent.match(/\d+/)[0]) || 0;
        xp += 10;
        currentXP.textContent = `🔥 ${xp} XP`;
        totalXP.textContent = xp;
        xpDisplay.textContent = `${xp} XP 🔥`;
        alert('Claimed 10 XP!');
      });

      if (buyTokenBtn) buyTokenBtn.addEventListener('click', () => toggleWarpInfo());

      if (claimAddressBtn) claimAddressBtn.addEventListener('click', () => {
        if (!userAddress) alert('Please connect your wallet first.');
        else alert('Claim another address feature is premium only.');
      });

      if (trackRandomBtn) trackRandomBtn.addEventListener('click', () => alert('Track random wallet feature is premium only.'));

      if (copyReferralBtn) copyReferralBtn.addEventListener('click', () => {
        navigator.clipboard.writeText('https://warpai.com/referral/' + userAddress);
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

      if (shareOnXBtn) shareOnXBtn.addEventListener('click', () => window.open('https://twitter.com/intent/tweet?text=Check out WarpAi! https://warpai.com/referral/' + userAddress + ' @YOUR_X_USERNAME', '_blank'));

      if (shareOnFarcasterBtn) shareOnFarcasterBtn.addEventListener('click', () => window.open('https://warpcast.com/~/compose?text=Check out WarpAi! https://warpai.com/referral/' + userAddress, '_blank'));

      if (upgradeBtn) upgradeBtn.addEventListener('click', () => alert('Upgrade to Premium for $5 to unlock all features!'));

      if (claimTokenBtn) claimTokenBtn.addEventListener('click', () => {
        let balance = parseFloat(waiBalance.textContent.match(/\d+\.\d+/)[0]) || 0;
        balance += 5;
        waiBalance.textContent = `Balance: ${balance} WAI`;
        let history = claimHistory.innerHTML;
        claimHistory.innerHTML = `<li>+5 WAI – claimed token</li>${history}`;
        alert('Claimed 5 WAI!');
      });

      if (viewHistoryBtn) viewHistoryBtn.addEventListener('click', () => alert('View full NFT history (premium feature).'));

      if (viewRecentMintBtn) viewRecentMintBtn.addEventListener('click', () => alert('View more NFT mint history on the Track tab!'));
    }, 500);
  }, 3000);
});
