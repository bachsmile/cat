<template>
  <div class="p-4 md:p-8 lg:p-12 max-w-[1700px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-visible">
    <!-- Global Admin Header -->
    <CgCard type="heavy-frost" :shadow="true" class="flex flex-col lg:flex-row items-center justify-between p-8 rounded-[3.5rem] border border-white/5 gap-8">
      <div class="flex items-center gap-6">
        <div class="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-blue-500/30 scale-110">
          <GraduationCapIcon class="w-8 h-8" />
        </div>
        <div>
          <h2 class="text-3xl font-black italic tracking-tighter text-white tracking-widest bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
            EDUCATION <span class="text-blue-400">PORTAL</span>
          </h2>
          <div class="flex items-center gap-3 mt-1">
            <div class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
            <p class="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">
              HỆ THỐNG QUẢN TRỊ ĐÀO TẠO
            </p>
          </div>
        </div>
      </div>
    </CgCard>

    <div class="flex items-center gap-4 p-2 bg-white/5 rounded-[2rem] border border-white/5 w-fit overflow-x-auto max-w-full">
      <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
        class="px-6 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all text-nowrap"
        :class="activeTab === tab.id ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/30' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'">
        {{ tab.label }}
      </button>
    </div>

    <CgCard type="heavy-frost" class="p-20 text-center rounded-[3rem]">
      <BookOpenIcon class="w-16 h-16 mx-auto mb-6 text-indigo-400 opacity-30" />
      <h3 class="text-2xl font-black text-white mb-4 italic">MODULE GIÁO DỤC</h3>
      <p class="text-gray-500">Đang quản lý khóa học, lớp học và đội ngũ giáo viên.</p>
    </CgCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { GraduationCap as GraduationCapIcon, BookOpen as BookOpenIcon } from 'lucide-vue-next';
import { CgCard } from 'glass-studio-ui-pro';

const activeTab = ref('courses');
const tabs = [
  { id: 'courses', label: 'Khóa học' },
  { id: 'lectures', label: 'Bài giảng AI' },
  { id: 'classes', label: 'Lớp học' },
  { id: 'teachers', label: 'Giáo viên' },
  { id: 'students', label: 'Học sinh' },
];
</script>
