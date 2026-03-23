<template>
  <div class="animate-in fade-in duration-300">
    <!-- Top Persistent bar -->
    <div
      class="flex flex-col md:flex-row md:items-center justify-between mb-8 md:mb-12 py-4 border-b border-white/5 gap-6"
    >
      <div>
        <h1
          class="text-2xl sm:text-3xl md:text-5xl font-black tracking-tighter text-white mb-1 md:mb-2"
        >
          Quản lý Tài sản
        </h1>
        <p class="text-gray-500 font-medium text-[10px] sm:text-sm md:text-lg">
          {{
            selectedAsset
              ? `Đang xem ví ${selectedAsset}`
              : "Xem và quản lý số dư Cryptocurrency & Fiat của bạn"
          }}
        </p>
      </div>

      <div class="flex items-center gap-3 md:gap-4">
        <button
          @click="toggleBalanceVisibility"
          class="flex-1 md:flex-none flex items-center justify-center gap-3 px-4 md:px-6 py-3 md:py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-[1.25rem] transition-all group/btn"
        >
          <component
            :is="isBalanceVisible ? EyeIcon : EyeOffIcon"
            class="w-5 h-5 text-gray-400 group-hover/btn:text-white"
          />
          <span
            class="text-xs font-bold text-gray-400 group-hover/btn:text-white uppercase tracking-widest"
          >
            {{
              isBalanceVisible
                ? windowWidth < 768
                  ? "Ẩn"
                  : "Ẩn số dư"
                : windowWidth < 768
                  ? "Hiện"
                  : "Hiện số dư"
            }}
          </span>
        </button>

        <button
          @click="handleClearAllAssets"
          class="flex-none p-3 md:p-4 bg-red-500/10 hover:bg-red-500 border border-red-500/20 text-red-500 hover:text-white rounded-[1.25rem] transition-all group/clear"
          title="Làm mới toàn bộ dữ liệu ví"
        >
          <RefreshCwIcon
            class="w-5 h-5 group-hover/clear:rotate-180 transition-transform duration-500"
          />
        </button>

        <button
          v-if="selectedAsset"
          @click="selectedAsset = null"
          class="p-3 md:p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-[1.25rem] transition-all text-gray-400 hover:text-white"
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
        class="bg-gradient-to-br from-purple-500/10 via-white/5 to-transparent backdrop-blur-3xl border border-white/10 p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] mb-12 relative overflow-hidden group shadow-2xl"
      >
        <!-- Decoration icons/glows -->
        <div
          class="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px]"
        ></div>
        <div
          class="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]"
        ></div>

        <div
          class="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10 gap-6 md:gap-8"
        >
          <div class="flex-1 w-full">
            <p
              class="text-[8px] sm:text-[10px] md:text-xs text-purple-400 font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-4 flex items-center gap-2"
            >
              <ActivityIcon class="w-4 h-4" />
              TỔNG TRỊ GIÁ TÀI SẢN (VND)
            </p>
            <div class="flex items-baseline gap-3 md:gap-4 overflow-hidden">
              <h2
                class="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-white truncate"
              >
                {{
                  isBalanceVisible && portfolioSummary
                    ? formatNumber(portfolioSummary.totalVndValue)
                    : "••••••••"
                }}
              </h2>
              <span class="text-xl md:text-3xl text-gray-500 font-bold">₫</span>
            </div>
            <div class="flex flex-col sm:flex-row sm:items-center gap-4 mt-8">
              <div
                class="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full w-fit"
                :class="
                  (portfolioSummary?.dailyChangePercent || 0) >= 0
                    ? 'bg-green-400/10 border-green-400/20'
                    : 'bg-red-400/10 border-red-400/20'
                "
              >
                <div
                  class="w-1.5 h-1.5 rounded-full animate-pulse"
                  :class="
                    (portfolioSummary?.dailyChangePercent || 0) >= 0
                      ? 'bg-green-500'
                      : 'bg-red-500'
                  "
                ></div>
                <span
                  class="text-[10px] font-black uppercase tracking-widest whitespace-nowrap"
                  :class="
                    (portfolioSummary?.dailyChangePercent || 0) >= 0
                      ? 'text-green-400'
                      : 'text-red-400'
                  "
                >
                  {{
                    (portfolioSummary?.dailyChangePercent || 0) >= 0 ? "+" : ""
                  }}{{
                    (portfolioSummary?.dailyChangePercent || 0).toFixed(2)
                  }}% Today (±{{
                    formatNumber(portfolioSummary?.dailyChangeVnd || 0)
                  }}₫)
                </span>
              </div>
              <p
                class="text-[10px] md:text-xs text-gray-500 font-medium italic"
              >
                Công cụ tính toán tự động qua Binance P2P & Market API
              </p>
            </div>
          </div>

          <div
            class="flex flex-col items-start md:items-end gap-1 md:gap-2 md:ml-auto w-full md:w-auto md:text-right"
          >
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
              class="w-12 h-1 bg-purple-500/30 rounded-full md:ml-auto mt-2"
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
      <div v-if="savingsSummary" class="mt-12 md:mt-20">
        <div class="flex justify-end mb-8 md:mb-12">
          <div
            class="w-full md:w-[40%] h-[1px] bg-gradient-to-r from-transparent via-emerald-500 to-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
          ></div>
        </div>

        <div
          class="bg-gradient-to-br from-emerald-500/10 via-white/5 to-transparent backdrop-blur-3xl border border-white/10 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] relative overflow-hidden group shadow-2xl"
        >
          <div
            class="absolute -top-16 -right-16 w-48 h-48 bg-emerald-500/20 rounded-full blur-[60px]"
          ></div>
          <div class="relative z-10">
            <div
              class="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400"
                >
                  <PiggyBankIcon class="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div>
                  <h3
                    class="text-lg md:text-xl font-black text-white tracking-tighter uppercase"
                  >
                    Thống kê tiền gửi
                  </h3>
                  <p
                    class="text-[9px] md:text-[10px] text-gray-500 font-bold uppercase tracking-widest"
                  >
                    Toàn bộ danh mục đầu tư tích lũy
                  </p>
                </div>
              </div>
              <button
                @click="showSavingsStatsModal = true"
                class="w-full sm:w-auto px-5 py-2.5 bg-white/5 hover:bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all border border-white/10 hover:border-emerald-500 shadow-lg hover:shadow-emerald-500/20"
              >
                Xem chi tiết
              </button>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              <div class="relative">
                <p
                  class="text-[9px] md:text-[10px] text-emerald-400 font-black uppercase tracking-[0.2em] mb-2"
                >
                  Tổng tiền đang gửi
                </p>
                <p
                  class="text-xl md:text-3xl font-black text-white tracking-tight truncate"
                >
                  {{
                    isBalanceVisible
                      ? formatNumber(savingsSummary.totalVndValue)
                      : "••••••••"
                  }}
                  <span class="text-xs md:text-sm text-gray-500">₫</span>
                </p>
              </div>

              <div class="relative">
                <p
                  class="text-[9px] md:text-[10px] text-emerald-400 font-black uppercase tracking-[0.2em] mb-2"
                >
                  Lợi nhuận ước tính / ngày
                </p>
                <p
                  class="text-xl md:text-3xl font-black text-emerald-400 tracking-tight truncate"
                >
                  +{{
                    isBalanceVisible
                      ? formatNumber(savingsSummary.totalProfitEstimateVnd)
                      : "••••••••"
                  }}
                  <span class="text-xs md:text-sm text-gray-500">₫</span>
                </p>
              </div>

              <div class="relative">
                <p
                  class="text-[9px] md:text-[10px] text-emerald-400 font-black uppercase tracking-[0.2em] mb-2"
                >
                  Lãi suất trung bình
                </p>
                <p
                  class="text-xl md:text-3xl font-black text-white tracking-tight truncate"
                >
                  {{
                    savingsSummary.count > 0
                      ? (
                          savingsSummary.details.reduce(
                            (sum: number, s: any) => sum + Number(s.annualRate),
                            0,
                            0,
                          ) / savingsSummary.count
                        ).toFixed(2)
                      : "0.00"
                  }}
                  <span class="text-xs md:text-sm text-gray-500">%/n</span>
                </p>
              </div>

              <div class="relative">
                <p
                  class="text-[9px] md:text-[10px] text-emerald-400 font-black uppercase tracking-[0.2em] mb-2"
                >
                  Số sổ hoạt động
                </p>
                <p
                  class="text-xl md:text-3xl font-black text-white tracking-tight truncate"
                >
                  {{ savingsSummary.count }}
                  <span class="text-xs md:text-sm text-gray-500">sổ</span>
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
        <div class="flex flex-col">
          <h3 class="text-2xl font-bold mb-1 flex items-center gap-3">
            Chi tiết ví {{ selectedAsset }}
            <span
              v-if="frozenBalanceOnly > 0"
              class="px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-md"
            >
              Tài sản khoá
            </span>
          </h3>
          <p class="text-gray-500 font-medium">Bảo mật nâng cao đã bật</p>
        </div>
      </div>

      <!-- Highlight card for the selected asset -->
      <div
        @click="cardMode = cardMode === 'portfolio' ? 'realized' : 'portfolio'"
        class="bg-gradient-to-br from-[#0a0a0f] to-[#0d0d14] p-6 md:p-10 rounded-[2rem] border border-white/5 shadow-2xl relative overflow-hidden group mb-8 cursor-pointer select-none transition-all duration-500 hover:border-white/10"
      >
        <div
          class="flex flex-col lg:flex-row justify-between items-start lg:items-center relative z-10 gap-8"
        >
          <!-- Portfolio View -->
          <div
            v-if="cardMode === 'portfolio'"
            class="animate-in fade-in slide-in-from-left-4 duration-500"
          >
            <p
              class="text-gray-400 font-bold uppercase tracking-widest text-[10px] md:text-xs mb-2 md:mb-3"
            >
              TỔNG SỐ DƯ
            </p>
            <p
              class="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 md:mb-6"
            >
              {{
                isBalanceVisible ? formatNumber(effectiveBalance) : "********"
              }}
              <span class="text-xl md:text-2xl text-gray-500 font-bold ml-1">{{
                selectedAsset
              }}</span>
            </p>
            <!-- Unified Statistics Cluster -->
            <div
              class="flex flex-wrap items-center gap-y-8 gap-x-10 md:gap-x-14 p-6 bg-white/[0.02] border border-white/5 rounded-[2.5rem] mt-8"
            >
              <!-- Balances Group -->
              <div
                class="flex flex-wrap items-center gap-x-10 md:gap-x-14 gap-y-6"
              >
                <div>
                  <p
                    class="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1.5"
                  >
                    Ví chính
                  </p>
                  <p class="text-sm font-bold text-white">
                    {{
                      isBalanceVisible
                        ? formatNumber(walletBalanceOnly)
                        : "********"
                    }}
                    <span class="text-[10px] text-gray-500 ml-0.5">{{
                      selectedAsset
                    }}</span>
                  </p>
                </div>
                <div>
                  <p
                    class="text-[10px] text-teal-400/80 font-bold uppercase tracking-widest mb-1.5"
                  >
                    Ví lưu trữ
                  </p>
                  <p class="text-sm font-bold text-teal-400">
                    {{
                      isBalanceVisible
                        ? formatNumber(storageBalanceOnly)
                        : "********"
                    }}
                    <span class="text-[10px] text-gray-500 ml-0.5">{{
                      selectedAsset
                    }}</span>
                  </p>
                </div>
                <div>
                  <p
                    class="text-[10px] text-blue-400/80 font-bold uppercase tracking-widest mb-1.5"
                  >
                    Đóng băng
                  </p>
                  <p class="text-sm font-bold text-blue-400">
                    {{
                      isBalanceVisible
                        ? formatNumber(frozenBalanceOnly)
                        : "********"
                    }}
                    <span class="text-[10px] text-gray-500 ml-0.5">{{
                      selectedAsset
                    }}</span>
                  </p>
                </div>
              </div>

              <!-- Vertical Divider on Desktop -->
              <div class="hidden xl:block w-px h-10 bg-white/5 mx-2"></div>

              <!-- Investment Stats Group -->
              <div
                class="flex flex-wrap items-center gap-x-10 md:gap-x-14 gap-y-6"
              >
                <div>
                  <p
                    class="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1.5"
                  >
                    Đơn giá TB
                  </p>
                  <p class="text-sm font-bold">
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
                    Tổng vốn
                  </p>
                  <p class="text-sm font-bold text-white">
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
                    Giá Trị (VND)
                  </p>
                  <p class="text-sm font-bold text-white">
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
          </div>

          <!-- Received Stats View -->
          <div
            v-else-if="cardMode === 'received'"
            class="animate-in fade-in slide-in-from-right-4 duration-500 w-full"
          >
            <p
              class="text-blue-500/80 font-bold uppercase tracking-widest text-[10px] md:text-xs mb-2 md:mb-3"
            >
              Tổng Token Đã Nhận
            </p>
            <p
              class="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 md:mb-6 text-blue-400"
            >
              {{ formatNumber(receivedStats.totalQuantity) }}
              <span class="text-xl md:text-2xl text-gray-500 font-bold ml-1">{{
                selectedAsset
              }}</span>
            </p>

            <div
              class="grid grid-cols-1 md:flex md:flex-wrap items-center gap-4 md:gap-10"
            >
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
              class="text-orange-500/80 font-bold uppercase tracking-widest text-[10px] md:text-xs mb-2 md:mb-3"
            >
              Tổng Lợi Nhuận Đã Chốt
            </p>
            <p
              class="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 md:mb-6"
              :class="
                realizedStats.totalProfit >= 0
                  ? 'text-green-400'
                  : 'text-red-400'
              "
            >
              {{ realizedStats.totalProfit >= 0 ? "+" : ""
              }}{{ formatNumber(realizedStats.totalProfit) }}
              <span class="text-xl md:text-2xl text-gray-500 font-bold ml-1">{{
                selectedAsset === "USDT" ? "₫" : "$"
              }}</span>
            </p>

            <div
              class="grid grid-cols-2 lg:flex lg:flex-wrap items-center gap-4 md:gap-10"
            >
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
              class="w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold bg-white/5 border border-white/5 shadow-inner overflow-hidden"
              :class="selectedAssetData?.textClass"
            >
              <img v-if="selectedAssetData?.image" :src="selectedAssetData.image" class="w-full h-full object-cover" />
              <span v-else>{{ selectedAssetData?.icon }}</span>
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
          class="grid grid-cols-5 gap-2 md:flex md:flex-wrap md:gap-4 relative z-10 mt-8 md:mt-12 pt-8 border-t border-white/5"
        >
          <button
            @click="showDepositModal = true"
            class="flex flex-col items-center justify-center gap-2 p-3 md:px-8 md:py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-500/20 text-white rounded-xl font-bold transition-all focus:ring-2 focus:ring-purple-500/50"
            :title="`Nạp ${selectedAsset}`"
          >
            <span class="text-xl md:text-base">📥</span>
            <span
              class="text-[9px] md:text-base font-black uppercase tracking-tighter md:tracking-normal md:normal-case"
              >Nạp</span
            >
          </button>
          <button
            @click="showWithdrawModal = true"
            class="flex flex-col items-center justify-center gap-2 p-3 md:px-8 md:py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-bold transition-all focus:ring-2 focus:ring-white/20"
            :title="`Rút ${selectedAsset}`"
          >
            <span class="text-xl md:text-base">📤</span>
            <span
              class="text-[9px] md:text-base font-black uppercase tracking-tighter md:tracking-normal md:normal-case"
              >Rút</span
            >
          </button>
          <button
            @click="showReceiveModal = true"
            class="flex flex-col items-center justify-center gap-2 p-3 md:px-8 md:py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-bold transition-all focus:ring-2 focus:ring-white/20"
            :title="`Nhận ${selectedAsset}`"
          >
            <span class="text-xl md:text-base">🎁</span>
            <span
              class="text-[9px] md:text-base font-black uppercase tracking-tighter md:tracking-normal md:normal-case"
              >Nhận</span
            >
          </button>
          <button
            @click="showSavingsModal = true"
            class="flex flex-col items-center justify-center gap-2 p-3 md:px-8 md:py-4 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-xl font-bold transition-all focus:ring-2 focus:ring-emerald-500/20"
            title="Gửi Lãi"
          >
            <span class="text-xl md:text-base">🏦</span>
            <span
              class="text-[9px] md:text-base font-black uppercase tracking-tighter md:tracking-normal md:normal-case"
              >Gửi Lãi</span
            >
          </button>
          <button
            v-if="selectedAsset === 'FZ' || selectedAsset === 'VND'"
            @click="handleFaucet"
            class="flex flex-col items-center justify-center gap-2 p-3 md:px-8 md:py-4 bg-purple-600/20 hover:bg-purple-600/40 text-purple-400 border border-purple-500/30 rounded-xl font-bold transition-all focus:ring-2 focus:ring-purple-500/20"
            title="Faucet (Thử nghiệm nội bộ)"
          >
            <span class="text-xl md:text-base">🎁</span>
            <span
              class="text-[9px] md:text-base font-black uppercase tracking-tighter md:tracking-normal md:normal-case"
              >Nhận FZ Miễn Phí</span
            >
          </button>
          <button
            @click="fetchTransactions"
            class="flex flex-col items-center justify-center gap-2 p-3 md:px-8 md:py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-bold transition-all focus:ring-2 focus:ring-white/20 md:ml-auto"
            title="Làm mới"
          >
            <span class="text-xl md:text-base">📋</span>
            <span
              class="text-[9px] md:text-base font-black uppercase tracking-tighter md:tracking-normal md:normal-case"
              >Làm mới</span
            >
          </button>
        </div>

        <!-- Navigation Dots/Switch moved here -->
        <div
          class="flex flex-col sm:flex-row items-center gap-4 z-20 bg-white/5 backdrop-blur-md px-5 py-3 md:px-6 md:py-3 rounded-2xl border border-white/5 mx-auto mt-10 w-fit"
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

          <div class="hidden sm:block w-[1px] h-4 bg-white/10 mx-1"></div>

          <div class="flex items-center gap-2 group/switch">
            <span
              class="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover/switch:text-gray-300 transition-colors"
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

          <div class="hidden sm:block w-[1px] h-4 bg-white/10 mx-1"></div>

          <div class="flex items-center gap-2 group/switch">
            <span
              class="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover/switch:text-gray-300 transition-colors"
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
      <div class="mt-8 md:mt-12">
        <div
          class="flex items-center gap-6 md:gap-8 border-b border-white/5 mb-8 overflow-x-auto no-scrollbar whitespace-nowrap px-1"
        >
          <button
            @click="activeSubTab = 'deposit'"
            class="pb-4 text-xs md:text-sm font-bold transition-all relative"
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
            class="pb-4 text-xs md:text-sm font-bold transition-all relative"
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
            class="pb-4 text-xs md:text-sm font-bold transition-all relative"
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
            @click="activeSubTab = 'transfer'"
            class="pb-4 text-xs md:text-sm font-bold transition-all relative"
            :class="
              activeSubTab === 'transfer'
                ? 'text-yellow-400'
                : 'text-gray-500 hover:text-gray-300'
            "
          >
            Quản lý chuyển
            <div
              v-if="activeSubTab === 'transfer'"
              class="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400 animate-in fade-in zoom-in-50"
            ></div>
          </button>
          <button
            @click="activeSubTab = 'savings'"
            class="pb-4 text-xs md:text-sm font-bold transition-all relative"
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
          <button
            @click="activeSubTab = 'storage'"
            class="pb-4 text-xs md:text-sm font-bold transition-all relative"
            :class="
              activeSubTab === 'storage'
                ? 'text-teal-400'
                : 'text-gray-500 hover:text-gray-300'
            "
          >
            Ví lưu trữ
            <div
              v-if="activeSubTab === 'storage'"
              class="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-400 animate-in fade-in zoom-in-50"
            ></div>
          </button>
        </div>

        <!-- Tab Content -->
        <div
          v-if="
            ['deposit', 'withdraw', 'receive', 'transfer'].includes(
              activeSubTab,
            )
          "
          class="animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          <div
            class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6"
          >
            <h4
              class="text-lg font-black text-white uppercase tracking-tighter"
            >
              Lịch sử
              {{
                activeSubTab === "deposit"
                  ? "nạp"
                  : activeSubTab === "withdraw"
                    ? "rút"
                    : activeSubTab === "transfer"
                      ? "chuyển"
                      : "nhận"
              }}
            </h4>
            <div class="flex items-center gap-2">
              <button
                @click="handleExport"
                class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-all"
                title="Xuất dữ liệu JSON"
              >
                <DownloadIcon class="w-3.5 h-3.5" />
                Export
              </button>
              <button
                @click="triggerImport"
                class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-all"
                title="Nhập dữ liệu JSON"
              >
                <UploadIcon class="w-3.5 h-3.5" />
                Import
              </button>
            </div>
          </div>

          <!-- Bulk Edit Panel for Withdrawals -->
          <div
            v-if="activeSubTab === 'withdraw' && selectedTxIds.length > 0"
            class="flex items-center justify-between bg-orange-500/10 border border-orange-500/20 p-4 rounded-2xl mb-6 animate-in slide-in-from-top-4"
          >
            <div class="flex items-center gap-4">
              <span class="text-xs font-black text-orange-400 uppercase tracking-widest">
                Đã chọn {{ selectedTxIds.length }} bản ghi
              </span>
              <div class="h-4 w-px bg-orange-500/20"></div>
              <div class="flex items-center gap-3">
                <span class="text-[10px] text-gray-400 font-bold uppercase">Cập nhật giá vốn:</span>
                <input
                  v-model="bulkAvgPriceValue"
                  type="number"
                  placeholder="Nhập giá..."
                  class="w-32 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500/50 transition-all font-bold"
                />
                <button
                  @click="handleBulkUpdateAvgPrice"
                  class="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-orange-500/20"
                >
                  Áp dụng tất cả
                </button>
              </div>
            </div>
            <button
              @click="selectedTxIds = []"
              class="text-[10px] text-gray-500 hover:text-white font-bold uppercase underline underline-offset-4 decoration-white/20"
            >
              Bỏ chọn
            </button>
          </div>


          <!-- Deposit Stats Panel -->
          <div
            v-if="activeSubTab === 'deposit' && selectedAsset"
            class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 relative"
          >
            <div class="md:col-span-3 flex items-center justify-between mb-2">
              <p
                class="text-[10px] text-teal-400 font-black uppercase tracking-widest"
              >
                Thống kê nạp {{ selectedAsset }}
              </p>
              <div
                class="flex bg-white/5 p-1 rounded-xl border border-white/10"
              >
                <button
                  @click="depositDateFilter = 'all'"
                  class="px-3 py-1 text-[9px] font-black uppercase rounded-lg transition-all"
                  :class="
                    depositDateFilter === 'all'
                      ? 'bg-teal-500 text-white shadow-lg'
                      : 'text-gray-500 hover:text-gray-300'
                  "
                >
                  Tất cả
                </button>
                <button
                  @click="depositDateFilter = 'month'"
                  class="px-3 py-1 text-[9px] font-black uppercase rounded-lg transition-all"
                  :class="
                    depositDateFilter === 'month'
                      ? 'bg-teal-500 text-white shadow-lg'
                      : 'text-gray-500 hover:text-gray-300'
                  "
                >
                  Tháng này
                </button>
                <button
                  @click="depositDateFilter = 'today'"
                  class="px-3 py-1 text-[9px] font-black uppercase rounded-lg transition-all"
                  :class="
                    depositDateFilter === 'today'
                      ? 'bg-teal-500 text-white shadow-lg'
                      : 'text-gray-500 hover:text-gray-300'
                  "
                >
                  Hôm nay
                </button>
                <button
                  v-if="depositCheckpointDate"
                  @click="depositDateFilter = 'checkpoint'"
                  class="px-3 py-1 text-[9px] font-black uppercase rounded-lg transition-all flex items-center gap-1"
                  :class="
                    depositDateFilter === 'checkpoint'
                      ? 'bg-orange-500 text-white shadow-lg'
                      : 'text-gray-500 hover:text-gray-300'
                  "
                  :title="`Từ ngày: ${new Date(depositCheckpointDate).toLocaleString()}`"
                >
                  🚩 Checkpoint
                </button>
                <button
                  @click="setDepositCheckpoint"
                  class="px-2 py-1 text-[9px] font-black uppercase rounded-lg transition-all text-teal-400 hover:bg-teal-400/10"
                  title="Đặt mốc Checkpoint tại thời điểm hiện tại"
                >
                  <PinIcon class="w-3 h-3" />
                </button>
                <div
                  class="flex items-center gap-1 ml-1 px-2 border-l border-white/10"
                >
                  <input
                    type="date"
                    title="Chọn ngày checkpoint thủ công"
                    class="bg-transparent text-[9px] font-bold text-teal-400 outline-none w-[100px] cursor-pointer hover:scale-105 transition-transform appearance-none"
                    style="color-scheme: dark"
                    :value="
                      depositCheckpointDate
                        ? depositCheckpointDate.substring(0, 10)
                        : ''
                    "
                    @change="
                      (e) =>
                        manualSetCheckpoint(
                          (e.target as HTMLInputElement).value,
                        )
                    "
                  />
                </div>
              </div>
            </div>

            <div
              class="bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 p-6 rounded-3xl relative group overflow-hidden"
            >
              <div
                class="absolute -top-10 -right-10 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl transition-all group-hover:bg-teal-500/20"
              ></div>
              <div class="relative z-10">
                <p
                  class="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1"
                >
                  Tổng cộng nạp
                </p>
                <p class="text-2xl font-black text-white tracking-tighter">
                  {{ formatNumber(depositStats.totalQuantity) }}
                  <span class="text-xs text-gray-500 font-bold ml-1">{{
                    selectedAsset
                  }}</span>
                </p>
              </div>
            </div>

            <div
              class="bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 p-6 rounded-3xl relative group overflow-hidden"
            >
              <div
                class="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl transition-all group-hover:bg-emerald-500/20"
              ></div>
              <div class="relative z-10">
                <p
                  class="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1"
                >
                  Giá nạp trung bình
                </p>
                <p class="text-2xl font-black text-white tracking-tighter">
                  <span class="text-sm text-gray-500 mr-0.5">₫</span
                  >{{ formatNumber(depositStats.avgPrice) }}
                </p>
              </div>
            </div>

            <div
              class="bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 p-6 rounded-3xl relative group overflow-hidden"
            >
              <div
                class="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl transition-all group-hover:bg-purple-500/20"
              ></div>
              <div class="relative z-10">
                <p
                  class="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1"
                >
                  Số lần giao dịch
                </p>
                <p class="text-2xl font-black text-white tracking-tighter">
                  {{ depositStats.count }}
                  <span class="text-xs text-gray-500 font-bold ml-1">lần</span>
                </p>
              </div>
            </div>
          </div>
          <div
            v-if="filteredTransactions.length > 0"
            class="overflow-x-auto bg-white/5 border border-white/5 rounded-[1.5rem] md:rounded-[2rem] shadow-xl no-scrollbar"
          >
            <table class="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr class="bg-white/5 border-b border-white/5">
                  <th v-if="activeSubTab === 'withdraw'" class="px-4 py-5 text-center w-12">
                    <input
                      type="checkbox"
                      :checked="selectedTxIds.length === filteredTransactions.length && filteredTransactions.length > 0"
                      @change="toggleAllSelection"
                      class="w-4 h-4 rounded border-white/10 bg-white/5 text-orange-500 focus:ring-orange-500/20 transition-all cursor-pointer"
                    />
                  </th>
                  <th

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
                  :class="{ 'bg-orange-500/5': selectedTxIds.includes(tx.id) }"
                >
                  <td v-if="activeSubTab === 'withdraw'" class="px-4 py-5 text-center">
                    <input
                      type="checkbox"
                      :checked="selectedTxIds.includes(tx.id)"
                      @change="toggleTxSelection(tx.id)"
                      class="w-4 h-4 rounded border-white/10 bg-white/5 text-orange-500 focus:ring-orange-500/20 transition-all cursor-pointer"
                    />
                  </td>

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
                        class="text-[10px] text-blue-400/80 font-bold uppercase tracking-widest"
                      >
                        {{ tx.source ? tx.source : "🎁 Token Tặng" }}
                      </span>
                      <span v-else class="text-xs text-gray-400 font-medium">{{
                        formatNumber(tx.price)
                      }}</span>
                      
                      <!-- Editable Average Price (Vốn) -->
                      <div v-if="tx.type === 'withdraw'" class="mt-0.5">
                        <div v-if="editingAvgPriceId === tx.id" class="flex items-center gap-2 justify-end">
                          <input
                            v-model="editAvgPriceValue"
                            type="number"
                            class="w-24 bg-black/60 border border-orange-500/30 rounded-lg px-2 py-1 text-[10px] text-white focus:outline-none focus:border-orange-500 transition-all font-bold text-right"
                            @keyup.enter="handleSaveAvgPrice(tx)"
                            @keyup.esc="editingAvgPriceId = null"
                            autoFocus
                          />
                          <button
                            @click="handleSaveAvgPrice(tx)"
                            class="p-1 bg-green-500/20 hover:bg-green-500 text-green-400 hover:text-white rounded transition-all"
                          >
                            <CheckIcon class="w-3 h-3" />
                          </button>
                          <button
                            @click="editingAvgPriceId = null"
                            class="p-1 bg-white/5 hover:bg-white/10 text-gray-400 rounded transition-all"
                          >
                            <XIcon class="w-3 h-3" />
                          </button>
                        </div>
                        <div 
                          v-else 
                          class="flex items-center gap-1.5 justify-end group/edit text-right"
                          @click="activeSubTab === 'withdraw' && handleStartEditAvgPrice(tx)"
                        >
                          <span
                            class="text-[9px] text-gray-500 italic cursor-pointer hover:text-orange-400 transition-colors"
                          >
                            Vốn: {{ formatNumber(tx.avgBuyPriceAtTime || 0) }}
                            {{ tx.asset === "USDT" ? "₫" : "$" }}
                          </span>
                          <EditIcon class="w-2.5 h-2.5 text-gray-600 opacity-0 group-hover/edit:opacity-100 transition-opacity cursor-pointer" />
                        </div>
                      </div>
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
                      class="px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border"
                      :class="
                        tx.status === 'locked'
                          ? 'bg-blue-500/10 text-blue-400 border-blue-400/20'
                          : tx.status === 'completed'
                            ? 'bg-green-500/10 text-green-500 border-green-500/20'
                            : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                      "
                    >
                      {{
                        tx.status === "completed"
                          ? "Thành công"
                          : tx.status === "locked"
                            ? "Tài sản khoá"
                            : "Đang xử lý"
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
                      : activeSubTab === "transfer"
                        ? "chuyển nội bộ"
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
                      : activeSubTab === "transfer"
                        ? "chuyển nội bộ"
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
            <div class="flex items-center justify-between mb-8">
              <p
                class="text-[10px] text-emerald-400 font-black uppercase tracking-[0.2em]"
              >
                Tổng quan tiền gửi
              </p>
              <div class="flex items-center gap-2">
                <button
                  @click="handleExport"
                  class="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-lg text-[9px] font-black uppercase tracking-widest text-emerald-400 transition-all"
                  title="Xuất dữ liệu JSON"
                >
                  <DownloadIcon class="w-3 h-3" />
                  Export
                </button>
                <button
                  @click="triggerImport"
                  class="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-lg text-[9px] font-black uppercase tracking-widest text-emerald-400 transition-all"
                  title="Nhập dữ liệu JSON"
                >
                  <UploadIcon class="w-3 h-3" />
                  Import
                </button>
              </div>
            </div>
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
                  v-if="saving.status === 'active'"
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

      <!-- Storage Wallets Tab Content -->
      <div
        v-if="activeSubTab === 'storage'"
        class="animate-in fade-in slide-in-from-bottom-4 duration-500"
      >
        <div class="flex justify-between items-center mb-8">
          <div class="flex items-center gap-3">
            <div
              class="w-12 h-12 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-400"
            >
              <WalletIcon class="w-6 h-6" />
            </div>
            <div>
              <h3
                class="text-xl font-black text-white tracking-tighter uppercase"
              >
                Ví Lưu Trữ Riêng Biệt
              </h3>
              <p
                class="text-[10px] text-gray-500 font-bold uppercase tracking-widest"
              >
                Phân bổ tài sản tại các nền tảng khác nhau
              </p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button
              @click="handleExport"
              class="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-all flex items-center gap-2"
              title="Xuất dữ liệu JSON"
            >
              <DownloadIcon class="w-3.5 h-3.5" />
              Export
            </button>
            <button
              @click="triggerImport"
              class="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-all flex items-center gap-2"
              title="Nhập dữ liệu JSON"
            >
              <UploadIcon class="w-3.5 h-3.5" />
              Import
            </button>
            <button
              @click="showStorageModal = true"
              class="px-5 py-2.5 bg-teal-500/10 hover:bg-teal-500 text-teal-400 hover:text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all border border-teal-500/20 shadow-lg flex items-center gap-2"
            >
              <span>+ Thêm ví mới</span>
            </button>
          </div>
        </div>

        <div
          v-if="storageList.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          <div
            v-for="wallet in filteredStorageList"
            :key="wallet.id"
            class="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[1.5rem] relative overflow-hidden hover:border-teal-500/30 transition-all group cursor-pointer"
            @click="openStorageDetails(wallet)"
          >
            <div class="relative z-10">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 font-bold text-lg"
                  >
                    {{ selectedAssetData?.icon }}
                  </div>
                  <div>
                    <p class="text-sm font-black text-white">
                      {{ wallet.platform }}
                    </p>
                    <p class="text-[10px] text-gray-500 font-bold uppercase">
                      {{ wallet.assetSymbol }}
                    </p>
                  </div>
                </div>
                <div
                  v-if="wallet.quantity > wallet.initialQuantity"
                  class="px-2 py-1 rounded-lg bg-green-500/10 text-green-500 text-[10px] font-black uppercase"
                >
                  +{{ formatNumber(wallet.quantity - wallet.initialQuantity) }}
                </div>
                <div
                  v-else-if="wallet.quantity < wallet.initialQuantity"
                  class="px-2 py-1 rounded-lg bg-red-500/10 text-red-500 text-[10px] font-black uppercase"
                >
                  {{ formatNumber(wallet.quantity - wallet.initialQuantity) }}
                </div>
              </div>
              <div class="space-y-4">
                <div>
                  <p class="text-[10px] text-gray-500 font-bold uppercase mb-1">
                    Số dư lưu trữ
                  </p>
                  <p class="text-2xl font-black text-white">
                    {{
                      isBalanceVisible ? formatNumber(wallet.quantity) : "••••"
                    }}
                    <span class="text-sm text-gray-500 ml-1">{{
                      wallet.assetSymbol
                    }}</span>
                  </p>
                </div>
                <div
                  class="pt-3 border-t border-white/5 flex justify-between items-center"
                >
                  <span class="text-[10px] text-gray-500 font-bold uppercase"
                    >Tổng nạp</span
                  >
                  <span class="text-xs font-bold text-white">{{
                    formatNumber(wallet.initialQuantity)
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-else
          class="text-center py-20 bg-white/5 border border-white/5 rounded-[2rem]"
        >
          <div
            class="w-20 h-20 rounded-full bg-teal-500/10 flex items-center justify-center mx-auto mb-6"
          >
            <WalletIcon class="w-10 h-10 text-teal-400" />
          </div>
          <h4 class="text-white font-bold text-lg mb-2">
            Chưa có ví lưu trữ nào
          </h4>
          <p class="text-gray-500 max-w-sm mx-auto text-sm">
            Bấm "Thêm ví mới" để bắt đầu tổ chức tài sản của bạn.
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
      :vndBalance="assets.find((a) => a.symbol === 'VND')?.balance || 0"
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
      :storageWallets="currentAssetStorageWallets"
      @close="showSavingsModal = false"
      @submit="submitSavings"
    />

    <SavingsStatsModal
      v-if="showSavingsStatsModal"
      :savingsList="savingsList"
      @close="showSavingsStatsModal = false"
      @withdraw="handleWithdrawSavings"
    />

    <AssetStorageModal
      v-if="showStorageModal"
      :selectedAsset="selectedAsset"
      :availableBalance="selectedAssetData?.balance || 0"
      @close="showStorageModal = false"
      @submit="submitStorage"
    />

    <CmConfirm
      :show="confirmModal.show"
      :title="confirmModal.title"
      :message="confirmModal.message"
      :icon="confirmModal.icon"
      :variant="confirmModal.variant"
      :showCancel="confirmModal.showCancel"
      :confirmText="confirmModal.confirmText"
      :cancelText="confirmModal.cancelText"
      @confirm="handleConfirmAction"
      @cancel="handleCancelAction"
    />

    <!-- Storage Details Modal -->
    <div
      v-if="selectedStorageWallet"
      class="fixed inset-0 bg-black/95 flex items-center justify-center z-[100] p-4 animate-in fade-in backdrop-blur-sm"
    >
      <div
        class="bg-[#0a0a0f] border border-white/10 rounded-[2.5rem] p-8 max-w-2xl w-full relative shadow-2xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        <button
          @click="selectedStorageWallet = null"
          class="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
        >
          <XIcon class="w-6 h-6" />
        </button>

        <div class="mb-6">
          <h3 class="text-2xl font-black text-white mb-1">
            Chi tiết Ví Lưu Trữ
          </h3>
          <p
            class="text-gray-500 uppercase text-[10px] font-black tracking-widest"
          >
            {{ selectedStorageWallet.platform }} •
            {{ selectedStorageWallet.assetSymbol }}
          </p>
        </div>

        <div class="overflow-y-auto pr-2 custom-scrollbar space-y-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white/5 border border-white/5 p-6 rounded-3xl">
              <p class="text-[10px] text-gray-500 font-black uppercase mb-2">
                Số dư hiện tại
              </p>
              <p class="text-3xl font-black text-white">
                {{ formatNumber(selectedStorageWallet.quantity) }}
                <span class="text-sm text-gray-500 ml-1">{{
                  selectedStorageWallet.assetSymbol
                }}</span>
              </p>

              <div class="mt-4 flex gap-4">
                <div class="flex-1 p-2 bg-white/5 rounded-xl">
                  <p
                    class="text-[9px] text-gray-400 font-bold uppercase mb-0.5"
                  >
                    Khả dụng
                  </p>
                  <p class="text-xs font-black text-emerald-400">
                    {{
                      formatNumber(
                        Number(selectedStorageWallet.quantity) -
                          totalStakedFromStorage,
                      )
                    }}
                  </p>
                </div>
                <div class="flex-1 p-2 bg-white/5 rounded-xl">
                  <p
                    class="text-[9px] text-gray-400 font-bold uppercase mb-0.5"
                  >
                    Đóng băng
                  </p>
                  <p class="text-xs font-black text-orange-400">
                    {{ formatNumber(totalStakedFromStorage) }}
                  </p>
                </div>
              </div>

              <div
                class="mt-4 pt-4 border-t border-white/5 flex items-center justify-between"
              >
                <div>
                  <p
                    class="text-[10px] text-gray-500 font-bold uppercase flex items-center gap-1.5 mb-1"
                  >
                    Vốn nạp gốc
                    <button
                      @click="isEditingInitial = !isEditingInitial"
                      class="p-1 hover:bg-white/10 rounded-md text-teal-400 transition-all"
                      title="Chỉnh sửa vốn gốc"
                    >
                      <EditIcon class="w-3 h-3" />
                    </button>
                  </p>
                  <div
                    v-if="isEditingInitial"
                    class="flex items-center gap-2 mt-1"
                  >
                    <input
                      v-model="editInitialValue"
                      type="number"
                      class="w-24 bg-black/60 border border-teal-500/30 rounded-lg px-2 py-1 text-xs text-white focus:outline-none focus:border-teal-500 transition-all font-bold"
                      @keyup.enter="handleSaveInitial"
                      autoFocus
                    />
                    <button
                      @click="handleSaveInitial"
                      class="p-1.5 bg-teal-500/20 hover:bg-teal-500 text-teal-400 hover:text-white rounded-lg transition-all"
                    >
                      <CheckIcon class="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div v-else class="flex flex-col">
                    <p class="text-sm font-bold text-white">
                      {{ formatNumber(selectedStorageWallet.initialQuantity) }}
                    </p>
                    <p
                      v-if="Number(selectedStorageWallet.initialQuantity) === 0"
                      class="text-[9px] text-orange-400 font-medium italic mt-0.5"
                    >
                      * Chưa có vốn gốc, nhấn nút sửa để cập nhật
                    </p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-[10px] text-gray-500 font-bold uppercase">
                    Biến động
                  </p>
                  <p
                    :class="
                      selectedStorageWallet.quantity >=
                      selectedStorageWallet.initialQuantity
                        ? 'text-green-400'
                        : 'text-red-400'
                    "
                    class="text-xs font-black"
                  >
                    {{
                      selectedStorageWallet.quantity >=
                      selectedStorageWallet.initialQuantity
                        ? "+"
                        : ""
                    }}{{
                      formatNumber(
                        selectedStorageWallet.quantity -
                          selectedStorageWallet.initialQuantity,
                      )
                    }}
                  </p>
                </div>
              </div>
            </div>

            <div
              class="bg-teal-500/5 border border-teal-500/10 p-6 rounded-3xl"
            >
              <p class="text-[10px] text-teal-400 font-black uppercase mb-3">
                Điều chỉnh số dư
              </p>
              <div class="space-y-4">
                <input
                  v-model="storageAdjustment.amount"
                  type="number"
                  placeholder="Nhập số lượng..."
                  class="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-teal-500/50 transition-all font-bold"
                />
                <input
                  v-model="storageAdjustment.note"
                  type="text"
                  placeholder="Ghi chú (tùy chọn)..."
                  class="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-[10px] text-white focus:outline-none focus:border-teal-500/50 transition-all font-bold"
                />
                <div class="flex gap-3">
                  <button
                    @click="handleAdjustStorage('increase')"
                    class="flex-1 bg-green-500/10 hover:bg-green-500 text-green-500 hover:text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-green-500/20"
                  >
                    + Tăng
                  </button>
                  <button
                    @click="handleAdjustStorage('decrease')"
                    class="flex-1 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-red-500/20"
                  >
                    - Giảm
                  </button>
                </div>
              </div>
            </div>

            <!-- Staked from this storage wallet -->
            <div
              v-if="activeSavingsForStorage.length > 0"
              class="bg-emerald-500/5 border border-emerald-500/10 p-6 rounded-3xl md:col-span-2"
            >
              <p
                class="text-[10px] text-emerald-400 font-black uppercase mb-3 flex justify-between"
              >
                <span>Đang gửi lãi</span>
                <span
                  >{{ formatNumber(totalStakedFromStorage) }}
                  {{ selectedStorageWallet.assetSymbol }}</span
                >
              </p>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  v-for="s in activeSavingsForStorage"
                  :key="s.id"
                  class="p-3 bg-white/5 rounded-xl border border-white/5"
                >
                  <p class="text-xs font-bold text-white">
                    {{ s.platform }}
                    <span class="text-[10px] text-gray-500 font-normal"
                      >({{
                        s.savingsType === "flexible" ? "Linh hoạt" : "Cố định"
                      }})</span
                    >
                  </p>
                  <p class="text-sm font-black text-emerald-400 mt-0.5">
                    {{ formatNumber(s.quantity) }}
                  </p>
                  <p class="text-[10px] text-gray-400 mt-1">
                    Lãi suất:
                    <span class="text-white"
                      >{{ Number(s.annualRate).toFixed(2) }}%/năm</span
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4
              class="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-4 flex items-center gap-2"
            >
              <HistoryIcon class="w-3 h-3" /> Lịch sử lưu ký
            </h4>
            <div v-if="storageHistory.length > 0" class="space-y-3">
              <div
                v-for="item in storageHistory"
                :key="item.id"
                class="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/5 transition-colors"
              >
                <div class="flex items-center gap-3">
                  <div
                    :class="{
                      'bg-green-500/10 text-green-500':
                        item.type === 'increase' || item.type === 'unstake',
                      'bg-red-500/10 text-red-500': item.type === 'decrease',
                      'bg-orange-500/10 text-orange-500': item.type === 'stake',
                    }"
                    class="w-10 h-10 rounded-xl flex items-center justify-center"
                  >
                    <TrendingUpIcon
                      v-if="item.type === 'increase' || item.type === 'unstake'"
                      class="w-5 h-5"
                    />
                    <TrendingDownIcon
                      v-else-if="item.type === 'decrease'"
                      class="w-5 h-5"
                    />
                    <PiggyBankIcon v-else class="w-5 h-5" />
                  </div>
                  <div>
                    <p class="text-xs font-bold text-white">
                      {{
                        item.type === "increase"
                          ? "Tăng số dư"
                          : item.type === "decrease"
                            ? "Giảm số dư"
                            : item.type === "stake"
                              ? "Đóng băng (Savings)"
                              : "Mở khoá (Gốc lãi)"
                      }}
                    </p>
                    <p class="text-[10px] text-gray-500">
                      {{ new Date(item.createdAt).toLocaleString() }}
                    </p>
                    <p
                      v-if="item.note"
                      class="text-[10px] text-gray-600 italic mt-0.5 line-clamp-1"
                    >
                      "{{ item.note }}"
                    </p>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <div class="text-right">
                    <p
                      :class="{
                        'text-green-400':
                          item.type === 'increase' || item.type === 'unstake',
                        'text-red-400': item.type === 'decrease',
                        'text-orange-400': item.type === 'stake',
                      }"
                      class="text-sm font-black"
                    >
                      {{
                        item.type === "increase" || item.type === "unstake"
                          ? "+"
                          : item.type === "stake"
                            ? "🔒 "
                            : "-"
                      }}{{ formatNumber(item.amount) }}
                    </p>
                    <p class="text-[10px] text-gray-600 font-bold">
                      Sau: {{ formatNumber(item.balanceAfter) }}
                    </p>
                  </div>
                  <div class="flex flex-col gap-1">
                    <button
                      @click="handleEditHistory(item)"
                      class="p-1.5 hover:bg-teal-500/10 text-gray-500 hover:text-teal-400 rounded-lg transition-all"
                      title="Sửa ghi chú"
                    >
                      <EditIcon class="w-3 h-3" />
                    </button>
                    <button
                      @click="handleDeleteHistory(item.id)"
                      class="p-1.5 hover:bg-red-500/10 text-gray-500 hover:text-red-400 rounded-lg transition-all"
                      title="Xoá lịch sử"
                    >
                      <TrashIcon class="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-else
              class="text-center py-10 bg-white/[0.02] border border-dashed border-white/5 rounded-[2rem]"
            >
              <p class="text-xs text-gray-600 font-bold italic">
                Chưa có lịch sử biến động
              </p>
            </div>
          </div>
        </div>

        <div class="pt-6 border-t border-white/5 mt-auto flex gap-3">
          <button
            @click="handleWithdrawFromStorage(selectedStorageWallet.id)"
            class="flex-[2] py-4 bg-white/5 hover:bg-teal-500/10 text-white hover:text-teal-400 border border-white/10 hover:border-teal-500/20 rounded-2xl transition-all flex items-center justify-center gap-2 group font-black uppercase text-xs tracking-widest"
          >
            <ArrowDownCircleIcon
              class="w-5 h-5 text-gray-400 group-hover:text-teal-400 transition-colors"
            />
            Rút về Ví Khả Dụng
          </button>
          <button
            @click="handleDeleteStorage(selectedStorageWallet.id)"
            class="flex-1 py-4 bg-red-500/5 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 rounded-2xl transition-all flex items-center justify-center gap-2 group font-black uppercase text-xs tracking-widest"
          >
            <TrashIcon class="w-5 h-5" />
            Xoá ví
          </button>
        </div>
      </div>
    </div>
  </div>
  <input
    type="file"
    ref="importFileInput"
    class="hidden"
    accept=".json"
    @change="handleImport"
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";

const windowWidth = ref(window.innerWidth);
const updateWidth = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener("resize", updateWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateWidth);
});
import {
  Activity as ActivityIcon,
  ArrowLeft as ArrowLeftIcon,
  Edit2 as EditIcon,
  Trash2 as TrashIcon,
  Eye as EyeIcon,
  EyeOff as EyeOffIcon,
  PiggyBank as PiggyBankIcon,
  Wallet as WalletIcon,
  X as XIcon,
  Check as CheckIcon,
  ArrowDownCircle as ArrowDownCircleIcon,
  History as HistoryIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  MessageSquare as MessageSquareIcon,
  CheckCircle as CheckCircleIcon,
  AlertTriangle as AlertTriangleIcon,
  RefreshCw as RefreshCwIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  Pin as PinIcon,
} from "lucide-vue-next";
import { updateWalletTransaction } from "../../api/wallet";

import AssetCard from "../../components/AssetCard.vue";
import AssetPasswordPrompt from "../../components/AssetPasswordPrompt.vue";
import AssetDepositModal from "../../components/AssetDepositModal.vue";
import AssetWithdrawModal from "../../components/AssetWithdrawModal.vue";
import AssetReceiveModal from "../../components/AssetReceiveModal.vue";
import AssetSavingsModal from "../../components/AssetSavingsModal.vue";
import AssetStorageModal from "../../components/AssetStorageModal.vue";
import SavingsStatsModal from "../../components/SavingsStatsModal.vue";
import CmConfirm from "../../components/CmConfirm.vue";
import { getUsdtVndP2pPrice } from "../../api/market";
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
  getStorage,
  createStorage,
  withdrawFromStorage,
  adjustStorage,
  getStorageHistory,
  updateStorageInitialQuantity,
  deleteStorage,
  deleteStorageHistory,
  updateStorageHistory,
  clearAllWalletData,
  importTransactions,
  importSavings,
  importStorage,
  faucet,
} from "../../api/wallet";
import finzoIcon from "../../assets/images/finzo2.png";
import finzoBanner from "../../assets/images/finzo_banner.png";

const selectedAsset = ref<string | null>(null);

// Summary & Visibility
const isBalanceVisible = ref(
  localStorage.getItem("is_balance_visible") !== "false",
);
const toggleBalanceVisibility = () => {
  isBalanceVisible.value = !isBalanceVisible.value;
  localStorage.setItem("is_balance_visible", isBalanceVisible.value.toString());
};

const portfolioSummary = ref<{
  totalVndValue: number;
  dailyChangeVnd: number;
  dailyChangePercent: number;
  assets: any[];
} | null>(null);

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
          asset.savingsBalance = stat.savingsBalance || 0;
          asset.storageBalance = stat.storageBalance || 0;
          asset.receivedBalance = stat.receivedBalance || 0;
          asset.totalBalance =
            stat.totalBalance ||
            asset.balance + asset.savingsBalance + asset.storageBalance;
        }
      });
    }
  } catch (e) {
    console.error("Failed to fetch portfolio summary:", e);
  }
};



// Transaction History
interface Transaction {
  id: string;
  type: "deposit" | "withdraw" | "receive";
  asset: string;
  quantity: number;
  price: number;
  total: number;
  timestamp: Date;
  status: "completed" | "pending" | "locked";
  // For withdrawals
  avgBuyPriceAtTime?: number;
  profitAmount?: number;
  source?: string;
}
const transactions = ref<Transaction[]>([]);
const selectedTxIds = ref<string[]>([]);
const editingAvgPriceId = ref<string | null>(null);
const editAvgPriceValue = ref<number | null>(null);
const isBulkEditing = ref(false);
const bulkAvgPriceValue = ref<number | null>(null);

const toggleTxSelection = (id: string) => {
  const index = selectedTxIds.value.indexOf(id);
  if (index > -1) {
    selectedTxIds.value.splice(index, 1);
  } else {
    selectedTxIds.value.push(id);
  }
};

const toggleAllSelection = () => {
  if (selectedTxIds.value.length === filteredTransactions.value.length) {
    selectedTxIds.value = [];
  } else {
    selectedTxIds.value = filteredTransactions.value.map((tx) => tx.id);
  }
};

const handleStartEditAvgPrice = (tx: Transaction) => {
  editingAvgPriceId.value = tx.id;
  editAvgPriceValue.value = tx.avgBuyPriceAtTime || 0;
};

const handleSaveAvgPrice = async (tx: Transaction) => {
  if (editAvgPriceValue.value === null || !selectedAsset.value) return;
  try {
    const profitAmount = (tx.price - editAvgPriceValue.value) * tx.quantity;
    await updateWalletTransaction(selectedAsset.value, tx.id, {
      avgBuyPriceAtTime: editAvgPriceValue.value,
      profitAmount: profitAmount,
    });
    editingAvgPriceId.value = null;
    await fetchTransactions();
    await fetchPortfolioSummary();
    showAlert("Đã cập nhật giá trung bình thành công");
  } catch (e: any) {
    showAlert(e.response?.data?.message || "Lỗi khi cập nhật giá trung bình", "danger");
  }
};

const handleBulkUpdateAvgPrice = async () => {
  if (bulkAvgPriceValue.value === null || !selectedAsset.value || selectedTxIds.value.length === 0) return;
  
  const ok = await askConfirm({
    title: "Sửa hàng loạt",
    message: `Bạn có chắc chắn muốn cập nhật giá trung bình cho ${selectedTxIds.value.length} bản ghi đã chọn?`,
    variant: "warning",
  });
  if (!ok) return;

  try {
    const promises = selectedTxIds.value.map(async (id) => {
      const tx = transactions.value.find((t) => t.id === id);
      if (tx && tx.type === 'withdraw') {
        const profitAmount = (tx.price - bulkAvgPriceValue.value!) * tx.quantity;
        return updateWalletTransaction(selectedAsset.value!, id, {
          avgBuyPriceAtTime: bulkAvgPriceValue.value!,
          profitAmount: profitAmount,
        });
      }
    });

    const count = selectedTxIds.value.length;
    await Promise.all(promises);
    selectedTxIds.value = [];
    isBulkEditing.value = false;
    bulkAvgPriceValue.value = null;
    await fetchTransactions();
    await fetchPortfolioSummary();
    showAlert(`Đã cập nhật hàng loạt cho ${count} bản ghi thành công`);
  } catch (e: any) {
    showAlert(e.response?.data?.message || "Lỗi khi cập nhật hàng loạt", "danger");
  }
};

const handleFaucet = async () => {
  if (!selectedAsset.value) return;
  try {
    const ok = await askConfirm({
      title: "Faucet nội bộ",
      message: `Bạn có muốn nhận 1,000 ${selectedAsset.value} miễn phí để thử nghiệm nội bộ không?`,
      variant: "teal",
    });
    if (!ok) return;

    await faucet(selectedAsset.value);
    await fetchTransactions();
    await fetchPortfolioSummary();
    showAlert(`Đã nhận 1,000 ${selectedAsset.value} thành công!`, "teal");
  } catch (e: any) {
    showAlert(e.response?.data?.message || "Lỗi khi gọi faucet", "danger");
  }
};


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
      asset.storageBalance = status.stats.storageBalance || 0;

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

// Sync selectedAsset to localStorage for the API interceptor
watch(selectedAsset, async (newVal) => {
  selectedTxIds.value = []; // Reset selection when asset changes
  if (newVal) {
    localStorage.setItem("active_wallet_asset", newVal);
    await fetchTransactions();
  } else {
    localStorage.removeItem("active_wallet_asset");
  }
});

watch(activeSubTab, () => {
  selectedTxIds.value = []; // Reset selection when tab changes
});


// Receive & Modals Logic
const showDepositModal = ref(false);
const showWithdrawModal = ref(false);
const showReceiveModal = ref(false);
const showSavingsModal = ref(false);
const showStorageModal = ref(false);
const showSavingsStatsModal = ref(false);

const storageList = ref<any[]>([]);
const selectedStorageWallet = ref<any>(null);
const storageHistory = ref<any[]>([]);

const activeSavingsForStorage = computed(() => {
  if (!selectedStorageWallet.value) return [];
  return savingsList.value.filter(
    (s) =>
      s.storageId === selectedStorageWallet.value.id && s.status === "active",
  );
});

const totalStakedFromStorage = computed(() => {
  return activeSavingsForStorage.value.reduce(
    (sum, s) => sum + Number(s.quantity),
    0,
  );
});

const currentAssetStorageWallets = computed(() => {
  if (!selectedAsset.value) return [];
  const symbol = selectedAsset.value.toUpperCase();
  return (storageList.value || []).filter(
    (s) => s.assetSymbol?.toUpperCase() === symbol,
  );
});

watch(showSavingsModal, (newVal) => {
  if (newVal) fetchStorageData();
});
const storageAdjustment = ref({
  amount: null as number | null,
  note: "",
});
const isEditingInitial = ref(false);
const editInitialValue = ref(0);

// Confirmation Modal State
const confirmModal = ref({
  show: false,
  title: "",
  message: "",
  icon: MessageSquareIcon,
  variant: "primary" as "primary" | "danger" | "warning" | "teal",
  showCancel: true,
  confirmText: "Xác nhận",
  cancelText: "Hủy bỏ",
  resolve: null as ((val: boolean) => void) | null,
});

const askConfirm = (options: {
  title: string;
  message: string;
  icon?: any;
  variant?: "primary" | "danger" | "warning" | "teal";
  showCancel?: boolean;
  confirmText?: string;
  cancelText?: string;
}) => {
  confirmModal.value = {
    show: true,
    title: options.title,
    message: options.message,
    icon: options.icon || MessageSquareIcon,
    variant: options.variant || "primary",
    showCancel: options.showCancel !== undefined ? options.showCancel : true,
    confirmText: options.confirmText || "Xác nhận",
    cancelText: options.cancelText || "Hủy bỏ",
    resolve: null,
  };
  return new Promise<boolean>((resolve) => {
    confirmModal.value.resolve = resolve;
  });
};

const handleConfirmAction = () => {
  if (confirmModal.value.resolve) confirmModal.value.resolve(true);
  confirmModal.value.show = false;
};

const handleCancelAction = () => {
  if (confirmModal.value.resolve) confirmModal.value.resolve(false);
  confirmModal.value.show = false;
};

const showAlert = (
  message: string,
  variant: "teal" | "danger" | "warning" = "teal",
) => {
  return askConfirm({
    title:
      variant === "danger"
        ? "Lỗi"
        : variant === "warning"
          ? "Cảnh báo"
          : "Thông báo",
    message,
    icon: variant === "danger" ? AlertTriangleIcon : CheckCircleIcon,
    variant,
    showCancel: false,
    confirmText: "Đóng",
  });
};

const fetchStorageData = async () => {
  try {
    storageList.value = await getStorage();
  } catch (e) {
    console.error("Failed to fetch storage wallets:", e);
  }
};

const handleClearAllAssets = async () => {
  const ok = await askConfirm({
    title: "Làm mới toàn bộ ví",
    message:
      "Hành động này sẽ XOÁ VĨNH VIỄN toàn bộ giao dịch, tiền gửi và ví lưu trữ. Bạn có chắc chắn muốn thực hiện?",
    variant: "danger",
    confirmText: "Xoá tất cả",
  });
  if (!ok) return;

  try {
    await clearAllWalletData();
    // Reset all local states related to assets
    transactions.value = [];
    savingsList.value = [];
    storageList.value = [];
    selectedAsset.value = null;

    await fetchStats();
    await fetchPortfolioSummary();
    await fetchSavingsData();
    await fetchStorageData();

    showAlert("Đã làm mới toàn bộ dữ liệu tài sản của bạn.");
  } catch (e: any) {
    showAlert(
      e?.response?.data?.message || "Lỗi khi làm mới dữ liệu",
      "danger",
    );
  }
};

const submitStorage = async (data: any) => {
  try {
    await createStorage(data);
    showStorageModal.value = false;
    await fetchStorageData();
    await fetchStats();
    await fetchPortfolioSummary();
    showAlert("Đã tạo ví lưu trữ thành công");
  } catch (e: any) {
    showAlert(e?.response?.data?.message || "Lỗi khi tạo ví lưu trữ", "danger");
  }
};

const handleWithdrawFromStorage = async (id: string) => {
  const ok = await askConfirm({
    title: "Xác nhận rút tiền",
    message: "Rút số dư này từ ví lưu trữ về ví khả dụng?",
    variant: "teal",
  });
  if (!ok) return;

  try {
    const res = await withdrawFromStorage(id);
    showAlert(`Đã rút thành công ${res.quantity} về ví khả dụng`);
    selectedStorageWallet.value = null;
    await fetchStorageData();
    await fetchStats();
    await fetchTransactions();
    await fetchPortfolioSummary();
  } catch (e: any) {
    showAlert(
      e?.response?.data?.message || "Lỗi khi rút từ ví lưu trữ",
      "danger",
    );
  }
};

const handleAdjustStorage = async (type: "increase" | "decrease") => {
  if (!selectedStorageWallet.value || !storageAdjustment.value.amount) {
    showAlert("Vui lòng nhập số lượng hợp lệ", "warning");
    return;
  }
  try {
    await adjustStorage(selectedStorageWallet.value.id, {
      type,
      amount: storageAdjustment.value.amount,
      note: storageAdjustment.value.note,
    });

    await fetchStorageData();
    const updated = storageList.value.find(
      (w) => w.id === selectedStorageWallet.value.id,
    );
    if (updated) selectedStorageWallet.value = updated;

    storageHistory.value = await getStorageHistory(
      selectedStorageWallet.value.id,
    );
    storageAdjustment.value = { amount: null, note: "" };

    await fetchStats();
    await fetchPortfolioSummary();
    showAlert(`Đã ${type === "increase" ? "tăng" : "giảm"} số dư thành công`);
  } catch (e: any) {
    showAlert(e?.response?.data?.message || "Lỗi khi cập nhật số dư", "danger");
  }
};

const openStorageDetails = async (wallet: any) => {
  selectedStorageWallet.value = wallet;
  isEditingInitial.value = false;
  editInitialValue.value = wallet.initialQuantity;
  storageHistory.value = [];
  try {
    storageHistory.value = await getStorageHistory(wallet.id);
  } catch (e) {
    console.error("Failed to fetch storage history", e);
  }
};

const handleSaveInitial = async () => {
  if (!selectedStorageWallet.value) return;
  try {
    await updateStorageInitialQuantity(
      selectedStorageWallet.value.id,
      editInitialValue.value,
    );
    await fetchStorageData();
    const updated = storageList.value.find(
      (w) => w.id === selectedStorageWallet.value.id,
    );
    if (updated) selectedStorageWallet.value = updated;
    isEditingInitial.value = false;
    await fetchStats();
    showAlert("Đã cập nhật vốn nạp gốc thành công");
  } catch (e: any) {
    showAlert(
      e?.response?.data?.message || "Lỗi khi cập nhật tổng nạp",
      "danger",
    );
  }
};

const handleDeleteStorage = async (id: string) => {
  const ok = await askConfirm({
    title: "Xoá ví lưu trữ",
    message:
      "Bạn có chắc chắn muốn xoá ví này? Toàn bộ lịch sử biến động cũng sẽ bị xoá vĩnh viễn.",
    variant: "danger",
    confirmText: "Xoá ngay",
  });
  if (!ok) return;

  try {
    await deleteStorage(id);
    selectedStorageWallet.value = null;
    await fetchStorageData();
    await fetchStats();
    await fetchPortfolioSummary();
    showAlert("Đã xoá ví thành công");
  } catch (e: any) {
    showAlert(e?.response?.data?.message || "Lỗi khi xoá ví", "danger");
  }
};

const handleDeleteHistory = async (id: string) => {
  const ok = await askConfirm({
    title: "Xoá lịch sử",
    message: "Bạn có chắc chắn muốn xoá bản ghi lịch sử này?",
    variant: "danger",
  });
  if (!ok) return;

  try {
    await deleteStorageHistory(id);
    if (selectedStorageWallet.value) {
      storageHistory.value = await getStorageHistory(
        selectedStorageWallet.value.id,
      );
    }
    showAlert("Đã xoá lịch sử thành công");
  } catch (e: any) {
    showAlert(e?.response?.data?.message || "Lỗi khi xoá lịch sử", "danger");
  }
};

const handleEditHistory = async (item: any) => {
  const newNote = prompt("Nhập ghi chú mới:", item.note || "");
  if (newNote === null) return;
  try {
    await updateStorageHistory(item.id, { note: newNote });
    if (selectedStorageWallet.value) {
      storageHistory.value = await getStorageHistory(
        selectedStorageWallet.value.id,
      );
    }
    showAlert("Đã cập nhật ghi chú thành công");
  } catch (e: any) {
    showAlert(
      e?.response?.data?.message || "Lỗi khi cập nhật lịch sử",
      "danger",
    );
  }
};

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
    await fetchStorageData();
    showAlert("Đã gửi lãi thành công");
  } catch (e: any) {
    showAlert(e?.response?.data?.message || "Lỗi khi gửi lãi", "danger");
  }
};

const handleWithdrawSavings = async (id: string) => {
  const ok = await askConfirm({
    title: "Rút tiền gửi lãi",
    message: "Bạn có chắc chắn muốn rút số tiền này về ví không?",
    variant: "warning",
  });
  if (!ok) return;

  try {
    const res = await withdrawSavings(id);
    showAlert(
      `Đã rút thành công ${res.totalAmount} về ví (Bao gồm ${res.accruedInterest} tiền lãi)`,
    );
    await fetchSavingsData();
    await fetchStats();
    await fetchPortfolioSummary();
    await fetchStorageData();
  } catch (e: any) {
    showAlert(e?.response?.data?.message || "Lỗi khi rút tiền gửi", "danger");
  }
};

// const handleDeleteSavings = async (id: string) => {
//   const ok = await askConfirm({
//     title: "Xoá sổ tiền gửi",
//     message: "Bạn có chắc chắn muốn xoá vĩnh viễn sổ tiền gửi này? (Lưu ý: Tiền sẽ KHÔNG được trả lại ví)",
//     variant: "danger",
//     confirmText: "Xoá sổ",
//   });
//   if (!ok) return;

//   try {
//     await deleteSavings(id);
//     await fetchSavingsData();
//     await fetchStats();
//     await fetchPortfolioSummary();
//     showAlert("Đã xoá sổ tiền gửi thành công");
//   } catch (e: any) {
//     showAlert(e?.response?.data?.message || "Lỗi khi xoá sổ tiền gửi", "danger");
//   }
// };

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

// Deposit Statistics
const depositDateFilter = ref<"all" | "today" | "month" | "checkpoint">("all");
const depositCheckpointDate = ref<string | null>(
  localStorage.getItem("deposit_checkpoint_date"),
);

const setDepositCheckpoint = () => {
  const now = new Date().toISOString();
  depositCheckpointDate.value = now;
  localStorage.setItem("deposit_checkpoint_date", now);
  depositDateFilter.value = "checkpoint";
};

const manualSetCheckpoint = (val: string) => {
  if (!val) return;
  const d = new Date(val);
  d.setHours(0, 0, 0, 0);
  const iso = d.toISOString();
  depositCheckpointDate.value = iso;
  localStorage.setItem("deposit_checkpoint_date", iso);
  depositDateFilter.value = "checkpoint";
};

const depositStats = computed(() => {
  const depositTransactions = transactions.value.filter(
    (t) =>
      t.asset === selectedAsset.value &&
      t.type === "deposit" &&
      t.status !== "locked",
  );

  let filtered = depositTransactions;
  const now = new Date();

  if (depositDateFilter.value === "today") {
    filtered = depositTransactions.filter((t) => {
      const d = new Date(t.timestamp);
      return (
        d.getDate() === now.getDate() &&
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear()
      );
    });
  } else if (depositDateFilter.value === "month") {
    filtered = depositTransactions.filter((t) => {
      const d = new Date(t.timestamp);
      return (
        d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
      );
    });
  } else if (
    depositDateFilter.value === "checkpoint" &&
    depositCheckpointDate.value
  ) {
    const checkpoint = new Date(depositCheckpointDate.value);
    filtered = depositTransactions.filter(
      (t) => new Date(t.timestamp) >= checkpoint,
    );
  }

  const totalQuantity = filtered.reduce((sum, t) => sum + t.quantity, 0);
  const totalCost = filtered.reduce((sum, t) => sum + t.total, 0);

  return {
    totalQuantity,
    avgPrice: totalQuantity > 0 ? totalCost / totalQuantity : 0,
    count: filtered.length,
  };
});

// Realized Statistics from withdrawals
const realizedStats = computed(() => {
  const sellTransactions = transactions.value.filter(
    (t) =>
      t.asset === selectedAsset.value &&
      t.type === "withdraw" &&
      t.status !== "locked",
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

  const relevant = transactions.value.filter(
    (t) => t.asset === selectedAsset.value,
  );

  let result = relevant;
  if (activeSubTab.value === "transfer") {
    result = relevant.filter((t) => t.status === "locked");
  } else if (activeSubTab.value === "withdraw") {
    result = relevant.filter(
      (t) => t.type === "withdraw" && t.status !== "locked",
    );
  } else {
    result = relevant.filter((t) => t.type === activeSubTab.value);
  }

  return result.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
});

const filteredSavingsList = computed(() => {
  if (!selectedAsset.value) return savingsList.value;
  return savingsList.value.filter((s) => s.assetSymbol === selectedAsset.value);
});

const filteredStorageList = computed(() => {
  if (!selectedAsset.value) return storageList.value;
  return storageList.value.filter((s) => s.assetSymbol === selectedAsset.value);
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
    showAlert(
      `Phiên làm việc của ví ${asset} đã hết hạn. Vui lòng mở khóa lại.`,
      "warning",
    );
  }
};

onMounted(() => {
  window.addEventListener("wallet-token-expired", handleTokenExpired);
  refreshPrice();
  fetchPortfolioSummary();
  fetchSavingsData();
  fetchStorageData();
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
        asset.storageBalance = status.stats.storageBalance || 0;
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
  const storageBalance = selectedAssetData.value.storageBalance || 0;
  const receivedBalance = selectedAssetData.value.receivedBalance || 0;

  // Available = Main Wallet + Storage Wallets
  // Frozen = Savings
  // Total = Available + Frozen
  const totalOwnership = balance + storageBalance + savingsBalance;

  if (includeReceivedInStats.value) {
    return totalOwnership;
  } else {
    return Math.max(0, totalOwnership - receivedBalance);
  }
});

const walletBalanceOnly = computed(() => {
  if (!selectedAssetData.value) return 0;
  const balance = selectedAssetData.value.balance || 0;
  if (includeReceivedInStats.value) return balance;

  const receivedBalance = selectedAssetData.value.receivedBalance || 0;
  return Math.max(0, balance - receivedBalance);
});

const storageBalanceOnly = computed(() => {
  if (!selectedAssetData.value) return 0;
  return selectedAssetData.value.storageBalance || 0;
});

const frozenBalanceOnly = computed(() => {
  if (!selectedAssetData.value) return 0;
  return selectedAssetData.value.savingsBalance || 0;
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
    storageBalance: 0,
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
    storageBalance: 0,
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
    storageBalance: 0,
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
    storageBalance: 0,
    totalBalance: 0,
    bgClass: "bg-red-500/10",
    textClass: "text-red-500",
    gradClass: "from-red-500/20 to-red-500",
  },
  {
    name: "Finzo Token",
    symbol: "FZ",
    icon: "F",
    image: finzoIcon,
    balance: 0,
    receivedBalance: 0,
    totalInvested: 0,
    totalInvestedPortfolio: 0,
    savingsBalance: 0,
    storageBalance: 0,
    totalBalance: 0,
    bgClass: "bg-purple-500/10",
    textClass: "text-purple-400",
    gradClass: "from-purple-500/20 to-purple-600",
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
        if (depositForm.value.source === "VND") {
          const vndAsset = assets.value.find((a) => a.symbol === "VND");
          if (vndAsset && vndAsset.balance < totalCost) {
            showAlert(
              "Số dư ví VND không đủ để thực hiện giao dịch",
              "warning",
            );
            return;
          }
        }

        await createWalletTransaction({
          assetSymbol: selectedAsset.value!,
          type: "deposit",
          quantity: Number(depositForm.value.quantity),
          price:
            selectedAsset.value === "VND" ? 1 : Number(depositForm.value.price),
          total: totalCost,
          source: depositForm.value.source || undefined,
        });

        await fetchTransactions();
        await fetchPortfolioSummary();
        await fetchStats();
        showAlert("Giao dịch nạp tiền đã được ghi lại");
      } catch (e: any) {
        showAlert(
          e.response?.data?.message || "Lỗi khi lưu giao dịch nạp",
          "danger",
        );
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
        showAlert("Đã ghi nhận giao dịch nhận tiền");
      } catch (e: any) {
        showAlert(
          e.response?.data?.message || "Lỗi khi lưu giao dịch nhận",
          "danger",
        );
      }
    }
  }

  // Reset and close
  receiveForm.value = { quantity: null };
  showReceiveModal.value = false;
};

const deleteTransaction = async (id: string) => {
  if (!selectedAsset.value) return;

  const ok = await askConfirm({
    title: "Xoá giao dịch",
    message: "Bạn có chắc chắn muốn xoá giao dịch này?",
    variant: "danger",
  });
  if (!ok) return;

  try {
    await deleteWalletTransaction(selectedAsset.value, id);
    await fetchTransactions();
    await fetchPortfolioSummary();
    showAlert("Đã xoá giao dịch thành công");
  } catch (e: any) {
    showAlert(e.response?.data?.message || "Không thể xoá giao dịch", "danger");
  }
};

const handleEdit = (tx: Transaction) => {
  console.log("Edit tx:", tx);
  showAlert("Chức năng chỉnh sửa đang được phát triển", "warning");
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

        await fetchTransactions();
        await fetchPortfolioSummary();
        await fetchStats();
        showAlert("Giao dịch rút tiền thành công");
      } catch (e: any) {
        showAlert(
          e.response?.data?.message || "Lỗi khi lưu giao dịch rút",
          "danger",
        );
      }
    }
  }

  withdrawForm.value = { quantity: null, price: null, source: null };
  showWithdrawModal.value = false;
};

// Export & Import Logic
const importFileInput = ref<HTMLInputElement | null>(null);

const triggerImport = () => {
  importFileInput.value?.click();
};

const handleExport = () => {
  let dataToExport: any = [];
  let fileName = "";

  if (
    ["deposit", "withdraw", "receive", "transfer"].includes(activeSubTab.value)
  ) {
    dataToExport = filteredTransactions.value;
    fileName = `transactions_${activeSubTab.value}_${selectedAsset.value || "all"}.json`;
  } else if (activeSubTab.value === "savings") {
    dataToExport = filteredSavingsList.value;
    fileName = `savings_${selectedAsset.value || "all"}.json`;
  } else if (activeSubTab.value === "storage") {
    dataToExport = filteredStorageList.value;
    fileName = `storage_${selectedAsset.value || "all"}.json`;
  }

  const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
};

const handleImport = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async (e) => {
    try {
      const json = JSON.parse(e.target?.result as string);
      if (!Array.isArray(json)) {
        showAlert("Dữ liệu JSON phải là một mảng", "danger");
        return;
      }

      const ok = await askConfirm({
        title: "Xác nhận nhập dữ liệu",
        message: `Bạn có chắc chắn muốn nhập ${json.length} bản ghi?`,
        variant: "warning",
      });
      if (!ok) return;

      if (
        ["deposit", "withdraw", "receive", "transfer"].includes(
          activeSubTab.value,
        )
      ) {
        await importTransactions(json);
        await fetchTransactions();
      } else if (activeSubTab.value === "savings") {
        await importSavings(json);
        await fetchSavingsData();
      } else if (activeSubTab.value === "storage") {
        await importStorage(json);
        await fetchStorageData();
      }

      showAlert("Nhập dữ liệu thành công");
      await fetchStats();
      await fetchPortfolioSummary();
    } catch (err: any) {
      console.error(err);
      showAlert(
        `Lỗi khi đọc file hoặc nhập dữ liệu: ${err.message || "Lỗi không xác định"}`,
        "danger",
      );
    } finally {
      if (importFileInput.value) importFileInput.value.value = "";
    }
  };
  reader.readAsText(file);
};
</script>
