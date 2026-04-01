<template>
  <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h3 class="text-2xl font-bold text-white flex items-center gap-3">
          <ShieldCheckIcon class="w-8 h-8 text-purple-500" />
          Quản lý Bản quyền & Giấy phép
        </h3>
        <p class="text-gray-500 mt-1">Cấp mới và quản lý danh sách mã license cho hệ thống npm</p>
      </div>
      <button 
        @click="showCreateModal = true"
        class="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-2xl font-bold transition-all shadow-lg shadow-purple-500/20 group"
      >
        <PlusIcon class="w-5 h-5 group-hover:rotate-90 transition-transform" />
        Tạo License Mới
      </button>
    </div>

    <!-- Stats Overview -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="glass-panel p-6 rounded-3xl border relative overflow-hidden group">
        <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <KeyIcon class="w-12 h-12 text-purple-500" />
        </div>
        <p class="text-gray-500 text-sm font-medium">Tổng số License</p>
        <h4 class="text-3xl font-bold mt-2">{{ licenses.length }}</h4>
      </div>
      <div class="glass-panel p-6 rounded-3xl border relative overflow-hidden group">
        <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <CheckCircleIcon class="w-12 h-12 text-green-500" />
        </div>
        <p class="text-gray-500 text-sm font-medium">Đang hoạt động</p>
        <h4 class="text-3xl font-bold mt-2 text-green-400">{{ activeCount }}</h4>
      </div>
      <div class="glass-panel p-6 rounded-3xl border relative overflow-hidden group">
        <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <AlertTriangleIcon class="w-12 h-12 text-amber-500" />
        </div>
        <p class="text-gray-500 text-sm font-medium">Sắp hết hạn (30 ngày)</p>
        <h4 class="text-3xl font-bold mt-2 text-amber-400">{{ expiringSoonCount }}</h4>
      </div>
    </div>

    <!-- License Table -->
    <div class="glass-panel rounded-3xl border overflow-hidden">
      <div class="p-6 border-b border-white/5 flex items-center justify-between">
        <h4 class="font-bold">Danh sách License</h4>
        <div class="relative">
          <SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Tìm kiếm theo mã hoặc khách hàng..."
            class="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-purple-500/50 w-64 transition-colors"
          />
        </div>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="text-gray-500 text-xs uppercase tracking-widest border-b border-white/5">
              <th class="px-6 py-4 font-medium">Mã License</th>
              <th class="px-6 py-4 font-medium">Khách hàng</th>
              <th class="px-6 py-4 font-medium">Ngày tạo</th>
              <th class="px-6 py-4 font-medium">Ngày hết hạn</th>
              <th class="px-6 py-4 font-medium">Trạng thái</th>
              <th class="px-6 py-4 font-medium text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5">
            <tr v-if="loading" class="animate-pulse">
              <td colspan="6" class="px-6 py-8 text-center text-gray-500">Đang tải dữ liệu...</td>
            </tr>
            <tr v-else-if="filteredLicenses.length === 0" class="text-center">
              <td colspan="6" class="px-6 py-8 text-gray-500">Không tìm thấy mã license nào</td>
            </tr>
            <tr 
              v-for="license in filteredLicenses" 
              :key="license.id"
              class="hover:bg-white/5 transition-colors group"
            >
              <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                  <code class="text-purple-400 font-mono text-sm bg-purple-500/10 px-2 py-1 rounded">{{ license.licenseKey }}</code>
                  <button 
                    @click="copyToClipboard(license.licenseKey)"
                    class="opacity-0 group-hover:opacity-100 p-1 hover:text-white transition-opacity text-gray-500"
                    title="Copy mã"
                  >
                    <CopyIcon class="w-3.5 h-3.5" />
                  </button>
                </div>
              </td>
              <td class="px-6 py-4 text-sm font-medium text-gray-300">
                {{ license.metadata || 'N/A' }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-500">
                {{ formatDate(license.createdAt) }}
              </td>
              <td class="px-6 py-4 text-sm">
                <span :class="getExpiryClass(license.expiresAt)">
                  {{ formatDate(license.expiresAt) }}
                </span>
              </td>
              <td class="px-6 py-4">
                <span 
                  class="px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border"
                  :class="license.isActive && !isExpired(license.expiresAt) 
                    ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                    : 'bg-red-500/10 text-red-400 border-red-500/20'"
                >
                  {{ license.isActive && !isExpired(license.expiresAt) ? 'Active' : 'Expired' }}
                </span>
              </td>
              <td class="px-6 py-4 text-right flex justify-end gap-2">
                <button 
                  @click="openRenewModal(license)"
                  class="p-2 hover:bg-purple-500/10 rounded-lg transition-colors text-gray-400 hover:text-purple-400"
                  title="Gia hạn License"
                >
                  <CalendarClockIcon class="w-5 h-5" />
                </button>
                <button class="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white">
                  <MoreHorizontalIcon class="w-5 h-5" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Create Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showCreateModal = false"></div>
      <div class="bg-[#0a0a0f] border border-white/10 rounded-3xl w-full max-w-md relative z-10 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        <div class="p-6 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-purple-600/10 to-transparent">
          <h4 class="font-bold text-lg">Tạo License Mới</h4>
          <button @click="showCreateModal = false" class="text-gray-500 hover:text-white">
            <XIcon class="w-6 h-6" />
          </button>
        </div>
        <form @submit.prevent="handleCreate" class="p-6 space-y-4">
          <div>
            <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Thông tin khách hàng</label>
            <input 
              v-model="newLicense.metadata"
              type="text" 
              placeholder="Ví dụ: Công ty A - Gói Pro"
              class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-purple-500/50 transition-colors"
              required
            />
          </div>
          <div>
            <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Ngày hết hạn</label>
            <input 
              v-model="newLicense.expiresAt"
              type="date" 
              class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-purple-500/50 transition-colors"
              required
            />
          </div>
          <div class="pt-4 flex gap-3">
            <button 
              type="button"
              @click="showCreateModal = false"
              class="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-bold text-sm transition-all"
            >
              Hủy
            </button>
            <button 
              type="submit"
              :disabled="creating"
              class="flex-1 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold text-sm transition-all shadow-lg shadow-purple-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Loader2Icon v-if="creating" class="w-4 h-4 animate-spin" />
              {{ creating ? 'Đang tạo...' : 'Xác nhận cấp' }}
            </button>
          </div>
        </form>
      </div>
    </div>
    <!-- Renew Modal -->
    <div v-if="showRenewModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showRenewModal = false"></div>
      <div class="glass-panel rounded-3xl w-full max-w-sm relative z-10 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        <div class="p-6 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-purple-600/10 to-transparent">
          <h4 class="font-bold text-lg">Gia hạn License</h4>
          <button @click="showRenewModal = false" class="text-gray-500 hover:text-white">
            <XIcon class="w-6 h-6" />
          </button>
        </div>
        <div class="p-6 space-y-4">
          <div class="bg-white/5 p-4 rounded-2xl border border-white/5">
            <p class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Mã License</p>
            <code class="text-purple-400 text-xs">{{ selectedLicense?.licenseKey }}</code>
            <p class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-3 mb-1">Cấu hình hiện tại</p>
            <p class="text-sm font-medium">Hết hạn: {{ selectedLicense ? formatDate(selectedLicense.expiresAt) : '' }}</p>
          </div>

          <div class="grid grid-cols-2 gap-2">
            <button 
              v-for="opt in renewOptions" 
              :key="opt.label"
              @click="setRenewOption(opt)"
              class="px-3 py-2 text-[11px] font-bold rounded-xl border transition-all text-center"
              :class="selectedOption === opt.value 
                ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/20' 
                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'"
            >
              {{ opt.label }}
            </button>
          </div>

          <div v-if="selectedOption === 'custom' || selectedOption === 'permanent'">
            <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
              {{ selectedOption === 'permanent' ? 'Ngày hết hạn vĩnh viễn' : 'Ngày hết hạn tùy chọn' }}
            </label>
            <input 
              v-model="renewDate"
              type="date" 
              :disabled="selectedOption === 'permanent'"
              class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-purple-500/50 transition-colors disabled:opacity-50"
              required
            />
          </div>
          <div v-else class="bg-purple-500/5 p-3 rounded-xl border border-purple-500/10 text-center">
            <p class="text-xs text-purple-400 font-medium">Hết hạn mới: <span class="font-bold">{{ formatDate(renewDate) }}</span></p>
          </div>

          <div class="pt-2 flex gap-3">
            <button 
              @click="showRenewModal = false"
              class="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-bold text-sm transition-all"
            >
              Hủy
            </button>
            <button 
              @click="handleRenew"
              :disabled="renewing"
              class="flex-1 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold text-sm transition-all shadow-lg shadow-purple-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Loader2Icon v-if="renewing" class="w-4 h-4 animate-spin" />
              {{ renewing ? 'Đang gia hạn...' : 'Xác nhận' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { 
  ShieldCheck as ShieldCheckIcon, 
  Plus as PlusIcon,
  Search as SearchIcon,
  Copy as CopyIcon,
  X as XIcon,
  MoreHorizontal as MoreHorizontalIcon,
  Key as KeyIcon,
  CheckCircle as CheckCircleIcon,
  AlertTriangle as AlertTriangleIcon,
  Loader2 as Loader2Icon,
  CalendarClock as CalendarClockIcon
} from 'lucide-vue-next';
import { licenseApi, type License } from '../../api/license';

const licenses = ref<License[]>([]);
const loading = ref(true);
const creating = ref(false);
const showCreateModal = ref(false);
const searchQuery = ref('');

const newLicense = ref({
  metadata: '',
  expiresAt: ''
});

const showRenewModal = ref(false);
const selectedLicense = ref<License | null>(null);
const renewDate = ref('');
const renewing = ref(false);

const renewOptions = [
  { label: '1 Ngày', value: '1d' },
  { label: '1 Tuần', value: '1w' },
  { label: '1 Tháng', value: '1m' },
  { label: '1 Năm', value: '1y' },
  { label: 'Vĩnh viễn', value: 'permanent' },
  { label: 'Tùy chọn', value: 'custom' }
];
const selectedOption = ref('1m');

const setRenewOption = (opt: { label: string, value: string }) => {
  selectedOption.value = opt.value;
  if (!selectedLicense.value) return;

  const currentExpiry = new Date(selectedLicense.value.expiresAt);
  const now = new Date();
  const baseDate = currentExpiry < now ? now : currentExpiry;
  const newDate = new Date(baseDate);

  if (opt.value === '1d') {
    newDate.setDate(newDate.getDate() + 1);
  } else if (opt.value === '1w') {
    newDate.setDate(newDate.getDate() + 7);
  } else if (opt.value === '1m') {
    newDate.setMonth(newDate.getMonth() + 1);
  } else if (opt.value === '1y') {
    newDate.setFullYear(newDate.getFullYear() + 1);
  } else if (opt.value === 'permanent') {
    newDate.setFullYear(9999);
    newDate.setMonth(0);
    newDate.setDate(1);
  } else if (opt.value === 'custom') {
    return;
  }
  
  renewDate.value = newDate.toISOString().substring(0, 10);
};

const fetchLicenses = async () => {
  try {
    loading.value = true;
    licenses.value = await licenseApi.getAll();

  } catch (error) {
    console.error('Failed to fetch licenses:', error);
  } finally {
    loading.value = false;
  }
};

const handleCreate = async () => {
  try {
    creating.value = true;
    await licenseApi.create({
      metadata: newLicense.value.metadata,
      expiresAt: new Date(newLicense.value.expiresAt)
    });
    showCreateModal.value = false;
    newLicense.value = { metadata: '', expiresAt: '' };
    await fetchLicenses();
  } catch (error) {
    console.error('Failed to create license:', error);
    alert('Không thể tạo license. Vui lòng thử lại.');
  } finally {
    creating.value = false;
  }
};

const openRenewModal = (license: License) => {
  selectedLicense.value = license;
  selectedOption.value = '1m';
  setRenewOption(renewOptions[2]!); // Default to 1 month (index 2 in the new array)
  showRenewModal.value = true;
};

const handleRenew = async () => {
  if (!selectedLicense.value || !renewDate.value) return;
  try {
    renewing.value = true;
    await licenseApi.update(selectedLicense.value.id, {
      expiresAt: new Date(renewDate.value)
    });
    showRenewModal.value = false;
    await fetchLicenses();
  } catch (error) {
    console.error('Failed to renew license:', error);
    alert('Không thể gia hạn license. Vui lòng thử lại.');
  } finally {
    renewing.value = false;
  }
};

const filteredLicenses = computed(() => {
  if (!searchQuery.value) return licenses.value;
  const q = searchQuery.value.toLowerCase();
  return licenses.value.filter(l => 
    l.licenseKey.toLowerCase().includes(q) || 
    (l.metadata && l.metadata.toLowerCase().includes(q))
  );
});

const activeCount = computed(() => 
  licenses.value.filter(l => l.isActive && !isExpired(l.expiresAt)).length
);

const disappearingThreshold = 30 * 24 * 60 * 60 * 1000; // 30 days
const expiringSoonCount = computed(() => {
  const now = new Date().getTime();
  return licenses.value.filter(l => {
    const expiry = new Date(l.expiresAt).getTime();
    return l.isActive && expiry > now && (expiry - now) < disappearingThreshold;
  }).length;
});

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('vi-VN');
};

const isExpired = (dateStr: string) => {
  return new Date(dateStr) < new Date();
};

const getExpiryClass = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();
  if (date < now) return 'text-red-400 font-bold';
  const diff = date.getTime() - now.getTime();
  if (diff < disappearingThreshold) return 'text-amber-400 font-medium';
  return 'text-gray-400';
};

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  // Ideally use a toast notification here
  alert('Đã copy mã license code!');
};

onMounted(fetchLicenses);
</script>
