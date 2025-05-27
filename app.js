let provider = null;
let signer = null;
let userAddress = null;

document.addEventListener('DOMContentLoaded', () => {
  const ALCHEMY_KEY = document.querySelector('meta[name="alchemy-key"]')?.content;

  const connectWalletBtn = document.getElementById('connectWallet');
  const walletAddress = document.getElementById('walletAddress');
  const xpDisplay = document.getElementById('xpDisplay');
  const totalXP = document.getElementById('totalXP');
  const currentXP = document.getElementById('currentXP');
  const latestActivity = document.getElementById('latestActivity');
  const activityResult = document.getElementById('activityResult');

  if (connectWalletBtn) {
    connectWalletBtn.addEventListener('click', async () => {
      if (userAddress) {
        disconnectWallet();
      } else {
        await connectWallet();
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

  async function connectWallet() {
    try {
      provider = await window.WalletConnectProvider.init({
        projectId: 'c0aa1ca206eb7d58226102b102ec49e9',
        chains: [8453],
        showQrModal: true,
        rpcMap: {
          8453: `https://base-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`
        },
        metadata: {
          name: 'WarpAI',
          description: 'Onchain Activity Tracker',
          url: 'https://warp-ai-final.vercel.app',
          icons: ['https://warp-ai-final.vercel.app/logo.png']
        }
      });

      await provider.enable();

      const web3Provider = new ethers.providers.Web3Provider(provider);
      signer = web3Provider.getSigner();
      userAddress = await signer.getAddress();

      updateTrackTabData();
      if (connectWalletBtn) connectWalletBtn.textContent = 'Disconnect';
      if (walletAddress) walletAddress.textContent = `${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`;
      loadOnchainData();
    } catch (err) {
      console.error('Connection failed:', err);
      alert('Failed to connect: ' + err.message);
    }
  }

  function updateXPUI(xp) {
    if (currentXP) currentXP.textContent = `🔥 ${xp} XP`;
    if (totalXP) totalXP.textContent = xp;
    if (xpDisplay) xpDisplay.textContent = `${xp} XP 🔥`;
    const percent = Math.min((xp / 200) * 100, 100);
    document.querySelectorAll('.xp-fill, #xpBannerFill').forEach(el => {
      el.style.width = `${percent}%`;
    });
  }

  async function loadOnchainData() {
    if (!userAddress || !ALCHEMY_KEY) return;
    try {
      const readProvider = new ethers.providers.AlchemyProvider('base', ALCHEMY_KEY);
      const txCount = await readProvider.getTransactionCount(userAddress);
      updateXPUI(txCount * 10);

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
    } catch (error) {
      console.error('Error fetching onchain data:', error);
    }
  }

  async function updateTrackTabData() {
    if (!userAddress || !ALCHEMY_KEY) return;
    try {
      const provider = new ethers.providers.AlchemyProvider('base', ALCHEMY_KEY);
      const gas = await provider.getGasPrice();
      document.getElementById('baseGas').textContent = parseFloat(ethers.utils.formatUnits(gas, 'gwei')).toFixed(2);
      const txCount = await provider.getTransactionCount(userAddress);
      document.getElementById('tokensMinted').textContent = txCount;
      const balance = await provider.getBalance(userAddress);
      document.getElementById('ethMoved').textContent = ethers.utils.formatEther(balance) + " ETH";
      document.getElementById('volume30d').textContent = "$" + (parseFloat(ethers.utils.formatEther(balance)) * 3000).toFixed(2);
      document.getElementById('connectedDapps').innerHTML = "<li>Zora</li><li>OpenSea</li><li>Mirror</li>";
    } catch (error) {
      console.error("Track tab data error:", error);
    }
  }
});