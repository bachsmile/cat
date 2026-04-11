<template>
  <div class="animate-in fade-in duration-700">
    <div class="glass-vibrant p-10 rounded-[45px] flex flex-col relative overflow-hidden text-left min-h-[800px] shadow-[0_60px_120px_rgba(0,0,0,0.7)] border-white/5">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-14">
        <div class="flex items-center gap-7">
          <div class="w-3 h-14 bg-gold-vibrant rounded-full shadow-[0_0_30px_#FFD700]"></div>
          <div>
            <h4 class="text-lg font-bold text-white uppercase tracking-[0.2em] leading-tight text-glow">Sổ cái quản trị nghiệp vụ</h4>
            <p class="text-[9px] text-gray-500 font-bold uppercase tracking-[0.3em] mt-1 italic opacity-60">Truy cập sổ cái đã xác thực</p>
          </div>
        </div>
        <div class="flex items-center gap-6 bg-white/[0.02] p-2.5 rounded-[30px] border border-white/10 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] group/filter hover:border-gold-vibrant/40 transition-all">
          <CalendarIcon class="w-5 h-5 text-gray-600 ml-4 group-hover/filter:text-gold-vibrant transition-colors" />
          <select 
            :value="selectedMonth" 
            @change="$emit('update:selectedMonth', ($event.target as HTMLSelectElement).value)"
            class="bg-transparent text-xs font-black uppercase tracking-[0.3em] text-white border-0 focus:ring-0 cursor-pointer pr-12 italic"
          >
            <option value="all" class="bg-[#0A0A0B]">DỮ LIỆU TOÀN CHU KỲ</option>
            <option v-for="m in availableMonths" :key="m" :value="m" class="bg-[#0A0A0B]">KỲ BÁO CÁO THÁNG {{ m }}</option>
          </select>
        </div>
      </div>

      <!-- Statistics Hub for Ledger -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div v-for="stat in ledgerStats" :key="stat.label" 
             class="p-6 rounded-[32px] bg-white/[0.015] border border-white/5 flex flex-col items-center text-center group/stat hover:bg-white/[0.04] transition-all">
          <p class="text-[9px] font-black text-gray-500 uppercase tracking-widest italic mb-2">{{ stat.label }}</p>
          <p class="text-xl font-black italic tracking-tighter" :class="stat.color">{{ stat.value }}</p>
        </div>
      </div>

      <div class="flex-1 overflow-x-auto custom-scrollbar pr-2">
        <table class="w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr class="text-gray-500 text-[10px] font-bold uppercase tracking-widest bg-white/[0.02]">
              <th class="px-6 py-4 rounded-l-2xl">Thời gian / Nguồn gốc</th>
              <th class="px-6 py-4">Loại nghiệp vụ</th>
              <th class="px-6 py-4 text-right">Khối lượng</th>
              <th class="px-6 py-4 text-right">Giá thực hiện</th>
              <th class="px-6 py-4 text-right">Lợi nhuận thực tế (P&L)</th>
              <th class="px-8 py-4 text-right rounded-r-2xl">Tổng giá trị</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="tx in transactions" :key="tx.id">
              <tr class="bg-white/[0.015] hover:bg-white/[0.04] transition-all group/row">
                <td class="py-5 px-6 rounded-l-2xl border-l border-y border-white/5">
                  <p class="text-sm font-bold text-white tracking-tight leading-none">{{ formatDateTime(tx.timestamp).split(',')[0] }}</p>
                  <div class="flex flex-wrap items-center gap-2 mt-2">
                    <p class="text-[11px] text-gray-600 font-medium uppercase tracking-widest italic">{{ tx.source || 'HỆ THỐNG GỐC NODE A' }}</p>
                    <span class="px-2.5 py-1 rounded-lg border text-[11px] font-black uppercase tracking-tighter transition-all"
                          :class="tx.type === 'deposit' ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400' : 'bg-gold-vibrant/5 border-gold-vibrant/20 text-gold-vibrant'">
                      <template v-if="tx.type === 'deposit'">
                         {{ tx.contractCode || `DP-${tx.id.split('-')[0].toUpperCase()}` }}
                      </template>
                      <template v-else-if="tx.lotWithdrawals && tx.lotWithdrawals.length">
                         {{ tx.lotWithdrawals[0].contractCode || `DP-${tx.lotWithdrawals[0].lotId.split('-')[0].toUpperCase()}` }}
                         <span v-if="tx.lotWithdrawals.length > 1" class="ml-1 opacity-60">(+{{ tx.lotWithdrawals.length - 1 }} lô khác)</span>
                      </template>
                      <template v-else>
                         {{ tx.contractCode || `DP-${tx.id.split('-')[0].toUpperCase()}` }}
                      </template>
                    </span>
                  </div>
                </td>
                <td class="py-5 px-6 border-y border-white/5">
                  <div class="flex items-center gap-4">
                    <div class="w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-700 bg-white/5 border-white/10 group-hover/row:scale-110" 
                         :class="{
                           'text-emerald-400': tx.type === 'deposit' || tx.type === 'unstaking',
                           'text-red-400': tx.type === 'withdraw',
                           'text-sky-400': tx.type === 'staking',
                           'text-gold-vibrant': tx.type === 'swap'
                         }">
                      <component :is="['deposit', 'unstaking'].includes(tx.type) ? PlusIcon : RefreshCwIcon" class="w-4 h-4" v-if="tx.type === 'swap'" />
                      <component :is="['deposit', 'unstaking'].includes(tx.type) ? PlusIcon : ArrowUpRightIcon" class="w-5 h-5" v-else />
                    </div>
                    <div>
                        <span class="text-[12px] font-bold uppercase tracking-widest" :class="{
                            'text-emerald-400': tx.type === 'deposit' || tx.type === 'unstaking',
                            'text-red-400': tx.type === 'withdraw',
                            'text-sky-400': tx.type === 'staking',
                            'text-gold-vibrant': tx.type === 'swap'
                          }">{{ tx.type === 'staking' ? 'Gửi Lãi' : tx.type === 'unstaking' ? 'Rút Lãi' : tx.type === 'swap' ? 'Chuyển đổi' : tx.type }}</span>
                      <p class="text-[10px] text-gray-600 font-medium uppercase tracking-tighter mt-1 opacity-70">Xác thực hệ thống</p>
                    </div>
                  </div>
                </td>
                <td class="py-5 px-6 text-right font-bold text-white text-sm tracking-tight border-y border-white/5">{{ formatNumber(tx.quantity) }}</td>
                <td class="py-5 px-6 text-right font-bold text-white text-sm tracking-tight border-y border-white/5">{{ formatNumber(tx.price) }} <span class="text-[10px] text-gray-600 font-bold ml-0.5 mt-2">₫</span></td>
                <td class="py-5 px-6 text-right border-y border-white/5">
                  <span v-if="tx.profitAmount !== undefined && (tx.type === 'withdraw' || tx.type === 'swap')" class="text-sm font-bold tracking-tight" :class="tx.profitAmount >= 0 ? 'text-emerald-400' : 'text-red-400'">
                    {{ tx.profitAmount >= 0 ? '+' : '' }}{{ formatNumber(tx.profitAmount) }}
                  </span>
                  <span v-else class="text-gray-800 text-[9px] font-bold uppercase tracking-widest opacity-20">---</span>
                </td>
                <td class="py-5 px-8 text-right rounded-r-2xl font-bold text-white text-base tracking-tight border-r border-y border-white/5">
                  {{ formatNumber(tx.total) }} <span class="text-[10px] text-gray-600 font-bold ml-1">₫</span>
                </td>
              </tr>
              <!-- Lot Breakdown Row for Withdrawals & Swaps -->
              <tr v-if="(tx.type === 'withdraw' || tx.type === 'swap') && tx.lotWithdrawals?.length" class="bg-white/[0.005]">
                <td colspan="6" class="px-6 py-0 border-x border-b border-white/5 rounded-b-2xl overflow-hidden">
                  <div class="px-6 py-4 flex flex-wrap gap-4 items-center bg-white/[0.01] border-t border-white/5">
                    <span class="text-[9px] text-gray-500 font-bold uppercase tracking-[0.2em] mr-2">Phân tách lộ trình rút vốn HIFO:</span>
                    <div v-for="lot in tx.lotWithdrawals" :key="lot.lotId" 
                         class="px-4 py-2 rounded-xl border border-white/5 bg-black/20 flex items-center gap-4 transition-all hover:border-white/10 group/lot">
                      <div class="flex flex-col">
                        <span class="text-[10px] text-gray-600 uppercase font-black tracking-tighter mb-1">Mã hợp đồng lô</span>
                        <span class="text-[12px] text-white font-bold">{{ lot.contractCode || 'HỆ THỐNG' }}</span>
                      </div>
                      <div class="w-[1px] h-6 bg-white/5"></div>
                      <div class="flex flex-col text-right">
                        <span class="text-[10px] text-gray-600 uppercase font-black tracking-tighter mb-1">Chiết xuất từ lô</span>
                        <span class="text-[12px] text-white font-bold">{{ formatNumber(lot.quantityTaken) }}</span>
                      </div>
                      <div class="w-[1px] h-6 bg-white/5"></div>
                      <div class="flex flex-col text-right">
                        <span class="text-[10px] text-gray-600 uppercase font-black tracking-tighter mb-1">Lãi thực nhận</span>
                        <span class="text-[12px] font-bold" :class="lot.profit >= 0 ? 'text-emerald-400' : 'text-red-400'">
                          {{ lot.profit >= 0 ? '+' : '' }}{{ formatNumber(lot.profit) }}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
        <div v-if="!transactions?.length" class="flex flex-col items-center justify-center py-56 opacity-10 italic">
          <ClockIcon class="w-28 h-28 mb-12 text-gray-600" />
          <p class="text-base font-black uppercase tracking-[1em] text-gray-600">KHÔNG CÓ BẢN GHI GIAO DỊCH</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { 
  Calendar as CalendarIcon, 
  Plus as PlusIcon, 
  ArrowUpRight as ArrowUpRightIcon, 
  Clock as ClockIcon,
  RefreshCw as RefreshCwIcon
} from "lucide-vue-next";

const props = defineProps<{
  transactions: any[];
  selectedMonth: string;
  availableMonths: string[];
  formatNumber: (val: number) => string;
  formatDateTime: (ts: string | number) => string;
}>();

defineEmits(['update:selectedMonth']);

const ledgerStats = computed(() => {
  const txs = props.transactions || [];
  const totalVolume = txs.reduce((acc, tx) => acc + Number(tx.quantity), 0);
  const totalValue = txs.reduce((acc, tx) => acc + Number(tx.total), 0);
  const totalPnl = txs.reduce((acc, tx) => acc + (Number(tx.profitAmount) || 0), 0);

  return [
    { label: 'Số lượng phiên', value: txs.length, color: 'text-white' },
    { label: 'Khối lượng luân chuyển', value: props.formatNumber(totalVolume), color: 'text-white' },
    { label: 'Tổng giá trị tích lũy', value: props.formatNumber(totalValue) + ' ₫', color: 'text-gold-vibrant' },
    { label: 'Alpha tích lũy (P&L)', value: (totalPnl >= 0 ? '+' : '') + props.formatNumber(totalPnl) + ' ₫', color: totalPnl >= 0 ? 'text-emerald-400' : 'text-red-400' },
  ];
});
</script>
