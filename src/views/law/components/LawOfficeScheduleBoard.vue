<script setup lang="ts">
import { ref } from 'vue';
import { Calendar as CalendarIcon, XCircle as XCircleIcon, Clock as ClockIcon, User as UserIcon, Building as BuildingIcon } from 'lucide-vue-next';

const isVisible = ref(false);
const scheduleData = ref<any[]>([]);

defineExpose({
  open: (data: any[]) => {
    scheduleData.value = data;
    isVisible.value = true;
  }
});
</script>

<template>
  <div v-if="isVisible" class="fixed inset-0 z-[250] flex items-center justify-center p-4 lg:p-10">
    <div class="absolute inset-0 bg-black/90 backdrop-blur-xl" @click="isVisible = false"></div>
    
    <div class="bg-[#0a0a0f] border border-white/10 rounded-[2.5rem] w-full max-w-6xl max-h-[90vh] flex flex-col relative z-10 shadow-2xl animate-in zoom-in-95 duration-500 overflow-hidden">
      <!-- Header -->
      <div class="p-8 border-b border-white/5 bg-white/[0.02] flex items-center justify-between sticky top-0 z-20">
        <div>
          <h2 class="text-2xl font-black italic tracking-tighter text-white flex items-center gap-3">
             <CalendarIcon class="w-8 h-8 text-teal-400" />
             Bảng Phân Bổ <span class="text-teal-400">Lịch Trực</span>
          </h2>
          <p class="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-2">Được tạo tự động bởi Thuật toán thông minh (Greedy Scheduler)</p>
        </div>
        <button @click="isVisible = false" class="p-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-gray-500 hover:text-white transition-colors">
          <XCircleIcon class="w-6 h-6" />
        </button>
      </div>

      <!-- Content -->
      <div class="p-8 flex-1 overflow-y-auto scrollbar-hide space-y-8">
         <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="(shift, idx) in scheduleData" :key="idx" class="bg-white/5 border border-white/5 rounded-3xl p-6 hover:border-teal-500/30 transition-all group relative overflow-hidden">
               <!-- Decorative elements -->
               <div class="absolute -right-10 -top-10 w-32 h-32 bg-teal-500/10 rounded-full blur-[30px] group-hover:bg-teal-500/20 transition-all"></div>
               
               <div class="flex items-center justify-between mb-6 relative z-10">
                  <span class="px-3 py-1 bg-black/40 text-teal-400 border border-teal-500/20 text-[10px] font-black uppercase tracking-widest rounded-lg flex items-center gap-2">
                     <ClockIcon class="w-3 h-3" />
                     {{ shift.shift }}
                  </span>
                  <span class="text-[10px] text-gray-500 font-bold">{{ shift.date }}</span>
               </div>

               <div class="space-y-4 relative z-10">
                  <div class="flex items-center gap-4 bg-black/20 p-4 rounded-2xl border border-white/5">
                     <div class="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-400 border border-indigo-500/20">
                        <UserIcon class="w-5 h-5" />
                     </div>
                     <div>
                        <p class="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-1">Luật sư phụ trách</p>
                        <p class="text-sm font-bold text-gray-200 truncate">{{ shift.lawyerName }}</p>
                     </div>
                  </div>

                  <div class="flex items-center gap-4 bg-black/20 p-4 rounded-2xl border border-white/5">
                     <div class="p-2.5 bg-orange-500/10 rounded-xl text-orange-400 border border-orange-500/20">
                        <BuildingIcon class="w-5 h-5" />
                     </div>
                     <div>
                        <p class="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-1">Cơ sở / Phòng trực</p>
                        <p class="text-sm font-bold text-gray-200 truncate">{{ shift.roomName }}</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      
      <!-- Footer -->
      <div class="p-6 border-t border-white/5 bg-[#0a0a0f] text-center z-20">
         <button @click="isVisible = false" class="px-10 py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-teal-500/20 transition-all">
            Đóng bảng lịch
         </button>
      </div>
    </div>
  </div>
</template>
