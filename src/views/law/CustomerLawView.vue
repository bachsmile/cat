<template>
  <div class="min-h-screen bg-[#050508] text-white  overflow-x-hidden relative">
    <!-- Background Decor -->
    <div class="fixed inset-0 z-0 pointer-events-none">
      <div class="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full animate-pulse"></div>
      <div class="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-indigo-600/10 blur-[100px] rounded-full animate-pulse" style="animation-delay: 2s"></div>
    </div>

    <!-- Navbar -->
    <nav class="border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-xl sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
        <div class="flex items-center gap-3 cursor-pointer group" @click="router.push('/home')">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center transform group-hover:rotate-6 transition-transform">
            <ScaleIcon class="w-5 h-5 text-white" />
          </div>
          <span class="text-xl font-bold tracking-tight">Nova<span class="text-blue-400">Law</span></span>
        </div>
        
        <div class="flex items-center gap-8">
            <div class="hidden md:flex items-center gap-10">
              <a 
                v-for="link in navLinks" 
                :key="link.name" 
                href="#"
                @click.prevent="link.handler()"
                class="text-xs font-black uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-colors"
              >
                {{ link.name }}
              </a>
            </div>
          <button @click="router.push('/home')" class="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all" title="Trang chủ">
            <HomeIcon class="w-5 h-5 text-gray-400" />
          </button>
          
          <button 
            v-if="isAdminOrLawyer"
            @click="router.push('/law-admin')" 
            class="flex items-center gap-2 px-4 py-2.5 bg-blue-500/10 hover:bg-blue-500 text-blue-400 hover:text-white rounded-xl border border-blue-500/20 hover:border-blue-500 transition-all font-black text-[10px] uppercase tracking-widest shadow-lg hover:shadow-blue-500/40"
          >
            <ShieldCheckIcon class="w-4 h-4" />
            Admin Mode
          </button>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto px-6 py-12 relative z-10 transition-all duration-700">
      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-6 animate-in fade-in slide-in-from-left-4 duration-500">
        <span @click="router.push('/home')" class="hover:text-blue-400 cursor-pointer transition-colors">Trang chủ</span>
        <ChevronRightIcon class="w-3 h-3" />
        <span class="text-blue-400">Trung tâm Pháp lý</span>
      </div>

      <!-- Top Hero Banner -->
      <section class="relative mb-16 overflow-hidden rounded-[3rem] bg-[#0a0a0f] border border-white/5 shadow-2xl animate-in zoom-in duration-700">
        <div class="absolute inset-0 bg-gradient-to-r from-[#0a0a0f] via-[#0a0a0f]/60 to-transparent z-10"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent z-10"></div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 items-center relative z-20">
          <div class="p-8 md:p-16 space-y-6">
            <div class="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-bold text-blue-400 uppercase tracking-widest">
              <ZapIcon class="w-3 h-3" />
              Chuyên gia pháp lý 24/7
            </div>
            <h1 class="text-4xl md:text-6xl font-black leading-[1.1] tracking-tight">
              Pháp lý Thông minh <br/>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Cho Kỷ nguyên Số</span>
            </h1>
            <p class="text-gray-400 text-sm md:text-lg max-w-lg leading-relaxed">
              NovaLaw cung cấp các giải pháp hỗ trợ pháp lý toàn diện, từ hỏi đáp tức thì đến tư vấn chuyên sâu cùng các luật sư hàng đầu.
            </p>
            <div class="flex gap-4 pt-4">
              <button @click="activeSubTab = 'ask'" class="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20">
                Gửi câu hỏi ngay
              </button>
              <button class="px-8 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-all border border-white/10">
                Tìm hiểu thêm
              </button>
            </div>
          </div>
          
          <div class="relative h-full flex items-center justify-center p-8 lg:p-0 overflow-hidden">
            <div class="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full scale-150"></div>
            <img 
              :src="dogLawImage" 
              alt="NovaLaw Dog" 
              class="relative z-10 w-full max-w-[500px] h-auto object-contain transform hover:scale-105 transition-transform duration-700 drop-shadow-[0_20px_50px_rgba(59,130,246,0.3)]"
            />
          </div>
        </div>
      </section>

      <!-- Main Action Cards -->
      <section class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div 
          v-for="action in mainActions" 
          :key="action.title"
          class="group relative p-8 rounded-[2.5rem] border border-white/5 bg-[#0a0a0f] hover:bg-white/[0.02] transition-all duration-500 overflow-hidden cursor-pointer shadow-2xl"
          @click="action.handler && action.handler()"
        >
          <!-- Hover Glow -->
          <div class="absolute inset-0 bg-gradient-to-br transition-opacity opacity-0 group-hover:opacity-100 duration-500" :class="action.glowClass"></div>
          
          <div class="relative z-10">
            <div class="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500" :class="action.iconBg">
              <component :is="action.icon" class="w-7 h-7" :class="action.iconColor" />
            </div>
            <h3 class="text-2xl font-black mb-3 tracking-tight">{{ action.title }}</h3>
            <p class="text-gray-500 text-sm leading-relaxed mb-8">{{ action.desc }}</p>
            
            <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-widest" :class="action.iconColor">
              Khám phá ngay
              <ArrowRightIcon class="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
            </div>
          </div>

          <!-- Abstract Shape -->
          <div class="absolute -right-8 -bottom-8 w-32 h-32 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
            <component :is="action.icon" class="w-full h-full" />
          </div>
        </div>
      </section>

      <!-- Panel: Detailed Interaction -->
      <section ref="interactionPanel" class="bg-[#0a0a0f] border border-white/5 rounded-[3rem] p-10 md:p-20 shadow-3xl mb-16 relative overflow-hidden group">
        <!-- Inner Border Animation -->
        <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-transparent to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
          <!-- Left: Content Selection -->
          <div class="lg:col-span-4 space-y-10">
            <div>
              <span class="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-4 block">Hệ thống hỗ trợ</span>
              <h2 class="text-4xl font-black leading-[1.1] mb-6">Giải quyết vấn đề <br/><span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Pháp lý của bạn</span></h2>
              <p class="text-gray-500 text-sm leading-relaxed">Sử dụng công nghệ AI kết hợp cùng đội ngũ luật sư chuyên gia để đưa ra giải pháp tối ưu nhất cho hồ sơ của bạn.</p>
            </div>

            <div class="space-y-4">
              <div 
                v-for="tab in interactionTabs" 
                :key="tab.id"
                @click="activeSubTab = tab.id"
                class="p-5 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 group/tab"
                :class="activeSubTab === tab.id ? 'bg-blue-600/10 border-blue-500/50 shadow-lg shadow-blue-500/10' : 'bg-black/20 border-white/5 hover:border-white/10 text-gray-400'"
              >
                <div class="w-10 h-10 rounded-xl flex items-center justify-center transition-colors" :class="activeSubTab === tab.id ? 'bg-blue-500 text-white' : 'bg-white/5 text-gray-600 group-hover/tab:text-gray-400'">
                  <component :is="tab.icon" class="w-5 h-5" />
                </div>
                <div>
                  <h4 class="text-sm font-bold" :class="activeSubTab === tab.id ? 'text-white' : ''">{{ tab.label }}</h4>
                  <p class="text-[10px] text-gray-500">{{ tab.sub }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right: Dynamic Interface Area -->
          <div class="lg:col-span-8 bg-black/40 border border-white/5 rounded-[2.5rem] p-10 md:p-14 relative overflow-hidden min-h-[500px]">
            <Transition name="fade-slide" mode="out-in">
              <div :key="activeSubTab" class="h-full">
                <!-- Lịch hẹn của tôi View -->
                <div v-if="activeSubTab === 'my-appointments'" class="h-full flex flex-col">
                  <div class="flex items-center justify-between border-b border-white/5 pb-6 mb-6">
                    <h3 class="text-xl font-bold flex items-center gap-3">
                      <ActivityIcon class="w-6 h-6 text-teal-400" />
                      Lịch hẹn của tôi
                    </h3>
                    <div class="px-3 py-1 bg-teal-500/10 border border-teal-500/20 rounded-full text-[10px] text-teal-400 font-bold uppercase tracking-widest">
                      {{ myAppointments.length }} Lịch hẹn
                    </div>
                  </div>

                  <div v-if="myAppointments.length === 0" class="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-20 grayscale opacity-40">
                    <CalendarIcon class="w-16 h-16 text-gray-400" />
                    <div class="space-y-1">
                      <p class="text-sm font-bold text-white">Chưa có lịch hẹn nào</p>
                      <p class="text-[10px] text-gray-500 uppercase tracking-widest">Hãy bắt đầu đặt lịch tư vấn chuyên sâu ngay hôm nay.</p>
                    </div>
                    <button @click="activeSubTab = 'schedule'; bookingStep = 'CHOOSING_TYPE'" class="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all">Đặt lịch ngay</button>
                  </div>

                  <div v-else class="flex-1 overflow-y-auto pr-2 custom-scroll space-y-4">
                    <div 
                      v-for="ap in myAppointments" 
                      :key="ap.id"
                      class="p-6 bg-white/[0.03] border border-white/5 rounded-3xl hover:bg-white/[0.05] transition-all group"
                    >
                      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div class="flex items-center gap-4">
                           <div class="w-12 h-12 bg-teal-500/10 rounded-2xl flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform">
                             <CalendarIcon class="w-6 h-6" />
                           </div>
                           <div class="text-left">
                              <h4 class="text-xs font-bold text-white uppercase tracking-widest">{{ new Date(ap.date).toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' }) }}</h4>
                              <p class="text-blue-400 font-mono text-sm font-bold">
                                {{ Array.isArray(ap.hours) && ap.hours.length > 0 
                                   ? (ap.hours.length === 1 
                                      ? `${ap.hours[0]}:00` 
                                      : `${Math.min(...ap.hours)}:00 - ${Math.max(...ap.hours) + 1}:00 (${ap.hours.length}h)`)
                                   : 'N/A' }}
                              </p>
                           </div>
                        </div>

                        <div class="h-10 w-px bg-white/10 hidden sm:block"></div>

                        <div class="flex-1 text-left sm:pl-4">
                           <p class="text-[9px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-1">Dịch vụ & Luật sư</p>
                           <h5 class="text-xs font-bold text-gray-300">
                             <span class="text-emerald-400">{{ ap.specialty }}</span> 
                             <span v-if="ap.lawyer?.user" class="text-gray-500 mx-1">/</span>
                             {{ ap.lawyer?.user?.displayName || 'Đang phân bổ luật sư' }}
                           </h5>
                        </div>

                        <div class="flex items-center gap-3">
                           <div 
                             class="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest"
                             :class="ap.status === 'confirmed' ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20' : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'"
                           >
                             {{ ap.status === 'confirmed' ? 'Đã xác nhận' : ap.status }}
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Send Question Form -->
                <div v-else-if="activeSubTab === 'ask'" class="space-y-8">
                  <div class="flex items-center justify-between border-b border-white/5 pb-6">
                    <h3 class="text-xl font-bold flex items-center gap-3">
                      <MessageSquareIcon class="w-6 h-6 text-blue-400" />
                      Gửi yêu cầu pháp lý
                    </h3>
                    <div class="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] text-blue-400 font-bold uppercase tracking-widest animate-pulse">
                      Hỗ trợ 24/7
                    </div>
                  </div>

                  <div class="space-y-6">
                    <div class="space-y-2">
                      <label class="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Tiêu đề vướng mắc</label>
                      <input 
                        id="question-title"
                        v-model="newQuestion.title"
                        placeholder="Ví dụ: Thủ tục tranh chấp thừa kế tài sản..."
                        class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-gray-600 focus:bg-white/[0.08]"
                      />
                    </div>
                    <div class="space-y-2">
                      <label class="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Chi tiết nội dung</label>
                      <textarea 
                        v-model="newQuestion.content"
                        rows="6"
                        placeholder="Mô tả cụ thể sự việc và mong muốn của bạn để luật sư nắm bắt tốt nhất..."
                        class="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-4 text-sm focus:outline-none focus:border-blue-500/50 transition-all resize-none placeholder:text-gray-600 focus:bg-white/[0.08]"
                      ></textarea>
                    </div>
                    
                    <div class="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
                      <button class="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors group/file">
                        <div class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover/file:bg-blue-500/20 transition-colors">
                          <PaperclipIcon class="w-4 h-4" />
                        </div>
                        Tải lên hồ sơ liên quan (.pdf, .zip, .doc)
                      </button>
                      <button 
                        @click="submitQuestion"
                        class="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 active:scale-95 text-white font-black rounded-2xl transition-all shadow-xl shadow-blue-500/20 text-sm italic"
                      >
                        XÁC NHẬN GỬI
                      </button>
                    </div>
                  </div>

                  <!-- My Questions History Section -->
                  <div v-if="myQuestions.length > 0" class="pt-10 border-t border-white/5 space-y-6">
                    <h4 class="text-sm font-black uppercase tracking-widest text-gray-400">Yêu cầu đã gửi của tôi</h4>
                    <div class="space-y-4">
                      <div v-for="q in myQuestions" :key="q.id" class="p-6 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/[0.04] transition-all">
                        <div class="flex justify-between items-start mb-4">
                          <h5 class="text-sm font-bold text-white">{{ q.title }}</h5>
                          <span 
                            class="px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest"
                            :class="q.status === 'Answered' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'"
                          >
                            {{ q.status === 'Answered' ? 'Đã phản hồi' : 'Đang xử lý' }}
                          </span>
                        </div>
                        <p class="text-[11px] text-gray-500 line-clamp-2 mb-4 leading-relaxed">{{ q.content }}</p>
                        
                        <!-- Admin Answer area if exists -->
                        <div v-if="q.status === 'Answered' && q.answer" class="mt-4 p-4 bg-blue-500/5 border-l-2 border-blue-500 rounded-r-xl">
                          <p class="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                             <ZapIcon class="w-3 h-3" /> Phản hồi từ Luật sư
                          </p>
                          <p class="text-xs text-gray-300 italic leading-relaxed">{{ q.answer }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Chat View -->
                <div v-else-if="activeSubTab === 'chat'" class="h-full flex flex-col">
                  <!-- IDLE Step -->
                  <div v-if="chatFlowStep === 'IDLE'" class="flex-1 flex flex-col items-center justify-center text-center space-y-8 py-10">
                    <div class="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400 animate-bounce">
                      <ChatIcon class="w-12 h-12" />
                    </div>
                    <div class="space-y-3">
                      <h3 class="text-2xl font-black italic">TƯ VẤN TRỰC TUYẾN</h3>
                      <p class="text-gray-500 max-w-sm text-sm">Kết nối trực tiếp với đội ngũ luật sư chuyên gia để được giải đáp thắc mắc ngay lập tức.</p>
                    </div>
                    <button 
                      @click="startChatFlow" 
                      class="px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-blue-500/25 uppercase tracking-widest text-xs italic"
                    >
                      Bắt đầu Kết nối ngay
                    </button>
                  </div>

                  <!-- ASK_SPECIFY Step (Lawyer List) -->
                  <div v-else-if="chatFlowStep === 'ASK_SPECIFY'" class="space-y-6">
                    <div class="flex items-center justify-between border-b border-white/5 pb-4">
                       <h3 class="text-xl font-black italic">Chọn Luật sư Trực tuyến</h3>
                       <button @click="chatFlowStep = 'IDLE'" class="text-[10px] font-bold text-gray-500 hover:text-white uppercase tracking-widest flex items-center gap-1">
                         <ChevronLeftIcon class="w-3 h-3" /> Quay lại
                       </button>
                    </div>
                    
                    <div class="relative group">
                      <SearchIcon class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                      <input 
                        v-model="searchQuery" 
                        placeholder="Tìm kiếm luật sư..."
                        class="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-xs focus:outline-none focus:border-blue-500/50"
                      />
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[350px] overflow-y-auto pr-2 custom-scroll">
                       <div 
                          @click="connectToLawyer(null)"
                          class="p-4 bg-blue-600/10 border border-blue-500/30 rounded-2xl hover:bg-blue-600/20 cursor-pointer transition-all flex items-center gap-4 group"
                       >
                          <div class="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center text-white">
                            <ZapIcon class="w-6 h-6" />
                          </div>
                          <div class="text-left">
                             <h4 class="text-sm font-black text-white italic">Kết nối Nhanh</h4>
                             <p class="text-[10px] text-blue-400 font-bold uppercase">Luật sư đang trực</p>
                          </div>
                       </div>
                       
                       <div 
                          v-for="lawyer in filteredLawyers" 
                          :key="lawyer.id"
                          @click="connectToLawyer(lawyer)"
                          class="p-4 bg-white/5 border border-white/5 rounded-2xl hover:border-indigo-500/50 hover:bg-indigo-500/5 cursor-pointer transition-all flex items-center gap-4 group"
                       >
                          <img :src="lawyer.user?.avatar || 'https://i.pravatar.cc/150'" class="w-12 h-12 rounded-xl object-cover grayscale group-hover:grayscale-0 transition-all shadow-xl" />
                          <div class="text-left">
                             <h4 class="text-sm font-black text-white italic">{{ lawyer.user?.displayName }}</h4>
                             <p class="text-[10px] text-indigo-400 font-bold uppercase tracking-tight">{{ lawyer.specialty }}</p>
                          </div>
                       </div>
                    </div>
                  </div>

                  <!-- CONNECTING Step -->
                  <div v-else-if="chatFlowStep === 'CONNECTING'" class="flex-1 flex flex-col items-center justify-center text-center space-y-8">
                     <div class="relative">
                        <div class="w-20 h-20 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                        <div class="absolute inset-0 flex items-center justify-center">
                           <ZapIcon class="w-8 h-8 text-blue-400 animate-pulse" />
                        </div>
                     </div>
                     <div class="space-y-2">
                        <h4 class="text-xl font-bold">Đang kết nối...</h4>
                        <p class="text-xs text-gray-500 uppercase tracking-widest italic">Vui lòng đợi trong giây lát</p>
                     </div>
                  </div>

                  <!-- CHATTING Step -->
                  <div v-else-if="chatFlowStep === 'CHATTING'" class="h-full flex flex-col">
                    <!-- Chat Header -->
                    <div class="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                      <div class="flex items-center gap-3">
                        <img :src="activeLawyer?.user?.avatar || 'https://i.pravatar.cc/150'" class="w-10 h-10 rounded-xl object-cover" />
                        <div>
                          <h4 class="text-sm font-bold">{{ activeLawyer?.user?.displayName || 'Luật sư NovaLaw' }}</h4>
                          <div class="flex items-center gap-1.5">
                            <div class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                            <span class="text-[9px] text-emerald-500 font-bold uppercase tracking-widest">Đang trực tuyến</span>
                          </div>
                        </div>
                      </div>
                      <button @click="confirmCloseChat" class="p-2 bg-white/5 hover:bg-red-500/20 hover:text-red-400 rounded-xl transition-all border border-white/10">
                        <XIcon class="w-4 h-4" />
                      </button>
                    </div>

                    <!-- Chat Messages -->
                    <div ref="chatContainer" class="flex-1 overflow-y-auto pr-2 mb-4 space-y-4 custom-scroll min-h-[300px]">
                      <div v-if="chatMessages.length === 0" class="h-full flex items-center justify-center">
                        <p class="text-[10px] text-gray-600 uppercase tracking-[0.2em] italic">Cuộc hội thoại đã được bảo mật</p>
                      </div>
                      <div 
                        v-for="(msg, idx) in chatMessages" 
                        :key="idx"
                        class="flex flex-col"
                        :class="msg.senderId === socketId ? 'items-end' : 'items-start'"
                      >
                        <div class="max-w-[80%] space-y-1">
                          <div 
                            class="px-4 py-3 rounded-2xl text-sm leading-relaxed"
                            :class="msg.senderId === socketId ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-none'"
                          >
                            {{ msg.message }}
                          </div>
                          <span class="text-[8px] text-gray-600 font-bold uppercase px-1">{{ new Date(msg.time || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}</span>
                        </div>
                      </div>
                    </div>

                    <!-- Chat Input -->
                    <div class="flex gap-2">
                      <input 
                        v-model="inputChat"
                        @keyup.enter="sendChatMessage"
                        placeholder="Nhập nội dung tin nhắn..."
                        class="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all"
                      />
                      <button 
                        @click="sendChatMessage"
                        :disabled="!inputChat.trim()"
                        class="p-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl transition-all shadow-lg shadow-blue-500/20"
                      >
                        <SendIcon class="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Booking Interaction -->
                <div v-else-if="activeSubTab === 'schedule'" class="h-full flex flex-col">
                   <Transition name="fade-slide" mode="out-in">
                      <!-- Step 1: choosing type -->
                      <div v-if="bookingStep === 'CHOOSING_TYPE'" key="type" class="flex flex-col items-center justify-center space-y-10 py-10">
                        <div class="text-center space-y-4">
                          <h3 class="text-3xl font-black italic">ĐẶT LỊCH TƯ VẤN</h3>
                          <p class="text-gray-500 max-w-sm">Chọn phương thức đặt lịch phù hợp với nhu cầu của bạn để được hỗ trợ tốt nhất.</p>
                        </div>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl px-6">
                           <div @click="selectBookingType('quick')" class="p-8 bg-blue-600/5 border border-blue-500/20 rounded-[2.5rem] hover:bg-blue-600/10 hover:border-blue-500 transition-all cursor-pointer group text-center space-y-6">
                              <div class="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto text-blue-400 group-hover:scale-110 transition-transform">
                                 <ZapIcon class="w-8 h-8" />
                              </div>
                              <div>
                                 <h4 class="text-xl font-bold mb-2">Đặt lịch Nhanh</h4>
                                 <p class="text-xs text-gray-500">Hệ thống tự động tìm luật sư phù hợp nhất cho bạn.</p>
                              </div>
                           </div>
                           <div @click="selectBookingType('specific')" class="p-8 bg-indigo-600/5 border border-indigo-500/20 rounded-[2.5rem] hover:bg-indigo-600/10 hover:border-indigo-500 transition-all cursor-pointer group text-center space-y-6">
                              <div class="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mx-auto text-indigo-400 group-hover:scale-110 transition-transform">
                                 <UsersIcon class="w-8 h-8" />
                              </div>
                              <div>
                                 <h4 class="text-xl font-bold mb-2">Chọn Luật sư</h4>
                                 <p class="text-xs text-gray-500">Chủ động chọn chuyên gia mà bạn tin tưởng nhất.</p>
                              </div>
                           </div>
                        </div>
                      </div>

                      <!-- Step 2: Form (Quick) -->
                      <div v-else-if="bookingStep === 'QUICK_FORM'" key="quick" class="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div class="flex items-center justify-between border-b border-white/5 pb-4">
                           <h3 class="text-xl font-black italic">Đặt lịch Nhanh</h3>
                           <button @click="bookingStep = 'CHOOSING_TYPE'" class="text-[10px] font-bold text-gray-500 hover:text-white uppercase tracking-widest flex items-center gap-1">
                             <ChevronLeftIcon class="w-3 h-3" /> Quay lại
                           </button>
                        </div>
                        <div class="space-y-6">
                           <div class="space-y-2">
                              <label class="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Chọn Chuyên môn</label>
                              <select v-model="bookingData.specialty" class="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-blue-500">
                                 <option value="" disabled>-- Chọn lĩnh vực cần tư vấn --</option>
                                 <option v-for="s in specialties" :key="s" :value="s" class="bg-[#0a0a0f]">{{ s }}</option>
                              </select>
                           </div>
                           
                           <div class="space-y-4">
                              <label class="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Chọn Ngày tư vấn</label>
                              <div class="bg-black/20 border border-white/5 rounded-3xl p-6">
                                <div class="flex items-center justify-between mb-4">
                                  <button @click="prevMonth" class="p-2 hover:bg-white/5 rounded-lg transition-all text-gray-500 hover:text-white"><ChevronLeftIcon class="w-4 h-4"/></button>
                                  <span class="text-[10px] font-black uppercase tracking-widest text-blue-400">{{ currentMonthLabel }}</span>
                                  <button @click="nextMonth" class="p-2 hover:bg-white/5 rounded-lg transition-all text-gray-500 hover:text-white"><ChevronRightIcon class="w-4 h-4"/></button>
                                </div>
                                <div class="grid grid-cols-7 gap-1">
                                  <div v-for="wd in weekDays" :key="wd" class="text-[8px] font-black text-gray-600 text-center uppercase pb-2">{{ wd }}</div>
                                  <div 
                                    v-for="(d, idx) in calendarDays" 
                                    :key="idx"
                                    @click="!d.isPast && d.date && selectCalendarDate(d.date)"
                                    class="aspect-square flex items-center justify-center rounded-lg text-[10px] font-bold transition-all cursor-pointer"
                                    :class="[
                                      !d.date ? 'opacity-0 pointer-events-none' : '',
                                      d.date === bookingData.date ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 z-10' : 
                                      d.isPast ? 'text-gray-800 cursor-not-allowed' : 'text-gray-500 hover:bg-white/5 hover:text-white'
                                    ]"
                                  >
                                    {{ d.day || '' }}
                                  </div>
                                </div>
                              </div>
                           </div>

                           <button 
                              @click="bookingStep = 'TIME_SLOTS'"
                              :disabled="!bookingData.specialty || !bookingData.date"
                              class="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white font-black rounded-2xl transition-all shadow-xl shadow-blue-500/20 uppercase tracking-widest text-xs hover:scale-[1.01] active:scale-[0.99]"
                           >
                              Tiếp theo: Xem khung giờ trống
                           </button>
                        </div>
                      </div>

                      <!-- Step 2: Lawyer List -->
                      <div v-else-if="bookingStep === 'BY_LAWYER_LIST'" key="lawyers" class="space-y-6">
                        <div class="flex items-center justify-between">
                           <h3 class="text-xl font-black italic">Chọn Luật sư</h3>
                           <button @click="bookingStep = 'CHOOSING_TYPE'" class="text-[10px] font-bold text-gray-500 hover:text-white uppercase tracking-widest flex items-center gap-1">
                             <ChevronLeftIcon class="w-3 h-3" /> Quay lại
                           </button>
                        </div>

                        <div class="relative group">
                          <SearchIcon class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                          <input 
                            v-model="searchQuery" 
                            placeholder="Tìm kiếm luật sư..."
                            class="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-xs focus:outline-none focus:border-blue-500/50"
                          />
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[350px] overflow-y-auto pr-2 custom-scroll">
                           <div 
                              v-for="lawyer in filteredLawyers" 
                              :key="lawyer.id"
                              @click="selectLawyerForBooking(lawyer)"
                              class="p-4 bg-white/5 border border-white/5 rounded-2xl hover:border-indigo-500/50 hover:bg-indigo-500/5 cursor-pointer transition-all flex items-center gap-4 group"
                           >
                              <img :src="lawyer.user?.avatar || 'https://i.pravatar.cc/150'" class="w-12 h-12 rounded-xl object-cover grayscale group-hover:grayscale-0 transition-all shadow-lg" />
                              <div class="text-left">
                                 <h4 class="text-sm font-black text-white italic">{{ lawyer.user?.displayName }}</h4>
                                 <p class="text-[10px] text-indigo-400 font-bold uppercase tracking-tight">{{ lawyer.specialty }}</p>
                              </div>
                           </div>
                        </div>
                      </div>

                      <!-- Step 2.5: choosing date for specific lawyer -->
                      <div v-else-if="bookingStep === 'BY_LAWYER_DATE'" key="spec-date" class="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div class="flex items-center justify-between border-b border-white/5 pb-4">
                           <h3 class="text-xl font-black italic">Chọn Ngày Tư Vấn</h3>
                           <button @click="bookingStep = 'BY_LAWYER_LIST'" class="text-[10px] font-bold text-gray-500 hover:text-white uppercase tracking-widest flex items-center gap-1">
                             <ChevronLeftIcon class="w-3 h-3" /> Quay lại
                           </button>
                        </div>
                        <div class="flex flex-col items-center gap-8 py-10 bg-white/[0.03] rounded-[2.5rem] border border-white/5 relative overflow-hidden w-full">
                           <div class="absolute inset-0 bg-gradient-to-b from-indigo-600/5 to-transparent pointer-events-none"></div>
                           
                           <!-- Lawyer Info -->
                           <div class="text-center space-y-2 relative z-10">
                              <img :src="bookingData.lawyer?.user?.avatar || 'https://i.pravatar.cc/150'" class="w-20 h-20 rounded-3xl mx-auto object-cover border-2 border-indigo-500/30 shadow-2xl mb-4" />
                              <h4 class="text-xl font-black italic">{{ bookingData.lawyer?.user?.displayName }}</h4>
                              <p class="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">{{ bookingData.lawyer?.specialty }}</p>
                           </div>
                           
                           <!-- Custom Calendar Grid -->
                           <div class="w-full px-8 relative z-10 space-y-6">
                              <label class="text-[10px] font-bold text-gray-500 uppercase tracking-widest block text-center">Chọn Ngày bạn muốn tư vấn</label>
                              
                              <div class="bg-black/40 border border-white/10 rounded-3xl p-6 shadow-2xl">
                                <div class="flex items-center justify-between mb-6">
                                  <button @click="prevMonth" class="p-2 hover:bg-white/10 rounded-xl transition-all text-gray-400 hover:text-white">
                                    <ChevronLeftIcon class="w-4 h-4" />
                                  </button>
                                  <span class="text-xs font-black uppercase tracking-widest text-indigo-400">{{ currentMonthLabel }}</span>
                                  <button @click="nextMonth" class="p-2 hover:bg-white/10 rounded-xl transition-all text-gray-400 hover:text-white">
                                    <ChevronRightIcon class="w-4 h-4" />
                                  </button>
                                </div>

                                <div class="grid grid-cols-7 gap-1">
                                  <div v-for="wd in weekDays" :key="wd" class="text-[8px] font-black text-gray-600 text-center uppercase pb-3 tracking-tighter">{{ wd }}</div>
                                  <div 
                                    v-for="(d, idx) in calendarDays" 
                                    :key="idx"
                                    @click="!d.isPast && d.date && selectCalendarDate(d.date)"
                                    class="aspect-square flex items-center justify-center rounded-xl text-[11px] font-bold transition-all cursor-pointer relative group/day"
                                    :class="[
                                      !d.date ? 'opacity-0 pointer-events-none' : '',
                                      d.date === bookingData.date ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/40 z-10 scale-110' : 
                                      d.isPast ? 'text-gray-800 cursor-not-allowed' : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    ]"
                                  >
                                    {{ d.day || '' }}
                                    <div v-if="d.date === bookingData.date" class="absolute -bottom-1 w-1 h-1 bg-white rounded-full"></div>
                                  </div>
                                </div>
                              </div>
                           </div>

                           <div class="w-full px-8 relative z-10">
                              <button 
                                 @click="goToTimeSlotsFromDate"
                                 :disabled="!bookingData.date"
                                 class="w-full py-5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-black rounded-2xl transition-all shadow-xl shadow-indigo-500/20 uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-[0.98]"
                              >
                                 Tiếp theo: Xem giờ trống
                              </button>
                           </div>
                        </div>
                      </div>

                      <!-- Step 3: Time Slots -->
                      <div v-else-if="bookingStep === 'TIME_SLOTS'" key="slots" class="space-y-6">
                         <div class="flex items-center justify-between border-b border-white/5 pb-4">
                            <div class="text-left">
                               <h3 class="text-lg font-black italic">Chọn khung giờ rảnh</h3>
                               <p class="text-[10px] text-gray-500 uppercase tracking-widest">{{ bookingData.type === 'quick' ? bookingData.specialty : bookingData.lawyer?.user?.displayName }}</p>
                            </div>
                            <button @click="bookingData.type === 'quick' ? bookingStep = 'QUICK_FORM' : bookingStep = 'BY_LAWYER_DATE'" class="text-[10px] font-bold text-gray-500 hover:text-white uppercase tracking-widest flex items-center gap-1">
                              <ChevronLeftIcon class="w-3 h-3" /> Quay lại
                            </button>
                         </div>

                         <!-- Selected Date Info (Header) -->
                         <div class="bg-blue-600/5 border border-blue-500/20 rounded-3xl p-6 flex items-center justify-between">
                            <div class="flex items-center gap-4">
                               <div class="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400">
                                  <CalendarIcon class="w-6 h-6" />
                               </div>
                               <div>
                                  <h4 class="text-sm font-bold text-white">Ngày tư vấn đã chọn</h4>
                                  <p class="text-xs text-blue-400 font-mono">{{ new Date(bookingData.date || Date.now()).toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' }) }}</p>
                               </div>
                            </div>
                            <button @click="bookingData.type === 'quick' ? bookingStep = 'QUICK_FORM' : bookingStep = 'BY_LAWYER_DATE'" class="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all">Đổi ngày</button>
                         </div>

                         <div class="grid grid-cols-4 sm:grid-cols-6 gap-3">
                            <button 
                              v-for="h in availableHours" 
                              :key="h.hour"
                              :disabled="h.status === 'busy'"
                              @click="toggleHourSelection(h.hour)"
                              class="py-4 rounded-xl font-mono text-xs font-bold transition-all border relative overflow-hidden"
                              :class="[
                                h.status === 'busy' ? 'bg-red-500/10 border-red-500/20 text-red-500/40 cursor-not-allowed' : 
                                bookingData.hours.includes(h.hour) ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20 z-10' : 
                                'bg-emerald-500/5 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/50'
                              ]"
                            >
                               {{ h.hour.toString().padStart(2, '0') }}:00
                               <div v-if="bookingData.hours.includes(h.hour)" class="absolute top-0 right-0 p-1 opacity-50">
                                 <ZapIcon class="w-2 h-2" />
                               </div>
                            </button>
                         </div>

                         <div v-if="bookingData.hours.length > 0" class="p-4 bg-white/[0.02] border border-white/5 rounded-2xl animate-in slide-in-from-bottom-2 duration-300">
                            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Thời gian đã chọn:</p>
                            <div class="flex flex-wrap gap-2">
                               <span v-for="h in sortedSelectedHours" :key="h" class="px-3 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg text-[10px] font-bold font-mono">
                                 {{ h.toString().padStart(2, '0') }}:00
                               </span>
                            </div>
                         </div>

                         <div class="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest py-4 border-t border-white/5">
                            <div class="flex items-center gap-2 text-emerald-400">
                               <div class="w-3 h-3 bg-emerald-500/20 border border-emerald-500/50 rounded-sm"></div>
                               Còn trống
                            </div>
                            <div class="flex items-center gap-2 text-red-500/60">
                               <div class="w-3 h-3 bg-red-500/20 border border-red-500/50 rounded-sm"></div>
                               Đã bận
                            </div>
                         </div>

                         <button 
                            @click="confirmBooking"
                            :disabled="bookingData.hours.length === 0"
                            class="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl shadow-blue-500/30 uppercase tracking-widest text-xs disabled:opacity-50"
                         >
                            XÁC NHẬN ĐẶT LỊCH ({{ bookingData.hours.length }} giờ)
                         </button>
                      </div>
                   </Transition>
                 </div>
               </div>
             </Transition>
           </div>
         </div>
       </section>

      <!-- Reference Questions: Glowing Cards -->
      <section class="space-y-10">
        <div class="flex items-center justify-between">
          <h2 class="text-3xl font-black italic tracking-tighter">Câu hỏi <span class="text-gray-500">Tham khảo</span></h2>
          <div class="flex gap-2">
            <button class="p-2 bg-white/5 rounded-lg border border-white/5 text-gray-500 hover:text-white transition-colors">
              <ChevronLeftIcon class="w-5 h-5" />
            </button>
            <button class="p-2 bg-white/5 rounded-lg border border-white/5 text-gray-500 hover:text-white transition-colors">
              <ChevronRightIcon class="w-5 h-5" />
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(q, idx) in questions" 
            :key="idx" 
            class="glow-card group p-8 rounded-[2rem] bg-[#0a0a0f] border border-white/5 relative overflow-hidden transition-all duration-700 hover:translate-y-[-10px] cursor-pointer"
          >
            <!-- Animation Beam/Glow Effect -->
            <div class="beam absolute inset-0 opacity-0 group-hover:opacity-100 duration-500 transition-opacity"></div>
            
            <div class="relative z-10">
              <div class="flex items-center justify-between mb-6">
                <span class="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[9px] font-black uppercase tracking-widest text-blue-400">
                  {{ q.category }}
                </span>
                <span class="text-[10px] font-bold text-gray-600 font-mono">{{ q.date }}</span>
              </div>
              
              <h4 class="text-lg font-bold mb-4 group-hover:text-blue-400 transition-colors line-clamp-1 italic">{{ q.title }}</h4>
              <p class="text-gray-500 text-sm line-clamp-3 leading-relaxed mb-8">{{ q.content }}</p>
              
              <div class="flex items-center justify-between pt-6 border-t border-white/5">
                <div class="flex items-center gap-2">
                  <div class="w-6 h-6 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border border-white/10"></div>
                  <span class="text-[10px] font-bold text-gray-400">Ẩn danh</span>
                </div>
                <div class="flex items-center gap-1.5 text-blue-400 text-[10px] font-black group-hover:translate-x-1 transition-transform">
                  CHI TIẾT <ArrowRightIcon class="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-center pt-10 pb-20">
          <button 
            @click="goToAsk()"
            class="px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-4 group shadow-xl"
          >
            BẠN KHÔNG TÌM THẤY CÂU TRẢ LỜI? 
            <span class="text-blue-400 group-hover:text-white transition-colors">GỬI CÂU HỎI MỚI NGAY</span>
            <ArrowRightIcon class="w-4 h-4 text-blue-400 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </section>
    </main>

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
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import dogLawImage from '../../assets/images/dog-law.png';
import CmConfirm from '../../components/CmConfirm.vue';
import { 
  Scale as ScaleIcon, 
  Home as HomeIcon,
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
  MessageSquare as MessageSquareIcon,
  Paperclip as PaperclipIcon,
  Calendar as CalendarIcon,
  ArrowRight as ArrowRightIcon,
  Zap as ZapIcon,
  MessageCircle as ChatIcon,
  Activity as ActivityIcon,
  Search as SearchIcon,
  X as XIcon,
  Send as SendIcon,
  XCircle as XCircleIcon,
  Users as UsersIcon,
  ShieldCheck as ShieldCheckIcon,
} from 'lucide-vue-next';
import { lawApi } from '../../api/law';
import { io } from 'socket.io-client';

const router = useRouter();
const activeSubTab = ref('ask');

const currentUser = computed(() => {
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
});

const isAdminOrLawyer = computed(() => {
  if (!currentUser.value) return false;
  // Use lowercase for standard role checking
  const roles = (currentUser.value.roles || [currentUser.value.role] || []).map((r: string) => r?.toLowerCase());
  return roles.includes('admin') || roles.includes('lawyer');
});

const interactionPanel = ref<HTMLElement | null>(null);

import { nextTick } from 'vue';
const goToAsk = () => {
  activeSubTab.value = 'ask';
  nextTick(() => {
    interactionPanel.value?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.getElementById('question-title')?.focus();
  });
};

const showModal = ref(false);
const modalConfig = ref({
  title: '',
  message: '',
  icon: null,
  showCancel: false,
  confirmText: 'Xác nhận',
  cancelText: 'Hủy bỏ',
  variant: 'primary' as const,
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

// Chat Flow
const chatFlowStep = ref<'IDLE' | 'ASK_SPECIFY' | 'SELECT_LAWYER' | 'CONNECTING' | 'CHATTING'>('IDLE');
const lawyerList = ref<any[]>([]);
const searchQuery = ref('');
const activeLawyer = ref<any>(null);
const socket = ref<any>(null);
const socketId = ref("");
const chatMessages = ref<any[]>([]);
const inputChat = ref("");
const chatRoomId = ref("");
const chatContainer = ref<HTMLElement | null>(null);

// Booking Flow
const bookingStep = ref('CHOOSING_TYPE'); // CHOOSING_TYPE, QUICK_FORM, BY_LAWYER_LIST, TIME_SLOTS
const bookingData = ref({
  type: '', // quick, specific
  lawyer: null as any,
  date: new Date().toISOString().split('T')[0],
  hours: [] as number[],
  specialty: ''
});
const lawyerAppointments = ref<any[]>([]);
const myAppointments = ref<any[]>([]);
const specialties = ref<string[]>([]);

// Custom Calendar Logic
const currentCalendarDate = ref(new Date());
const weekDays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

const calendarDays = computed(() => {
  const year = currentCalendarDate.value.getFullYear();
  const month = currentCalendarDate.value.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  const days = [];
  
  // Padding for start of month
  const firstDayOfWeek = firstDay.getDay(); 
  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push({ day: 0, date: null, isCurrentMonth: false });
  }
  
  // Actual days
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const fullDate = new Date(year, month, i);
    const dateStr = fullDate.toISOString().split('T')[0];
    const isPast = fullDate < new Date(new Date().setHours(0,0,0,0));
    days.push({ 
      day: i, 
      date: dateStr, 
      isCurrentMonth: true,
      isPast
    });
  }
  
  return days;
});

const currentMonthLabel = computed(() => {
  return currentCalendarDate.value.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' });
});

const nextMonth = () => {
  currentCalendarDate.value = new Date(currentCalendarDate.value.setMonth(currentCalendarDate.value.getMonth() + 1));
};

const prevMonth = () => {
  currentCalendarDate.value = new Date(currentCalendarDate.value.setMonth(currentCalendarDate.value.getMonth() - 1));
};

const selectCalendarDate = (dateStr: string) => {
  if (!dateStr) return;
  bookingData.value.date = dateStr;
};

const fetchLawyerAvailability = async (lawyerId: string, date: string) => {
  try {
    const res = await lawApi.getLawyerAppointments(lawyerId, date);
    // Backend returns { appointments: LawAppointment[], busySchedule: string[] }
    lawyerAppointments.value = Array.isArray(res?.appointments) ? res.appointments : [];
    
    // Update the local lawyer object with most recent busySchedule if available
    if (bookingData.value.lawyer && res?.busySchedule) {
      bookingData.value.lawyer.busySchedule = res.busySchedule;
    }
  } catch (error) {
    console.error("Failed to fetch lawyer availability:", error);
    lawyerAppointments.value = [];
  }
};

// Watch for date change in booking
watch(() => bookingData.value.date, (newDate) => {
  const lawyerId = bookingData.value.lawyer?.id;
  if (bookingData.value.type === 'specific' && typeof lawyerId === 'string' && newDate) {
    void fetchLawyerAvailability(lawyerId, newDate);
  }
});

const fetchMyAppointments = async () => {
  const data = await lawApi.getMyAppointments();
  myAppointments.value = data;
};

// Watch for tab change to fetch my appointments
watch(() => activeSubTab.value, (newTab) => {
  if (newTab === 'my-appointments') {
    fetchMyAppointments();
  }
});

const filteredLawyers = computed(() => {
  if (!searchQuery.value) return lawyerList.value;
  const q = searchQuery.value.toLowerCase();
  return lawyerList.value.filter(l => 
    l.user?.displayName?.toLowerCase().includes(q) || 
    l.specialty?.toLowerCase().includes(q)
  );
});

const availableHours = computed(() => {
  const hours = [];
  const bookedHours = lawyerAppointments.value.flatMap(a => (a.hours || []).map((h: any) => Number(h)));
  
  // Define active hours 8-20h
  for (let h = 8; h <= 20; h++) {
    let status = 'available';
    
    // Check from confirmed appointments (specific mode)
    if (bookingData.value.type === 'specific' && bookedHours.includes(h)) {
      status = 'busy';
    }
    
      const lawyer = bookingData.value.lawyer;
      if (lawyer) {
        const busySlots = (lawyer.busySchedule || []) as string[];
        const currentTargetDate = bookingData.value.date || '';
        const daySchedule = busySlots.find((s: string) => s && s.startsWith(currentTargetDate));
        if (daySchedule && daySchedule.includes('[') && daySchedule.includes(']')) {
          try {
            const parts = daySchedule.split('[');
            const content = parts[1] ? parts[1].split(']')[0] : null;
            if (content) {
              const fixedBusyHours = content.split(',').map((item: string) => parseInt(item.trim()));
              if (fixedBusyHours.includes(h)) status = 'busy';
            }
          } catch {
            // Ignore parse errors
          }
        }
      }
    
    hours.push({ hour: h, status });
  }
  return hours;
});

const startChatFlow = async () => {
  chatFlowStep.value = 'ASK_SPECIFY';
  // Pre-fetch lawyers for the selection
  const data = await lawApi.getLawyers();
  lawyerList.value = data;
};

const connectToLawyer = (lawyer: any) => {
  console.log("Starting connection to lawyer:", lawyer?.user?.displayName);
  activeLawyer.value = lawyer;
  chatFlowStep.value = 'CONNECTING';
  chatMessages.value = [];
  chatRoomId.value = ""; 
  
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const setupSocket = () => {
    if (!socket.value) {
      console.log("Initializing new socket connection...");
      let baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
      // Remove /api suffix if it exists for socket connection
      baseUrl = baseUrl.replace(/\/api$/, '');
      
      socket.value = io(`${baseUrl}/law`, {
        reconnectionAttempts: 5,
        timeout: 10000
      });
      
      socket.value.on("connect", () => {
        console.log("Socket connected:", socket.value.id);
        socketId.value = socket.value.id;
        emitRequestLawyer(lawyer, user);
      });

      socket.value.on("connect_error", (err: any) => {
        console.error("Socket connection error:", err);
      });

      socket.value.on("new_message", (data: any) => {
        chatMessages.value.push(data);
        scrollToBottom();
      });

      socket.value.on("lawyer_joined", (data: any) => {
        console.log("Lawyer joined event:", data);
        activeLawyer.value = {
          user: {
            displayName: data.lawyerInfo?.name,
            avatar: data.lawyerInfo?.avatar
          },
          specialty: 'Chuyên gia hỗ trợ'
        };
        chatMessages.value.push({
          senderId: 'system',
          message: `Luật sư ${data.lawyerInfo?.name} đã tham gia phòng chat.`,
          senderInfo: { name: 'System' },
          time: new Date().toISOString()
        });
        scrollToBottom();
      });

      socket.value.on("room_closed", () => {
        triggerModal({
          title: "Thông báo",
          message: "Đoạn chat đã kết thúc bởi quản trị viên. Cảm ơn bạn đã sử dụng dịch vụ.",
          icon: XCircleIcon,
          showCancel: false,
          confirmText: "Đóng",
          onConfirm: () => resetChatState()
        });
      });
    } else {
      if (socket.value.connected) {
        console.log("Socket already connected, emitting request...");
        socketId.value = socket.value.id;
        emitRequestLawyer(lawyer, user);
      } else {
        console.log("Socket exists but disconnected, reconnecting...");
        socket.value.connect();
        // The 'connect' listener above (if registered) will fire
        // But if we're adding it in setupSocket, we should handle multiple calls
        // For simplicity, let's ensure we only register listeners once
      }
    }
  };

  setupSocket();

  // UX Transition logic: Wait for roomId OR timeout
  let retryCount = 0;
  const maxRetries = 20; // 10 seconds total (20 * 500ms)

  const checkReady = setInterval(() => {
    if (chatRoomId.value) {
      console.log("Room ready, transitioning to CHATTING");
      chatFlowStep.value = 'CHATTING';
      clearInterval(checkReady);
    } else if (retryCount > maxRetries) {
      console.warn("Connection timeout - no room received from server");
      triggerModal({
        title: "Lỗi Kết nối",
        message: "Không thể kết nối đến máy chủ. Vui lòng thử lại sau.",
        icon: XCircleIcon,
        variant: 'danger',
        showCancel: false,
        confirmText: "Đóng",
        onConfirm: () => resetChatState()
      });
      clearInterval(checkReady);
    }
    retryCount++;
  }, 500);
};

const sortedSelectedHours = computed(() => {
  return [...bookingData.value.hours].sort((a, b) => a - b);
});

const toggleHourSelection = (hour: number) => {
  const index = bookingData.value.hours.indexOf(hour);
  
  if (index > -1) {
    // Deselect logic: only allow deselecting head or tail to maintain continuity
    const sorted = sortedSelectedHours.value;
    if (hour === sorted[0] || hour === sorted[sorted.length - 1]) {
      bookingData.value.hours.splice(index, 1);
    } else {
      // If clicking in the middle, reset and select just this one
      bookingData.value.hours = [hour];
    }
  } else {
    // Selection logic
    if (bookingData.value.hours.length === 0) {
      bookingData.value.hours.push(hour);
    } else {
      const sorted = sortedSelectedHours.value;
      const min = sorted[0];
      const max = sorted[sorted.length - 1];
      
      // Check if consecutive
      if (typeof min === 'number' && typeof max === 'number' && (hour === min - 1 || hour === max + 1)) {
        bookingData.value.hours.push(hour);
      } else {
        // Not consecutive: reset selection to the new one
        bookingData.value.hours = [hour];
      }
    }
  }
};

const emitRequestLawyer = (lawyer: any, user: any) => {
  if (!socket.value || !socket.value.connected) {
    console.warn("Attempted to emit request without active connection");
    return;
  }
  
  console.log("Emitting request_lawyer...");
  socket.value.emit('request_lawyer', {
    category: 'Tư vấn chung',
    preferredLawyerId: lawyer?.id,
    customerInfo: {
      name: user.displayName || user.email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`
    }
  }, (res: any) => {
    console.log("request_lawyer acknowledgment:", res);
    if (res && res.data && res.data.roomId) {
      chatRoomId.value = res.data.roomId;
    }
  });
};

const sendChatMessage = () => {
  if (!inputChat.value.trim() || !socket.value) return;
  
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  
  socket.value.emit("send_message", {
    roomId: chatRoomId.value,
    message: inputChat.value,
    senderInfo: {
      role: "user",
      name: user.displayName || user.email
    }
  });
  
  inputChat.value = "";
};

const confirmCloseChat = () => {
  triggerModal({
    title: "Kết thúc Tư vấn",
    message: "Cám ơn bạn đã sử dụng dịch vụ. Đoạn chat này sẽ bị xoá toàn bộ sau khi bạn thoát. Bạn có chắc chắn muốn kết thúc?",
    icon: XIcon,
    showCancel: true,
    confirmText: "Xác nhận Thoát",
    cancelText: "Tiếp tục Chat",
    onConfirm: () => closeChat()
  });
};

const closeChat = () => {
  if (socket.value && chatRoomId.value) {
    socket.value.emit("close_room", { roomId: chatRoomId.value });
    resetChatState();
  }
};

const resetChatState = () => {
  chatFlowStep.value = 'IDLE';
  chatMessages.value = [];
  chatRoomId.value = "";
  activeLawyer.value = null;
};

const scrollToBottom = async () => {
  await import('vue').then(v => v.nextTick());
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
};

// Booking Methods
const selectBookingType = async (type: string) => {
  bookingData.value.type = type;
  bookingData.value.hours = [];
  bookingData.value.lawyer = null;
  lawyerAppointments.value = [];
  // Pre-load data
  if (specialties.value.length === 0) {
    specialties.value = await lawApi.getSpecialties();
  }
  if (lawyerList.value.length === 0) {
    lawyerList.value = await lawApi.getLawyers();
  }

  if (type === 'quick') {
    bookingStep.value = 'QUICK_FORM';
  } else {
    bookingStep.value = 'BY_LAWYER_LIST';
  }
};

const selectLawyerForBooking = (lawyer: any) => {
  const lawyerId = lawyer?.id;
  if (typeof lawyerId !== 'string') return;
  bookingData.value.lawyer = lawyer;
  bookingData.value.specialty = lawyer.specialty;
  bookingStep.value = 'BY_LAWYER_DATE';
};

const goToTimeSlotsFromDate = async () => {
  const lawyerId = bookingData.value.lawyer?.id;
  const dateStr = bookingData.value.date;
  if (typeof lawyerId === 'string' && dateStr) {
    await fetchLawyerAvailability(lawyerId, dateStr);
    bookingStep.value = 'TIME_SLOTS';
  }
};

const confirmBooking = () => {
  const sorted = sortedSelectedHours.value;
  let timeStr = "";
  if (sorted.length === 1) {
    const startHour = sorted[0];
    timeStr = `${startHour}:00, ngày ${bookingData.value.date}`;
  } else if (sorted.length > 1) {
    const startHour = sorted[0];
    const endHour = sorted[sorted.length - 1];
    if (typeof startHour === 'number' && typeof endHour === 'number') {
      timeStr = `${startHour}:00 đến ${endHour + 1}:00 (${sorted.length} giờ), ngày ${bookingData.value.date}`;
    }
  }

  const targetName = bookingData.value.type === 'quick' ? `Luật sư phù hợp chuyên môn ${bookingData.value.specialty}` : `Luật sư ${bookingData.value.lawyer?.user?.displayName}`;
  
  triggerModal({
    title: "Xác nhận Đặt lịch",
    message: `Bạn đang thực hiện đặt lịch tư vấn với ${targetName} vào lúc ${timeStr}. Bạn có muốn tiếp tục?`,
    icon: CalendarIcon,
    showCancel: true,
    confirmText: "Xác nhận Đặt",
    variant: 'teal',
    onConfirm: () => performBooking()
  });
};

const performBooking = async () => {
  let res: any = { status: 0 };
  if (bookingData.value.type === 'quick') {
    res = await lawApi.quickBooking({
      date: bookingData.value.date,
      hours: bookingData.value.hours,
      specialty: bookingData.value.specialty
    });
  } else {
    res = await lawApi.createAppointment({
      lawyerId: bookingData.value.lawyer?.id,
      date: bookingData.value.date,
      hours: bookingData.value.hours,
      specialty: bookingData.value.specialty
    });
  }

  if (res.status === 200 || res.status === 201) {
    triggerModal({
      title: "Đặt lịch Thành công",
      message: "Yêu cầu của bạn đã được ghi nhận. Luật sư sẽ liên hệ với bạn theo khung giờ đã chọn.",
      icon: ZapIcon,
      variant: 'teal',
      showCancel: false,
      confirmText: "Tuyệt vời",
      onConfirm: () => {
        activeSubTab.value = 'ask';
        bookingStep.value = 'CHOOSING_TYPE';
      }
    });
  } else {
    triggerModal({
      title: "Lỗi Đặt lịch",
      message: res.message || "Đã có lỗi xảy ra trong quá trình đặt lịch. Vui lòng thử lại.",
      icon: XCircleIcon,
      variant: 'danger',
      showCancel: false,
      confirmText: "Đóng"
    });
  }
};

const navLinks = [
  { name: "Yêu cầu", handler: () => goToAsk() },
  { name: "Chuyên gia", handler: () => { activeSubTab.value = 'schedule'; interactionPanel.value?.scrollIntoView({ behavior: 'smooth' }); } },
  { name: "Thư viện", handler: () => { window.scrollTo({ top: 1500, behavior: 'smooth' }); } },
  { name: "Liên hệ", handler: () => { activeSubTab.value = 'chat'; interactionPanel.value?.scrollIntoView({ behavior: 'smooth' }); } },
];

const mainActions = [
  {
    title: "Tư vấn Trực tuyến",
    desc: "Kết nối nhanh chóng với luật sư trực để giải quyết các vướng mắc tức thì qua phòng chat.",
    icon: ChatIcon,
    iconBg: "bg-blue-600/10",
    iconColor: "text-blue-400",
    glowClass: "from-blue-600/20 to-transparent",
    handler: () => { 
      activeSubTab.value = 'chat';
      interactionPanel.value?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  },
  {
    title: "Gửi Câu hỏi",
    desc: "Gửi hồ sơ chi tiết và nhận văn bản trả lời chính thức từ đội ngũ chuyên gia pháp lý.",
    icon: MessageSquareIcon,
    iconBg: "bg-indigo-600/10",
    iconColor: "text-indigo-400",
    glowClass: "from-indigo-600/20 to-transparent",
    handler: () => { 
      activeSubTab.value = 'ask';
      interactionPanel.value?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  },
  {
    title: "Lịch hẹn của tôi",
    desc: "Xem lại và quản lý các yêu cầu tư vấn đã đặt với đội ngũ luật sư chuyên gia.",
    icon: ActivityIcon,
    iconBg: "bg-teal-600/10",
    iconColor: "text-teal-400",
    glowClass: "from-teal-600/20 to-transparent",
    handler: () => { 
      activeSubTab.value = 'my-appointments';
      interactionPanel.value?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  },
];

const interactionTabs = [
  { id: 'ask', label: 'Hỏi đáp & Hồ sơ', sub: 'Gửi câu hỏi & yêu cầu', icon: MessageSquareIcon },
  { id: 'chat', label: 'Chat nhanh', sub: 'Luật sư trực tuyến', icon: ChatIcon },
  { id: 'schedule', label: 'Lịch tư vấn', sub: 'Gặp mặt chuyên sâu', icon: CalendarIcon },
  { id: 'my-appointments', label: 'Lịch của tôi', sub: 'Quản lý lịch hẹn', icon: ActivityIcon },
];

const newQuestion = ref({ title: '', content: '' });

const questions = ref([
  { 
    title: "Thủ tục sang tên sổ đỏ 2024", 
    content: "Tôi muốn hỏi về quy trình và lệ phí khi thực hiện việc tặng cho quyền sử dụng đất từ bố mẹ sang con cái và các điểm mới trong luật đất đai 2024 vừa được ban hành...",
    date: "12-03-2025",
    category: "Đất Đai",
  },
  { 
    title: "Tranh chấp hợp đồng lao động không thời hạn", 
    content: "Công ty đột ngột chấm dứt hợp đồng lao động mà không báo trước, tôi cần làm gì để bảo vệ quyền lợi và số tháng bồi thường tối đa tôi có thể nhận là bao nhiêu?",
    date: "11-03-2025",
    category: "Lao Động",
  },
  { 
    title: "Thành lập doanh nghiệp có vốn nước ngoài", 
    content: "Tôi cùng đối tác Singapore muốn thành lập công ty dịch vụ tại TP.HCM. Cần những điều kiện gì về vốn và giấy phép con đối với ngành logistics?",
    date: "10-03-2025",
    category: "Doanh Nghiệp",
  }
]);

const fetchMyQuestions = async () => {
  try {
    const data = await lawApi.getMyQuestions();
    // Prepend real questions to the reference list or show in a separate section
    // For now, let's update the 'questions' ref used for reference to be the combination
    // and maybe add a 'myQuestions' ref if we want a separate view.
    // The user request says "người dùng có thể tạo bài viết ở view người dùng and admin quản lý"
    // I'll update the 'questions' list to show public/answered questions, 
    // and maybe a dedicated list for user's own questions.
    myQuestions.value = data;
  } catch (err) {
    console.error(err);
  }
};

const myQuestions = ref<any[]>([]);

const submitQuestion = async () => {
  if (!newQuestion.value.title || !newQuestion.value.content) {
    triggerModal({
      title: "Thông tin trống",
      message: "Vui lòng điền đầy đủ tiêu đề và nội dung yêu cầu của bạn.",
      icon: XCircleIcon,
      variant: 'danger'
    });
    return;
  }
  
  const res = await lawApi.createQuestion({
    title: newQuestion.value.title,
    content: newQuestion.value.content,
    category: "Yêu Cầu Mới"
  });

  if (res.status === 200 || res.status === 201) {
    triggerModal({
      title: "Thành công",
      message: "Yêu cầu của bạn đã được gửi tới đội ngũ luật sư. Chúng tôi sẽ phản hồi sớm nhất có thể.",
      icon: ZapIcon,
      variant: 'teal'
    });
    newQuestion.value = { title: '', content: '' };
    fetchMyQuestions();
  } else {
    triggerModal({
      title: "Lỗi",
      message: res.message || "Không thể gửi yêu cầu.",
      icon: XCircleIcon,
      variant: 'danger'
    });
  }
};

const fetchPublicQuestions = async () => {
  try {
    const data = await lawApi.getQuestions();
    // Show only answered questions to the public
    questions.value = data.filter((q: any) => q.status === 'Answered').map((q: any) => ({
      title: q.title,
      content: q.content,
      date: new Date(q.createdAt).toLocaleDateString('vi-VN'),
      category: q.category || "Tư vấn",
      answer: q.answer
    }));
  } catch (err) {
    console.error(err);
  }
};

import { onMounted } from 'vue';
onMounted(() => {
  fetchMyQuestions();
  fetchPublicQuestions();
});
</script>

<style scoped>
.h-18 { height: 4.5rem; }

/* Transition Animations */
.fade-scale-enter-active, .fade-scale-leave-active {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.fade-scale-enter-from {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(1.1) translateY(-20px);
}

.custom-scroll::-webkit-scrollbar {
  width: 4px;
}
.custom-scroll::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.02);
}
.custom-scroll::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Glow Card Animation */
.glow-card:hover {
  background: rgba(255, 255, 255, 0.04);
  transform: translateY(-5px);
  border-color: rgba(255, 255, 255, 0.1);
}

.date-input-clean::-webkit-calendar-picker-indicator {
  display: none !important;
  -webkit-appearance: none !important;
}

.beam {
  background: radial-gradient(circle at center, rgba(59, 130, 246, 0.4) 0%, transparent 70%);
  filter: blur(40px);
  animation: sweep 3s infinite linear;
}

@keyframes sweep {
  0% { transform: translate(-120%, -120%); }
  50% { transform: translate(20%, 20%); }
  100% { transform: translate(120%, 120%); }
}

.shadow-3xl {
  box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.8);
}

/* Scrollbar Customization */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.1);
}
</style>
