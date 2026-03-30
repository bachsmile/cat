<template>
  <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <h2 class="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
          Quản lý Lĩnh vực (Modules)
        </h2>
        <p class="text-gray-500 mt-2">
          Cấu hình và theo dõi các module dịch vụ trong hệ thống Finzo
        </p>
      </div>
      <div class="flex gap-3">
        <button class="px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl font-bold text-sm hover:bg-white/10 transition-all flex items-center gap-2">
          <DownloadIcon class="w-4 h-4" />
          Xuất báo cáo
        </button>
      </div>
    </div>

    <!-- Stats Overview -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="stat in stats" :key="stat.label" class="p-6 bg-[#0a0a0f] border border-white/5 rounded-3xl shadow-sm hover:border-blue-500/30 transition-all group">
        <div class="flex items-center gap-4">
          <div :class="`p-3 rounded-2xl ${stat.bg}`">
            <component :is="stat.icon" :class="`w-6 h-6 ${stat.color}`" />
          </div>
          <div>
            <p class="text-xs font-bold text-gray-500 uppercase tracking-widest">{{ stat.label }}</p>
            <p class="text-2xl font-bold mt-1">{{ stat.value }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modules Grid -->
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <div v-for="mod in modules" :key="mod.id" class="bg-[#0a0a0f] border border-white/5 rounded-3xl overflow-hidden shadow-xl hover:border-blue-500/20 transition-all group">
        <div class="p-6 border-b border-white/5 flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="p-3 bg-blue-600/10 rounded-2xl group-hover:scale-110 transition-transform">
              <component :is="getIcon(mod.icon)" class="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 class="text-lg font-bold">{{ mod.name }}</h3>
              <p class="text-xs text-blue-400 font-mono tracking-tighter">ID: {{ mod.id }}</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span :class="`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${mod.status === 'active' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-gray-500/10 text-gray-500 border-gray-500/20'}`">
              {{ mod.status === 'active' ? 'Hoạt động' : 'Bảo trì' }}
            </span>
          </div>
        </div>

        <div class="p-6 space-y-4">
          <p class="text-sm text-gray-400 leading-relaxed">{{ mod.description }}</p>
          
          <div class="grid grid-cols-2 gap-4 pt-2">
            <div class="p-4 bg-white/5 rounded-2xl border border-white/5">
              <p class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Số khách hàng</p>
              <p class="text-xl font-bold">{{ mod.userCount }}</p>
            </div>
            <div class="p-4 bg-white/5 rounded-2xl border border-white/5">
              <p class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Chỉ số sử dụng</p>
              <p class="text-xl font-bold">{{ mod.usage }}%</p>
            </div>
          </div>
        </div>

        <div class="px-6 py-4 bg-white/5 border-t border-white/5 flex items-center justify-between">
          <button class="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2">
            <SettingsIcon class="w-4 h-4" />
            Cấu hình tham số
          </button>
          <div class="flex gap-2">
            <button class="p-2 hover:bg-white/10 rounded-lg text-gray-500 hover:text-white transition-all">
              <EyeIcon class="w-4 h-4" />
            </button>
            <button class="p-2 hover:bg-red-500/10 rounded-lg text-gray-500 hover:text-red-400 transition-all">
              <TrashIcon class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { 
  Download as DownloadIcon,
  Package as PackageIcon,
  Users as UsersIcon,
  Zap as ZapIcon,
  Activity as ActivityIcon,
  Scale as ScaleIcon,
  LineChart as LineChartIcon,
  Stethoscope as StethoscopeIcon,
  BookOpen as BookOpenIcon,
  Settings as SettingsIcon,
  Eye as EyeIcon,
  Trash2 as TrashIcon
} from 'lucide-vue-next';

const stats = [
  { label: 'Tổng số Module', value: 4, icon: PackageIcon, bg: 'bg-blue-500/10', color: 'text-blue-400' },
  { label: 'Người dùng Module', value: '1.2k', icon: UsersIcon, bg: 'bg-indigo-500/10', color: 'text-indigo-400' },
  { label: 'Yêu cầu/Giây', value: 245, icon: ZapIcon, bg: 'bg-amber-500/10', color: 'text-amber-400' },
  { label: 'Uptime Hệ thống', value: '99.9%', icon: ActivityIcon, bg: 'bg-green-500/10', color: 'text-green-400' },
];

const modules = ref([
  { 
    id: 'law', 
    name: 'Module Pháp lý', 
    icon: 'Scale', 
    status: 'active', 
    description: 'Hỗ trợ soạn thảo văn bản pháp luật, quản lý hồ sơ vụ việc và lịch trình luật sư.',
    userCount: 450,
    usage: 88
  },
  { 
    id: 'finance', 
    name: 'Module Tài chính', 
    icon: 'LineChart', 
    status: 'active', 
    description: 'Quản lý danh mục đầu tư, tin tức thị trường AI và phân tích xu hướng tài sản số.',
    userCount: 320,
    usage: 74
  },
  { 
    id: 'medical', 
    name: 'Module Y tế', 
    icon: 'Stethoscope', 
    status: 'active', 
    description: 'Quản lý hồ sơ bệnh án, lịch khám và tư vấn sức khỏe qua AI.',
    userCount: 150,
    usage: 62
  },
  { 
    id: 'education', 
    name: 'Module Giáo dục', 
    icon: 'BookOpen', 
    status: 'inactive', 
    description: 'Hệ thống học tập trực tuyến, quản lý bài giảng và đánh giá năng lực học sinh.',
    userCount: 0,
    usage: 0
  }
]);

const getIcon = (iconName: string) => {
  switch(iconName) {
    case 'Scale': return ScaleIcon;
    case 'LineChart': return LineChartIcon;
    case 'Stethoscope': return StethoscopeIcon;
    case 'BookOpen': return BookOpenIcon;
    default: return PackageIcon;
  }
};
</script>
