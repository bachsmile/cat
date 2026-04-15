<template>
  <CnModal
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    title=""
    width="900px"
    color="rose"
    :showClose="false"
  >
    <div class="relative min-h-[500px] p-10 overflow-y-auto" style="max-height: 85vh; scrollbar-width: thin; scrollbar-color: rgba(244,63,94,0.3) transparent;">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h2 class="text-2xl font-black italic tracking-tighter uppercase text-rose-950 flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-rose-500 flex items-center justify-center text-white shadow-lg"><Eye :size="20" /></div>
            Chi tiết đơn hàng
          </h2>
          <p v-if="order" class="text-[10px] font-bold text-rose-400 uppercase tracking-widest mt-1 ml-[52px]">#{{ order.id }}</p>
        </div>
        <span v-if="order" class="px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border"
          :class="order.status === 'completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
                  order.status === 'confirmed' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                  'bg-amber-50 text-amber-600 border-amber-200'">
          {{ order.status }}
        </span>
      </div>

      <div v-if="loading" class="flex items-center justify-center py-20">
        <div class="w-8 h-8 border-3 border-rose-200 border-t-rose-500 rounded-full animate-spin"></div>
      </div>

      <div v-else-if="order" class="space-y-8">
        <!-- Wedding Data -->
        <div v-if="order.weddingData" class="grid grid-cols-2 gap-6">
          <div class="p-6 bg-white/50 rounded-2xl border border-rose-100/50">
            <div class="flex items-center gap-2 mb-4"><div class="w-1.5 h-5 bg-blue-500 rounded-full"></div><span class="text-[10px] font-black text-rose-800 uppercase tracking-widest">Nhà Trai</span></div>
            <p class="text-sm font-black text-rose-950">{{ order.weddingData.groomName || '—' }}</p>
            <p class="text-xs text-rose-400 mt-1">{{ order.weddingData.groomParents || '—' }}</p>
          </div>
          <div class="p-6 bg-white/50 rounded-2xl border border-rose-100/50">
            <div class="flex items-center gap-2 mb-4"><div class="w-1.5 h-5 bg-rose-500 rounded-full"></div><span class="text-[10px] font-black text-rose-800 uppercase tracking-widest">Nhà Gái</span></div>
            <p class="text-sm font-black text-rose-950">{{ order.weddingData.brideName || '—' }}</p>
            <p class="text-xs text-rose-400 mt-1">{{ order.weddingData.brideParents || '—' }}</p>
          </div>
          <div class="p-6 bg-white/50 rounded-2xl border border-rose-100/50">
            <p class="text-[9px] font-black text-rose-300 uppercase tracking-widest mb-2">Lễ Cưới</p>
            <p class="text-sm font-bold text-rose-950">{{ order.weddingData.ceremonyDate }} {{ order.weddingData.ceremonyTime }}</p>
          </div>
          <div class="p-6 bg-white/50 rounded-2xl border border-rose-100/50">
            <p class="text-[9px] font-black text-rose-300 uppercase tracking-widest mb-2">Tiệc Mời</p>
            <p class="text-sm font-bold text-rose-950">{{ order.weddingData.partyDate }} {{ order.weddingData.partyTime }}</p>
          </div>
          <div class="col-span-2 p-6 bg-white/50 rounded-2xl border border-rose-100/50">
            <p class="text-[9px] font-black text-rose-300 uppercase tracking-widest mb-2">Địa Chỉ</p>
            <p class="text-sm font-bold text-rose-950">{{ order.weddingData.address || '—' }}</p>
          </div>
        </div>

        <!-- Order Details -->
        <div class="p-6 bg-white/50 rounded-2xl border border-rose-100/50 space-y-3">
          <h3 class="text-sm font-black text-rose-800 uppercase tracking-widest mb-4">Thông tin đơn hàng</h3>
          <div class="flex justify-between py-2 border-b border-rose-50"><span class="text-xs text-rose-400">Gói dịch vụ</span><span class="text-xs font-bold text-rose-900">{{ order.planId }}</span></div>
          <div class="flex justify-between py-2 border-b border-rose-50"><span class="text-xs text-rose-400">Mẫu thiệp</span><span class="text-xs font-bold text-rose-900">{{ order.templateId || '—' }}</span></div>
          <div class="flex justify-between py-2 border-b border-rose-50"><span class="text-xs text-rose-400">Số lượng</span><span class="text-xs font-bold text-rose-900">{{ order.quantity }} thiệp</span></div>
          <div class="flex justify-between py-2 border-b border-rose-50"><span class="text-xs text-rose-400">Loại gửi</span><span class="text-xs font-bold" :class="order.deliveryType === 'auto' ? 'text-indigo-600' : 'text-rose-900'">{{ order.deliveryType === 'auto' ? 'Tự động' : 'Tĩnh' }}</span></div>
          <div class="flex justify-between py-2 border-b border-rose-50"><span class="text-xs text-rose-400">Đơn giá</span><span class="text-xs font-bold text-rose-900">{{ formatPrice(order.unitPrice || 0) }}</span></div>
          <div class="flex justify-between py-2 border-b border-rose-50"><span class="text-xs text-rose-400">Phí dịch vụ</span><span class="text-xs font-bold text-rose-900">{{ formatPrice(order.serviceFee || 0) }}</span></div>
          <div class="flex justify-between pt-4"><span class="text-sm font-black text-rose-950 uppercase">Tổng cộng</span><span class="text-xl font-black text-rose-600">{{ formatPrice(order.totalAmount || 0) }}</span></div>
        </div>

        <!-- Guest List -->
        <div v-if="order.guestList && order.guestList.length" class="p-6 bg-white/50 rounded-2xl border border-rose-100/50">
          <h3 class="text-sm font-black text-rose-800 uppercase tracking-widest mb-4">Danh sách khách mời ({{ order.guestList.length }})</h3>
          <div class="max-h-[200px] overflow-y-auto rounded-xl border border-rose-100" style="scrollbar-width:thin;">
            <table class="w-full text-left">
              <thead class="sticky top-0 bg-rose-50"><tr class="text-[9px] font-black uppercase tracking-widest text-rose-400"><th class="p-3">#</th><th class="p-3">Họ tên</th><th class="p-3">SĐT</th><th class="p-3">Email</th></tr></thead>
              <tbody>
                <tr v-for="(g, i) in order.guestList" :key="i" class="border-t border-rose-50 text-xs text-rose-800">
                  <td class="p-3 font-bold text-rose-400">{{ Number(i) + 1 }}</td><td class="p-3 font-bold">{{ g.name }}</td><td class="p-3">{{ g.phone }}</td><td class="p-3">{{ g.email }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Payment Receipt -->
        <div v-if="order.paymentReceipt" class="p-6 bg-white/50 rounded-2xl border border-rose-100/50">
          <h3 class="text-sm font-black text-rose-800 uppercase tracking-widest mb-4">Hoá đơn thanh toán</h3>
          <img :src="order.paymentReceipt" class="max-w-[300px] rounded-2xl border border-rose-100 shadow-md" />
        </div>
      </div>
    </div>
  </CnModal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Eye } from 'lucide-vue-next';
import { CnModal } from 'glass-studio-ui-pro';
import { weddingApi } from '@/api/wedding';

const props = defineProps<{ modelValue: boolean; orderId: string }>();
const emit = defineEmits(['update:modelValue']);

const order = ref<any>(null);
const loading = ref(false);

const formatPrice = (p: number | string) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(p));

watch(() => props.modelValue, async (v) => {
  if (v && props.orderId) {
    loading.value = true;
    try {
      const res = await weddingApi.getAdminOrderDetail(props.orderId);
      order.value = res.data;
    } catch { order.value = null; }
    finally { loading.value = false; }
  }
});
</script>
