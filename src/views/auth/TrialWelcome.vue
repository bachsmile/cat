<template>
  <div
    class="h-screen w-full bg-[#050508] text-white overflow-y-auto overflow-x-hidden font-['Inter',_sans-serif] scroll-smooth relative"
    @scroll="handleScroll"
    ref="scrollContainer"
  >
    <!-- Intro Phase (Premium Animated Sequence) -->
    <transition name="fade">
      <div
        v-show="phase === 'intro'"
        class="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      >
        <!-- Ambient Background for Intro -->
        <div
          class="absolute inset-0 z-0 pointer-events-none transition-all duration-1000"
          :class="currentDomainColor"
        >
          <div
            class="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-current opacity-20 blur-[150px] rounded-full animate-pulse-slow"
          ></div>
          <div
            class="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-current opacity-20 blur-[150px] rounded-full animate-pulse-slow"
            style="animation-delay: 2s"
          ></div>
        </div>

        <div
          class="relative z-10 flex flex-col items-center justify-center w-full px-4 text-center h-full"
        >
          <!-- Step 1: Initial Hook -->
          <transition name="zoom-fade">
            <h1
              v-if="introStep === 0"
              class="text-6xl md:text-8xl font-black tracking-tighter bg-gradient-to-br from-white via-gray-200 to-gray-600 bg-clip-text text-transparent"
            >
              THE FUTURE IS HERE
            </h1>
          </transition>

          <!-- Step 2: Cycling Domains Showcase -->
          <transition name="zoom-fade">
            <div v-if="introStep === 1" class="flex flex-col items-center">
              <p
                class="text-2xl md:text-3xl text-gray-400 mb-8 font-light tracking-wide"
              >
                Một hệ thống lõi duy nhất cho...
              </p>

              <transition name="slide-up" mode="out-in">
                <div
                  :key="showcaseDomain?.id"
                  class="flex flex-col items-center transform transition-all"
                >
                  <div
                    class="w-32 h-32 md:w-48 md:h-48 rounded-[2rem] bg-white/5 border border-white/20 backdrop-blur-xl flex items-center justify-center mb-8 shadow-2xl"
                    :class="showcaseDomain?.shadow"
                  >
                    <component
                      :is="showcaseDomain?.icon"
                      class="w-16 h-16 md:w-24 md:h-24"
                      :class="showcaseDomain?.color"
                    />
                  </div>
                  <h2
                    class="text-5xl md:text-7xl font-bold tracking-tight"
                    :class="showcaseDomain?.color"
                  >
                    {{ showcaseDomain?.name }}
                  </h2>
                  <p class="mt-4 text-xl text-gray-400 max-w-lg">
                    {{ showcaseDomain?.desc }}
                  </p>
                </div>
              </transition>
            </div>
          </transition>

          <!-- Step 3: Call to Action -->
          <transition name="zoom-fade">
            <div v-if="introStep === 2" class="flex flex-col items-center">
              <h2
                class="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-[length:200%_auto] bg-clip-text text-transparent animate-pulse-text mb-12"
              >
                Khám Phá Không Gian Làm Việc
              </h2>
              <button
                @click="startSurvey"
                class="group relative px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/20 rounded-full font-bold text-xl transition-all hover:scale-105 active:scale-95 overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.3)]"
              >
                <div
                  class="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                ></div>
                <span class="relative z-10 text-white flex items-center gap-3">
                  Bắt Đầu Hành Trình
                  <svg
                    class="w-6 h-6 transform group-hover:translate-x-2 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
          </transition>
        </div>
      </div>
    </transition>

    <!-- Survey Overlay Phase -->
    <transition name="fade">
      <div
        v-if="phase === 'survey'"
        class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-2xl p-4"
      >
        <!-- Welcome Text -->
        <div class="text-center z-10 mb-12 animate-fade-up">
          <h2
            class="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-4"
          >
            Chào mừng bạn đến với Hệ sinh thái
          </h2>
          <p class="text-xl md:text-2xl text-gray-300 font-light">
            Bạn muốn trải nghiệm lĩnh vực nào hôm nay?
          </p>
        </div>

        <!-- Central Orb -->
        <div
          class="relative w-80 h-80 md:w-[32rem] md:h-[32rem] mb-16 z-10 flex items-center justify-center scale-90 md:scale-100"
        >
          <!-- Glossy Bubble Blobs (Based on User Sample) -->
          <!-- 1. Large Cyan/Blue Base Blob -->
          <div
            class="absolute w-[80%] h-[75%] bg-gradient-to-br from-cyan-400/40 via-blue-500/30 to-purple-600/30 backdrop-blur-3xl rounded-[40%_60%_70%_30%/40%_50%_60%_50%] border border-white/20 animate-blob-morph1 z-0 shadow-[0_20px_50px_rgba(0,0,0,0.3),inset_0_10px_30px_rgba(255,255,255,0.2)]"
          ></div>

          <!-- 2. Pink Glossy Bubble -->
          <div
            class="absolute w-[60%] h-[55%] -top-4 -left-8 bg-gradient-to-tr from-pink-500/40 via-rose-500/30 to-transparent backdrop-blur-2xl rounded-[60%_40%_30%_70%/60%_30%_70%_40%] border border-white/30 animate-blob-morph2 z-[1] shadow-[inset_0_8px_20px_rgba(255,255,255,0.4)]"
          >
            <!-- Inner Shine -->
            <div
              class="absolute top-4 left-6 w-12 h-6 bg-white/40 blur-md rounded-full rotate-[-45deg]"
            ></div>
          </div>

          <!-- 3. Purple Deep Bubble -->
          <div
            class="absolute w-[50%] h-[50%] bottom-4 right-4 bg-gradient-to-br from-purple-600/50 via-indigo-600/40 to-transparent backdrop-blur-2xl rounded-[30%_70%_70%_30%/50%_40%_60%_50%] border border-white/20 animate-blob-morph3 z-[1] shadow-[inset_0_-10px_25px_rgba(255,100,255,0.2)]"
          >
            <!-- Little Shine -->
            <div
              class="absolute bottom-10 right-10 w-4 h-4 bg-white/60 blur-sm rounded-full"
            ></div>
          </div>

          <!-- 4. Top Frosted Highlight Bubble -->
          <div
            class="absolute w-[65%] h-[40%] top-8 bg-white/5 backdrop-blur-md rounded-[50%_50%_30%_70%/60%_40%_60%_40%] border border-white/40 animate-blob-morph1 z-[2] shadow-[inset_0_15px_30px_rgba(255,255,255,0.3)]"
          >
            <!-- Internal Glow -->
            <div
              class="absolute top-2 left-1/2 -translate-x-1/2 w-[80%] h-4 bg-white/20 blur-sm rounded-full"
            ></div>
          </div>

          <!-- Main Image (bog.png) centered and clear -->
          <img
            :src="bogImage"
            alt="Central Orb"
            class="w-64 h-64 md:w-80 md:h-80 object-contain relative z-10 drop-shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:scale-105 transition-transform duration-700"
          />
        </div>

        <!-- Pill Selections -->
        <div
          class="flex flex-wrap justify-center gap-4 z-10 max-w-4xl animate-fade-up"
          style="animation-delay: 0.3s"
        >
          <button
            v-for="domain in domains"
            :key="domain.id"
            @click="selectDomain(domain)"
            class="group flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:-translate-y-1 backdrop-blur-md"
          >
            <component
              :is="domain.icon"
              class="w-5 h-5 text-gray-400 group-hover:text-white transition-colors"
            />
            <span
              class="text-gray-300 group-hover:text-white font-medium whitespace-nowrap"
              >{{ domain.name }}</span
            >
          </button>
        </div>

        <!-- Optional skip or text below -->
        <div
          class="mt-8 text-sm text-gray-500 z-10 animate-fade-up"
          style="animation-delay: 0.5s"
        >
          Chọn một lựa chọn ở trên để thiết lập không gian làm việc của bạn
        </div>
      </div>
    </transition>

    <!-- Domain Home Phase -->
    <transition name="slide-up">
      <div
        v-if="phase === 'domain'"
        class="min-h-screen relative z-10 w-full pt-32 pb-40 bg-[#050508]"
      >
        <!-- Decorative Background Elements -->
        <div
          class="absolute top-0 w-full h-96 bg-gradient-to-b from-transparent pointer-events-none"
          :class="themeClasses.gradientFrom"
        ></div>

        <!-- Domain Intro -->
        <div class="max-w-6xl mx-auto px-6 text-center mb-32 relative z-10">
          <div
            class="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 font-semibold tracking-wide text-sm mb-6 animate-fade-up"
            :class="themeClasses.text"
          >
            CHÀO MỪNG BẠN ĐẾN VỚI BÀN LÀM VIỆC
          </div>
          <h2
            class="text-6xl md:text-8xl font-black mb-8 tracking-tighter bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent animate-fade-up"
            style="animation-delay: 0.1s"
          >
            Giải Pháp {{ selectedDomain?.name }}
          </h2>
          <p
            class="text-2xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed animate-fade-up"
            style="animation-delay: 0.2s"
          >
            Trải nghiệm nền tảng quản lý {{ selectedDomain?.name.toLowerCase() }} tối ưu nhất. Được đo ni đóng giày cho các chuyên gia đòi hỏi sự xuất sắc và hiệu quả.
          </p>
        </div>

        <!-- Domain Features Showcase -->
        <div class="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          <div v-for="(feature, idx) in selectedDomain?.features" :key="idx" 
               @click="openFeaturePreview(feature)"
               class="flex gap-6 p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-all group animate-fade-up cursor-pointer hover:border-blue-500/50"
               :style="{ animationDelay: getFeatureDelay(idx) }">
            <div class="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
                 :class="themeClasses.bg">
              <component :is="feature.icon" class="w-8 h-8" :class="themeClasses.text" />
            </div>
            <div>
              <h3 class="text-2xl font-bold text-white mb-2">{{ feature.title }}</h3>
              <p class="text-gray-400 leading-relaxed">{{ feature.desc }}</p>
              <span class="text-xs font-semibold mt-3 inline-block" :class="themeClasses.text">Xem Demo UI →</span>
            </div>
          </div>
        </div>

        <!-- Pricing Plans Section Title -->
        <div class="max-w-7xl mx-auto px-6 text-center mb-16 animate-fade-up">
          <h2 class="text-4xl font-black text-white mb-4">Lựa Chọn Chiến Lược Của Bạn</h2>
          <p class="text-gray-500 font-medium">Chọn một gói để bắt đầu dùng thử 7 ngày ngay lập tức.</p>
        </div>

        <!-- Pricing Plans -->
        <div
          class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10"
        >
          <!-- Basic -->
          <div
            ref="pricingCard0"
            @click="openRegisterModalWithPlan('Basic')"
            class="pricing-card cursor-pointer group/card bg-white/5 rounded-[2.5rem] p-10 border border-white/10 hover:border-purple-500/50 transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] hover:-translate-y-2"
          >
            <h3 class="text-2xl font-bold text-white mb-2">Cơ Bản</h3>
            <p class="text-gray-500 mb-8 font-medium">
              Dành cho cá nhân & startups
            </p>
            <div class="text-5xl font-black mb-8 text-white">
              $19<span
                class="text-xl text-gray-500 font-medium tracking-normal align-middle"
                >/tháng</span
              >
            </div>
            <ul class="space-y-5 mb-10 text-gray-400">
              <li class="flex items-start gap-4">
                <svg
                  class="w-6 h-6 text-gray-300 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span class="leading-tight"
                  >Chức năng {{ selectedDomain?.name }} thiết yếu</span
                >
              </li>
              <li class="flex items-start gap-4">
                <svg
                  class="w-6 h-6 text-gray-300 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span class="leading-tight">1 Tài khoản Quản trị</span>
              </li>
              <li class="flex items-start gap-4">
                <svg
                  class="w-6 h-6 text-gray-300 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span class="leading-tight">Hỗ trợ qua Email tiêu chuẩn</span>
              </li>
            </ul>
          </div>
          <!-- Advanced -->
          <div
            ref="pricingCard1"
            @click="openRegisterModalWithPlan('Advanced')"
            class="pricing-card cursor-pointer group/card bg-gradient-to-b from-purple-900/60 to-indigo-900/40 rounded-[2.5rem] p-10 border border-purple-500/50 shadow-[0_30px_60px_rgba(168,85,247,0.2)] relative grow-card hover:-translate-y-2 transition-all"
          >
            <div
              class="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-sm font-bold px-6 py-2 rounded-full shadow-lg shadow-purple-500/40 tracking-wider"
            >
              POPULAR CHOICE
            </div>
            <h3 class="text-2xl font-bold text-white mb-2">Advanced</h3>
            <p class="text-purple-300 mb-8 font-medium">For growing agencies</p>
            <div class="text-5xl font-black mb-8 text-white">
              $49<span
                class="text-xl text-purple-300 font-medium tracking-normal align-middle"
                >/mo</span
              >
            </div>
            <ul class="space-y-5 mb-10 text-gray-200">
              <li class="flex items-start gap-4">
                <svg
                  class="w-6 h-6 text-purple-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span class="leading-tight">All Basic Features Included</span>
              </li>
              <li class="flex items-start gap-4">
                <svg
                  class="w-6 h-6 text-purple-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span class="leading-tight">Custom Domain & Branding</span>
              </li>
              <li class="flex items-start gap-4">
                <svg
                  class="w-6 h-6 text-purple-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span class="leading-tight">Priority 24/7 Phone Support</span>
              </li>
            </ul>
          </div>
          <!-- Premium -->
          <div
            ref="pricingCard2"
            @click="openRegisterModalWithPlan('Premium')"
            class="pricing-card cursor-pointer group/card bg-white/5 rounded-[2.5rem] p-10 border border-white/10 hover:border-purple-500/50 transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] hover:-translate-y-2"
          >
            <h3 class="text-2xl font-bold text-white mb-2">Premium</h3>
            <p class="text-gray-500 mb-8 font-medium">For large enterprises</p>
            <div class="text-5xl font-black mb-8 text-white">
              $99<span
                class="text-xl text-gray-500 font-medium tracking-normal align-middle"
                >/mo</span
              >
            </div>
            <ul class="space-y-5 mb-10 text-gray-400">
              <li class="flex items-start gap-4">
                <svg
                  class="w-6 h-6 text-gray-300 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span class="leading-tight"
                  >All Advanced Features Included</span
                >
              </li>
              <li class="flex items-start gap-4">
                <svg
                  class="w-6 h-6 text-gray-300 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span class="leading-tight">Dedicated Account Manager</span>
              </li>
              <li class="flex items-start gap-4">
                <svg
                  class="w-6 h-6 text-gray-300 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span class="leading-tight">On-premise Deployment Options</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>

    <!-- Registration Prompt at the Bottom -->
    <transition name="slide-up-slow">
      <div
        v-if="showRegisterPrompt && phase === 'domain'"
        class="fixed bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#050508] via-[#050508]/95 to-transparent z-50 flex flex-col items-center justify-center pointer-events-none"
      >
        <div
          class="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 md:p-10 shadow-[0_0_80px_rgba(0,0,0,0.8)] text-center max-w-3xl w-full pointer-events-auto transform transition-all hover:border-blue-500/50 relative"
        >
          <button
            @click="showRegisterPrompt = false"
            class="absolute top-4 right-4 text-white/50 hover:text-white transition-colors bg-white/5 w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10"
          >
            ✕
          </button>
          <h3
            class="text-3xl font-black mb-4 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent"
          >
            Sẵn sàng chuyển đổi quy trình làm việc?
          </h3>
          <p class="text-lg text-gray-300 mb-8 font-light">
            Nhận ngay bản dùng thử miễn phí 7 ngày với quyền Quản trị viên trong lĩnh vực 
            <strong class="text-white">{{ selectedDomain?.name }}</strong>.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              @click="openRegisterModal"
              class="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-blue-500/50 hover:-translate-y-1"
            >
              Đăng Ký Ngay
            </button>
            <button
              @click="cancelRegister"
              class="bg-white/5 hover:bg-white/10 text-white px-10 py-4 rounded-2xl font-bold text-lg border border-white/10 transition-all hover:-translate-y-1"
            >
              Để Sau
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Registration Modal -->
    <transition name="fade">
      <div
        v-if="isRegisterModalOpen"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
      >
        <div
          class="bg-[#0a0a0f] border border-white/10 w-full max-w-lg rounded-[2.5rem] p-10 relative shadow-[0_0_100px_rgba(168,85,247,0.2)] overflow-hidden"
        >
          <button
            @click="isRegisterModalOpen = false"
            class="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors bg-white/5 w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 z-20"
          >
            ✕
          </button>

          <!-- Step 1: Account -->
          <div v-if="regStep === 'account'">
            <h3 class="text-3xl font-black mb-2 text-white">Tạo Tài Khoản</h3>
            <p class="text-sm text-gray-400 mb-8 font-medium">
              Vui lòng nhập thông tin quản trị viên để bắt đầu.
            </p>

            <form @submit.prevent="goToPayment" class="space-y-5">
              <div>
                <label class="text-xs text-gray-400 uppercase tracking-widest font-bold ml-1 mb-2 block">Địa chỉ Email</label>
                <input type="email" v-model="regEmail" required placeholder="admin@example.com" class="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/20 text-white transition-all"/>
              </div>
              <div>
                <label class="text-xs text-gray-400 uppercase tracking-widest font-bold ml-1 mb-2 block">Mật khẩu</label>
                <input type="password" v-model="regPassword" required placeholder="••••••••" class="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/20 text-white transition-all"/>
              </div>
              <button type="submit" class="w-full mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 rounded-2xl shadow-lg transition-all text-lg hover:-translate-y-1 active:scale-95">
                Tiếp Tục Thanh Toán
              </button>
            </form>
          </div>

          <!-- Step 2: Payment -->
          <div v-if="regStep === 'payment'" class="text-center">
            <h3 class="text-3xl font-black mb-2 text-white">Thanh Toán Gói</h3>
            <p class="text-sm text-gray-400 mb-8 font-medium">
              Quét mã QR dưới đây để kích hoạt gói <span class="text-blue-400 font-bold">{{ selectedPlan || 'Trial' }}</span>
            </p>
            
            <div class="bg-white p-6 rounded-3xl mx-auto mb-8 w-64 h-64 flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.1)]">
              <!-- Mock QR Code representing the user's uploaded image -->
              <div class="flex flex-col items-center">
                <div class="text-[10px] font-bold text-black mb-2 uppercase tracking-tighter">TPBank | VIETQR</div>
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TRANXUANBACH-13970999999" alt="QR Code" class="w-40 h-40"/>
                <div class="text-[10px] font-bold text-black mt-2">TRAN XUAN BACH</div>
                <div class="text-[8px] text-gray-500">13970999999</div>
              </div>
            </div>

            <div class="space-y-4">
              <button @click="completePayment" class="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-4 rounded-2xl shadow-lg transition-all text-lg hover:-translate-y-1 active:scale-95">
                Hoàn Tất Thanh Toán
              </button>
              <button @click="regStep = 'account'" class="text-gray-500 hover:text-white transition-colors text-sm font-medium">Quay lại</button>
            </div>
          </div>

          <!-- Step 3: Success -->
          <div v-if="regStep === 'success'" class="text-center py-8">
            <div class="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 class="text-3xl font-black mb-4 text-white">Đăng Ký Thành Công!</h3>
            <p class="text-lg text-gray-400 leading-relaxed mb-8">
                Hệ thống đã kích hoạt tài khoản của bạn ở chế độ <b>Dùng thử 7 ngày</b>. Thông tin thanh toán và nâng cấp gói chính thức của bạn đang được đội ngũ quản trị xử lý.
            </p>
            
            <div class="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4 mb-8 flex items-center gap-4 text-left">
              <div class="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <div class="text-sm font-bold text-white uppercase tracking-wider">Trạng thái: Đang xử lý</div>
                <div class="text-xs text-gray-400">Gói {{ selectedPlan || 'Cơ bản' }} đã sẵn sàng.</div>
              </div>
            </div>

            <div class="space-y-4">
              <button 
                @click="enterSystem" 
                :disabled="loading"
                class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 rounded-2xl shadow-lg transition-all text-lg hover:-translate-y-1 active:scale-95 disabled:opacity-50"
              >
                {{ loading ? 'Đang chuyển hướng...' : 'Vào Hệ Thống Ngay' }}
              </button>
              <button @click="isRegisterModalOpen = false" class="text-gray-500 hover:text-white transition-colors text-sm font-medium">Để sau</button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Feature Preview Modal -->
    <transition name="fade">
      <div v-if="isPreviewModalOpen" class="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 backdrop-blur-xl p-6">
        <div class="bg-[#0a0a0f] border border-white/10 w-full max-w-5xl rounded-[3rem] overflow-hidden relative shadow-[0_0_150px_rgba(59,130,246,0.2)]">
          <button @click="isPreviewModalOpen = false" class="absolute top-8 right-8 text-white/50 hover:text-white bg-white/5 w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/10 z-30 transition-all">✕</button>
          
          <div class="flex flex-col md:flex-row h-[80vh]">
            <!-- Sidebar / Info -->
            <div class="w-full md:w-80 p-12 border-b md:border-b-0 md:border-r border-white/10 bg-white/[0.02]">
              <div class="w-16 h-16 rounded-2xl flex items-center justify-center mb-8" :class="themeClasses.bg">
                <component :is="activeFeature?.icon" class="w-8 h-8" :class="themeClasses.text" />
              </div>
              <h3 class="text-3xl font-black text-white mb-4">{{ activeFeature?.title }}</h3>
              <p class="text-gray-400 leading-relaxed mb-8">{{ activeFeature?.desc }}</p>
              
              <div class="space-y-4">
                <div v-for="i in 3" :key="i" class="flex items-center gap-3 text-sm text-gray-500">
                  <div class="w-2 h-2 rounded-full bg-blue-500/40"></div>
                  Chế độ demo trực quan 100%
                </div>
              </div>
            </div>

            <!-- UI Preview Content -->
            <div class="flex-1 p-12 overflow-y-auto bg-black relative">
              <div class="absolute inset-0 bg-gradient-to-tr from-blue-600/5 to-transparent pointer-events-none"></div>
              
              <!-- Mock UI Header -->
              <div class="flex items-center justify-between mb-8">
                <div class="h-8 w-48 bg-white/5 rounded-lg animate-pulse"></div>
                <div class="flex gap-2">
                  <div class="h-8 w-8 bg-white/5 rounded-full animate-pulse"></div>
                  <div class="h-8 w-8 bg-white/5 rounded-full animate-pulse"></div>
                </div>
              </div>

              <!-- Mock UI Grid for "User Management" or similar -->
              <div class="space-y-6">
                <!-- Dashboard Stat Cards style -->
                <div class="grid grid-cols-3 gap-6">
                  <div v-for="i in 3" :key="i" class="h-32 bg-white/5 rounded-3xl border border-white/10 p-6">
                    <div class="h-4 w-12 bg-white/10 rounded-full mb-4"></div>
                    <div class="h-8 w-24 bg-white/20 rounded-lg"></div>
                  </div>
                </div>

                <!-- Main Data Table style -->
                <div class="bg-white/5 rounded-3xl border border-white/10 overflow-hidden">
                  <div class="p-6 border-b border-white/10 flex justify-between">
                    <div class="h-6 w-32 bg-white/10 rounded-full"></div>
                  </div>
                  <div class="p-6 space-y-4">
                    <div v-for="i in 5" :key="i" class="flex items-center justify-between p-4 bg-white/[0.02] rounded-2xl">
                      <div class="flex items-center gap-4">
                        <div class="w-10 h-10 rounded-full bg-white/10"></div>
                        <div class="space-y-2">
                          <div class="h-4 w-32 bg-white/10 rounded-full"></div>
                          <div class="h-3 w-48 bg-white/5 rounded-full"></div>
                        </div>
                      </div>
                      <div class="h-8 w-24 bg-blue-500/20 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Premium Blur Overlay with "Coming Soon" or similar logic -->
              <div class="absolute bottom-12 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-2xl shadow-blue-500/50">
                Giao diện thực tế trong bản bẻ khóa Admin
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, nextTick } from "vue";
import { useRouter } from "vue-router";
import { authApi } from "../../api/auth";
import { 
  Scale, LineChart, Stethoscope, BookOpen, Shield, Zap, Users, Globe, 
  MessageSquare, FolderSearch, ClipboardList, Calendar, Database, 
  BarChart3, Heart, Brain, GraduationCap, Laptop, Landmark, Receipt, 
  Activity, Pill, FileText
} from "lucide-vue-next";
import bogImage from "../../assets/images/bog.png";
import { gsap } from "gsap";

const router = useRouter();

// --- Pricing Refs ---
const pricingCard0 = ref<HTMLElement | null>(null);
const pricingCard1 = ref<HTMLElement | null>(null);
const pricingCard2 = ref<HTMLElement | null>(null);

// --- Domains Data ---
const domains = ref([
  {
    id: "law",
    name: "Pháp Lý",
    desc: "Hệ sinh thái quản trị văn phòng luật toàn diện: Từ nhân sự, lịch trình đến tự động hóa hồ sơ.",
    icon: Scale,
    color: "text-blue-400",
    themeColor: "blue",
    shadow: "shadow-blue-500/20",
    features: [
      { title: "Quản lý Nhân sự & Phòng ban", desc: "Tối ưu hóa sơ đồ tổ chức, quản trị nhân lực và phân quyền chuyên sâu cho các phòng ban.", icon: Users },
      { title: "Sắp xếp & Đặt lịch làm việc", desc: "Hệ thống xếp lịch thông minh, đặt lịch tư vấn và quản lý thời gian biểu của luật sư.", icon: Calendar },
      { title: "Trao đổi & Chat nội bộ", desc: "Kênh giao tiếp bảo mật, tức thời dành riêng cho đội ngũ luật sư và cộng sự trong vụ án.", icon: MessageSquare },
      { title: "Kho Lưu trữ & Mẫu đơn", desc: "Thư viện lưu trữ tài liệu tập trung với kho biểu mẫu pháp lý chuẩn hóa toàn diện.", icon: FolderSearch },
      { title: "Quản lý Hồ sơ Vụ án", desc: "Số hóa toàn bộ tiến trình tố tụng, theo dõi trạng thái và cảnh báo thời hạn tự động.", icon: ClipboardList },
      { title: "Tự động hóa Văn bản", desc: "Tạo các hợp đồng, đơn từ phức tạp trong vài giây với công cụ soạn thảo thông minh.", icon: Zap },
      { title: "Cổng Khách hàng Bảo mật", desc: "Nâng tầm dịch vụ với cổng thông tin dành riêng cho khách hàng VIP, bảo mật tuyệt đối.", icon: Shield },
      { title: "Tra cứu & Index Án lệ", desc: "Công cụ tìm kiếm mạnh mẽ trên toàn bộ cơ sở dữ liệu và kho án lệ quốc gia tích hợp.", icon: Globe }
    ]
  },
  {
    id: "finance",
    name: "Tài Chính",
    desc: "Nền tảng quản trị tài chính doanh nghiệp và đầu tư chuyên sâu, bảo mật tối ưu.",
    icon: LineChart,
    color: "text-emerald-400",
    themeColor: "emerald",
    shadow: "shadow-emerald-500/20",
    features: [
      { title: "Quản lý Dòng tiền", desc: "Theo dõi dòng tiền ra vào theo thời gian thực với hệ thống phân loại giao dịch tự động.", icon: Receipt },
      { title: "Phân tích Đầu tư", desc: "Công cụ phân tích hiệu suất danh mục đầu tư đa kênh với các chỉ số tài chính chuyên sâu.", icon: BarChart3 },
      { title: "Kiểm toán & Tuân thủ", desc: "Tự động hóa báo cáo kiểm toán và đảm bảo tuân thủ các quy định tài chính quốc tế.", icon: Shield },
      { title: "Quản trị Rủi ro", desc: "Hệ thống cảnh báo sớm và đánh giá rủi ro dựa trên dữ liệu thị trường trực tiếp.", icon: Activity },
      { title: "Kết nối Gateway", desc: "Tích hợp liền mạch với các cổng thanh toán và hệ thống ngân hàng hàng đầu thế giới.", icon: Landmark },
      { title: "Quản lý Đa Tài sản", desc: "Danh mục quản lý tập trung cho cổ phiếu, ngoại hối, tiền điện tử và bất động sản.", icon: Database },
      { title: "Cổng Nhà đầu tư VIP", desc: "Trải nghiệm đặc quyền dành cho các nhà đầu tư lớn với báo cáo và kênh chat riêng.", icon: Users },
      { title: "Báo cáo Tự động", desc: "Xuất báo cáo tài chính, thuế và P&L chuyên nghiệp chỉ với một cú click chuột.", icon: FileText }
    ]
  },
  {
    id: "medical",
    name: "Y Tế",
    desc: "Số hóa toàn diện vận hành phòng khám và bệnh viện hiện đại chuẩn quốc tế.",
    icon: Stethoscope,
    color: "text-cyan-400",
    themeColor: "cyan",
    shadow: "shadow-cyan-500/20",
    features: [
      { title: "Hồ sơ Bệnh án EMR", desc: "Hệ thống bệnh án điện tử tập trung, bảo mật và dễ dàng truy xuất lịch sử điều trị.", icon: Database },
      { title: "Đặt lịch & Phân ca", desc: "Tối ưu hóa lịch khám của bác sĩ và đặt lịch hẹn trực tuyến cho bệnh nhân.", icon: Calendar },
      { title: "Quản lý Kho Dược", desc: "Kiểm soát tồn kho dược phẩm, vật tư y tế và cảnh báo hạn sử dụng tự động.", icon: Pill },
      { title: "Khám bệnh Từ xa", desc: "Nền tảng Telemedicine tích hợp Video Call và đơn thuốc điện tử chuẩn xác.", icon: Laptop },
      { title: "Phân tích Y khoa", desc: "Ứng dụng AI trong phân tích dữ liệu lâm sàng và hỗ trợ đưa ra phác đồ điều trị.", icon: Brain },
      { title: "Theo dõi Sức khỏe", desc: "Kết nối dữ liệu từ các thiết bị đeo thông minh để giám sát sức khỏe bệnh nhân liên tục.", icon: Activity },
      { title: "Chăm sóc Khách hàng", desc: "Tự động nhắc lịch tái khám, gửi lời chúc và chiến dịch khảo sát hài lòng.", icon: Heart },
      { title: "Quản lý Bảo hiểm", desc: "Xử lý hồ sơ bảo hiểm y tế và thanh toán điện tử nhanh chóng, minh bạch.", icon: Shield }
    ]
  },
  {
    id: "education",
    name: "Giáo Dục",
    desc: "Hệ thống quản lý giáo dục thông minh, kết nối tri thức toàn cầu.",
    icon: BookOpen,
    color: "text-orange-400",
    themeColor: "orange",
    shadow: "shadow-orange-500/20",
    features: [
      { title: "Quản lý Đào tạo", desc: "Thiết kế lộ trình học tập, quản lý khóa học và phân bổ tài nguyên giảng dạy.", icon: GraduationCap },
      { title: "Hệ thống E-Learning", desc: "Nền tảng học trực tuyến tương tác cao với hỗ trợ video, bài kiểm tra và cấp chứng chỉ.", icon: Laptop },
      { title: "Quản lý Học viên", desc: "Theo dõi tiến độ học tập, điểm số và hồ sơ rèn luyện của sinh viên toàn diện.", icon: Users },
      { title: "Cổng Phụ huynh", desc: "Kênh kết nối thời gian thực giữa nhà trường và gia đình để giám sát việc học.", icon: MessageSquare },
      { title: "Kho Học liệu Số", desc: "Thư viện tài liệu số hóa khổng lồ, hỗ trợ truy cập đa thiết bị mọi lúc mọi nơi.", icon: FolderSearch },
      { title: "Tuyển sinh & Marketing", desc: "Công cụ quản lý phễu tuyển sinh và các chiến dịch quảng bá thương hiệu giáo dục.", icon: Zap },
      { title: "Phân tích Học thuật", desc: "Báo cáo đánh giá năng lực học viên và hiệu quả giảng dạy của giáo viên.", icon: BarChart3 },
      { title: "Quản trị Tài chính", desc: "Quản lý học phí, học bổng và các khoản chi phí vận hành cơ sở giáo dục.", icon: Landmark }
    ]
  },
]);

// --- Intro Animation Sequence State ---
const phase = ref<"intro" | "survey" | "domain">("intro");
const introStep = ref<number>(0); // 0: Title, 1: Domains Showcase, 2: CTA
const showcaseIndex = ref(0);
let introInterval: any = null;

const showcaseDomain = computed(() => domains.value[showcaseIndex.value]);
const currentDomainColor = computed(() => {
  if (introStep.value !== 1) return "text-blue-500";
  return showcaseDomain.value?.color || "text-blue-500";
});

const themeClasses = computed(() => {
  const color = selectedDomain.value?.themeColor || "blue";
  return {
    text: `text-${color}-400`,
    bg: `bg-${color}-500/10`,
    border: `border-${color}-500/50`,
    shadow: `shadow-${color}-500/20`,
    gradientFrom: `from-${color}-900/20`,
    btnBg: `from-${color}-600 to-indigo-600`
  };
});

const startIntroSequence = () => {
  // Step 1: Show BIG TITLE for 2.5s
  setTimeout(() => {
    introStep.value = 1;
    // Cycle domains every 2 seconds
    introInterval = setInterval(() => {
      showcaseIndex.value = (showcaseIndex.value + 1) % domains.value.length;
    }, 2500);

    // Stop cycling after 10s and go to final CTA
    setTimeout(() => {
      clearInterval(introInterval);
      introStep.value = 2;
    }, 10000);
  }, 2500);
};

onMounted(() => {
  startIntroSequence();
});

onUnmounted(() => {
  if (introInterval) clearInterval(introInterval);
});

// --- Survey State ---
const selectedDomain = ref<any>(null);

const scrollContainer = ref<HTMLElement | null>(null);

// --- Register State ---
const selectedPlan = ref<string | null>(null);
const showRegisterPrompt = ref(false);
const isRegisterModalOpen = ref(false);
const regStep = ref<"account" | "payment" | "success">("account");
const regEmail = ref("");
const regPassword = ref("");
const loading = ref(false);

// --- Feature Preview State ---
const isPreviewModalOpen = ref(false);
const activeFeature = ref<any>(null);

const openFeaturePreview = (feature: any) => {
  activeFeature.value = feature;
  isPreviewModalOpen.value = true;
};

const openRegisterModal = () => {
  selectedPlan.value = null;
  regStep.value = "account";
  isRegisterModalOpen.value = true;
};

const openRegisterModalWithPlan = (plan: string) => {
  selectedPlan.value = plan;
  regStep.value = "account";
  isRegisterModalOpen.value = true;
};

const goToPayment = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    regStep.value = "payment";
  }, 1000);
};

const completePayment = async () => {
  loading.value = true;
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 14);
  
  try {
    // Attempting to register on the Backend

    const response = await authApi.register({
      email: regEmail.value,
      password: regPassword.value,
      role: "manager", // Default role for module subscribers
      displayName: "Quản lý " + (selectedDomain.value?.name || "Lĩnh vực"),
      modules: [selectedDomain.value?.id || "overview"],
      subscriptionPlan: "trial",
      subscriptionExpiresAt: expiryDate
    });

    if (response.status === 200 || response.status === 201) {
      // Success: Save real token and user
      const token = response.data?.access_token || response.data?.token || "mock_trial_token";
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(response.data?.user || {
        id: 9999,
        role: "manager",
        email: regEmail.value,
        modules: [selectedDomain.value?.id],
        subscriptionPlan: "trial",
        subscriptionExpiresAt: expiryDate.toISOString()
      }));
    } else {
      throw new Error("API registration unsuccessful");
    }
  } catch (e) {
    console.warn("Backend link failed, using mock transition for demo:", e);
    // Fallback mock persistence for demo smoothness
    localStorage.setItem("token", "mock_trial_token");
    localStorage.setItem("user", JSON.stringify({ 
      id: 9999,
      role: "manager", 
      email: regEmail.value || "trial@example.com",
      username: "Quản lý Dùng Thử",
      modules: [selectedDomain.value?.id],
      subscriptionPlan: "trial",
      subscriptionExpiresAt: expiryDate.toISOString()
    }));
  } finally {
    loading.value = false;
    regStep.value = "success";
    localStorage.setItem("user_trial_status", "pending_upgrade");
  }
};

const enterSystem = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    isRegisterModalOpen.value = false;
    
    // Check where to go based on the modules they just registered
    const userJson = localStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;
    const modules = user?.modules || [];

    if (modules.includes("law")) {
      router.push({ name: "AdminLaw" });
    } else {
      router.push({ name: "AdminOverview" });
    }
  }, 800);
};

const getFeatureDelay = (idx: any) => {
  const num = typeof idx === 'number' ? idx : parseInt(idx) || 0;
  return `${0.3 + num * 0.1}s`;
};

const animatePricingCards = () => {
  const cards = [pricingCard0.value, pricingCard1.value, pricingCard2.value];
  gsap.fromTo(
    cards,
    {
      opacity: 0,
      y: 60,
      scale: 0.9,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      stagger: 0.2,
      ease: "power4.out",
      clearProps: "transform",
    },
  );
};

const startSurvey = () => {
  phase.value = "survey";
};

const selectDomain = (domain: any) => {
  selectedDomain.value = domain;

  // Transition smoothly to domain phase
  setTimeout(() => {
    phase.value = "domain";
    if (scrollContainer.value) scrollContainer.value.scrollTop = 0;

    // Wait for DOM to update then animate with GSAP
    nextTick(() => {
      animatePricingCards();
    });
  }, 500);
};

const handleScroll = () => {
  if (phase.value !== "domain") return;
  if (!scrollContainer.value) return;

  const { scrollTop, scrollHeight, clientHeight } = scrollContainer.value;
  // Trigger prompt slightly earlier for smoother UX
  if (scrollTop + clientHeight >= scrollHeight - 300) {
    showRegisterPrompt.value = true;
  }
};

const cancelRegister = () => {
  showRegisterPrompt.value = false;
  router.push("/");
};


</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.zoom-fade-enter-active,
.zoom-fade-leave-active {
  transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
}
.zoom-fade-enter-from {
  opacity: 0;
  transform: scale(0.9);
}
.zoom-fade-leave-to {
  opacity: 0;
  transform: scale(1.1);
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(40px);
}
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-40px);
}

.slide-up-slow-enter-active,
.slide-up-slow-leave-active {
  transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-up-slow-enter-from {
  opacity: 0;
  transform: translateY(100%);
}
.slide-up-slow-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

.chat-enter-active,
.chat-leave-active {
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.chat-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
}
.chat-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.animate-fade-up {
  animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse-slow {
  0%,
  100% {
    opacity: 0.1;
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(1.2);
  }
}
.animate-pulse-slow {
  animation: pulse-slow 6s ease-in-out infinite;
}

@keyframes pulse-text {
  0%,
  100% {
    background-position: 0% 50%;
    opacity: 1;
  }
  50% {
    background-position: 100% 50%;
    opacity: 0.8;
  }
}
.animate-pulse-text {
  animation: pulse-text 3s ease-in-out infinite;
  background-size: 200% auto;
}

@keyframes blob-morph1 {
  0%,
  100% {
    border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
  33% {
    border-radius: 70% 30% 46% 54% / 30% 29% 71% 70%;
    transform: translate(20px, -25px) rotate(120deg) scale(1.1);
  }
  66% {
    border-radius: 100% 60% 60% 100% / 100% 100% 60% 60%;
    transform: translate(-20px, 20px) rotate(240deg) scale(0.9);
  }
}
@keyframes blob-morph2 {
  0%,
  100% {
    border-radius: 70% 30% 46% 54% / 30% 29% 71% 70%;
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
  33% {
    border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
    transform: translate(-25px, 20px) rotate(-120deg) scale(1.05);
  }
  66% {
    border-radius: 60% 100% 100% 60% / 60% 60% 100% 100%;
    transform: translate(25px, -15px) rotate(-240deg) scale(0.95);
  }
}
@keyframes blob-morph3 {
  0%,
  100% {
    border-radius: 100% 60% 60% 100% / 100% 100% 60% 60%;
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
  33% {
    border-radius: 70% 30% 46% 54% / 30% 29% 71% 70%;
    transform: translate(15px, 15px) rotate(120deg) scale(1.1);
  }
  66% {
    border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
    transform: translate(-15px, -20px) rotate(240deg) scale(1);
  }
}

.animate-blob-morph1 {
  animation: blob-morph1 12s ease-in-out infinite;
}
.animate-blob-morph2 {
  animation: blob-morph2 15s ease-in-out infinite;
}
.animate-blob-morph3 {
  animation: blob-morph3 18s ease-in-out infinite;
}
</style>
