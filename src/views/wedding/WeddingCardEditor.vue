<template>
  <div class="h-screen bg-[#050507] text-white flex overflow-hidden font-inter">
    <!-- 🌠 Ambient Background -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden">
      <div class="absolute top-[-20%] left-[20%] w-[70vw] h-[50vh] bg-rose-500/10 blur-[180px] rounded-full"></div>
      <div class="absolute bottom-0 right-0 w-[40vw] h-[40vh] bg-indigo-500/5 blur-[150px] rounded-full"></div>
    </div>

    <!-- Left: Form Editor (45%) -->
    <aside class="w-[500px] min-w-[500px] h-full bg-[#0A0A0B]/90 backdrop-blur-3xl border-r border-white/5 p-12 overflow-y-auto relative z-20 custom-scrollbar">
      <div class="flex items-center justify-between mb-16">
        <div class="flex items-center gap-4">
          <button 
            @click="router.back()"
            class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
          >
            <ArrowLeft class="w-4 h-4 text-gray-400" />
          </button>
          <h2 class="text-xl font-black italic tracking-tighter uppercase text-white">Soạn thảo thiệp</h2>
        </div>

         <div class="flex gap-1.5">
           <button 
            v-for="p in ['1', '2', '3', '4', '5', '6']" 
            :key="p"
            @click="activePreviewPage = p"
            class="w-7 h-7 rounded-lg text-[9px] font-black transition-all border flex items-center justify-center"
            :class="activePreviewPage === p ? 'bg-rose-500 border-rose-500 text-white shadow-lg shadow-rose-500/20' : 'bg-white/5 border-white/5 text-gray-500 hover:text-gray-300'"
           >
            {{ p }}
           </button>
        </div>
      </div>

      <div class="space-y-12">
        <!-- Section 1: Túi đựng / Phong bì -->
        <section id="section-1" class="scroll-mt-10">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
              <PackageIcon class="w-4 h-4 text-orange-400" />
            </div>
            <h3 class="text-xs font-black uppercase tracking-[0.3em] text-gray-400">1. Túi đựng (Phong bì)</h3>
          </div>
          <div class="space-y-4">
             <div class="group">
               <label class="block text-[9px] font-bold text-gray-600 uppercase tracking-widest mb-2 ml-1">Màu sắc phong bì (Hex)</label>
               <input v-model="weddingData.envelopeColor" type="color" class="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-2 outline-none cursor-pointer" />
             </div>
             <div class="group">
               <label class="block text-[9px] font-bold text-gray-600 uppercase tracking-widest mb-2 ml-1">Lời chào ngoài bao thư</label>
               <input v-model="weddingData.envelopeText" type="text" class="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-rose-500/50 transition-all text-sm font-medium" placeholder="Thân mời: [Tên khách]" />
             </div>
          </div>
        </section>

        <!-- Section 2: Bìa Thiệp -->
        <section id="section-2" class="scroll-mt-10">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center">
              <Heart class="w-4 h-4 text-rose-400" />
            </div>
            <h3 class="text-xs font-black uppercase tracking-[0.3em] text-gray-400">2. Bìa thiệp & Tiêu đề</h3>
          </div>
          <div class="space-y-4">
             <div class="group">
               <label class="block text-[9px] font-bold text-gray-600 uppercase tracking-widest mb-2 ml-1">Tiêu đề (Lễ Thành Hôn / Vu Quy...)</label>
               <input 
                v-model="weddingData.title"
                type="text" 
                class="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-rose-500/50 transition-all text-sm font-medium"
                placeholder="Lễ Thành Hôn"
               />
             </div>
             <div class="grid grid-cols-2 gap-4">
                <div class="group">
                  <label class="block text-[9px] font-bold text-gray-600 uppercase tracking-widest mb-2 ml-1">Tên Chú rể (Bìa)</label>
                  <input v-model="weddingData.groomName" type="text" class="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-rose-500/50 transition-all text-sm font-medium" />
                </div>
                <div class="group">
                  <label class="block text-[9px] font-bold text-gray-600 uppercase tracking-widest mb-2 ml-1">Tên Cô dâu (Bìa)</label>
                  <input v-model="weddingData.brideName" type="text" class="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-rose-500/50 transition-all text-sm font-medium" />
                </div>
             </div>
          </div>
        </section>

        <!-- Section 2: Thông tin gia đình -->
        <section id="section-2" class="scroll-mt-10">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Users class="w-4 h-4 text-blue-400" />
            </div>
            <h3 class="text-xs font-black uppercase tracking-[0.3em] text-gray-400">2. Thông tin gia đình</h3>
          </div>
          <div class="space-y-8 bg-white/[0.02] p-6 rounded-[2rem] border border-white/5">
            <!-- Nhà Trai -->
            <div class="space-y-4">
               <p class="text-[10px] font-black text-blue-400 uppercase tracking-widest">Gia đình Nhà Trai</p>
               <div class="group">
                 <label class="block text-[9px] font-bold text-gray-600 uppercase tracking-widest mb-2 ml-1">Thân phụ / Thân mẫu</label>
                 <input 
                  v-model="weddingData.groomParents"
                  type="text" 
                  class="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-blue-500/50 transition-all text-sm font-medium"
                  placeholder="Ông: ... & Bà: ..."
                 />
               </div>
            </div>
            <!-- Nhà Gái -->
            <div class="space-y-4">
               <p class="text-[10px] font-black text-pink-400 uppercase tracking-widest">Gia đình Nhà Gái</p>
               <div class="group">
                 <label class="block text-[9px] font-bold text-gray-600 uppercase tracking-widest mb-2 ml-1">Thân phụ / Thân mẫu</label>
                 <input 
                  v-model="weddingData.brideParents"
                  type="text" 
                  class="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-pink-500/50 transition-all text-sm font-medium"
                  placeholder="Ông: ... & Bà: ..."
                 />
               </div>
            </div>
          </div>
        </section>

        <!-- Section 3: Thư mời & Lễ cưới -->
        <section id="section-3" class="scroll-mt-10">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <Mail class="w-4 h-4 text-amber-400" />
            </div>
            <h3 class="text-xs font-black uppercase tracking-[0.3em] text-gray-400">3. Thư mời & Lễ cưới</h3>
          </div>
          <div class="space-y-4">
             <div class="group">
               <label class="block text-[9px] font-bold text-gray-600 uppercase tracking-widest mb-2 ml-1">Lời mời (Thư mời)</label>
               <textarea 
                v-model="weddingData.invitationText"
                class="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-rose-500/50 transition-all text-sm font-medium min-h-[100px] resize-none"
                placeholder="Trân trọng kính mời bạn đến dự..."
               ></textarea>
             </div>
             <div class="grid grid-cols-2 gap-4">
                <div class="group">
                  <label class="block text-[9px] font-bold text-gray-600 uppercase tracking-widest mb-2 ml-1">Ngày cưới</label>
                  <input v-model="weddingData.date" type="date" class="w-full bg-white/5 border border-white/5 rounded-2xl px-4 py-4 [color-scheme:dark]" />
                </div>
                <div class="group">
                  <label class="block text-[9px] font-bold text-gray-600 uppercase tracking-widest mb-2 ml-1">Giờ làm lễ</label>
                  <input v-model="weddingData.time" type="time" class="w-full bg-white/5 border border-white/5 rounded-2xl px-4 py-4 [color-scheme:dark]" />
                </div>
             </div>
             <div class="group">
               <label class="block text-[9px] font-bold text-gray-600 uppercase tracking-widest mb-2 ml-1">Địa điểm sảnh tiệc</label>
               <input v-model="weddingData.location" type="text" class="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 outline-none" />
             </div>
          </div>
        </section>

        <!-- Section 4: Bản đồ chỉ đường -->
        <section id="section-4" class="scroll-mt-10">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <MapPin class="w-4 h-4 text-emerald-400" />
            </div>
            <h3 class="text-xs font-black uppercase tracking-[0.3em] text-gray-400">4. Bản đồ chỉ đường</h3>
          </div>
          <div class="space-y-4">
             <div class="group">
               <label class="block text-[9px] font-bold text-gray-600 uppercase tracking-widest mb-2 ml-1">Link Google Maps (Embed hoặc URL)</label>
               <input 
                v-model="weddingData.mapUrl"
                type="text" 
                class="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-rose-500/50 transition-all text-sm font-medium"
                placeholder="https://www.google.com/maps/embed?..."
               />
               <p class="text-[8px] text-gray-500 mt-2 italic px-1">* Sử dụng link iframe embed để hiển thị bản đồ trực tiếp trên thiệp.</p>
             </div>
          </div>
        </section>

        <!-- Section 5: QR Mừng cưới -->
        <section id="section-5" class="scroll-mt-10">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <QrCode class="w-4 h-4 text-amber-400" />
            </div>
            <h3 class="text-xs font-black uppercase tracking-[0.3em] text-gray-400">5. Thông tin QR Mừng cưới</h3>
          </div>
          <div class="space-y-4">
             <div class="p-6 bg-amber-500/5 border border-amber-500/10 rounded-3xl">
               <div class="grid grid-cols-1 gap-4">
                  <div class="group">
                    <label class="block text-[8px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Thông tin STK / Lời chúc</label>
                    <textarea v-model="weddingData.qrInfo" class="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 outline-none text-xs min-h-[80px]" placeholder="STK: 123456789 - Ngân hàng ABC. Cảm ơn quý khách..."></textarea>
                  </div>
               </div>
             </div>
          </div>
        </section>

        <!-- Submit -->
        <div class="pt-8">
           <button 
            @click="handleComplete"
            class="w-full py-5 rounded-[2rem] bg-gradient-to-r from-rose-500 to-rose-600 text-white text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-rose-500/30 hover:shadow-rose-500/50 hover:scale-[1.02] active:scale-95 transition-all duration-300"
           >
             Hoàn tất & Khởi tạo thiệp
           </button>
        </div>
      </div>
    </aside>

    <!-- Right: Real-time Preview (60%) -->
    <main class="flex-1 h-full flex items-center justify-center p-20 relative overflow-hidden bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]">
       
       <div 
        class="relative w-[500px] aspect-[3/4] rounded-[40px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden scale-110"
        :style="{ fontFamily: selectedFont, backgroundColor: activePreviewPage === '1' ? (weddingData.envelopeColor || '#8B1E3F') : 'white' }"
       >
          <!-- 📖 PAGE 1: TÚI ĐỰNG (ENVELOPE) -->
          <Transition name="page-flip" mode="out-in">
            <div v-if="activePreviewPage === '1'" key="p1" class="absolute inset-0 flex flex-col items-center justify-center">
              <!-- Envelope Flap Design -->
              <div class="absolute top-0 w-full h-[40%] bg-black/10 rounded-b-[100px] border-b border-white/5"></div>
              
              <div class="relative z-10 text-center px-12">
                 <div class="w-24 h-24 rounded-full bg-yellow-600/20 border-2 border-yellow-600/30 flex items-center justify-center mx-auto mb-10 shadow-2xl relative">
                    <!-- Wax Seal Effect -->
                    <div class="absolute inset-1 rounded-full border border-yellow-600/20 animate-pulse"></div>
                    <Heart class="w-10 h-10 text-yellow-600 opacity-60" />
                 </div>
                 
                 <div class="space-y-4">
                    <p class="text-[10px] text-white/40 uppercase tracking-[0.6em] font-black">Wedding Invitation</p>
                    <div class="h-px w-12 bg-white/10 mx-auto"></div>
                    <h2 class="text-2xl text-white font-serif italic py-4">{{ weddingData.envelopeText || 'Thân mời bạn' }}</h2>
                 </div>
              </div>

              <!-- Texture Overlay -->
              <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-20 pointer-events-none"></div>
            </div>

            <!-- 📖 PAGE 2: BÌA THIỆP -->
            <div v-else-if="activePreviewPage === '2'" key="p2" class="absolute inset-0 p-12 flex flex-col items-center text-center border-[12px] border-[#FFF5E1] bg-white">
              <div class="mt-16 mb-4">
                <p class="text-[10px] tracking-[0.8em] text-rose-900/40 uppercase font-black mb-4">{{ weddingData.title || 'Lễ Thành Hôn' }}</p>
                <div class="h-[1px] w-12 bg-rose-900/20 mx-auto"></div>
              </div>
              
              <div class="flex-1 flex flex-col justify-center gap-2">
                <h1 class="text-6xl text-rose-900 font-serif italic">{{ weddingData.groomName?.[0] || 'G' }}</h1>
                <span class="text-2xl text-rose-300 font-serif">&</span>
                <h1 class="text-6xl text-rose-900 font-serif italic">{{ weddingData.brideName?.[0] || 'B' }}</h1>
              </div>

              <div class="mb-10">
                <div class="text-[12px] text-rose-900/60 font-medium uppercase tracking-[0.4em]">{{ formatDate(weddingData.date) }}</div>
                <p class="text-[10px] text-rose-300 font-serif italic mt-4">Together we are better</p>
              </div>
            </div>

            <!-- 📖 PAGE 3: THÔNG TIN GIA ĐÌNH & CHƯƠNG TRÌNH -->
            <div v-else-if="activePreviewPage === '3'" key="p3" class="absolute inset-0 p-12 flex flex-col items-center text-center border-[12px] border-[#FFF5E1] bg-white">
               <div class="grid grid-cols-2 gap-8 w-full mt-8">
                  <div class="text-left border-r border-rose-900/10 pr-4">
                    <p class="text-[8px] font-black text-rose-900/40 uppercase tracking-widest mb-4">Gia đình Nhà Trai</p>
                    <p class="text-[10px] text-rose-950 font-serif italic leading-relaxed">{{ weddingData.groomParents || 'Ông: ... & Bà: ...' }}</p>
                    <h4 class="text-xl text-rose-900 font-serif italic mt-2">{{ weddingData.groomName || 'Chú rể' }}</h4>
                  </div>
                  <div class="text-right pl-4">
                    <p class="text-[8px] font-black text-rose-900/40 uppercase tracking-widest mb-4">Gia đình Nhà Gái</p>
                    <p class="text-[10px] text-rose-950 font-serif italic leading-relaxed">{{ weddingData.brideParents || 'Ông: ... & Bà: ...' }}</p>
                    <h4 class="text-xl text-rose-900 font-serif italic mt-2">{{ weddingData.brideName || 'Cô dâu' }}</h4>
                  </div>
               </div>
               
               <div class="mt-auto mb-10 w-full">
                  <div class="bg-[#FFF5E1]/50 p-8 rounded-[2rem]">
                    <p class="text-[10px] text-rose-900/60 font-bold uppercase tracking-widest mb-6">Trân trọng kính mời</p>
                    <p class="text-sm text-rose-950 font-serif italic leading-relaxed">
                      {{ weddingData.invitationText || 'Sự hiện diện của bạn là niềm vinh hạnh cho gia đình chúng tôi.' }}
                    </p>
                  </div>
               </div>
            </div>

            <!-- 📖 PAGE 4: LỄ CƯỚI & THỜI GIAN -->
            <div v-else-if="activePreviewPage === '4'" key="p4" class="absolute inset-0 p-12 flex flex-col items-center text-center border-[12px] border-[#FFF5E1] bg-white">
               <div class="mt-8 mb-12">
                 <h2 class="text-3xl text-rose-900 font-serif italic">Hôn Lễ</h2>
                 <p class="text-[9px] text-rose-400 font-black uppercase tracking-[0.4em] mt-2">Wedding Ceremony</p>
               </div>

               <div class="flex-1 flex flex-col gap-10 justify-center w-full px-4">
                  <div class="flex items-center justify-between border-b border-rose-900/10 pb-6">
                    <div class="text-left">
                      <p class="text-[8px] font-black text-rose-900/30 uppercase tracking-widest">Thời gian</p>
                      <p class="text-xl text-rose-900 font-serif italic">{{ weddingData.time || '18:00' }}</p>
                    </div>
                    <div class="text-right">
                      <p class="text-[8px] font-black text-rose-900/30 uppercase tracking-widest">Ngày tháng</p>
                      <p class="text-md text-rose-900 font-bold tracking-tighter">{{ formatDate(weddingData.date) }}</p>
                    </div>
                  </div>

                  <div class="text-center">
                    <p class="text-[8px] font-black text-rose-900/30 uppercase tracking-widest mb-4">Tại sảnh tiệc</p>
                    <p class="text-sm text-rose-900 font-serif italic max-w-[250px] mx-auto leading-relaxed">
                      {{ weddingData.location || 'Địa chỉ sảnh tiệc' }}
                    </p>
                  </div>
               </div>

               <div class="h-1 w-20 bg-rose-900/10 rounded-full mb-10"></div>
            </div>

            <!-- 📖 PAGE 5: BẢN ĐỒ CHỈ ĐƯỜNG -->
            <div v-else-if="activePreviewPage === '5'" key="p5" class="absolute inset-0 p-12 flex flex-col items-center text-center border-[12px] border-[#FFF5E1] bg-white">
               <div class="mt-8 mb-8">
                 <h2 class="text-3xl text-rose-900 font-serif italic">Bản Đồ</h2>
                 <p class="text-[9px] text-rose-400 font-black uppercase tracking-[0.4em] mt-2">Map & Directions</p>
               </div>

               <div class="flex-1 w-full bg-[#FFF5E1] rounded-3xl border-4 border-white shadow-inner overflow-hidden relative group">
                  <iframe 
                    v-if="weddingData.mapUrl"
                    :src="weddingData.mapUrl" 
                    class="w-full h-full border-none grayscale-[0.5] contrast-[1.2]" 
                    allow="autoplay; encrypted-media"
                    loading="lazy"
                  ></iframe>
                  <div v-else class="w-full h-full flex flex-col items-center justify-center p-8 text-rose-300">
                     <MapPin class="w-12 h-12 mb-4 opacity-20" />
                     <p class="text-[10px] uppercase font-black tracking-widest">Chưa có thông tin bản đồ</p>
                  </div>
                  <div class="absolute inset-0 bg-rose-950/5 pointer-events-none"></div>
               </div>

               <div class="mt-8 mb-10 text-[10px] text-rose-900/60 font-serif italic max-w-[300px]">
                 Vui lòng nhấn vào bản đồ để nhận chỉ đường chính xác nhất đến sảnh tiệc.
               </div>
            </div>

            <!-- 📖 PAGE 6: QR MỪNG CƯỚI -->
            <div v-else-if="activePreviewPage === '6'" key="p6" class="absolute inset-0 p-12 flex flex-col items-center text-center border-[12px] border-[#FFF5E1] bg-white">
               <div class="mt-8 mb-12">
                 <h2 class="text-3xl text-rose-900 font-serif italic">Gửi Lời Chúc</h2>
                 <p class="text-[9px] text-rose-400 font-black uppercase tracking-[0.4em] mt-2">Love & Gifts</p>
               </div>

               <div class="flex-1 flex flex-col items-center justify-center gap-10 w-full">
                  <div class="w-44 h-44 bg-[#FFF5E1] rounded-[2.5rem] flex items-center justify-center border-4 border-white shadow-xl relative overflow-hidden group">
                     <QrCode v-if="weddingData.qrInfo" class="w-32 h-32 text-rose-900/80" />
                     <div v-else class="text-[10px] text-rose-300 font-bold uppercase p-6">Chưa có mã QR</div>
                  </div>

                  <div class="w-full bg-[#FFF5E1] p-6 rounded-3xl border border-white">
                    <p class="text-[8px] font-black text-rose-900/30 uppercase tracking-widest mb-3">Thông tin quà tặng</p>
                    <p class="text-[11px] text-rose-950 font-serif italic leading-relaxed">{{ weddingData.qrInfo || 'Lời cảm ơn và thông tin STK' }}</p>
                  </div>
               </div>
               
               <div class="mb-10 text-[12px] text-rose-300 font-black tracking-[0.3em] uppercase">Forever & Always</div>
            </div>
          </Transition>

          <!-- Glossy Reflection -->
          <div class="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none"></div>
       </div>

       <!-- Preview Controls -->
       <div class="absolute bottom-10 right-10 flex gap-4">
          <div v-for="f in ['serif', 'sans-serif', 'cursive']" 
            :key="f"
            @click="selectedFont = f"
            class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-all text-[10px] uppercase font-black"
            :class="{ 'border-rose-500 text-rose-500': selectedFont === f }"
          >
            {{ f[0] }}
          </div>
       </div>
    </main>

    <!-- Success Modal -->
    <Teleport to="body">
       <div v-if="showSuccess" class="fixed inset-0 z-[1000] bg-black/90 backdrop-blur-xl flex items-center justify-center p-10 animate-in fade-in duration-500">
          <div class="text-center max-w-xl">
             <div class="w-24 h-24 rounded-full bg-emerald-500 mx-auto mb-10 flex items-center justify-center shadow-2xl shadow-emerald-500/40">
                <Check class="w-12 h-12 text-white" />
             </div>
             <h2 class="text-5xl font-black italic tracking-tighter text-white uppercase mb-6">Thành Công!</h2>
             <p class="text-gray-400 font-medium mb-12 text-lg">Hệ thống đã khởi tạo thành công thiệp mời điện tử của bạn. Bạn có thể bắt đầu chia sẻ link hoặc tiếp tục chỉnh sửa.</p>
             <div class="flex gap-4 justify-center">
                <button @click="showSuccess = false" class="px-10 py-5 rounded-2xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest text-gray-300 hover:text-white transition-all">Quay lại</button>
                <button @click="viewDemo" class="px-12 py-5 rounded-2xl bg-rose-500 text-white text-xs font-black uppercase tracking-widest shadow-xl shadow-rose-500/20 hover:scale-105 transition-all">Xem Demo Trải Nghiệm</button>
             </div>
          </div>
       </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { 
  ArrowLeft, Check, Heart, Users, Mail, MapPin, QrCode, Package as PackageIcon 
} from "lucide-vue-next";

const router = useRouter();
const route = useRoute();
const showSuccess = ref(false);
const selectedFont = ref("serif");
const activePreviewPage = ref("1");

const weddingData = ref({
  envelopeColor: "#8B1E3F",
  envelopeText: "Thân mời bạn & gia đình",
  title: "Lễ Thành Hôn",
  groomName: "",
  groomParents: "",
  brideName: "",
  brideParents: "",
  invitationText: "Thân mời bạn cùng gia đình đến chung vui và chúc mừng hạnh phúc cho ngày vui của chúng mình.",
  date: "",
  time: "",
  location: "",
  mapUrl: "",
  qrInfo: "",
  template: route.query.template || "blank"
});

const formatDate = (dateStr: string) => {
  if (!dateStr) return "Ngày 00 Tháng 00 Năm 2026";
  const d = new Date(dateStr);
  return `Ngày ${d.getDate()} Tháng ${d.getMonth() + 1} Năm ${d.getFullYear()}`;
};

const handleComplete = () => {
    localStorage.setItem("latest_wedding_card", JSON.stringify(weddingData.value));
    showSuccess.value = true;
};

const viewDemo = () => {
    router.push({ name: 'WeddingCardDemo' });
};
</script>

<style scoped>
.font-inter {
  font-family: 'Inter', sans-serif;
}
.font-serif {
  font-family: 'Playfair Display', serif;
}
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.animate-in {
  animation-fill-mode: forwards;
}
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
.fade-in {
  animation-name: fade-in;
}

/* Page Flip Transition */
.page-flip-enter-active,
.page-flip-leave-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.page-flip-enter-from {
  opacity: 0;
  transform: scale(0.95);
  filter: blur(10px);
}
.page-flip-leave-to {
  opacity: 0;
  transform: scale(1.05);
  filter: blur(10px);
}
</style>
