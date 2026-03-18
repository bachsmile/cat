<template>
  <Transition name="fade">
    <div v-if="show" class="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-md p-6">
      <div class="bg-[#0a0a0f] border border-white/10 w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-3xl animate-in zoom-in duration-300">
        <!-- Header -->
        <div class="p-8 border-b border-white/5 flex items-center justify-between">
          <div>
            <h3 class="text-2xl font-black italic">ĐIỀN THÔNG TIN THỬ NGHIỆM</h3>
            <p class="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Cung cấp dữ liệu để xem trước mẫu đơn hoàn chỉnh</p>
          </div>
          <button @click="$emit('close')" class="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all">
            <XIcon class="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <!-- Body -->
        <div class="p-8 max-h-[60vh] overflow-y-auto custom-scroll space-y-6">
          <div v-for="field in fields" :key="field.key" class="space-y-2">
            <label class="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">{{ field.label }}</label>
            <input 
              v-model="formData[field.key]"
              class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-red-500/50 transition-all"
              placeholder="..."
            />
          </div>

          <div v-if="fields.length === 0" class="py-12 text-center space-y-4 grayscale opacity-40">
            <AlertCircleIcon class="w-12 h-12 mx-auto text-gray-400" />
            <p class="text-[10px] font-bold uppercase tracking-widest">Không tìm thấy trường dữ liệu nào</p>
          </div>
        </div>

        <!-- Footer -->
        <div class="p-8 border-t border-white/5 flex gap-4">
          <button 
            @click="$emit('close')" 
            class="flex-1 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl border border-white/10 transition-all uppercase text-xs tracking-widest"
          >
            Hủy bỏ
          </button>
          <button 
            @click="handleSubmit"
            :disabled="fields.length === 0"
            class="flex-[2] px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-black rounded-2xl transition-all shadow-xl shadow-red-500/20 uppercase text-xs tracking-widest italic disabled:opacity-50"
          >
            XEM TRƯỚC PDF
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { X as XIcon, AlertCircle as AlertCircleIcon } from 'lucide-vue-next';

interface Field {
  label: string;
  key: string;
  type: string;
}

const props = defineProps<{
  show: boolean;
  fields: Field[];
}>();

const emit = defineEmits(['close', 'submit']);

const formData = ref<Record<string, string>>({});

onMounted(() => {
  props.fields.forEach(f => {
    formData.value[f.key] = '';
  });
});

const handleSubmit = () => {
  emit('submit', formData.value);
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.custom-scroll::-webkit-scrollbar { width: 4px; }
.custom-scroll::-webkit-scrollbar-track { background: transparent; }
.custom-scroll::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
</style>
