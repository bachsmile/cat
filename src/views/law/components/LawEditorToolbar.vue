<script setup lang="ts">
import {
  Type as TypeIcon,
  ChevronDown as ChevronDownIcon,
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Underline as UnderlineIcon,
  Table as TableIcon,
  Layout as LayoutIcon,
  Settings2 as Settings2Icon,
  Loader2 as Loader2Icon,
  AlignLeft as AlignLeftIcon,
  AlignCenter as AlignCenterIcon,
  AlignRight as AlignRightIcon,
  AlignJustify as AlignJustifyIcon,
  ArrowLeft as ArrowLeftIcon,
  MessageSquare as MessageSquareIcon,
  X as XIcon,
  List as ListIcon,
  ListOrdered as ListOrderedIcon,
  ArrowUpDown as LineHeightIcon,
} from "lucide-vue-next";
import { ref } from 'vue';

const props = defineProps<{
  selectedFont: string;
  selectedAlignment: string;
  selectedTextColor: string;
  selectedBgColor: string;
  isSaving: boolean;
  isEditing: boolean;
  showSidebar: boolean;
}>();

const emit = defineEmits([
  "update:selectedFont",
  "update:selectedAlignment",
  "update:selectedTextColor",
  "update:selectedBgColor",
  "update:showSidebar",
  "openBuilder",
  "openAlignModal",
  "insertTable",
  "save",
  "back"
]);

const showAlignMenu = ref(false);

const fontFamilies = [
  { name: "Times New Roman", value: "'Times New Roman', Times, serif" },
  { name: "Arial", value: "Arial, Helvetica, sans-serif" },
  { name: "Courier New", value: "'Courier New', Courier, monospace" },
  { name: "Georgia", value: "Georgia, serif" },
  { name: "Consolas", value: "'Consolas', 'Courier New', monospace" },
  { name: "Roboto", value: "Roboto, sans-serif" },
  { name: "Segoe UI", value: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" },
];

const lineHeightOptions = [
  { label: "Tiêu chuẩn (1.0)", value: "1.0" },
  { label: "Thoáng (1.2)", value: "1.2" },
  { label: "Mặc định (1.5)", value: "1.5" },
  { label: "Rộng (2.0)", value: "2.0" },
];

const alignOptions = [
  { label: "Trái", value: "left", icon: AlignLeftIcon },
  { label: "Giữa", value: "center", icon: AlignCenterIcon },
  { label: "Phải", value: "right", icon: AlignRightIcon },
  { label: "Căn đều", value: "justify", icon: AlignJustifyIcon },
];

const getAlignIcon = (val: string) => {
  return alignOptions.find((o) => o.value === val)?.icon || AlignLeftIcon;
};

// Rich Text formatting helpers
const format = (command: string, value?: string) => {
  document.execCommand(command, false, value || "");
};

const showLineHeightMenu = ref(false);

const applyLineHeight = (val: string) => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;
  
  const range = selection.getRangeAt(0);
  let element = range.commonAncestorContainer as any;
  if (element.nodeType === 3) element = element.parentElement;
  
  // Find nearest block parent
  while (element && !['DIV', 'P', 'TD', 'LI'].includes(element.tagName) && !element.getAttribute?.('contenteditable')) {
    element = element.parentElement;
  }
  
  if (element) {
    element.style.lineHeight = val;
    showLineHeightMenu.value = false;
  }
};

const noteCounter = ref(1);
const showTableGrid = ref(false);
const hoverCols = ref(0);
const hoverRows = ref(0);

const handleTableClick = (c: number, r: number) => {
  emit('insertTable', { cols: c, rows: r });
  showTableGrid.value = false;
};

const insertNote = () => {
  const noteNum = prompt("Nhập số thứ tự ghi chú:", noteCounter.value.toString()) || noteCounter.value.toString();
  const html = `<span style="color: #6366f1; font-weight: 800; cursor: help; border-bottom: 2px solid #6366f1; padding: 0 2px; margin: 0 2px;" title="Ghi chú (${noteNum})">(${noteNum})</span>`;
  document.execCommand('insertHTML', false, html);
  const next = parseInt(noteNum);
  if(!isNaN(next)) noteCounter.value = next + 1;
};

</script>

<template>
  <div class="flex-shrink-0 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5 px-6 py-3 flex items-center justify-between z-[200] sticky top-0">
    <div class="flex items-center gap-6">
      <!-- Back & Title -->
      <div class="flex items-center gap-4">
        <button
          @click="emit('back')"
          class="p-2 hover:bg-white/5 rounded-xl border border-white/5 text-gray-400 hover:text-white transition-all outline-none"
        >
          <ArrowLeftIcon class="w-4 h-4" />
        </button>
        <div class="hidden sm:block">
          <h2 class="text-sm font-black italic tracking-tighter text-white">
            {{ isEditing ? "Cập nhật" : "Thêm" }}
            <span class="text-teal-400">Mẫu hồ sơ Pro</span>
          </h2>
        </div>
      </div>

      <!-- Main Toolbar -->
      <div class="flex items-center gap-4 bg-white/5 p-1 px-3 rounded-2xl border border-white/10">
        <!-- Font Selection -->
        <div class="relative group border-r border-white/10 pr-3 mr-1">
          <select
            :value="selectedFont"
            @change="emit('update:selectedFont', ($event.target as HTMLSelectElement).value)"
            class="bg-transparent text-gray-400 text-[10px] font-black uppercase tracking-widest pl-2 pr-8 py-1.5 outline-none appearance-none hover:text-white transition-all cursor-pointer min-w-[140px]"
          >
            <option v-for="font in fontFamilies" :key="font.value" :value="font.value" class="bg-[#0a0a0f]">
              {{ font.name }}
            </option>
          </select>
          <ChevronDownIcon class="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none group-hover:text-teal-400 transition-colors" />
        </div>

        <!-- Rich Text Basics -->
        <div class="flex items-center gap-0.5 border-r border-white/10 pr-2 mr-2">
           <button @click="format('bold')" class="p-1.5 text-gray-500 hover:text-white hover:bg-white/10 rounded-lg transition-all" title="Bold">
             <BoldIcon class="w-3.5 h-3.5" />
           </button>
           <button @click="format('italic')" class="p-1.5 text-gray-500 hover:text-white hover:bg-white/10 rounded-lg transition-all" title="Italic">
             <ItalicIcon class="w-3.5 h-3.5" />
           </button>
           <button @click="format('underline')" class="p-1.5 text-gray-500 hover:text-white hover:bg-white/10 rounded-lg transition-all" title="Underline">
             <UnderlineIcon class="w-3.5 h-3.5" />
           </button>
        </div>

        <!-- Lists & Line Height -->
        <div class="flex items-center gap-0.5 border-r border-white/10 pr-2 mr-2">
           <button @click="format('insertUnorderedList')" class="p-1.5 text-gray-500 hover:text-white hover:bg-white/10 rounded-lg transition-all" title="Bullet List">
             <ListIcon class="w-3.5 h-3.5" />
           </button>
           <button @click="format('insertOrderedList')" class="p-1.5 text-gray-500 hover:text-white hover:bg-white/10 rounded-lg transition-all" title="Numbered List">
             <ListOrderedIcon class="w-3.5 h-3.5" />
           </button>
           
           <div class="relative">
             <button @click="showLineHeightMenu = !showLineHeightMenu" class="p-1.5 text-gray-500 hover:text-white hover:bg-white/10 rounded-lg transition-all" title="Line Height">
               <LineHeightIcon class="w-3.5 h-3.5" />
             </button>
             <div v-if="showLineHeightMenu" class="absolute top-full mt-2 left-0 min-w-[140px] bg-[#0a0a0f] border border-white/10 rounded-xl shadow-2xl p-1 z-[250] animate-in slide-in-from-top-2 duration-200">
                <button
                  v-for="opt in lineHeightOptions"
                  :key="opt.value"
                  @click="applyLineHeight(opt.value)"
                  class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-[9px] font-black uppercase tracking-wider text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  <span>{{ opt.label }}</span>
                </button>
             </div>
           </div>
        </div>

        <!-- Color Suite -->
        <div class="flex items-center gap-0.5 border-r border-white/10 pr-2 mr-2">
          <div class="relative group">
            <button
               class="p-1.5 text-gray-500 hover:text-white hover:bg-white/10 rounded-lg relative flex items-center justify-center transition-all overflow-hidden"
               title="Text Color"
            >
              <TypeIcon class="w-3.5 h-3.5" :style="{ color: selectedTextColor }" />
              <input
                type="color"
                :value="selectedTextColor"
                @input="emit('update:selectedTextColor', ($event.target as HTMLInputElement).value)"
                class="absolute inset-0 opacity-0 cursor-pointer"
              />
            </button>
          </div>
          <div class="relative group">
            <button
               class="p-1.5 text-gray-500 hover:text-white hover:bg-white/10 rounded-lg relative flex items-center justify-center transition-all overflow-hidden"
               title="Highlight Color"
            >
              <div class="w-3.5 h-3.5 border border-gray-600 rounded-sm" :style="{ backgroundColor: selectedBgColor === 'transparent' ? 'rgba(255,255,255,0.1)' : selectedBgColor }"></div>
              <input
                type="color"
                :value="selectedBgColor === 'transparent' ? '#ffffff' : selectedBgColor"
                @input="emit('update:selectedBgColor', ($event.target as HTMLInputElement).value)"
                class="absolute inset-0 opacity-0 cursor-pointer"
              />
            </button>
          </div>
        </div>

        <div class="flex items-center gap-0.5 border-r border-white/10 pr-2 mr-2 relative">
          <button
            @click="showTableGrid = !showTableGrid"
            class="p-1.5 rounded-lg transition-all"
            :class="showTableGrid ? 'bg-teal-500 text-[#050508]' : 'text-gray-500 hover:text-white hover:bg-white/10'"
            title="Insert Table"
          >
            <TableIcon class="w-3.5 h-3.5" />
          </button>

          <!-- Table Grid Popover -->
          <div v-if="showTableGrid" class="absolute top-full mt-3 left-0 z-[250] bg-[#11111a] border border-white/10 rounded-2xl p-4 shadow-2xl animate-in slide-in-from-top-2 duration-200 min-w-[200px]">
            <div class="flex items-center justify-between mb-3 px-1">
              <span class="text-[9px] font-black text-teal-400 uppercase tracking-widest">{{ hoverCols }}x{{ hoverRows }} Table</span>
              <button @click="showTableGrid = false" class="text-gray-500 hover:text-white">
                <XIcon class="w-3 h-3" />
              </button>
            </div>
            <div class="grid grid-cols-10 gap-1" @mouseleave="hoverCols = 0; hoverRows = 0">
              <div v-for="r in 10" :key="'r'+r" class="contents">
                <div 
                  v-for="c in 10" :key="'c'+c"
                  @mouseover="hoverCols = c; hoverRows = r"
                  @click="handleTableClick(c, r)"
                  class="w-4 h-4 rounded-sm border transition-all cursor-pointer"
                  :class="[
                    c <= hoverCols && r <= hoverRows 
                      ? 'bg-teal-500/40 border-teal-500' 
                      : 'bg-white/5 border-white/10 border-dashed'
                  ]"
                ></div>
              </div>
            </div>
          </div>
          <button
            @click="insertNote"
            class="p-1.5 text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-all flex items-center gap-1.5"
            title="Chèn ghi chú (Note marker)"
          >
            <MessageSquareIcon class="w-3.5 h-3.5" />
            <span class="text-[8px] font-black uppercase">Ghi chú</span>
          </button>
          <button
            @click="emit('openBuilder')"
            class="p-1.5 text-teal-400 hover:bg-teal-500/10 rounded-lg flex items-center gap-1.5 px-2 transition-all"
            title="Build Structure from Form"
          >
            <LayoutIcon class="w-3.5 h-3.5" />
            <span class="text-[8px] font-black uppercase">Builder</span>
          </button>
        </div>

        <!-- Global Alignment -->
        <div class="relative flex items-center gap-0.5 border-r border-white/10 pr-2 mr-2">
          <button
            @click="showAlignMenu = !showAlignMenu"
            class="p-1.5 rounded-lg transition-all text-teal-400 bg-white/5 hover:bg-white/10 flex items-center gap-1"
          >
            <component :is="getAlignIcon(selectedAlignment)" class="w-3.5 h-3.5" />
            <ChevronDownIcon class="w-2.5 h-2.5 text-gray-500" />
          </button>
          <div v-if="showAlignMenu" class="absolute top-full mt-2 left-0 min-w-[140px] bg-[#0a0a0f] border border-white/10 rounded-xl shadow-2xl p-1 z-[200] animate-in slide-in-from-top-2 duration-200">
            <button
              v-for="opt in alignOptions"
              :key="opt.value"
              @click="emit('update:selectedAlignment', opt.value); showAlignMenu = false"
              class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-bold transition-all text-[10px] uppercase tracking-wider"
              :class="selectedAlignment === opt.value ? 'text-teal-400 bg-white/5' : 'text-gray-400 hover:text-white hover:bg-white/5' "
            >
              <component :is="opt.icon" class="w-3.5 h-3.5" />
              <span>{{ opt.label }}</span>
            </button>
          </div>
        </div>

        <!-- Margins Setup -->
        <button
          @click="emit('openAlignModal')"
          class="flex items-center gap-2 px-3 py-1 text-teal-400 hover:text-white hover:bg-teal-500 rounded-lg transition-all"
        >
          <Settings2Icon class="w-3.5 h-3.5" />
          <span class="text-[8px] font-black uppercase tracking-widest">Canh lề</span>
        </button>
      </div>
    </div>

    <!-- Actions Area -->
    <div class="flex items-center gap-3">
      <button
        @click="emit('update:showSidebar', !showSidebar)"
        :class="showSidebar ? 'bg-teal-500 text-white' : 'bg-white/5 text-gray-400'"
        class="px-4 py-2 font-bold rounded-xl hover:bg-teal-500 transition-all uppercase tracking-widest text-[9px] flex items-center gap-2"
      >
        <Settings2Icon class="w-3.5 h-3.5" />
        {{ showSidebar ? "Ẩn Cấu hình" : "Cấu hình" }}
      </button>
      <div class="h-6 w-px bg-white/10"></div>
      <button
        @click="emit('back')"
        class="px-4 py-2 bg-white/5 text-gray-400 font-bold rounded-xl hover:bg-white/10 transition-all uppercase tracking-widest text-[9px]"
      >
        Hủy
      </button>
      <button
        @click="emit('save')"
        :disabled="isSaving"
        class="px-6 py-2 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-500 transition-all uppercase tracking-widest text-[9px] shadow-lg shadow-teal-500/20 flex items-center gap-2"
      >
        <Loader2Icon v-if="isSaving" class="w-3.5 h-3.5 animate-spin" />
        {{ isEditing ? "Cập nhật" : "Lưu" }}
      </button>
    </div>
  </div>
</template>
