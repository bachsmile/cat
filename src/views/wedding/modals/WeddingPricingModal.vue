<template>
  <CnModal
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    title=""
    width="1100px"
    color="rose"
    class="wedding-pricing-modal"
  >
    <div class="pricing-container relative min-h-[700px] flex flex-col overflow-hidden">
      <!-- 🌸 Background Accents -->
      <div class="absolute -top-24 -left-24 w-80 h-80 bg-rose-400/20 blur-[100px] rounded-full"></div>
      <div class="absolute top-1/2 -right-32 w-96 h-96 bg-pink-300/10 blur-[130px] rounded-full"></div>

      <!-- STEP 1: PLANS SELECTION -->
      <template v-if="step === 'plans'">
        <div class="relative z-10 px-12 pt-12 text-center">
          <h2 class="text-4xl font-black italic tracking-tighter uppercase text-rose-950">
            Nâng Cấp <span class="text-rose-600">Trải Nghiệm</span> Ngày Chung Đôi
          </h2>
          <p class="text-rose-400 mt-3 font-bold text-xs uppercase tracking-[0.4em]">Chọn gói dịch vụ phù hợp để bắt đầu hành trình</p>

          <!-- Premium Tabs -->
          <div class="flex items-center justify-center mt-12">
            <div class="flex p-1.5 bg-rose-900/5 rounded-3xl border border-rose-100/50 backdrop-blur-md">
              <button 
                v-for="tab in ['single', 'combo']" 
                :key="tab"
                @click="activeTab = tab"
                class="px-12 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-500"
                :class="activeTab === tab 
                  ? 'bg-rose-500 text-white shadow-[0_10px_25px_rgba(244,63,94,0.3)]' 
                  : 'text-rose-300 hover:text-rose-500'"
              >
                {{ tab === 'single' ? 'Dịch vụ Đơn' : 'Gói Combo Web' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="flex-1 px-12 pb-16 relative z-10 overflow-y-auto custom-scroll mt-8">
          <!-- View 1: Single Services (Cards & Web) -->
          <div v-if="activeTab === 'single'" class="animate-in mt-8 px-4 pb-12 space-y-12">
             
             <!-- SECTION: CARDS -->
             <div>
                <div class="flex items-center gap-4 mb-8">
                  <div class="h-px flex-1 bg-rose-200/50"></div>
                  <h3 class="text-xs font-black text-rose-400 uppercase tracking-[0.4em] whitespace-nowrap">Dịch vụ Thiệp Cưới</h3>
                  <div class="h-px flex-1 bg-rose-200/50"></div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  <div class="pricing-card group p-8 rounded-[3rem] bg-white/40 border border-white/60 backdrop-blur-2xl transition-all shadow-sm">
                      <div class="w-14 h-14 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-500 mb-6 group-hover:scale-110 transition-transform">
                        <Layout class="w-7 h-7" />
                      </div>
                      <h3 class="text-xl font-black text-rose-950 uppercase italic tracking-tighter">Thiệp Tự Động</h3>
                      <p class="text-rose-400/60 text-[10px] font-bold mt-2 leading-relaxed">Sinh thiệp tự động theo danh sách mời.</p>
                      <div class="mt-8 flex items-baseline gap-2">
                        <span class="text-2xl font-black text-rose-600 tracking-tighter">1.000đ</span>
                        <span class="text-[9px] font-bold text-rose-300 uppercase">/ thiệp</span>
                      </div>
                      <CnButton @click="goToQuantity('single_auto', 1000)" class="w-full mt-8 !bg-rose-500 !text-white h-12 rounded-xl font-black uppercase text-[9px] tracking-widest shadow-lg">Đăng ký</CnButton>
                  </div>
                  <div class="pricing-card group p-8 rounded-[3rem] bg-white/40 border border-white/60 backdrop-blur-2xl transition-all shadow-sm">
                      <div class="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 mb-6 group-hover:scale-110 transition-transform">
                        <Image class="w-7 h-7" />
                      </div>
                      <h3 class="text-xl font-black text-rose-950 uppercase italic tracking-tighter">Thiệp Thường</h3>
                      <p class="text-rose-400/60 text-[10px] font-bold mt-2 leading-relaxed">Mẫu thiết kế có sẵn tinh tế nhất.</p>
                      <div class="mt-8 flex items-baseline gap-2">
                        <span class="text-2xl font-black text-rose-600 tracking-tighter">500đ</span>
                        <span class="text-[9px] font-bold text-rose-300 uppercase">/ thiệp</span>
                      </div>
                      <CnButton @click="goToQuantity('single_normal', 500)" class="w-full mt-8 !bg-white !text-rose-500 h-12 rounded-xl font-black uppercase text-[9px] tracking-widest border border-rose-100">Đăng ký</CnButton>
                  </div>
                </div>
             </div>

             <!-- SECTION: WEBSITES -->
             <div>
                <div class="flex items-center gap-4 mb-8">
                  <div class="h-px flex-1 bg-rose-200/50"></div>
                  <h3 class="text-xs font-black text-rose-400 uppercase tracking-[0.4em] whitespace-nowrap">Dịch vụ Website Tình Yêu</h3>
                  <div class="h-px flex-1 bg-rose-200/50"></div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div class="pricing-card group p-8 rounded-[3rem] bg-white/40 border border-white/60 backdrop-blur-2xl transition-all shadow-sm">
                      <div class="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 mb-6">
                        <Globe class="w-7 h-7" />
                      </div>
                      <h3 class="text-xl font-black text-rose-950 uppercase italic tracking-tighter">Web Cơ Bản</h3>
                      <ul class="text-rose-400/60 text-[9px] font-bold mt-3 space-y-1">
                        <li>• Gallery ảnh & QR mừng cưới</li>
                        <li>• Thông tin tiệc & QR website</li>
                      </ul>
                      <div class="mt-8">
                        <span class="text-2xl font-black text-rose-600 tracking-tighter">1.000.000đ</span>
                      </div>
                      <CnButton @click="goToInfo('web_basic', 1000000)" class="w-full mt-8 !bg-rose-500 !text-white h-12 rounded-xl font-black uppercase text-[9px] tracking-widest">Đăng ký</CnButton>
                  </div>
                  <div class="pricing-card group p-8 rounded-[3rem] bg-white/60 border-2 border-rose-200 backdrop-blur-2xl transition-all shadow-lg scale-105">
                      <div class="w-14 h-14 rounded-2xl bg-rose-500 flex items-center justify-center text-white mb-6">
                        <Sparkles class="w-7 h-7" />
                      </div>
                      <h3 class="text-xl font-black text-rose-950 uppercase italic tracking-tighter">Web Cao Cấp</h3>
                      <ul class="text-rose-400 text-[9px] font-bold mt-3 space-y-1">
                        <li>• Tích hợp quà tặng & Game</li>
                        <li>• Video mô tả & Hiệu ứng 3D</li>
                      </ul>
                      <div class="mt-8">
                        <span class="text-2xl font-black text-rose-600 tracking-tighter">3.000.000đ</span>
                      </div>
                      <CnButton @click="goToInfo('web_premium', 3000000)" class="w-full mt-8 !bg-rose-600 !text-white h-12 rounded-xl font-black uppercase text-[9px] tracking-widest">Đăng ký</CnButton>
                  </div>
                  <div class="pricing-card group p-8 rounded-[3rem] bg-rose-950 border border-rose-800 transition-all shadow-sm">
                      <div class="w-14 h-14 rounded-2xl bg-rose-800 flex items-center justify-center text-rose-400 mb-6">
                        <Gift class="w-7 h-7" />
                      </div>
                      <h3 class="text-xl font-black text-white uppercase italic tracking-tighter">Web Đặc Biệt</h3>
                      <ul class="text-rose-300/50 text-[9px] font-bold mt-3 space-y-1">
                        <li>• Quản lý khách hàng</li>
                        <li>• Thống kê tiền mừng đơn giản</li>
                      </ul>
                      <div class="mt-8">
                        <span class="text-2xl font-black text-rose-400 tracking-tighter">5.000.000đ</span>
                      </div>
                      <CnButton @click="goToInfo('web_ultimate', 5000000)" class="w-full mt-8 !bg-white !text-rose-950 h-12 rounded-xl font-black uppercase text-[9px] tracking-widest">Đăng ký</CnButton>
                  </div>
                </div>
             </div>
          </div>
          <!-- View 2: Combo Packages -->
          <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in mt-4 pb-12">
             <div v-for="c in comboPlans" :key="c.id" class="combo-card relative p-10 rounded-[3.5rem] bg-white/30 border border-white/40 backdrop-blur-3xl flex flex-col hover:bg-white/50 transition-all group" :class="{'!bg-rose-500 !border-rose-400': c.id === 'combo_premium'}">
                <div class="flex-1">
                  <div class="flex items-center gap-3 mb-8">
                    <div class="w-2 h-8 rounded-full" :class="c.id === 'combo_premium' ? 'bg-white' : 'bg-rose-400'"></div>
                    <h4 class="text-xl font-black uppercase italic tracking-tighter" :class="c.id === 'combo_premium' ? 'text-white' : 'text-rose-950'">{{ c.name }}</h4>
                  </div>
                  <ul class="space-y-4">
                    <li v-for="f in features[c.key]" :key="f" class="flex items-center gap-4">
                      <div class="w-5 h-5 rounded-full flex items-center justify-center text-rose-500" :class="c.id === 'combo_premium' ? 'bg-white/20 text-white' : 'bg-rose-100'">
                        <Check :size="12" />
                      </div>
                      <span class="text-[10px] font-bold tracking-tight" :class="c.id === 'combo_premium' ? 'text-rose-50' : 'text-rose-800'">{{ f }}</span>
                    </li>
                  </ul>
                </div>
                <div class="mt-10">
                  <div class="text-3xl font-black mb-6 tracking-tighter" :class="c.id === 'combo_premium' ? 'text-white' : 'text-rose-600'">{{ c.priceLabel }}</div>
                  <CnButton @click="goToInfo(c.id, c.price)" class="w-full h-14 rounded-2xl font-black uppercase text-[10px] tracking-widest" :class="c.id === 'combo_premium' ? '!bg-white !text-rose-600' : '!bg-rose-500 !text-white'">Chọn Gói</CnButton>
                </div>
             </div>
          </div>
        </div>
      </template>

      <!-- STEP 2: QUANTITY INPUT -->
      <template v-else-if="step === 'quantity'">
        <div class="flex-1 flex flex-col items-center justify-center p-12 relative z-10 animate-in">
           <div class="w-full max-w-md bg-white/60 backdrop-blur-3xl p-12 rounded-[3.5rem] border border-white/80 shadow-2xl text-center">
              <div class="w-20 h-20 rounded-3xl bg-rose-500 text-white flex items-center justify-center mx-auto mb-10 shadow-xl">
                 <Users :size="40" />
              </div>
              <h3 class="text-3xl font-black text-rose-950 uppercase italic tracking-tighter mb-4">Số lượng thiệp</h3>
              <p class="text-rose-400 text-xs font-bold uppercase tracking-widest mb-10">Bao nhiêu khách mời sẽ nhận được thiệp?</p>
              
              <div class="relative mb-10 group">
                <input 
                  type="number" 
                  v-model="quantity" 
                  placeholder="Ví dụ: 200"
                  class="w-full h-20 bg-rose-50/50 border-2 border-rose-100 rounded-2xl text-center text-3xl font-black text-rose-600 focus:border-rose-500 focus:outline-none transition-all group-hover:border-rose-200"
                />
              </div>

              <div class="flex items-center gap-4">
                <CnButton variant="text" @click="step = 'plans'" class="flex-1 h-14 text-rose-300 font-bold uppercase tracking-widest text-[10px]">Quay lại</CnButton>
                <CnButton @click="step = 'templates'" :disabled="!quantity || quantity <= 0" class="flex-[1.5] h-14 !bg-rose-500 !text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg">Tiếp tụC</CnButton>
              </div>
           </div>
        </div>
      </template>

      <!-- STEP 3: TEMPLATE SELECTION -->
      <template v-else-if="step === 'templates'">
        <div class="flex-1 relative z-10 px-12 pt-12 animate-in flex flex-col items-center pb-12">
           <h3 class="text-3xl font-black text-rose-950 uppercase italic tracking-tighter mb-2">Chọn Mẫu Thiệp</h3>
           <p class="text-rose-400 text-[10px] font-bold uppercase tracking-[0.4em] mb-12">Mỗi mẫu mang một phong cách riêng cho ngày trọng đại</p>
           
           <div class="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
              <div v-for="tpl in CARDS_TEMPLATES" :key="tpl.id" 
                @click="selectedTemplate = tpl"
                class="tpl-card group relative rounded-[2.5rem] bg-white/40 border-2 transition-all p-4 cursor-pointer"
                :class="selectedTemplate?.id === tpl.id ? 'border-rose-500 bg-white/60' : 'border-white/60 hover:border-rose-200'"
              >
                 <div class="aspect-[3/4] rounded-[1.8rem] overflow-hidden mb-6 relative">
                    <img :src="tpl.image" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div class="absolute top-4 right-4 bg-rose-500 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg">{{ tpl.priceLabel }}</div>
                    <div v-if="selectedTemplate?.id === tpl.id" class="absolute inset-0 bg-rose-500/10 flex items-center justify-center">
                        <div class="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center text-white scale-110 shadow-2xl">
                           <Check :size="24" />
                        </div>
                    </div>
                 </div>
                 <h4 class="text-center font-black text-rose-900 uppercase italic tracking-tighter">{{ tpl.name }}</h4>
                 <p class="text-center text-[10px] text-rose-400 font-bold uppercase mt-1 tracking-widest">{{ tpl.desc }}</p>
              </div>
           </div>

           <div class="mt-12 flex gap-4 w-full max-w-sm">
              <CnButton variant="text" @click="step = 'quantity'" class="flex-1 h-14 text-rose-300 font-bold uppercase tracking-widest">Quay lại</CnButton>
              <CnButton @click="step = 'info'" :disabled="!selectedTemplate" class="flex-[1.5] h-14 !bg-rose-500 !text-white rounded-2xl font-black uppercase shadow-lg">Tiếp tụC</CnButton>
           </div>
        </div>
      </template>

      <!-- STEP 4: INFORMATION INPUT -->
      <template v-else-if="step === 'info'">
        <div class="flex-1 relative z-10 px-12 pt-12 animate-in overflow-y-auto custom-scroll pb-20">
           <h3 class="text-3xl font-black text-rose-950 uppercase italic tracking-tighter mb-2 text-center">Thông Tin Ngày Cưới</h3>
           <p class="text-rose-400 text-[10px] font-bold uppercase tracking-[0.4em] mb-12 text-center">Hoàn tất dữ liệu để tạo đơn hàng</p>

           <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
              <div class="space-y-6">
                 <div>
                    <label class="text-[10px] font-black text-rose-400 uppercase tracking-widest mb-2 block">Tên Chú Rể</label>
                    <input v-model="weddingData.groomName" class="w-full h-14 bg-white/40 border border-white rounded-xl px-6 font-bold text-rose-900 focus:border-rose-400 focus:outline-none placeholder:text-rose-200" placeholder="Ví dụ: Nguyễn Văn A" />
                 </div>
                 <div>
                    <label class="text-[10px] font-black text-rose-400 uppercase tracking-widest mb-2 block">Tên Cô Dâu</label>
                    <input v-model="weddingData.brideName" class="w-full h-14 bg-white/40 border border-white rounded-xl px-6 font-bold text-rose-900 focus:border-rose-400 focus:outline-none placeholder:text-rose-200" placeholder="Ví dụ: Trần Thị B" />
                 </div>
                 <div>
                    <label class="text-[10px] font-black text-rose-400 uppercase tracking-widest mb-2 block">Ngày Diễn Ra</label>
                    <input type="date" v-model="weddingData.date" class="w-full h-14 bg-white/40 border border-white rounded-xl px-6 font-bold text-rose-900 focus:border-rose-400 focus:outline-none" />
                 </div>
              </div>
              <div class="space-y-6">
                 <div>
                    <label class="text-[10px] font-black text-rose-400 uppercase tracking-widest mb-2 block">Địa Chỉ Tiệc Cưới</label>
                    <input v-model="weddingData.location" class="w-full h-14 bg-white/40 border border-white rounded-xl px-6 font-bold text-rose-900 focus:border-rose-400 focus:outline-none placeholder:text-rose-200" placeholder="Nhập địa chỉ nhà hàng/tư gia" />
                 </div>
                 <div>
                    <label class="text-[10px] font-black text-rose-400 uppercase tracking-widest mb-2 block">Link QR Mừng Cưới (Tùy chọn)</label>
                    <input v-model="weddingData.paymentQr" class="w-full h-14 bg-white/40 border border-white rounded-xl px-6 font-bold text-rose-900 focus:border-rose-400 focus:outline-none placeholder:text-rose-200" placeholder="Dán link ảnh QR ngân hàng" />
                 </div>
                 <div class="pt-8">
                    <CnButton @click="step = 'payment'" class="w-full h-14 !bg-rose-500 !text-white rounded-2xl font-black uppercase shadow-lg">Tiếp Tục Thanh Toán</CnButton>
                    <CnButton variant="text" @click="step = isSingleCard ? 'templates' : 'plans'" class="w-full mt-4 text-rose-300 font-bold uppercase tracking-widest">Quay lại</CnButton>
                 </div>
              </div>
           </div>
        </div>
      </template>

      <!-- STEP 5: PAYMENT / INVOICE -->
      <template v-else-if="step === 'payment'">
        <div class="flex-1 flex items-center justify-center p-12 relative z-10 animate-in">
           <div class="w-full max-w-4xl bg-white/60 backdrop-blur-3xl rounded-[4rem] border border-white/80 shadow-2xl overflow-hidden flex flex-col md:flex-row">
              <div class="flex-1 p-12 border-r border-rose-100/30">
                <h3 class="text-3xl font-black text-rose-950 uppercase italic tracking-tighter mb-8">Hoá Đơn</h3>
                <div class="space-y-4">
                   <div class="flex justify-between items-center py-4 border-b border-rose-50">
                      <span class="text-[10px] font-bold text-rose-300 uppercase tracking-widest">Dịch vụ</span>
                      <span class="text-sm font-black text-rose-800 uppercase text-right">{{ selectedPlanLabel }}</span>
                   </div>
                   <div v-if="quantity" class="flex justify-between items-center py-4 border-b border-rose-50">
                      <span class="text-[10px] font-bold text-rose-300 uppercase tracking-widest">Số lượng</span>
                      <span class="text-sm font-black text-rose-800">{{ quantity }} thiệp</span>
                   </div>
                   <div v-if="selectedTemplate" class="flex justify-between items-center py-4 border-b border-rose-50">
                      <span class="text-[10px] font-bold text-rose-300 uppercase tracking-widest">Mẫu đã chọn</span>
                      <span class="text-sm font-black text-rose-800 uppercase italic">{{ selectedTemplate.name }}</span>
                   </div>
                   <div class="flex justify-between items-center py-4 border-b border-rose-50">
                      <span class="text-[10px] font-bold text-rose-300 uppercase tracking-widest">Đơn giá</span>
                      <span class="text-sm font-black text-rose-800">{{ formatPrice(unitPrice + (selectedTemplate?.price || 0)) }}</span>
                   </div>
                   <div class="flex justify-between items-center pt-8">
                      <span class="text-xs font-black text-rose-950 uppercase tracking-widest">Tổng Thanh Toán</span>
                      <span class="text-4xl font-black text-rose-600 tracking-tighter">{{ formatPrice(totalPrice) }}</span>
                   </div>
                </div>
                <div class="mt-12">
                   <CnButton @click="handleFinishPayment" class="w-full h-16 !bg-rose-600 !text-white rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-xl">Xác Nhận & Hoàn Tất</CnButton>
                   <CnButton variant="text" @click="step = 'info'" class="w-full mt-4 text-rose-300 text-[9px] uppercase font-black tracking-widest">Quay lại</CnButton>
                </div>
              </div>
              <div class="w-full md:w-80 bg-rose-50/50 p-12 flex flex-col items-center justify-center text-center">
                 <div class="w-48 h-48 bg-white p-4 rounded-3xl shadow-xl border border-rose-100 mb-6 flex items-center justify-center">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PAYMENT_DEMO" class="w-full h-full object-contain mix-blend-multiply opacity-80" alt="QR" />
                 </div>
                 <p class="text-[10px] flex items-center gap-2 font-black text-rose-400 uppercase tracking-widest"><CreditCard :size="14" /> Quét mã thanh toán</p>
                 <div class="mt-8 p-4 bg-white/80 rounded-2xl border border-rose-100 w-full text-[9px] font-bold uppercase">
                    <p class="text-rose-300">STK: <span class="text-rose-600">0396 888 888</span></p>
                    <p class="text-rose-300">Bank: <span class="text-rose-600">TECHCOMBANK</span></p>
                 </div>
              </div>
           </div>
        </div>
      </template>

      <!-- STEP 6: SUCCESS MODAL -->
      <template v-else-if="step === 'success'">
        <div class="flex-1 flex flex-col items-center justify-center p-12 relative z-10 animate-in text-center">
            <div class="relative mb-12">
               <div class="w-32 h-32 rounded-full bg-emerald-500 flex items-center justify-center text-white scale-125 shadow-2xl">
                  <Check :size="64" />
               </div>
               <div class="absolute -top-4 -right-4 w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center text-white shadow-xl animate-bounce">
                  <Heart class="w-6 h-6" />
               </div>
            </div>
            <h2 class="text-5xl font-black text-rose-950 uppercase italic tracking-tighter mb-4">THÀNH CÔNG!</h2>
            <p class="text-rose-500 font-bold uppercase tracking-[0.3em] mb-12">Đơn hàng của bạn đã được khởi tạo và gửi lên hệ thống.</p>
            
            <CgCard type="grain-frost" class="p-8 rounded-[3rem] border border-emerald-100 bg-white/40 mb-12 max-w-lg mx-auto">
               <p class="text-xs font-medium text-emerald-800 leading-relaxed italic">
                 "Chào mừng bạn đến với hành trình chuẩn bị cho ngày hạnh phúc nhất. Đội ngũ của chúng tôi sẽ xử lý đơn hàng của bạn ngay lập tức!"
               </p>
            </CgCard>

            <CnButton @click="emit('update:modelValue', false)" class="w-full max-w-sm h-16 !bg-rose-600 !text-white rounded-2xl font-black uppercase shadow-xl mx-auto">Đóng & Về Trang Chủ</CnButton>
        </div>
      </template>

      <!-- Noise Overlay -->
      <div class="absolute inset-0 pointer-events-none opacity-[0.2] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay z-0"></div>
    </div>
  </CnModal>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { 
  Check, 
  Layout, 
  Image,
  Users,
  CreditCard,
  Globe,
  Sparkles,
  Gift,
  Heart
} from "lucide-vue-next";
import { CnModal, CnButton, CgCard } from "glass-studio-ui-pro";
import { useToast } from "@/composables/useToast";

defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits(["update:modelValue", "select"]);
const { showToast } = useToast();

const step = ref<"plans" | "quantity" | "templates" | "info" | "payment" | "success">("plans");
const activeTab = ref("combo");
const selectedPlanId = ref("");
const quantity = ref<number | null>(null);
const unitPrice = ref(0);
const selectedTemplate = ref<any>(null);

const weddingData = ref({
  groomName: "",
  brideName: "",
  date: "",
  location: "",
  paymentQr: ""
});

const CARDS_TEMPLATES = [
  { id: 'elegant', name: 'Hạnh Phúc', desc: 'Tinh tế & Hiện đại', price: 0, priceLabel: 'Dùng thử', image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=80&w=400' },
  { id: 'classic', name: 'Sắc Hồng', desc: 'Ngọt ngào & Lãng mạn', price: 500, priceLabel: '+500đ', image: 'https://images.unsplash.com/photo-1546190255-451a91afc548?auto=format&fit=crop&q=80&w=400' },
  { id: 'royal', name: 'Hoàng Gia', desc: 'Sang trọng & Qúy phái', price: 1000, priceLabel: '+1000đ', image: 'https://images.unsplash.com/photo-1511285560929-86b16dfe1bf7?auto=format&fit=crop&q=80&w=400' },
];

const comboPlans = [
  { id: 'combo_basic', name: 'Gói Cơ Bản', key: 'basic', price: 1000000, priceLabel: '1.000.000đ' },
  { id: 'combo_premium', name: 'Gói Cao Cấp', key: 'premium', price: 3000000, priceLabel: '3.000.000đ' },
  { id: 'combo_ultimate', name: 'Gói Đặc Biệt', key: 'ultimate', price: 5000000, priceLabel: '5.000.000đ' },
];

const selectedPlanLabel = computed(() => {
  if (selectedPlanId.value === 'single_auto') return "Thiệp Tự Động";
  if (selectedPlanId.value === 'single_normal') return "Thiệp Thường";
  if (selectedPlanId.value === 'web_basic') return "Web Cơ Bản";
  if (selectedPlanId.value === 'web_premium') return "Web Cao Cấp";
  if (selectedPlanId.value === 'web_ultimate') return "Web Đặc Biệt";
  return comboPlans.find(c => c.id === selectedPlanId.value)?.name || "";
});

const totalPrice = computed(() => {
  const basePrice = (unitPrice.value + (selectedTemplate.value?.price || 0));
  if (quantity.value && quantity.value > 0) return quantity.value * basePrice;
  return unitPrice.value;
});

const isSingleCard = computed(() => selectedPlanId.value.startsWith('single_'));

const formatPrice = (p: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p);
};

const goToQuantity = (planId: string, price: number) => {
  selectedPlanId.value = planId;
  unitPrice.value = price;
  step.value = 'quantity';
};

const goToInfo = (planId: string, price: number) => {
  selectedPlanId.value = planId;
  unitPrice.value = price;
  quantity.value = null;
  selectedTemplate.value = null;
  step.value = 'info';
};

const handleFinishPayment = async () => {
  try {
     const orderData = {
        planId: selectedPlanId.value,
        quantity: quantity.value || 1,
        totalAmount: totalPrice.value,
        templateId: selectedTemplate.value?.id,
        weddingData: { ...weddingData.value },
        status: 'pending'
     };
     emit('select', orderData);
     step.value = 'success';
     showToast("Thanh toán thành công! Đơn hàng đã được khởi tạo.", "success");
  } catch (e) {
     showToast("Lỗi xử lý", "error");
  }
};

const features: Record<string, string[]> = {
  basic: [
    "Bao gồm 500 thiệp mời",
    "Pannel chính thiệp điện tử",
    "Danh sách ảnh cưới Gallery",
    "Thông tin tiệc cưới chi tiết",
    "QR chuyển tiền mừng cưới",
    "Cổng QR Website riêng"
  ],
  premium: [
    "Bao gồm 1.000 thiệp mời",
    "Tất cả tính năng Gói Cơ Bản",
    "Tích hợp Mini-game quà tặng",
    "Video câu lạc bộ mô tả",
    "Bộ hiệu ứng cao cấp 3D",
    "Lời dẫn AI cảm xúc"
  ],
  ultimate: [
    "Bao gồm 2.000 thiệp mời",
    "Tất cả tính năng Gói Cao Cấp",
    "Hệ thống quản lý khách mời",
    "Thống kê & Quản lý tiền mừng",
    "Tên miền riêng (Website)",
    "Hỗ trợ kỹ thuật 24/7"
  ]
};
</script>

<style>
.wedding-pricing-modal [class*="modal-box"] {
  background: #fff1f2 !important;
  border-radius: 4rem !important;
  padding: 0 !important;
  border: 1px solid rgba(244, 63, 94, 0.2) !important;
  overflow: hidden !important;
}
.wedding-pricing-modal [class*="modal-header"],
.wedding-pricing-modal [class*="modal-close"] {
  display: none !important;
}
</style>

<style scoped>
.custom-scroll::-webkit-scrollbar { width: 4px; }
.custom-scroll::-webkit-scrollbar-thumb { background: rgba(244, 63, 94, 0.2); border-radius: 10px; }
.animate-in { animation: slideBottom 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes slideBottom {
  from { opacity: 0; transform: translateY(20px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
.tpl-card img { filter: brightness(0.9); }
.tpl-card:hover img { filter: brightness(1.1); }
</style>
