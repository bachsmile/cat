<template>
  <div v-if="show" class="fixed inset-0 z-[500] flex items-center justify-center p-4">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-black/80 backdrop-blur-xl" @click="close"></div>

    <!-- Modal Content -->
    <div 
      class="relative w-full max-w-lg bg-[#0a0a0c] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.8)] animate-entrance"
    >
      <!-- Header -->
      <div class="px-8 pt-8 pb-4 flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-black text-white italic tracking-tighter uppercase">Náº¡p Tiá»n <span class="text-rose-500">VÃ o VÃ­</span></h2>
          <p class="text-[10px] text-white/40 font-black uppercase tracking-widest mt-1">Giao dá»‹ch an toÃ n & báº£o máº­t</p>
        </div>
        <button @click="close" class="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 transition-all">
          <X :size="20" />
        </button>
      </div>

      <!-- Step 1: Input Amount -->
      <div v-if="step === 1" class="p-8 space-y-6">
        <div class="space-y-4">
          <label class="text-[10px] font-black text-rose-400 uppercase tracking-widest block pl-2">Sá»‘ tiá»n cáº§n náº¡p (VNÄ)</label>
          <div class="relative group">
            <input 
              v-model="amount"
              type="number"
              placeholder="VÃ­ dá»¥: 500,000"
              class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xl font-bold text-white placeholder:text-white/10 focus:outline-none focus:border-rose-500/50 transition-all"
            />
            <div class="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 font-black italic">VND</div>
          </div>
          <div class="grid grid-cols-3 gap-3">
            <button 
              v-for="val in [100000, 500000, 1000000]" 
              :key="val"
              @click="amount = val"
              class="py-2.5 rounded-xl border border-white/5 bg-white/5 text-[10px] font-black text-white/60 hover:bg-white/10 hover:text-white transition-all uppercase tracking-widest"
            >
              +{{ (val/1000) }}k
            </button>
          </div>
        </div>

        <button 
          @click="nextStep"
          :disabled="!amount || amount <= 0"
          class="w-full py-4 bg-rose-500 text-white rounded-2xl text-sm font-black uppercase tracking-[0.2em] hover:bg-rose-600 disabled:opacity-20 disabled:cursor-not-allowed transition-all shadow-[0_10px_30px_rgba(244,63,94,0.3)] flex items-center justify-center gap-3"
        >
          Tiáº¿p tá»¥c <ArrowRight :size="18" />
        </button>
      </div>

      <!-- Step 2: Payment & Proof -->
      <div v-else class="p-8 space-y-6">
        <!-- QR Code -->
        <div class="relative group aspect-square max-w-[280px] mx-auto bg-white rounded-3xl p-4 shadow-2xl">
           <img :src="qrPay" class="w-full h-full object-contain" />
           <div class="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black rounded-full border border-white/10 text-[9px] font-black text-rose-400 uppercase tracking-widest whitespace-nowrap shadow-xl">
             QuÃ©t Ä‘á»ƒ thanh toÃ¡n
           </div>
        </div>

        <!-- Order Summary -->
        <div class="bg-white/5 rounded-2xl p-4 border border-white/5 flex items-center justify-between">
           <div>
             <p class="text-[8px] font-black text-white/30 uppercase tracking-widest">Ná»™i dung chuyá»ƒn tiá»n: </p>
             <p class="text-sm font-bold text-white italic">NAPTIEN_{{ userEmail?.split('@')[0] }}</p>
           </div>
           <div class="text-right">
             <p class="text-[8px] font-black text-white/30 uppercase tracking-widest">Sá»‘ tiá»n: </p>
             <p class="text-lg font-black text-emerald-400 italic tracking-tighter">{{ amount.toLocaleString() }}Ä‘</p>
           </div>
        </div>

        <!-- Proof Upload -->
        <div class="space-y-4">
           <p class="text-[10px] font-black text-rose-400 uppercase tracking-widest pl-2">Gá»­i áº£nh hoÃ¡ Ä‘Æ¡n xÃ¡c nháº­n</p>
           <div 
             @click="openFilePicker"
             class="relative border-2 border-dashed border-white/10 rounded-2xl p-6 text-center cursor-pointer hover:bg-white/5 hover:border-rose-500/30 transition-all group"
           >
              <input type="file" ref="fileInput" class="hidden" accept="image/*" @change="handleFileChange" />
              
              <div v-if="!proofPreview" class="flex flex-col items-center gap-3 py-4">
                 <Camera :size="32" class="text-white/10 group-hover:text-rose-400/50 transition-all" />
                 <p class="text-[10px] font-black text-white/20 uppercase tracking-widest">Chá»n hoáº·c kÃ©o áº£nh vÃ o Ä‘Ã¢y</p>
              </div>
              <div v-else class="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-white/10">
                 <img :src="proofPreview" class="w-full h-full object-cover" />
                 <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <p class="text-[9px] font-black text-white uppercase tracking-widest">Thay Ä‘á»•i áº£nh</p>
                 </div>
              </div>
           </div>
        </div>

        <button 
          @click="submitDeposit"
          :disabled="!proofImage || loading"
          class="w-full py-4 bg-emerald-500 text-white rounded-2xl text-sm font-black uppercase tracking-[0.2em] hover:bg-emerald-600 disabled:opacity-20 disabled:cursor-not-allowed transition-all shadow-[0_10px_30px_rgba(16,185,129,0.3)] flex items-center justify-center gap-3"
        >
          <span v-if="loading" class="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
          <template v-else>XÃ¡c nháº­n náº¡p tiá»n <Check :size="18" /></template>
        </button>
      </div>

      <!-- Footer / Notes -->
      <div class="px-8 pb-8 text-center">
        <p class="text-[9px] text-white/20 font-medium leading-relaxed italic">
          * Tiá»n sáº½ Ä‘Æ°á»£c cá»™ng vÃ o sá»‘ dÆ° nhÆ°ng á»Ÿ tráº¡ng thÃ¡i <span class="text-rose-400 font-black">Ä‘Ã³ng bÄƒng</span> cho Ä‘áº¿n khi Ä‘Æ°á»£c Admin xÃ©t duyá»‡t. Quy trÃ¬nh nÃ y thÆ°á»ng máº¥t 2-5 phÃºt.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { X, ArrowRight, Camera, Check } from "lucide-vue-next";
import qrPay from "@/assets/images/QR_Pay.jpg";
import api from "@/api/client";
import { useToast } from "@/composables/useToast";

const props = defineProps<{
  show: boolean;
  userEmail: string;
}>();

const emit = defineEmits(["close", "success"]);

const step = ref(1);
const amount = ref<number | "">("");
const proofImage = ref<File | null>(null);
const proofPreview = ref<string | null>(null);
const loading = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);
const { showToast } = useToast();

const nextStep = () => {
    if (Number(amount.value) > 0) step.value = 2;
};

const close = () => {
    step.value = 1;
    amount.value = "";
    proofImage.value = null;
    proofPreview.value = null;
    emit("close");
};

const openFilePicker = () => {
    fileInput.value?.click();
};

const handleFileChange = (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
        proofImage.value = file;
        const reader = new FileReader();
        reader.onload = (e) => { proofPreview.value = e.target?.result as string; };
        reader.readAsDataURL(file);
    }
};

const submitDeposit = async () => {
    if (!amount.value || !proofImage.value) return;
    
    loading.value = true;
    try {
        // In a real app, you'd upload the file to S3/Cloudinary first.
        // Here we'll just send the base64 or a mock URL for demo.
        const formData = new FormData();
        formData.append('amount', amount.value.toString());
        formData.append('proofImage', proofPreview.value || ''); // Sending base64 for simplicity in this demo
        
        // Actually the backend endpoint I created expects JSON for now
        // I'll use JSON with base64 for this demo
        await api.post('/wallet/deposit', {
            amount: amount.value,
            proofImage: proofPreview.value,
            note: `Náº¡p tiá»n tá»« ${props.userEmail}`
        });

        showToast("ÄÃ£ gá»­i yÃªu cáº§u náº¡p tiá»n! Vui lÃ²ng chá» Admin duyá»‡t.", "success");
        emit("success");
        close();
    } catch (e) {
        showToast("Lá»—i khi gá»­i yÃªu cáº§u", "error");
    } finally {
        loading.value = false;
    }
};
</script>

<style scoped>
.animate-entrance {
  animation: entrance 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes entrance {
  from { opacity: 0; transform: scale(0.9) translateY(20px); filter: blur(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
}
</style>


