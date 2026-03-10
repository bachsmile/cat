<template>
  <div class="animate-in fade-in duration-300">
    <!-- Top Persistent bar -->
    <div
      class="flex items-center justify-between mb-12 py-4 border-b border-white/5"
    >
      <div>
        <h1
          class="text-3xl md:text-5xl font-black tracking-tighter text-white mb-2"
        >
          Quản lý Tài sản
        </h1>
        <p class="text-gray-500 font-medium text-lg">
          {{
            selectedAsset
              ? `Đang xem ví ${selectedAsset}`
              : "Xem và quản lý số dư Cryptocurrency & Fiat của bạn"
          }}
        </p>
      </div>

      <div class="flex items-center gap-4">
        <button
          @click="toggleBalanceVisibility"
          class="flex items-center gap-3 px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-[1.25rem] transition-all group/btn"
        >
          <component
            :is="isBalanceVisible ? EyeIcon : EyeOffIcon"
            class="w-5 h-5 text-gray-400 group-hover/btn:text-white"
          />
          <span
            class="text-xs font-bold text-gray-400 group-hover/btn:text-white uppercase tracking-widest hidden md:inline"
          >
            {{ isBalanceVisible ? "Ẩn số dư" : "Hiện số dư" }}
          </span>
        </button>

        <button
          v-if="selectedAsset"
          @click="selectedAsset = null"
          class="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-[1.25rem] transition-all text-gray-400 hover:text-white"
        >
          <ArrowLeftIcon class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- Asset List View -->
    <div v-if="!(selectedAsset && unlockedAssets.includes(selectedAsset))">
      <!-- Large Full-Width Portfolio Panel -->
      <div
        v-if="portfolioSummary"
        class="bg-gradient-to-br from-purple-500/10 via-white/5 to-transparent backdrop-blur-3xl border border-white/10 p-10 rounded-[2.5rem] mb-12 relative overflow-hidden group shadow-2xl"
      >
        <!-- Decoration icons/glows -->
        <div
          class="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px]"
        ></div>
        <div
          class="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]"
        ></div>

        <div
          class="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10 gap-8"
        >
          <div class="flex-1">
            <p
              class="text-xs text-purple-400 font-black uppercase tracking-[0.3em] mb-4 flex items-center gap-2"
            >
              <ActivityIcon class="w-4 h-4" />
              TỔNG TRỊ GIÁ TÀI SẢN (VND)
            </p>
            <div class="flex items-baseline gap-4">
              <h2
                class="text-5xl md:text-7xl font-black tracking-tighter text-white"
              >
                {{
                  isBalanceVisible && portfolioSummary
                    ? formatNumber(portfolioSummary.totalVndValue)
                    : "••••••••"
                }}
              </h2>
              <span class="text-2xl md:text-3xl text-gray-500 font-bold"
                >₫</span
              >
            </div>
            <div class="flex items-center gap-4 mt-8">
              <div
                class="flex items-center gap-2 px-3 py-1 bg-green-400/10 border border-green-400/20 rounded-full"
              >
                <div
                  class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"
                ></div>
                <span
                  class="text-[10px] text-green-400 font-black uppercase tracking-widest"
                  >+2.5% Today</span
                >
              </div>
              <p class="text-xs text-gray-500 font-medium italic">
                Công cụ tính toán tự động qua Binance P2P & Market API
              </p>
            </div>
          </div>

          <div class="flex flex-col items-end gap-2 ml-auto text-right">
            <p
              class="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-1"
            >
              Bản ghi thị trường lúc
            </p>
            <p class="text-lg text-white font-black tracking-tighter">
              {{
                new Date().toLocaleTimeString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }}
            </p>
            <div
              class="w-12 h-1 bg-purple-500/30 rounded-full ml-auto mt-2"
            ></div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AssetCard
          v-for="asset in assets"
          :key="asset.symbol"
          :asset="asset"
          :isActive="pendingAsset === asset.symbol"
          :isUnlocked="unlockedAssets.includes(asset.symbol)"
          :isVisible="isBalanceVisible"
          :hasPassword="configuredAssets.includes(asset.symbol)"
          :livePrice="asset.symbol === 'USDT' ? currentUsdtPrice : undefined"
          @click="handleAssetClick"
        />
      </div>

      <!-- Password Prompt Modal / Inline -->
      <AssetPasswordPrompt
        v-if="showPasswordPrompt"
        :pendingAsset="pendingAsset"
        :error="passwordError"
        :isSetup="!configuredAssets.includes(pendingAsset || '')"
        v-model="walletPassword"
        @submit="handlePasswordSubmit"
        @cancel="cancelUnlock"
      />

      <!-- Tiết kiệm Section -->
      <div v-if="savingsSummary" class="mt-20">
        <div class="flex justify-end mb-12">
          <div
            class="w-[40%] h-[1px] bg-gradient-to-r from-transparent via-emerald-500 to-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
          ></div>
        </div>

        <div
          class="bg-gradient-to-br from-emerald-500/10 via-white/5 to-transparent backdrop-blur-3xl border border-white/10 p-8 rounded-[2.5rem] relative overflow-hidden group shadow-2xl"
        >
          <div
            class="absolute -top-16 -right-16 w-48 h-48 bg-emerald-500/20 rounded-full blur-[60px]"
          ></div>
          <div class="relative z-10">
            <div class="flex items-center justify-between mb-8">
              <div class="flex items-center gap-3">
                <div
                  class="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400"
                >
                  <PiggyBankIcon class="w-6 h-6" />
                </div>
                <div>
                  <h3
                    class="text-xl font-black text-white tracking-tighter uppercase"
                  >
                    Thống kê tiền gửi
                  </h3>
                  <p
                    class="text-[10px] text-gray-500 font-bold uppercase tracking-widest"
                  >
                    Toàn bộ danh mục đầu tư tích lũy
                  </p>
                </div>
              </div>
              <button
                @click="showSavingsStatsModal = true"
                class="px-5 py-2.5 bg-white/5 hover:bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all border border-white/10 hover:border-emerald-500 shadow-lg hover:shadow-emerald-500/20"
              >
                Xem chi tiết
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div class="relative">
                <p
                  class="text-[10px] text-emerald-400 font-black uppercase tracking-[0.2em] mb-2"
                >
                  Tổng tiền đang gửi
                </p>
                <p class="text-3xl font-black text-white tracking-tight">
                  {{
                    isBalanceVisible
                      ? formatNumber(savingsSummary.totalVndValue)
                      : "••••••••"
                  }}
                  <span class="text-sm text-gray-500">₫</span>
                </p>
              </div>

              <div class="relative">
                <p
                  class="text-[10px] text-emerald-400 font-black uppercase tracking-[0.2em] mb-2"
                >
                  Lợi nhuận ước tính / ngày
                </p>
                <p class="text-3xl font-black text-emerald-400 tracking-tight">
                  +{{
                    isBalanceVisible
                      ? formatNumber(savingsSummary.totalProfitEstimateVnd)
                      : "••••••••"
                  }}
                  <span class="text-sm text-gray-500">₫</span>
                </p>
              </div>

              <div class="relative">
                <p
                  class="text-[10px] text-emerald-400 font-black uppercase tracking-[0.2em] mb-2"
                >
                  Lãi suất trung bình
                </p>
                <p class="text-3xl font-black text-white tracking-tight">
                  {{
                    savingsSummary.count > 0
                      ? (
                          savingsSummary.details.reduce(
                            (sum: number, s: any) => sum + Number(s.annualRate),
                            0,
                          ) / savingsSummary.count
                        ).toFixed(2)
                      : "0.00"
                  }}
                  <span class="text-sm text-gray-500">%/năm</span>
                </p>
              </div>

              <div class="relative">
                <p
                  class="text-[10px] text-emerald-400 font-black uppercase tracking-[0.2em] mb-2"
                >
                  Số sổ đang hoạt động
                </p>
                <p class="text-3xl font-black text-white tracking-tight">
                  {{ savingsSummary.count }}
                  <span class="text-sm text-gray-500">sổ</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Asset Details section when unlocked -->
    <div v-else class="animate-in fade-in zoom-in-95 duration-300">
      <div class="mb-8 flex items-center gap-4">
        <button
          @click="selectedAsset = null"
          class="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/5"
        >
          <ArrowLeftIcon class="w-5 h-5 text-gray-400" />
        </button>
        <div>
          <h3 class="text-2xl font-bold mb-1">
            Chi tiết ví {{ selectedAsset }}
          </h3>
          <p class="text-gray-500 font-medium">Bảo mật nâng cao đã bật</p>
        </div>
      </div>

      <!-- Highlight card for the selected asset -->
      <div
        @click="cardMode = cardMode === 'portfolio' ? 'realized' : 'portfolio'"
        class="bg-gradient-to-br from-[#0a0a0f] to-[#0d0d14] p-10 rounded-[2rem] border border-white/5 shadow-2xl relative overflow-hidden group mb-8 cursor-pointer select-none transition-all duration-500 hover:border-white/10"
      >
        <div
          class="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10 gap-8"
        >
          <!-- Portfolio View -->
          <div
            v-if="cardMode === 'portfolio'"
            class="animate-in fade-in slide-in-from-left-4 duration-500"
          >
            <p
              class="text-gray-400 font-bold uppercase tracking-widest text-xs mb-3"
            >
              Số Dư Khả Dụng
            </p>
            <p class="text-5xl md:text-6xl font-black tracking-tight mb-6">
              {{
                isBalanceVisible ? formatNumber(effectiveBalance) : "********"
              }}
              <span class="text-2xl text-gray-500 font-bold">{{
                selectedAsset
              }}</span>
            </p>
            <div class="flex flex-wrap items-center gap-6 md:gap-10">
              <div>
                <p
                  class="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1.5"
                >
                  Trạng Thái
                </p>
                <p
                  class="text-green-400 font-semibold flex items-center gap-2 text-sm"
                >
                  <ActivityIcon class="w-4 h-4" />
                  Hoạt động
                </p>
              </div>
              <div>
                <p
                  class="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1.5"
                >
                  Đơn giá trung bình
                </p>
                <p class="text-lg font-bold">
                  {{
                    isBalanceVisible
                      ? formatNumber(currentProfit?.avgPrice || 0)
                      : "********"
                  }}
                  <span class="text-xs text-gray-500">{{
                    selectedAsset === "USDT" ? "₫" : "$"
                  }}</span>
                </p>
              </div>
              <div>
                <p
                  class="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1.5"
                >
                  Tổng vốn đầu tư
                </p>
                <p class="text-lg font-bold text-white">
                  {{
                    isBalanceVisible
                      ? formatNumber(
                          includeSavingsInStats
                            ? selectedAssetData?.totalInvestedPortfolio ||
                                selectedAssetData?.totalInvested ||
                                0
                            : selectedAssetData?.totalInvested || 0,
                        )
                      : "********"
                  }}
                  <span class="text-xs text-gray-500">{{
                    selectedAsset === "USDT" ? "₫" : "$"
                  }}</span>
                </p>
              </div>
              <div v-if="selectedAsset === 'USDT' && currentUsdtPrice">
                <p
                  class="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1.5"
                >
                  Tổng Giá Trị (VND)
                </p>
                <p class="text-lg font-bold text-white">
                  ≈
                  {{
                    isBalanceVisible
                      ? formatNumber(effectiveBalance * currentUsdtPrice)
                      : "********"
                  }}
                  ₫
                </p>
              </div>
            </div>
          </div>

          <!-- Received Stats View -->
          <div
            v-else-if="cardMode === 'received'"
            class="animate-in fade-in slide-in-from-right-4 duration-500 w-full"
          >
            <p
              class="text-blue-500/80 font-bold uppercase tracking-widest text-xs mb-3"
            >
              Tổng Token Đã Nhận
            </p>
            <p
              class="text-5xl md:text-6xl font-black tracking-tight mb-6 text-blue-400"
            >
              {{ formatNumber(receivedStats.totalQuantity) }}
              <span class="text-2xl text-gray-500 font-bold">{{
                selectedAsset
              }}</span>
            </p>

            <div class="flex flex-wrap items-center gap-6 md:gap-10">
              <div>
                <p
                  class="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1.5"
                >
                  Giá Trị Hiện Tại (VND)
                </p>
                <p class="text-lg font-bold text-white">
                  ≈
                  {{
                    formatNumber(
                      receivedStats.totalQuantity *
                        (selectedAsset === "USDT" ? currentUsdtPrice || 0 : 0),
                    )
                  }}
                  ₫
                </p>
              </div>
              <div>
                <p
                  class="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1.5"
                >
                  Số Lệnh Nhận
                </p>
                <p class="text-lg font-bold text-blue-400">
                  {{ receivedStats.count }}
                  <span class="text-xs text-gray-500 italic">giao dịch</span>
                </p>
              </div>
            </div>
          </div>

          <!-- Realized Profit/Withdraw Statistics View -->
          <div
            v-else
            class="animate-in fade-in slide-in-from-right-4 duration-500"
          >
            <p
              class="text-orange-500/80 font-bold uppercase tracking-widest text-xs mb-3"
            >
              Tổng Lợi Nhuận Đã Chốt
            </p>
            <p
              class="text-5xl md:text-6xl font-black tracking-tight mb-6"
              :class="
                realizedStats.totalProfit >= 0
                  ? 'text-green-400'
                  : 'text-red-400'
              "
            >
              {{ realizedStats.totalProfit >= 0 ? "+" : ""
              }}{{ formatNumber(realizedStats.totalProfit) }}
              <span class="text-2xl text-gray-500 font-bold">{{
                selectedAsset === "USDT" ? "₫" : "$"
              }}</span>
            </p>

            <div class="flex flex-wrap items-center gap-6 md:gap-10">
              <div>
                <p
                  class="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1.5"
                >
                  Tổng Số Lượng Đã Bán
                </p>
                <p class="text-lg font-bold text-white">
                  {{ formatNumber(realizedStats.totalQuantity) }}
                  <span class="text-xs text-gray-500">{{ selectedAsset }}</span>
                </p>
              </div>
              <div>
                <p
                  class="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1.5"
                >
                  Giá Bán Trung Bình
                </p>
                <p class="text-lg font-bold text-white">
                  {{ formatNumber(realizedStats.avgPrice) }}
                  <span class="text-xs text-gray-500">{{
                    selectedAsset === "USDT" ? "₫" : "$"
                  }}</span>
                </p>
              </div>
              <div>
                <p
                  class="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1.5"
                >
                  Số Lệnh Đã Rút
                </p>
                <p class="text-lg font-bold text-orange-400">
                  {{ realizedStats.count }}
                  <span class="text-xs text-gray-500 italic">giao dịch</span>
                </p>
              </div>
              <div>
                <p
                  class="text-[10px] text-purple-500/80 font-bold uppercase tracking-widest mb-1.5"
                >
                  Tổng Tiền Nhận Được
                </p>
                <p class="text-lg font-bold text-white">
                  {{ formatNumber(realizedStats.totalReceived) }}
                  <span class="text-xs text-gray-500">{{
                    selectedAsset === "USDT" ? "₫" : "$"
                  }}</span>
                </p>
              </div>
            </div>
          </div>

          <div class="flex flex-col items-center gap-3 shrink-0">
            <div
              class="w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold bg-white/5 border border-white/5 shadow-inner"
              :class="selectedAssetData?.textClass"
            >
              {{ selectedAssetData?.icon }}
            </div>
            <!-- Live Price & Profit Badge -->
            <div
              v-if="
                cardMode === 'portfolio' &&
                selectedAsset === 'USDT' &&
                currentUsdtPrice
              "
              class="flex flex-col items-center animate-in fade-in slide-in-from-top-2 duration-500"
            >
              <div
                class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] font-black flex items-center gap-1.5 shadow-xl"
              >
                <span
                  class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"
                ></span>
                <span :class="selectedAssetData?.textClass">{{
                  formatNumber(currentUsdtPrice)
                }}</span>
                <span class="text-[9px] text-gray-500">₫</span>
              </div>

              <!-- Profit/Loss below price -->
              <div
                v-if="cardMode === 'portfolio' && currentProfit"
                class="mt-3 flex flex-col items-center"
              >
                <p
                  class="text-sm font-black"
                  :class="
                    currentProfit.isProfit ? 'text-green-400' : 'text-red-400'
                  "
                >
                  {{ currentProfit.isProfit ? "+" : ""
                  }}{{ formatNumber(currentProfit.amount) }} ₫
                </p>
                <div
                  class="mt-1 px-1.5 py-0.5 rounded text-[10px] font-black tracking-tight"
                  :class="
                    currentProfit.isProfit
                      ? 'bg-green-500/10 text-green-500'
                      : 'bg-red-500/10 text-red-500'
                  "
                >
                  {{ currentProfit.percent.toFixed(2) }}%
                </div>
                <span
                  class="text-[8px] text-gray-500/40 font-bold uppercase tracking-tighter mt-1"
                  >Lợi Nhuận Tạm Tính</span
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Action buttons -->
        <div
          class="flex flex-wrap gap-4 relative z-10 mt-12 pt-8 border-t border-white/5"
        >
          <button
            @click="showDepositModal = true"
            class="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-500/20 text-white rounded-xl font-bold transition-all focus:ring-2 focus:ring-purple-500/50 flex-1 md:flex-none text-center"
          >
            📥 Nạp {{ selectedAsset }}
          </button>
          <button
            @click="showWithdrawModal = true"
            class="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-bold transition-all focus:ring-2 focus:ring-white/20 flex-1 md:flex-none text-center"
          >
            📤 Rút {{ selectedAsset }}
          </button>
          <button
            @click="showReceiveModal = true"
            class="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-bold transition-all focus:ring-2 focus:ring-white/20 flex-1 md:flex-none text-center"
          >
            🎁 Nhận {{ selectedAsset }}
          </button>
          <button
            @click="showSavingsModal = true"
            class="px-8 py-4 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-xl font-bold transition-all focus:ring-2 focus:ring-emerald-500/20 flex-1 md:flex-none text-center"
          >
            🏦 Gửi Lãi
          </button>
          <button
            @click="fetchTransactions"
            class="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-bold transition-all focus:ring-2 focus:ring-white/20 ml-auto flex-1 md:flex-none text-center"
          >
            📋 Làm mới lịch sử
          </button>
        </div>

        <!-- Navigation Dots/Switch moved here -->
        <div
          class="flex items-center gap-4 z-20 bg-white/5 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/5 mx-auto mt-10 w-fit"
        >
          <div class="flex gap-2">
            <button
              @click.stop="cardMode = 'portfolio'"
              class="w-8 h-1.5 rounded-full transition-all duration-300"
              :class="
                cardMode === 'portfolio'
                  ? 'bg-purple-500 w-12'
                  : 'bg-white/10 hover:bg-white/20'
              "
            ></button>
            <button
              @click.stop="cardMode = 'realized'"
              class="w-8 h-1.5 rounded-full transition-all duration-300"
              :class="
                cardMode === 'realized'
                  ? 'bg-orange-500 w-12'
                  : 'bg-white/10 hover:bg-white/20'
              "
            ></button>
            <button
              @click.stop="cardMode = 'received'"
              class="w-8 h-1.5 rounded-full transition-all duration-300"
              :class="
                cardMode === 'received'
                  ? 'bg-blue-500 w-12'
                  : 'bg-white/10 hover:bg-white/20'
              "
            ></button>
          </div>

          <div class="w-[1px] h-4 bg-white/10 mx-1"></div>

          <div class="flex items-center gap-2 group/switch">
            <span
              class="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover/switch:text-gray-300 transition-colors"
              >Tính Token Nhận</span
            >
            <button
              @click.stop="includeReceivedInStats = !includeReceivedInStats"
              class="relative w-10 h-5 rounded-full transition-colors duration-300 focus:outline-none"
              :class="includeReceivedInStats ? 'bg-purple-500' : 'bg-white/10'"
            >
              <div
                class="absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform duration-300 shadow-md"
                :class="
                  includeReceivedInStats ? 'translate-x-5' : 'translate-x-0'
                "
              ></div>
            </button>
          </div>

          <div class="w-[1px] h-4 bg-white/10 mx-1"></div>

          <div class="flex items-center gap-2 group/switch">
            <span
              class="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover/switch:text-gray-300 transition-colors"
              >Tính Token Gửi</span
            >
            <button
              @click.stop="includeSavingsInStats = !includeSavingsInStats"
              class="relative w-10 h-5 rounded-full transition-colors duration-300 focus:outline-none"
              :class="includeSavingsInStats ? 'bg-emerald-500' : 'bg-white/10'"
            >
              <div
                class="absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform duration-300 shadow-md"
                :class="
                  includeSavingsInStats ? 'translate-x-5' : 'translate-x-0'
                "
              ></div>
            </button>
          </div>
        </div>

        <!-- Decorative blur -->
        <div
          class="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-[100px] pointer-events-none group-hover:scale-110 transition-transform duration-1000"
          :class="selectedAssetData?.bgClass"
        ></div>
      </div>

      <!-- Management Tabs -->
      <div class="mt-12">
        <div class="flex items-center gap-8 border-b border-white/5 mb-8">
          <button
            @click="activeSubTab = 'deposit'"
            class="pb-4 text-sm font-bold transition-all relative"
            :class="
              activeSubTab === 'deposit'
                ? 'text-purple-500'
                : 'text-gray-500 hover:text-gray-300'
            "
          >
            Quản lý nạp
            <div
              v-if="activeSubTab === 'deposit'"
              class="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500 animate-in fade-in zoom-in-50"
            ></div>
          </button>
          <button
            @click="activeSubTab = 'withdraw'"
            class="pb-4 text-sm font-bold transition-all relative"
            :class="
              activeSubTab === 'withdraw'
                ? 'text-orange-500'
                : 'text-gray-500 hover:text-gray-300'
            "
          >
            Quản lý rút
            <div
              v-if="activeSubTab === 'withdraw'"
              class="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 animate-in fade-in zoom-in-50"
            ></div>
          </button>
          <button
            @click="activeSubTab = 'receive'"
            class="pb-4 text-sm font-bold transition-all relative"
            :class="
              activeSubTab === 'receive'
                ? 'text-blue-400'
                : 'text-gray-500 hover:text-gray-300'
            "
          >
            Quản lý nhận
            <div
              v-if="activeSubTab === 'receive'"
              class="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400 animate-in fade-in zoom-in-50"
            ></div>
          </button>
          <button
            @click="activeSubTab = 'savings'"
            class="pb-4 text-sm font-bold transition-all relative"
            :class="
              activeSubTab === 'savings'
                ? 'text-emerald-400'
                : 'text-gray-500 hover:text-gray-300'
            "
          >
            Quản lý tiền gửi
            <div
              v-if="activeSubTab === 'savings'"
              class="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 animate-in fade-in zoom-in-50"
            ></div>
          </button>
        </div>

        <!-- Tab Content -->
        <div
          v-if="['deposit', 'withdraw', 'receive'].includes(activeSubTab)"
          class="animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          <div
            v-if="filteredTransactions.length > 0"
            class="overflow-hidden bg-white/5 border border-white/5 rounded-[2rem] shadow-xl"
          >
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-white/5 border-b border-white/5">
                  <th
                    class="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest"
                  >
                    Thời gian
                  </th>
                  <th
                    class="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right"
                  >
                    Số lượng
                  </th>
                  <th
                    class="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right"
                  >
                    {{
                      activeSubTab === "withdraw"
                        ? "Giá Rút / Vốn"
                        : activeSubTab === "receive"
                          ? "Ghi chú"
                          : "Đơn giá"
                    }}
                  </th>
                  <th
                    class="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right"
                  >
                    {{
                      activeSubTab === "withdraw"
                        ? "Lợi Nhuận"
                        : activeSubTab === "receive"
                          ? "Trị giá"
                          : "Tổng cộng"
                    }}
                  </th>
                  <th
                    class="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center"
                  >
                    Trạng thái
                  </th>
                  <th
                    class="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right"
                  >
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-white/5">
                <tr
                  v-for="tx in filteredTransactions"
                  :key="tx.id"
                  class="hover:bg-white/5 transition-colors group"
                >
                  <td class="px-8 py-5">
                    <div class="flex flex-col">
                      <span class="text-xs font-bold text-white">{{
                        tx.timestamp.toLocaleDateString("vi-VN")
                      }}</span>
                      <div class="flex items-center gap-1.5 mt-0.5">
                        <span class="text-[10px] text-gray-500 font-medium">{{
                          tx.timestamp.toLocaleTimeString("vi-VN")
                        }}</span>
                        <span
                          v-if="tx.source"
                          class="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-[9px] text-gray-400 font-black uppercase tracking-tighter"
                        >
                          {{ tx.source }}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td class="px-8 py-5 text-right">
                    <span
                      class="text-sm font-black"
                      :class="
                        tx.type === 'deposit'
                          ? 'text-purple-400'
                          : tx.type === 'receive'
                            ? 'text-blue-400'
                            : 'text-orange-400'
                      "
                    >
                      {{ tx.type === "withdraw" ? "-" : "+"
                      }}{{ formatNumber(tx.quantity) }}
                    </span>
                    <span class="ml-1.5 text-[10px] text-gray-500 font-bold">{{
                      tx.asset
                    }}</span>
                  </td>
                  <td class="px-8 py-5 text-right">
                    <div class="flex flex-col items-end">
                      <span
                        v-if="tx.type === 'receive'"
                        class="text-[10px] text-blue-400/80 font-bold uppercase tracking-widest animate-pulse"
                      >
                        🎁 Token Tặng
                      </span>
                      <span v-else class="text-xs text-gray-400 font-medium">{{
                        formatNumber(tx.price)
                      }}</span>
                      <span
                        v-if="tx.type === 'withdraw' && tx.avgBuyPriceAtTime"
                        class="text-[9px] text-gray-500 italic mt-0.5"
                      >
                        Vốn: {{ formatNumber(tx.avgBuyPriceAtTime) }}
                        {{ tx.asset === "USDT" ? "₫" : "$" }}
                      </span>
                    </div>
                  </td>
                  <td class="px-8 py-5 text-right">
                    <div
                      v-if="
                        tx.type === 'withdraw' && tx.profitAmount !== undefined
                      "
                      class="flex flex-col items-end"
                    >
                      <span
                        class="text-sm font-bold"
                        :class="
                          tx.profitAmount >= 0
                            ? 'text-green-400'
                            : 'text-red-400'
                        "
                      >
                        {{ tx.profitAmount >= 0 ? "+" : ""
                        }}{{ formatNumber(tx.profitAmount) }}
                      </span>
                      <span class="text-[9px] text-gray-500 italic">{{
                        tx.asset === "USDT" ? "₫" : "$"
                      }}</span>
                    </div>
                    <div v-else class="flex flex-col items-end">
                      <span class="text-sm font-bold text-white">{{
                        tx.type === "receive"
                          ? formatNumber(
                              tx.quantity *
                                (tx.asset === "USDT"
                                  ? currentUsdtPrice || 0
                                  : 0),
                            )
                          : formatNumber(tx.total)
                      }}</span>
                      <span class="text-[9px] text-gray-500 italic">{{
                        tx.asset === "USDT" ? "₫" : "$"
                      }}</span>
                    </div>
                  </td>
                  <td class="px-8 py-5 flex justify-center">
                    <span
                      class="px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider bg-green-500/10 text-green-500 border border-green-500/20"
                    >
                      {{
                        tx.status === "completed" ? "Thành công" : "Đang xử lý"
                      }}
                    </span>
                  </td>
                  <td class="px-8 py-5">
                    <div
                      class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <button
                        @click.stop="handleEdit(tx)"
                        class="p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg transition-all"
                        title="Chỉnh sửa"
                      >
                        <EditIcon class="w-4 h-4" />
                      </button>
                      <button
                        @click.stop="confirmDelete(tx.id)"
                        class="p-2 bg-white/5 hover:bg-red-500/10 text-gray-400 hover:text-red-400 rounded-lg transition-all"
                        title="Xoá"
                      >
                        <TrashIcon class="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-else class="space-y-6">
            <div
              class="bg-white/5 border border-white/5 rounded-[2rem] p-12 text-center"
            >
              <div
                class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                :class="
                  activeSubTab === 'deposit'
                    ? 'bg-purple-500/10'
                    : activeSubTab === 'withdraw'
                      ? 'bg-orange-500/10'
                      : 'bg-blue-400/10'
                "
              >
                <component
                  :is="
                    activeSubTab === 'deposit'
                      ? ActivityIcon
                      : activeSubTab === 'withdraw'
                        ? ArrowLeftIcon
                        : ActivityIcon
                  "
                  class="w-8 h-8"
                  :class="
                    activeSubTab === 'deposit'
                      ? 'text-purple-500'
                      : activeSubTab === 'withdraw'
                        ? 'text-orange-500 rotate-180'
                        : 'text-blue-400'
                  "
                />
              </div>
              <h4 class="text-xl font-bold mb-2">
                Chưa có giao dịch
                {{
                  activeSubTab === "deposit"
                    ? "nạp"
                    : activeSubTab === "withdraw"
                      ? "rút"
                      : "nhận"
                }}
              </h4>
              <p class="text-gray-500 max-w-sm mx-auto text-sm">
                Lịch sử
                {{
                  activeSubTab === "deposit"
                    ? "nạp"
                    : activeSubTab === "withdraw"
                      ? "rút"
                      : "nhận"
                }}
                {{ selectedAsset }} của bạn sẽ xuất hiện minh bạch tại đây.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Savings Tab Content -->
      <div
        v-if="activeSubTab === 'savings'"
        class="animate-in fade-in slide-in-from-bottom-4 duration-500"
      >
        <!-- Savings Summary Panel -->
        <div
          v-if="currentSavingsSummary"
          class="bg-gradient-to-br from-emerald-500/10 via-white/5 to-transparent backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] mb-8 relative overflow-hidden"
        >
          <div
            class="absolute -top-16 -right-16 w-48 h-48 bg-emerald-500/20 rounded-full blur-[60px]"
          ></div>
          <div class="relative z-10">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <p
                  class="text-[10px] text-emerald-400 font-black uppercase tracking-[0.2em] mb-2"
                >
                  {{
                    selectedAsset
                      ? `Tổng ${selectedAsset} đang gửi`
                      : "Tổng tiền đang gửi"
                  }}
                </p>
                <p class="text-2xl font-black text-white">
                  {{
                    isBalanceVisible
                      ? selectedAsset
                        ? formatNumber(
                            currentSavingsSummary.details.reduce(
                              (sum: number, s: any) => sum + Number(s.quantity),
                              0,
                            ),
                          )
                        : formatNumber(currentSavingsSummary.totalVndValue)
                      : "••••••"
                  }}
                  <span class="text-sm text-gray-500">{{
                    selectedAsset || "₫"
                  }}</span>
                </p>
              </div>
              <div>
                <p
                  class="text-[10px] text-emerald-400 font-black uppercase tracking-[0.2em] mb-2"
                >
                  Lợi nhuận ước tính / ngày
                </p>
                <p class="text-2xl font-black text-emerald-400">
                  +{{
                    isBalanceVisible
                      ? selectedAsset
                        ? formatNumber(
                            currentSavingsSummary.details.reduce(
                              (sum: number, s: any) =>
                                sum +
                                (Number(s.quantity) * Number(s.annualRate)) /
                                  100 /
                                  365,
                              0,
                            ),
                          )
                        : formatNumber(
                            currentSavingsSummary.totalProfitEstimateVnd,
                          )
                      : "••••••"
                  }}
                  <span class="text-sm text-gray-500">{{
                    selectedAsset || "₫"
                  }}</span>
                </p>
              </div>
              <div>
                <p
                  class="text-[10px] text-emerald-400 font-black uppercase tracking-[0.2em] mb-2"
                >
                  Lãi suất trung bình
                </p>
                <p class="text-2xl font-black text-white">
                  {{
                    currentSavingsSummary.count > 0
                      ? (
                          currentSavingsSummary.details.reduce(
                            (sum: number, s: any) => sum + Number(s.annualRate),
                            0,
                          ) / currentSavingsSummary.count
                        ).toFixed(2)
                      : "0.00"
                  }}
                  <span class="text-sm text-gray-500">%/năm</span>
                </p>
              </div>
              <div>
                <p
                  class="text-[10px] text-emerald-400 font-black uppercase tracking-[0.2em] mb-2"
                >
                  Sổ gửi đang hoạt động
                </p>
                <p class="text-2xl font-black text-white">
                  {{ currentSavingsSummary.count }}
                  <span class="text-sm text-gray-500">sổ</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Savings Cards -->
        <div
          v-if="savingsList.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          <div
            v-for="saving in filteredSavingsList"
            :key="saving.id"
            class="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[1.5rem] relative overflow-hidden hover:border-emerald-500/30 transition-all group"
          >
            <div
              class="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-[40px] group-hover:bg-emerald-500/20 transition-all"
            ></div>
            <div class="relative z-10">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold text-lg"
                  >
                    {{
                      saving.assetSymbol === "USDT"
                        ? "₮"
                        : saving.assetSymbol === "BTC"
                          ? "₿"
                          : saving.assetSymbol === "ETH"
                            ? "Ξ"
                            : "₫"
                    }}
                  </div>
                  <div>
                    <p class="text-sm font-black text-white">
                      {{ saving.assetSymbol }}
                    </p>
                    <p class="text-[10px] text-gray-500 font-bold uppercase">
                      {{ saving.platform }}
                    </p>
                  </div>
                </div>
                <div class="px-2 py-1 bg-emerald-500/10 rounded-lg">
                  <span class="text-[10px] text-emerald-400 font-black"
                    >{{ Number(saving.annualRate).toFixed(2) }}%/năm</span
                  >
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p class="text-[10px] text-gray-500 font-bold uppercase mb-1">
                    Số lượng gửi
                  </p>
                  <p class="text-lg font-black text-white">
                    {{
                      isBalanceVisible
                        ? formatNumber(Number(saving.quantity))
                        : "••••"
                    }}
                  </p>
                </div>
                <div>
                  <p class="text-[10px] text-gray-500 font-bold uppercase mb-1">
                    {{
                      saving.savingsType === "flexible" &&
                      saving.lastDailyInterest > 0
                        ? "Lãi hôm qua"
                        : "Lãi ước tính/ngày"
                    }}
                  </p>
                  <p class="text-lg font-black text-emerald-400">
                    +{{
                      isBalanceVisible
                        ? formatNumber(
                            saving.savingsType === "flexible" &&
                              saving.lastDailyInterest > 0
                              ? Number(saving.lastDailyInterest)
                              : (Number(saving.quantity) *
                                  Number(saving.annualRate)) /
                                  100 /
                                  365,
                          )
                        : "••••"
                    }}
                  </p>
                </div>
              </div>

              <div
                class="flex items-center justify-between mt-4 pt-4 border-t border-white/5"
              >
                <div>
                  <p class="text-[10px] text-gray-500">
                    Bắt đầu:
                    {{ new Date(saving.startDate).toLocaleDateString("vi-VN") }}
                  </p>
                  <p
                    v-if="saving.savingsType === 'fixed' && saving.endDate"
                    class="text-[10px] text-purple-400 mt-1"
                  >
                    Đáo hạn:
                    {{ new Date(saving.endDate).toLocaleDateString("vi-VN") }}
                  </p>
                </div>

                <div
                  v-if="
                    saving.status === 'active' &&
                    saving.savingsType === 'flexible'
                  "
                  class="flex items-center gap-3"
                >
                  <div
                    class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
                  ></div>
                  <button
                    @click="handleWithdrawSavings(saving.id)"
                    class="px-3 py-1 bg-white/10 hover:bg-white/20 text-[10px] font-bold text-white rounded-lg transition-all border border-white/10"
                  >
                    Rút Ngay
                  </button>
                </div>
                <div
                  v-else-if="
                    saving.status === 'active' && saving.savingsType === 'fixed'
                  "
                  class="flex items-center gap-3"
                >
                  <div
                    class="w-2 h-2 rounded-full bg-purple-500 animate-pulse"
                  ></div>
                  <span class="text-[10px] text-purple-400 font-bold uppercase"
                    >Cố định</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-20">
          <div
            class="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6"
          >
            <span class="text-4xl">🏦</span>
          </div>
          <h4 class="text-white font-bold text-lg mb-2">
            Chưa có sổ tiền gửi nào
          </h4>
          <p class="text-gray-500 max-w-sm mx-auto text-sm">
            Bấm nút "Gửi Lãi" ở trên để bắt đầu kiếm lãi từ tài sản của bạn.
          </p>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <AssetDepositModal
      v-if="showDepositModal"
      :selectedAsset="selectedAsset"
      v-model:formData="depositForm"
      :totalAmount="depositTotal"
      @close="showDepositModal = false"
      @submit="submitDeposit"
    />

    <AssetWithdrawModal
      v-if="showWithdrawModal"
      :selectedAsset="selectedAsset"
      v-model:formData="withdrawForm"
      :totalAmount="withdrawTotal"
      :availableBalance="selectedAssetData?.balance || 0"
      @close="showWithdrawModal = false"
      @submit="submitWithdraw"
    />

    <AssetReceiveModal
      v-if="showReceiveModal"
      :selectedAsset="selectedAsset"
      v-model:formData="receiveForm"
      @close="showReceiveModal = false"
      @submit="submitReceive"
    />

    <AssetSavingsModal
      v-if="showSavingsModal"
      :selectedAsset="selectedAsset"
      :availableBalance="selectedAssetData?.balance || 0"
      @close="showSavingsModal = false"
      @submit="submitSavings"
    />

    <SavingsStatsModal
      v-if="showSavingsStatsModal"
      :savingsList="savingsList"
      @close="showSavingsStatsModal = false"
      @withdraw="handleWithdrawSavings"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import {
  Activity as ActivityIcon,
  ArrowLeft as ArrowLeftIcon,
  Edit2 as EditIcon,
  Trash2 as TrashIcon,
  Eye as EyeIcon,
  EyeOff as EyeOffIcon,
  PiggyBank as PiggyBankIcon,
} from "lucide-vue-next";
import AssetCard from "../components/AssetCard.vue";
import AssetPasswordPrompt from "../components/AssetPasswordPrompt.vue";
import AssetDepositModal from "../components/AssetDepositModal.vue";
import AssetWithdrawModal from "../components/AssetWithdrawModal.vue";
import AssetReceiveModal from "../components/AssetReceiveModal.vue";
import AssetSavingsModal from "../components/AssetSavingsModal.vue";
import SavingsStatsModal from "../components/SavingsStatsModal.vue";
import { getUsdtVndP2pPrice } from "../api/market";
import {
  unlockWallet,
  getWalletStatus,
  setWalletPassword,
  getWalletTransactions,
  createWalletTransaction,
  deleteWalletTransaction,
  getSavings,
  createSavings,
  getSavingsSummary,
  withdrawSavings,
  getPortfolioSummary,
} from "../api/wallet";

const selectedAsset = ref<string | null>(null);

// Summary & Visibility
const isBalanceVisible = ref(
  localStorage.getItem("is_balance_visible") !== "false",
);
const toggleBalanceVisibility = () => {
  isBalanceVisible.value = !isBalanceVisible.value;
  localStorage.setItem("is_balance_visible", isBalanceVisible.value.toString());
};

const portfolioSummary = ref<{ totalVndValue: number; assets: any[] } | null>(
  null,
);

const fetchPortfolioSummary = async () => {
  try {
    const summary = await getPortfolioSummary();
    portfolioSummary.value = summary;

    // Sync balances to the main assets list
    if (summary && summary.assets) {
      summary.assets.forEach((stat: any) => {
        const asset = assets.value.find((a) => a.symbol === stat.symbol);
        if (asset) {
          asset.balance = stat.balance;
          // Note: totalInvested logic might need a more detailed per-asset call
          // but for now, we'll keep it simple or fetch per-asset stats
        }
      });
    }
  } catch (e) {
    console.error("Failed to fetch portfolio summary:", e);
  }
};

// Sync selectedAsset to localStorage for the API interceptor
watch(selectedAsset, async (newVal) => {
  if (newVal) {
    localStorage.setItem("active_wallet_asset", newVal);
    await fetchTransactions();
  } else {
    localStorage.removeItem("active_wallet_asset");
  }
});

// Transaction History
interface Transaction {
  id: string;
  type: "deposit" | "withdraw" | "receive";
  asset: string;
  quantity: number;
  price: number;
  total: number;
  timestamp: Date;
  status: "completed" | "pending";
  // For withdrawals
  avgBuyPriceAtTime?: number;
  profitAmount?: number;
  source?: string;
}
const transactions = ref<Transaction[]>([]);

const fetchTransactions = async () => {
  if (!selectedAsset.value) return;
  await fetchStats();
  try {
    const data = await getWalletTransactions(selectedAsset.value);
    transactions.value = data.map((t: any) => ({
      id: t.id,
      type: t.type,
      asset: t.assetSymbol,
      quantity: Number(t.quantity),
      price: Number(t.price),
      total: Number(t.total),
      avgBuyPriceAtTime: t.avgBuyPriceAtTime
        ? Number(t.avgBuyPriceAtTime)
        : undefined,
      profitAmount:
        t.profitAmount !== null ? Number(t.profitAmount) : undefined,
      timestamp: new Date(t.timestamp),
      status: t.status,
      source: t.source,
    }));
  } catch (e) {
    console.error("Failed to fetch transactions:", e);
  }
};

const fetchStats = async () => {
  if (!selectedAsset.value) return;
  try {
    const status = await getWalletStatus(selectedAsset.value);
    const asset = assets.value.find((a) => a.symbol === selectedAsset.value);
    if (asset && status.stats) {
      asset.balance = status.stats.balance;
      asset.receivedBalance = status.stats.receivedBalance;
      asset.totalInvested = status.stats.totalInvested;
      asset.totalInvestedPortfolio =
        status.stats.totalInvestedPortfolio || status.stats.totalInvested;
      asset.savingsBalance = status.stats.savingsBalance;

      // Sync unlock state if it changed
      if (
        status.isUnlocked &&
        !unlockedAssets.value.includes(selectedAsset.value)
      ) {
        unlockedAssets.value.push(selectedAsset.value);
      }
    }
  } catch (e) {
    console.error("Failed to fetch wallet stats via status API:", e);
  }
};

const currentUsdtPrice = ref<number | undefined>(undefined);
const activeSubTab = ref("deposit");
const cardMode = ref<"portfolio" | "realized" | "received">("portfolio");

// Receive & Modals Logic
const showDepositModal = ref(false);
const showWithdrawModal = ref(false);
const showReceiveModal = ref(false);
const showSavingsModal = ref(false);
const showSavingsStatsModal = ref(false);

// Savings state
const savingsList = ref<any[]>([]);
const savingsSummary = ref<any>(null);

const fetchSavingsData = async () => {
  try {
    const [list, summary] = await Promise.all([
      getSavings(),
      getSavingsSummary(),
    ]);
    savingsList.value = list.filter((s: any) => s.status === "active");
    savingsSummary.value = summary;
  } catch (e) {
    console.error("Failed to fetch savings data:", e);
  }
};

const submitSavings = async (data: any) => {
  try {
    await createSavings(data);
    showSavingsModal.value = false;
    await fetchSavingsData();
    await fetchStats();
    await fetchPortfolioSummary();
  } catch (e: any) {
    alert(e?.response?.data?.message || "Lỗi khi gửi lãi");
  }
};

const handleWithdrawSavings = async (id: string) => {
  if (!confirm("Bạn có chắc chắn muốn rút số tiền này về ví không?")) return;
  try {
    const res = await withdrawSavings(id);
    alert(
      `Đã rút thành công ${res.totalAmount} về ví (Bao gồm ${res.accruedInterest} tiền lãi)`,
    );
    await fetchSavingsData();
    await fetchStats();
    await fetchPortfolioSummary();
  } catch (e: any) {
    alert(e?.response?.data?.message || "Lỗi khi rút tiền gửi");
  }
};

const depositForm = ref({
  quantity: null as number | null,
  price: null as number | null,
  source: null as string | null,
});

const withdrawForm = ref({
  quantity: null as number | null,
  price: null as number | null,
  source: null as string | null,
});

const receiveForm = ref({
  quantity: null as number | null,
});

// Received Statistics
const receivedStats = computed(() => {
  const receiveTransactions = transactions.value.filter(
    (t) => t.asset === selectedAsset.value && t.type === "receive",
  );

  const totalQuantity = receiveTransactions.reduce(
    (sum, t) => sum + t.quantity,
    0,
  );

  return {
    totalQuantity,
    count: receiveTransactions.length,
  };
});

// Realized Statistics from withdrawals
const realizedStats = computed(() => {
  const sellTransactions = transactions.value.filter(
    (t) => t.asset === selectedAsset.value && t.type === "withdraw",
  );

  const totalQuantity = sellTransactions.reduce(
    (sum, t) => sum + t.quantity,
    0,
  );
  const totalReceived = sellTransactions.reduce((sum, t) => sum + t.total, 0);
  const totalProfit = sellTransactions.reduce(
    (sum, t) => sum + (t.profitAmount || 0),
    0,
  );

  return {
    totalQuantity,
    avgPrice: totalQuantity > 0 ? totalReceived / totalQuantity : 0,
    totalProfit,
    totalReceived,
    count: sellTransactions.length,
  };
});

// Transaction History
const filteredTransactions = computed(() => {
  if (!selectedAsset.value) return transactions.value;
  return transactions.value
    .filter(
      (t) => t.asset === selectedAsset.value && t.type === activeSubTab.value,
    )
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
});

const filteredSavingsList = computed(() => {
  if (!selectedAsset.value) return savingsList.value;
  return savingsList.value.filter((s) => s.assetSymbol === selectedAsset.value);
});

const currentSavingsSummary = computed(() => {
  if (!selectedAsset.value || !savingsSummary.value)
    return savingsSummary.value;

  const filteredDetails = savingsSummary.value.details.filter(
    (s: any) => s.assetSymbol === selectedAsset.value,
  );

  const totalVndValue = filteredDetails.reduce(
    (sum: number, s: any) => sum + s.vndValue,
    0,
  );
  const totalProfitEstimateVnd = filteredDetails.reduce(
    (sum: number, s: any) => sum + s.dailyProfitVnd,
    0,
  );

  return {
    ...savingsSummary.value,
    totalVndValue,
    totalProfitEstimateVnd,
    count: filteredDetails.length,
    details: filteredDetails,
  };
});

// Security Logic
const unlockedAssets = ref<string[]>([]);
const configuredAssets = ref<string[]>([]);
const showPasswordPrompt = ref(false);
const pendingAsset = ref<string | null>(null);
const walletPassword = ref("");
const passwordError = ref("");

let priceInterval: any = null;

const refreshPrice = async () => {
  try {
    const price = await getUsdtVndP2pPrice();
    currentUsdtPrice.value = price;
    console.log("P2P Price Updated:", price);
  } catch (e) {
    console.warn("Failed to refresh USDT price:", e);
  }
};

const handleTokenExpired = (event: any) => {
  const asset = event.detail.asset;
  if (selectedAsset.value === asset) {
    selectedAsset.value = null;
    const index = unlockedAssets.value.indexOf(asset);
    if (index > -1) unlockedAssets.value.splice(index, 1);
    alert(`Phiên làm việc của ví ${asset} đã hết hạn. Vui lòng mở khóa lại.`);
  }
};

onMounted(() => {
  window.addEventListener("wallet-token-expired", handleTokenExpired);
  refreshPrice();
  fetchPortfolioSummary();
  fetchSavingsData();
  // Auto-refresh every 5 minutes
  priceInterval = setInterval(() => {
    refreshPrice();
    fetchPortfolioSummary();
  }, 300000);

  // Check initial status for assets
  assets.value.forEach(async (asset) => {
    try {
      const status = await getWalletStatus(asset.symbol);

      const localToken = localStorage.getItem(`wallet_token_${asset.symbol}`);

      // Sync stats from status response
      if (status.stats) {
        asset.balance = status.stats.balance;
        asset.receivedBalance = status.stats.receivedBalance;
        asset.totalInvested = status.stats.totalInvested;
        asset.totalInvestedPortfolio =
          status.stats.totalInvestedPortfolio || status.stats.totalInvested;
        asset.savingsBalance = status.stats.savingsBalance;
        asset.totalBalance = status.stats.totalBalance; // Add this line
      }

      // CHỈ TỰ ĐỘNG MỞ KHOÁ NẾU CÓ CẢ TRẠNG THÁI DB VÀ TOKEN CỤC BỘ
      if (status.isUnlocked && localToken) {
        unlockedAssets.value.push(asset.symbol);
      }

      if (status.hasPassword) {
        configuredAssets.value.push(asset.symbol);
      }
    } catch (e) {
      console.warn(`Failed to check status for ${asset.symbol}`);
    }
  });
});

onUnmounted(() => {
  window.removeEventListener("wallet-token-expired", handleTokenExpired);
  if (priceInterval) clearInterval(priceInterval);
});

// Profit Calculation Logic
const includeReceivedInStats = ref(true);
const includeSavingsInStats = ref(true);

const effectiveBalance = computed(() => {
  if (!selectedAssetData.value) return 0;
  const balance = selectedAssetData.value.balance || 0;
  const savingsBalance = selectedAssetData.value.savingsBalance || 0;
  const receivedBalance = selectedAssetData.value.receivedBalance || 0;

  const totalOwnership = balance + savingsBalance;

  if (includeReceivedInStats.value) {
    return totalOwnership;
  } else {
    // Return only the "Purchased/Principal" portion
    return Math.max(0, totalOwnership - receivedBalance);
  }
});

const currentProfit = computed(() => {
  if (
    !selectedAsset.value ||
    !selectedAssetData.value ||
    !portfolioSummary.value
  )
    return null;

  const summary = portfolioSummary.value.assets.find(
    (a) => a.symbol === selectedAsset.value,
  );
  if (!summary) return null;

  const currentPrice = summary.price;
  const totalInvested = includeSavingsInStats.value
    ? selectedAssetData.value.totalInvestedPortfolio
    : selectedAssetData.value.totalInvested;
  const statsBalance = effectiveBalance.value;

  if (
    statsBalance <= 0 ||
    (totalInvested <= 0 &&
      !includeReceivedInStats.value &&
      !includeSavingsInStats.value)
  )
    return { amount: 0, percent: 0, isProfit: true, avgPrice: 0 };

  const avgPrice = totalInvested / statsBalance;
  const currentTotalValue = statsBalance * currentPrice;
  const profitAmount = currentTotalValue - totalInvested;
  const profitPercent = (profitAmount / (totalInvested || 1)) * 100;

  return {
    amount: profitAmount,
    percent: profitPercent,
    isProfit: profitAmount >= 0,
    avgPrice: avgPrice,
  };
});

const handleAssetClick = (symbol: string) => {
  const hasLocalToken = !!localStorage.getItem(`wallet_token_${symbol}`);

  if (unlockedAssets.value.includes(symbol) && hasLocalToken) {
    // Chỉ cho vào nếu thực sự đã mở khoá và có token
    selectedAsset.value = symbol;
    showPasswordPrompt.value = false;
  } else {
    // Cần nhập mật mã
    selectedAsset.value = null;
    pendingAsset.value = symbol;
    walletPassword.value = "";
    passwordError.value = "";
    showPasswordPrompt.value = true;

    // Nếu thiếu token cục bộ nhưng DB báo đã mở, ta vẫn bắt nhập lại để lấy token mới
    const index = unlockedAssets.value.indexOf(symbol);
    if (index > -1) unlockedAssets.value.splice(index, 1);
  }
};

const cancelUnlock = () => {
  showPasswordPrompt.value = false;
  pendingAsset.value = null;
};

const handlePasswordSubmit = async () => {
  if (walletPassword.value.length === 6 && /^\d+$/.test(walletPassword.value)) {
    try {
      if (pendingAsset.value) {
        const isSetup = !configuredAssets.value.includes(pendingAsset.value);

        if (isSetup) {
          // LƯU MẬT MÃ VÀ TỰ ĐỘNG VÀO VÍ
          const result = await setWalletPassword(
            pendingAsset.value,
            walletPassword.value,
          );
          configuredAssets.value.push(pendingAsset.value);
          unlockedAssets.value.push(pendingAsset.value);
          selectedAsset.value = pendingAsset.value;

          if (result.walletToken) {
            localStorage.setItem(
              `wallet_token_${pendingAsset.value}`,
              result.walletToken,
            );
          }
        } else {
          // MỞ KHOÁ BÌNH THƯỜNG
          const result = await unlockWallet(
            pendingAsset.value,
            walletPassword.value,
          );
          unlockedAssets.value.push(pendingAsset.value);
          selectedAsset.value = pendingAsset.value;
          if (result.walletToken) {
            localStorage.setItem(
              `wallet_token_${pendingAsset.value}`,
              result.walletToken,
            );
          }
        }
      }
      showPasswordPrompt.value = false;
      pendingAsset.value = null;
      walletPassword.value = "";
    } catch (error: any) {
      passwordError.value =
        error.response?.data?.message || "Thao tác thất bại. Vui lòng thử lại.";
    }
  } else {
    passwordError.value = "Mật mã không hợp lệ. Vui lòng nhập 6 chữ số.";
  }
};

// Asset formatting
const formatNumber = (num: any) => {
  const val = typeof num === "string" ? parseFloat(num) : num;
  if (val === undefined || val === null || isNaN(val)) return "0.00";

  // High precision for small crypto amounts
  const fractionDigits = val > 0 && val < 0.1 ? 6 : 2;

  return val.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: fractionDigits,
  });
};

const assets = ref([
  {
    name: "Tether",
    symbol: "USDT",
    icon: "₮",
    balance: 0,
    receivedBalance: 0,
    totalInvested: 0,
    totalInvestedPortfolio: 0,
    savingsBalance: 0,
    totalBalance: 0,
    bgClass: "bg-green-500/10",
    textClass: "text-green-500",
    gradClass: "from-green-500/20 to-green-500",
  },
  {
    name: "Bitcoin",
    symbol: "BTC",
    icon: "₿",
    balance: 0,
    receivedBalance: 0,
    totalInvested: 0,
    totalInvestedPortfolio: 0,
    savingsBalance: 0,
    totalBalance: 0,
    bgClass: "bg-orange-500/10",
    textClass: "text-orange-500",
    gradClass: "from-orange-500/20 to-orange-500",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    icon: "Ξ",
    balance: 0,
    receivedBalance: 0,
    totalInvested: 0,
    totalInvestedPortfolio: 0,
    savingsBalance: 0,
    totalBalance: 0,
    bgClass: "bg-blue-500/10",
    textClass: "text-blue-500",
    gradClass: "from-blue-500/20 to-blue-500",
  },
  {
    name: "Vietnamese Dong",
    symbol: "VND",
    icon: "₫",
    balance: 0,
    receivedBalance: 0,
    totalInvested: 0,
    totalInvestedPortfolio: 0,
    savingsBalance: 0,
    totalBalance: 0,
    bgClass: "bg-red-500/10",
    textClass: "text-red-500",
    gradClass: "from-red-500/20 to-red-500",
  },
]);

const selectedAssetData = computed(() =>
  assets.value.find((a) => a.symbol === selectedAsset.value),
);

// Deposit logic handled above

const depositTotal = computed(() => {
  if (selectedAsset.value === "VND") return depositForm.value.quantity || 0;
  return (depositForm.value.quantity || 0) * (depositForm.value.price || 0);
});

const submitDeposit = async () => {
  const assetIndex = assets.value.findIndex(
    (a) => a.symbol === selectedAsset.value,
  );
  if (
    assetIndex !== -1 &&
    depositForm.value.quantity !== null &&
    (selectedAsset.value === "VND" || depositForm.value.price !== null)
  ) {
    const assetObj = assets.value[assetIndex];
    if (assetObj) {
      const totalCost = Number(depositTotal.value);

      try {
        await createWalletTransaction({
          assetSymbol: selectedAsset.value!,
          type: "deposit",
          quantity: Number(depositForm.value.quantity),
          price:
            selectedAsset.value === "VND" ? 1 : Number(depositForm.value.price),
          total: totalCost,
          source: depositForm.value.source || undefined,
        });

        // Update local UI
        assetObj.balance += Number(depositForm.value.quantity);
        assetObj.totalInvested += totalCost;
        await fetchTransactions();
        await fetchPortfolioSummary();
      } catch (e) {
        alert("Lỗi khi lưu giao dịch nạp");
      }
    }
  }

  // Reset and close
  depositForm.value = { quantity: null, price: null, source: null };
  showDepositModal.value = false;
};

const submitReceive = async () => {
  const assetIndex = assets.value.findIndex(
    (a) => a.symbol === selectedAsset.value,
  );
  if (assetIndex !== -1 && receiveForm.value.quantity !== null) {
    const assetObj = assets.value[assetIndex];
    if (assetObj) {
      try {
        await createWalletTransaction({
          assetSymbol: selectedAsset.value!,
          type: "receive",
          quantity: Number(receiveForm.value.quantity),
          price: 0,
          total: 0,
        });

        // Update local UI
        assetObj.balance += Number(receiveForm.value.quantity);
        assetObj.receivedBalance =
          (assetObj.receivedBalance || 0) + Number(receiveForm.value.quantity);
        await fetchTransactions();
        await fetchPortfolioSummary();
      } catch (e) {
        alert("Lỗi khi lưu giao dịch nhận");
      }
    }
  }

  // Reset and close
  receiveForm.value = { quantity: null };
  showReceiveModal.value = false;
};

const deleteTransaction = async (id: string) => {
  if (
    !selectedAsset.value ||
    !confirm("Bạn có chắc chắn muốn xoá giao dịch này?")
  )
    return;
  try {
    await deleteWalletTransaction(selectedAsset.value, id);
    await fetchTransactions();
    await fetchPortfolioSummary();
    // Chú ý: Cần tính toán lại balance của asset sau khi xoá
    // Trong thực tế, nên reload dữ liệu asset hoàn chỉnh từ server
  } catch (e) {
    alert("Không thể xoá giao dịch");
  }
};

const handleEdit = (tx: Transaction) => {
  console.log("Edit tx:", tx);
  alert("Chức năng chỉnh sửa đang được phát triển");
};

const confirmDelete = deleteTransaction;

// Withdraw logic handled above

const withdrawTotal = computed(() => {
  return (withdrawForm.value.quantity || 0) * (withdrawForm.value.price || 0);
});

const submitWithdraw = async () => {
  const assetIndex = assets.value.findIndex(
    (a) => a.symbol === selectedAsset.value,
  );
  if (
    assetIndex !== -1 &&
    withdrawForm.value.quantity !== null &&
    selectedAssetData.value
  ) {
    const assetObj = assets.value[assetIndex];
    if (assetObj && assetObj.balance >= Number(withdrawForm.value.quantity)) {
      // Giá trung bình dựa trên vốn thật (không tính token nhận)
      const pureInvestedBalance =
        assetObj.balance - (assetObj.receivedBalance || 0);
      const avgPrice = assetObj.totalInvested / (pureInvestedBalance || 1);

      const sellPrice = Number(withdrawForm.value.price || avgPrice);
      const totalAmountRec = Number(withdrawForm.value.quantity) * sellPrice;
      const profitPerUnit = sellPrice - avgPrice;
      const totalProfit = profitPerUnit * Number(withdrawForm.value.quantity);

      try {
        await createWalletTransaction({
          assetSymbol: selectedAsset.value!,
          type: "withdraw",
          quantity: Number(withdrawForm.value.quantity),
          price: sellPrice,
          total: totalAmountRec,
          avgBuyPriceAtTime: avgPrice,
          profitAmount: totalProfit,
        });

        // Update local UI
        assetObj.balance -= Number(withdrawForm.value.quantity);
        assetObj.totalInvested -=
          Number(withdrawForm.value.quantity) * avgPrice;

        if (assetObj.balance < 0) assetObj.balance = 0;
        if (assetObj.totalInvested < 0) assetObj.totalInvested = 0;

        if (selectedAsset.value !== "VND") {
          const vndAsset = assets.value.find((a) => a.symbol === "VND");
          if (vndAsset) vndAsset.balance += totalAmountRec;
        }

        await fetchTransactions();
        await fetchPortfolioSummary();
      } catch (e) {
        alert("Lỗi khi lưu giao dịch rút");
      }
    }
  }

  withdrawForm.value = { quantity: null, price: null, source: null };
  showWithdrawModal.value = false;
};
</script>
