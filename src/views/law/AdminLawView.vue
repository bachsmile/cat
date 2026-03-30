<template>
   <div class="p-4 md:p-8 lg:p-12 max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-500">
        
        <!-- Global Admin Header & Mode Switcher -->
        <div class="flex items-center justify-between mb-8 bg-[#0a0a0f]/50 backdrop-blur-xl p-8 rounded-[3.5rem] border border-white/5 shadow-2xl">
          <div class="flex items-center gap-6">
            <div class="w-16 h-16 bg-gradient-to-br from-teal-600 to-indigo-600 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-teal-500/30 scale-110">
              <ShieldCheckIcon class="w-8 h-8" />
            </div>
            <div>
              <h2 class="text-3xl font-black italic tracking-tighter text-white tracking-widest">BẢNG ĐIỀU KHIỂN <span class="text-teal-400">HỆ THỐNG</span></h2>
              <div class="flex items-center gap-3 mt-1">
                 <div class="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div>
                 <p class="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">Phân quyền: Luật sư / Quản trị viên</p>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-4">
            <button 
              @click="router.push('/law')" 
              class="group flex items-center gap-4 px-8 py-4 bg-white/5 hover:bg-teal-600 border border-white/10 hover:border-teal-500 rounded-[2rem] transition-all duration-500 shadow-2xl hover:shadow-teal-500/20 active:scale-95"
            >
              <div class="w-10 h-10 rounded-2xl bg-white/5 group-hover:bg-white/10 flex items-center justify-center text-gray-400 group-hover:text-white transition-all transform group-hover:rotate-12">
                <UserIcon class="w-5 h-5" />
              </div>
              <div class="text-left">
                <p class="text-[9px] font-black text-gray-500 uppercase tracking-widest group-hover:text-teal-100">Chuyển sang</p>
                <span class="text-xs font-black uppercase tracking-widest text-gray-300 group-hover:text-white">Giao diện khách</span>
              </div>
            </button>
          </div>
        </div>
        
        <!-- Live Chat Management -->
        <div v-if="activeSubTab === 'chat'" class="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[750px]">
          <!-- Left: Customer Queue -->
          <div class="lg:col-span-4 bg-[#0a0a0f] border border-white/5 rounded-[2.5rem] flex flex-col overflow-hidden shadow-xl">
            <div class="p-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
              <h3 class="font-black italic text-sm text-gray-400 uppercase tracking-widest">Khách hàng trực tuyến</h3>
              <span class="px-2 py-0.5 bg-teal-500/10 text-teal-400 rounded-full text-[10px] font-bold">{{ activeCustomers.length }} Đang chờ</span>
            </div>
            <div class="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-2">
              <div 
                v-for="customer in activeCustomers" 
                :key="customer.id"
                @click="selectedCustomerId = customer.id"
                class="p-4 rounded-2xl transition-all cursor-pointer border group"
                :class="selectedCustomerId === customer.id 
                  ? 'bg-teal-600 border-teal-500 shadow-lg shadow-teal-500/10' 
                  : 'bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.05]'"
              >
                <div class="flex items-center gap-4">
                  <div class="relative">
                    <img :src="customer.avatar" class="w-12 h-12 rounded-xl object-cover border border-white/10" />
                    <div class="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-[#0a0a0f] rounded-full"></div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex justify-between items-start">
                      <h4 class="font-bold text-sm truncate" :class="selectedCustomerId === customer.id ? 'text-white' : 'text-gray-200 group-hover:text-white'">{{ customer.name }}</h4>
                      <span class="text-[9px] font-bold" :class="selectedCustomerId === customer.id ? 'text-teal-200' : 'text-gray-500'">{{ customer.lastTime }}</span>
                    </div>
                    <p class="text-[11px] truncate mt-1" :class="selectedCustomerId === customer.id ? 'text-teal-100/70' : 'text-gray-500'">{{ customer.lastMsg }}</p>
                  </div>
                  <div v-if="customer.unread" class="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right: Chat Window -->
          <div class="lg:col-span-8 bg-[#0a0a0f] border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl relative">
            <template v-if="selectedCustomer">
              <!-- Chat Header -->
              <div class="p-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
                <div class="flex items-center gap-4">
                  <img :src="selectedCustomer.avatar" class="w-10 h-10 rounded-xl" />
                  <div>
                    <h4 class="font-bold text-sm text-white">{{ selectedCustomer.name }}</h4>
                    <div class="flex items-center gap-3">
                      <p class="text-[10px] text-teal-400 font-bold uppercase tracking-widest">Đang xem: {{ selectedCustomer.currentTopic }}</p>
                      <span class="text-[9px] text-gray-600 bg-white/5 px-1 rounded border border-white/5">ROOM: {{ selectedCustomer.roomId.split('_').pop() }}</span>
                    </div>
                  </div>
                </div>
                <div class="flex gap-2">
                  <button class="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 text-gray-400 hover:text-white transition-colors">
                    <HistoryIcon class="w-4 h-4" />
                  </button>
                  <button 
                    @click="confirmEndChat"
                    class="p-2.5 bg-red-500/10 hover:bg-red-500/20 rounded-xl border border-red-500/20 text-red-400 transition-colors"
                    title="Kết thúc tư vấn"
                  >
                    <XCircleIcon class="w-4 h-4" />
                  </button>
                </div>
              </div>

              <!-- Message Area -->
              <div class="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide" ref="chatContainer">
                <div 
                  v-for="(msg, i) in currentChatHistory" 
                  :key="i"
                  class="flex flex-col"
                  :class="msg.sender === 'lawyer' ? 'items-end' : 'items-start'"
                >
                  <div class="max-w-[70%] space-y-1">
                    <div 
                      class="px-5 py-3 rounded-2xl text-sm leading-relaxed"
                      :class="msg.sender === 'lawyer' 
                        ? 'bg-teal-600 text-white rounded-br-none shadow-lg shadow-teal-500/10' 
                        : 'bg-white/5 text-gray-300 border border-white/5 rounded-bl-none'"
                    >
                      {{ msg.text }}
                    </div>
                    <span class="text-[9px] font-bold text-gray-600 px-1 uppercase">{{ msg.time }}</span>
                  </div>
                </div>
              </div>

              <!-- Input Area -->
              <div class="p-6 border-t border-white/5 bg-white/5">
                <div class="relative flex items-center gap-4">
                  <button class="p-3 text-gray-500 hover:text-teal-400 bg-white/5 rounded-2xl transition-all">
                    <PaperclipIcon class="w-5 h-5" />
                  </button>
                  <input 
                    v-model="newMessage"
                    @keyup.enter="sendAdminMessage"
                    placeholder="Nhập nội dung phản hồi khách hàng..."
                    class="flex-1 bg-black/40 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:border-teal-500/50 transition-all placeholder:text-gray-600"
                  />
                  <button 
                    @click="sendAdminMessage"
                    class="p-4 bg-teal-600 hover:bg-teal-500 text-white rounded-2xl transition-all shadow-xl shadow-teal-500/20"
                  >
                    <SendIcon class="w-5 h-5" />
                  </button>
                </div>
              </div>
            </template>
            <!-- Empty State -->
            <div v-else class="flex-1 flex flex-col items-center justify-center text-center p-12 space-y-6">
              <div class="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-gray-700 animate-pulse">
                <MessageSquareIcon class="w-12 h-12" />
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-400">Chọn một khách hàng</h3>
                <p class="text-gray-600 text-sm max-w-xs mx-auto mt-2">Vui lòng chọn một cuộc hội thoại từ danh sách bên trái để bắt đầu tư vấn.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Appointment Management -->
        <div v-else-if="activeSubTab === 'appointments'" class="space-y-6">
          <div class="bg-[#0a0a0f] border border-white/5 rounded-[2.5rem] p-8 shadow-xl">
            <div class="flex items-center justify-between mb-8">
              <h3 class="text-xl font-bold italic tracking-tight flex items-center gap-3">
                <CalendarIcon class="w-6 h-6 text-teal-400" />
                Duyệt & Quản lý Lịch hẹn
              </h3>
              <div class="flex items-center gap-4">
                <button 
                  @click="fetchAppointments"
                  class="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-gray-400 hover:text-white transition-all"
                  :class="{ 'animate-spin': isFetchingAppointments }"
                >
                  <RefreshCwIcon class="w-4 h-4" />
                </button>
              </div>
            </div>

            <div v-if="appointmentList.length === 0" class="py-20 text-center grayscale opacity-40">
              <CalendarIcon class="w-16 h-16 mx-auto mb-4 text-gray-500" />
              <p class="text-gray-400 font-bold uppercase tracking-widest text-xs">Chưa có lịch hẹn nào được ghi nhận</p>
            </div>

            <div v-else class="overflow-x-auto">
              <table class="w-full text-left border-separate border-spacing-y-3">
                <thead>
                  <tr class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                    <th class="pb-2 px-6">Ngày & Giờ</th>
                    <th class="pb-2 px-6">Khách hàng</th>
                    <th class="pb-2 px-6">Dịch vụ / Luật sư</th>
                    <th class="pb-2 px-6 text-center">Trạng thái</th>
                    <th class="pb-2 px-6 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="ap in appointmentList" :key="ap.id" class="group bg-white/[0.02] hover:bg-white/[0.04] transition-all">
                    <td class="py-5 px-6 rounded-l-2xl">
                      <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400">
                          <ClockIcon class="w-5 h-5" />
                        </div>
                        <div>
                          <p class="text-xs font-bold text-gray-200 uppercase tracking-widest">{{ new Date(ap.date).toLocaleDateString('vi-VN', { weekday: 'short', day: '2-digit', month: '2-digit' }) }}</p>
                          <p class="text-[10px] text-teal-400 font-mono font-bold">{{ Array.isArray(ap.hours) ? ap.hours.join(', ') : ap.hours }}:00</p>
                        </div>
                      </div>
                    </td>
                    <td class="py-5 px-6 border-l border-white/5">
                      <div class="flex items-center gap-3">
                        <img :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${ap.customer?.email}`" class="w-8 h-8 rounded-full border border-white/10" />
                        <div>
                          <p class="text-xs font-bold text-gray-300">{{ ap.customer?.displayName || 'Ẩn danh' }}</p>
                          <p class="text-[9px] text-gray-600">{{ ap.customer?.email }}</p>
                        </div>
                      </div>
                    </td>
                    <td class="py-5 px-6 border-l border-white/5">
                      <p class="text-[10px] font-black text-teal-500 uppercase tracking-widest mb-1">{{ ap.specialty }}</p>
                      <p class="text-[11px] text-gray-500">Luật sư: {{ ap.lawyer?.user?.displayName || 'Đang chờ...' }}</p>
                    </td>
                    <td class="py-5 px-6 text-center border-l border-white/5">
                      <span 
                        class="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border"
                        :class="{
                          'bg-teal-500/10 text-teal-400 border-teal-500/20': ap.status === 'confirmed',
                          'bg-orange-500/10 text-orange-400 border-orange-500/20': ap.status === 'pending',
                          'bg-red-500/10 text-red-400 border-red-500/20': ap.status === 'cancelled',
                          'bg-gray-500/10 text-gray-500 border-gray-500/20': ap.status === 'completed'
                        }"
                      >
                        {{ ap.status }}
                      </span>
                    </td>
                    <td class="py-5 px-6 text-right rounded-r-2xl border-l border-white/5">
                      <div class="flex items-center justify-end gap-2">
                        <button 
                          v-if="ap.status === 'pending'"
                          @click="handleConfirmAppointment(ap.id)"
                          class="p-2 hover:bg-teal-500/10 rounded-lg text-gray-500 hover:text-teal-400 transition-all"
                          title="Xác nhận lịch"
                        >
                          <CheckCircleIcon class="w-4 h-4" />
                        </button>
                        <button 
                          v-if="ap.status !== 'cancelled'"
                          @click="handleCancelAppointment(ap.id)"
                          class="p-2 hover:bg-red-500/10 rounded-lg text-gray-500 hover:text-red-400 transition-all"
                          title="Hủy lịch"
                        >
                          <XCircleIcon class="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Lawyer Management (CRUD) -->
        <div v-else-if="activeSubTab === 'lawyers'" class="space-y-6">
          <div class="bg-[#0a0a0f] border border-white/5 rounded-[2.5rem] p-8 shadow-xl">
            <div class="flex items-center justify-between mb-8">
              <h3 class="text-xl font-bold italic tracking-tight flex items-center gap-3">
                <UserPlusIcon class="w-6 h-6 text-teal-400" />
                Đội ngũ Luật sư
              </h3>
              <div class="flex gap-4">
                <button @click="openLawyerModal()" class="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all">
                  Thêm luật sư mới
                </button>
              </div>
            </div>

            <!-- Lawyer Statistics -->
            <div class="grid grid-cols-3 gap-6 mb-8">
              <div class="p-4 bg-teal-500/10 border border-teal-500/20 rounded-2xl flex flex-col justify-center items-center">
                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">Tổng số Luật sư</p>
                <h4 class="text-2xl font-black text-teal-400">{{ lawyerList.length || 0 }}</h4>
              </div>
              <div class="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex flex-col justify-center items-center">
                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">Đã phân phòng</p>
                <h4 class="text-2xl font-black text-indigo-400">{{ lawyerList.filter(l => l.officeId).length || 0 }}</h4>
              </div>
              <div class="p-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex flex-col justify-center items-center">
                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">Chưa phân phòng</p>
                <h4 class="text-2xl font-black text-orange-400">{{ lawyerList.filter(l => !l.officeId).length || 0 }}</h4>
              </div>
            </div>

            <!-- Lawyer Cards (FIFA Style) -->
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 px-2">
              <div v-for="lawyer in lawyerList" :key="lawyer.id" 
                   class="relative w-full h-[460px] cursor-pointer group" style="perspective: 1200px;" @click="toggleCardFlip(lawyer.id, $event)">
                <div class="w-full h-full transition-all duration-700 ease-out" style="transform-style: preserve-3d;" :style="flippedCards.has(lawyer.id) ? 'transform: rotateY(180deg);' : ''">
                  
                  <!-- Front of Card (FIFA Style) -->
                  <div class="absolute inset-0 bg-gradient-to-b from-yellow-700/20 via-[#0a0a0f] to-[#0a0a0f] border-2 border-yellow-600/30 rounded-[2.5rem] overflow-hidden flex flex-col shadow-[0_0_30px_rgba(202,138,4,0.1)] group-hover:shadow-[0_0_40px_rgba(202,138,4,0.3)] group-hover:-translate-y-2 group-hover:border-yellow-500/60 transition-all duration-500" style="backface-visibility: hidden;">
                    
                    <!-- Decorative background accents -->
                    <div class="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 blur-[40px] rounded-full"></div>
                    <div class="absolute bottom-0 left-0 w-32 h-32 bg-yellow-500/10 blur-[40px] rounded-full"></div>

                    <!-- Card Top Stats -->
                    <div class="absolute top-6 left-6 flex flex-col items-center z-20">
                      <span class="text-4xl font-black text-yellow-500 drop-shadow-lg">{{ lawyer.rating ? Math.floor(lawyer.rating * 19) : 85 }}</span>
                      <span class="text-[11px] font-bold text-yellow-700 uppercase">OVR</span>
                    </div>
                    <div class="absolute top-6 right-6 text-center z-20">
                       <div class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-yellow-500/20 shadow-lg">
                         <StarIcon class="w-5 h-5 text-yellow-500 fill-yellow-500 drop-shadow-md" />
                       </div>
                    </div>

                    <!-- Lawyer Portrait -->
                    <div class="mt-8 h-48 flex justify-center items-end relative overflow-hidden">
                      <div class="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent z-10 bottom-0 h-full"></div>
                      <img :src="lawyer.user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${lawyer.user?.displayName || lawyer.id}&backgroundColor=transparent`" class="w-40 h-40 object-cover relative z-0 drop-shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-500" />
                    </div>

                    <!-- Player Info -->
                    <div class="flex-1 flex flex-col items-center justify-start text-center p-6 z-20 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f] to-transparent">
                      <h4 class="text-xl font-black uppercase tracking-tight text-white mb-2 drop-shadow-md">{{ lawyer.user?.displayName || 'Ẩn Danh' }}</h4>
                      
                      <!-- Gold Line separator -->
                      <div class="h-px w-3/4 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent my-2"></div>
                      
                      <!-- FIFA attributes -->
                      <div class="grid grid-cols-2 gap-x-12 gap-y-2 w-full px-6 text-left mt-2">
                         <div class="flex justify-between items-center"><span class="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Exp</span> <span class="text-yellow-500 font-black text-sm">{{ Math.floor(Math.random() * 20) + 80 }}</span></div>
                         <div class="flex justify-between items-center"><span class="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Win</span> <span class="text-yellow-500 font-black text-sm">{{ Math.floor(Math.random() * 50) + 50 }}</span></div>
                         <div class="flex justify-between items-center"><span class="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Trs</span> <span class="text-yellow-500 font-black text-sm">{{ Math.floor(lawyer.rating * 18) }}</span></div>
                         <div class="flex justify-between items-center"><span class="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Phy</span> <span class="text-yellow-500 font-black text-sm">{{ Math.floor(Math.random() * 30) + 70 }}</span></div>
                      </div>

                      <div class="mt-auto pt-4 flex gap-2 w-full justify-center">
                         <span class="px-4 py-1.5 bg-yellow-500/10 text-yellow-500 font-black text-[9px] rounded-full uppercase border border-yellow-500/20 tracking-widest shadow-[0_0_10px_rgba(202,138,4,0.1)]">{{ lawyer.specialty || 'General Practice' }}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Back of Card (Details & Management) -->
                  <div class="absolute inset-0 bg-[#050508] border-2 border-teal-500/30 rounded-[2.5rem] overflow-hidden flex flex-col p-6 shadow-2xl" style="backface-visibility: hidden; transform: rotateY(180deg);">
                     
                     <!-- Header -->
                     <div class="flex flex-col items-center justify-center mb-5 pb-4 border-b border-white/10 relative">
                       <span class="px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border mb-2"
                              :class="lawyer.isVerified ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-gray-500/10 text-gray-500 border-gray-500/20'">
                              {{ lawyer.isVerified ? 'Đã xác minh' : 'Chưa xác minh' }}
                       </span>
                       <h4 class="font-black italic text-teal-400 uppercase tracking-widest text-[11px] text-center w-full truncate">Quản lý Nhân sự</h4>
                     </div>
                     
                     <!-- Management Form -->
                     <div class="space-y-4 flex-1">
                        <div class="space-y-1.5 flex flex-col w-full">
                           <label class="text-[9px] text-gray-500 uppercase font-black tracking-widest line-clamp-1">Phân bổ Văn Phòng</label>
                           <select v-model="lawyer.officeId" @click.stop @change="assignLawyerOffice(lawyer)" class="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-[11px] focus:outline-none focus:border-teal-500 text-white appearance-none cursor-pointer hover:bg-white/10 transition-colors">
                             <option :value="null" disabled selected class="text-gray-500">Trạng thái Tự do (Chưa có phòng)</option>
                             <option v-for="office in officeList" :key="office.id" :value="office.id" class="text-black">{{ office.name }}</option>
                           </select>
                        </div>
                        
                        <div class="space-y-1.5 flex flex-col w-full">
                           <label class="text-[9px] text-gray-500 uppercase font-black tracking-widest">Tiểu sử</label>
                           <p class="text-[10px] text-gray-400 line-clamp-4 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5 italic">{{ lawyer.bio || 'Chưa cập nhật thông tin tiểu sử cá nhân. Vui lòng bổ sung.' }}</p>
                        </div>
                     </div>

                     <!-- Actions -->
                     <div class="flex gap-2 mt-auto pt-4 border-t border-white/5">
                        <button @click.stop="lawyerCalendarModal?.open(lawyer, officeSchedules)" class="flex-1 py-2.5 bg-yellow-500/10 hover:bg-yellow-500/20 hover:text-yellow-400 text-yellow-600 rounded-xl transition-all flex items-center justify-center gap-1.5 text-[9px] font-black uppercase tracking-widest border border-yellow-500/10 hover:border-yellow-500/30 shadow-lg shadow-yellow-500/5">
                          <CalendarIcon class="w-3 h-3" /> Xem Lịch
                        </button>
                        <button @click.stop="openLawyerModal(lawyer)" class="flex-1 py-2.5 bg-white/5 hover:bg-teal-500/20 hover:text-teal-400 text-gray-400 rounded-xl transition-all flex items-center justify-center gap-1.5 text-[9px] font-black uppercase tracking-widest border border-white/5 hover:border-teal-500/30">
                          <EditIcon class="w-3 h-3" /> Sửa
                        </button>
                        <button @click.stop="handleDeleteLawyer(lawyer.id)" class="flex-1 py-2.5 bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-gray-400 rounded-xl transition-all flex items-center justify-center gap-1.5 text-[9px] font-black uppercase tracking-widest border border-white/5 hover:border-red-500/30">
                          <TrashIcon class="w-3 h-3" /> Xóa
                        </button>
                     </div>
                  </div>
                
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Law Office Management -->
        <div v-else-if="activeSubTab === 'offices'" class="space-y-6">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-2xl font-black italic tracking-tighter flex items-center gap-3">
              <BuildingIcon class="w-8 h-8 text-teal-400" />
              Quản lý <span class="text-gray-500">Phòng Luật & Lịch Công Tác</span>
            </h3>
            <button class="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all">
              Thành lập Phòng mới
            </button>
          </div>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div v-for="office in officeList" :key="office.id" class="bg-[#0a0a0f] border border-white/5 rounded-3xl p-6 flex flex-col hover:bg-white/[0.02] transition-all group shadow-xl">
               <!-- Office Header -->
               <div class="flex justify-between items-start mb-6">
                  <div>
                     <span class="text-[9px] font-black uppercase tracking-[0.2em] text-teal-400 bg-teal-500/10 px-2 py-1 rounded-md">{{ office.type }}</span>
                     <h4 class="text-lg font-bold leading-tight mt-3">{{ office.name }}</h4>
                     <p class="text-[11px] text-gray-500 max-w-xs mt-1">Quản lý {{ lawyerList.filter(l => l.officeId === office.id).length }} nhân sự & {{ office.receptionRooms?.length || 0 }} phòng trực</p>
                  </div>
                  <div class="flex items-center gap-2">
                     <button @click="handleViewSchedule(office.id)" class="px-4 py-2 bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 border border-teal-500/20 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg shadow-teal-500/10">
                       <ClockIcon class="w-3.5 h-3.5" /> Bảng lịch
                     </button>
                     <button @click="currentSchedulingOfficeId = office.id; scheduleModal?.open(lawyerList.filter(l => l.officeId === office.id), office.receptionRooms || [])" class="px-4 py-2 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all flex items-center gap-2">
                       <CalendarIcon class="w-3.5 h-3.5" /> Xếp lịch
                     </button>
                  </div>
               </div>

               <!-- Inside Lawyers & Rooms -->
               <div class="flex-1 space-y-4">
                  <!-- Team Tab -->
                  <div class="bg-white/5 rounded-2xl p-4 border border-white/5">
                     <div class="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
                       <h5 class="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Nhân sự Thuộc Phòng</h5>
                       <button @click="handleAddStaffToOffice()" class="text-[9px] font-bold text-teal-400 hover:text-white uppercase tracking-widest">+ Gán thêm</button>
                     </div>
                     <div class="space-y-2">
                        <div v-for="member in lawyerList.filter(l => l.officeId === office.id)" :key="member.id" class="flex items-center justify-between p-2 rounded-xl bg-black/20 hover:bg-black/40 transition-colors border border-transparent hover:border-white/5">
                          <div class="flex items-center gap-2.5">
                            <img :src="member.user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.user?.displayName || member.id}`" class="w-7 h-7 rounded-lg" />
                            <div>
                              <p class="text-[11px] font-bold text-gray-200 truncate max-w-[120px]">{{ member.user?.displayName || 'Ẩn danh' }}</p>
                              <p class="text-[9px] text-gray-600 truncate max-w-[120px]">{{ member.specialty || 'General' }}</p>
                            </div>
                          </div>
                          <span class="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" title="Đang làm việc"></span>
                        </div>

                        <div v-if="lawyerList.filter(l => l.officeId === office.id).length === 0" class="text-center py-3 text-gray-600 text-[10px] italic font-medium bg-black/20 rounded-xl">
                           Chưa phân bổ nhân sự nào
                        </div>
                     </div>
                  </div>

                  <!-- Rooms Tab -->
                  <div class="bg-indigo-500/5 rounded-2xl p-4 border border-indigo-500/10">
                     <div class="flex items-center justify-between mb-3 border-b border-indigo-500/10 pb-2">
                       <h5 class="text-[10px] font-black text-indigo-400/70 uppercase tracking-[0.2em]">Cấu hình Phòng Trực</h5>
                       <button @click="handleAddRoom(office)" class="text-[9px] font-bold text-indigo-400 hover:text-white uppercase tracking-widest">+ Lập phòng</button>
                     </div>
                     <div class="space-y-2">
                        <div v-for="room in office.receptionRooms" :key="room.id" class="flex items-center justify-between p-2 rounded-xl bg-black/20 border border-indigo-500/10 hover:border-indigo-500/30">
                           <div class="flex flex-col">
                              <span class="text-[11px] font-bold text-indigo-200">{{ room.name }}</span>
                              <span class="text-[8px] text-indigo-500/80 uppercase tracking-widest">{{ room.type || 'Tiếp khách' }}</span>
                           </div>
                           <button @click="handleRemoveRoom(office, room.id)" class="text-gray-500 hover:text-red-400 p-1.5 hover:bg-red-500/10 rounded-lg transition-colors"><TrashIcon class="w-3 h-3" /></button>
                        </div>
                        <div v-if="!office.receptionRooms || office.receptionRooms.length === 0" class="text-center py-3 text-indigo-500/50 text-[10px] font-medium italic bg-black/20 rounded-xl">
                           Phòng luật chưa thiết lập phòng trực.
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        <!-- Question Management -->
        <div v-else-if="activeSubTab === 'questions'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="q in customerQuestions" 
            :key="q.id"
            class="bg-[#0a0a0f] border border-white/5 rounded-[2rem] p-8 hover:border-teal-500/30 transition-all group relative overflow-hidden flex flex-col"
          >
            <div class="absolute top-0 right-0 p-4">
              <span class="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border"
                :class="q.status === 'Answered' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-orange-500/10 text-orange-400 border-orange-500/20 animate-pulse'">
                {{ q.status === 'Answered' ? 'Đã giải quyết' : 'Đang chờ' }}
              </span>
            </div>
            
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-teal-400 font-black text-xs">
                #{{ q.id.slice(0, 3) }}
              </div>
              <div class="flex-1">
                <h4 class="text-xs font-bold text-gray-500 uppercase tracking-widest">{{ q.category || 'TƯ VẤN' }}</h4>
                <p class="text-[10px] text-gray-600">{{ new Date(q.createdAt).toLocaleDateString('vi-VN') }}</p>
              </div>
              <div class="flex gap-1">
                <button @click="handleDeleteQuestion(q.id)" class="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-red-400/50 hover:text-red-400"><TrashIcon class="w-4 h-4" /></button>
              </div>
            </div>

            <h3 class="text-lg font-bold mb-4 group-hover:text-teal-400 transition-colors italic line-clamp-1">"{{ q.title }}"</h3>
            <p class="text-sm text-gray-500 leading-relaxed mb-8 line-clamp-3 flex-1">{{ q.content }}</p>

            <div class="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-full bg-white/5 border border-white/10 overflow-hidden">
                  <img :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${q.customer?.email}`" />
                </div>
                <span class="text-xs font-bold text-gray-400">{{ q.customer?.displayName || q.customer?.email }}</span>
              </div>
              <button 
                @click="openAnswerModal(q)"
                class="px-5 py-2 bg-white/5 hover:bg-teal-600 text-xs font-bold rounded-xl transition-all border border-white/5 hover:border-teal-500"
              >
                {{ q.status === 'Answered' ? 'Xem & Chỉnh sửa' : 'Phản hồi' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Post/Article Management -->
        <div v-else-if="activeSubTab === 'posts'" class="space-y-6">
          <div class="flex items-center justify-between mb-2">
             <h3 class="text-2xl font-black italic tracking-tighter">Quản lý <span class="text-gray-500">Thư viện Pháp luật</span></h3>
             <button @click="openArticleModal()" class="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all">Viết bài mới</button>
          </div>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div v-for="post in lawPosts" :key="post.id" class="bg-[#0a0a0f] border border-white/5 rounded-3xl p-6 flex gap-6 hover:bg-white/[0.02] transition-all group">
               <div class="w-32 h-32 rounded-2xl bg-white/5 overflow-hidden flex-shrink-0">
                  <img :src="post.cover" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
               </div>
               <div class="flex-1 flex flex-col justify-between">
                 <div>
                   <div class="flex justify-between items-start mb-2">
                     <span class="text-[9px] font-black uppercase tracking-[0.2em] text-teal-400">{{ post.category }}</span>
                     <div class="flex gap-1">
                        <button @click="openArticleModal(post)" class="text-gray-500 hover:text-white transition-colors"><EditIcon class="w-4 h-4" /></button>
                        <button @click="handleDeleteArticle(post.id)" class="text-gray-500 hover:text-red-400 transition-colors"><TrashIcon class="w-4 h-4" /></button>
                     </div>
                   </div>
                   <h4 class="text-lg font-bold leading-tight mb-2 group-hover:text-white transition-colors">{{ post.title }}</h4>
                   <p class="text-[11px] text-gray-500 italic">{{ post.excerpt }}</p>
                 </div>
                 <div class="flex items-center gap-4 text-[9px] font-bold text-gray-600 uppercase tracking-widest">
                    <span>{{ post.views }} lượt xem</span>
                    <span>{{ new Date(post.createdAt).toLocaleDateString('vi-VN') }}</span>
                 </div>
               </div>
            </div>
          </div>
        </div>

        <!-- Application & Template Management -->
        <div v-else-if="activeSubTab === 'applications'" class="space-y-6">
          <!-- Internal Sub-navigation -->
          <div class="flex items-center gap-6 border-b border-white/5 pb-4">
             <button 
               @click="submissionTab = 'list'"
               class="text-sm font-black uppercase tracking-widest transition-all"
               :class="submissionTab === 'list' ? 'text-teal-400 border-b-2 border-teal-400 pb-4' : 'text-gray-500 hover:text-white pb-4'"
             >
               Hồ sơ của khách
             </button>
             <button 
               @click="submissionTab = 'templates'"
               class="text-sm font-black uppercase tracking-widest transition-all"
               :class="submissionTab === 'templates' ? 'text-teal-400 border-b-2 border-teal-400 pb-4' : 'text-gray-500 hover:text-white pb-4'"
             >
               Mẫu hồ sơ & Đơn mẫu
             </button>
          </div>

          <div v-if="submissionTab === 'list'" class="animate-in fade-in slide-in-from-left-4 duration-300">
            <div class="bg-[#0a0a0f] border border-white/5 rounded-[2.5rem] p-8 shadow-xl">
               <div class="flex items-center justify-between mb-8">
                 <h3 class="text-xl font-bold italic tracking-tight flex items-center gap-3">
                   <FileTextIcon class="w-6 h-6 text-teal-400" />
                   Duyệt hồ sơ khách hàng
                 </h3>
                 <div class="flex items-center gap-4">
                   <div class="flex bg-white/5 p-1 rounded-xl border border-white/5">
                      <button 
                        @click="appFilter = 'all'"
                        class="px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all"
                        :class="appFilter === 'all' ? 'bg-teal-600 text-white' : 'text-gray-500 hover:text-white'"
                      >Tất cả</button>
                      <button 
                        @click="appFilter = 'pending'"
                        class="px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all"
                        :class="appFilter === 'pending' ? 'bg-orange-600 text-white' : 'text-gray-500 hover:text-white'"
                      >Chờ duyệt</button>
                   </div>
                   <button 
                      @click="fetchSubmissions"
                      class="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-gray-400 hover:text-white transition-all"
                      :class="{ 'animate-spin': isFetchingSubmissions }"
                    >
                      <RefreshCwIcon class="w-4 h-4" />
                    </button>
                 </div>
               </div>

               <div v-if="submissionList.length === 0" class="py-20 text-center grayscale opacity-40">
                 <FileTextIcon class="w-16 h-16 mx-auto mb-4 text-gray-500" />
                 <p class="text-gray-400 font-bold uppercase tracking-widest text-xs">Không tìm thấy đơn nào</p>
               </div>

               <div v-else class="overflow-x-auto">
                 <table class="w-full text-left border-separate border-spacing-y-3">
                   <thead>
                     <tr class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                       <th class="pb-2 px-6">Mã Đơn / Ngày nộp</th>
                       <th class="pb-2 px-6">Khách hàng</th>
                       <th class="pb-2 px-6">Loại Đơn / Trạng thái</th>
                       <th class="pb-2 px-6 text-right">Thao tác</th>
                     </tr>
                   </thead>
                   <tbody>
                     <tr v-for="sub in filteredSubmissions" :key="sub.id" class="group bg-white/[0.02] hover:bg-white/[0.04] transition-all">
                       <td class="py-5 px-6 rounded-l-2xl">
                          <p class="text-[10px] font-mono text-teal-400 font-bold mb-1">#{{ sub.id.split('-')[0].toUpperCase() }}</p>
                          <p class="text-[9px] text-gray-500 font-bold">{{ new Date(sub.createdAt).toLocaleString('vi-VN') }}</p>
                       </td>
                       <td class="py-5 px-6 border-l border-white/5">
                          <div class="flex items-center gap-3">
                             <img :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${sub.customer?.email}`" class="w-8 h-8 rounded-full border border-white/10" />
                             <div>
                                <p class="text-xs font-bold text-gray-300">{{ sub.customer?.displayName || 'Ẩn danh' }}</p>
                                <p class="text-[9px] text-gray-600">{{ sub.customer?.email }}</p>
                             </div>
                          </div>
                       </td>
                       <td class="py-5 px-6 border-l border-white/5">
                          <p class="text-xs font-bold text-gray-200 mb-1">{{ sub.application?.title || 'Đơn lẻ' }}</p>
                          <span 
                            class="px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-[0.1em]"
                            :class="{
                              'bg-orange-500/10 text-orange-400': sub.status === 'pending',
                              'bg-teal-500/10 text-teal-400': sub.status === 'reviewed',
                              'bg-green-500/10 text-green-400': sub.status === 'processed',
                              'bg-red-500/10 text-red-400': sub.status === 'rejected'
                            }"
                          >{{ sub.status === 'pending' ? 'Đang chờ' : sub.status }}</span>
                       </td>
                       <td class="py-5 px-6 text-right rounded-r-2xl border-l border-white/5">
                          <div class="flex items-center justify-end gap-2">
                             <button 
                                @click="viewSubmissionDetail(sub)"
                                class="p-2 hover:bg-teal-500/10 rounded-lg text-gray-500 hover:text-teal-400 transition-all"
                              >
                                <EditIcon class="w-4 h-4" />
                             </button>
                             <button 
                                @click="handleDeleteSubmission(sub.id)"
                                class="p-2 hover:bg-red-500/10 rounded-lg text-gray-500 hover:text-red-400 transition-all"
                              >
                                <TrashIcon class="w-4 h-4" />
                             </button>
                          </div>
                       </td>
                     </tr>
                   </tbody>
                 </table>
               </div>
            </div>
          </div>

          <!-- Template Management Section -->
          <div v-else class="animate-in fade-in slide-in-from-right-4 duration-300">
            <div class="bg-[#0a0a0f] border border-white/5 rounded-[2.5rem] p-8 shadow-xl">
               <div class="flex items-center justify-between mb-8">
                 <h3 class="text-xl font-bold italic tracking-tight flex items-center gap-3">
                   <FileTextIcon class="w-6 h-6 text-teal-400" />
                   Thư viện Mẫu hồ sơ & Đơn mẫu
                 </h3>
                   <button @click="router.push('/law-admin/templates/create')" class="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all">
                     Thêm mẫu mới
                   </button>
               </div>

               <div v-if="templateList.length === 0" class="py-20 text-center grayscale opacity-40">
                 <FileTextIcon class="w-16 h-16 mx-auto mb-4 text-gray-500" />
                 <p class="text-gray-400 font-bold uppercase tracking-widest text-xs">Chưa có mẫu đơn nào</p>
               </div>

               <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 <div v-for="tpl in templateList" :key="tpl.id" class="p-6 bg-white/[0.02] border border-white/5 rounded-3xl hover:border-teal-500/30 transition-all group">
                   <div class="flex justify-between items-start mb-4">
                     <div class="px-3 py-1 bg-teal-500/10 text-teal-400 rounded-full text-[9px] font-black uppercase tracking-widest border border-teal-500/20">
                       {{ tpl.type }}
                     </div>
                     <div class="flex gap-2">
                       <button @click="router.push(`/law-admin/templates/${tpl.id}/edit`)" class="p-2 hover:bg-white/10 rounded-lg text-gray-500 hover:text-white transition-all"><EditIcon class="w-4 h-4" /></button>
                       <button @click="handleDeleteTemplate(tpl.id)" class="p-2 hover:bg-red-500/10 rounded-lg text-gray-500 hover:text-red-400 transition-all"><TrashIcon class="w-4 h-4" /></button>
                     </div>
                   </div>
                   <h4 class="text-lg font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">{{ tpl.title }}</h4>
                   <p class="text-xs text-gray-500 line-clamp-2 italic mb-4">{{ tpl.content }}</p>
                   <div class="flex items-center gap-2 text-[10px] text-gray-600 font-bold uppercase">
                     <span>{{ tpl.config?.fields?.length || 0 }} trường dữ liệu</span>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>



    <CmConfirm
      :show="showModal"
      :title="modalConfig.title"
      :message="modalConfig.message"
      :icon="modalConfig.icon"
      :show-cancel="modalConfig.showCancel"
      :confirm-text="modalConfig.confirmText"
      :cancel-text="modalConfig.cancelText"
      :variant="modalConfig.variant"
      @confirm="handleModalConfirm"
      @cancel="closeModal"
    />

    <!-- Submission Detail Modal -->
    <div v-if="showSubmissionModal" class="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-6">
       <div class="bg-[#0a0a0f] border border-white/10 rounded-[2.5rem] w-full max-w-2xl p-10 space-y-8 animate-in zoom-in duration-300 max-h-[90vh] overflow-y-auto scrollbar-hide">
          <div class="flex justify-between items-start">
             <div>
                <h2 class="text-2xl font-black italic tracking-tighter">Chi tiết <span class="text-teal-400">Đơn Hồ sơ</span></h2>
                <p class="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Mã đơn: {{ selectedSubmission.id }}</p>
             </div>
             <button @click="showSubmissionModal = false" class="p-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-gray-500 transition-colors">
                <XCircleIcon class="w-5 h-5" />
             </button>
          </div>

          <div class="grid grid-cols-2 gap-8">
             <div class="space-y-4">
                <h4 class="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] border-b border-white/5 pb-2">Thông tin khách hàng</h4>
                <div class="flex items-center gap-4 bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                   <img :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedSubmission.customer?.email}`" class="w-12 h-12 rounded-xl" />
                   <div>
                      <p class="text-sm font-bold">{{ selectedSubmission.customer?.displayName }}</p>
                      <p class="text-xs text-gray-500">{{ selectedSubmission.customer?.email }}</p>
                   </div>
                </div>
             </div>
             <div class="space-y-4">
                <h4 class="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] border-b border-white/5 pb-2">Loại đơn</h4>
                <div class="bg-teal-500/5 p-4 rounded-2xl border border-teal-500/10">
                   <p class="text-sm font-bold text-teal-400">{{ selectedSubmission.application?.title }}</p>
                   <p class="text-[10px] text-teal-500/70 mt-1 uppercase tracking-widest">{{ selectedSubmission.application?.type }}</p>
                </div>
             </div>
          </div>

          <div class="space-y-4">
             <h4 class="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] border-b border-white/5 pb-2">Nội dung đã khai báo</h4>
             <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-for="(val, key) in selectedSubmission.formData" :key="key" class="p-4 bg-white/[0.03] border border-white/5 rounded-2xl">
                   <p class="text-[10px] text-gray-600 uppercase font-black tracking-widest mb-1">{{ key }}</p>
                   <p class="text-sm text-gray-300 font-medium">{{ val }}</p>
                </div>
             </div>
          </div>

          <div class="space-y-4">
             <h4 class="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] border-b border-white/5 pb-2">Ghi chú của Luật sư / Admin</h4>
             <textarea 
               v-model="selectedSubmission.adminNotes"
               rows="3"
               class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-teal-500 resize-none" 
               placeholder="Nhập phản hồi hoặc ghi chú bảo mật..."
             ></textarea>
          </div>

          <div class="flex gap-4 pt-4 border-t border-white/5">
             <button @click="updateSubStatus('rejected')" class="flex-1 py-4 bg-red-500/10 text-red-400 font-bold rounded-2xl hover:bg-red-500/20 border border-red-500/10 transition-all uppercase tracking-widest text-[10px]">Từ chối / Yêu cầu lại</button>
             <button @click="updateSubStatus('reviewed')" class="flex-1 py-4 bg-teal-500/10 text-teal-400 font-bold rounded-2xl hover:bg-teal-500/20 border border-teal-500/10 transition-all uppercase tracking-widest text-[10px]">Đã xem xét</button>
             <button @click="updateSubStatus('processed')" class="flex-1 py-4 bg-teal-600 text-white font-bold rounded-2xl hover:bg-teal-500 transition-all uppercase tracking-widest text-[10px] shadow-xl shadow-teal-500/20">Hoàn tất xử lý</button>
          </div>
       </div>
    </div>

    <!-- Auto Scheduling Config Modal -->
    <LawScheduleConfigModal ref="scheduleModal" @submit="handleScheduleSubmit" />

    <!-- AI Schedule Result Board -->
    <LawOfficeScheduleBoard ref="scheduleBoard" />

    <!-- Personal Lawyer Calendar Modal -->
    <LawyerScheduleCalendarModal ref="lawyerCalendarModal" />

    <!-- Lawyer CRUD Modal -->
    <div v-if="showLawyerModal" class="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-6">
      <div class="bg-[#0a0a0f] border border-white/10 rounded-[2.5rem] w-full max-w-lg p-10 space-y-8 animate-in zoom-in duration-300">
        <h2 class="text-2xl font-black italic tracking-tighter">{{ editingLawyerId ? 'Cập nhật' : 'Thêm' }} <span class="text-teal-400">Luật sư</span></h2>
        
        <div class="space-y-6">
          <!-- User Selection (Only for Create) -->
          <div v-if="!editingLawyerId" class="space-y-2">
            <label class="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Chọn tài khoản hệ thống</label>
            <select 
              v-model="lawyerForm.userId"
              class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-teal-500 text-white appearance-none"
            >
              <option value="" disabled selected>-- Chọn người dùng --</option>
              <option v-for="user in availableUsers" :key="user.id" :value="user.id" class="bg-[#0a0a0f]">
                {{ user.displayName || user.email }} ({{ user.email }})
              </option>
            </select>
          </div>

          <div class="space-y-2">
            <label class="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Chuyên môn</label>
            <select 
              v-model="lawyerForm.specialty"
              class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-teal-500 text-white appearance-none"
            >
              <option value="" disabled selected>-- Chọn chuyên môn --</option>
              <option v-for="s in specialties" :key="s" :value="s" class="bg-[#0a0a0f]">{{ s }}</option>
            </select>
          </div>

          <div class="space-y-2">
            <label class="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Tiểu sử / Giới thiệu</label>
            <textarea 
              v-model="lawyerForm.bio"
              rows="4"
              class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-teal-500 resize-none" 
              placeholder="Thông tin giới thiệu về luật sư..."
            ></textarea>
          </div>

          <div v-if="editingLawyerId" class="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
             <input type="checkbox" v-model="lawyerForm.isVerified" class="w-5 h-5 rounded border-white/10 bg-black/40 text-teal-600 focus:ring-0" />
             <span class="text-sm font-bold text-gray-400">Xác minh danh tính chuyên gia</span>
          </div>
        </div>

        <div class="flex gap-4 pt-4">
          <button @click="showLawyerModal = false" class="flex-1 py-4 bg-white/5 text-gray-400 font-bold rounded-2xl hover:bg-white/10 transition-all uppercase tracking-widest text-xs">Hủy bỏ</button>
          <button 
            @click="saveLawyer"
            :disabled="!lawyerForm.userId && !editingLawyerId"
            class="flex-1 py-4 bg-teal-600 text-white font-bold rounded-2xl hover:bg-teal-500 transition-all uppercase tracking-widest text-xs shadow-xl shadow-teal-500/20 disabled:opacity-50"
          >
            {{ editingLawyerId ? 'Cập nhật' : 'Xác nhận Thêm' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Article/Post CRUD Modal -->
    <div v-if="showArticleModal" class="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-6">
      <div class="bg-[#0a0a0f] border border-white/10 rounded-[2.5rem] w-full max-w-4xl p-10 space-y-8 animate-in zoom-in duration-300 max-h-[90vh] overflow-y-auto scrollbar-hide">
        <div class="flex justify-between items-start">
          <h2 class="text-2xl font-black italic tracking-tighter">{{ editingArticleId ? 'Chỉnh sửa' : 'Viết' }} <span class="text-teal-400">Bài viết</span></h2>
          <button @click="showArticleModal = false" class="p-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-gray-500 transition-colors">
              <XCircleIcon class="w-5 h-5" />
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="space-y-6">
            <div class="space-y-2">
              <label class="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Tiêu đề bài viết</label>
              <input 
                v-model="articleForm.title"
                class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-teal-500 text-white"
                placeholder="Nhập tiêu đề hấp dẫn..."
              />
            </div>

            <div class="space-y-2">
              <label class="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Danh mục</label>
              <select 
                v-model="articleForm.category"
                class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-teal-500 text-white appearance-none"
              >
                <option value="TIN TỨC">TIN TỨC</option>
                <option value="HƯỚNG DẪN">HƯỚNG DẪN</option>
                <option value="PHÂN TÍCH">PHÂN TÍCH</option>
                <option value="THÔNG BÁO">THÔNG BÁO</option>
              </select>
            </div>

            <div class="space-y-2">
              <label class="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Ảnh bìa (URL)</label>
              <input 
                v-model="articleForm.cover"
                class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-teal-500 text-white"
                placeholder="https://images.unsplash.com/..."
              />
              <div v-if="articleForm.cover" class="mt-4 rounded-2xl overflow-hidden aspect-video border border-white/5 bg-white/5">
                <img :src="articleForm.cover" class="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          <div class="space-y-6">
            <div class="space-y-2">
              <label class="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Mô tả ngắn (Trích dẫn)</label>
              <textarea 
                v-model="articleForm.excerpt"
                rows="3"
                class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-teal-500 resize-none" 
                placeholder="Tóm tắt nội dung chính bài viết..."
              ></textarea>
            </div>

            <div class="space-y-2">
              <label class="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Nội dung chi tiết (Markdown / HTML)</label>
              <textarea 
                v-model="articleForm.content"
                rows="12"
                class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-mono focus:outline-none focus:border-teal-500 resize-none" 
                placeholder="Hãy viết nội dung chi tiết bài viết tại đây..."
              ></textarea>
            </div>
          </div>
        </div>

        <div class="flex gap-4 pt-4 border-t border-white/5">
          <button @click="showArticleModal = false" class="flex-1 py-4 bg-white/5 text-gray-400 font-bold rounded-2xl hover:bg-white/10 transition-all uppercase tracking-widest text-xs">Hủy bỏ</button>
          <button 
            @click="saveArticle"
            :disabled="!articleForm.title || !articleForm.content"
            class="flex-[2] py-4 bg-teal-600 text-white font-bold rounded-2xl hover:bg-teal-500 transition-all uppercase tracking-widest text-xs shadow-xl shadow-teal-500/20 disabled:opacity-50"
          >
            {{ editingArticleId ? 'Cập nhật bài viết' : 'Đăng bài ngay' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Question Answer Modal -->
    <div v-if="showAnswerModal" class="fixed inset-0 z-[101] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6">
       <div class="bg-[#0a0a0f] border border-white/10 rounded-[3rem] w-full max-w-2xl p-10 space-y-8 animate-in zoom-in duration-300 shadow-[0_0_100px_rgba(59,130,246,0.15)]">
          <div class="flex justify-between items-start">
             <div class="space-y-1">
                <h2 class="text-2xl font-black italic tracking-tighter">Phản hồi <span class="text-blue-400">Câu hỏi</span></h2>
                <p class="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">Khách hàng: {{ selectedQuestion?.customer?.displayName || selectedQuestion?.customer?.email }}</p>
             </div>
             <button @click="showAnswerModal = false" class="p-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-gray-500 transition-colors">
               <XCircleIcon class="w-5 h-5" />
             </button>
          </div>

          <div class="space-y-6">
             <div class="p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                <h4 class="text-xs font-black text-[#505050] uppercase tracking-widest mb-3">Nội dung câu hỏi:</h4>
                <p class="text-sm font-bold text-gray-300 italic">"{{ selectedQuestion?.content }}"</p>
             </div>

             <div class="space-y-4">
                <label class="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Nội dung tư vấn giải đáp</label>
                <textarea 
                  v-model="answerText"
                  rows="8"
                  placeholder="Nhập nội dung phản hồi chính thức từ luật sư..."
                  class="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-6 text-sm focus:outline-none focus:border-blue-500/50 transition-all resize-none shadow-inner"
                ></textarea>
             </div>
          </div>

          <div class="flex gap-4 pt-4">
             <button @click="showAnswerModal = false" class="flex-1 py-4 bg-white/5 text-gray-400 font-bold rounded-2xl hover:bg-white/10 transition-all uppercase tracking-widest text-xs">Hủy bỏ</button>
             <button 
               @click="submitAnswer"
               :disabled="!answerText.trim()"
               class="flex-[2] py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-blue-500/20 uppercase tracking-widest text-xs disabled:opacity-50"
             >
               Gửi phản hồi chính thức
             </button>
          </div>
       </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  MessageSquare as MessageSquareIcon,
  FileText as FileTextIcon,
  Star as StarIcon,
  Edit2 as EditIcon,
  Trash2 as TrashIcon,
  UserPlus as UserPlusIcon,
  Send as SendIcon,
  Paperclip as PaperclipIcon,
  History as HistoryIcon,
  XCircle as XCircleIcon,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  CheckCircle as CheckCircleIcon,
  AlertCircle as AlertCircleIcon,
  RefreshCw as RefreshCwIcon,
  Building as BuildingIcon,
  User as UserIcon,
  ShieldCheck as ShieldCheckIcon
} from "lucide-vue-next";
import { lawApi } from "../../api/law";
import { userApi } from "../../api/user";
import { io } from "socket.io-client";
import CmConfirm from "../../components/CmConfirm.vue";
import LawScheduleConfigModal from "./components/LawScheduleConfigModal.vue";
import LawOfficeScheduleBoard from "./components/LawOfficeScheduleBoard.vue";
import LawyerScheduleCalendarModal from "./components/LawyerScheduleCalendarModal.vue";

// Active Management Tab
const route = useRoute();
const router = useRouter();

const scheduleModal = ref<InstanceType<typeof LawScheduleConfigModal> | null>(null);
const scheduleBoard = ref<InstanceType<typeof LawOfficeScheduleBoard> | null>(null);
const lawyerCalendarModal = ref<InstanceType<typeof LawyerScheduleCalendarModal> | null>(null);

const activeSubTab = computed({
  get: () => (route.params.tab as string) || "chat",
  set: (val) => {
    router.push(`/law-admin/${val}`);
    if (val === 'appointments') fetchAppointments();
  }
});

const officeSchedules = ref<Record<string, any[]>>({});
const currentSchedulingOfficeId = ref<string | null>(null);

// On Mount, restore scheduled states from localStorage
onMounted(() => {
  const cachedSchedules = localStorage.getItem('office_schedules_cache');
  if (cachedSchedules) {
     try {
       officeSchedules.value = JSON.parse(cachedSchedules);
     } catch (e) {
       console.error("Failed to parse schedule cache", e);
     }
  }
});

// Lawyer Management
const lawyerList = ref<any[]>([]);
const availableUsers = ref<any[]>([]);
const specialties = ref<string[]>([]);
const showLawyerModal = ref(false);
const editingLawyerId = ref<string | null>(null);

const officeList = ref([
  { 
    id: 'office_1', 
    name: 'Phòng Tư Vấn Dân Sự 01', 
    type: 'Luật Dân Sự', 
    maxLawyers: 5,
    receptionRooms: [
      { id: 'room_1', name: 'Phòng Trực Kính 1', type: 'Tư Vấn Cơ Bản' },
      { id: 'room_2', name: 'Phòng VIP 2', type: 'Tư Vấn Kín' }
    ]
  },
  { 
    id: 'office_2', 
    name: 'Phòng Hình Sự Trọng Án', 
    type: 'Luật Hình Sự', 
    maxLawyers: 3,
    receptionRooms: [
      { id: 'room_3', name: 'Phòng Hội Thẩm', type: 'Nghiệp Vụ' }
    ]
  },
  { 
    id: 'office_3', 
    name: 'Phòng Tín Dụng & Khởi Nghiệp', 
    type: 'Tài Chính Doanh Nghiệp', 
    maxLawyers: 6,
    receptionRooms: []
  },
]);

const handleAddRoom = (office: any) => {
  const roomName = prompt("Nhập tên phòng tiếp khách/phòng trực mới:", "Phòng Tiếp dân");
  if (roomName) {
    if (!office.receptionRooms) office.receptionRooms = [];
    office.receptionRooms.push({ id: 'r_' + Math.random().toString(36).substr(2, 9), name: roomName, type: 'Cơ bản' });
  }
};

const handleRemoveRoom = (office: any, roomId: string) => {
  if (confirm("Lưu ý: Bố cục xếp lịch trong phòng này sẽ bị ảnh hưởng. Xóa phòng trực?")) {
    office.receptionRooms = office.receptionRooms.filter((r: any) => r.id !== roomId);
  }
};

const handleAddStaffToOffice = () => {
  alert("Vui lòng vào tab 'Đội ngũ Luật sư', lật thẻ nhân sự và gán họ vào văn phòng này trong mục 'Phân bổ Văn Phòng'. Hệ thống quản lý thẻ nhân sự độc lập.");
};

const lawyerForm = ref({
  userId: "",
  specialty: "",
  bio: "",
  isVerified: false
});

const handleViewSchedule = (officeId: string) => {
  const scheduleData = officeSchedules.value[officeId];
  if (scheduleData && scheduleData.length > 0) {
    scheduleBoard.value?.open(scheduleData);
  } else {
    triggerModal({
      title: "Lịch Trực Trống",
      message: "Văn phòng này chưa được cấu hình phiên trực nào. Vui lòng bấm 'Xếp lịch' đễ kích hoạt hệ thống AI tự động phân bổ trước khi xem.",
      icon: AlertCircleIcon,
      variant: 'primary',
      showCancel: false,
      confirmText: 'Đã Hiểu'
    });
  }
};

const handleScheduleSubmit = async (config: any) => {
  const lawyersCount = config.selectedDataIds?.lawyers?.length || 0;
  const roomsCount = config.selectedDataIds?.rooms?.length || 0;
  
  if (lawyersCount === 0 || roomsCount === 0) {
    triggerModal({
      title: "Lỗi Đầu Vào",
      message: "Bạn cần cung cấp ít nhất 1 Luật sư và 1 Phòng trực để chạy thuật toán phân bổ.",
      icon: AlertCircleIcon,
      variant: 'danger',
      showCancel: false
    });
    return;
  }

  // Pre-loading State
  triggerModal({
    title: "Đang gọi Backend AI API...",
    message: `Hệ thống đang cấu hình các ràng buộc (Constraints) với ${lawyersCount} luật sư và ${roomsCount} phòng trực gửi lên Server phân tích...`,
    icon: RefreshCwIcon,
    variant: 'primary',
    showCancel: false,
    confirmText: '...'
  });

  const startDate = new Date();
  const endDate = new Date();
  // Request schedule for next 5 working days
  endDate.setDate(startDate.getDate() + 5);

  const mappedRooms = config.selectedDataIds.rooms.map((id: string) => {
    let roomName = "Phòng Trực Hệ thống";
    for(const off of officeList.value) {
      if (off.receptionRooms) {
          const foundRm = off.receptionRooms.find((r: any) => r.id === id);
          if (foundRm) { roomName = foundRm.name; break; }
      }
    }
    return { id, name: roomName, type: 'room' };
  });

  // Generate activities to fully populate the matrix: 5 days * 2 shifts = 10 slots per room
  const dynamicActivities: any[] = [];
  mappedRooms.forEach((rm: any) => {
    for (let i = 0; i < 10; i++) {
       dynamicActivities.push({
         id: `act_${rm.id}_${i}`,
         name: `Phiên trực tại ${rm.name}`,
         duration: 240, // 4 hours
         requiredUsers: 1,
         requiredResources: [rm.id] // Strictly bind this activity to this room
       });
    }
  });

  const hardConstraints = ['no_user_overlap', 'no_resource_overlap'];
  if (config.advanced?.noConsecutiveShifts) hardConstraints.push('no_consecutive_shifts');
  if (config.advanced?.noNightAfterMorning) hardConstraints.push('no_night_after_morning');

  // Mapping FE selection format to BE DTO schema required by `law-schedule.dto.ts`
  const payload = {
    timeConfig: {
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      workingDays: [1, 2, 3, 4, 5],
      timeSlots: [
        { start: "08:00", end: "12:00" },
        { start: "13:00", end: "17:00" }
      ]
    },
    users: config.selectedDataIds.lawyers.map((id: string) => {
      const lInfo = lawyerList.value.find(l => l.id === id);
      return { id, name: lInfo?.user?.displayName || 'Ẩn danh', role: 'lawyer' };
    }),
    resources: mappedRooms,
    activities: dynamicActivities,
    constraints: {
       hard: hardConstraints
    },
    optimization: { strategy: 'greedy' }
  };

  try {
    const res = await lawApi.generateSchedule(payload);
    closeModal(); // Close the loading modal

    if (res.status === 200 || res.status === 201) {
      const scheduledItems = res.data?.scheduled || [];
      
      const mappedScheduleList = scheduledItems.map((s: any) => {
        const h = parseInt(s.startTime.split(':')[0]);
        // Re-resolve user name
        const assignedUserName = s.assignedUsers?.[0] 
          ? payload.users.find((u: any) => u.id === s.assignedUsers[0])?.name || 'Vắng'
          : 'Chưa xếp';
        
        // Re-resolve room name
        const assignedRoomName = s.assignedResources?.[0]
          ? payload.resources.find((r: any) => r.id === s.assignedResources[0])?.name || ('Phòng ID:' + s.assignedResources[0])
          : 'Chưa xếp phòng';

        return {
          lawyerName: assignedUserName,
          roomName: assignedRoomName,
          date: new Date(s.date).toLocaleDateString('vi-VN'),
          shift: h < 12 ? `Sáng (${s.startTime} - ${s.endTime})` : `Chiều (${s.startTime} - ${s.endTime})`
        };
      });

      if (currentSchedulingOfficeId.value) {
         officeSchedules.value[currentSchedulingOfficeId.value] = mappedScheduleList;
         // Persist results into Browser Cache securely via localStorage
         localStorage.setItem('office_schedules_cache', JSON.stringify(officeSchedules.value));
      }

      scheduleBoard.value?.open(mappedScheduleList);
    } else {
      triggerModal({ title: "Lỗi Thuật toán", message: res.message || "Không thể khởi chạy quy trình xếp lịch.", icon: AlertCircleIcon, variant: 'danger' });
    }
  } catch (error) {
    closeModal();
    triggerModal({ title: "Mất Kết nối", message: "Server backend hiện không phản hồi chức năng thuật toán.", icon: AlertCircleIcon, variant: 'danger' });
  }
};

// Appointment Management
const appointmentList = ref<any[]>([]);
const isFetchingAppointments = ref(false);

const fetchAppointments = async () => {
  isFetchingAppointments.value = true;
  try {
    const data = await lawApi.getAppointments();
    appointmentList.value = data;
  } catch (err) {
    console.error(err);
  } finally {
    isFetchingAppointments.value = false;
  }
};

const handleConfirmAppointment = async (id: string) => {
  const res = await lawApi.confirmAppointment(id);
  if (res.status === 200) {
    triggerModal({
      title: "Thành công",
      message: "Đã xác nhận lịch hẹn.",
      icon: CheckCircleIcon,
      variant: 'teal'
    });
    fetchAppointments();
  }
};

const handleCancelAppointment = async (id: string) => {
  triggerModal({
    title: "Xác nhận Hủy",
    message: "Bạn có chắc chắn muốn hủy lịch hẹn này?",
    icon: AlertCircleIcon,
    variant: 'danger',
    showCancel: true,
    confirmText: "Xác nhận Hủy",
    onConfirm: async () => {
      const res = await lawApi.cancelAppointment(id);
      if (res.status === 200) {
        fetchAppointments();
      }
    }
  });
};

// Application Submissions Logic
const submissionTab = ref('list'); // 'list' or 'templates'
const submissionList = ref<any[]>([]);
const isFetchingSubmissions = ref(false);
const appFilter = ref('all');
const showSubmissionModal = ref(false);
const selectedSubmission = ref<any>(null);

const fetchSubmissions = async () => {
  isFetchingSubmissions.value = true;
  try {
    submissionList.value = await lawApi.getSubmissions();
  } catch (err) {
    console.error(err);
  } finally {
    isFetchingSubmissions.value = false;
  }
};

const filteredSubmissions = computed(() => {
  if (appFilter.value === 'all') return submissionList.value;
  return submissionList.value.filter(s => s.status === appFilter.value);
});

const viewSubmissionDetail = (sub: any) => {
  selectedSubmission.value = JSON.parse(JSON.stringify(sub));
  showSubmissionModal.value = true;
};

const updateSubStatus = async (status: string) => {
  if (!selectedSubmission.value) return;
  const res = await lawApi.updateSubmissionStatus(selectedSubmission.value.id, { 
    status,
    adminNotes: selectedSubmission.value.adminNotes
  });
  if (res.status === 200) {
    triggerModal({ title: "Thành công", message: "Đã cập nhật trạng thái đơn.", icon: CheckCircleIcon, variant: 'teal' });
    showSubmissionModal.value = false;
    fetchSubmissions();
  }
};

const handleDeleteSubmission = async (id: string) => {
  triggerModal({
    title: "Xác nhận Xóa",
    message: "Bạn có chắc chắn muốn xóa đơn hồ sơ này không?",
    icon: TrashIcon,
    variant: 'danger',
    showCancel: true,
    onConfirm: async () => {
      const res = await lawApi.deleteSubmission(id);
      if (res.status === 200) fetchSubmissions();
    }
  });
};

// Template Management Logic (List Only)
const templateList = ref<any[]>([]);

const fetchTemplates = async () => {
  try {
    templateList.value = await lawApi.getApplications();
  } catch (err) {
    console.error(err);
  }
};

const handleDeleteTemplate = async (id: string) => {
  triggerModal({
    title: "Xác nhận Xóa",
    message: "Bạn có chắc chắn muốn xóa mẫu hồ sơ này?",
    icon: TrashIcon,
    variant: 'danger',
    showCancel: true,
    onConfirm: async () => {
      const res = await lawApi.deleteApplication(id);
      if (res.status === 200) fetchTemplates();
    }
  });
};

const fetchLawyers = async () => {
  const data = await lawApi.getLawyers();
  lawyerList.value = data;
};

const fetchSpecialties = async () => {
  const data = await lawApi.getSpecialties();
  specialties.value = data;
};

const fetchAvailableUsers = async () => {
  const data = await userApi.getUsers();
  // Filter users who are not already lawyers in the list (simplified check)
  if (Array.isArray(data)) {
    const existingUserIds = lawyerList.value.map(l => l.userId);
    availableUsers.value = data.filter(u => !existingUserIds.includes(u.id));
  }
};

const openLawyerModal = async (lawyer?: any) => {
  if (lawyer) {
    editingLawyerId.value = lawyer.id;
    lawyerForm.value = {
      userId: lawyer.userId,
      specialty: lawyer.specialty || "",
      bio: lawyer.bio || "",
      isVerified: lawyer.isVerified || false
    };
  } else {
    editingLawyerId.value = null;
    lawyerForm.value = { userId: "", specialty: "", bio: "", isVerified: false };
    await fetchAvailableUsers();
  }
  showLawyerModal.value = true;
};

const saveLawyer = async () => {
  if (editingLawyerId.value) {
    const res = await lawApi.updateLawyer(editingLawyerId.value, lawyerForm.value);
    if (res.status === 200) {
      triggerModal({
        title: "Thành công",
        message: "Cập nhật luật sư thành công!",
        icon: StarIcon,
        variant: 'teal'
      });
    }
  } else {
    const res = await lawApi.createLawyer(lawyerForm.value);
    if (res.status === 200 || res.status === 201) {
      triggerModal({
        title: "Thành công",
        message: "Thêm luật sư thành công!",
        icon: UserPlusIcon,
        variant: 'teal'
      });
    } else {
      triggerModal({
        title: "Lỗi",
        message: res.message || "Lỗi khi thêm luật sư",
        icon: XCircleIcon,
        variant: 'danger'
      });
    }
  }
  showLawyerModal.value = false;
  fetchLawyers();
};

const assignLawyerOffice = async (lawyer: any) => {
  try {
    const res = await lawApi.updateLawyer(lawyer.id, { officeId: lawyer.officeId });
    if (res.status === 200) {
      // Data is already updated locally via v-model, but let's sync to ensure no desync
      fetchLawyers();
    } else {
      triggerModal({ title: "Lỗi Hệ thống", message: "Không thể lưu phân bổ vào CSDL.", icon: AlertCircleIcon, variant: 'danger' });
    }
  } catch (err) {
    triggerModal({ title: "Lỗi Kết nối", message: "Vui lòng kiểm tra lại đường truyền.", icon: AlertCircleIcon, variant: 'danger' });
  }
};

const handleDeleteLawyer = async (id: string) => {
  triggerModal({
    title: "Xác nhận Xóa",
    message: "Bạn có chắc chắn muốn xóa luật sư này? Tài khoản sẽ chuyển về role User.",
    icon: TrashIcon,
    variant: 'danger',
    showCancel: true,
    confirmText: "Xác nhận Xóa",
    onConfirm: async () => {
      const res = await lawApi.deleteLawyer(id);
      if (res.status === 200) {
        fetchLawyers();
      }
    }
  });
};

onMounted(async () => {
  await fetchLawyers();
  await fetchSpecialties();
  if (activeSubTab.value === 'appointments') fetchAppointments();
  if (activeSubTab.value === 'applications') fetchSubmissions();
  if (activeSubTab.value === 'template-management') fetchTemplates();
  if (activeSubTab.value === 'posts') fetchArticles();
  if (activeSubTab.value === 'questions') fetchQuestions();
  fetchTemplates(); // Always fetch for the UI to be ready
  fetchArticles(); // Always fetch for the UI to be ready
  fetchQuestions(); // Always fetch
  initChatSocket();
});

const chatHistoryMap = ref<Record<string, any[]>>({});

const initChatSocket = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  // Robust lawyer profile detection
  const myLawyerProfile = lawyerList.value.find(l => 
    l.userId === user.id || 
    (l.user?.email && user.email && l.user.email.toLowerCase() === user.email.toLowerCase())
  );

  let baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
  baseUrl = baseUrl.replace(/\/api$/, '');
  const socket = io(`${baseUrl}/law`);

  socket.on("lawyer_needed", (data: any) => {
    // String cast IDs to ensure strict comparison works for mixed types (string/number)
    const targetId = data.preferredLawyerId ? String(data.preferredLawyerId) : null;
    const myId = myLawyerProfile ? String(myLawyerProfile.id) : null;
    
    console.log("Checking incoming request:", { targetId, myId, roomId: data.roomId });
    
    const isForMe = !targetId || (myId && targetId === myId);
    
    if (isForMe) {
        console.log("Matching request found! Joining room...");
      // Add to active customers if not already there
      const existing = activeCustomers.value.find(c => c.roomId === data.roomId);
      if (!existing) {
        const newCustomer = {
          id: data.customerId,
          roomId: data.roomId,
          name: data.customerInfo?.name || "Khách hàng mới",
          avatar: data.customerInfo?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.customerId}`,
          lastMsg: "Đang chờ tư vấn...",
          lastTime: "Vừa xong",
          unread: true,
          currentTopic: data.category || "Tư vấn Pháp luật"
        };
        activeCustomers.value.unshift(newCustomer);
        
        // Auto-select if first customer
        if (!selectedCustomerId.value) {
           selectedCustomerId.value = data.customerId;
        }

        // Auto-join the room
        socket.emit("lawyer_join", {
          roomId: data.roomId,
          lawyerId: myId, // Send permanent database ID
          lawyerInfo: {
            name: user.displayName || user.email,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`
          }
        });
      }
    } else {
      console.log("Request is not for me (specific lawyer targeted)");
    }
  });

  socket.on("new_message", (data: any) => {
    const roomId = data.roomId;
    if (!chatHistoryMap.value[roomId]) chatHistoryMap.value[roomId] = [];
    
    chatHistoryMap.value[roomId].push({
      sender: data.senderInfo?.role === "lawyer" ? "lawyer" : "user",
      text: data.message,
      time: data.time ? new Date(data.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    // Update last message in active customers
    const customer = activeCustomers.value.find(c => c.roomId === roomId);
    if (customer) {
      customer.lastMsg = data.message;
      customer.lastTime = "Vừa xong";
      if (selectedCustomerId.value !== customer.id) {
        customer.unread = true;
      }
    }
    
    scrollToBottom();
  });

  // Store socket for later use
  (window as any).adminChatSocket = socket;

  socket.on("connect", () => {
    console.log("Admin Socket connected. Fetching active rooms for lawyerId:", myLawyerProfile?.id);
    socket.emit("get_active_rooms", { lawyerId: myLawyerProfile?.id });
  });

  socket.on("active_rooms_list", (rooms: any[]) => {
    rooms.forEach(room => {
      const existing = activeCustomers.value.find(c => c.roomId === room.roomId);
      if (!existing) {
        activeCustomers.value.unshift({
          id: room.customerId,
          roomId: room.roomId,
          name: room.customerInfo?.name || "Khách hàng cũ",
          avatar: room.customerInfo?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${room.customerId}`,
          lastMsg: "Đang chờ tư vấn (Từ bộ nhớ)...",
          lastTime: "Trước đó",
          unread: true,
          currentTopic: "Tư vấn Pháp luật"
        });
      }
    });
  });

  socket.on("room_closed", (data: any) => {
    const closedRoomId = data.roomId;
    const customer = activeCustomers.value.find(c => c.roomId === closedRoomId);
    if (customer) {
      triggerModal({
        title: "Đoạn chat kết thúc",
        message: `Khách hàng ${customer.name} đã đóng đoạn chat. Cảm ơn bạn đã tư vấn.`,
        icon: XCircleIcon,
        variant: 'primary',
        showCancel: false,
        confirmText: "Đóng"
      });
      // Remove from active list
      activeCustomers.value = activeCustomers.value.filter(c => c.roomId !== closedRoomId);
      if (selectedCustomerId.value === customer.id) {
        selectedCustomerId.value = "";
      }
    }
  });
};

// Live Chat Logic
const selectedCustomerId = ref("");
const activeCustomers = ref<any[]>([]);

const selectedCustomer = computed(() => activeCustomers.value.find(c => c.id === selectedCustomerId.value));
const currentChatHistory = computed(() => {
  if (!selectedCustomer.value) return [];
  return chatHistoryMap.value[selectedCustomer.value.roomId] || [];
});
const newMessage = ref("");
const chatContainer = ref<HTMLElement | null>(null);

const showModal = ref(false);
const modalConfig = ref({
  title: '',
  message: '',
  icon: null,
  showCancel: false,
  confirmText: 'Xác nhận',
  cancelText: 'Hủy bỏ',
  variant: 'teal' as const,
  onConfirm: () => {}
});

const triggerModal = (config: any) => {
  modalConfig.value = { ...modalConfig.value, ...config };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const handleModalConfirm = () => {
  if (modalConfig.value.onConfirm) modalConfig.value.onConfirm();
  closeModal();
};

const confirmEndChat = () => {
  if (!selectedCustomer.value) return;
  triggerModal({
    title: "Kết thúc Tư vấn",
    message: "Đoạn chat sẽ kết thúc và toàn bộ dữ liệu sẽ bị xoá. Bạn đã thông báo cho khách hàng chưa?",
    icon: XCircleIcon,
    showCancel: true,
    confirmText: "Xác nhận Kết thúc",
    cancelText: "Tiếp tục Chat",
    variant: 'danger',
    onConfirm: () => {
      const socket = (window as any).adminChatSocket;
      if (socket) {
        socket.emit("close_room", { roomId: selectedCustomer.value.roomId });
        // Remove from active list
        activeCustomers.value = activeCustomers.value.filter(c => c.id !== selectedCustomerId.value);
        selectedCustomerId.value = "";
      }
    }
  });
};

const sendAdminMessage = () => {
  if (!newMessage.value.trim() || !selectedCustomer.value) return;
  const socket = (window as any).adminChatSocket;
  if (!socket) return;

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  
  socket.emit("send_message", {
    roomId: selectedCustomer.value.roomId,
    message: newMessage.value,
    senderInfo: {
      role: "lawyer",
      name: user.displayName || user.email
    }
  });

  newMessage.value = "";
  scrollToBottom();
};

const scrollToBottom = async () => {
  await nextTick();
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
};

const customerQuestions = ref<any[]>([]);
const showAnswerModal = ref(false);
const selectedQuestion = ref<any>(null);
const answerText = ref("");

const fetchQuestions = async () => {
  try {
    const data = await lawApi.getQuestions();
    customerQuestions.value = data;
  } catch (err) {
    console.error(err);
  }
};

const openAnswerModal = (q: any) => {
  selectedQuestion.value = q;
  answerText.value = q.answer || "";
  showAnswerModal.value = true;
};

const submitAnswer = async () => {
  if (!selectedQuestion.value || !answerText.value.trim()) return;
  
  const res = await lawApi.answerQuestion(selectedQuestion.value.id, { 
    answer: answerText.value 
  });

  if (res.status === 200 || res.status === 201) {
    triggerModal({
      title: "Thành công",
      message: "Đã gửi câu trả lời cho khách hàng.",
      icon: CheckCircleIcon,
      variant: 'teal'
    });
    showAnswerModal.value = false;
    fetchQuestions();
  } else {
    triggerModal({
      title: "Lỗi",
      message: res.message || "Không thể gửi câu trả lời.",
      icon: AlertCircleIcon,
      variant: 'danger'
    });
  }
};

const handleDeleteQuestion = async (id: string) => {
  triggerModal({
    title: "Xác nhận Xóa",
    message: "Bạn có chắc chắn muốn xóa câu hỏi này?",
    icon: TrashIcon,
    variant: 'danger',
    showCancel: true,
    onConfirm: async () => {
      const res = await lawApi.deleteQuestion(id);
      if (res.status === 200) {
        fetchQuestions();
      }
    }
  });
};

// Post Management
const lawPosts = ref<any[]>([]);
const showArticleModal = ref(false);
const editingArticleId = ref<string | null>(null);
const articleForm = ref({
  title: "",
  excerpt: "",
  content: "",
  category: "TIN TỨC",
  cover: ""
});

const fetchArticles = async () => {
  try {
    const data = await lawApi.getArticles();
    lawPosts.value = data;
  } catch (err) {
    console.error(err);
  }
};

const openArticleModal = (article?: any) => {
  if (article) {
    editingArticleId.value = article.id;
    articleForm.value = {
      title: article.title,
      excerpt: article.excerpt || "",
      content: article.content,
      category: article.category || "TIN TỨC",
      cover: article.cover || ""
    };
  } else {
    editingArticleId.value = null;
    articleForm.value = {
      title: "",
      excerpt: "",
      content: "",
      category: "TIN TỨC",
      cover: ""
    };
  }
  showArticleModal.value = true;
};

const saveArticle = async () => {
  try {
    let res;
    if (editingArticleId.value) {
      res = await lawApi.updateArticle(editingArticleId.value, articleForm.value);
    } else {
      res = await lawApi.createArticle(articleForm.value);
    }

    if (res.status === 200 || res.status === 201) {
      triggerModal({
        title: "Thành công",
        message: editingArticleId.value ? "Đã cập nhật bài viết." : "Đã đăng bài viết mới.",
        icon: CheckCircleIcon,
        variant: 'teal'
      });
      showArticleModal.value = false;
      fetchArticles();
    } else {
      triggerModal({
        title: "Lỗi",
        message: res.message || "Không thể lưu bài viết.",
        icon: AlertCircleIcon,
        variant: 'danger'
      });
    }
  } catch (err) {
    console.error(err);
  }
};

const handleDeleteArticle = async (id: string) => {
  triggerModal({
    title: "Xác nhận Xóa",
    message: "Bạn có chắc chắn muốn xóa bài viết này?",
    icon: TrashIcon,
    variant: 'danger',
    showCancel: true,
    onConfirm: async () => {
      const res = await lawApi.deleteArticle(id);
      if (res.status === 200) {
        fetchArticles();
      }
    }
  });
};

// 3D Card Animation state
const flippedCards = ref<Set<string>>(new Set());
const toggleCardFlip = (id: string, event: Event) => {
  const isInputOrButton = (event.target as HTMLElement).closest('select, button, input');
  if (isInputOrButton) return;

  if (flippedCards.value.has(id)) {
    const newSet = new Set(flippedCards.value);
    newSet.delete(id);
    flippedCards.value = newSet;
  } else {
    flippedCards.value = new Set(flippedCards.value).add(id);
  }
};
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
