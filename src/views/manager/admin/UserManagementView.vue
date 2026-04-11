<template>
  <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <!-- Header Section -->
    <div
      class="flex flex-col md:flex-row md:items-center justify-between gap-6"
    >
      <div>
        <h2
          class="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent"
        >
          <template v-if="currentModuleParam">
            <span :style="{ color: getModuleColor(currentModuleParam) }"
              >Quản lý nhân sự:</span
            >
            {{
              availableModules.find((m) => m.id === currentModuleParam)?.name ||
              currentModuleParam
            }}
          </template>
          <template v-else>
            {{
              currentUser.role?.toLowerCase() === "super_admin"
                ? "Quản lý người dùng hệ thống"
                : currentUser.role?.toLowerCase() === "admin"
                  ? "Quản lý thành viên (Tổ chức)"
                  : "Quản lý người dùng"
            }}
          </template>
        </h2>
        <p class="text-gray-500 mt-2">
          {{
            currentModuleParam
              ? `Danh sách nhân sự trực thuộc lĩnh vực ${availableModules.find((m) => m.id === currentModuleParam)?.name || currentModuleParam}`
              : currentUser.role?.toLowerCase() === "super_admin"
                ? "Đang hiển thị toàn bộ người dùng từ tất cả các Module và Hub hạ tầng"
                : currentUser.role?.toLowerCase() === "admin"
                  ? "Quản lý các tài khoản trực thuộc tổ chức của bạn"
                  : "Theo dõi và quản trị tài khoản hệ thống Finzo"
          }}
        </p>
      </div>
      <div class="flex gap-3">
        <div
          v-if="currentModuleParam"
          class="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/5 text-[10px] uppercase font-black tracking-widest text-gray-500"
        >
          <div
            class="w-2 h-2 rounded-full"
            :style="{ backgroundColor: getModuleColor(currentModuleParam) }"
          ></div>
          Module: {{ currentModuleParam }}
        </div>
        <button
          @click="openModal()"
          class="px-6 py-2.5 rounded-xl font-bold text-sm hover:shadow-lg transition-all flex items-center gap-2"
          :style="{
            background: `linear-gradient(to right, ${getModuleColor(currentModuleParam) || '#3b82f6'}, ${getModuleColor(currentModuleParam) || '#4f46e5'})`,
            boxShadow: `0 10px 15px -3px ${getModuleColor(currentModuleParam)}33`,
          }"
        >
          <PlusIcon class="w-4 h-4" />
          Thêm người dùng
        </button>
      </div>
    </div>

    <!-- Tabs Navigation -->
    <div
      class="flex items-center gap-2 p-1.5 bg-white/5 rounded-2xl border border-white/5 w-fit"
    >
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeSubTab = tab.id"
        class="px-6 py-2 rounded-xl text-sm font-bold transition-all"
        :class="
          activeSubTab === tab.id
            ? 'bg-white/10 text-white shadow-sm'
            : 'text-gray-500 hover:text-gray-300'
        "
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Main Module: Quản lý tài khoản (Account Management) -->
    <div v-if="activeSubTab === 'accounts'" class="space-y-6">
      <!-- Search & Filters -->
      <CgCard
        type="grain-frost"
        :shadow="true"
        opacity="1"
        class="flex flex-col md:flex-row gap-4 items-center justify-between p-4 rounded-[2rem] border border-white/5 bg-brand-600"
      >
        <div class="relative w-full md:w-96 group">
          <SearchIcon
            class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-blue-400 transition-colors"
          />
          <input
            v-model="searchQuery"
            placeholder="Tìm kiếm theo tên, email hoặc role..."
            class="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-blue-500/50 transition-all text-white"
          />
        </div>
        <div class="flex gap-4 w-full md:w-auto overflow-x-auto pb-1">
          <select
            v-model="roleFilter"
            class="bg-transparent border border-white/10 rounded-xl px-4 py-2 text-sm text-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
          >
            <option value="" class="bg-[#0a0a0f] text-white">
              Tất cả vai trò
            </option>
            <option
              v-for="role in roles"
              :key="role"
              :value="role"
              class="bg-[#0a0a0f] text-white"
            >
              {{ role }}
            </option>
          </select>
          <button
            class="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-bold hover:bg-white/10 transition-colors text-white"
          >
            <FilterIcon class="w-4 h-4" />
            Bộ lọc
          </button>
        </div>
      </CgCard>

      <!-- Users Table Container -->
      <CgCard
        type="heavy-frost"
        :shadow="true"
        class="rounded-[2.5rem] border overflow-hidden p-0 bg-brand-800"
      >
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-white/5 border-b border-white/5">
                <th
                  class="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest"
                >
                  Người dùng
                </th>
                <th
                  class="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center"
                >
                  Lĩnh vực
                </th>
                <th
                  class="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest"
                >
                  Vai trò
                </th>
                <th
                  class="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest"
                >
                  Trạng thái
                </th>
                <th
                  class="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center"
                >
                  Số lần Login
                </th>
                <th
                  class="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right"
                >
                  Gói & Thời hạn
                </th>
                <th
                  class="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right"
                >
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-white/5">
              <tr
                v-for="u in filteredUsers"
                :key="u.email"
                class="hover:bg-white/[0.02] transition-colors group"
              >
                <td class="px-6 py-5">
                  <div class="flex items-center gap-4">
                    <div class="relative">
                      <img
                        :src="
                          u.avatar ||
                          `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.email}`
                        "
                        class="w-10 h-10 rounded-full border border-white/10"
                      />
                      <div
                        class="absolute -bottom-0.5 -right-0.5 w-3 h-3 border-2 border-[#0a0a0f] rounded-full"
                        :class="
                          u.status === 'active' ? 'bg-green-500' : 'bg-gray-600'
                        "
                      ></div>
                    </div>
                    <div>
                      <p
                        class="font-black text-sm text-white group-hover:text-blue-400 transition-colors"
                      >
                        {{ u.username || u.email.split("@")[0] }}
                      </p>
                      <div class="flex items-center gap-2 mt-0.5">
                        <p class="text-[10px] text-gray-500 font-mono">
                          {{ u.email }}
                        </p>
                        <div
                          v-if="u.managedById"
                          class="flex items-center gap-1 px-1.5 py-0.5 bg-indigo-500/10 border border-indigo-500/20 rounded text-[8px] font-black uppercase text-indigo-400"
                        >
                          <ShieldIcon class="w-2 h-2" />
                          Mgd by: {{ u.managedById }}
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-5">
                  <div class="flex flex-wrap gap-1 justify-center">
                    <span
                      v-for="modId in u.modules || []"
                      :key="modId"
                      class="px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-md text-[9px] font-bold uppercase"
                    >
                      {{ modId }}
                    </span>
                    <span
                      v-if="!u.modules?.length"
                      class="text-[9px] text-gray-600"
                      >--</span
                    >
                  </div>
                </td>
                <td class="px-6 py-5">
                  <span
                    class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border"
                    :class="getRoleStyles(u.role)"
                  >
                    {{ u.role }}
                  </span>
                </td>
                <td class="px-6 py-5 text-nowrap">
                  <div class="flex items-center gap-2">
                    <span
                      v-if="u.status === 'active'"
                      class="text-green-400 text-xs flex items-center gap-1.5"
                    >
                      <CheckCircleIcon class="w-3.5 h-3.5" /> Hoạt động
                    </span>
                    <span
                      v-else
                      class="text-gray-500 text-xs flex items-center gap-1.5"
                    >
                      <PauseIcon class="w-3.5 h-3.5" /> Bị khóa
                    </span>
                  </div>
                </td>
                <td class="px-6 py-5 text-center">
                  <span
                    class="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg text-xs font-mono font-bold"
                  >
                    {{ u.loginCount || 0 }} lần
                  </span>
                </td>
                <td class="px-6 py-5 text-right">
                  <div class="flex flex-col items-end gap-1">
                    <span
                      class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase border"
                      :class="getPlanStyles(u.subscriptionPlan)"
                    >
                      {{ u.subscriptionPlan || "none" }}
                    </span>
                    <span
                      v-if="u.subscriptionExpiresAt"
                      class="text-[9px] text-gray-500"
                    >
                      Hết hạn:
                      {{
                        new Date(u.subscriptionExpiresAt).toLocaleDateString(
                          "en-CA",
                        )
                      }}
                    </span>
                    <span
                      v-else
                      class="text-[9px] text-emerald-500 font-bold uppercase tracking-widest"
                    >
                      Vĩnh viễn
                    </span>
                  </div>
                </td>
                <td class="px-6 py-5">
                  <div class="flex items-center justify-end gap-2">
                    <button
                      @click="openModal(u)"
                      class="p-2 hover:bg-blue-500/10 text-gray-500 hover:text-blue-400 rounded-lg transition-all"
                      title="Chỉnh sửa"
                    >
                      <EditIcon class="w-4 h-4" />
                    </button>
                    <button
                      @click="handleDelete(u.id)"
                      class="p-2 hover:bg-red-500/10 text-gray-500 hover:text-red-400 rounded-lg transition-all"
                      title="Xóa"
                    >
                      <TrashIcon class="w-4 h-4" />
                    </button>
                    <button
                      class="p-2 hover:bg-white/10 text-gray-500 hover:text-white rounded-lg transition-all"
                    >
                      <MoreHorizontalIcon class="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination Table Footer -->
        <div
          class="p-4 border-t border-white/5 bg-white/5 flex items-center justify-between"
        >
          <p class="text-xs text-gray-500">
            Hiển thị {{ filteredUsers.length }}/{{ users.length }} người dùng
          </p>
          <div class="flex gap-2">
            <button
              class="px-3 py-1 bg-white/5 rounded border border-white/5 text-gray-500 text-xs disabled:opacity-50"
            >
              Trước
            </button>
            <button
              class="px-3 py-1 bg-blue-600 rounded border border-blue-500 text-white text-xs"
            >
              1
            </button>
            <button
              class="px-3 py-1 bg-white/5 rounded border border-white/5 text-gray-400 text-xs"
            >
              Sau
            </button>
          </div>
        </div>
      </CgCard>
    </div>

    <!-- User Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <CgCard
        type="fine-frost"
        :shadow="true"
        class="w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 p-0 border border-white"
      >
        <div
          class="p-6 border-b border-white/5 flex items-center justify-between bg-white/5"
        >
          <h3 class="text-xl font-bold">
            {{ isEditing ? "Chỉnh sửa tài khoản" : "Thêm tài khoản mới" }}
          </h3>
          <button
            @click="closeModal"
            class="p-2 text-gray-500 hover:text-white"
          >
            <XIcon class="w-5 h-5" />
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="p-8 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label
                class="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1"
                >Username</label
              >
              <input
                v-model="form.username"
                required
                placeholder="Nguyễn Văn A"
                class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
            <div class="space-y-2">
              <label
                class="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1"
                >Email</label
              >
              <input
                v-model="form.email"
                type="email"
                required
                :disabled="isEditing"
                placeholder="user@example.com"
                class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500 transition-all disabled:opacity-50"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label
                class="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1"
                >Vai trò</label
              >
              <select
                v-model="form.role"
                required
                class="w-full bg-[#1a1a24] border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500 transition-all text-white"
              >
                <option
                  v-for="role in roles"
                  :key="role"
                  :value="role"
                  class="bg-[#1a1a24] text-white"
                >
                  {{ role }}
                </option>
              </select>
            </div>
            <div class="space-y-2">
              <label
                class="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1"
                >Mật khẩu</label
              >
              <input
                v-model="form.password"
                type="password"
                :required="!isEditing"
                placeholder="••••••••"
                class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div class="space-y-2">
            <label
              class="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1"
              >Trạng thái</label
            >
            <div class="flex gap-4">
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  v-model="form.status"
                  value="active"
                  class="hidden peer"
                />
                <div
                  class="px-4 py-2 rounded-xl text-xs font-bold border transition-all peer-checked:ring-2 peer-checked:ring-blue-500/50"
                  :class="
                    form.status === 'active'
                      ? 'bg-green-500/20 text-green-400 border-green-500/40'
                      : 'bg-white/5 text-gray-500 border-white/5'
                  "
                >
                  Hoạt động
                </div>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  v-model="form.status"
                  value="suspended"
                  class="hidden peer"
                />
                <div
                  class="px-4 py-2 rounded-xl text-xs font-bold border transition-all peer-checked:ring-2 peer-checked:ring-blue-500/50"
                  :class="
                    form.status === 'suspended'
                      ? 'bg-red-500/20 text-red-400 border-red-500/40'
                      : 'bg-white/5 text-gray-500 border-white/5'
                  "
                >
                  Bị khóa
                </div>
              </label>
            </div>
          </div>

          <!-- Module Permissions -->
          <div class="space-y-4 pt-4 border-t border-white/5">
            <h4
              class="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1"
            >
              Phân quyền Lĩnh vực
            </h4>
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <label
                v-for="mod in availableModules"
                :key="mod.id"
                class="flex items-center gap-2 p-3 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 transition-all"
                :class="{
                  'border-blue-500/50 bg-blue-500/10': form.modules.includes(
                    mod.id,
                  ),
                }"
              >
                <input
                  type="checkbox"
                  :value="mod.id"
                  v-model="form.modules"
                  :disabled="!!currentModuleParam"
                  class="w-4 h-4 accent-blue-500 disabled:opacity-50"
                />
                <span class="text-xs font-semibold">{{ mod.name }}</span>
              </label>
            </div>
          </div>

          <!-- Subscription Plan Section (Moved down) -->
          <div
            v-if="form.modules.length > 0"
            class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/5 animate-in slide-in-from-top-2 duration-300"
          >
            <div class="space-y-2">
              <label
                class="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1"
                >Gói dịch vụ</label
              >
              <select
                v-model="form.subscriptionPlan"
                required
                class="w-full bg-[#1a1a24] border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500 transition-all text-white"
              >
                <optgroup label="Gói cơ bản">
                  <option value="trial">Dùng thử (Trial)</option>
                  <option value="basic">Gói Cơ bản</option>
                </optgroup>

                <optgroup
                  v-for="modId in form.modules"
                  :key="modId"
                  :label="
                    availableModules.find((m) => m.id === modId)?.name || modId
                  "
                >
                  <option
                    v-for="plan in getModulePlans(modId)"
                    :key="plan.id"
                    :value="plan.id"
                  >
                    {{ plan.name }}
                  </option>
                </optgroup>
              </select>
            </div>
            <div class="space-y-2">
              <label
                class="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1"
                >Thời hạn đến</label
              >
              <input
                v-model="form.subscriptionExpiresAt"
                type="date"
                class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
          </div>
          <div
            v-else
            class="text-center p-4 bg-white/5 border border-white/5 rounded-xl text-[10px] text-gray-500 italic"
          >
            Vui lòng chọn ít nhất một Lĩnh vực để cấu hình Gói dịch vụ
          </div>

          <div class="pt-4 flex gap-3">
            <button
              type="button"
              @click="closeModal"
              class="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold text-sm transition-all"
            >
              Hủy
            </button>
            <button
              type="submit"
              :disabled="submitting"
              class="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50"
            >
              {{
                submitting
                  ? "Đang lưu..."
                  : isEditing
                    ? "Cập nhật"
                    : "Tạo tài khoản"
              }}
            </button>
          </div>
        </form>
      </CgCard>
    </div>

    <!-- Mock Content for other SubTabs -->
    <div
      v-else
      class="bg-[#0a0a0f] rounded-3xl border border-white/5 p-20 text-center"
    >
      <div
        class="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <UsersIcon class="w-10 h-10 text-blue-400" />
      </div>
      <h3 class="text-xl font-bold mb-2">
        Module {{ tabs.find((t) => t.id === activeSubTab)?.label }}
      </h3>
      <p class="text-gray-500">
        Chúng tôi đang phát triển các chức năng chi tiết cho phần này.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import {
  Users as UsersIcon,
  UserPlus as PlusIcon,
  Search as SearchIcon,
  Filter as FilterIcon,
  MoreHorizontal as MoreHorizontalIcon,
  Edit2 as EditIcon,
  Trash2 as TrashIcon,
  CheckCircle as CheckCircleIcon,
  Pause as PauseIcon,
  X as XIcon,
  Shield as ShieldIcon,
} from "lucide-vue-next";
import { useRoute } from "vue-router";
import { DOMAINS } from "@/constants/modules";
import { userApi, type User } from "@/api/user";
import { CgCard } from "glass-studio-ui-pro";

const route = useRoute();
const props = defineProps<{
  initialRole?: string;
}>();

const activeSubTab = ref("accounts");
const tabs = [
  { id: "accounts", label: "Quản lý tài khoản" },
  { id: "groups", label: "Nhóm người dùng" },
  { id: "permissions", label: "Phân quyền hệ thống" },
];

const currentModuleParam = computed(() => {
  if (route.query.module) return route.query.module as string;
  const path = route.path;
  if (path.includes("law-admin")) return "law";
  if (path.startsWith("/finance")) return "finance";
  if (path.startsWith("/medical")) return "medical";
  if (path.startsWith("/education")) return "education";
  if (path.startsWith("/retail")) return "retail";
  if (path.startsWith("/logistics")) return "logistics";
  return null;
});

const getModuleColor = (modId?: string | null) => {
  if (!modId) return "#3b82f6"; // default blue
  const domain = DOMAINS.find((d) => d.id === modId);
  return domain?.hexColor || "#3b82f6";
};
const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

const availableModules = computed(() => {
  const all = [
    { id: "law", name: "Pháp lý", icon: "Scale" },
    { id: "finance", name: "Tài chính", icon: "LineChart" },
    { id: "medical", name: "Y tế", icon: "Stethoscope" },
    { id: "education", name: "Giáo dục", icon: "BookOpen" },
  ];

  if (currentUser.role?.toLowerCase() === "admin") {
    return all.filter((m) => (currentUser.modules || []).includes(m.id));
  }
  return all;
});

const roles = computed(() => {
  if (currentUser.role?.toLowerCase() === "admin") {
    return ["manager", "moderator", "user", "guest"];
  }
  return ["super_admin", "admin", "manager", "moderator", "user", "guest"];
});

const users = ref<User[]>([]);
const searchQuery = ref("");
const roleFilter = ref("");
const loading = ref(false);

const showModal = ref(false);
const submitting = ref(false);
const isEditing = ref(false);
const editingId = ref<string | null>(null);

interface UserForm {
  username: string;
  email: string;
  password?: string;
  role: string;
  status: "active" | "suspended";
  modules: string[];
  subscriptionPlan: string;
  subscriptionExpiresAt: string;
}

const form = ref<UserForm>({
  username: "",
  email: "",
  password: "",
  role: "user",
  status: "active",
  modules: [],
  subscriptionPlan: "none",
  subscriptionExpiresAt: "",
});

const fetchUsers = async () => {
  loading.value = true;
  const data = await userApi.getUsers();
  if (Array.isArray(data)) {
    users.value = data;
  }
  loading.value = false;
};

onMounted(() => {
  // Initialize from props
  if (props.initialRole) {
    roleFilter.value = props.initialRole;
  }
  // OR initialize from URL query (if not in a specialized hub tab)
  else if (route.query.role) {
    roleFilter.value = route.query.role as string;
  }

  fetchUsers();
});

const filteredUsers = computed(() => {
  const query = searchQuery.value.toLowerCase();
  const role = roleFilter.value;
  const targetModule = currentModuleParam.value;

  return users.value.filter((u) => {
    // 1. Hierarchical Filter (Admin only sees their own managed users)
    if (currentUser.role?.toLowerCase() === "admin") {
      // Use String() to ensure comparison works regardless of number vs string types
      if (!u.managedById || String(u.managedById) !== String(currentUser.id))
        return false;
    }

    // 2. Module Context Filter (Optional query param ?module=...)
    if (targetModule && !u.modules?.includes(targetModule)) {
      return false;
    }

    const matchesQuery =
      u.email.toLowerCase().includes(query) ||
      (u.username || "").toLowerCase().includes(query) ||
      u.role.toLowerCase().includes(query);

    const matchesRole = !role || u.role === role;

    return matchesQuery && matchesRole;
  });
});

const openModal = (u?: User) => {
  const targetModule = currentModuleParam.value;

  if (u) {
    isEditing.value = true;
    editingId.value = u.id;
    form.value = {
      username: (u.username as string) || "",
      email: u.email as string,
      password: "",
      role: u.role as string,
      status: (u.status as any) || "active",
      modules: (u.modules as string[]) || [],
      subscriptionPlan: (u.subscriptionPlan as string) || "none",
      subscriptionExpiresAt: u.subscriptionExpiresAt
        ? new Date(u.subscriptionExpiresAt).toISOString().substring(0, 10)
        : "",
    };
  } else {
    isEditing.value = false;
    editingId.value = null;

    // Default to the module from the query param if it exists
    const defaultModules = targetModule ? [targetModule] : [];

    form.value = {
      username: "",
      email: "",
      password: "",
      role: "user",
      status: "active",
      modules: defaultModules,
      subscriptionPlan: "none",
      subscriptionExpiresAt: "",
    };
  }
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const handleSubmit = async () => {
  submitting.value = true;
  const payload: any = { ...form.value };

  if (isEditing.value && !payload.password) {
    delete payload.password;
  }

  // Quota & Hierarchy Security Logic
  if (!isEditing.value && currentUser.role?.toLowerCase() === "admin") {
    // 1. Map to managing admin
    payload.managedById = currentUser.id;

    // 2. Check Quota (Skip if no quota defined, or check against existing users)
    const managedUsersCount = users.value.filter(
      (u) => String(u.managedById) === String(currentUser.id),
    ).length;
    const currentQuota = currentUser.userQuota || 999;

    if (managedUsersCount >= currentQuota) {
      alert(
        `Cảnh báo: Bạn đã đạt giới hạn tối đa (${currentQuota}) tài khoản thành viên. Vui lòng liên hệ Super Admin để nâng cấp gói.`,
      );
      submitting.value = false;
      return;
    }
  }

  // Handle permanent subscription (empty date = null)
  if (!payload.subscriptionExpiresAt || payload.subscriptionExpiresAt === "") {
    payload.subscriptionExpiresAt = null;
  }

  let result;
  if (isEditing.value && editingId.value) {
    result = await userApi.updateUser(editingId.value, payload);
  } else {
    result = await userApi.createUser(payload);
  }

  if (result && !result.message) {
    await fetchUsers();
    closeModal();
  } else if (result.message) {
    alert(result.message);
  }
  submitting.value = false;
};

const handleDelete = async (id: string) => {
  if (confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
    const result = await userApi.deleteUser(id);
    if (result && !result.message) {
      await fetchUsers();
    } else {
      alert(result.message || "Xóa thất bại");
    }
  }
};

const getRoleStyles = (role: string) => {
  switch (role) {
    case "super_admin":
      return "bg-orange-500/10 text-orange-500 border-orange-500/20 shadow-[inset_0_0_10px_rgba(249,115,22,0.1)] font-black";
    case "admin":
      return "bg-red-500/10 text-red-500 border-red-500/20";
    case "manager":
      return "bg-purple-500/10 text-purple-500 border-purple-500/20";
    case "moderator":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    case "user":
      return "bg-green-500/10 text-green-500 border-green-500/20";
    default:
      return "bg-gray-500/10 text-gray-500 border-gray-500/20";
  }
};

const getPlanStyles = (plan: string | undefined) => {
  if (!plan || plan === "none")
    return "bg-gray-500/10 text-gray-500 border-gray-500/20";

  if (plan.includes("law"))
    return "bg-blue-500/10 text-blue-500 border-blue-500/20";
  if (plan.includes("finance"))
    return "bg-purple-500/10 text-purple-500 border-purple-500/20";
  if (plan.includes("medical"))
    return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
  if (plan.includes("education"))
    return "bg-amber-500/10 text-amber-500 border-amber-500/20";

  switch (plan) {
    case "trial":
      return "bg-amber-500/10 text-amber-500 border-amber-500/20";
    case "basic":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    case "pro":
      return "bg-purple-500/10 text-purple-500 border-purple-500/20";
    case "enterprise":
      return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
    default:
      return "bg-gray-500/10 text-gray-500 border-gray-500/20";
  }
};

const getModulePlans = (modId: string) => {
  const plansMap: Record<string, { id: string; name: string }[]> = {
    law: [
      { id: "law_standard", name: "Pháp lý Tiêu chuẩn" },
      { id: "law_pro", name: "Pháp lý Chuyên nghiệp" },
      { id: "law_firm", name: "Gói Văn phòng Luật" },
    ],
    finance: [
      { id: "finance_starter", name: "Tài chính Khởi nghiệp" },
      { id: "finance_professional", name: "Tài chính Chuyên nghiệp" },
      { id: "finance_whale", name: "Gói Whale Strategy" },
    ],
    medical: [
      { id: "medical_clinic", name: "Gói Phòng mạch" },
      { id: "medical_hospital", name: "Gói Bệnh viện" },
    ],
    education: [
      { id: "edu_standard", name: "Giáo dục Tiêu chuẩn" },
      { id: "edu_campus", name: "Gói Campus Connect" },
    ],
  };
  return plansMap[modId] || [];
};
</script>

<style scoped></style>
