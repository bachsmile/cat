<template>
  <div class="p-6 bg-[#0f111a] min-h-screen text-white">
    <div class="mb-10">
        <h1 class="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 uppercase tracking-tighter">
          Kho lưu trữ Ví (Wallets Vault)
        </h1>
        <p class="text-slate-400 text-sm mt-1 uppercase tracking-widest font-bold">Quản lý các tài khoản Blockchain nội bộ</p>
    </div>

    <div class="grid grid-cols-1 gap-6">
      <div class="bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden backdrop-blur-sm shadow-2xl">
        <div class="p-6 border-b border-slate-800 flex justify-between items-center bg-white/5">
          <h2 class="font-bold flex items-center gap-2">
            <span class="p-2 bg-indigo-500/20 rounded-lg">🔑</span>
            Danh sách ví Test (Hardhat)
          </h2>
          <span class="text-[10px] bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20 font-black tracking-widest uppercase">
            Internal Node Only
          </span>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left font-sans text-sm">
            <thead>
              <tr class="text-slate-500 border-b border-slate-800 bg-black/20">
                <th class="p-4 font-bold uppercase tracking-widest text-[10px]">ID</th>
                <th class="p-4 font-bold uppercase tracking-widest text-[10px]">Nhãn (Label)</th>
                <th class="p-4 font-bold uppercase tracking-widest text-[10px]">Địa chỉ ví (Address)</th>
                <th class="p-4 font-bold uppercase tracking-widest text-[10px]">Khóa bí mật (Private Key)</th>
                <th class="p-4 font-bold uppercase tracking-widest text-[10px] text-right">Hành động</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800/50">
              <tr v-for="wallet in wallets" :key="wallet.id" class="hover:bg-white/5 transition-colors group">
                <td class="p-4 font-mono text-slate-500">#{{ wallet.id }}</td>
                <td class="p-4">
                  <span :class="wallet.labelClass" class="px-3 py-1 rounded-lg font-bold text-[11px] uppercase tracking-tighter">
                    {{ wallet.label }}
                  </span>
                </td>
                <td class="p-4">
                  <div class="flex items-center gap-2">
                    <span class="font-mono text-indigo-300">{{ wallet.address }}</span>
                    <button @click="copy(wallet.address)" class="text-slate-600 hover:text-white transition-colors">📄</button>
                  </div>
                </td>
                <td class="p-4">
                  <div class="flex items-center gap-2 bg-black/30 w-fit px-3 py-2 rounded-lg border border-white/5">
                    <span class="font-mono text-xs" :class="wallet.showKey ? 'text-rose-400' : 'text-slate-700 select-none blur-[4px]'">
                      {{ wallet.showKey ? wallet.privateKey : '****************************************************************' }}
                    </span>
                    <button @click="wallet.showKey = !wallet.showKey" class="text-slate-500 hover:text-white text-xs">
                      {{ wallet.showKey ? '🙈' : '👁️' }}
                    </button>
                  </div>
                </td>
                <td class="p-4 text-right">
                  <button @click="copy(wallet.privateKey)" class="text-[10px] font-black uppercase tracking-widest py-2 px-4 bg-slate-800 hover:bg-slate-700 rounded-lg transition-all">
                    Copy Private Key
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="bg-amber-900/10 border border-amber-500/20 p-6 rounded-2xl flex items-start gap-4">
        <span class="text-2xl">⚠️</span>
        <div>
          <h4 class="text-amber-500 font-bold uppercase text-xs tracking-widest mb-2">Cảnh báo bảo mật</h4>
          <p class="text-xs text-slate-400 leading-relaxed font-medium">
            Tất cả các tài khoản này là do mạng **Hardhat** sinh ra tự động cho mục đích thử nghiệm. **KHÔNG BAO GIỜ** được sử dụng các mã ví/private key này trên mạng Internet quốc tế (Mainnet). Tiền ở đây là tiền ảo nội bộ.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const wallets = ref([
  { 
    id: 0, 
    label: 'ADMIN / DEPLOYER', 
    labelClass: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
    address: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', 
    privateKey: '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
    showKey: false 
  },
  { 
    id: 1, 
    label: 'User Test 1', 
    labelClass: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
    address: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8', 
    privateKey: '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d',
    showKey: false 
  },
  { 
    id: 2, 
    label: 'User Test 2', 
    labelClass: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
    address: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC', 
    privateKey: '0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a',
    showKey: false 
  },
  { 
    id: 3, 
    label: 'Market Maker (Test)', 
    labelClass: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    address: '0x90F79bf6EB2c4f870365E785982E1f101E93b906', 
    privateKey: '0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6',
    showKey: false 
  },
  { 
    id: 4, 
    label: 'Liquidity Provider', 
    labelClass: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    address: '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65', 
    privateKey: '0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a',
    showKey: false 
  }
]);

const copy = (text: string) => {
  navigator.clipboard.writeText(text);
  alert('Đã copy vào bộ nhớ đệm!');
};
</script>
