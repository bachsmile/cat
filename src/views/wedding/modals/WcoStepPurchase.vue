<template>
  <div class="relative z-10 px-12 pt-6 text-center">
    <h2 class="text-2xl font-black italic tracking-tighter uppercase text-rose-950">Đặt Hàng <span class="text-rose-600">& Khách Mời</span></h2>
  </div>
  <div class="flex-1 px-12 pb-8 relative z-10 overflow-y-auto wco-scroll mt-4">
    <div class="max-w-4xl mx-auto space-y-8">
      <!-- Pricing Summary -->
      <div class="bg-white/50 rounded-[2rem] border border-rose-100/50 p-8 backdrop-blur-xl">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div class="text-center p-4 bg-rose-50/50 rounded-2xl">
            <p class="text-[9px] font-black text-rose-300 uppercase tracking-widest mb-1">Đơn giá thiệp</p>
            <p class="text-xl font-black text-rose-600">{{ formatPrice(unitPrice) }}</p>
          </div>
          <div class="text-center">
            <p class="text-[9px] font-black text-rose-300 uppercase tracking-widest mb-2">Số lượng thiệp</p>
            <input type="number" :value="quantity" @input="$emit('update:quantity', Number(($event.target as HTMLInputElement).value))"
              min="1" class="w-full h-14 bg-white border-2 border-rose-100 rounded-xl text-center text-2xl font-black text-rose-600 focus:border-rose-500 focus:outline-none" />
          </div>
          <div class="text-center p-4 bg-rose-50/50 rounded-2xl">
            <p class="text-[9px] font-black text-rose-300 uppercase tracking-widest mb-1">Tổng tạm tính</p>
            <p class="text-xl font-black text-rose-600">{{ formatPrice(totalPrice) }}</p>
          </div>
        </div>

        <!-- Delivery Type -->
        <div class="flex items-center gap-2 mb-4">
          <div class="w-1.5 h-5 bg-indigo-500 rounded-full"></div>
          <span class="text-[10px] font-black text-rose-800 uppercase tracking-widest">Loại gửi thiệp</span>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div @click="$emit('update:deliveryType', 'static')"
            class="p-5 rounded-2xl border-2 cursor-pointer transition-all"
            :class="deliveryType === 'static' ? 'border-rose-500 bg-rose-50 shadow-lg' : 'border-rose-100 bg-white/60 hover:border-rose-200'">
            <div class="flex items-center justify-between mb-2">
              <h4 class="text-sm font-black text-rose-900 uppercase">Thiệp Tĩnh</h4>
              <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                :class="deliveryType === 'static' ? 'border-rose-500 bg-rose-500' : 'border-rose-200'">
                <Check v-if="deliveryType === 'static'" :size="12" class="text-white" />
              </div>
            </div>
            <p class="text-[10px] text-rose-400 font-medium">Bạn tự gửi thiệp cho khách mời</p>
            <p class="text-rose-500 font-black text-xs mt-2">+0đ / thiệp</p>
          </div>
          <div @click="$emit('update:deliveryType', 'auto')"
            class="p-5 rounded-2xl border-2 cursor-pointer transition-all"
            :class="deliveryType === 'auto' ? 'border-rose-500 bg-rose-50 shadow-lg' : 'border-rose-100 bg-white/60 hover:border-rose-200'">
            <div class="flex items-center justify-between mb-2">
              <h4 class="text-sm font-black text-rose-900 uppercase">Gửi Tự Động</h4>
              <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                :class="deliveryType === 'auto' ? 'border-rose-500 bg-rose-500' : 'border-rose-200'">
                <Check v-if="deliveryType === 'auto'" :size="12" class="text-white" />
              </div>
            </div>
            <p class="text-[10px] text-rose-400 font-medium">Hệ thống tự động gửi đến từng khách</p>
            <p class="text-rose-500 font-black text-xs mt-2">+500đ / thiệp</p>
          </div>
        </div>

        <!-- Total -->
        <div class="mt-6 flex items-center justify-between p-4 bg-rose-500/5 rounded-2xl border border-rose-200/50">
          <span class="text-xs font-black text-rose-800 uppercase tracking-widest">Tổng thanh toán</span>
          <span class="text-2xl font-black text-rose-600">{{ formatPrice(totalPrice) }}</span>
        </div>
      </div>

      <!-- Guest List Import -->
      <div class="bg-white/50 rounded-[2rem] border border-rose-100/50 p-8 backdrop-blur-xl">
        <div class="flex items-center gap-2 mb-6">
          <div class="w-1.5 h-5 bg-emerald-500 rounded-full"></div>
          <span class="text-[10px] font-black text-rose-800 uppercase tracking-widest">Danh sách khách mời (Excel/CSV)</span>
        </div>

        <div class="flex items-center gap-4 mb-6">
          <button @click="$emit('download')"
            class="flex items-center gap-2 px-6 py-3 bg-white border border-rose-100 rounded-xl text-[10px] font-black text-rose-600 uppercase tracking-widest hover:bg-rose-50 transition-colors">
            <Download :size="16" /> Tải mẫu CSV
          </button>
          <label class="flex items-center gap-2 px-6 py-3 bg-rose-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest cursor-pointer hover:bg-rose-600 transition-colors shadow-lg">
            <Upload :size="16" /> Import file
            <input type="file" accept=".csv,.xlsx,.xls" class="hidden" @change="handleFileSelect" />
          </label>
        </div>

        <!-- Imported data preview -->
        <div v-if="guestList.length > 0" class="space-y-4">
          <div class="flex items-center justify-between">
            <p class="text-xs font-bold text-rose-600">{{ guestList.length }} khách mời đã import</p>
            <button @click="$emit('validate')" :disabled="isValidatingGuests"
              class="px-6 py-2 bg-emerald-500 text-white rounded-lg text-[10px] font-black uppercase tracking-widest disabled:opacity-50 hover:bg-emerald-600 transition-colors">
              {{ isValidatingGuests ? 'Đang kiểm tra...' : 'Kiểm tra dữ liệu' }}
            </button>
          </div>

          <!-- Preview table -->
          <div class="max-h-[200px] overflow-y-auto rounded-xl border border-rose-100 wco-scroll">
            <table class="w-full text-left">
              <thead class="sticky top-0 bg-rose-50">
                <tr class="text-[9px] font-black uppercase tracking-widest text-rose-400">
                  <th class="p-3">#</th><th class="p-3">Họ tên</th><th class="p-3">SĐT</th><th class="p-3">Email</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(g, i) in guestList.slice(0, 20)" :key="i" class="border-t border-rose-50 text-xs text-rose-800">
                  <td class="p-3 font-bold text-rose-400">{{ i + 1 }}</td>
                  <td class="p-3 font-bold">{{ g.name }}</td>
                  <td class="p-3">{{ g.phone }}</td>
                  <td class="p-3">{{ g.email }}</td>
                </tr>
              </tbody>
            </table>
            <p v-if="guestList.length > 20" class="text-center text-[10px] text-rose-300 py-2">...và {{ guestList.length - 20 }} khách nữa</p>
          </div>

          <!-- Validation result -->
          <div v-if="guestValidation" class="p-4 rounded-xl" :class="guestValidation.valid ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200'">
            <p v-if="guestValidation.valid" class="text-xs font-bold text-emerald-600 flex items-center gap-2">
              <Check :size="16" /> Dữ liệu hợp lệ! Bạn có thể tiếp tục thanh toán.
            </p>
            <div v-else>
              <p class="text-xs font-bold text-red-600 mb-2">Có lỗi cần sửa:</p>
              <ul class="space-y-1">
                <li v-for="(err, i) in guestValidation.errors.slice(0, 5)" :key="i" class="text-[10px] text-red-500">• {{ err }}</li>
              </ul>
              <p v-if="guestValidation.errors.length > 5" class="text-[10px] text-red-400 mt-1">...và {{ guestValidation.errors.length - 5 }} lỗi khác</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-8 flex justify-center gap-4">
      <button @click="$emit('back')" class="px-8 py-3 text-rose-300 font-bold uppercase tracking-widest text-[10px] hover:text-rose-500">Quay lại</button>
      <button @click="$emit('next')" :disabled="!canGoToPayment"
        class="px-12 py-3 bg-rose-500 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-rose-600 transition-colors">
        Thanh Toán
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Check, Download, Upload } from 'lucide-vue-next';
import type { GuestRow } from '../composables/useCardOrder';

defineProps<{
  quantity: number;
  deliveryType: string;
  unitPrice: number;
  autoFee: number;
  totalPerCard: number;
  totalPrice: number;
  guestList: GuestRow[];
  guestValidation: { valid: boolean; errors: string[] } | null;
  isValidatingGuests: boolean;
  formatPrice: (p: number) => string;
  canGoToPayment: boolean;
}>();

const emit = defineEmits(['update:quantity', 'update:deliveryType', 'back', 'next', 'download', 'import', 'validate']);

const handleFileSelect = (e: Event) => {
  const input = e.target as HTMLInputElement;
  if (input.files?.[0]) {
    emit('import', input.files[0]);
    input.value = '';
  }
};
</script>

<style scoped>
.wco-scroll::-webkit-scrollbar { width: 4px; }
.wco-scroll::-webkit-scrollbar-thumb { background: rgba(244,63,94,0.2); border-radius: 10px; }
</style>
