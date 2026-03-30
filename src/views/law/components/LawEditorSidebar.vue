<script setup lang="ts">
import {
  Trash2 as TrashIcon,
} from "lucide-vue-next";

const props = defineProps<{
  form: any;
}>();

const emit = defineEmits(["addField", "insertPlaceholder", "removeField"]);

const addField = () => {
  emit("addField");
};

const removeField = (idx: number) => {
  emit("removeField", idx);
};

const insertPlaceholder = (name: string) => {
  emit("insertPlaceholder", name);
};
</script>

<template>
  <div class="h-full space-y-4 bg-[#050508]/100 border-r border-white/5 p-4 overflow-y-auto scrollbar-hide">
    <div class="bg-[#0a0a0f] border border-white/5 p-6 rounded-3xl shadow-xl space-y-4">
      <h4 class="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] border-b border-white/5 pb-2">
        Thông tin mẫu
      </h4>
      <div class="space-y-4">
        <input
          v-model="form.title"
          class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500 transition-all font-bold"
          placeholder="Tiêu đề mẫu"
        />
        <select
          v-model="form.type"
          class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500 text-white appearance-none"
        >
          <option value="Complaint">Đơn khởi kiện</option>
          <option value="Contract">Hợp đồng mẫu</option>
          <option value="Other">Khác</option>
        </select>
        <textarea
          v-model="form.content"
          rows="3"
          class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500 resize-none transition-all"
          placeholder="Mô tả mẫu..."
        ></textarea>
      </div>
    </div>

    <div class="bg-[#0a0a0f] border border-white/5 p-5 rounded-3xl shadow-xl space-y-4">
      <div class="flex items-center justify-between border-b border-white/5 pb-2">
        <h4 class="text-[10px] font-black text-teal-400 uppercase tracking-[0.2em]">
          Form Fields
        </h4>
        <button
          @click="addField"
          class="text-[9px] font-black text-gray-500 hover:text-white uppercase"
        >
          + Thêm
        </button>
      </div>
      <div class="space-y-3">
        <div
          v-for="(field, idx) in form.config.fields"
          :key="idx"
          class="p-4 bg-white/[0.02] border border-white/5 rounded-2xl space-y-3 group/field relative transition-all"
        >
          <button
            @click="removeField(idx)"
            class="absolute top-2 right-2 text-gray-700 hover:text-red-500 opacity-0 group-hover/field:opacity-100"
          >
            <TrashIcon class="w-3" />
          </button>
          <div class="grid grid-cols-2 gap-2">
            <input
              v-model="field.label"
              placeholder="Nhãn"
              class="bg-transparent border-b border-white/5 py-1 text-[10px] outline-none"
            />
            <input
              v-model="field.name"
              placeholder="Key"
              class="bg-transparent border-b border-white/5 py-1 text-[10px] outline-none text-teal-400 font-mono"
            />
          </div>
          <div class="flex gap-2">
            <select
              v-model="field.type"
              class="flex-1 bg-black/40 border border-white/5 rounded-lg py-1 text-[10px] outline-none"
            >
              <option value="text">Text</option>
              <option value="textarea">Textarea</option>
            </select>
            <button
              @click="insertPlaceholder(field.name)"
              class="px-3 py-1 bg-teal-500 text-white rounded-lg text-[9px] font-black uppercase transition-all shadow-md shadow-teal-500/10"
            >
              Insert
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
