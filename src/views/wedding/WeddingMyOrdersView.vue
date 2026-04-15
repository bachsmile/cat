<template>
  <div
    class="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 relative overflow-hidden"
  >
    <!-- Ambient -->
    <div
      class="fixed -top-40 -left-40 w-[600px] h-[600px] bg-rose-200/30 blur-[150px] rounded-full"
    ></div>
    <div
      class="fixed bottom-0 right-0 w-[500px] h-[500px] bg-pink-200/20 blur-[130px] rounded-full"
    ></div>

    <div class="relative z-10 max-w-5xl mx-auto px-8 py-16">
      <!-- Header -->
      <div class="flex items-center justify-between mb-12">
        <div class="flex flex-col gap-4">
          <div>
            <button
              @click="router.push('/wedding')"
              class="text-rose-300 hover:text-rose-500 text-[10px] font-black uppercase tracking-widest mb-3 flex items-center gap-2 transition-colors"
            >
              <ArrowLeft :size="14" /> Quay láº¡i
            </button>
            <h1
              class="text-4xl font-black italic tracking-tighter uppercase text-rose-950"
            >
              ÄÆ¡n HÃ ng <span class="text-rose-500">Cá»§a TÃ´i</span>
            </h1>
          </div>

        </div>

        <div class="flex items-center gap-4">
          <!-- Wallet Balance Display -->
          <div v-if="walletActivated" class="flex items-center gap-3">
            <div 
              class="flex items-center gap-6 px-6 py-2.5 rounded-2xl bg-white/40 backdrop-blur-xl border border-rose-100/50 shadow-sm transition-all group"
            >
              <!-- Available Balance -->
              <div class="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity" @click="showDepositModal = true">
                <div class="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 transition-transform group-hover:scale-110">
                  <Plus :size="16" />
                </div>
                <div class="flex flex-col text-left">
                  <span class="text-[8px] font-black text-rose-300 uppercase tracking-widest leading-none mb-1">Sá»‘ dÆ° VNÄ (CÃ³ sáºµn)</span>
                  <span class="text-lg font-black text-emerald-600 italic tracking-tighter leading-none">
                    {{ walletBalance.toLocaleString() }}Ä‘
                  </span>
                </div>
              </div>

              <!-- Divider -->
              <div v-if="frozenBalance > 0" class="w-px h-8 bg-rose-100/50"></div>

              <!-- Frozen Balance -->
              <div v-if="frozenBalance > 0" class="flex items-center gap-3 animate-pulse">
                <div class="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                  <Lock :size="12" />
                </div>
                <div class="flex flex-col text-left">
                  <span class="text-[7px] font-black text-amber-400 uppercase tracking-widest leading-none mb-0.5">ÄÃ³ng bÄƒng</span>
                  <span class="text-xs font-black text-amber-600 italic tracking-tighter leading-none">
                    {{ frozenBalance.toLocaleString() }}Ä‘
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Activation Trigger -->
          <button 
            v-else
            @click="handleActivateWallet"
            :disabled="activating"
            class="flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-200 hover:scale-[1.02] active:scale-95 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Wallet :size="16" v-if="!activating" />
              <Loader2 :size="16" class="animate-spin" v-else />
            </div>
            <div class="flex flex-col items-start">
              <span class="text-[8px] font-black text-rose-100 uppercase tracking-widest leading-none mb-1">VÃ­ Ä‘iá»‡n tá»­</span>
              <span class="text-sm font-black italic tracking-tighter leading-none uppercase">KÃ­ch hoáº¡t vÃ­ ngay</span>
            </div>
          </button>

          <button
            @click="fetchOrders"
            class="p-4 rounded-2xl bg-white/60 border border-rose-100 text-rose-400 hover:bg-rose-50 hover:text-rose-600 transition-all shadow-sm"
          >
            <RefreshCcw :size="20" />
          </button>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex items-center justify-center py-32">
        <div
          class="w-10 h-10 border-4 border-rose-200 border-t-rose-500 rounded-full animate-spin"
        ></div>
      </div>

      <!-- Empty -->
      <div v-else-if="orders.length === 0" class="text-center py-32">
        <Package :size="64" class="text-rose-200 mx-auto mb-6" />
        <p class="text-rose-300 font-bold uppercase tracking-widest text-sm">
          ChÆ°a cÃ³ Ä‘Æ¡n hÃ ng nÃ o
        </p>
        <button
          @click="router.push('/wedding')"
          class="mt-6 px-8 py-3 bg-rose-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 transition-colors"
        >
          Äáº·t thiá»‡p ngay
        </button>
      </div>

      <!-- Orders List -->
      <div v-else class="space-y-6">
        <div
          v-for="order in orders"
          :key="order.id"
          class="bg-white/60 backdrop-blur-xl rounded-[2rem] border border-rose-100/50 p-8 transition-all hover:shadow-lg"
        >
          <div class="flex items-start justify-between mb-6">
            <div>
              <p
                class="text-[9px] font-black text-rose-300 uppercase tracking-widest mb-1"
              >
                #{{ order.id }}
              </p>
              <h3
                class="text-lg font-black text-rose-950 uppercase italic tracking-tighter"
              >
                {{ order.weddingData?.groomName || "â€”" }} &
                {{ order.weddingData?.brideName || "â€”" }}
              </h3>
              <p class="text-[10px] text-rose-400 mt-1">
                {{ formatDate(order.createdAt) }}
              </p>
            </div>
            <span
              class="px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border"
              :class="statusClass(order.status)"
            >
              {{ statusLabel(order.status) }}
            </span>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div class="p-3 bg-rose-50/50 rounded-xl text-center">
              <p
                class="text-[8px] font-black text-rose-300 uppercase tracking-widest"
              >
                Máº«u
              </p>
              <p class="text-sm font-bold text-rose-800 mt-1">
                {{ order.templateId || "â€”" }}
              </p>
            </div>
            <div class="p-3 bg-rose-50/50 rounded-xl text-center">
              <p
                class="text-[8px] font-black text-rose-300 uppercase tracking-widest"
              >
                Sá»‘ lÆ°á»£ng
              </p>
              <p class="text-sm font-bold text-rose-800 mt-1">
                {{ order.quantity }}
              </p>
            </div>
            <div class="p-3 bg-rose-50/50 rounded-xl text-center">
              <p
                class="text-[8px] font-black text-rose-300 uppercase tracking-widest"
              >
                Loáº¡i gá»­i
              </p>
              <p class="text-sm font-bold text-rose-800 mt-1">
                {{ order.deliveryType === "auto" ? "Tá»± Ä‘á»™ng" : "TÄ©nh" }}
              </p>
            </div>
            <div class="p-3 bg-rose-50/50 rounded-xl text-center">
              <p
                class="text-[8px] font-black text-rose-300 uppercase tracking-widest"
              >
                Tá»•ng tiá»n
              </p>
              <p class="text-sm font-bold text-rose-600 mt-1">
                {{ formatPrice(order.totalAmount) }}
              </p>
            </div>
          </div>

          <!-- Completed or Confirmed â†’ Show invitation links -->
          <div
            v-if="order.status === 'completed' || order.status === 'confirmed'"
            class="border-t border-rose-100 pt-6"
          >
            <button
              @click="toggleInvitations(order.id)"
              class="flex items-center gap-3 px-6 py-3 bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-colors shadow-lg"
            >
              <Mail :size="16" />
              {{
                expandedOrderId === order.id ? "áº¨n danh sÃ¡ch" : "Xem thiá»‡p má»i"
              }}
              <ChevronDown
                :size="14"
                :class="expandedOrderId === order.id ? 'rotate-180' : ''"
                class="transition-transform"
              />
            </button>

            <!-- Invitation Links -->
            <div
              v-if="expandedOrderId === order.id"
              class="mt-6 space-y-3 animate-entrance"
            >
              <div
                v-if="loadingInvitations"
                class="flex items-center justify-center py-8"
              >
                <div
                  class="w-6 h-6 border-3 border-rose-200 border-t-rose-500 rounded-full animate-spin"
                ></div>
              </div>
              <template v-else>
                <div class="flex items-center justify-between mb-4">
                  <p class="text-xs font-bold text-rose-600">
                    {{ invitations.length }} thiá»‡p má»i
                  </p>
                  <button
                    @click="copyAllLinks"
                    class="px-4 py-2 bg-rose-100 text-rose-600 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-rose-200 transition-colors flex items-center gap-1.5"
                  >
                    <Copy :size="12" /> Sao chÃ©p táº¥t cáº£
                  </button>
                </div>
                <div
                  class="max-h-[400px] overflow-y-auto space-y-2 pr-2"
                  style="
                    scrollbar-width: thin;
                    scrollbar-color: rgba(244, 63, 94, 0.3) transparent;
                  "
                >
                  <div
                    v-for="inv in invitations"
                    :key="inv.index"
                    class="flex items-center justify-between p-4 bg-white rounded-xl border border-rose-50 hover:border-rose-200 transition-all group"
                  >
                    <div class="flex items-center gap-3 min-w-0 flex-1">
                      <div
                        class="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center text-rose-500 text-[10px] font-black shrink-0"
                      >
                        {{ inv.index + 1 }}
                      </div>
                      <div class="min-w-0">
                        <p class="text-sm font-bold text-rose-900 truncate">
                          {{ inv.name }}
                        </p>
                        <p class="text-[10px] text-rose-400 truncate">
                          {{ inv.phone || inv.email || "â€”" }}
                        </p>
                      </div>
                    </div>
                    <div class="flex items-center gap-2 shrink-0 ml-4">
                      <button
                        @click="copyLink(inv.code)"
                        class="p-2 rounded-lg bg-rose-50 text-rose-400 hover:bg-rose-100 hover:text-rose-600 transition-all"
                        title="Sao chÃ©p link"
                      >
                        <Copy :size="14" />
                      </button>
                      <a
                        :href="getInvitationUrl(inv.code)"
                        target="_blank"
                        class="p-2 rounded-lg bg-emerald-50 text-emerald-500 hover:bg-emerald-100 hover:text-emerald-600 transition-all"
                        title="Xem thiá»‡p"
                      >
                        <ExternalLink :size="14" />
                      </a>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Deposit Modal -->
    <WeddingDepositModal 
      :show="showDepositModal"
      :user-email="userEmail"
      @close="showDepositModal = false"
      @success="handleDepositSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  ArrowLeft,
  RefreshCcw,
  Package,
  ChevronDown,
  Copy,
  ExternalLink,
  Plus,
  Lock,
  Wallet,
  Loader2,
} from "lucide-vue-next";
import WeddingDepositModal from "./modals/WeddingDepositModal.vue";
import { weddingApi } from "@/api/wedding";
import { getWalletStatus, activateWallet } from "@/api/wallet";
import { useToast } from "@/composables/useToast";

const router = useRouter();
const { showToast } = useToast();

const loading = ref(true);
const activating = ref(false);
const orders = ref<any[]>([]);
const expandedOrderId = ref<string | null>(null);
const loadingInvitations = ref(false);
const invitations = ref<any[]>([]);
const walletBalance = ref(0);
const frozenBalance = ref(0);
const walletActivated = ref(false);
const showDepositModal = ref(false);
const userEmail = ref(localStorage.getItem('user_email') || 'khachhang@wedding.com');

const fetchWallet = async () => {
  try {
    const res = await getWalletStatus("VND");
    walletActivated.value = res.walletActivated || false;
    if (res && res.stats) {
      walletBalance.value = res.stats.balance || 0;
      frozenBalance.value = res.stats.frozenBalance || 0;
    }
  } catch (e) {
    console.error("Balance fetch error", e);
  }
};

const handleActivateWallet = async () => {
  activating.value = true;
  try {
    const res = await activateWallet();
    if (res.success) {
      showToast("KÃ­ch hoáº¡t vÃ­ thÃ nh cÃ´ng!", "success");
      await fetchWallet();
    }
  } catch (e: any) {
    showToast(e.response?.data?.message || "Lá»—i kÃ­ch hoáº¡t vÃ­", "error");
  } finally {
    activating.value = false;
  }
};

const handleDepositSuccess = async () => {
  await fetchWallet();
};

const fetchOrders = async () => {
  loading.value = true;
  try {
    const res = await weddingApi.getMyOrders();
    orders.value = res.data;
  } catch {
    orders.value = [];
  } finally {
    loading.value = false;
  }
};

const toggleInvitations = async (orderId: string) => {
  if (expandedOrderId.value === orderId) {
    expandedOrderId.value = null;
    invitations.value = [];
    return;
  }
  expandedOrderId.value = orderId;
  loadingInvitations.value = true;
  try {
    const res = await weddingApi.getOrderInvitations(orderId);
    invitations.value = res.data.invitations || [];
  } catch {
    invitations.value = [];
    showToast("KhÃ´ng thá»ƒ táº£i danh sÃ¡ch thiá»‡p má»i", "error");
  } finally {
    loadingInvitations.value = false;
  }
};

const getInvitationUrl = (code: string) => {
  return `${window.location.origin}/invitation/${code}`;
};

const copyLink = async (code: string) => {
  try {
    await navigator.clipboard.writeText(getInvitationUrl(code));
    showToast("ÄÃ£ sao chÃ©p link", "success");
  } catch {
    showToast("KhÃ´ng thá»ƒ sao chÃ©p", "error");
  }
};

const copyAllLinks = async () => {
  const text = invitations.value
    .map((inv) => `${inv.name}: ${getInvitationUrl(inv.code)}`)
    .join("\n");
  try {
    await navigator.clipboard.writeText(text);
    showToast(`ÄÃ£ sao chÃ©p ${invitations.value.length} link`, "success");
  } catch {
    showToast("KhÃ´ng thá»ƒ sao chÃ©p", "error");
  }
};

const formatPrice = (p: number | string) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    Number(p),
  );

const formatDate = (d: string) => {
  try {
    return new Intl.DateTimeFormat("vi-VN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(d));
  } catch {
    return d;
  }
};

const statusLabel = (s: string) =>
  ({
    pending: "Chá» duyá»‡t",
    confirmed: "ÄÃ£ xÃ¡c nháº­n",
    completed: "HoÃ n thÃ nh",
    cancelled: "ÄÃ£ huá»·",
  })[s] || s;
const statusClass = (s: string) =>
  ({
    pending: "bg-amber-50 text-amber-600 border-amber-200",
    confirmed: "bg-blue-50 text-blue-600 border-blue-200",
    completed: "bg-emerald-50 text-emerald-600 border-emerald-200",
    cancelled: "bg-red-50 text-red-600 border-red-200",
  })[s] || "bg-gray-50 text-gray-600 border-gray-200";

onMounted(() => {
  fetchOrders();
  fetchWallet();
});
</script>

<style scoped>
.animate-entrance {
  animation: entrance 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes entrance {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

