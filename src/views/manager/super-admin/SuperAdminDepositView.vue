<template>
  <div
    class="min-h-screen flex flex-col space-y-12 animate-page-entrance bg-transparent text-white pb-20"
  >
    <!-- ☄️ Global Atmospheric Radiant Effects -->
    <div
      class="absolute top-[-10%] right-[-10%] w-[60%] h-[40%] bg-gradient-to-b from-[#FFD700]/10 to-transparent blur-[150px] pointer-events-none z-0"
    ></div>
    <div
      class="absolute bottom-[-5%] left-[-5%] w-[40%] h-[30%] bg-[#FFD700]/5 blur-[120px] pointer-events-none z-0"
    ></div>

    <!-- 🏗️ Master Header -->
    <div
      class="flex flex-col md:flex-row md:items-center justify-between gap-6 px-4 relative z-10"
    >
      <div class="flex flex-col">
        <h1
          class="text-5xl font-black text-white tracking-tighter uppercase leading-none"
        >
          Cổng <span class="text-[#FFD700]">Tài Chính</span>
        </h1>
        <div class="flex items-center gap-2 mt-3">
          <div class="w-12 h-px bg-[#FFD700]/40"></div>
          <p
            class="text-[10px] font-black uppercase tracking-[0.5em] text-[#FFD700]/50"
          >
            Xác minh ngân quỹ hệ thống
          </p>
        </div>
      </div>

      <div class="flex items-center gap-6">
        <div class="flex flex-col items-end">
          <span
            class="text-[8px] font-black text-[#FFD700]/30 uppercase tracking-widest mb-1"
            >Trạng thái</span
          >
          <div
            class="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white/5 border border-white/10 shadow-lg"
          >
            <div
              class="w-2 h-2 rounded-full bg-[#FFD700] animate-pulse shadow-[0_0_10px_#FFD700]"
            ></div>
            <span
              class="text-[10px] font-black text-[#FFD700] tracking-widest uppercase"
              >Đang hoạt động</span
            >
          </div>
        </div>

        <button
          @click="fetchPending"
          class="w-14 h-14 bg-[#FFD700]/10 hover:bg-[#FFD700]/20 border border-[#FFD700]/20 rounded-2xl flex items-center justify-center text-[#FFD700] transition-all group shadow-[0_0_30px_rgba(255,215,0,0.1)]"
        >
          <RefreshCcw
            :size="20"
            class="group-hover:rotate-180 transition-transform duration-1000"
          />
        </button>
      </div>
    </div>

    <!-- 📊 Imperial Stats Area -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8 px-4 relative z-10">
      <div
        class="bg-[#131316] p-8 rounded-[3rem] border border-white/[0.03] flex items-center gap-6 group hover:border-[#FFD700]/30 transition-all shadow-2xl relative overflow-hidden"
      >
        <div
          class="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[#FFD700]/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700"
        ></div>
        <div
          class="w-16 h-16 bg-[#FFD700]/10 rounded-2xl flex items-center justify-center text-[#FFD700] border border-[#FFD700]/20"
        >
          <Clock :size="28" />
        </div>
        <div>
          <p
            class="text-[9px] font-black text-white/30 uppercase tracking-[0.3em] mb-1"
          >
            Duyệt nạp chờ
          </p>
          <p class="text-3xl font-black text-white">
            {{ pendingDeposits.length }}
            <span class="text-xs text-[#FFD700] uppercase ml-1"
              >Yêu cầu</span
            >
          </p>
        </div>
      </div>

      <div
        class="bg-[#131316] p-8 rounded-[3rem] border border-white/[0.03] flex items-center gap-6 opacity-60"
      >
        <div
          class="w-16 h-16 bg-[#FFD700]/5 rounded-2xl flex items-center justify-center text-[#FFD700]/50 border border-white/5"
        >
          <Banknote :size="28" />
        </div>
        <div>
          <p
            class="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] mb-1"
          >
            Giao dịch hôm nay
          </p>
          <p class="text-3xl font-black text-white/40">
            0.00
            <span class="text-xs text-white/20 uppercase ml-1"
              >CR</span
            >
          </p>
        </div>
      </div>
    </div>

    <!-- 📁 System Workspace -->
    <div
      class="bg-[#131316] rounded-[4rem] border border-white/[0.03] border-t-white/10 mx-4 flex flex-col shadow-[0_-40px_100px_rgba(0,0,0,0.8)] relative z-10 overflow-hidden"
    >
      <div
        v-if="loading"
        class="flex-1 flex flex-col items-center justify-center space-y-6"
      >
        <div
          class="w-20 h-20 border-2 border-white/5 border-t-[#FFD700] rounded-full animate-rotate opacity-60"
        ></div>
        <p
          class="text-[10px] font-black text-[#FFD700]/40 uppercase tracking-[0.6em] animate-pulse"
        >
          Đang đồng bộ sổ cái hệ thống...
        </p>
      </div>

      <div
        v-else-if="pendingDeposits.length === 0"
        class="flex-1 flex flex-col items-center justify-center py-32 opacity-20"
      >
        <Inbox :size="64" class="text-[#FFD700]/20 mb-8" />
        <p class="text-sm font-black text-white uppercase tracking-[0.8em]">
          Danh sách trống
        </p>
      </div>

      <div v-else class="flex flex-col">
        <div class="overflow-x-auto custom-scrollbar">
          <table class="w-full text-left border-collapse px-10">
            <thead
              class="sticky top-0 z-20 bg-[#131316] border-b border-white/[0.05]"
            >
              <tr>
                <th
                  class="px-12 py-8 text-[11px] font-black text-white/30 uppercase tracking-[0.4em]"
                >
                  Nguồn gửi
                </th>
                <th
                  class="px-12 py-8 text-[11px] font-black text-white/30 uppercase tracking-[0.4em]"
                >
                  Số tiền nạp
                </th>
                <th
                  class="px-12 py-8 text-[11px] font-black text-[#FFD700]/40 uppercase tracking-[0.4em]"
                >
                  Minh chứng
                </th>
                <th
                  class="px-12 py-8 text-[11px] font-black text-white/30 uppercase tracking-[0.4em]"
                >
                  Thời điểm xác minh
                </th>
                <th
                  class="px-12 py-8 text-[11px] font-black text-white/30 uppercase tracking-[0.4em] text-right"
                >
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-white/[0.03]">
              <tr
                v-for="deposit in pendingDeposits"
                :key="deposit.id"
                class="group hover:bg-[#FFD700]/[0.02] transition-colors"
              >
                <td class="px-12 py-10">
                  <div class="flex items-center gap-6">
                    <div
                      class="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FFD700] to-orange-600 p-0.5 shadow-lg group-hover:scale-110 transition-transform"
                    >
                      <div
                        class="w-full h-full bg-black rounded-[14px] flex items-center justify-center text-[#FFD700] font-black text-lg"
                      >
                        {{ deposit.userId.substring(0, 1).toUpperCase() }}
                      </div>
                    </div>
                    <div class="flex flex-col">
                      <span
                        class="text-sm font-black text-white tracking-tighter uppercase mb-0.5"
                        >{{ deposit.user?.username || deposit.userId }}</span>
                      <span
                        class="text-[9px] font-black text-[#FFD700]/30 tracking-[0.2em] uppercase"
                        >Người dùng xác thực</span
                      >
                    </div>
                  </div>
                </td>

                <td class="px-12 py-10">
                  <div class="flex flex-col">
                    <span
                      class="text-2xl font-black text-white tracking-tighter leading-none"
                      >{{ deposit.amount.toLocaleString() }}</span
                    >
                    <span
                      class="text-[9px] font-black text-[#FFD700] uppercase tracking-widest mt-2"
                      >VNĐ</span
                    >
                  </div>
                </td>

                <td class="px-12 py-10">
                  <div
                    @click="selectedProof = deposit.proofImage"
                    class="w-24 h-14 bg-black rounded-xl overflow-hidden border border-white/10 cursor-pointer relative group/img transition-all hover:border-[#FFD700]/50"
                  >
                    <img
                      :src="deposit.proofImage"
                      class="w-full h-full object-cover opacity-50 group-hover/img:opacity-100 transition-opacity"
                    />
                    <div
                      class="absolute inset-0 bg-[#FFD700]/10 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity"
                    >
                      <Eye :size="20" class="text-[#FFD700]" />
                    </div>
                  </div>
                </td>

                <td class="px-12 py-10 text-white/50">
                  <div class="flex flex-col">
                    <span class="text-xs font-bold">{{
                      formatDate(deposit.createdAt)
                    }}</span>
                    <span
                      class="text-[9px] font-black text-white/10 uppercase tracking-widest mt-1"
                      >Ghi nhận hệ thống</span
                    >
                  </div>
                </td>

                <td class="px-12 py-10 text-right">
                  <!-- Actions: Always visible, no hover-to-reveal logic -->
                  <div
                    class="flex items-center justify-end gap-4 opacity-100 translate-x-0"
                  >
                    <button
                      @click="handleAction(deposit, 'reject')"
                      class="px-6 py-3 rounded-2xl border border-white/10 text-white/60 text-[10px] font-black uppercase tracking-widest hover:border-red-500 hover:text-red-500 transition-all bg-white/5 active:scale-95"
                    >
                      Từ chối
                    </button>
                    <button
                      @click="handleAction(deposit, 'approve')"
                      class="px-8 py-3 rounded-2xl bg-gradient-to-r from-[#FFD700] to-orange-500 text-black text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_10px_30px_rgba(255,215,0,0.2)]"
                    >
                      Phê duyệt
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- 🖼️ Imperial Archive Viewer -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="selectedProof"
          class="fixed inset-0 z-[9999] flex items-center justify-center p-6 md:p-12 lg:p-20"
        >
          <div
            class="absolute inset-0 bg-[#050507]/95 backdrop-blur-2xl"
            @click="selectedProof = null"
          ></div>
          <div
            class="relative max-w-4xl max-h-[80vh] rounded-[2rem] md:rounded-[4rem] overflow-hidden animate-page-entrance shadow-[0_0_120px_rgba(255,215,0,0.15)] border border-[#FFD700]/10 bg-black flex items-center justify-center"
          >
            <img
              :src="selectedProof"
              class="w-full h-full object-contain bg-white"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"
            ></div>
            <button
              @click="selectedProof = null"
              class="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 md:w-16 md:h-16 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center text-[#FFD700] transition-all group backdrop-blur-md"
            >
              <X
                :size="28"
                class="group-hover:rotate-90 transition-transform duration-500"
              />
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { RefreshCcw, Clock, Inbox, Eye, X, Banknote } from "lucide-vue-next";
import api from "@/api/client";
import { useToast } from "@/composables/useToast";

const pendingDeposits = ref<any[]>([]);
const loading = ref(true);
const selectedProof = ref<string | null>(null);
const { showToast } = useToast();

const fetchPending = async () => {
  loading.value = true;
  try {
    const res = await api.get("/wallet/deposits/pending");
    pendingDeposits.value = res.data;
  } catch (e) {
    showToast("Access Denied or Ledger Error", "error");
  } finally {
    loading.value = false;
  }
};

const handleAction = async (deposit: any, action: "approve" | "reject") => {
  const isApproved = action === "approve";
  const confirmMsg = isApproved
    ? `Xác nhận duyệt nạp ${deposit.amount.toLocaleString()} VNĐ vào ví người dùng?`
    : `Từ chối và hủy yêu cầu nạp tiền này?`;

  if (!confirm(confirmMsg)) return;

  try {
    await api.post(`/wallet/deposits/${deposit.id}/${action}`, {
      adminNote: `Đã duyệt bởi Quản trị viên vào lúc ${new Date().toLocaleString()}`,
    });
    showToast(
      isApproved
        ? "Đã nạp tiền thành công."
        : "Yêu cầu đã bị hủy bỏ.",
      isApproved ? "success" : "warning",
    );
    fetchPending();
  } catch (e) {
    showToast("Lỗi đồng bộ dữ liệu Ledger", "error");
  }
};

const formatDate = (d: string) => {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(d));
};

onMounted(() => {
  fetchPending();
});
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #050507;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 215, 0, 0.2);
  border-radius: 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.animate-page-entrance {
  animation: page-entrance 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes page-entrance {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.95);
    filter: blur(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.animate-rotate {
  animation: rotate 2s linear infinite;
}
</style>
