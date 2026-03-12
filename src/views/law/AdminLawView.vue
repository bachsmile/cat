<template>
  <div class="min-h-screen bg-[#050508] text-white font-['Inter',_sans-serif] p-6 lg:p-8">
    <!-- Main Container -->
    <div class="max-w-[1600px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <!-- Top Management Header -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-[#0a0a0f] border border-white/5 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
        <div class="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 blur-[80px] rounded-full"></div>
        <div class="relative z-10">
          <h2 class="text-3xl font-black italic tracking-tighter">
            Hệ thống <span class="text-teal-400">Quản trị Pháp lý</span>
          </h2>
          <p class="text-gray-500 text-sm mt-2">Điều hành đội ngũ luật sư, xử lý thắc mắc và quản lý nội dung pháp luật.</p>
        </div>
        
        <div class="flex flex-wrap items-center gap-3">
          <button 
            v-for="tab in adminTabs" 
            :key="tab.id"
            @click="activeSubTab = tab.id"
            class="px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all border"
            :class="activeSubTab === tab.id 
              ? 'bg-teal-600 border-teal-500 text-white shadow-lg shadow-teal-500/20' 
              : 'bg-white/5 border-white/5 text-gray-500 hover:text-white hover:bg-white/10'"
          >
            <div class="flex items-center gap-2">
              <component :is="tab.icon" class="w-4 h-4" />
              {{ tab.label }}
            </div>
          </button>
        </div>
      </div>

      <!-- Content Sections -->
      <div class="transition-all duration-500">
        
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
              <button @click="openLawyerModal()" class="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all">
                Thêm luật sư mới
              </button>
            </div>

            <!-- Lawyer Table -->
            <div class="overflow-x-auto">
              <table class="w-full text-left">
                <thead>
                  <tr class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 border-b border-white/5">
                    <th class="pb-4 px-4">Thông tin</th>
                    <th class="pb-4 px-4">Chuyên môn</th>
                    <th class="pb-4 px-4 text-center">Đánh giá</th>
                    <th class="pb-4 px-4 text-center">Trạng thái</th>
                    <th class="pb-4 px-4 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-white/5">
                  <tr v-for="lawyer in lawyerList" :key="lawyer.id" class="group hover:bg-white/[0.02] transition-colors">
                    <td class="py-5 px-4">
                      <div class="flex items-center gap-3">
                        <img :src="lawyer.user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${lawyer.user?.displayName || lawyer.id}`" class="w-10 h-10 rounded-xl" />
                        <div>
                          <p class="text-sm font-bold text-gray-200">{{ lawyer.user?.displayName || 'N/A' }}</p>
                          <p class="text-[10px] text-gray-600">{{ lawyer.user?.email || 'N/A' }}</p>
                        </div>
                      </div>
                    </td>
                    <td class="py-5 px-4">
                      <span class="text-xs text-teal-400 font-bold bg-teal-500/5 px-3 py-1 rounded-full border border-teal-500/10">{{ lawyer.specialty || 'Chưa cập nhật' }}</span>
                    </td>
                    <td class="py-5 px-4 text-center">
                      <div class="flex items-center justify-center gap-1">
                        <StarIcon class="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span class="text-xs font-bold text-gray-300">{{ lawyer.rating }}</span>
                      </div>
                    </td>
                    <td class="py-5 px-4 text-center">
                      <span class="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border"
                        :class="lawyer.isVerified ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-gray-500/10 text-gray-500 border-gray-500/20'">
                        {{ lawyer.isVerified ? 'Đã xác minh' : 'Chưa xác minh' }}
                      </span>
                    </td>
                    <td class="py-5 px-4 text-right">
                      <div class="flex items-center justify-end gap-2">
                        <button @click="openLawyerModal(lawyer)" class="p-2 hover:bg-teal-500/10 rounded-lg text-gray-500 hover:text-teal-400 transition-all">
                          <EditIcon class="w-4 h-4" />
                        </button>
                        <button @click="handleDeleteLawyer(lawyer.id)" class="p-2 hover:bg-red-500/10 rounded-lg text-gray-500 hover:text-red-400 transition-all">
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

        <!-- Question Management -->
        <div v-else-if="activeSubTab === 'questions'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="q in customerQuestions" 
            :key="q.id"
            class="bg-[#0a0a0f] border border-white/5 rounded-[2rem] p-8 hover:border-teal-500/30 transition-all group relative overflow-hidden"
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
              <div>
                <h4 class="text-xs font-bold text-gray-500 uppercase tracking-widest">{{ q.category }}</h4>
                <p class="text-[10px] text-gray-600">{{ q.date }}</p>
              </div>
            </div>

            <h3 class="text-lg font-bold mb-4 group-hover:text-teal-400 transition-colors italic line-clamp-1">{{ q.title }}</h3>
            <p class="text-sm text-gray-500 leading-relaxed mb-8 line-clamp-3">{{ q.content }}</p>

            <div class="flex items-center justify-between pt-6 border-t border-white/5">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-full bg-white/5 border border-white/10 overflow-hidden">
                  <img :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${q.customerName}`" />
                </div>
                <span class="text-xs font-bold text-gray-400">{{ q.customerName }}</span>
              </div>
              <button class="px-5 py-2 bg-white/5 hover:bg-teal-600 text-xs font-bold rounded-xl transition-all border border-white/5 hover:border-teal-500">
                Phản hồi
              </button>
            </div>
          </div>
        </div>

        <!-- Post/Article Management -->
        <div v-else-if="activeSubTab === 'posts'" class="space-y-6">
          <div class="flex items-center justify-between mb-2">
             <h3 class="text-2xl font-black italic tracking-tighter">Quản lý <span class="text-gray-500">Thư viện Pháp luật</span></h3>
             <button class="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all">Viết bài mới</button>
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
                        <button class="text-gray-500 hover:text-white transition-colors"><EditIcon class="w-4 h-4" /></button>
                        <button class="text-gray-500 hover:text-red-400 transition-colors"><TrashIcon class="w-4 h-4" /></button>
                     </div>
                   </div>
                   <h4 class="text-lg font-bold leading-tight mb-2 group-hover:text-white transition-colors">{{ post.title }}</h4>
                   <p class="text-[11px] text-gray-500 italic">{{ post.excerpt }}</p>
                 </div>
                 <div class="flex items-center gap-4 text-[9px] font-bold text-gray-600 uppercase tracking-widest">
                    <span>{{ post.views }} lượt xem</span>
                    <span>{{ post.date }}</span>
                 </div>
               </div>
            </div>
          </div>
        </div>

      </div>
    </div>

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
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  MessageSquare as MessageSquareIcon,
  Users as UsersIcon,
  FileText as FileTextIcon,
  MessageCircle as ChatIcon,
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
} from "lucide-vue-next";
import { lawApi } from "../../api/law";
import { userApi } from "../../api/user";
import { io } from "socket.io-client";
import CmConfirm from "../../components/CmConfirm.vue";

// Active Management Tab
const route = useRoute();
const router = useRouter();

const activeSubTab = computed({
  get: () => (route.params.tab as string) || "chat",
  set: (val) => {
    router.push(`/law-admin/${val}`);
    if (val === 'appointments') fetchAppointments();
  }
});

const adminTabs = [
  { id: "chat", label: "Tư vấn Trực tuyến", icon: ChatIcon },
  { id: "appointments", label: "Quản lý Lịch hẹn", icon: CalendarIcon },
  { id: "lawyers", label: "Quản lý Luật sư", icon: UsersIcon },
  { id: "questions", label: "Quản lý Câu hỏi", icon: MessageSquareIcon },
  { id: "posts", label: "Quản lý Bài viết", icon: FileTextIcon },
];

// Lawyer Management
const lawyerList = ref<any[]>([]);
const availableUsers = ref<any[]>([]);
const specialties = ref<string[]>([]);
const showLawyerModal = ref(false);
const editingLawyerId = ref<string | null>(null);
const lawyerForm = ref({
  userId: "",
  specialty: "",
  bio: "",
  isVerified: false
});

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
  if (activeSubTab.value === 'appointments') {
    fetchAppointments();
  }
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

// Question Management (Mocked)
const customerQuestions = ref([
  { id: "QS_1024", title: "Thủ tục sang tên sổ đỏ 2024", content: "Tôi muốn hỏi về quy trình và lệ phí khi thực hiện việc tặng cho quyền sử dụng đất từ bố mẹ sang con cái và các điểm mới trong luật đất đai 2024...", category: "Đất Đai", customerName: "Thanh Hải", date: "12-03-2025", status: "Pending" },
  { id: "QS_1025", title: "Tranh chấp hợp đồng lao động", content: "Công ty đột ngột chấm dứt hợp đồng lao động mà không báo trước, tôi cần làm gì để bảo vệ quyền lợi tối đa?", category: "Lao Động", customerName: "Minh Anh", date: "11-03-2025", status: "Answered" },
]);

// Post Management (Mocked)
const lawPosts = ref([
  { id: 1, title: "Điểm mới Luật Đất Đai 2024", excerpt: "Những thay đổi quan trọng về bồi thường, tái định cư và bảng giá đất mới nhất.", category: "TIN TỨC", date: "10-03-2025", views: 1250, cover: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=400&fit=crop" },
  { id: 2, title: "Quy trình thành lập Startup", excerpt: "Hướng dẫn chi tiết từ bước đăng ký kinh doanh đến bảo hộ thương hiệu cho doanh nghiệp trẻ.", category: "HƯỚNG DẪN", date: "08-03-2025", views: 890, cover: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=400&fit=crop" },
]);
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
