<template>
  <div
    class="p-4 md:p-8 lg:p-12 max-w-[1750px] mx-auto space-y-10 animate-in fade-in duration-500"
  >
    <!-- Premium Internal Tab Bar -->
    <div
      v-if="activeSubTab === 'products'"
      class="flex items-center gap-2 bg-[#0a0a0f]/80 backdrop-blur-3xl p-1.5 rounded-[2.2rem] border border-white/5 w-fit shadow-2xl sticky top-4 z-[50]"
    >
      <button
        @click="localTab = 'inventory'"
        class="px-8 py-3 rounded-[2rem] text-xs font-black uppercase tracking-widest transition-all"
        :class="
          localTab === 'inventory'
            ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20 translate-y-[-2px]'
            : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
        "
      >
        Quản lý Hàng hóa
      </button>
      <button
        @click="localTab = 'traceability'"
        class="px-8 py-3 rounded-[2rem] text-xs font-black uppercase tracking-widest transition-all"
        :class="
          localTab === 'traceability'
            ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20 translate-y-[-2px]'
            : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
        "
      >
        Nguồn gốc Blockchain
      </button>
    </div>

    <!-- Content Area: Products & Inventory -->
    <div
      v-if="activeSubTab === 'products' && localTab === 'inventory'"
      class="space-y-8 animate-in slide-in-from-bottom-2 duration-500"
    >
      <div
        class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6"
      >
        <div>
          <h2
            class="text-3xl font-black italic tracking-tighter uppercase flex items-center gap-3"
          >
            <BoxIcon class="w-8 h-8 text-blue-400" />
            Quản lý <span class="text-blue-500">Hàng hóa</span>
          </h2>
          <p class="text-gray-500 mt-2 font-medium tracking-wide">
            Quản lý danh mục, biến thể và trạng thái chi tiết của sản phẩm.
          </p>
        </div>
        <button
          class="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-500/20 transition-all active:scale-95"
        >
          Thêm sản phẩm mới
        </button>
      </div>

      <!-- Inventory Grid (Mockup for high quality) -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="p in products"
          :key="p.id"
          class="group bg-[#0a0a0f] border border-white/5 rounded-[2.5rem] p-6 hover:border-blue-500/30 transition-all hover:translate-y-[-8px]"
        >
          <div
            class="aspect-square rounded-3xl overflow-hidden mb-6 bg-white/5 border border-white/5 relative"
          >
            <img
              :src="p.image"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4"
            >
              <button
                class="w-full py-2 bg-white text-black text-[10px] font-black uppercase rounded-xl"
              >
                Chi tiết
              </button>
            </div>
          </div>
          <div class="space-y-4">
            <div>
              <h4 class="text-sm font-bold text-gray-200 truncate">
                {{ p.name }}
              </h4>
              <p class="text-[10px] text-gray-600 mt-1 font-mono break-all">
                {{ p.blockchainId }}
              </p>
            </div>
            <div
              class="flex justify-between items-center pt-4 border-t border-white/5"
            >
              <p class="text-blue-400 font-black text-xs">$820.00</p>
              <span
                class="text-[9px] font-bold px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 uppercase"
                >In Stock</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Area: Blockchain Traceability Section -->
    <div
      v-if="activeSubTab === 'products' && localTab === 'traceability'"
      class="space-y-8 animate-in slide-in-from-bottom-2 duration-500"
    >
      <!-- Header & Stats -->
      <div
        class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6"
      >
        <div>
          <h2
            class="text-3xl font-black italic tracking-tighter uppercase flex items-center gap-3"
          >
            <LinkIcon class="w-8 h-8 text-blue-400" />
            Traceability <span class="text-blue-500">Blockchain</span>
          </h2>
          <p class="text-gray-500 mt-2 font-medium tracking-wide">
            Minh bạch nguồn gốc sản phẩm thông qua mạng lưới phi tập trung.
          </p>
        </div>

        <div class="flex gap-4">
          <div
            class="bg-blue-500/10 border border-blue-500/20 px-6 py-4 rounded-3xl text-center"
          >
            <p
              class="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1"
            >
              Tổng Transaction
            </p>
            <h4 class="text-xl font-bold text-blue-400">12,842</h4>
          </div>
          <div
            class="bg-teal-500/10 border border-teal-500/20 px-6 py-4 rounded-3xl text-center"
          >
            <p
              class="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1"
            >
              Node Đang chạy
            </p>
            <h4 class="text-xl font-bold text-teal-400">64</h4>
          </div>
        </div>
      </div>

      <!-- Main Layout -->
      <div class="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <!-- Left: Product List -->
        <div class="xl:col-span-4 space-y-4">
          <div class="flex items-center justify-between mb-2">
            <h3
              class="text-sm font-black uppercase tracking-[0.2em] text-gray-400"
            >
              Danh sách Hàng hóa
            </h3>
            <button
              class="p-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
            >
              <RefreshCwIcon class="w-4 h-4 text-gray-500" />
            </button>
          </div>

          <div
            class="space-y-3 max-h-[700px] overflow-y-auto pr-2 scrollbar-hide"
          >
            <div
              v-for="p in products"
              :key="p.id"
              @click="selectedProduct = p"
              class="p-5 rounded-[2rem] border transition-all cursor-pointer group relative overflow-hidden"
              :class="
                selectedProduct.id === p.id
                  ? 'bg-blue-600 border-blue-500 shadow-xl shadow-blue-500/20'
                  : 'bg-[#0a0a0f] border-white/5 hover:border-white/10'
              "
            >
              <!-- Selection Highlight (Vertical bar) -->
              <div
                v-if="selectedProduct.id === p.id"
                class="absolute left-0 top-0 bottom-0 w-1.5 bg-white"
              ></div>

              <div class="flex items-center gap-4 relative z-10">
                <div
                  class="w-16 h-16 rounded-2xl overflow-hidden bg-white/5 border border-white/10"
                >
                  <img
                    :src="p.image"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex justify-between items-start">
                    <h4
                      class="font-bold text-sm truncate"
                      :class="
                        selectedProduct.id === p.id
                          ? 'text-white'
                          : 'text-gray-200 group-hover:text-blue-400'
                      "
                    >
                      {{ p.name }}
                    </h4>
                    <span
                      class="text-[9px] font-black px-2 py-0.5 rounded-full border"
                      :class="
                        selectedProduct.id === p.id
                          ? 'bg-white/20 border-white/20 text-white'
                          : 'bg-blue-500/10 border-blue-500/20 text-blue-400'
                      "
                    >
                      Ver {{ p.version }}
                    </span>
                  </div>
                  <p class="text-[10px] text-gray-500 mt-1 font-mono truncate">
                    {{ p.blockchainId }}
                  </p>
                  <div class="flex items-center gap-2 mt-2">
                    <div
                      class="w-2 h-2 rounded-full"
                      :class="
                        p.status === 'instore'
                          ? 'bg-teal-500'
                          : 'bg-orange-500 animate-pulse'
                      "
                    ></div>
                    <p
                      class="text-[10px] font-bold uppercase tracking-widest"
                      :class="
                        selectedProduct.id === p.id
                          ? 'text-white/70'
                          : 'text-gray-400'
                      "
                    >
                      {{ p.statusText }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Trace Details -->
        <div class="xl:col-span-8 space-y-8">
          <div
            v-if="selectedProduct"
            class="bg-[#0a0a0f] border border-white/5 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden flex flex-col justify-center items-center text-center animate-in zoom-in duration-500"
          >
            <!-- Grid Accent -->
            <div
              class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none"
            ></div>
            <div
              class="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/10 blur-[80px] rounded-full pointer-events-none"
            ></div>

            <div class="max-w-2xl w-full space-y-12 relative z-10">
              <!-- Product Overview -->
              <div class="flex flex-col items-center">
                <div
                  class="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-blue-500 to-indigo-600 p-1 mb-6 shadow-2xl shadow-blue-500/20"
                >
                  <div
                    class="w-full h-full bg-[#0a0a0f] rounded-[2.3rem] flex items-center justify-center p-4"
                  >
                    <img
                      :src="selectedProduct.image"
                      class="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <h3 class="text-2xl font-black italic tracking-tighter">
                  {{ selectedProduct.name }}
                </h3>
                <p
                  class="text-sm text-gray-500 font-bold uppercase tracking-[0.3em] mt-2"
                >
                  Supply Chain Journey
                </p>
              </div>

              <!-- Trace Journey Timeline -->
              <div class="relative py-12">
                <!-- Horizontal Connector -->
                <div
                  class="absolute left-10 right-10 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-blue-600 via-teal-500 to-white/5 z-0"
                ></div>

                <div class="grid grid-cols-4 relative z-10">
                  <div
                    v-for="(step, i) in selectedProduct.journey"
                    :key="i"
                    class="flex flex-col items-center gap-6"
                  >
                    <div class="group relative">
                      <div
                        class="w-16 h-16 rounded-[1.5rem] border-2 transition-all flex items-center justify-center cursor-pointer overflow-hidden"
                        :class="
                          step.completed
                            ? 'bg-[#0a0a0f] border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                            : 'bg-white/[0.02] border-white/5 grayscale'
                        "
                      >
                        <component
                          :is="step.icon"
                          class="w-7 h-7"
                          :class="
                            step.completed ? 'text-blue-400' : 'text-gray-700'
                          "
                        />
                        <!-- Tooltip on Hover -->
                        <div
                          class="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-black px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap shadow-2xl border border-white/10 uppercase tracking-widest scale-90 group-hover:scale-100"
                        >
                          Check Blockchain
                        </div>
                      </div>
                      <div
                        v-if="step.completed"
                        class="absolute -top-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center border-4 border-[#0a0a0f] text-[10px]"
                      >
                        <CheckIcon class="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <div class="text-center">
                      <p
                        class="text-[11px] font-black uppercase tracking-widest transition-colors"
                        :class="step.completed ? 'text-white' : 'text-gray-700'"
                      >
                        {{ step.title }}
                      </p>
                      <p class="text-[9px] text-gray-500 mt-1 font-bold">
                        {{ step.time || "Pending" }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Blockchain Identity Section -->
              <div class="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
                <div class="text-left space-y-4">
                  <div class="space-y-1">
                    <p
                      class="text-[10px] font-black text-gray-600 uppercase tracking-widest"
                    >
                      Transaction Hash
                    </p>
                    <p
                      class="text-xs font-mono text-blue-400 break-all bg-blue-500/5 p-3 rounded-2xl border border-blue-500/10"
                    >
                      {{ selectedProduct.currentTx || "0x742d3...4f2e" }}
                    </p>
                  </div>
                  <div class="flex gap-4">
                    <div class="flex-1 space-y-1">
                      <p
                        class="text-[10px] font-black text-gray-600 uppercase tracking-widest"
                      >
                        Smat Contract
                      </p>
                      <p class="text-xs font-mono text-gray-400">
                        VN-PROD-TRC-V4
                      </p>
                    </div>
                    <div class="flex-1 space-y-1">
                      <p
                        class="text-[10px] font-black text-gray-600 uppercase tracking-widest"
                      >
                        Network
                      </p>
                      <p class="text-xs font-bold text-teal-400">
                        FINZO-MAINNET
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  class="bg-white p-6 rounded-[2rem] flex flex-col items-center justify-center gap-4 shadow-[0_20px_50px_rgba(255,255,255,0.05)] border border-white/10 group cursor-pointer transition-transform hover:scale-105"
                >
                  <QrCodeIcon class="w-32 h-32 text-black" />
                  <div class="text-center">
                    <p
                      class="text-black font-black text-[10px] uppercase tracking-[0.2em]"
                    >
                      Anti-Counterfeit QR
                    </p>
                    <p class="text-gray-400 text-[8px] mt-0.5">
                      Scan to verify authenticity
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Multi-tab feature placeholders -->
          <div
            v-else
            class="flex flex-col items-center justify-center h-[600px] bg-[#0a0a0f] rounded-[3rem] border border-white/5 text-center p-12"
          >
            <div
              class="w-24 h-24 bg-blue-500/5 rounded-full flex items-center justify-center text-blue-600 animate-pulse mb-8"
            >
              <BoxIcon class="w-12 h-12" />
            </div>
            <h3 class="text-xl font-bold text-gray-400 mb-2">
              Chọn một sản phẩm để truy xuất
            </h3>
            <p class="text-gray-600 text-sm max-w-xs mx-auto">
              Tất cả thông tin được ghi nhận minh bạch và không thể sửa đổi trên
              hệ thống Blockchain Finzo.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Other Sub-tabs Placeholder -->
    <div
      v-else
      class="flex flex-col items-center justify-center h-[80vh] text-center"
    >
      <div
        class="w-20 h-20 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce"
      >
        <LayersIcon class="w-10 h-10 text-purple-400" />
      </div>
      <h3 class="text-2xl font-bold mb-4 uppercase tracking-[0.2em]">
        {{ activeSubTab }}
      </h3>
      <p class="text-gray-500">
        Phần tính năng này đang được đồng bộ hóa hệ thống...
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import {
  Link as LinkIcon,
  RefreshCw as RefreshCwIcon,
  Package as PackageIcon,
  Truck as TruckIcon,
  Check as CheckIcon,
  Box as BoxIcon,
  Store as StoreIcon,
  Factory as FactoryIcon,
  QrCode as QrCodeIcon,
  Layers as LayersIcon,
} from "lucide-vue-next";

const route = useRoute();

// Local tab state for internal switching
const localTab = ref("inventory"); // 'inventory' or 'traceability'

// Active Management Tab (Integrated from route)
const activeSubTab = computed(() => (route.params.tab as string) || "products");

// Selection State
const selectedProduct = ref<any>(null);

// Mock Data
const products = ref([
  {
    id: 1,
    name: "Cà phê Robusta Đặc sản",
    image:
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=200&auto=format&fit=crop",
    version: "2.4",
    blockchainId: "TX: 0x8a92...e4b1",
    status: "instore",
    statusText: "Đang tại Cửa hàng",
    currentTx: "0x8a92d7f8c5b1234e4b1a2b3c4d5e6f7a8b9c0d1e",
    journey: [
      {
        title: "Nhà sản xuất",
        completed: true,
        icon: FactoryIcon,
        time: "18 Mar, 2026",
      },
      {
        title: "Vận chuyển",
        completed: true,
        icon: TruckIcon,
        time: "20 Mar, 2026",
      },
      {
        title: "Kho bãi",
        completed: true,
        icon: PackageIcon,
        time: "22 Mar, 2026",
      },
      {
        title: "Cửa hàng",
        completed: true,
        icon: StoreIcon,
        time: "24 Mar, 2026",
      },
    ],
  },
  {
    id: 2,
    name: "Gạo ST25 Sạch",
    image:
      "https://images.unsplash.com/photo-1586201375761-83145464e815?q=80&w=200&auto=format&fit=crop",
    version: "1.0",
    blockchainId: "TX: 0x42f1...9a32",
    status: "logistics",
    statusText: "Đang vận chuyển",
    currentTx: "0x42f1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9",
    journey: [
      {
        title: "Nhà sản xuất",
        completed: true,
        icon: FactoryIcon,
        time: "23 Mar, 2026",
      },
      {
        title: "Vận chuyển",
        completed: true,
        icon: TruckIcon,
        time: "25 Mar, 2026",
      },
      { title: "Kho bãi", completed: false, icon: PackageIcon, time: null },
      { title: "Cửa hàng", completed: false, icon: StoreIcon, time: null },
    ],
  },
  {
    id: 3,
    name: "Rượu Vang Đà Lạt V4",
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=200&auto=format&fit=crop",
    version: "4.1",
    blockchainId: "TX: 0x9c0d...1e8f",
    status: "warehouse",
    statusText: "Đang tại Kho",
    currentTx: "0x9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d",
    journey: [
      {
        title: "Nhà sản xuất",
        completed: true,
        icon: FactoryIcon,
        time: "15 Mar, 2026",
      },
      {
        title: "Vận chuyển",
        completed: true,
        icon: TruckIcon,
        time: "17 Mar, 2026",
      },
      {
        title: "Kho bãi",
        completed: true,
        icon: PackageIcon,
        time: "20 Mar, 2026",
      },
      { title: "Cửa hàng", completed: false, icon: StoreIcon, time: null },
    ],
  },
]);

// Set default selection
if (products.value.length > 0) {
  selectedProduct.value = products.value[0];
}
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
