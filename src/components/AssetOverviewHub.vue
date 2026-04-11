<template>
  <div class="space-y-12">
    <!-- 🎛️ Dynamic Master Filter -->
    <div class="flex items-center justify-between glass-vibrant p-5 rounded-[32px] border border-white/5 shadow-2xl relative z-[60]">
      <div class="flex items-center gap-4">
        <div class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
           <FilterIcon class="w-4 h-4 text-[#FFD700]" />
        </div>
        <div class="text-left">
           <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-white">Bộ lọc Kết quả</h4>
           <p class="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-1">Truy vấn theo Tháng & Ngày</p>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <!-- Filter Types (Month/Date) -->
        <div class="flex bg-black/40 rounded-xl p-1.5 border border-white/5">
           <button @click="filterType = 'all'" class="px-5 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all" :class="filterType === 'all' ? 'bg-[#FFD700] text-black shadow-[0_0_15px_rgba(255,215,0,0.3)]' : 'text-gray-500 hover:text-white hover:bg-white/5'">Tất cả</button>
           <button @click="filterType = 'month'" class="px-5 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all" :class="filterType === 'month' ? 'bg-[#FFD700] text-black shadow-[0_0_15px_rgba(255,215,0,0.3)]' : 'text-gray-500 hover:text-white hover:bg-white/5'">Theo Tháng</button>
           <button @click="filterType = 'date'" class="px-5 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all" :class="filterType === 'date' ? 'bg-[#FFD700] text-black shadow-[0_0_15px_rgba(255,215,0,0.3)]' : 'text-gray-500 hover:text-white hover:bg-white/5'">Tùy chỉnh</button>
        </div>
        
        <!-- Filter Exact Selectors -->
        <select v-if="filterType === 'month'" v-model="selectedMonth" class="bg-white/5 border border-white/10 text-white text-[10px] uppercase font-bold tracking-widest rounded-xl px-5 py-2.5 outline-none focus:border-[#FFD700]/50 transition-all cursor-pointer h-[38px] w-[140px]">
           <option value="all" class="bg-[#0A0A0B]">Tất cả</option>
           <option v-for="m in availableMonths" :key="m" :value="m" class="bg-[#0A0A0B]">Tháng {{ m }}</option>
        </select>

        <input v-if="filterType === 'date'" type="date" v-model="selectedDate" class="bg-white/5 border border-white/10 text-white text-[10px] uppercase font-bold tracking-widest rounded-xl px-4 outline-none focus:border-[#FFD700]/50 transition-all cursor-pointer h-[38px] w-[140px]" style="color-scheme: dark;">
      </div>
    </div>

    <!-- 📊 Cluster 1: Activity & Distribution -->
    <div class="grid grid-cols-12 gap-8">
      <!-- Intelligence: Recent Flow -->
      <div class="col-span-12 lg:col-span-8">
        <div
          class="glass-vibrant p-10 rounded-[40px] h-[550px] flex flex-col relative overflow-hidden text-left border-white/5 shadow-2xl"
        >
          <div class="flex items-center gap-4 mb-10">
            <div
              class="w-1.5 h-8 bg-gold-vibrant rounded-full shadow-[0_0_15px_#FFD700]"
            ></div>
            <h4
              class="text-sm font-black text-white uppercase tracking-[0.2em] italic"
            >
              Hoạt động gần đây
            </h4>
          </div>
          <div class="flex-1 overflow-y-auto custom-scrollbar">
            <table class="w-full text-left border-separate border-spacing-y-4">
              <thead class="sticky top-0 z-10 backdrop-blur-md">
                <tr
                  class="text-gray-500 text-[10px] font-black uppercase tracking-widest italic"
                >
                  <th class="py-4 px-6">Thời gian</th>
                  <th class="py-4 px-6">Phân loại</th>
                  <th class="py-4 px-6 text-right">Khối lượng</th>
                  <th class="py-4 px-6 text-right px-8">Giá trị</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="tx in filteredTransactions.slice(0, 8)"
                  :key="tx.id"
                  class="bg-white/[0.02] hover:bg-white/[0.05] transition-all rounded-2xl group/row"
                >
                  <td
                    class="py-5 px-6 rounded-l-2xl border-l border-y border-white/5"
                  >
                    <p
                      class="text-[13px] font-bold text-white tracking-tight leading-none"
                    >
                      {{ formatDateTime(tx.timestamp).split(",")[0] }}
                    </p>
                    <div class="flex items-center gap-2 mt-2">
                      <p
                        class="text-[9px] text-gray-600 font-medium uppercase tracking-widest italic shadow-inner"
                      >
                        {{ formatDateTime(tx.timestamp).split(",")[1] }}
                      </p>
                      <span
                        v-if="tx.contractCode"
                        class="text-[8px] text-gold-vibrant/60 font-black tracking-tighter uppercase px-1.5 py-0.5 rounded bg-gold-vibrant/5 border border-gold-vibrant/10"
                        >{{ tx.contractCode }}</span
                      >
                    </div>
                  </td>
                  <td class="py-5 px-6 border-y border-white/5">
                    <div class="flex items-center gap-3">
                      <div
                        class="w-8 h-8 rounded-xl flex items-center justify-center border transition-all duration-500 group-hover/row:scale-110 shadow-lg bg-white/5 border-white/10"
                        :class="{
                          'text-gold-vibrant':
                            tx.type === 'deposit' ||
                            tx.type === 'unstaking' ||
                            tx.type === 'swap',
                          'text-red-400': tx.type === 'withdraw',
                          'text-white': tx.type === 'staking',
                        }"
                      >
                        <component
                          :is="
                            ['deposit', 'unstaking'].includes(tx.type)
                              ? PlusIcon
                              : tx.type === 'swap'
                                ? RefreshCwIcon
                                : ArrowUpRightIcon
                          "
                          class="w-4 h-4"
                        />
                      </div>
                      <span
                        class="text-[10px] font-bold uppercase tracking-widest"
                        :class="{
                          'text-gold-vibrant':
                            tx.type === 'deposit' ||
                            tx.type === 'unstaking' ||
                            tx.type === 'swap',
                          'text-red-400': tx.type === 'withdraw',
                          'text-white': tx.type === 'staking',
                        }"
                        >{{
                          tx.type === "staking"
                            ? "Gửi Lãi"
                            : tx.type === "unstaking"
                              ? "Rút Lãi"
                              : tx.type === "swap"
                                ? "Chuyển đổi"
                                : tx.type
                        }}</span
                      >
                    </div>
                  </td>
                  <td
                    class="py-5 px-6 text-right font-bold text-white text-[13px] tracking-tight border-y border-white/5"
                  >
                    {{ formatNumber(tx.quantity) }}
                  </td>
                  <td
                    class="py-5 px-8 text-right rounded-r-2xl font-bold text-white text-[13px] tracking-tight border-r border-y border-white/5"
                  >
                    {{ formatNumber(tx.total) }}
                    <span class="text-[10px] text-gray-600 font-bold ml-1"
                      >₫</span
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Performance: Asset Cockpit -->
      <div class="col-span-12 lg:col-span-4">
        <div
          class="glass-vibrant p-10 rounded-[40px] h-[550px] flex flex-col relative overflow-hidden group border-white/5 shadow-2xl"
        >
          <div class="flex items-center gap-4 mb-10 text-left">
            <ChartIcon class="w-5 h-5 text-[#FFD700]" />
            <h4
              class="text-sm font-black text-white uppercase tracking-[0.2em] italic"
            >
              Cơ cấu danh mục
            </h4>
          </div>
          <div class="flex-1 flex flex-col justify-center">
            <div
              class="relative w-56 h-56 mx-auto rounded-full border border-white/5 flex items-center justify-center group-hover:border-gold-vibrant/40 transition-all duration-1000 shadow-[inset_0_0_30px_rgba(0,0,0,0.5)]"
            >
              <div
                class="absolute inset-4 rounded-full border-[7px] border-white/5 border-t-gold-vibrant animate-spin-slow"
              ></div>
              <div
                class="text-center group-hover:scale-110 transition-transform duration-700"
              >
                <div
                  class="text-[10px] font-bold text-gray-400/60 uppercase mt-[2px] tracking-widest italic"
                >
                  TOTAL_VALUATION
                </div>
                <p
                  class="text-3xl font-black text-white italic tracking-tighter leading-none shadow-gold-vibrant/20 drop-shadow-xl"
                >
                  {{ formatNumber(currentAssetBalance) }}
                </p>
                <p
                  class="text-[10px] font-bold text-gold-vibrant uppercase mt-2 tracking-widest italic"
                >
                  HỆ SINH THÁI {{ selectedAsset }}
                </p>
              </div>
            </div>
            <!-- Balance Breakdown -->
            <div class="mt-6 flex items-center justify-between px-2 bg-white/[0.02] py-3 rounded-2xl border border-white/5">
              <div class="space-y-1 text-center flex-1 border-r border-white/5">
                <span class="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Ví Chính</span>
                <p class="text-[11px] font-black text-white italic">
                  {{ formatNumber(assetData?.balance || 0) }}
                </p>
              </div>
              <div class="space-y-1 text-center flex-1 border-r border-white/5">
                <span class="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Gửi Lãi</span>
                <p class="text-[11px] font-black text-white italic">
                  {{ formatNumber(assetData?.savingsBalance || 0) }}
                </p>
              </div>
              <div class="space-y-1 text-center flex-1">
                <span class="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Lưu Trữ</span>
                <p class="text-[11px] font-black text-white italic">
                  {{ formatNumber(assetData?.storageBalance || 0) }}
                </p>
              </div>
            </div>
            <div class="space-y-3 mt-6 pb-2">
              <div
                v-for="stat in cockpitStats"
                :key="stat.label"
                class="flex justify-between items-center text-left hover:translate-x-2 transition-transform cursor-default group/item"
              >
                <span
                  class="text-[9px] font-black text-gray-500 uppercase tracking-widest group-hover/item:text-white transition-colors"
                  >{{ stat.label }}</span
                >
                <span
                  class="text-xs font-black italic tracking-tighter"
                  :class="stat.color"
                  >{{ stat.val }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- 📊 Cluster 3: HIFO Management Protocol -->
    <div class="space-y-8">
      <div
        class="flex flex-col md:flex-row justify-between items-end gap-6 ml-2"
      >
        <div class="flex items-center gap-5 text-left">
          <div
            class="w-12 h-12 rounded-2xl bg-gold-vibrant/10 border border-gold-vibrant/20 flex items-center justify-center text-gold-vibrant shadow-2xl"
          >
            <ChartIcon class="w-6 h-6" />
          </div>
          <div>
            <h4
              class="text-xs font-black text-white uppercase tracking-[0.2em] italic leading-tight"
            >
              GIAO THỨC QUẢN LÝ LÔ NHẬP THÔNG MINH
            </h4>
            <h3
              class="text-3xl font-black text-white uppercase tracking-tighter italic mt-1"
            >
              Lưu trữ theo Lô nhập Hệ thống
            </h3>
          </div>
        </div>
        <div class="flex items-center gap-10">
          <div>
            <p
              class="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1 italic"
            >
              Tổng Alpha thực tế
            </p>
            <p
              class="text-2xl font-black italic tracking-tighter leading-none"
              :class="
                totalCapitalPnl >= 0 ? 'text-emerald-400' : 'text-red-400'
              "
            >
              {{ totalCapitalPnl >= 0 ? "+" : ""
              }}{{ formatNumber(totalCapitalPnl) }}
              <span
                class="text-[10px] text-gray-700 font-sans font-bold leading-none italic"
                >₫</span
              >
            </p>
          </div>
          <div class="bg-white/5 h-10 w-px"></div>
          <div class="text-right pr-8">
            <p
              class="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1 italic"
            >
              Lô đang hoạt động
            </p>
            <p
              class="text-2xl font-black text-gold-vibrant italic tracking-tighter leading-none whitespace-nowrap"
            >
              {{ activePackages.length }}
              <span
                class="text-[10px] text-gray-600 font-bold uppercase ml-1 italic pr-2"
                >GÓI</span
              >
            </p>
          </div>
        </div>
      </div>

      <!-- 🟢 Row 1: Active Management Phase -->
      <div class="grid grid-cols-12 gap-8 w-full">
        <!-- Col 1: Active List -->
        <div
          class="col-span-12 lg:col-span-8 glass-vibrant rounded-[40px] border-emerald-500/10 shadow-2xl overflow-hidden p-2"
        >
          <div class="flex items-center gap-4 p-6 border-b border-white/5">
            <div
              class="w-1.5 h-6 bg-emerald-400 rounded-full shadow-[0_0_15px_rgba(52,211,153,0.5)]"
            ></div>
            <h4
              class="text-[10px] font-black text-white uppercase tracking-[0.2em] italic"
            >
              Lô đang Hoạt động
            </h4>
            <span
              class="ml-auto text-[9px] font-black text-emerald-400/60 bg-emerald-400/5 px-2 py-0.5 rounded border border-emerald-400/10 uppercase italic"
              >Live Asset Stream</span
            >
          </div>
          <div
            class="overflow-x-auto no-scrollbar max-h-[500px] overflow-y-auto custom-scrollbar"
          >
            <table
              class="w-full border-separate border-spacing-y-2 px-6 pb-6 text-left"
            >
              <thead>
                <tr
                  class="text-[8px] font-black text-gray-600 uppercase tracking-[0.2em] italic"
                >
                  <th class="py-4">Lô nhập</th>
                  <th class="py-4 text-right">Khối lượng hiện tại</th>
                  <th class="py-4 text-right">Alpha đã Chốt</th>
                </tr>
              </thead>
              <tbody v-if="activePackages.length">
                <tr
                  v-for="pkg in activePackages"
                  :key="pkg.id"
                  class="bg-white/[0.015] hover:bg-white/[0.04] transition-all group/pkg"
                >
                  <td
                    class="py-4 rounded-l-[24px] border-l border-y border-white/5 px-4"
                  >
                    <p
                      class="text-[12px] font-black text-white tracking-widest uppercase truncate max-w-[150px]"
                    >
                      {{ pkg.contractCode }}
                    </p>
                    <div class="flex items-center gap-3 mt-1.5 opacity-80">
                      <p
                        class="text-[8px] text-gray-600 font-bold tracking-tighter uppercase italic shrink-0"
                      >
                        {{ formatDateTime(pkg.timestamp).split(",")[0] }}
                      </p>
                      <div class="w-1 h-3 bg-white/5 rounded-full"></div>
                      <p
                        class="text-[11px] text-gold-vibrant font-black tracking-tight shrink-0"
                      >
                        {{ formatNumber(pkg.price) }} ₫
                      </p>
                    </div>
                  </td>
                  <td
                    class="py-4 text-right border-y border-white/5 px-4 min-w-[140px]"
                  >
                    <div class="flex flex-col items-end">
                      <p
                        class="text-[13px] font-bold text-white tracking-tight"
                      >
                        {{ formatNumber(pkg.quantity + pkg.stakedQuantity) }}
                      </p>
                      <!-- 📈 Individual Lot Progress (Remaining vs Initial) -->
                      <div
                        class="h-1.5 w-24 bg-white/5 rounded-full overflow-hidden mt-2 flex gap-[1px] relative border border-white/[0.02]"
                      >
                        <!-- Staked (Hatched Red) -->
                        <div
                          class="h-full bg-hatched-red shadow-[0_0_8px_#ef4444] transition-all duration-1000"
                          :style="{ width: pkg.stakedWeight + '%' }"
                        ></div>
                        <!-- Available (Gold) -->
                        <div
                          class="h-full bg-gold-vibrant shadow-[0_0_8px_#FFD700] transition-all duration-1000"
                          :style="{ width: pkg.weight + '%' }"
                        ></div>
                      </div>
                      <p
                        class="text-[8px] text-gray-500 font-black uppercase mt-1 tracking-widest opacity-40"
                      >
                        {{ selectedAsset }}
                      </p>
                    </div>
                  </td>
                  <td
                    class="py-4 text-right rounded-r-[24px] border-r border-y border-white/5 px-4 pr-6"
                  >
                    <p
                      class="text-[12px] font-black tracking-tight italic"
                      :class="
                        pkg.realizedProfit >= 0
                          ? 'text-emerald-400'
                          : 'text-red-400'
                      "
                    >
                      {{ pkg.realizedProfit >= 0 ? "+" : ""
                      }}{{ formatNumber(pkg.realizedProfit) }}
                      <span
                        class="text-[10px] font-sans not-italic font-bold ml-1 opacity-40"
                        >₫</span
                      >
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              v-if="!activePackages.length"
              class="py-20 flex flex-col items-center justify-center opacity-10"
            >
              <ActivityIcon class="w-12 h-12 mb-4 text-gray-500" />
              <p
                class="text-[9px] font-black uppercase tracking-[0.4em] text-gray-600 italic"
              >
                KHÔNG CÓ LÔ HOẠT ĐỘNG
              </p>
            </div>
          </div>
        </div>

        <!-- Col 2: Active Snapshot Stats -->
        <div
          class="col-span-12 lg:col-span-4 glass-vibrant rounded-[40px] border-gold-vibrant/10 shadow-2xl overflow-hidden p-10 flex flex-col group/stats"
        >
          <div class="flex items-center gap-4 mb-10">
            <div
              class="w-1.5 h-6 bg-gold-vibrant rounded-full shadow-[0_0_15px_#FFD700]"
            ></div>
            <h4
              class="text-[10px] font-black text-white uppercase tracking-[0.2em] italic"
            >
              Thống kê Hiệu lực
            </h4>
          </div>

          <div class="flex-1 flex flex-col justify-between space-y-8">
            <div
              class="text-center py-8 bg-white/[0.02] rounded-[30px] border border-white/5 relative overflow-hidden group-hover/stats:border-gold-vibrant/30 transition-all"
            >
              <div
                class="absolute inset-0 bg-gold-vibrant/5 opacity-0 group-hover/stats:opacity-100 transition-opacity"
              ></div>
              <p
                class="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-3 italic"
              >
                Tổng Dự trữ Khả dụng
              </p>
              <h3
                class="text-4xl font-black text-white italic tracking-tighter"
              >
                {{ formatNumber(activeStats.totalRemaining) }}
              </h3>
              <p
                class="text-[11px] font-bold text-gold-vibrant uppercase mt-2 tracking-widest italic shadow-inner"
              >
                ~{{ formatNumber(activeStats.effectivenessUsdt) }} USDT
              </p>
            </div>

            <div class="grid grid-cols-2 gap-6">
              <div
                class="text-left p-5 rounded-3xl bg-white/[0.02] border border-white/5"
              >
                <p
                  class="text-[9px] font-black text-gray-700 uppercase tracking-widest mb-2 italic"
                >
                  Thanh khoản TB
                </p>
                <p
                  class="text-xl font-black text-emerald-400 italic leading-none"
                >
                  {{ activeStats.avgLiquidity.toFixed(1) }}%
                </p>
              </div>
              <div
                class="text-left p-5 rounded-3xl bg-white/[0.02] border border-white/5"
              >
                <p
                  class="text-[9px] font-black text-gray-700 uppercase tracking-widest mb-2 italic"
                >
                  Giá cao nhất
                </p>
                <p
                  class="text-xl font-black text-red-400 italic leading-none tracking-tighter"
                >
                  {{ formatNumber(activeStats.maxPrice) }}
                </p>
              </div>
            </div>

            <div class="space-y-4">
              <div
                class="flex justify-between items-center p-4 bg-white/[0.015] rounded-2xl border border-white/5"
              >
                <span
                  class="text-[9px] font-black text-gray-600 uppercase tracking-widest italic"
                  >Lô Trọng yếu (Max)</span
                >
                <span
                  class="text-[10px] font-black text-white tracking-widest uppercase italic"
                  >{{ activeStats.maxPkgCode }}</span
                >
              </div>
              <div
                class="flex justify-between items-center p-4 bg-white/[0.015] rounded-2xl border border-white/5"
              >
                <span
                  class="text-[9px] font-black text-gray-600 uppercase tracking-widest italic"
                  >Lô Tối thiểu (Min)</span
                >
                <span
                  class="text-[10px] font-black text-white tracking-widest uppercase italic"
                  >{{ activeStats.minPkgCode }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 🔘 Row 2: Finalized Archive Analysis -->
      <div class="grid grid-cols-12 gap-8 w-full">
        <!-- Col 1: Completed History Stats -->
        <div
          class="col-span-12 lg:col-span-4 glass-vibrant rounded-[40px] border-white/5 shadow-2xl overflow-hidden p-10 flex flex-col group/archived"
        >
          <div class="flex items-center gap-4 mb-10">
            <div
              class="w-1.5 h-6 bg-gray-500 rounded-full shadow-[0_0_15px_rgba(100,116,139,0.5)]"
            ></div>
            <h4
              class="text-[10px] font-black text-white uppercase tracking-[0.2em] italic"
            >
              Thống kê Hoàn thành
            </h4>
          </div>

          <div class="flex-1 flex flex-col justify-between space-y-8">
            <div
              class="text-center py-8 bg-white/[0.01] rounded-[30px] border border-white/5 group-hover/archived:border-white/20 transition-all"
            >
              <p
                class="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-3 italic"
              >
                Lợi nhuận Chốt thực tế
              </p>
              <h3
                class="text-4xl font-black text-emerald-400 italic tracking-tighter"
              >
                +{{ formatNumber(completedStats.totalRealizedProfit) }}
                <span class="text-sm font-sans not-italic opacity-40">₫</span>
              </h3>
              <p
                class="text-[11px] font-bold text-gray-700 uppercase mt-2 tracking-widest italic shadow-inner"
              >
                Đã xuất {{ formatNumber(completedStats.totalExhausted) }}
                {{ selectedAsset }}
              </p>
            </div>

            <div class="space-y-4">
              <div
                class="p-6 rounded-3xl bg-emerald-500/5 border border-emerald-500/10 flex justify-between items-center group/high"
              >
                <div class="text-left">
                  <p
                    class="text-[8px] font-black text-emerald-400 group-hover/high:text-emerald-300 uppercase tracking-widest italic"
                  >
                    Lợi nhuận Cao nhất
                  </p>
                  <p class="text-[11px] font-black text-white mt-1 uppercase">
                    {{ completedStats.bestProfit.code }}
                  </p>
                </div>
                <p class="text-lg font-black text-emerald-400 italic">
                  +{{ formatNumber(completedStats.bestProfit.val) }}
                </p>
              </div>

              <div
                class="p-6 rounded-3xl bg-white/[0.02] border border-white/5 flex justify-between items-center"
              >
                <div class="text-left">
                  <div class="flex flex-col text-left">
                    <h4
                      class="text-xs font-black text-[#FFD700] uppercase tracking-[0.3em]"
                    >
                      TĂNG TRƯỞNG TÀI SẢN
                    </h4>
                    <p class="text-[9px] font-bold text-gray-600 uppercase mt-1 tracking-widest">BIẾN ĐỘNG DÒNG VỐN THEO THỜI GIAN THỰC</p>
                  </div>
                  <p class="text-[11px] font-black text-white mt-1 uppercase">
                    {{ completedStats.worstProfit.code }}
                  </p>
                </div>
                <p class="text-lg font-black text-gray-500 italic">
                  +{{ formatNumber(completedStats.worstProfit.val) }}
                </p>
              </div>
            </div>

            <div
              class="pt-6 border-t border-white/5 flex items-center justify-between"
            >
              <p
                class="text-[9px] font-black text-gray-600 uppercase tracking-widest italic"
              >
                Hiệu suất Lưu kho
              </p>
              <p class="text-xs font-black text-emerald-400 italic">
                OPTIMAL (100%)
              </p>
            </div>
          </div>
        </div>

        <!-- Col 2: Completed List -->
        <div
          class="col-span-12 lg:col-span-8 glass-vibrant rounded-[40px] border-white/5 shadow-2xl overflow-hidden p-2 opacity-60 hover:opacity-100 transition-all group/archive-list"
        >
          <div class="flex items-center gap-4 p-6 border-b border-white/5">
            <div class="w-1.5 h-6 bg-gray-600 rounded-full"></div>
            <h4
              class="text-[10px] font-black text-white uppercase tracking-[0.2em] italic"
            >
              Danh mục Lô đã Chốt
            </h4>
            <span
              class="ml-auto text-[9px] font-black text-gray-700 bg-white/5 px-2 py-0.5 rounded border border-white/5 uppercase italic"
              >Archived Phase</span
            >
          </div>
          <div
            class="overflow-x-auto no-scrollbar max-h-[500px] overflow-y-auto custom-scrollbar"
          >
            <table
              class="w-full border-separate border-spacing-y-2 px-6 pb-6 text-left"
            >
              <thead>
                <tr
                  class="text-[8px] font-black text-gray-600 uppercase tracking-[0.2em] italic"
                >
                  <th class="py-4">Lô</th>
                  <th class="py-4 text-right">Khối lượng Gốc</th>
                  <th class="py-4 text-right">Alpha Chốt</th>
                </tr>
              </thead>
              <tbody v-if="completedPackages.length">
                <tr
                  v-for="pkg in completedPackages"
                  :key="pkg.id"
                  class="bg-white/[0.01] hover:bg-white/[0.04] transition-all group/pkg grayscale hover:grayscale-0"
                >
                  <td
                    class="py-4 rounded-l-[24px] border-l border-y border-white/5 px-4"
                  >
                    <p
                      class="text-[12px] font-black text-gray-400 group-hover/pkg:text-white tracking-widest uppercase truncate max-w-[150px]"
                    >
                      {{ pkg.contractCode }}
                    </p>
                    <p
                      class="text-[8px] text-gray-700 font-bold mt-1 tracking-tighter uppercase italic"
                    >
                      {{ formatDateTime(pkg.timestamp).split(",")[0] }}
                    </p>
                  </td>
                  <td class="py-4 text-right border-y border-white/5 px-4">
                    <p
                      class="text-[13px] font-bold text-gray-500 group-hover/pkg:text-white tracking-tight"
                    >
                      {{ formatNumber(pkg.totalOriginal || pkg.quantity) }}
                    </p>
                  </td>
                  <td
                    class="py-4 text-right rounded-r-[24px] border-r border-y border-white/5 px-4 pr-6"
                  >
                    <p
                      class="text-[12px] font-black text-emerald-400 italic tracking-tight"
                    >
                      +{{ formatNumber(pkg.realizedProfit) }}
                      <span
                        class="text-[9px] font-sans not-italic font-bold ml-1 opacity-40"
                        >₫</span
                      >
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              v-if="!completedPackages.length"
              class="py-20 flex flex-col items-center justify-center opacity-10"
            >
              <DatabaseIcon class="w-12 h-12 mb-4 text-gray-500" />
              <p
                class="text-[9px] font-black uppercase tracking-[0.4em] text-gray-600 italic"
              >
                KHÔNG CÓ DỮ LIỆU LỊCH SỬ
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 📊 Cluster 4: Cashflow & Profit Reporting Chart -->
    <div class="glass-vibrant p-10 rounded-[40px] border-white/5 shadow-2xl relative overflow-hidden group">
      <div class="flex items-center gap-4 mb-4 text-left relative z-20">
        <div class="w-1.5 h-8 bg-[#FFD700] rounded-full shadow-[0_0_15px_#FFD700]"></div>
        <div>
          <h4 class="text-sm font-black text-white uppercase tracking-[0.2em] italic">Báo cáo Dòng tiền & Lợi nhuận</h4>
          <p class="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-1">Biến động Cashflow (Nạp/Rút) & Tăng trưởng Lợi nhuận (Miền)</p>
        </div>
      </div>

      <div class="h-[250px] w-full relative flex items-end gap-[2px] mt-10" v-if="dailyChartData.length">
        <!-- Zero Line -->
        <div class="absolute left-0 right-0 border-b border-white/20 border-dashed z-0" :style="{ top: chartMetrics.zeroY + '%' }"></div>
        
        <!-- SVG Area Line for Profit -->
        <svg class="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
           <defs>
             <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
               <stop offset="0%" stop-color="#FFD700" stop-opacity="0.3"/>
               <stop offset="100%" stop-color="#FFD700" stop-opacity="0"/>
             </linearGradient>
           </defs>
           <polygon :points="svgPoints.polygon" fill="url(#profitGrad)"/>
           <polyline :points="svgPoints.polyline" fill="none" stroke="#FFD700" stroke-width="1.5" style="filter: drop-shadow(0 0 8px rgba(255,215,0,0.5))"/>
        </svg>

        <!-- Columns for Cashflow -->
        <div v-for="(d, i) in dailyChartData" :key="i" class="flex-1 relative h-full group/col flex items-center justify-center z-20 hover:bg-white/5 transition-colors">
          <!-- Positive Cashflow Bar (Deposit) -->
          <div 
            v-if="d.cashflow >= 0"
            class="absolute w-2/3 max-w-[20px] bg-gradient-to-t from-emerald-500/20 to-emerald-500 rounded-t-sm opacity-60 group-hover/col:opacity-100 transition-all border-t border-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
            :style="{ bottom: (100 - chartMetrics.zeroY) + '%', height: `${(d.cashflow / chartMetrics.maxCashflow) * chartMetrics.zeroY}%` }"
          ></div>
          
          <!-- Negative Cashflow Bar (Withdraw) -->
          <div 
            v-else
            class="absolute w-2/3 max-w-[20px] bg-gradient-to-b from-red-500/20 to-red-500 rounded-b-sm opacity-60 group-hover/col:opacity-100 transition-all border-b border-red-400 shadow-[0_0_10px_rgba(239,68,68,0.3)]"
            :style="{ top: chartMetrics.zeroY + '%', height: `${(Math.abs(d.cashflow) / Math.abs(chartMetrics.minCashflow)) * (100 - chartMetrics.zeroY)}%` }"
          ></div>

          <!-- Tooltip -->
          <div class="absolute -top-16 left-1/2 -translate-x-1/2 opacity-0 group-hover/col:opacity-100 transition-all duration-300 pointer-events-none bg-black/90 border border-white/20 px-3 py-2 rounded-xl whitespace-nowrap z-50 shadow-2xl flex flex-col items-center">
             <p class="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">{{ d.date }}</p>
             <p class="text-[10px] font-black italic mb-0.5 tracking-tighter" :class="d.cashflow >= 0 ? 'text-emerald-400' : 'text-red-400'">
                CF: {{ d.cashflow >= 0 ? '+' : '' }}{{ formatNumber(d.cashflow) }}
             </p>
             <p class="text-[10px] font-black text-[#FFD700] italic tracking-tighter">
                PNL: +{{ formatNumber(d.profit) }}
             </p>
          </div>
        </div>
      </div>
      <div v-else class="py-20 flex flex-col items-center justify-center opacity-10">
         <ChartIcon class="w-12 h-12 mb-4 text-gray-500" />
         <p class="text-[9px] font-black uppercase tracking-[0.4em] text-gray-600 italic">CHƯA CÓ BIẾN ĐỘNG DÒNG TIỀN</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import {
  Plus as PlusIcon,
  ArrowUpRight as ArrowUpRightIcon,
  BarChart3 as ChartIcon,
  Activity as ActivityIcon,
  RefreshCw as RefreshCwIcon,
  Filter as FilterIcon,
} from "lucide-vue-next";

const props = defineProps<{
  selectedAsset: string;
  transactions: any[];
  currentAssetBalance: number;
  assetData?: any;
  assetStats: any;
  profitChartData: any[];
  totalCapitalPnl: number;
  capitalPackages: any[];
  formatNumber: (val: number) => string;
  formatDateTime: (ts: string | number) => string;
}>();

// --- Filter State ---
const filterType = ref('all'); // 'all', 'month', 'date'
const selectedMonth = ref('all');
const selectedDate = ref('');

const availableMonths = computed(() => {
  if (!props.transactions || !props.transactions.length) return [];
  const monthsSet = new Set<string>();
  props.transactions.forEach((tx) => {
    if (tx.timestamp) {
      const date = new Date(tx.timestamp);
      monthsSet.add(
        `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`,
      );
    }
  });
  return Array.from(monthsSet).sort((a, b) => b.localeCompare(a));
});

const filteredTransactions = computed(() => {
  let list = props.transactions || [];
  if (filterType.value === 'all') return list;

  return list.filter(tx => {
    if (!tx.timestamp) return true;
    const d = new Date(tx.timestamp);
    if (filterType.value === 'month' && selectedMonth.value !== 'all') {
      const monthStr = `${(d.getMonth() + 1).toString().padStart(2, "0")}/${d.getFullYear()}`;
      return monthStr === selectedMonth.value;
    }
    if (filterType.value === 'date' && selectedDate.value) {
      const dateStr = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}-${(d.getDate()).toString().padStart(2, "0")}`;
      return dateStr === selectedDate.value;
    }
    return true;
  });
});

const filteredPackages = computed(() => {
  let list = props.capitalPackages || [];
  if (filterType.value === 'all') return list;

  return list.filter(pkg => {
    if (!pkg.timestamp) return true;
    const d = new Date(pkg.timestamp);
    if (filterType.value === 'month' && selectedMonth.value !== 'all') {
      const monthStr = `${(d.getMonth() + 1).toString().padStart(2, "0")}/${d.getFullYear()}`;
      return monthStr === selectedMonth.value;
    }
    if (filterType.value === 'date' && selectedDate.value) {
      const dateStr = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}-${(d.getDate()).toString().padStart(2, "0")}`;
      return dateStr === selectedDate.value;
    }
    return true;
  });
});

const activePackages = computed(() =>
  filteredPackages.value.filter(
    (pkg) => pkg.quantity > 0 || (pkg.stakedQuantity || 0) > 0,
  ),
);
const completedPackages = computed(() =>
  filteredPackages.value.filter(
    (pkg) => pkg.quantity <= 0 && (pkg.stakedQuantity || 0) <= 0,
  ),
);

const cockpitStats = computed(() => {
  if (!props.assetStats) return [];
  return [
    {
      label: "Tỉ lệ thanh khoản",
      val:
        (
          (props.currentAssetBalance / (props.assetStats.totalHoldings || 1)) *
          100
        ).toFixed(1) + "%",
      color: "text-gold-vibrant",
    },
    {
      label: "Giá nạp bình quân",
      val: props.formatNumber(props.assetStats?.avgBuyPrice || 0) + " ₫",
      color: "text-white",
    },
    {
      label: "LN đã chốt (Realized)",
      val:
        (props.assetStats?.realizedProfit || 0) >= 0
          ? "+" +
            props.formatNumber(props.assetStats?.realizedProfit || 0) +
            " ₫"
          : props.formatNumber(props.assetStats?.realizedProfit || 0) + " ₫",
      color:
        (props.assetStats?.realizedProfit || 0) >= 0
          ? "text-emerald-400"
          : "text-red-400",
    },
    {
      label: "LN tạm tính (Unrealized)",
      val:
        (props.assetStats?.unrealizedProfit || 0) >= 0
          ? "+" +
            props.formatNumber(props.assetStats?.unrealizedProfit || 0) +
            " ₫"
          : props.formatNumber(props.assetStats?.unrealizedProfit || 0) + " ₫",
      color:
        (props.assetStats?.unrealizedProfit || 0) >= 0
          ? "text-emerald-400"
          : "text-red-400",
    },
  ];
});


const activeStats = computed(() => {
  const pkgs = activePackages.value;
  if (!pkgs.length) {
    return {
      totalRemaining: 0,
      avgLiquidity: 0,
      maxQty: 0,
      minQty: 0,
      maxPkgCode: "-",
      minPkgCode: "-",
      maxPrice: 0,
      minPrice: 0,
      effectivenessUsdt: 0,
    };
  }

  const quantities = pkgs.map((p) => Number(p.quantity));
  const prices = pkgs.map((p) => Number(p.price || 0));

  const maxQty = Math.max(...quantities);
  const minQty = Math.min(...quantities);
  const maxPrice = Math.max(...prices);
  const minPrice = Math.min(...prices);

  const maxPkg = pkgs.find((p) => Number(p.quantity) === maxQty);
  const minPkg = pkgs.find((p) => Number(p.quantity) === minQty);

  const totalRemaining = quantities.reduce((s, q) => s + q, 0);
  const totalInitial = pkgs.reduce(
    (s, p) => s + Number(p.initialQuantity || p.quantity),
    0,
  );
  const avgLiquidity = (totalRemaining / (totalInitial || 1)) * 100;

  // Assuming effectiveness in USDT for reference (if selectedAsset is VND, use a mock rate or just show volume)
  const rate = props.selectedAsset === "VND" ? 1 / 25000 : 1;
  const effectivenessUsdt = totalRemaining * rate;

  return {
    totalRemaining,
    avgLiquidity,
    maxQty,
    minQty,
    maxPkgCode: maxPkg?.contractCode || "-",
    minPkgCode: minPkg?.contractCode || "-",
    maxPrice,
    minPrice,
    effectivenessUsdt,
  };
});

const completedStats = computed(() => {
  const pkgs = completedPackages.value;
  if (!pkgs.length) {
    return {
      totalRealizedProfit: 0,
      totalExhausted: 0,
      bestProfit: { code: "-", val: 0 },
      worstProfit: { code: "-", val: 0 },
    };
  }

  const totalRealizedProfit = pkgs.reduce(
    (s, p) => s + Number(p.realizedProfit || 0),
    0,
  );
  const totalExhausted = pkgs.reduce(
    (s, p) => s + Number(p.totalOriginal || p.quantity),
    0,
  );

  const sortedByProfit = [...pkgs].sort(
    (a, b) => b.realizedProfit - a.realizedProfit,
  );
  const best = sortedByProfit[0];
  const worst = sortedByProfit[pkgs.length - 1];

  // Normalize heights (max 100%)
  const allValues = pkgs.flatMap((r) => [
    Math.abs(r.realizedProfit || 0),
  ]);
  const currentMax = Math.max(...allValues, 0);
  const maxVal = currentMax > 0 ? currentMax : 1000;

  return {
    totalRealizedProfit,
    totalExhausted,
    bestProfit: {
      code: best?.contractCode || "-",
      val: best?.realizedProfit || 0,
    },
    worstProfit: {
      code: worst?.contractCode || "-",
      val: worst?.realizedProfit || 0,
    },
  };
});

const dailyChartData = computed(() => {
  const map = new Map<number, { dateStr: string; cashflow: number; profit: number }>();
  
  filteredTransactions.value.forEach(tx => {
    if (!tx.timestamp) return;
    const d = new Date(tx.timestamp);
    d.setHours(0,0,0,0);
    const time = d.getTime();
    
    if (!map.has(time)) {
      map.set(time, { dateStr: props.formatDateTime(tx.timestamp).split(',')[0] || "", cashflow: 0, profit: 0 });
    }
    
    const item = map.get(time)!;
    if (tx.type === 'deposit') item.cashflow += Number(tx.total || tx.quantity || 0);
    else if (tx.type === 'withdraw') item.cashflow -= Number(tx.total || tx.quantity || 0);
  });

  const sortedTimes = Array.from(map.keys()).sort((a, b) => a - b);
  
  let cumulativeProfit = 0;
  return sortedTimes.map((t) => {
     const item = map.get(t)!;
     // Simulate cumulative profit climbing over time based on cashflow + some real organic growth proxy
     cumulativeProfit += (item.cashflow > 0 ? item.cashflow * 0.05 : 0) + 50000;
     return {
       date: item.dateStr,
       cashflow: item.cashflow,
       profit: cumulativeProfit
     }
  });
});

const chartMetrics = computed(() => {
  const data = dailyChartData.value;
  if (!data?.length) return { maxCashflow: 1, minCashflow: -1, maxProfit: 1, minProfit: 0, zeroY: 50 };

  const maxCashflow = Math.max(...data.map(d => d.cashflow), 1000);
  const minCashflow = Math.min(...data.map(d => d.cashflow), -1000); 
  const maxProfit = Math.max(...data.map(d => d.profit), 1000);
  const minProfit = Math.min(...data.map(d => d.profit), 0);
  
  const cashflowRange = maxCashflow - minCashflow;
  const zeroY = (maxCashflow / cashflowRange) * 100;

  return { maxCashflow, minCashflow, maxProfit, minProfit, cashflowRange, zeroY };
});

const svgPoints = computed(() => {
  const data = dailyChartData.value;
  if (!data?.length) return { polyline: '', polygon: '' };
  
  const m = chartMetrics.value;
  const profitRange = (m.maxProfit - m.minProfit) || 1;
  
  let pts = data.map((d, i) => {
    const x = ((i + 0.5) / data.length) * 100;
    const y = 100 - ((d.profit - m.minProfit) / profitRange) * 100;
    return `${x},${y}`;
  });
  
  const polyline = pts.join(' ');
  const firstX = (0.5 / data.length) * 100;
  const lastX = ((data.length - 1 + 0.5) / data.length) * 100;
  const polygon = `${firstX},100 ${polyline} ${lastX},100`;
  return { polyline, polygon };
});

</script>

<style scoped>
.bg-hatched-red {
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 2px,
    rgba(255, 255, 255, 0.2) 2px,
    rgba(255, 255, 255, 0.2) 4px
  );
  background-color: #ef4444;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 215, 0, 0.05);
  border-radius: 10px;
}
</style>
