import { ref, onMounted } from 'vue';
import { BrowserProvider, formatEther } from 'ethers';

export function useWeb3() {
  const account = ref<string | null>(null);
  const chainId = ref<number | null>(null);
  const balance = ref<string | null>(null);
  const isConnecting = ref(false);
  const error = ref<string | null>(null);

  const connect = async () => {
    if (typeof (window as any).ethereum === 'undefined') {
      error.value = 'MetaMask is not installed';
      console.error('MetaMask is not installed');
      return;
    }

    try {
      isConnecting.value = true;
      error.value = null;
      
      const provider = new BrowserProvider((window as any).ethereum);
      
      // Request accounts
      const accounts = await provider.send('eth_requestAccounts', []);
      if (accounts.length > 0) {
        account.value = accounts[0];
        
        const network = await provider.getNetwork();
        chainId.value = Number(network.chainId);

        const bal = await provider.getBalance(accounts[0]);
        balance.value = formatEther(bal);
        
        console.log('Connected to:', account.value);
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to connect';
      console.error('Connection error:', err);
    } finally {
      isConnecting.value = false;
    }
  };

  const disconnect = () => {
    account.value = null;
    chainId.value = null;
    balance.value = null;
  };

  // Listen for account/network changes
  const initListeners = () => {
    if ((window as any).ethereum) {
      (window as any).ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0 && accounts[0]) {
          account.value = accounts[0];
          // Refresh balance
          connect();
        } else {
          disconnect();
        }
      });

      (window as any).ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }
  };

  onMounted(async () => {
    if ((window as any).ethereum) {
      initListeners();
      
      const provider = new BrowserProvider((window as any).ethereum);
      const accounts = await provider.listAccounts();
      if (accounts.length > 0 && accounts[0]) {
        const firstAccount = accounts[0].address;
        // Automatically reconnect if already authorized
        account.value = firstAccount;
        const network = await provider.getNetwork();
        chainId.value = Number(network.chainId);
        const bal = await provider.getBalance(firstAccount);
        balance.value = formatEther(bal);
      }
    }
  });

  return {
    account,
    chainId,
    balance,
    isConnecting,
    error,
    connect,
    disconnect
  };
}
