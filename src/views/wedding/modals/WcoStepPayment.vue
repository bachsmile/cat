<template>
  <div class="flex-1 flex items-center justify-center p-8 relative z-10 animate-entrance">
    <div class="w-full max-w-4xl bg-white/60 backdrop-blur-3xl rounded-[3.5rem] border border-white/80 shadow-2xl overflow-hidden flex flex-col md:flex-row">
      <!-- Invoice -->
      <div class="flex-1 p-10">
        <h3 class="text-2xl font-black text-rose-950 uppercase italic tracking-tighter mb-6">Hoa Don Thanh Toan</h3>
        <div class="space-y-3">
          <div class="flex justify-between py-3 border-b border-rose-50">
            <span class="text-[10px] font-bold text-rose-300 uppercase tracking-widest">Mau thiep</span>
            <span class="text-sm font-black text-rose-800 uppercase italic">{{ selectedTheme?.name || '-' }}</span>
          </div>
          <div class="flex justify-between py-3 border-b border-rose-50">
            <span class="text-[10px] font-bold text-rose-300 uppercase tracking-widest">Don gia</span>
            <span class="text-sm font-black text-rose-800">{{ formatPrice(unitPrice) }}</span>
          </div>
          <div class="flex justify-between py-3 border-b border-rose-50">
            <span class="text-[10px] font-bold text-rose-300 uppercase tracking-widest">Loai gui</span>
            <span class="text-sm font-black" :class="deliveryType === 'auto' ? 'text-indigo-600' : 'text-rose-800'">
              {{ deliveryType === 'auto' ? 'Tu dong (+500d/thiep)' : 'Tinh' }}
            </span>
          </div>
          <div class="flex justify-between py-3 border-b border-rose-50">
            <span class="text-[10px] font-bold text-rose-300 uppercase tracking-widest">So luong</span>
            <span class="text-sm font-black text-rose-800">{{ quantity }} thiep</span>
          </div>
          <div class="flex justify-between items-center pt-6">
            <span class="text-xs font-black text-rose-950 uppercase tracking-widest">Tong Thanh Toan</span>
            <span class="text-3xl font-black text-rose-600 tracking-tighter">{{ formatPrice(totalPrice) }}</span>
          </div>
        </div>

        <div v-if="isWalletPayment" class="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 space-y-2">
          <p class="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Thanh toan bang vi Wallet</p>
          <div class="flex justify-between text-xs font-bold text-emerald-700">
            <span>So du hien tai</span>
            <span>{{ formatPrice(walletBalance) }}</span>
          </div>
          <div class="flex justify-between text-xs font-bold text-emerald-700">
            <span>So du sau thanh toan</span>
            <span>{{ formatPrice(remainingWalletBalance) }}</span>
          </div>
          <p class="text-[10px] text-emerald-600">He thong se tru vi va tao don hang khi bam hoan tat.</p>
        </div>

        <!-- Payment Receipt Upload -->
        <div v-else class="mt-8">
          <div class="flex items-center gap-2 mb-3">
            <div class="w-1.5 h-5 bg-amber-500 rounded-full"></div>
            <span class="text-[10px] font-black text-rose-800 uppercase tracking-widest">Dinh kem hoa don thanh toan</span>
          </div>
          <label class="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-2xl cursor-pointer transition-all"
            :class="paymentReceipt ? 'border-emerald-300 bg-emerald-50/30' : 'border-rose-200 hover:border-rose-400 hover:bg-rose-50/30'">
            <div v-if="paymentReceipt" class="flex items-center gap-3">
              <img :src="paymentReceipt" class="w-16 h-16 rounded-xl object-cover border border-emerald-200" />
              <div>
                <p class="text-xs font-bold text-emerald-600">Da tai len</p>
                <p class="text-[10px] text-emerald-400">Bam de thay doi</p>
              </div>
            </div>
            <div v-else class="text-center">
              <Upload :size="24" class="text-rose-300 mx-auto mb-2" />
              <p class="text-[10px] font-bold text-rose-400 uppercase tracking-widest">Tai anh chuyen khoan</p>
            </div>
            <input type="file" accept="image/*" class="hidden" @change="onFileChange" />
          </label>
        </div>

        <div class="mt-8 space-y-3">
          <button @click="$emit('submit')" :disabled="!canFinish || isSubmitting"
            class="w-full h-14 bg-rose-600 text-white rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-rose-700 transition-colors active:scale-[0.98]">
            {{ isSubmitting ? 'Dang xu ly...' : isWalletPayment ? 'Thanh Toan Bang Vi' : 'Hoan Tat Thanh Toan' }}
          </button>
          <button @click="$emit('back')" class="w-full py-3 text-rose-300 text-[10px] uppercase font-black tracking-widest hover:text-rose-500 transition-colors">Quay lai</button>
        </div>
      </div>

      <!-- QR Code -->
      <div v-if="!isWalletPayment" class="w-full md:w-72 bg-rose-50/50 p-10 flex flex-col items-center justify-center text-center">
        <div class="w-44 h-44 bg-white p-3 rounded-3xl shadow-xl border border-rose-100 mb-4 flex items-center justify-center">
          <img :src="`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=WEDDING_PAYMENT_${totalPrice}`" class="w-full h-full object-contain mix-blend-multiply opacity-80" alt="QR" />
        </div>
        <p class="text-[10px] font-black text-rose-400 uppercase tracking-widest flex items-center gap-2"><CreditCard :size="14" /> Quet ma thanh toan</p>
        <div class="mt-6 p-3 bg-white/80 rounded-2xl border border-rose-100 w-full text-[9px] font-bold uppercase">
          <p class="text-rose-300">STK: <span class="text-rose-600">0396 888 888</span></p>
          <p class="text-rose-300">Bank: <span class="text-rose-600">TECHCOMBANK</span></p>
        </div>
        <div class="mt-4 p-3 bg-rose-500/10 rounded-xl w-full">
          <p class="text-[9px] font-black text-rose-600 uppercase">So tien: {{ formatPrice(totalPrice) }}</p>
        </div>
      </div>

      <div v-else class="w-full md:w-72 bg-emerald-50/60 p-10 flex flex-col items-center justify-center text-center border-l border-emerald-100">
        <div class="w-20 h-20 rounded-3xl bg-emerald-500 text-white flex items-center justify-center text-3xl font-black mb-4">V</div>
        <p class="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Uu tien thanh toan bang Wallet</p>
        <p class="mt-3 text-xs font-bold text-emerald-700">So du vi du de thanh toan don hang nay.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Upload, CreditCard } from 'lucide-vue-next';
import type { CardTheme } from '../composables/useCardOrder';

const props = defineProps<{
  totalPrice: number;
  formatPrice: (p: number) => string;
  quantity: number;
  selectedTheme: CardTheme | null;
  deliveryType: string;
  unitPrice: number;
  autoFee: number;
  walletBalance: number;
  isWalletPayment: boolean;
  paymentReceipt: string;
  isSubmitting: boolean;
  canFinish: boolean;
}>();

const emit = defineEmits(['back', 'receipt', 'submit']);

const remainingWalletBalance = computed(() => Math.max(0, props.walletBalance - props.totalPrice));

const onFileChange = (e: Event) => {
  const input = e.target as HTMLInputElement;
  if (input.files?.[0]) {
    emit('receipt', input.files[0]);
    input.value = '';
  }
};
</script>

<style scoped>
.animate-entrance { animation: entrance 0.6s cubic-bezier(0.16,1,0.3,1) forwards; }
@keyframes entrance { from { opacity: 0; transform: translateY(20px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
</style>
