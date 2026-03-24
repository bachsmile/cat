import { ref, onMounted } from 'vue';
import { BrowserProvider, formatEther, Contract, parseEther } from 'ethers';

export function useWeb3() {
  const account = ref<string | null>(null);
  const chainId = ref<number | null>(null);
  const balance = ref<string | null>(null);
  const isConnecting = ref(false);
  const error = ref<string | null>(null);

  const fzBalance = ref<string | null>(null);
  // Default address for local deployment (Hardhat Node)
  const fzAddress = import.meta.env.VITE_FZ_CONTRACT_ADDRESS || '0x5FbDB2315678afecb367f032d93F642f64180aa3'; 

  const FZ_ABI = [
    "function balanceOf(address account) view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function transfer(address to, uint256 amount) returns (bool)",
    "function mint(address to, uint256 amount) public",
    "function burn(uint256 amount) public"
  ];

  const fetchFzBalance = async () => {
    if (!account.value || typeof (window as any).ethereum === 'undefined') return;
    try {
      const provider = new BrowserProvider((window as any).ethereum);
      const contract = new Contract(fzAddress, FZ_ABI, provider) as any;
      const bal = await contract.balanceOf(account.value);
      fzBalance.value = formatEther(bal);
    } catch (e) {
      console.error('Error fetching FZ balance:', e);
    }
  };

  const transferFz = async (to: string, amount: string | number) => {
    if (!account.value) throw new Error('Wallet not connected');
    const provider = new BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner();
    const contract = new Contract(fzAddress, FZ_ABI, signer) as any;
    const tx = await contract.transfer(to, parseEther(amount.toString()));
    return await tx.wait();
  };

  const mintFz = async (to: string, amount: string | number) => {
    if (!account.value) throw new Error('Wallet not connected');
    const provider = new BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner();
    const contract = new Contract(fzAddress, FZ_ABI, signer) as any;
    const tx = await contract.mint(to, parseEther(amount.toString()));
    return await tx.wait();
  };

  const burnFz = async (amount: string | number) => {
    if (!account.value) throw new Error('Wallet not connected');
    const provider = new BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner();
    const contract = new Contract(fzAddress, FZ_ABI, signer) as any;
    const tx = await contract.burn(parseEther(amount.toString()));
    return await tx.wait();
  };

  const connect = async () => {
    if (typeof (window as any).ethereum === 'undefined') {
      error.value = 'MetaMask is not installed';
      return;
    }
    try {
      isConnecting.value = true;
      error.value = null;
      const provider = new BrowserProvider((window as any).ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      if (accounts.length > 0) {
        account.value = accounts[0];
        const network = await provider.getNetwork();
        chainId.value = Number(network.chainId);
        const bal = await provider.getBalance(accounts[0]);
        balance.value = formatEther(bal);
        await fetchFzBalance();
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to connect';
    } finally {
      isConnecting.value = false;
    }
  };

  const disconnect = () => {
    account.value = null;
    chainId.value = null;
    balance.value = null;
    fzBalance.value = null;
  };

  const initListeners = () => {
    if ((window as any).ethereum) {
      (window as any).ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0 && accounts[0]) {
          account.value = accounts[0];
          connect();
        } else {
          disconnect();
        }
      });
      (window as any).ethereum.on('chainChanged', () => window.location.reload());
    }
  };

  onMounted(async () => {
    if ((window as any).ethereum) {
      initListeners();
      const provider = new BrowserProvider((window as any).ethereum);
      const accounts = await provider.listAccounts();
      if (accounts.length > 0 && accounts[0]) {
        account.value = accounts[0].address;
        const network = await provider.getNetwork();
        chainId.value = Number(network.chainId);
        const bal = await provider.getBalance(account.value);
        balance.value = formatEther(bal);
        await fetchFzBalance();
      }
    }
  });

  return {
    account,
    chainId,
    balance,
    fzBalance,
    fzAddress,
    isConnecting,
    error,
    connect,
    disconnect,
    fetchFzBalance,
    transferFz,
    mintFz,
    burnFz
  };
}
