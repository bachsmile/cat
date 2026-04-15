<template>
  <div class="animate-in fade-in duration-500 pb-20">
    <!-- 🏗️ Master Quad-Grid Layout (Luxury Asset Management) -->
    <div class="grid grid-cols-12 gap-8 mb-12">
      <!-- 💳 CARD 1: TOTAL BALANCE (ELITE GLASS) -->
      <div class="col-span-12 lg:col-span-4 h-[380px]">
        <div
          class="h-full glass-vibrant p-8 rounded-[32px] relative overflow-hidden flex flex-col justify-between group shadow-[0_40px_100px_rgba(0,0,0,0.8)] border-[#FFD700]/10"
        >
          <div
            class="absolute -top-20 -left-20 w-64 h-64 bg-[#FFD700]/10 rounded-full blur-[80px]"
          ></div>

          <div class="relative z-10 text-left">
            <div class="flex items-center gap-4 mb-8">
              <div
                class="w-2 h-8 bg-gold-vibrant rounded-full shadow-[0_0_15px_#FFD700]"
              ></div>
              <p
                class="text-[11px] text-[#FFD700] font-black uppercase tracking-[0.4em]"
              >
                Hệ thống tài sản
              </p>
            </div>
            <div class="flex items-center justify-between mb-4">
              <h4
                class="text-xs font-black text-gray-500 uppercase tracking-widest"
              >
                Tổng tài sản khả dụng (VND)
              </h4>
              <button
                @click="toggleBalanceVisibility"
                class="p-2 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-all text-gray-400"
              >
                <component
                  :is="isBalanceVisible ? EyeOffIcon : EyeIcon"
                  class="w-4 h-4"
                />
              </button>
            </div>
            <div class="flex items-baseline gap-4">
              <h2
                class="text-4xl md:text-5xl font-black text-white italic tracking-tighter"
              >
                {{
                  isBalanceVisible ? fmtNumber(displayValuation) : "••••••••"
                }}
                <span class="text-lg text-gray-600 ml-2 not-italic">₫</span>
              </h2>
            </div>
          </div>

          <div
            class="relative z-10 pt-10 border-t border-white/5 flex justify-between items-end"
          >
            <div>
              <p class="text-[10px] text-gray-500 font-bold uppercase mb-2">
                Hiệu suất trong ngày
              </p>
              <div class="flex items-center gap-3">
                <div
                  v-if="displayPerformanceVnd >= 0"
                  class="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400"
                >
                  <ArrowUpRightIcon class="w-5 h-5" />
                </div>
                <div
                  v-else
                  class="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-400"
                >
                  <ArrowDownLeftIcon class="w-5 h-5" />
                </div>
                <div class="text-left">
                  <p class="text-2xl font-black text-white italic">
                    {{ displayPerformanceVnd >= 0 ? "+" : ""
                    }}{{ fmtNumber(displayPerformanceVnd) }} ₫
                  </p>
                  <p
                    class="text-xs font-black mt-1"
                    :class="
                      displayPerformancePercent >= 0
                        ? 'text-emerald-400'
                        : 'text-red-400'
                    "
                  >
                    {{ displayPerformancePercent >= 0 ? "+" : ""
                    }}{{ displayPerformancePercent.toFixed(2) }}%
                  </p>
                </div>
              </div>
            </div>
            <div
              class="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/5"
            >
              <ActivityIcon class="w-6 h-6 text-[#FFD700]" />
            </div>
          </div>
        </div>
      </div>

      <!-- 📈 CARD 4: GROWTH CHART (ANALYTIC GLASS) -->
      <div class="col-span-12 lg:col-span-8 h-[380px]">
        <div
          class="h-full glass-vibrant p-8 rounded-[32px] relative overflow-hidden flex flex-col shadow-[0_40px_100px_rgba(0,0,0,0.8)] border-white/5 group"
        >
          <div class="flex justify-between items-center mb-10 text-left">
            <div>
              <h4
                class="text-xl font-black text-white uppercase tracking-tighter"
              >
                Tăng trưởng tài sản
              </h4>
              <p
                class="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-2"
              >
                Biên độ dòng vốn theo thời gian thực
              </p>
            </div>
            <div class="flex gap-4">
              <button
                v-for="t in ['1D', '1W', '1M']"
                :key="t"
                class="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black hover:bg-[#FFD700] hover:text-black transition-all"
              >
                {{ t }}
              </button>
            </div>
          </div>

          <div
            class="flex-1 relative mt-4 min-h-0 rounded-3xl bg-black/20 border border-white/5 overflow-hidden"
          >
            <template v-if="growthStats.length > 0">
              <div class="absolute inset-0 pt-2 pb-2">
                <Line :data="growthChartData" :options="growthChartOptions" />
              </div>
            </template>
            <template v-else>
              <div class="h-full flex items-end gap-[1px]">
                <div
                  v-for="i in 15"
                  :key="i"
                  class="flex-1 h-full relative group/col"
                >
                  <div
                    class="absolute bottom-0 w-full bg-white/5 rounded-t-sm animate-pulse"
                    :style="{
                      height:
                        [40, 70, 55, 90, 60, 45, 80, 50, 65, 30][i % 10] + '%',
                    }"
                  ></div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>

      <!-- 💵 CARD 3: USDT CURRENT PRICE (LIVE ORACLE) -->
      <div class="col-span-12 lg:col-span-4 h-[300px]">
        <div
          class="h-full glass-vibrant p-8 rounded-[32px] relative overflow-hidden flex flex-col justify-center border-emerald-500/20 shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
        >
          <div
            class="absolute -inset-10 bg-emerald-500/5 blur-[50px] -z-10"
          ></div>
          <div class="text-left">
            <div class="flex items-center gap-4 mb-8">
              <div
                class="w-10 h-10 rounded-full bg-emerald-500 text-black flex items-center justify-center font-black"
              >
                ₮
              </div>
              <p
                class="text-[11px] text-emerald-400 font-black uppercase tracking-[0.4em]"
              >
                CỔNG_TỶ_GIÁ_USDT
              </p>
            </div>
            <h4
              class="text-xs font-black text-gray-500 uppercase tracking-widest mb-4"
            >
              Giá thị trường hiện tại (VND)
            </h4>
            <div class="flex items-baseline gap-4">
              <h2
                class="text-4xl md:text-5xl font-black text-white italic tracking-tighter"
              >
                {{ currentUsdtPrice ? fmtNumber(currentUsdtPrice) : "..." }}
              </h2>
              <span class="text-xl font-black text-emerald-500 italic">₫</span>
            </div>
            <div class="mt-6 flex items-center gap-3">
              <span
                class="text-[9px] font-black text-emerald-400/60 uppercase tracking-widest"
                >ĐỒNG BỘ THỜI GIAN THỰC TỪ BINANCE</span
              >
              <div
                class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 📂 CARD 2: ASSET WALLETS (INTELLIGENT FOLDER) -->
      <div class="col-span-12 lg:col-span-8 h-[300px]">
        <div
          class="h-full glass-vibrant p-8 rounded-[32px] relative overflow-hidden border-[#FFD700]/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] flex flex-col"
        >
          <div class="flex justify-between items-center mb-10 text-left">
            <h4
              class="text-xs font-black text-[#FFD700] uppercase tracking-[0.4em]"
            >
              DANH MỤC TÀI SẢN HỆ THỐNG
            </h4>
            <div class="flex items-center gap-4">
              <span
                class="text-[10px] font-bold text-gray-500 uppercase tracking-widest"
                >{{ assets.length }} LOẠI TÀI SẢN ĐANG HOẠT ĐỘNG</span
              >
              <div
                @click="refreshAllData"
                class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-[#FFD700] hover:text-black transition-all"
                title="Cập nhật dữ liệu"
              >
                <RefreshCwIcon class="w-4 h-4" />
              </div>
              <div
                @click="handleResetAll"
                class="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center cursor-pointer hover:bg-red-500 hover:text-white transition-all ml-2"
                title="Xóa toàn bộ dữ liệu"
              >
                <Trash2Icon class="w-4 h-4" />
              </div>
            </div>
          </div>

          <div class="flex-1 grid grid-cols-4 gap-6 items-center">
            <div
              v-for="asset in assets.slice(0, 4)"
              :key="asset.symbol"
              class="bg-[#0A0A0B] border border-white/5 rounded-3xl p-6 flex flex-col items-center gap-3 hover:border-[#FFD700]/40 transition-all group/wallet cursor-pointer relative"
              @click="handleAssetClick(asset.symbol)"
            >
              <div
                class="w-12 h-12 rounded-full flex items-center justify-center text-xl font-black group-hover/wallet:scale-110 transition-transform shadow-inner overflow-hidden"
                :class="asset.textClass"
              >
                <img
                  v-if="asset.image"
                  :src="asset.image"
                  class="w-full h-full object-cover"
                />
                <span v-else>{{ asset.icon }}</span>
              </div>
              <div class="text-center">
                <p
                  class="text-[11px] font-black text-white hover:text-[#FFD700]"
                >
                  {{ asset.symbol }}
                </p>
                <p
                  class="text-xs font-black text-[#FFD700] mt-1"
                  v-if="isUnlocked(asset.symbol)"
                >
                  {{
                    isBalanceVisible
                      ? fmtNumber(
                          (asset.balance || 0) + (asset.savingsBalance || 0),
                        )
                      : "••••"
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 🛡️ Security Layer: Password Prompt -->
    <AssetPasswordPrompt
      v-if="selectedAsset && !isUnlocked(selectedAsset)"
      :pendingAsset="selectedAsset"
      :modelValue="passwordInput"
      @update:modelValue="passwordInput = $event"
      :error="walletError"
      :isSetup="!configuredAssets.includes(selectedAsset)"
      @cancel="
        selectedAsset = null;
        passwordInput = '';
        walletError = '';
      "
      @submit="handlePasswordSubmit"
    />

    <!-- 🏦 Wallet Dashboard (Detailed Management) -->
    <div
      v-if="selectedAsset && isUnlocked(selectedAsset)"
      class="animate-in slide-in-from-bottom duration-700"
    >
      <div class="flex items-center justify-between gap-6 mb-12">
        <div class="flex items-center gap-6">
          <button
            @click="router.push('/inventory')"
            class="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all"
          >
            <ArrowLeftIcon class="w-6 h-6" />
          </button>
          <div class="flex flex-col text-left">
            <h2
              class="text-3xl font-black text-white uppercase tracking-tighter"
            >
              Trình quản lý
              {{ assets.find((a) => a.symbol === selectedAsset)?.name }}
            </h2>
            <p
              class="text-[10px] text-[#FFD700] font-black uppercase tracking-[0.4em] mt-2"
            >
              MÃ ĐỊNH DANH TÀI SẢN: {{ selectedAsset }}
            </p>
          </div>
        </div>

        <!-- 🏢 Elite Management Actions (Import/Export) -->
        <div class="flex items-center gap-4">
          <button
            @click="handleExport"
            class="px-6 py-3 rounded-2xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-white hover:border-white/20 transition-all flex items-center gap-3"
          >
            <DownloadIcon class="w-4 h-4" /> EXPORT
          </button>
          <button
            @click="handleImport"
            class="px-6 py-3 rounded-2xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-white hover:border-white/20 transition-all flex items-center gap-3"
          >
            <UploadIcon class="w-4 h-4" /> IMPORT
          </button>
          <button
            @click="handleAction('Deposit')"
            class="px-8 py-3 rounded-2xl bg-[#FFD700] text-black text-[10px] font-black uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(255,215,0,0.2)] hover:scale-105 active:scale-95 transition-all"
          >
            THỰC HIỆN NGHIỆP VỤ
          </button>
        </div>
      </div>

      <!-- 🎮 Quick Action Nexus: Centralized Operations -->
      <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6 mb-12">
        <div
          v-for="action in [
            {
              id: 'Deposit',
              label: 'Nạp Tín dụng',
              icon: PlusIcon,
              desc: 'Vốn pháp định & Hệ thống',
              color: 'from-emerald-500/20 to-emerald-500/5',
              iconColor: 'text-emerald-400',
              shadow: 'shadow-emerald-500/20',
            },
            {
              id: 'Withdraw',
              label: 'Rút Tài sản',
              icon: ArrowUpRightIcon,
              desc: 'Tất toán về ví cá nhân',
              color: 'from-red-500/20 to-red-500/5',
              iconColor: 'text-red-400',
              shadow: 'shadow-red-500/20',
            },
            {
              id: 'Savings',
              label: 'Gửi Tiết kiệm',
              icon: PiggyBankIcon,
              desc: 'Mở rộng dòng vốn lãi',
              color: 'from-indigo-500/20 to-indigo-500/5',
              iconColor: 'text-indigo-400',
              shadow: 'shadow-indigo-500/20',
            },
            {
              id: 'Storage',
              label: 'Lưu trữ Lạnh',
              icon: StorageIcon,
              desc: 'Bảo mật kho lưu trữ',
              color: 'from-orange-500/20 to-orange-500/5',
              iconColor: 'text-orange-400',
              shadow: 'shadow-orange-500/20',
            },
            {
              id: 'Swap',
              label: 'Chuyển đổi',
              icon: RefreshCwIcon,
              desc: 'Luân chuyển nội bộ',
              color: 'from-[#FFD700]/20 to-[#FFD700]/5',
              iconColor: 'text-gold-vibrant',
              shadow: 'shadow-gold-vibrant/20',
            },
            {
              id: 'Loans',
              label: 'Cho Vay',
              icon: HandCoinsIcon,
              desc: 'Tín dụng đối tác',
              color: 'from-pink-500/20 to-pink-500/5',
              iconColor: 'text-pink-400',
              shadow: 'shadow-pink-500/20',
            },
          ]"
          :key="action.id"
          @click="handleAction(action.id)"
          class="glass-vibrant p-6 rounded-[32px] border-white/5 hover:border-white/20 transition-all cursor-pointer group/action text-left relative overflow-hidden active:scale-95"
          :class="action.shadow"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br opacity-0 group-hover/action:opacity-100 transition-opacity duration-500"
            :class="action.color"
          ></div>
          <div class="relative z-10">
            <div
              class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 border border-white/10 group-hover/action:scale-110 group-hover:text-gold-vibrant transition-all"
              :class="action.iconColor"
            >
              <component :is="action.icon" class="w-5 h-5" />
            </div>
            <h5
              class="text-[11px] font-bold text-white uppercase tracking-widest mb-1.5"
            >
              {{ action.label }}
            </h5>
            <p
              class="text-[8px] text-gray-700 font-medium uppercase tracking-tighter leading-none"
            >
              {{ action.desc }}
            </p>
          </div>
        </div>
      </div>

      <!-- 🏗️ Legacy Business Navigator (Tabs) -->
      <div
        class="flex items-center gap-8 mb-12 border-b border-white/5 overflow-x-auto no-scrollbar"
      >
        <button
          v-for="tab in [
            { id: 'overview', label: 'Tổng quan' },
            { id: 'deposit', label: 'Quản lý nạp' },
            { id: 'withdraw', label: 'Quản lý rút' },
            { id: 'receive', label: 'Quản lý nhận' },
            { id: 'swap', label: 'Quản lý chuyển đổi' },
            { id: 'savings', label: 'Quản lý tiền gửi' },
            { id: 'loans', label: 'Quản lý cho vay' },
            { id: 'storage', label: 'Ví lưu trữ' },
          ]"
          :key="tab.id"
          @click="activeTab = tab.id"
          class="pb-6 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative shrink-0"
          :class="
            activeTab === tab.id
              ? 'text-[#FFD700]'
              : 'text-gray-500 hover:text-white'
          "
        >
          {{ tab.label }}
          <div
            v-if="activeTab === tab.id"
            class="absolute bottom-0 left-0 w-full h-0.5 bg-[#FFD700] shadow-[0_0_15px_#FFD700]"
          ></div>
        </button>
      </div>

      <!-- 🏗️ Asset Strategic Management Hub -->
      <div v-if="selectedAsset || activeTab === 'loans'" class="animate-in fade-in duration-700">
        <!-- 🎯 TAB: TỔNG QUAN (Strategic Hub) -->
        <AssetOverviewHub
          v-if="activeTab === 'overview'"
          :selectedAsset="selectedAsset"
          :transactions="transactions"
          :currentAssetBalance="currentAssetBalance"
          :assetData="currentAssetData"
          :assetStats="assetStats"
          :profitChartData="profitChartData"
          :totalCapitalPnl="totalCapitalPnl"
          :capitalPackages="capitalPackages"
          :formatNumber="fmtNumber"
          :formatDateTime="fmtDateTime"
        />

        <!-- 🎯 TAB: HÀNH ĐỘNG NGHIỆP VỤ (Ledgers) -->
        <AssetTransactionLedger
          v-if="['deposit', 'withdraw', 'receive', 'swap'].includes(activeTab)"
          v-model:selectedMonth="selectedMonth"
          :transactions="filteredTransactions"
          :availableMonths="availableMonths"
          :formatNumber="fmtNumber"
          :formatDateTime="fmtDateTime"
        />

        <!-- 🎯 TAB: TIỀN GỬI (Nexus) -->
        <AssetSavingsNexus
          v-if="activeTab === 'savings'"
          :selectedAsset="selectedAsset"
          :savingsSummary="savingsSummary"
          :formatNumber="fmtNumber"
          :formatDateTime="fmtDateTime"
          @openModal="showSavingsModal = true"
          @withdraw="handleWithdrawSavings"
          @delete="handleDeleteSavings"
        />

        <!-- 🎯 TAB: QUẢN LÝ CHO VAY -->
        <div
          v-if="activeTab === 'loans'"
          class="animate-in fade-in duration-500"
        >
          <LoansManagementView 
            :key="loansRefreshKey" 
            :asset="selectedAsset" 
            :assetBalance="currentAssetBalance"
            :assetSymbol="selectedAsset || 'VND'"
            @updated="refreshAllData"
          />
        </div>

        <!-- 🎯 TAB: LƯU TRỮ (Nexus) -->
        <AssetStorageNexus
          v-if="activeTab === 'storage'"
          :selectedAsset="selectedAsset"
          :storageWallets="storageWallets"
          :formatNumber="fmtNumber"
          @openModal="showStorageModal = true"
          @withdraw="handleWithdrawStorage"
        />
      </div>
    </div>

    <!-- 📂 Global Archive View (Home State) -->
    <div
      v-if="!selectedAsset && activeTab === 'overview'"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
    >
      <AssetCard
        v-for="asset in assets"
        :key="asset.symbol"
        :asset="asset"
        :isActive="selectedAsset === asset.symbol"
        :isUnlocked="isUnlocked(asset.symbol)"
        :isVisible="isBalanceVisible"
        :hasPassword="configuredAssets.includes(asset.symbol)"
        :livePrice="
          asset.symbol === 'USDT' ? (currentUsdtPrice ?? undefined) : undefined
        "
        @click="handleAssetClick"
      />
    </div>

    <!-- 📥 Actions: Modals -->
    <AssetDepositModal
      v-if="showDepositModal"
      :selectedAsset="selectedAsset || ''"
      v-model:formData="depositForm"
      :totalAmount="totalDepositAmount"
      :vndBalance="vndBalance"
      @close="showDepositModal = false"
      @submit="handleDepositSubmit"
    />
    <AssetWithdrawModal
      v-if="showWithdrawModal"
      :selectedAsset="selectedAsset || ''"
      v-model:formData="withdrawForm"
      :availableBalance="currentAssetBalance"
      :totalAmount="totalWithdrawAmount"
      :capitalPackages="capitalPackages"
      @close="showWithdrawModal = false"
      @submit="handleWithdrawSubmit"
    />
    <AssetSavingsModal
      v-if="showSavingsModal"
      :selectedAsset="selectedAsset"
      :availableBalance="currentAssetBalance"
      :storageWallets="storageWallets"
      @close="showSavingsModal = false"
      @submit="handleSavingsSubmit"
      @refresh="refreshAllData"
    />
    <AssetStorageModal
      v-if="showStorageModal"
      :selectedAsset="selectedAsset"
      :availableBalance="currentAssetBalance"
      @close="showStorageModal = false"
      @submit="handleStorageSubmit"
      @refresh="refreshAllData"
    />
    <AssetSwapModal
      v-if="showSwapModal"
      :selectedAsset="selectedAsset || ''"
      :availableBalance="currentAssetBalance"
      :currentPrice="currentAssetData?.price || 0"
      :capitalPackages="capitalPackages"
      :formatNumber="fmtNumber"
      @close="showSwapModal = false"
      @submit="handleSwapSubmit"
    />

    <!-- 🌟 ACTION NEXUS: QUICK ADD LOAN MODAL 🌟 -->
    <div
      v-if="showAddLoanModal"
      class="fixed inset-0 z-[500] flex items-center justify-center bg-black/80 backdrop-blur-sm"
    >
      <div class="glass-vibrant p-10 rounded-[40px] w-[500px]">
        <h3 class="text-2xl font-black text-white uppercase mb-8">
          Thêm Khoản Vay ({{ selectedAsset || 'VND' }})
        </h3>
        <div class="space-y-6">
          <div>
            <label
              class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2"
              >Người vay</label
            >
            <input
              v-model="newLoan.borrower"
              type="text"
              class="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[#FFD700] transition-colors"
              placeholder="Trần Văn A"
            />
          </div>
          <div>
            <div class="flex justify-between items-center mb-2">
              <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Số tiền ({{ selectedAsset || 'VND' }})</label>
              <span class="text-[10px] font-black text-[#FFD700] uppercase tracking-widest italic opacity-80 cursor-pointer hover:opacity-100 transition-opacity" @click="newLoan.amount = currentAssetBalance">Khả dụng: {{ fmtNumber(currentAssetBalance) }} {{ selectedAsset || 'VND' }}</span>
            </div>
            <input
              v-model.number="newLoan.amount"
              type="number"
              class="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[#FFD700] transition-colors"
              :class="{ 'border-red-500/50 text-red-400': (newLoan.amount ?? 0) > currentAssetBalance }"
              placeholder="0.00"
            />
            <p v-if="(newLoan.amount ?? 0) > currentAssetBalance" class="text-[9px] font-bold text-red-500 uppercase mt-2 italic">Vượt quá thanh khoản ví (Chỉ còn {{ fmtNumber(currentAssetBalance) }} {{ selectedAsset || 'VND' }})</p>
          </div>
          <div
            class="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 cursor-pointer"
            @click="newLoan.hasInterest = !newLoan.hasInterest"
          >
            <div
              class="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center transition-colors"
              :class="
                newLoan.hasInterest
                  ? 'bg-[#FFD700] border-[#FFD700]'
                  : 'bg-transparent'
              "
            >
              <div
                v-if="newLoan.hasInterest"
                class="w-2 h-2 bg-black rounded-full"
              ></div>
            </div>
            <label
              class="text-sm font-bold text-white uppercase tracking-wider cursor-pointer"
              >Tính lãi định kỳ</label
            >
          </div>

          <div
            v-if="newLoan.hasInterest"
            class="animate-in fade-in slide-in-from-top-2 duration-300"
          >
            <label
              class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2"
              >Lãi suất (%)</label
            >
            <input
              v-model.number="newLoan.interestRate"
              type="number"
              class="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
              placeholder="Ví dụ: 10"
            />
          </div>
        </div>
        <div class="flex gap-4 mt-10">
          <button
            @click="showAddLoanModal = false"
            class="flex-1 py-4 rounded-2xl border border-white/10 text-white font-black uppercase hover:bg-white/5 transition-all"
          >
            Hủy
          </button>
          <button
            @click="handleQuickAddLoan"
            class="flex-1 py-4 rounded-2xl bg-[#FFD700] text-black font-black uppercase shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_40px_rgba(255,215,0,0.6)] transition-all"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "@/composables/useToast";
import {
  Activity as ActivityIcon,
  ArrowUpRight as ArrowUpRightIcon,
  ArrowDownLeft as ArrowDownLeftIcon,
  Eye as EyeIcon,
  EyeOff as EyeOffIcon,
  Plus as PlusIcon,
  RefreshCw as RefreshCwIcon,
  Trash2 as Trash2Icon,
  ArrowLeft as ArrowLeftIcon,
  PiggyBank as PiggyBankIcon,
  Database as StorageIcon,
  HandCoins as HandCoinsIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
} from "lucide-vue-next";
import AssetCard from "@/components/AssetCard.vue";
import AssetPasswordPrompt from "@/components/AssetPasswordPrompt.vue";
import AssetDepositModal from "@/components/AssetDepositModal.vue";
import AssetWithdrawModal from "@/components/AssetWithdrawModal.vue";
import AssetSavingsModal from "@/components/AssetSavingsModal.vue";
import AssetStorageModal from "@/components/AssetStorageModal.vue";
import AssetOverviewHub from "@/components/AssetOverviewHub.vue";
import AssetTransactionLedger from "@/components/AssetTransactionLedger.vue";
import AssetSavingsNexus from "@/components/AssetSavingsNexus.vue";
import AssetStorageNexus from "@/components/AssetStorageNexus.vue";
import AssetSwapModal from "@/components/AssetSwapModal.vue";
import LoansManagementView from "@/views/manager/admin/LoansManagementView.vue";

// Services
import { getUsdtVndP2pPrice } from "@/api/market";
import {
  getPortfolioSummary,
  unlockWallet,
  setWalletPassword,
  createWalletTransaction,
  getWalletTransactions,
  getWalletLots,
  createSavings,
  createStorage,
  getStorage,
  getSavingsSummary,
  withdrawSavings,
  withdrawFromStorage,
  clearAllWalletData,
  deleteSavings,
  getGrowthStats,
  createLoan,
} from "@/api/wallet";

import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const route = useRoute();
const router = useRouter();
const { showToast } = useToast();

// State
const isBalanceVisible = ref(
  localStorage.getItem("isBalanceVisible") !== "false",
);
const selectedMonth = ref("all");
const availableMonths = computed(() => {
  if (!transactions.value || !transactions.value.length) return [];
  const monthsSet = new Set<string>();
  transactions.value.forEach((tx) => {
    if (tx.timestamp) {
      const date = new Date(tx.timestamp);
      monthsSet.add(
        `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`,
      );
    }
  });
  return Array.from(monthsSet).sort((a, b) => b.localeCompare(a));
});

const activeTab = ref("overview");
const currentFilter = ref("all");

watch(activeTab, (newTab) => {
  if (["deposit", "withdraw", "receive", "transfer"].includes(newTab)) {
    currentFilter.value = newTab;
  } else {
    currentFilter.value = "all";
  }
});

const selectedAsset = ref<string | null>(
  (route.params.asset as string) || null,
);

watch(
  () => route.params.asset,
  (newAsset) => {
    if (newAsset) {
      selectedAsset.value = newAsset as string;
      refreshAllData();
    } else {
      selectedAsset.value = null;
    }
  },
);

const handleExport = () => {
  showToast("Tính năng Export đang được chuẩn bị...", "info");
};
const handleImport = () => {
  showToast("Tính năng Import đang được chuẩn bị...", "info");
};
const unlockedAssets = ref<string[]>([]);
const walletTokens = ref<Record<string, string>>({});
const loansRefreshKey = ref(0);
const configuredAssets = ref<string[]>(["USDT", "BTC", "ETH", "VND", "FZ"]);
const currentUsdtPrice = ref<number | null>(null);
const portfolioSummary = ref<any>(null);
const passwordInput = ref("");
const walletError = ref("");
const transactions = ref<any[]>([]);
const lots = ref<any[]>([]);
const storageWallets = ref<any[]>([]);
const savingsSummary = ref<any>(null);

// Computed
const filteredTransactions = computed(() => {
  if (!transactions.value) return [];
  let baseTxs = [...transactions.value];

  // Month filtering
  if (selectedMonth.value !== "all") {
    baseTxs = baseTxs.filter((tx) => {
      const d = new Date(tx.timestamp);
      const m = `${(d.getMonth() + 1).toString().padStart(2, "0")}/${d.getFullYear()}`;
      return m === selectedMonth.value;
    });
  }

  if (currentFilter.value === "all") return baseTxs;
  if (currentFilter.value === "savings") {
    return baseTxs.filter((tx) => isSavingsRelated(tx));
  }
  return baseTxs.filter(
    (tx) => tx.type === currentFilter.value && !isSavingsRelated(tx),
  );
});

const isSavingsRelated = (tx: any) => {
  const source = tx.source || "";
  return (
    source.startsWith("Gửi lãi") ||
    source.startsWith("Rút gửi") ||
    source.startsWith("Đáo hạn") ||
    source.startsWith("Nhận lãi") ||
    source.startsWith("Chuyển vào ví lưu trữ") ||
    source.startsWith("Rút từ ví lưu trữ") ||
    tx.type === "staking" ||
    tx.type === "unstaking"
  );
};

// Modal Visibility State
const showDepositModal = ref(false);
const showWithdrawModal = ref(false);
const showSavingsModal = ref(false);
const showStorageModal = ref(false);
const showSwapModal = ref(false);
const showAddLoanModal = ref(false);

interface Asset {
  name: string;
  symbol: string;
  icon: string;
  balance: number;
  savingsBalance: number;
  textClass: string;
  image?: string;
  hasPassword?: boolean;
}

const assets = ref<Asset[]>([
  {
    name: "Tether",
    symbol: "USDT",
    icon: "₮",
    balance: 0,
    savingsBalance: 0,
    textClass: "text-emerald-400",
    image: "https://assets.coingecko.com/coins/images/325/large/Tether.png",
  },
  {
    name: "Vietnamese Dong",
    symbol: "VND",
    icon: "₫",
    balance: 0,
    savingsBalance: 0,
    textClass: "text-red-400",
  },
  {
    name: "Finzo Token",
    symbol: "FZ",
    icon: "FZ",
    balance: 0,
    savingsBalance: 0,
    textClass: "text-purple-400",
  },
]);

const newLoan = ref({
  borrower: "",
  amount: null as number | null,
  hasInterest: false,
  interestRate: null as number | null,
});

// Form Data State
const depositForm = ref({
  quantity: null as number | null,
  price: null as number | null,
  source: null as string | null,
  contractCode: "" as string,
});
const withdrawForm = ref({ quantity: null as number | null, price: null as number | null, platform: null as string | null });

// Computed
const totalDepositAmount = computed(
  () => (depositForm.value.quantity || 0) * (depositForm.value.price || 1),
);
const totalWithdrawAmount = computed(
  () => (withdrawForm.value.quantity || 0) * (withdrawForm.value.price || 1),
);
const currentAssetBalance = computed(
  () =>
    assets.value.find((a) => a.symbol === selectedAsset.value)?.balance || 0,
);
const vndBalance = computed(
  () => assets.value.find((a) => a.symbol === "VND")?.balance || 0,
);

const growthStats = ref<any[]>([]);

const growthChartData = computed(() => {
  return {
    labels: growthStats.value.map((s) => s.dateStr || s.date || ""),
    datasets: [
      {
        label: "Tăng trưởng tài sản",
        data: growthStats.value.map((s) => s.value),
        fill: true,
        borderColor: "#FFD700",
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return "rgba(255, 215, 0, 0.2)";
          }
          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom,
          );
          gradient.addColorStop(0, "rgba(255, 215, 0, 0.4)");
          gradient.addColorStop(1, "rgba(255, 215, 0, 0)");
          return gradient;
        },
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointBackgroundColor: "#FFD700",
        pointBorderColor: "#000",
        pointBorderWidth: 2,
        tension: 0.4,
      },
    ],
  };
});

const growthChartOptions = computed(() => {
  const dataVals = growthStats.value.map((s) => s.value);
  const minVal = dataVals.length ? Math.min(...dataVals) : 0;
  return {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        display: false,
        min: minVal * 0.9,
      },
      x: {
        display: false,
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.9)",
        titleColor: "#888",
        bodyColor: "#FFD700",
        borderColor: "rgba(255,215,0,0.3)",
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          label: function (context: any) {
            return "₫" + (context.raw / 1000000).toFixed(1) + "M";
          },
        },
      },
    },
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
  };
});

const assetStats = computed(() => {
  if (!transactions.value || !selectedAsset.value) return null;

  const symbol = selectedAsset.value;

  // Realized profit is month-dependent
  let realizedTxs = transactions.value.filter(
    (tx) =>
      (tx.type === "withdraw" || tx.type === "swap") && !isSavingsRelated(tx),
  );

  if (selectedMonth.value !== "all") {
    realizedTxs = realizedTxs.filter((tx) => {
      const d = new Date(tx.timestamp);
      const m = `${(d.getMonth() + 1).toString().padStart(2, "0")}/${d.getFullYear()}`;
      return m === selectedMonth.value;
    });
  }

  const realizedProfit = realizedTxs.reduce(
    (acc, tx) => acc + (Number(tx.profitAmount) || 0),
    0,
  );

  // Cost basis and holdings are global for the asset balance
  const buys = transactions.value.filter(
    (tx) => tx.type === "deposit" && !isSavingsRelated(tx),
  );
  const totalBuyQty = buys.reduce((acc, tx) => acc + Number(tx.quantity), 0);
  const totalBuyCost = buys.reduce((acc, tx) => acc + Number(tx.total), 0);
  const avgBuyPrice = totalBuyQty > 0 ? totalBuyCost / totalBuyQty : 0;

  // Unrealized profit based on current price from portfolioSummary
  const assetData = portfolioSummary.value?.assets?.find(
    (a: any) => a.symbol === symbol,
  );
  const currentPrice = assetData?.price || 0;
  const holdingQty = assetData
    ? Number(assetData.balance) +
      Number(assetData.savingsBalance || 0) +
      Number(assetData.storageBalance || 0)
    : 0;

  const unrealizedProfit = holdingQty * (currentPrice - avgBuyPrice);

  return {
    avgBuyPrice,
    realizedProfit,
    unrealizedProfit,
    totalHoldings: holdingQty,
    currentPrice,
  };
});

const currentAssetData = computed(() => {
  if (!selectedAsset.value || !portfolioSummary.value) return null;
  return portfolioSummary.value.assets?.find(
    (a: any) => a.symbol === selectedAsset.value,
  );
});

const displayValuation = computed(() => {
  if (!selectedAsset.value) return portfolioSummary.value?.totalVndValue || 0;
  return currentAssetData.value?.vndValue || 0;
});

const displayPerformanceVnd = computed(() => {
  if (!selectedAsset.value)
    return portfolioSummary.value?.dailyPerformanceVnd || 0;
  const a = currentAssetData.value;
  if (!a) return 0;
  const totalQty =
    Number(a.balance) +
    Number(a.savingsBalance || 0) +
    Number(a.storageBalance || 0);
  const priceYesterday = a.price / (1 + (a.change24h || 0) / 100);
  return a.price * totalQty - priceYesterday * totalQty;
});

const displayPerformancePercent = computed(() => {
  if (!selectedAsset.value)
    return portfolioSummary.value?.dailyPerformancePercent || 0;
  return currentAssetData.value?.change24h || 0;
});

const capitalPackages = computed(() => {
  if (!selectedAsset.value || !transactions.value.length) return [];

  // 1. Sort all non-savings transactions by timestamp ASC
  let relevantTxs = [...transactions.value].filter(
    (tx: any) => !isSavingsRelated(tx),
  );

  // Apply month filtering if set
  if (selectedMonth.value !== "all") {
    relevantTxs = relevantTxs.filter((tx) => {
      const d = new Date(tx.timestamp);
      const m = `${(d.getMonth() + 1).toString().padStart(2, "0")}/${d.getFullYear()}`;
      return m === selectedMonth.value;
    });
  }

  relevantTxs.sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
  );

  // Use lots from API instead of simulating from transactions
  const activeLots = [...lots.value];

  // Group by contractCode to handle pooled lots (though mostly already unique from BE)
  const groupedMap: Record<string, any> = {};
  activeLots.forEach((tx) => {
    const code = tx.contractCode || `DP-${tx.id.split("-")[0].toUpperCase()}`;
    if (!groupedMap[code]) {
      groupedMap[code] = {
        id: tx.id,
        contractCode: code,
        quantity: 0, // Total remaining
        initialQuantity: 0, // Live capacity (for progress bar)
        totalOriginal: 0, // Historical volume (for completed list)
        realizedProfit: 0,
        price: Number(tx.price || 0),
        timestamp: tx.timestamp,
        transactions: [],
      };
    }
    groupedMap[code].quantity += Number(tx.remainingQuantity);
    groupedMap[code].stakedQuantity =
      (groupedMap[code].stakedQuantity || 0) + Number(tx.stakedQuantity || 0);
    groupedMap[code].realizedProfit += Number(tx.realizedProfit || 0);
    groupedMap[code].totalOriginal += Number(tx.quantity);

    // Only add to initialQuantity if the lot is not fully exhausted
    if (Number(tx.remainingQuantity) > 0 || Number(tx.stakedQuantity) > 0) {
      groupedMap[code].initialQuantity += Number(tx.quantity);
    }
    groupedMap[code].transactions.push(tx);
  });

  const activePackages = Object.values(groupedMap);
  activePackages.sort((a, b) => b.price - a.price); // HIFO order in view

  return activePackages.map((pkg) => {
    const currentPrice = currentAssetData.value?.price || 0;
    const pnl = (currentPrice - pkg.price) * pkg.quantity;
    const pnlPercent = ((currentPrice - pkg.price) / (pkg.price || 1)) * 100;

    return {
      ...pkg,
      weight: (pkg.quantity / (pkg.initialQuantity || 1)) * 100,
      stakedWeight: (pkg.stakedQuantity / (pkg.initialQuantity || 1)) * 100,
      pnl,
      pnlPercent,
    };
  });
});

const totalCapitalPnl = computed(() => {
  return assetStats.value?.realizedProfit || 0;
});

const profitChartData = computed(() => {
  if (!selectedAsset.value || !transactions.value) return [];

  const days = 14;
  const result = [];
  const now = new Date();

  // Get active savings for this asset to estimate daily yield
  const activeSavings =
    savingsSummary.value?.details?.filter(
      (d: any) => d.assetSymbol === selectedAsset.value,
    ) || [];
  const dailySavingsYieldVnd = activeSavings.reduce(
    (acc: number, s: any) => acc + (s.dailyProfitVnd || 0),
    0,
  );

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);

    // trading profit from transactions on this day
    const dayTradingProfit = transactions.value
      .filter((tx: any) => {
        const txDate = new Date(tx.timestamp).toLocaleDateString("en-CA"); // YYYY-MM-DD
        const targetDate = d.toLocaleDateString("en-CA");
        return txDate === targetDate;
      })
      .reduce((acc: number, tx: any) => acc + (tx.profitAmount || 0), 0);

    // savings profit (simulated as constant daily yield for current active ones)
    const daySavingsProfit = dailySavingsYieldVnd;

    result.push({
      label: d.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
      }),
      trading: dayTradingProfit,
      savings: daySavingsProfit,
      total: dayTradingProfit + daySavingsProfit,
    });
  }

  // Normalize heights (max 100%)
  const allValues = result.flatMap((r) => [
    Math.abs(r.trading),
    Math.abs(r.savings),
    Math.abs(r.total),
  ]);
  const currentMax = Math.max(...allValues, 0);
  const maxVal = currentMax > 0 ? currentMax : 1000;
  return result.map((r) => ({
    ...r,
    tradingHeight: (Math.abs(r.trading) / maxVal) * 100,
    savingsHeight: (Math.abs(r.savings) / maxVal) * 100,
    totalHeight: (Math.abs(r.total) / maxVal) * 100,
  }));
});

// Methods
const fetchPrice = async () => {
  currentUsdtPrice.value = await getUsdtVndP2pPrice();
};

const fetchSummary = async () => {
  try {
    const data = await getPortfolioSummary();
    portfolioSummary.value = data;

    if (data.assets) {
      // Dynamically update configured assets from backend
      configuredAssets.value = data.assets
        .filter((a: any) => a.hasPassword)
        .map((a: any) => a.symbol);

      assets.value.forEach((asset) => {
        const found = data.assets.find((a: any) => a.symbol === asset.symbol);
        if (found) {
          asset.balance = found.balance;
          asset.savingsBalance = found.savingsBalance;
          asset.hasPassword = found.hasPassword;
        }
      });
    }
  } catch (e) {
    console.error("Failed to fetch summary", e);
  }
};

const isUnlocked = (symbol: string) => {
  return (
    unlockedAssets.value.includes(symbol) ||
    !!localStorage.getItem(`wallet_token_${symbol}`)
  );
};

const handleAssetClick = (symbol: string) => {
  selectedAsset.value = symbol;

  if (isUnlocked(symbol)) {
    // Ensure tokens are synced if unlocking via localStorage
    const savedToken = localStorage.getItem(`wallet_token_${symbol}`);
    if (savedToken && !walletTokens.value[symbol]) {
      walletTokens.value[symbol] = savedToken;
    }

    router.push(`/inventory/${symbol}`);
    fetchTransactions(symbol);
    fetchLots(symbol);
  }
};

const fetchTransactions = async (symbol: string) => {
  try {
    const token =
      walletTokens.value[symbol] ||
      localStorage.getItem(`wallet_token_${symbol}`);
    const data = await getWalletTransactions(symbol, token || undefined);
    transactions.value = data;
  } catch (e) {
    console.error(`Failed to fetch transactions for ${symbol}`, e);
  }
};

const fetchLots = async (symbol: string) => {
  try {
    const token =
      walletTokens.value[symbol] ||
      localStorage.getItem(`wallet_token_${symbol}`);
    const data = await getWalletLots(symbol, token || undefined);
    lots.value = data;
  } catch (e) {
    console.error(`Failed to fetch lots for ${symbol}`, e);
  }
};

const handlePasswordSubmit = async () => {
  if (!selectedAsset.value || !passwordInput.value) return;
  walletError.value = "";
  try {
    const symbol = selectedAsset.value;
    const res = await (configuredAssets.value.includes(symbol)
      ? unlockWallet(symbol, passwordInput.value)
      : setWalletPassword(symbol, passwordInput.value));

    if (!configuredAssets.value.includes(symbol)) {
      configuredAssets.value.push(symbol);
    }
    console.log(res);

    // Robust token extraction
    const token =
      res.walletToken || res.token || res.data?.token || res.data?.walletToken;
    if (token) {
      walletTokens.value[symbol] = token;

      // SYNC with Legacy Interceptor (client.ts)
      localStorage.setItem("active_wallet_asset", symbol);
      localStorage.setItem(`wallet_token_${symbol}`, token);

      console.log(`[Wallet] Token secured and persisted for ${symbol}`);
    }

    unlockedAssets.value.push(symbol);
    passwordInput.value = "";
    fetchTransactions(symbol);
    fetchLots(symbol);
    router.push(`/inventory/${symbol}`);
  } catch (e: any) {
    walletError.value =
      e.response?.data?.message || "Mật khẩu không chính xác.";
    passwordInput.value = "";
  }
};

const handleAction = (action: string) => {
  if (action === "Deposit") showDepositModal.value = true;
  if (action === "Withdraw") showWithdrawModal.value = true;
  if (action === "Savings") showSavingsModal.value = true;
  if (action === "Storage") showStorageModal.value = true;
  if (action === "Loans") showAddLoanModal.value = true;
  if (action === "Swap") {
    if (selectedAsset.value === "VND") {
      alert("Tài sản này đã là VND.");
      return;
    }
    showSwapModal.value = true;
  }
};

const handleDepositSubmit = async () => {
  if (!selectedAsset.value) return;
  const symbol = selectedAsset.value;
  const token =
    walletTokens.value[symbol] ||
    localStorage.getItem(`wallet_token_${symbol}`);

  if (!token) {
    alert("Phiên làm việc lỗi. Vui lòng mở khóa lại ví.");
    unlockedAssets.value = unlockedAssets.value.filter((a) => a !== symbol);
    return;
  }

  try {
    const payload = {
      assetSymbol: symbol,
      type: "deposit",
      quantity: Number(depositForm.value.quantity),
      price: Number(depositForm.value.price || 0),
      total: Number(totalDepositAmount.value),
      source: depositForm.value.source || "",
      contractCode: depositForm.value.contractCode || "",
    };

    await createWalletTransaction(payload, token);
    showDepositModal.value = false;
    depositForm.value = {
      quantity: null,
      price: null,
      source: null,
      contractCode: "",
    };
    await refreshAllData();
  } catch (e: any) {
    console.error("Deposit Error:", e);
    showToast(e.response?.data?.message || "Lỗi khi thực hiện nạp tiền.", "error");
  }
};

const handleWithdrawSubmit = async () => {
  if (!selectedAsset.value) return;
  const symbol = selectedAsset.value;
  const token =
    walletTokens.value[symbol] ||
    localStorage.getItem(`wallet_token_${symbol}`);

  if (!token) {
    showToast("Phiên làm việc lỗi. Vui lòng mở khóa lại ví.", "error");
    unlockedAssets.value = unlockedAssets.value.filter((a) => a !== symbol);
    return;
  }

  try {
    const qty = Number(withdrawForm.value.quantity);
    const price = Number(withdrawForm.value.price || 0);

    // Calculate Realized Profit based on HIFO logic from current capitalPackages
    let remainingToCalculate = qty;
    let totalCostBasis = 0;

    // We process the packages in HIFO order (which capitalPackages already provides)
    // to determine the cost basis of the quantity being withdrawn.
    for (const pkg of capitalPackages.value) {
      if (remainingToCalculate <= 0) break;
      const taken = Math.min(pkg.quantity, remainingToCalculate);
      totalCostBasis += taken * pkg.price;
      remainingToCalculate -= taken;
    }

    const avgBuyPriceAtTime = qty > 0 ? totalCostBasis / qty : 0;
    const profitAmount = qty * price - totalCostBasis;

    const payload = {
      assetSymbol: symbol,
      type: "withdraw",
      quantity: qty,
      price: price,
      total: Number(totalWithdrawAmount.value),
      avgBuyPriceAtTime: avgBuyPriceAtTime,
      profitAmount: profitAmount,
      source: withdrawForm.value.platform || "",
    };

    await createWalletTransaction(payload, token);
    showWithdrawModal.value = false;
    withdrawForm.value = { quantity: null, price: null, platform: null };
    await refreshAllData();
  } catch (e: any) {
    console.error("Withdraw Error:", e);
    showToast(e.response?.data?.message || "Lỗi khi thực hiện rút tiền.", "error");
  }
};
const handleSwapSubmit = async (data: any) => {
  if (!selectedAsset.value) return;
  const symbol = selectedAsset.value;
  const token =
    walletTokens.value[symbol] ||
    localStorage.getItem(`wallet_token_${symbol}`);

  if (!token) {
    alert("Phiên làm việc lỗi. Vui lòng mở khóa lại ví.");
    return;
  }

  try {
    // A Swap to VND is technically a Withdrawal from Crypto with a sale Price
    const payload = {
      assetSymbol: symbol,
      type: "swap",
      quantity: Number(data.quantity),
      price: Number(data.price),
      source: `Chuyển đổi sang VND - Nền tảng: ${data.platform}`,
      status: "completed",
    };

    await createWalletTransaction(payload, token);
    showSwapModal.value = false;
    showToast("Thực hiện chuyển đổi thành công!");
    await refreshAllData();
  } catch (e: any) {
    console.error("Swap Error:", e);
    showToast(e.response?.data?.message || "Lỗi khi thực hiện chuyển đổi.", "error");
  }
};

const handleDeleteSavings = async (id: string) => {
  if (
    !confirm(
      "XÁC NHẬN TRIỆU HỒI: Hành động này sẽ loại bỏ hoàn toàn hợp đồng khỏi hệ thống (Dữ liệu sẽ mất vĩnh viễn và không được hoàn lại ví chính). Bạn có chắc chắn không?",
    )
  )
    return;
  try {
    await deleteSavings(id);
    await refreshAllData();
  } catch (e: any) {
    alert(e.response?.data?.message || "Lỗi khi xoá hợp đồng tiền gửi.");
  }
};

const handleSavingsSubmit = async (data: any) => {
  if (!selectedAsset.value) return;
  const symbol = selectedAsset.value;
  const token =
    walletTokens.value[symbol] ||
    localStorage.getItem(`wallet_token_${symbol}`);

  if (!token) {
    alert("Phiên làm việc lỗi. Vui lòng mở khóa lại ví.");
    return;
  }

  try {
    await createSavings(data, token);
    showSavingsModal.value = false;
    await refreshAllData();
  } catch (e: any) {
    console.error("Savings Error:", e);
    alert(e.response?.data?.message || "Lỗi khi thực hiện gửi lãi.");
  }
};

const handleStorageSubmit = async (data: any) => {
  if (!selectedAsset.value) return;
  const symbol = selectedAsset.value;
  const token =
    walletTokens.value[symbol] ||
    localStorage.getItem(`wallet_token_${symbol}`);

  if (!token) {
    alert("Phiên làm việc lỗi. Vui lòng mở khóa lại ví.");
    return;
  }

  try {
    await createStorage(data, token);
    showStorageModal.value = false;
    await refreshAllData();
  } catch (e: any) {
    console.error("Storage Error:", e);
    alert(e.response?.data?.message || "Lỗi khi thực hiện lưu trữ.");
  }
};

const fetchStorage = async () => {
  try {
    const data = await getStorage();
    storageWallets.value = data || [];
  } catch (e) {
    console.error("Failed to fetch storage", e);
  }
};

const fetchSavingsSummary = async () => {
  try {
    const data = await getSavingsSummary();
    savingsSummary.value = data;
  } catch (e) {
    console.error("Failed to fetch savings summary", e);
  }
};

const fetchGrowthStats = async () => {
  try {
    const data = await getGrowthStats();
    growthStats.value = data;
  } catch (e) {
    console.error("Failed to fetch growth stats", e);
  }
};

const handleWithdrawSavings = async (id: string) => {
  if (!confirm("Xác nhận rút tiền gửi lãi về ví chính?")) return;
  try {
    await withdrawSavings(id);
    await refreshAllData();
  } catch (e: any) {
    alert(e.response?.data?.message || "Lỗi khi rút tiền gửi lãi.");
  }
};

const handleWithdrawStorage = async (id: string) => {
  if (!confirm("Xác nhận rút tài sản từ ví lưu trữ về ví chính?")) return;
  try {
    const token =
      walletTokens.value[selectedAsset.value!] ||
      localStorage.getItem(`wallet_token_${selectedAsset.value}`);
    if (!token) throw new Error("Missing Token");
    await withdrawFromStorage(id, token);
    await refreshAllData();
  } catch (e: any) {
    alert(e.response?.data?.message || "Lỗi khi rút từ ví lưu trữ.");
  }
};

const handleResetAll = async () => {
  if (
    !confirm(
      "CẢNH BÁO CHIẾN LƯỢC: Bạn có chắc chắn muốn XÓA TOÀN BỘ dữ liệu (Giao dịch, Gửi lãi, Lưu trữ) của TẤT CẢ tài sản không? Hệ thống sẽ quay về trạng thái ban đầu và không thể hoàn tác.",
    )
  )
    return;

  try {
    await clearAllWalletData();
    showToast("Hệ thống đã được làm mới hoàn toàn.");
    await refreshAllData();
    if (selectedAsset.value) {
      await fetchTransactions(selectedAsset.value);
    }
  } catch (e: any) {
    showToast("Lỗi khi reset data: " + (e.response?.data?.message || e.message), "error");
  }
};

const refreshAllData = async () => {
  // Prevent double-refreshing if already active within 500ms
  const now = Date.now();
  if (now - (lastRefreshTime || 0) < 500) return;
  lastRefreshTime = now;

  const tasks: Promise<any>[] = [
    fetchPrice(),
    fetchSummary(),
    fetchStorage(),
    fetchSavingsSummary(),
    fetchGrowthStats(),
  ];

  if (selectedAsset.value && isUnlocked(selectedAsset.value)) {
    // Inside a specific wallet: Fetch asset-specific data
    tasks.push(fetchTransactions(selectedAsset.value));
    tasks.push(fetchLots(selectedAsset.value));
  }

  // Also trigger child loan lists to refresh
  loansRefreshKey.value++;

  await Promise.all(tasks);
};

let lastRefreshTime = 0;

const fmtNumber = (val: number) => {
  if (val === undefined || val === null) return "0";
  return new Intl.NumberFormat("vi-VN").format(Math.floor(val));
};

const fmtDateTime = (ts: string | number) => {
  if (!ts) return "---";
  return new Date(ts).toLocaleString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Lifecycle
let priceInterval: any;
const handleQuickAddLoan = async () => {
  const symbol = selectedAsset.value || "VND"; // Default to VND if global
  if (!newLoan.value.borrower || !newLoan.value.amount)
    return;
  
  if (newLoan.value.amount > currentAssetBalance.value) {
    showToast(`Số dư ${symbol} không đủ để thực hiện khoản vay này`, "error");
    return;
  }

  try {
    const token = walletTokens.value[symbol] || localStorage.getItem(`wallet_token_${symbol}`);
    
    await createLoan({
      assetSymbol: symbol,
      borrower: newLoan.value.borrower,
      amount: Number(newLoan.value.amount),
      hasInterest: newLoan.value.hasInterest,
      interestRate: newLoan.value.hasInterest
        ? Number(newLoan.value.interestRate)
        : 0,
    }, token || undefined);

    showAddLoanModal.value = false;
    newLoan.value = {
      borrower: "",
      amount: null,
      hasInterest: false,
      interestRate: null,
    };
    showToast("Đã thêm khoản vay hệ thống tín dụng!");
    refreshAllData(); // This now handles everything, including loansRefreshKey++
  } catch (error: any) {
    showToast(error.response?.data?.message || "Lỗi khi tạo khoản vay", "error");
  }
};

onMounted(() => {
  refreshAllData();
  priceInterval = setInterval(refreshAllData, 3600000); // 1 hour
});

onUnmounted(() => {
  clearInterval(priceInterval);
});

const toggleBalanceVisibility = () => {
  isBalanceVisible.value = !isBalanceVisible.value;
  localStorage.setItem("isBalanceVisible", String(isBalanceVisible.value));
};
</script>

<style scoped>
.glass-vibrant {
  background: rgba(13, 13, 16, 0.85);
  backdrop-filter: blur(40px);
  border: 1px solid rgba(255, 255, 255, 0.03);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.glass-vibrant:hover {
  border-color: rgba(255, 215, 0, 0.15);
  box-shadow: 0 60px 140px rgba(0, 0, 0, 1);
}
@keyframes shimmer {
  0% {
    transform: translateX(-100%) skewX(-15deg);
  }
  100% {
    transform: translateX(200%) skewX(-15deg);
  }
}
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.animate-shimmer {
  animation: shimmer 5s infinite;
}
.animate-spin-slow {
  animation: spin-slow 12s linear infinite;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 215, 0, 0.05);
  border-radius: 20px;
  transition: all 0.3s;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background: rgba(255, 215, 0, 0.2);
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 215, 0, 0.5);
}
</style>
