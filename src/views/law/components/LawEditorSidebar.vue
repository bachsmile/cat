<script setup lang="ts">
import { Trash2 as TrashIcon } from "lucide-vue-next";

const props = defineProps<{
  form: any;
}>();

const emit = defineEmits(["addField", "insertPlaceholder", "removeField"]);

const addField = () => {
  emit("addField");
};

const removeField = (idx: number) => {
  if (confirm("Bạn có chắc muốn xóa trường thông tin này khỏi mẫu đơn?")) {
    emit("removeField", idx);
  }
};

const insertPlaceholder = (name: string) => {
  emit("insertPlaceholder", name);
};
</script>

<template>
  <div
    class="h-full space-y-4 bg-[#050508] border-r border-white/5 p-5 overflow-y-auto scrollbar-hide shadow-inner"
  >
    <div
      class="bg-[#0a0a0f] border border-white/5 p-6 rounded-3xl shadow-xl space-y-4"
    >
      <h4
        class="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] border-b border-white/5 pb-2"
      >
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

    <div
      class="bg-[#0a0a0f] border border-white/5 p-5 rounded-3xl shadow-xl space-y-4"
    >
      <div
        class="flex items-center justify-between border-b border-white/5 pb-2"
      >
        <h4
          class="text-[10px] font-black text-teal-400 uppercase tracking-[0.2em]"
        >
          Form Fields
        </h4>
        <button
          @click="addField"
          class="text-[9px] font-black text-gray-500 hover:text-white uppercase"
        >
          + Thêm
        </button>
      </div>
      <div class="space-y-4">
        <div
          v-for="(field, idx) in form.config.fields"
          :key="field.name || idx"
          class="p-5 bg-white/[0.03] border border-white/5 rounded-3xl space-y-4 group/field relative transition-all hover:bg-white/[0.05] hover:border-teal-500/20 active:scale-[0.98]"
        >
          <!-- Delete Button -->
          <button
            @click.stop="removeField(Number(idx))"
            class="absolute top-4 right-4 z-50 text-gray-500 hover:text-red-400 opacity-0 group-hover/field:opacity-100 transition-all duration-300 transform group-hover/field:translate-x-0 translate-x-1 p-2"
          >
            <TrashIcon class="w-4 h-4" />
          </button>

          <!-- Field Config Header -->
          <div class="flex items-center gap-3 mb-1">
             <div class="w-6 h-6 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-500 text-[10px] font-black">
                {{ Number(idx) + 1 }}
             </div>
             <span class="text-[9px] font-black text-gray-500 uppercase tracking-widest">Cấu hình trường</span>
          </div>

          <!-- Basic Inputs -->
          <div class="space-y-3">
            <div class="space-y-1">
              <label class="text-[8px] font-bold text-gray-600 uppercase tracking-widest ml-1">Tên hiển thị (Label)</label>
              <input
                v-model="field.label"
                placeholder="Ví dụ: Họ và tên..."
                class="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-teal-500/50 transition-all"
              />
            </div>
            
            <div class="space-y-1">
              <label class="text-[8px] font-bold text-gray-600 uppercase tracking-widest ml-1">Mã định danh (Slug/Key)</label>
              <input
                v-model="field.name"
                placeholder="Ví dụ: full_name"
                class="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-teal-500/50 transition-all text-teal-400 font-mono"
              />
            </div>
          </div>

          <!-- Type & Action -->
          <div class="flex gap-2">
            <div class="flex-1 space-y-1">
              <label class="text-[8px] font-bold text-gray-600 uppercase tracking-widest ml-1">Loại dữ liệu</label>
              <select
                v-model="field.type"
                class="w-full bg-black/60 border border-white/5 rounded-xl px-3 py-2 text-[10px] outline-none text-gray-300"
              >
                <option value="text">Văn bản (Dòng đơn)</option>
                <option value="textarea">Đoạn văn (Nhiều dòng)</option>
                <option value="date">Ngày tháng</option>
                <option value="number">Số lượng</option>
              </select>
            </div>
            <div class="flex flex-col justify-end">
              <button
                @click="insertPlaceholder(field.name)"
                class="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-[10px] font-black uppercase transition-all shadow-lg shadow-teal-500/20 active:scale-95 whitespace-nowrap"
              >
                Chèn biến
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
