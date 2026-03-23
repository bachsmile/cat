<template>
  <div class="p-6 bg-[#0f111a] min-h-screen text-white font-sans">
    <div
      class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
    >
      <div>
        <h1
          class="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500 uppercase tracking-tighter"
        >
          Blockchain Finzo
        </h1>
        <p
          class="text-slate-400 text-sm mt-1 uppercase tracking-widest font-bold"
        >
          Internal Network Explorer
        </p>
      </div>

      <div class="flex items-center gap-4">
        <div v-if="account" class="flex items-center gap-2">
          <div
            class="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg flex items-center gap-3"
          >
            <div
              class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"
            ></div>
            <span class="text-xs font-mono text-slate-300">{{
              truncateAddress(account)
            }}</span>
          </div>
          <button
            @click="disconnect"
            class="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all border border-red-500/20"
            title="Đăng xuất ví"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>
        <button
          @click="connect"
          v-else
          class="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg font-bold hover:scale-105 transition-all text-sm uppercase"
        >
          Kết nối ví MetaMask
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Contract Info -->
      <div class="lg:col-span-2 space-y-6">
        <div
          class="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl backdrop-blur-sm"
        >
          <div class="flex items-center gap-4 mb-6">
            <div class="p-3 bg-purple-500/10 rounded-xl">
              <span class="text-2xl">📋</span>
            </div>
            <div>
              <h2 class="text-xl font-bold">Thông tin Hợp đồng</h2>
              <p class="text-xs text-slate-500 font-medium">
                Finzo Token Contract (FZ)
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 bg-black/20 rounded-xl border border-white/5">
              <span class="text-xs text-slate-500 block mb-1"
                >Địa chỉ (Contract Address)</span
              >
              <div class="flex items-center justify-between">
                <span class="font-mono text-purple-300 text-sm truncate mr-2">{{
                  fzAddress
                }}</span>
                <button
                  @click="copy(fzAddress)"
                  class="text-xs hover:text-white transition-colors"
                >
                  📄
                </button>
              </div>
            </div>
            <div class="p-4 bg-black/20 rounded-xl border border-white/5">
              <span class="text-xs text-slate-500 block mb-1"
                >Mạng lưới đề xuất</span
              >
              <span class="font-bold text-white tracking-widest"
                >LOCAL / HARDHAT</span
              >
            </div>
          </div>

          <div class="mt-8 space-y-4">
            <div
              class="flex justify-between items-center py-3 border-b border-slate-800"
            >
              <span class="text-slate-400">Tên Token</span>
              <span class="font-bold text-purple-400 uppercase tracking-tighter"
                >Finzo Token</span
              >
            </div>
            <div
              class="flex justify-between items-center py-3 border-b border-slate-800"
            >
              <div class="flex items-center gap-2">
                <span class="font-bold">Token FZ</span>
                <img
                  src="../../assets/images/finzo2.png"
                  alt="FZ"
                  class="w-8 h-8 object-contain rounded-full"
                  style="
                    -webkit-mask-image: radial-gradient(
                      circle,
                      black 65%,
                      transparent 70%
                    );
                    mask-image: radial-gradient(
                      circle,
                      black 65%,
                      transparent 70%
                    );
                  "
                />
              </div>
            </div>
            <div
              class="flex justify-between items-center py-3 border-b border-slate-800"
            >
              <span class="text-slate-400">Số dư Blockchain của bạn</span>
              <span
                class="font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center gap-2"
              >
                {{ fzBalance || "0.0" }}
                <img
                  src="../../assets/images/finzo2.png"
                  alt="FZ"
                  class="w-12 h-12 object-contain rounded-full"
                  style="
                    -webkit-mask-image: radial-gradient(
                      circle,
                      black 65%,
                      transparent 70%
                    );
                    mask-image: radial-gradient(
                      circle,
                      black 65%,
                      transparent 70%
                    );
                    filter: drop-shadow(0 0 15px rgba(168, 85, 247, 0.5));
                  "
                />
              </span>
            </div>
          </div>
        </div>

        <!-- Transfers / Actions -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Mint Section -->
          <div class="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl">
            <h3 class="font-bold mb-4 flex items-center gap-2">
              <span class="text-lg">🔨</span> Đúc Token (Mint)
            </h3>
            <p class="text-[10px] text-slate-500 mb-4 font-medium italic">
              * Chỉ Owner
            </p>
            <div class="space-y-3 font-sans text-sm relative">
              <input
                v-model="mintAmount"
                type="number"
                placeholder="Số lượng"
                class="w-full bg-black/30 border border-slate-700 p-3 pr-12 rounded-lg focus:border-purple-500 transition-all"
              />
              <img
                src="../../assets/images/finzo2.png"
                class="absolute right-3 top-3 w-6 h-6 object-contain opacity-80"
                style="
                  -webkit-mask-image: radial-gradient(
                    circle,
                    black 65%,
                    transparent 70%
                  );
                  mask-image: radial-gradient(
                    circle,
                    black 65%,
                    transparent 70%
                  );
                "
              />
              <button
                @click="handleMint"
                :disabled="loading"
                class="w-full py-3 bg-fuchsia-600 hover:bg-fuchsia-500 rounded-lg font-black uppercase tracking-widest text-[10px]"
              >
                ⚡ Đúc
              </button>
            </div>
          </div>

          <!-- Transfer Section -->
          <div class="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl">
            <h3 class="font-bold mb-4 flex items-center gap-2">
              <span class="text-lg">✈️</span> Chuyển
            </h3>
            <div class="space-y-3 font-sans text-sm">
              <input
                v-model="transferTo"
                type="text"
                placeholder="Ví nhận (0x...)"
                class="w-full bg-black/30 border border-slate-700 p-3 rounded-lg focus:border-purple-500 transition-all"
              />
              <div class="relative">
                <input
                  v-model="transferAmount"
                  type="number"
                  placeholder="Số lượng gửi"
                  class="w-full bg-black/30 border border-slate-700 p-3 pr-12 rounded-lg focus:border-purple-500 transition-all"
                />
                <img
                  src="../../assets/images/finzo2.png"
                  class="absolute right-3 top-3 w-6 h-6 object-contain opacity-80"
                  style="
                    -webkit-mask-image: radial-gradient(
                      circle,
                      black 65%,
                      transparent 70%
                    );
                    mask-image: radial-gradient(
                      circle,
                      black 65%,
                      transparent 70%
                    );
                  "
                />
              </div>
              <button
                @click="handleTransfer"
                :disabled="loading"
                class="w-full py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-black uppercase tracking-widest text-[10px]"
              >
                🚀 Gửi
              </button>
            </div>
          </div>

          <!-- Burn Section -->
          <div class="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl">
            <h3 class="font-bold mb-4 flex items-center gap-2 text-rose-400">
              <span class="text-lg">🔥</span> Đốt (Burn)
            </h3>
            <p class="text-[10px] text-rose-500/50 mb-4 font-medium italic">
              * Sẽ trừ thẳng vào ví bạn
            </p>
            <div class="space-y-3 font-sans text-sm">
              <input
                v-model="burnAmount"
                type="number"
                placeholder="Số lượng đốt (FZ)"
                class="w-full bg-black/30 border border-slate-700 p-3 rounded-lg focus:border-rose-500 transition-all"
              />
              <button
                @click="handleBurn"
                :disabled="loading"
                class="w-full py-3 bg-rose-600/20 hover:bg-rose-600 text-rose-500 hover:text-white rounded-lg font-black uppercase tracking-widest text-[10px] border border-rose-500/20"
              >
                🔥 Đốt Token
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Tips -->
      <div class="space-y-6">
        <div
          class="bg-indigo-900/20 border border-indigo-500/20 p-6 rounded-2xl p-4"
        >
          <h4
            class="text-indigo-400 font-bold mb-2 uppercase text-xs tracking-widest flex items-center gap-2"
          >
            <span>💡</span> Hướng dẫn kết nối
          </h4>
          <ul
            class="text-xs text-slate-300 space-y-3 font-medium leading-relaxed"
          >
            <li class="flex gap-2">
              <span class="text-indigo-500 font-black">1.</span>
              <span>Mở tab **MetaMask**, chọn **Mạng tùy chỉnh**.</span>
            </li>
            <li class="flex gap-2">
              <span class="text-indigo-500 font-black">2.</span>
              <span>RPC URL: **{{ rpcUrl }}**</span>
            </li>
            <li class="flex gap-2">
              <span class="text-indigo-500 font-black">3.</span>
              <span>Chain ID: **31337** (Localhost)</span>
            </li>
            <li class="flex gap-2">
              <span class="text-indigo-500 font-black">4.</span>
              <span>Import Contract: Dán địa chỉ ví FZ ở bên trái.</span>
            </li>
          </ul>
        </div>

        <div
          class="bg-emerald-900/10 border border-emerald-500/10 p-6 rounded-2xl"
        >
          <h4
            class="text-emerald-400 font-bold mb-4 uppercase text-xs tracking-widest"
          >
            Trạng thái Blockchain
          </h4>
          <div class="space-y-4">
            <div class="flex items-center justify-between text-xs">
              <span class="text-slate-400">Kết nối Meta</span>
              <span v-if="account" class="text-emerald-400 font-bold"
                >READY</span
              >
              <span v-else class="text-slate-600">OFFLINE</span>
            </div>
            <div class="flex items-center justify-between text-xs">
              <span class="text-slate-400">Node Nội bộ</span>
              <span class="text-emerald-400 font-bold"
                >{{ rpcUrl }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useWeb3 } from "../../composables/useWeb3";

const rpcUrl = import.meta.env.VITE_RPC_URL || "http://127.0.0.1:8545";

const {
  account,
  fzBalance,
  fzAddress,
  connect,
  disconnect,
  mintFz,
  transferFz,
  burnFz,
  fetchFzBalance,
} = useWeb3();

const mintAmount = ref("");
const transferTo = ref("");
const transferAmount = ref("");
const burnAmount = ref("");
const loading = ref(false);

const truncateAddress = (addr: string) => {
  return addr.slice(0, 6) + "..." + addr.slice(-4);
};

const handleMint = async () => {
  if (!mintAmount.value) return;
  loading.value = true;
  try {
    await mintFz(account.value!, mintAmount.value);
    await fetchFzBalance();
    alert("Đúc token thành công!");
    mintAmount.value = "";
  } catch (e: any) {
    alert("Lỗi: " + (e.message || e.reason || "Unknown error"));
  } finally {
    loading.value = false;
  }
};

const handleBurn = async () => {
  if (!burnAmount.value) return;
  if (
    !confirm(
      `Bạn có chắc muốn đốt ${burnAmount.value} FZ không? Hành động này không thể hoàn tác!`,
    )
  )
    return;

  loading.value = true;
  try {
    await burnFz(burnAmount.value);
    await fetchFzBalance();
    alert("Đốt token thành công! Số lượng token lưu thông đã giảm xuống.");
    burnAmount.value = "";
  } catch (e: any) {
    alert("Lỗi: " + (e.message || e.reason || "Unknown error"));
  } finally {
    loading.value = false;
  }
};

const handleTransfer = async () => {
  if (!transferTo.value || !transferAmount.value) return;
  loading.value = true;
  try {
    await transferFz(transferTo.value, transferAmount.value);
    await fetchFzBalance();
    alert("Chuyển tiền thành công!");
    transferTo.value = "";
    transferAmount.value = "";
  } catch (e: any) {
    alert("Lỗi: " + (e.message || e.reason || "Unknown error"));
  } finally {
    loading.value = false;
  }
};

const copy = (text: string) => {
  navigator.clipboard.writeText(text);
  alert("Đã copy: " + text);
};
</script>
