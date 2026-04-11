<template>
  <div
    class="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4 animate-in fade-in"
  >
    <div
      class="mt-10 bg-[#0a0a0f] p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/10 relative overflow-hidden max-w-md w-full fade-in shadow-[0_0_30px_rgba(168,85,247,0.05)]"
    >
      <div class="text-center mb-6">
        <div
          class="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <LockIcon v-if="!isSetup" class="w-8 h-8 text-gray-400" />
          <ShieldPlusIcon v-else class="w-8 h-8 text-gold-vibrant" />
        </div>
        <h4 class="text-xl font-bold">
          {{ isSetup ? "Thiết lập" : "Xác thực" }} bảo mật ví {{ pendingAsset }}
        </h4>
        <p class="text-sm text-gray-500 mt-2">
          {{
            isSetup
              ? "Vui lòng tạo mật mã 6 số để bảo vệ dữ liệu ví của bạn."
              : "Vui lòng nhập mật mã bảo mật để truy cập dữ liệu ví."
          }}
        </p>
      </div>

      <form @submit.prevent="$emit('submit')" class="space-y-4">
        <div>
          <input
            type="password"
            :value="modelValue"
            @input="
              $emit(
                'update:modelValue',
                ($event.target as HTMLInputElement).value,
              )
            "
            :placeholder="
              isSetup ? 'Tạo 6 số bảo mật' : 'Nhập 6 số bảo mật (vd: 123456)'
            "
            class="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-center tracking-widest"
            maxlength="6"
            autofocus
          />
          <p v-if="error" class="text-red-500 text-xs mt-2 text-center">
            {{ error }}
          </p>
        </div>
        <div class="flex gap-3">
          <button
            type="button"
            @click="$emit('cancel')"
            class="flex-1 py-3 text-sm font-bold bg-white/5 hover:bg-white/10 rounded-xl transition-all"
          >
            Hủy
          </button>
          <button
            type="submit"
            class="flex-1 py-3 text-sm font-bold bg-purple-600 hover:bg-purple-500 rounded-xl transition-all shadow-lg shadow-purple-500/20 text-white"
          >
            {{ isSetup ? "Thiết lập" : "Mở Khóa" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Lock as LockIcon, ShieldPlus as ShieldPlusIcon } from "lucide-vue-next";

defineProps<{
  pendingAsset: string | null;
  error: string;
  modelValue: string;
  isSetup?: boolean;
}>();

defineEmits(["update:modelValue", "submit", "cancel"]);
</script>
