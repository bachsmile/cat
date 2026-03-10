<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050508]/80 backdrop-blur-sm animate-in fade-in duration-300"
  >
    <div
      class="bg-[#0a0a0f] w-full max-w-lg rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300"
    >
      <!-- Header -->
      <div
        class="p-8 pb-4 flex justify-between items-center border-b border-white/5"
      >
        <div>
          <h3 class="text-2xl font-black tracking-tight text-blue-400">
            🎁 Nhận {{ selectedAsset }}
          </h3>
          <p
            class="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1"
          >
            Ghi nhận token được tặng/thưởng
          </p>
        </div>
        <button
          @click="$emit('close')"
          class="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/5"
        >
          <XIcon class="w-5 h-5 text-gray-400" />
        </button>
      </div>

      <!-- Form -->
      <div class="p-8 space-y-8">
        <div class="space-y-4">
          <label
            class="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-2"
          >
            Số lượng nhận
          </label>
          <div class="relative group">
            <input
              type="text"
              inputmode="decimal"
              v-model="displayQuantity"
              placeholder="0.00"
              class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-2xl font-black focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-700"
              autofocus
            />
            <div
              class="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2"
            >
              <span class="text-sm font-black text-gray-400">{{
                selectedAsset
              }}</span>
            </div>
          </div>
        </div>

        <div class="bg-blue-500/5 rounded-2xl p-6 border border-blue-500/10">
          <div class="flex items-center gap-4">
            <div
              class="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center"
            >
              <InfoIcon class="w-5 h-5 text-blue-400" />
            </div>
            <p class="text-xs text-gray-400 font-medium leading-relaxed">
              Token nhận sẽ được tính với
              <span class="text-white font-bold">giá vốn = 0</span>. Bạn có thể
              chọn có tính số lượng này vào phân tích lợi nhuận hay không ở màn
              hình chính.
            </p>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="p-8 pt-0">
        <button
          @click="handleSubmit"
          :disabled="!displayQuantity || Number(displayQuantity.replace(',', '.')) <= 0"
          class="w-full py-5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20 text-white rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3"
        >
          <span>Xác Nhận Nhận Token</span>
          <CheckIcon class="w-5 h-5" />
        </button>
      </div>

      <!-- Decorative -->
      <div
        class="absolute -bottom-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-[60px] pointer-events-none"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  X as XIcon,
  Info as InfoIcon,
  Check as CheckIcon,
} from "lucide-vue-next";

const props = defineProps<{
  selectedAsset: string | null;
  formData: {
    quantity: number | null;
  };
}>();

const emit = defineEmits(["close", "submit", "update:formData"]);

const displayQuantity = ref(props.formData.quantity?.toString() || "");

const handleSubmit = () => {
  const finalValue = displayQuantity.value.replace(",", ".");
  emit("update:formData", { 
    quantity: finalValue === "" ? null : Number(finalValue) 
  });
  emit("submit");
};
</script>
