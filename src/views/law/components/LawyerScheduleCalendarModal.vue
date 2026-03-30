<script setup lang="ts">
import { ref, computed } from 'vue';
import { Calendar as CalendarIcon, XCircle as XCircleIcon, MapPin as MapPinIcon, Sun as SunIcon, Moon as MoonIcon } from 'lucide-vue-next';

const isVisible = ref(false);
const lawyerInfo = ref<any>(null);
const lawyerShifts = ref<any[]>([]);

// Get full days for the week
const weekDays = computed(() => {
   if (lawyerShifts.value.length === 0) return [];
   // Sort by date strings just to group conceptually
   const allDates = [...new Set(lawyerShifts.value.map(s => s.date))];
   return allDates.sort((a: string, b: string) => {
      const [da, ma, ya] = a.split('/').map(Number);
      const [db, mb, yb] = b.split('/').map(Number);
      return new Date(ya || 2026, (ma || 1)-1, da || 1).getTime() - new Date(yb || 2026, (mb || 1)-1, db || 1).getTime();
   });
});

defineExpose({
  open: (lawyer: any, allGlobalSchedules: Record<string, any[]>) => {
    lawyerInfo.value = lawyer;
    
    const myShifts: any[] = [];
    Object.values(allGlobalSchedules).forEach(officeScheduleList => {
       officeScheduleList.forEach(shift => {
          if (shift.lawyerName === (lawyer.user?.displayName || 'Ẩn danh')) {
             myShifts.push(shift);
          }
       });
    });
    
    lawyerShifts.value = myShifts;
    isVisible.value = true;
  }
});
</script>

<template>
  <div v-if="isVisible" class="fixed inset-0 z-[300] flex items-center justify-center p-4 lg:p-10">
    <div class="absolute inset-0 bg-black/90 backdrop-blur-xl" @click="isVisible = false"></div>
    
    <div class="bg-[#0a0a0f] border border-white/10 rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] flex flex-col relative z-10 shadow-2xl animate-in zoom-in-95 duration-500 overflow-hidden">
      <!-- Header -->
      <div class="p-8 border-b border-white/5 bg-gradient-to-r from-yellow-700/20 to-transparent flex items-center justify-between sticky top-0 z-20">
        <div class="flex items-center gap-6">
           <img :src="lawyerInfo?.user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${lawyerInfo?.user?.displayName || lawyerInfo.id}`" class="w-20 h-20 rounded-2xl border-2 border-yellow-500/50 shadow-[0_0_20px_rgba(202,138,4,0.3)] object-cover bg-black" />
           <div>
             <h2 class="text-3xl font-black uppercase tracking-tighter text-white drop-shadow-lg">
                {{ lawyerInfo?.user?.displayName || 'Lawyer' }}
             </h2>
             <p class="text-xs text-yellow-500 font-bold uppercase tracking-widest mt-1 flex items-center gap-2">
                <CalendarIcon class="w-4 h-4" /> Lịch Trực Cá Nhân
             </p>
           </div>
        </div>
        <button @click="isVisible = false" class="p-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-gray-500 hover:text-white transition-colors">
          <XCircleIcon class="w-6 h-6" />
        </button>
      </div>

      <!-- Content -->
      <div class="p-8 flex-1 overflow-y-auto scrollbar-hide">
         
         <div v-if="lawyerShifts.length === 0" class="flex flex-col items-center justify-center py-20 opacity-50">
            <CalendarIcon class="w-20 h-20 text-gray-600 mb-6" />
            <h3 class="text-lg font-bold text-gray-400">Chưa có lịch phân công</h3>
            <p class="text-sm text-gray-600 max-w-sm text-center mt-2">Nhân sự này hiện chưa được AI phân bổ vào bất kỳ ca trực nào trong hệ thống.</p>
         </div>

         <div v-else class="space-y-8">
            <div v-for="date in weekDays" :key="date" class="bg-white/[0.02] border border-white/5 rounded-3xl p-6 relative overflow-hidden group">
               <div class="absolute inset-y-0 left-0 w-1.5 bg-yellow-500/50"></div>
               
               <h3 class="text-sm font-black text-gray-300 uppercase tracking-widest mb-6 border-b border-white/5 pb-4 flex items-center gap-3">
                  Xếp lịch ngày: <span class="text-white bg-white/10 px-3 py-1 rounded-lg">{{ date }}</span>
               </h3>

               <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div v-for="(shift, idx) in lawyerShifts.filter(s => s.date === date)" :key="idx" 
                       class="p-4 rounded-2xl border border-white/10 flex items-start gap-4 transition-all"
                       :class="shift.shift.includes('Sáng') ? 'bg-blue-500/5 hover:border-blue-500/30' : 'bg-orange-500/5 hover:border-orange-500/30'">
                     
                     <!-- Shift Icon Box -->
                     <div class="p-3 rounded-xl border flex-shrink-0"
                          :class="shift.shift.includes('Sáng') ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-orange-500/10 text-orange-400 border-orange-500/20'">
                        <SunIcon v-if="shift.shift.includes('Sáng')" class="w-6 h-6" />
                        <MoonIcon v-else class="w-6 h-6" />
                     </div>
                     
                     <!-- Shift Details -->
                     <div class="flex-1">
                        <p class="text-[10px] font-black uppercase tracking-widest mb-1"
                           :class="shift.shift.includes('Sáng') ? 'text-blue-400' : 'text-orange-400'">
                           {{ shift.shift.includes('Sáng') ? 'Ca Sáng' : 'Ca Chiều' }}
                        </p>
                        <p class="text-sm font-bold text-gray-200">{{ shift.shift.replace('Sáng ', '').replace('Chiều ', '') }}</p>
                        
                        <div class="mt-3 flex items-center gap-2 text-[11px] text-gray-400 bg-black/20 px-3 py-2 rounded-lg w-full">
                           <MapPinIcon class="w-3.5 h-3.5" />
                           <span class="font-bold truncate">{{ shift.roomName }}</span>
                        </div>
                     </div>
                  </div>
               </div>

            </div>
         </div>
      </div>
    </div>
  </div>
</template>
