<script setup lang="ts">
import { ref, reactive } from 'vue';

const isVisible = ref(false);

const activeDataTab = ref<'lawyers' | 'rooms' | 'tasks' | null>(null);

const liveDataLists = reactive({
  lawyers: [] as any[],
  rooms: [] as any[],
  tasks: [
    { id: 'task_1', name: 'Vụ án ly hôn (KH: Mai Trang)', duration: '2h' },
    { id: 'task_2', name: 'Tư vấn pháp lý Doanh nghiệp M&A', duration: '4h' },
    { id: 'task_3', name: 'Họp chốt phương án tranh tụng', duration: '1h' },
    { id: 'task_4', name: 'Nghiên cứu hồ sơ khiếu nại đất đai', duration: '3h' }
  ]
});

const scheduleConfig = reactive({
  timeConfig: {
    startDate: '',
    endDate: '',
    workingDays: [1, 2, 3, 4, 5],
    timeSlots: [{ start: '08:00', end: '12:00' }, { start: '13:00', end: '17:00' }],
    holidays: []
  },
  optimization: {
    strategy: 'greedy',
    allowOvertime: false,
    allowSoftConstraintViolation: false
  },
  advanced: {
    considerFatigue: false,
    minimizeTravelDistance: false,
    fairness: false,
    noConsecutiveShifts: true,
    noNightAfterMorning: true
  },
  selectedDataIds: {
    lawyers: ['lawyer_1', 'lawyer_2', 'lawyer_3'],
    rooms: ['room_1', 'room_2', 'room_3'],
    tasks: ['task_1', 'task_2', 'task_3', 'task_4']
  }
});

const emit = defineEmits(['close', 'submit']);

const submitConfig = () => {
  console.log('Submitting Lawyer Schedule Config:', scheduleConfig);
  emit('submit', scheduleConfig);
  isVisible.value = false;
};

defineExpose({
  open: (lawyers: any[], rooms: any[]) => {
    liveDataLists.lawyers = lawyers;
    liveDataLists.rooms = rooms;
    
    // Auto Select by Default
    scheduleConfig.selectedDataIds.lawyers = lawyers.map(l => l.id);
    scheduleConfig.selectedDataIds.rooms = rooms.map(r => r.id);
    scheduleConfig.selectedDataIds.tasks = liveDataLists.tasks.map(t => t.id);
    
    isVisible.value = true;
  }
});
</script>

<template>
  <div v-if="isVisible" class="fixed inset-0 z-[200] flex items-center justify-center p-4">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-black/80 backdrop-blur-md" @click="isVisible = false"></div>
    
    <!-- Modal -->
    <div class="bg-[#0a0a0f] border border-white/10 rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] flex flex-col relative z-10 shadow-2xl animate-in zoom-in-95 duration-300">
      
      <!-- Decorative Background Blur -->
      <div class="absolute -top-20 -left-20 w-64 h-64 bg-teal-500/10 blur-[80px] rounded-full pointer-events-none"></div>

      <!-- Header -->
      <div class="p-8 border-b border-white/5 flex justify-between items-start sticky top-0 rounded-t-[2.5rem] bg-[#0a0a0f]/90 backdrop-blur-md z-20">
        <div>
          <h2 class="text-2xl font-black italic tracking-tighter text-white">Quản trị <span class="text-teal-400">Lịch làm việc</span></h2>
          <p class="text-[10px] uppercase font-bold text-gray-500 tracking-widest mt-2">Cấu hình thuật toán xếp lịch tự động</p>
        </div>
        <button @click="isVisible = false" class="p-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-gray-500 hover:text-red-400 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Scrollable Content -->
      <div class="p-8 space-y-10 flex-1 overflow-y-auto scrollbar-hide text-white relative z-10">
        
        <!-- 1. Thời gian áp dụng -->
        <section class="space-y-4">
          <h3 class="text-xs font-black text-gray-500 uppercase tracking-[0.2em] border-b border-white/5 pb-2">1. Khung thời gian áp dụng</h3>
          <div class="grid grid-cols-2 gap-6 bg-white/[0.02] p-6 rounded-2xl border border-white/5">
            <div>
              <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Ngày bắt đầu</label>
              <input type="date" v-model="scheduleConfig.timeConfig.startDate" class="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500 transition-colors [color-scheme:dark]" />
            </div>
            <div>
              <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Ngày kết thúc</label>
              <input type="date" v-model="scheduleConfig.timeConfig.endDate" class="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500 transition-colors [color-scheme:dark]" />
            </div>
          </div>
        </section>

        <!-- 2. Import dữ liệu -->
        <section class="space-y-4">
          <h3 class="text-xs font-black text-gray-500 uppercase tracking-[0.2em] border-b border-white/5 pb-2">2. Khoanh vùng Dữ liệu (Input Data Selection)</h3>
          <p class="text-[10px] text-gray-500 font-bold mb-2">Nhấn vào từng hạng mục để xem và chọn chi tiết</p>
          <div class="grid grid-cols-3 gap-4">
            <button 
              @click="activeDataTab = activeDataTab === 'lawyers' ? null : 'lawyers'"
              class="py-5 rounded-2xl flex flex-col items-center justify-center transition-all group border relative overflow-hidden"
              :class="activeDataTab === 'lawyers' ? 'bg-teal-500/20 text-teal-300 border-teal-500/50 shadow-[0_0_15px_rgba(20,184,166,0.2)]' : 'bg-teal-500/5 hover:bg-teal-500/10 text-teal-600 border-teal-500/10'"
            >
              <div v-if="scheduleConfig.selectedDataIds.lawyers.length > 0" class="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-teal-500 border border-teal-400 text-white text-[8px] font-black shadow-[0_0_8px_#2dd4bf]">{{ scheduleConfig.selectedDataIds.lawyers.length }} selected</div>
              <span class="text-2xl mb-2 transition-all grayscale-0">👨‍⚖️</span>
              <span class="font-bold text-[10px] uppercase tracking-widest">Ds Luật sư</span>
            </button>
            <button 
              @click="activeDataTab = activeDataTab === 'rooms' ? null : 'rooms'"
              class="py-5 rounded-2xl flex flex-col items-center justify-center transition-all group border relative overflow-hidden"
              :class="activeDataTab === 'rooms' ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.2)]' : 'bg-indigo-500/5 hover:bg-indigo-500/10 text-indigo-600 border-indigo-500/10'"
            >
              <div v-if="scheduleConfig.selectedDataIds.rooms.length > 0" class="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-indigo-500 border border-indigo-400 text-white text-[8px] font-black shadow-[0_0_8px_#818cf8]">{{ scheduleConfig.selectedDataIds.rooms.length }} selected</div>
              <span class="text-2xl mb-2 transition-all grayscale-0">🏢</span>
              <span class="font-bold text-[10px] uppercase tracking-widest">Ds Phòng họp</span>
            </button>
            <button 
              @click="activeDataTab = activeDataTab === 'tasks' ? null : 'tasks'"
              class="py-5 rounded-2xl flex flex-col items-center justify-center transition-all group border relative overflow-hidden"
              :class="activeDataTab === 'tasks' ? 'bg-orange-500/20 text-orange-300 border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.2)]' : 'bg-orange-500/5 hover:bg-orange-500/10 text-orange-600 border-orange-500/10'"
            >
               <div v-if="scheduleConfig.selectedDataIds.tasks.length > 0" class="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-orange-500 border border-orange-400 text-white text-[8px] font-black shadow-[0_0_8px_#fb923c]">{{ scheduleConfig.selectedDataIds.tasks.length }} selected</div>
              <span class="text-2xl mb-2 transition-all grayscale-0">📚</span>
              <span class="font-bold text-[10px] uppercase tracking-widest">Ds Vụ án & Hẹn</span>
            </button>
          </div>

          <!-- Expandable Lists -->
          <div v-if="activeDataTab === 'lawyers'" class="p-5 bg-teal-500/5 border border-teal-500/20 rounded-2xl mt-4 animate-in slide-in-from-top-2 duration-300">
             <div class="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                <span class="text-xs font-black text-teal-400 uppercase tracking-widest">Lựa chọn Luật Sư đưa vào Lịch</span>
                <button @click="scheduleConfig.selectedDataIds.lawyers = liveDataLists.lawyers.map(l => l.id)" class="text-[9px] text-gray-500 hover:text-teal-400 font-bold uppercase tracking-widest">Chọn tất cả</button>
             </div>
             <div class="grid grid-cols-2 gap-3">
                <label v-for="lawyer in liveDataLists.lawyers" :key="lawyer.id" class="flex items-center space-x-3 cursor-pointer p-2 hover:bg-white/5 rounded-xl border border-transparent hover:border-white/5 transition-all">
                  <input type="checkbox" :value="lawyer.id" v-model="scheduleConfig.selectedDataIds.lawyers" class="w-4 h-4 rounded border-teal-500/30 bg-black/40 text-teal-500 focus:ring-0 focus:ring-offset-0" />
                  <div class="flex flex-col">
                     <span class="text-xs font-bold text-gray-200">{{ lawyer.user?.displayName || 'N/A' }}</span>
                     <span class="text-[9px] text-teal-500 uppercase tracking-widest">{{ lawyer.specialty || 'Chưa cập nhật' }}</span>
                  </div>
                </label>
             </div>
          </div>

          <div v-if="activeDataTab === 'rooms'" class="p-5 bg-indigo-500/5 border border-indigo-500/20 rounded-2xl mt-4 animate-in slide-in-from-top-2 duration-300">
             <div class="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                <span class="text-xs font-black text-indigo-400 uppercase tracking-widest">Lựa chọn Phòng Họp/Tài nguyên</span>
                <button @click="scheduleConfig.selectedDataIds.rooms = liveDataLists.rooms.map(r => r.id)" class="text-[9px] text-gray-500 hover:text-indigo-400 font-bold uppercase tracking-widest">Chọn tất cả</button>
             </div>
             <div class="grid grid-cols-2 gap-3">
                <label v-for="room in liveDataLists.rooms" :key="room.id" class="flex items-center space-x-3 cursor-pointer p-2 hover:bg-white/5 rounded-xl border border-transparent hover:border-white/5 transition-all">
                  <input type="checkbox" :value="room.id" v-model="scheduleConfig.selectedDataIds.rooms" class="w-4 h-4 rounded border-indigo-500/30 bg-black/40 text-indigo-500 focus:ring-0 focus:ring-offset-0" />
                  <div class="flex flex-col">
                     <span class="text-xs font-bold text-gray-200">{{ room.name }}</span>
                     <span class="text-[9px] text-indigo-500 uppercase tracking-widest">{{ room.type || 'Phòng Luật sư' }}</span>
                  </div>
                </label>
             </div>
          </div>

          <div v-if="activeDataTab === 'tasks'" class="p-5 bg-orange-500/5 border border-orange-500/20 rounded-2xl mt-4 animate-in slide-in-from-top-2 duration-300">
             <div class="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                <span class="text-xs font-black text-orange-400 uppercase tracking-widest">Danh sách Vụ án & Công việc</span>
                <button @click="scheduleConfig.selectedDataIds.tasks = liveDataLists.tasks.map(t => t.id)" class="text-[9px] text-gray-500 hover:text-orange-400 font-bold uppercase tracking-widest">Chọn tất cả</button>
             </div>
             <div class="grid grid-cols-1 gap-2">
                <label v-for="task in liveDataLists.tasks" :key="task.id" class="flex items-center justify-between space-x-3 cursor-pointer p-3 bg-black/20 hover:bg-white/5 rounded-xl border border-white/5 transition-all">
                  <div class="flex items-center space-x-3">
                    <input type="checkbox" :value="task.id" v-model="scheduleConfig.selectedDataIds.tasks" class="w-4 h-4 rounded border-orange-500/30 bg-black/40 text-orange-500 focus:ring-0 focus:ring-offset-0" />
                    <span class="text-xs font-bold text-gray-200">{{ task.name }}</span>
                  </div>
                  <span class="px-2 py-0.5 bg-orange-500/10 text-orange-400 border border-orange-500/20 text-[9px] font-black rounded">{{ task.duration }}</span>
                </label>
             </div>
          </div>
        </section>

        <!-- 3. Tùy chọn xếp lịch -->
        <section class="space-y-4">
          <h3 class="text-xs font-black text-gray-500 uppercase tracking-[0.2em] border-b border-white/5 pb-2">3. Ràng buộc Thuật toán (Soft Constraints)</h3>
          <div class="space-y-4 bg-white/[0.02] p-6 rounded-2xl border border-white/5">
            <label class="flex items-center space-x-4 cursor-pointer group">
              <input type="checkbox" v-model="scheduleConfig.optimization.allowOvertime" class="w-5 h-5 rounded border-white/10 bg-black/40 text-teal-600 focus:ring-0 focus:ring-offset-0" />
              <div class="flex flex-col">
                 <span class="text-sm font-bold text-gray-300 group-hover:text-white transition-colors">Cho phép xếp ngoài giờ</span>
                 <span class="text-[10px] text-gray-600 font-medium mt-0.5">Overtime allowance</span>
              </div>
            </label>
            <label class="flex items-center space-x-4 cursor-pointer group">
              <input type="checkbox" v-model="scheduleConfig.optimization.allowSoftConstraintViolation" class="w-5 h-5 rounded border-white/10 bg-black/40 text-teal-600 focus:ring-0 focus:ring-offset-0" />
              <div class="flex flex-col">
                 <span class="text-sm font-bold text-gray-300 group-hover:text-white transition-colors">Cho phép vi phạm quy tắc nhẹ</span>
                 <span class="text-[10px] text-gray-600 font-medium mt-0.5">Bỏ qua ưu tiên phòng họp cố định, ưu tiên gom ca nếu cần thiết</span>
              </div>
            </label>
          </div>
        </section>

        <!-- 4. Advanced -->
        <section class="space-y-4">
          <h3 class="text-xs font-black text-gray-500 uppercase tracking-[0.2em] border-b border-white/5 pb-2">4. Cấu hình Nâng cao (Advanced Features)</h3>
          <div class="grid grid-cols-2 gap-6 bg-white/[0.02] p-6 rounded-2xl border border-white/5">
            <label class="flex items-center space-x-4 cursor-pointer group">
              <input type="checkbox" v-model="scheduleConfig.advanced.considerFatigue" class="w-5 h-5 rounded border-white/10 bg-black/40 text-indigo-500 focus:ring-0 focus:ring-offset-0" />
              <span class="text-sm font-bold text-gray-300 group-hover:text-indigo-400 transition-colors">Mô hình kiệt sức (Fatigue)</span>
            </label>
            <label class="flex items-center space-x-4 cursor-pointer group">
              <input type="checkbox" v-model="scheduleConfig.advanced.minimizeTravelDistance" class="w-5 h-5 rounded border-white/10 bg-black/40 text-indigo-500 focus:ring-0 focus:ring-offset-0" />
              <span class="text-sm font-bold text-gray-300 group-hover:text-indigo-400 transition-colors">Tính quãng đường di chuyển</span>
            </label>
            <label class="flex items-center space-x-4 cursor-pointer group">
              <input type="checkbox" v-model="scheduleConfig.advanced.fairness" class="w-5 h-5 rounded border-white/10 bg-black/40 text-indigo-500 focus:ring-0 focus:ring-offset-0" />
              <span class="text-sm font-bold text-gray-300 group-hover:text-indigo-400 transition-colors">Phân bổ vụ án Công bằng</span>
            </label>
            <label class="flex items-center space-x-4 cursor-pointer group">
              <input type="checkbox" v-model="scheduleConfig.advanced.noConsecutiveShifts" class="w-5 h-5 rounded border-white/10 bg-black/40 text-indigo-500 focus:ring-0 focus:ring-offset-0" />
              <span class="text-sm font-bold text-gray-300 group-hover:text-indigo-400 transition-colors">Tránh xếp 2 ca liên tiếp</span>
            </label>
            <label class="flex items-center space-x-4 cursor-pointer group col-span-2">
              <input type="checkbox" v-model="scheduleConfig.advanced.noNightAfterMorning" class="w-5 h-5 rounded border-white/10 bg-black/40 text-indigo-500 focus:ring-0 focus:ring-offset-0" />
              <span class="text-sm font-bold text-gray-300 group-hover:text-indigo-400 transition-colors">Cấm trực đêm sau khi làm ca sáng</span>
            </label>
          </div>
        </section>

        <!-- 5. Output Format -->
        <section class="space-y-4">
          <h3 class="text-xs font-black text-gray-500 uppercase tracking-[0.2em] border-b border-white/5 pb-2">5. Định dạng Báo cáo</h3>
          <p class="text-xs text-gray-500 font-medium">Bản trình chiếu kết quả xếp lịch có thể xem theo khung nhìn:</p>
          <div class="flex gap-3">
            <span class="px-4 py-2 bg-white/5 border border-white/10 text-gray-300 font-bold rounded-xl text-[10px] uppercase tracking-widest cursor-default">👤 Cá nhân</span>
            <span class="px-4 py-2 bg-white/5 border border-white/10 text-gray-300 font-bold rounded-xl text-[10px] uppercase tracking-widest cursor-default">🏢 Phòng Ban</span>
            <span class="px-4 py-2 bg-white/5 border border-white/10 text-teal-400 font-bold rounded-xl text-[10px] uppercase tracking-widest cursor-default bg-teal-500/10 border-teal-500/20">📅 Tổng Công ty</span>
          </div>
        </section>

      </div>

      <!-- Footer Buttons -->
      <div class="p-8 border-t border-white/5 flex justify-end gap-4 rounded-b-[2.5rem] bg-[#0a0a0f] z-20">
        <button @click="isVisible = false" class="px-8 py-3 bg-white/5 text-gray-400 font-bold rounded-2xl hover:bg-white/10 transition-all uppercase tracking-widest text-xs">Hủy</button>
        <button @click="submitConfig" class="px-8 py-3 bg-teal-600 text-white font-bold rounded-2xl hover:bg-teal-500 transition-all uppercase tracking-widest text-xs shadow-xl shadow-teal-500/20 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Chạy thuật toán
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
