<template>
  <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <!-- Header Section -->
    <div
      class="flex flex-col md:flex-row md:items-center justify-between gap-6"
    >
      <div>
        <h2
          class="text-4xl font-black bg-gradient-to-r from-indigo-500 to-blue-600 bg-clip-text text-transparent tracking-tighter uppercase"
        >
          Quản lý Tổ chức
        </h2>
        <p
          class="text-gray-500 mt-2 font-black uppercase text-[10px] tracking-[0.2em]"
        >
          Dành riêng cho khách hàng đăng ký Module Pháp lý (Law)
        </p>
      </div>
      <div class="flex gap-4">
        <CgCard
          type="glass-frost"
          class="flex items-center gap-3 px-6 py-3 rounded-2xl border border-white/50"
        >
          <BuildingIcon class="w-5 h-5 text-indigo-500" />
          <span class="text-sm font-black text-[#1a1c3d] tracking-widest"
            >{{ organizations.length }} TỔ CHỨC</span
          >
        </CgCard>
      </div>
    </div>

    <!-- Search & Filters -->
    <CgCard
      type="grain-frost"
      :shadow="true"
      class="flex flex-col md:flex-row gap-6 items-center justify-between p-6 rounded-[2.5rem] border border-white/50"
    >
      <div class="relative w-full md:w-96 group">
        <SearchIcon
          class="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors"
        />
        <input
          v-model="searchQuery"
          placeholder="Tìm tổ chức, email hoặc người đại diện..."
          class="w-full bg-white/50 border border-white/50 rounded-2xl py-4 pl-14 pr-6 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all font-bold placeholder:text-gray-600 !text-[#1a1c3d]"
        />
      </div>

      <div class="flex gap-4">
        <select
          v-model="typeFilter"
          class="w-48 bg-gray-50/80 border border-gray-200 rounded-2xl px-6 py-4 font-black uppercase text-[10px] !text-[#1a1c3d] outline-none focus:ring-4 focus:ring-brand-500/10 transition-all"
        >
          <option value="">Tất cả loại hình</option>
          <option value="business">Doanh nghiệp</option>
          <option value="individual">Cá nhân</option>
        </select>
      </div>
    </CgCard>

    <!-- Organizations Table -->
    <CgCard
      type="heavy-frost"
      :shadow="true"
      class="rounded-[3rem] border border-white/50 overflow-hidden relative"
    >
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-white/20 border-b border-white/20">
              <th
                class="px-8 py-6 text-[11px] font-black text-gray-500 uppercase tracking-[0.2em]"
              >
                Tên Tổ chức / Khách hàng
              </th>
              <th
                class="px-8 py-6 text-[11px] font-black text-gray-500 uppercase tracking-[0.2em]"
              >
                Đại diện / Admin
              </th>
              <th
                class="px-8 py-6 text-[11px] font-black text-gray-500 uppercase tracking-[0.2em]"
              >
                Tài khoản con
              </th>
              <th
                class="px-8 py-6 text-[11px] font-black text-gray-500 uppercase tracking-[0.2em]"
              >
                Gói dịch vụ
              </th>
              <th
                class="px-8 py-6 text-[11px] font-black text-gray-500 uppercase tracking-[0.2em] text-center"
              >
                Trạng thái
              </th>
              <th
                class="px-8 py-6 text-[11px] font-black text-gray-500 uppercase tracking-[0.2em] text-right"
              >
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/10">
            <tr
              v-for="org in filteredOrganizations"
              :key="org.id"
              class="hover:bg-white/20 transition-colors group"
            >
              <td class="px-8 py-6">
                <div class="flex items-center gap-5">
                  <div
                    class="w-14 h-14 rounded-3xl flex items-center justify-center bg-indigo-50/50 text-indigo-600 shadow-inner group-hover:scale-105 transition-transform border border-indigo-100/50"
                  >
                    <BuildingIcon
                      v-if="org.customerType === 'business'"
                      class="w-6 h-6"
                    />
                    <UserIcon v-else class="w-6 h-6" />
                  </div>
                  <div>
                    <h4
                      class="font-black text-[#1a1c3d] text-lg tracking-tight group-hover:text-indigo-600 transition-colors"
                    >
                      {{
                        org.organizationName ||
                        org.username ||
                        "Chưa đặt tên"
                      }}
                    </h4>
                    <p
                      class="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-0.5"
                    >
                      ID: #{{ org.id.substring(0, 8) }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-8 py-6">
                <div class="flex flex-col">
                  <span class="font-bold text-[#1a1c3d] text-sm">{{
                    org.username
                  }}</span>
                  <span class="text-xs text-gray-400 font-bold lowercase">{{
                    org.email
                  }}</span>
                </div>
              </td>
              <td class="px-8 py-6">
                <div class="flex flex-col gap-1">
                  <div class="flex items-center gap-2">
                    <span class="font-black text-[#1a1c3d]">{{
                      getSubUserCount(org.id)
                    }}</span>
                    <span class="text-gray-300">/</span>
                    <span class="text-gray-400 font-bold">{{
                      org.userQuota || 10
                    }}</span>
                  </div>
                  <div
                    class="w-24 h-1.5 bg-gray-200/50 rounded-full overflow-hidden"
                  >
                    <div
                      class="h-full bg-indigo-500 rounded-full transition-all"
                      :style="{
                        width: `${Math.min((getSubUserCount(org.id) / (org.userQuota || 10)) * 100, 100)}%`,
                      }"
                    ></div>
                  </div>
                </div>
              </td>
              <td class="px-8 py-6">
                <div class="flex flex-col gap-1">
                  <span
                    class="px-3 py-1 bg-indigo-50/50 text-indigo-600 border border-indigo-100/50 rounded-lg text-[10px] font-black uppercase w-fit"
                  >
                    {{ org.subscriptionPlan || "Trial" }}
                  </span>
                  <span
                    v-if="org.subscriptionExpiresAt"
                    class="text-[9px] text-gray-400 font-bold"
                  >
                    Hết hạn:
                    {{
                      new Date(org.subscriptionExpiresAt).toLocaleDateString(
                        "vi-VN",
                      )
                    }}
                  </span>
                </div>
              </td>
              <td class="px-8 py-6 text-center">
                <div class="flex items-center justify-center gap-2">
                  <div
                    class="w-2 h-2 rounded-full shadow-sm"
                    :class="
                      org.status === 'active' ? 'bg-emerald-500' : 'bg-rose-500'
                    "
                  ></div>
                  <span
                    class="text-[10px] font-black uppercase tracking-widest"
                    :class="
                      org.status === 'active'
                        ? 'text-emerald-500'
                        : 'text-rose-500'
                    "
                  >
                    {{ org.status === "active" ? "Hoạt động" : "Đóng băng" }}
                  </span>
                </div>
              </td>
              <td class="px-8 py-6 text-right">
                <div class="flex items-center justify-end gap-2 transition-all">
                  <CgButton
                    variant="ghost"
                    @click="openSubUsers(org)"
                    class="p-3 bg-white/50 border border-white/50 rounded-2xl hover:border-indigo-200 transition-all shadow-sm group/btn"
                    title="Xem danh sách user"
                  >
                    <EyeIcon class="w-4 h-4 text-indigo-600" />
                  </CgButton>
                  <CgButton
                    variant="ghost"
                    @click="toggleStatus(org)"
                    class="p-3 bg-white/50 border border-white/50 rounded-2xl transition-all shadow-sm group/btn"
                    :title="org.status === 'active' ? 'Đóng băng' : 'Kích hoạt'"
                  >
                    <ShieldOffIcon
                      v-if="org.status === 'active'"
                      class="w-4 h-4 text-rose-600"
                    />
                    <ShieldCheckIcon v-else class="w-4 h-4 text-emerald-600" />
                  </CgButton>
                  <CgButton
                    variant="ghost"
                    @click="openEditOrg(org)"
                    class="p-3 bg-white/50 border border-white/50 rounded-2xl hover:border-amber-200 transition-all shadow-sm group/btn"
                    title="Cấu hình gói & Quota"
                  >
                    <Settings2Icon class="w-4 h-4 text-amber-600" />
                  </CgButton>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination/Footer -->
      <div
        class="p-8 border-t border-white/20 flex items-center justify-between bg-white/10"
      >
        <p
          class="text-[10px] text-gray-400 font-black uppercase tracking-widest"
        >
          Hiển thị {{ filteredOrganizations.length }} trong số
          {{ organizations.length }} tổ chức
        </p>
        <div class="flex gap-2">
          <CgButton
            variant="ghost"
            class="w-10 h-10 flex items-center justify-center bg-white/50 border border-white/50 rounded-xl text-gray-400 disabled:opacity-30"
          >
            <ChevronLeftIcon class="w-5 h-5" />
          </CgButton>
          <CgButton
            class="w-10 h-10 flex items-center justify-center bg-indigo-600 text-white rounded-xl font-black shadow-lg shadow-indigo-500/30"
          >
            1
          </CgButton>
          <CgButton
            variant="ghost"
            class="w-10 h-10 flex items-center justify-center bg-white/50 border border-white/50 rounded-xl text-gray-400"
          >
            <ChevronRightIcon class="w-5 h-5" />
          </CgButton>
        </div>
      </div>
    </CgCard>

    <!-- Modal: Managed Users -->
    <CgModal
      v-model="showSubUsersModal"
      type="heavy-frost"
      distortion="mist"
      shadow="reflex"
      width="1200px"
    >
      <template #header>
        <div class="flex items-center justify-between w-full">
          <div>
            <h3
              class="text-2xl font-black text-brand-900 uppercase tracking-tighter"
            >
              Danh sách tài khoản trực thuộc
            </h3>
            <p
              class="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mt-1"
            >
              Tổ chức:
              <span class="text-indigo-600">{{
                selectedOrg?.organizationName || selectedOrg?.username
              }}</span>
            </p>
          </div>
          <div class="flex gap-4 mr-10">
            <CgButton
              @click="openAddUser"
              class="flex items-center gap-3 px-6 py-3 bg-brand-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-brand-500/20 hover:scale-105 transition-transform"
            >
              <UserIcon class="w-4 h-4" />
              Thêm tài khoản mới
            </CgButton>
          </div>
        </div>
      </template>

      <div class="max-h-[60vh] overflow-y-auto p-4 scrollbar-hide">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-white/10">
              <th
                class="pb-6 text-[10px] font-black text-gray-400 uppercase tracking-widest"
              >
                Tên người dùng
              </th>
              <th
                class="pb-6 text-[10px] font-black text-gray-400 uppercase tracking-widest"
              >
                Vai trò
              </th>
              <th
                class="pb-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center"
              >
                Trạng thái
              </th>
              <th
                class="pb-6 text-[10px] font-black text-gray-500 uppercase tracking-widest text-right"
              >
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5">
            <tr v-for="user in currentSubUsers" :key="user.id" class="group">
              <td class="py-6">
                <div class="flex items-center gap-4">
                  <div
                    class="w-10 h-10 rounded-xl bg-white/40 flex items-center justify-center text-brand-600 font-black border border-white/50 uppercase"
                  >
                    {{ user.username?.[0] || "U" }}
                  </div>
                  <div>
                    <p class="font-black text-[#1a1c3d]">
                      {{ user.username }}
                    </p>
                    <p class="text-[10px] text-gray-400 font-bold lowercase">
                      {{ user.email }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="py-6">
                <span
                  class="px-3 py-1 bg-white/30 text-gray-500 text-[10px] font-black uppercase rounded-lg border border-white/50"
                >
                  {{ user.role }}
                </span>
              </td>
              <td class="py-6 text-center">
                <span
                  class="text-[10px] font-black uppercase tracking-widest"
                  :class="
                    user.status === 'active'
                      ? 'text-emerald-500'
                      : 'text-gray-300'
                  "
                >
                  {{ user.status === "active" ? "● Hoạt động" : "○ Tạm khóa" }}
                </span>
              </td>
              <td class="py-6 text-right">
                <div
                  class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0 translate-x-4"
                >
                  <CgButton
                    variant="ghost"
                    class="p-2 hover:bg-white/50 rounded-lg text-gray-400 hover:text-brand-900 transition-all font-bold"
                  >
                    <EditIcon class="w-3.5 h-3.5" />
                  </CgButton>
                  <CgButton
                    variant="ghost"
                    @click="toggleStatus(user)"
                    class="p-2 hover:bg-white/50 rounded-lg text-gray-400 transition-all"
                    :class="
                      user.status === 'active'
                        ? 'hover:text-rose-500'
                        : 'hover:text-emerald-500'
                    "
                  >
                    <ShieldOffIcon
                      v-if="user.status === 'active'"
                      class="w-3.5 h-3.5"
                    />
                    <ShieldCheckIcon v-else class="w-3.5 h-3.5" />
                  </CgButton>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="currentSubUsers.length === 0" class="py-20 text-center">
          <UserIcon class="w-12 h-12 text-gray-200 mx-auto mb-4" />
          <p
            class="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]"
          >
            Chưa có tài khoản nào được quản lý bởi admin này.
          </p>
        </div>
      </div>
    </CgModal>

    <!-- Modal: Edit Settings (Quota & Plan) -->
    <CgModal
      v-model="showEditModal"
      type="soft-mist"
      distortion="mist"
      shadow="reflex"
      width="600px"
      title="Cấu hình Tổ chức"
    >
      <div class="space-y-8 p-6">
        <div class="space-y-3">
          <label
            class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1"
            >Gói dịch vụ hiện tại</label
          >
          <select
            v-model="editData.subscriptionPlan"
            @change="onPlanChange(editData)"
            class="w-full bg-gray-50/80 border border-gray-200 rounded-2xl p-4 font-black uppercase tracking-widest text-xs !text-[#1a1c3d] outline-none focus:ring-4 focus:ring-brand-500/10 transition-all"
          >
            <option value="1_month">Gói 1 Tháng - 20$</option>
            <option value="1_year">Gói 1 Năm - 100$ (Gốc 120$)</option>
            <option value="permanent">Gói Vĩnh Viễn - 400$ (Gốc 500$)</option>
          </select>
        </div>

        <div class="space-y-3">
          <label
            class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1"
            >Thời hạn</label
          >
          <select
            v-model="editData.duration"
            @change="updateExpiryFromDuration(editData)"
            class="w-full bg-gray-50/80 border border-gray-200 rounded-2xl p-4 font-black uppercase tracking-widest text-xs !text-[#1a1c3d] outline-none focus:ring-4 focus:ring-brand-500/10 transition-all"
          >
            <option value="">Chọn thời hạn...</option>
            <option value="30_days">30 ngày</option>
            <option value="1_year">1 năm</option>
            <option value="permanent">Vĩnh viễn</option>
          </select>
        </div>

        <div class="space-y-3">
          <label
            class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1"
            >Giới hạn số lượng User (Quota)</label
          >
          <div class="flex items-center gap-4">
            <input
              v-model.number="editData.userQuota"
              type="number"
              class="flex-1 bg-gray-50/80 border border-gray-200 rounded-2xl p-4 font-black text-sm !text-[#1a1c3d] outline-none focus:ring-4 focus:ring-brand-500/10 transition-all"
            />
            <div
              class="px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest"
            >
              tài khoản
            </div>
          </div>
        </div>

        <div class="pt-6">
          <CgButton
            @click="saveOrgSettings"
            class="w-full bg-brand-600 hover:bg-brand-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-brand-600/20 transition-all active:scale-95 uppercase tracking-widest"
          >
            Lưu thay đổi
          </CgButton>
        </div>
      </div>
    </CgModal>

    <!-- Modal: Add Sub-User to Organization -->
    <CgModal
      v-model="showAddSubUserModal"
      type="soft-mist"
      shadow="reflex"
      width="600px"
      title="Thành viên mới"
    >
      <div class="space-y-6 p-6">
        <p
          class="text-[10px] text-gray-500 font-bold uppercase tracking-widest -mt-4 mb-4"
        >
          Cấp cho tổ chức:
          <span class="text-brand-600">{{
            selectedOrg?.organizationName || selectedOrg?.username
          }}</span>
        </p>

        <div class="space-y-3">
          <label
            class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1"
            >Username</label
          >
          <input
            v-model="addSubUserForm.username"
            type="text"
            placeholder="Ví dụ: Nguyễn Văn A"
            class="w-full bg-gray-50/80 border border-gray-200 rounded-2xl p-4 font-black text-sm !text-[#1a1c3d] outline-none focus:ring-4 focus:ring-brand-500/10 transition-all placeholder:text-gray-400"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-3">
            <label
              class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1"
              >Email</label
            >
            <input
              v-model="addSubUserForm.email"
              type="email"
              placeholder="admin@domain.com"
              class="w-full bg-gray-50/80 border border-gray-200 rounded-2xl p-4 font-black text-sm !text-[#1a1c3d] outline-none focus:ring-4 focus:ring-brand-500/10 transition-all placeholder:text-gray-400"
            />
          </div>
          <div class="space-y-3">
            <label
              class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1"
              >Mật khẩu</label
            >
            <input
              v-model="addSubUserForm.password"
              type="password"
              placeholder="••••••••"
              class="w-full bg-gray-50/80 border border-gray-200 rounded-2xl p-4 font-black text-sm !text-[#1a1c3d] outline-none focus:ring-4 focus:ring-brand-500/10 transition-all placeholder:text-gray-400"
            />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-3">
            <label
              class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1"
              >Gói dịch vụ</label
            >
            <select
              v-model="addSubUserForm.subscriptionPlan"
              @change="onPlanChange(addSubUserForm)"
              class="w-full bg-gray-50/80 border border-gray-200 rounded-2xl p-4 font-black uppercase tracking-widest text-xs !text-[#1a1c3d] outline-none focus:ring-4 focus:ring-brand-500/10 transition-all"
            >
              <option
                v-for="plan in availablePlansForSubUser"
                :key="plan.id"
                :value="plan.id"
              >
                {{ plan.label }}
              </option>
            </select>
          </div>
          <div class="space-y-3">
            <label
              class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1"
              >Thời hạn</label
            >
            <select
              v-model="addSubUserForm.duration"
              @change="updateExpiryFromDuration(addSubUserForm)"
              class="w-full bg-gray-50/80 border border-gray-200 rounded-2xl p-4 font-black uppercase tracking-widest text-xs !text-[#1a1c3d] outline-none focus:ring-4 focus:ring-brand-500/10 transition-all"
            >
              <option value="">Chọn thời hạn...</option>
              <option value="30_days">30 ngày</option>
              <option value="1_year">1 năm</option>
              <option value="permanent">Vĩnh viễn</option>
            </select>
          </div>
        </div>

        <div class="pt-4">
          <CgButton
            @click="handleAddSubUser"
            :loading="loading"
            class="w-full bg-brand-600 hover:bg-brand-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-brand-600/20 transition-all active:scale-95 uppercase tracking-widest"
          >
            Tạo tài khoản
          </CgButton>
        </div>
      </div>
    </CgModal>
    <!-- Super Admin Dock -->
    <Teleport to="body">
      <SuperAdminDock />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { CgCard, CgButton, CgModal } from "glass-studio-ui-pro";
import {
  Building as BuildingIcon,
  Search as SearchIcon,
  ShieldCheck as ShieldCheckIcon,
  Edit3 as EditIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Eye as EyeIcon,
  ShieldOff as ShieldOffIcon,
  Settings2 as Settings2Icon,
  User as UserIcon,
} from "lucide-vue-next";
import { userApi, type User } from "@/api/user";
import SuperAdminDock from "@/components/admin/SuperAdminDock.vue";

const allUsers = ref<User[]>([]);
const organizations = ref<User[]>([]);
const searchQuery = ref("");
const typeFilter = ref("");
const loading = ref(false);

const fetchOrganizations = async () => {
  loading.value = true;
  const data = await userApi.getUsers();
  if (Array.isArray(data)) {
    allUsers.value = data;
    // Filter only top-level Admins (Organizations) who are not managed by others
    organizations.value = data.filter(
      (u) =>
        u.role === "admin" &&
        u.modules?.includes("law") &&
        (!u.managedById || u.managedById === ""),
    );
  }
  loading.value = false;
};

const getSubUserCount = (adminId: string) => {
  return allUsers.value.filter((u) => u.managedById === adminId).length;
};

// Plan Hierarchy for Validation
const PLAN_LEVELS: Record<string, number> = {
  '1_month': 1,
  '1_year': 2,
  permanent: 3,
};

const ALL_PLANS = [
  { id: "1_month", label: "Gói 1 Tháng - 20$" },
  { id: "1_year", label: "Gói 1 Năm - 100$ (Tiết kiệm $20)" },
  { id: "permanent", label: "Gói Vĩnh Viễn - 400$ (Giảm 20%)" },
];

const PLAN_DEFAULT_DURATIONS: Record<string, string> = {
  "1_month": "30_days",
  "1_year": "1_year",
  permanent: "permanent",
};

const onPlanChange = (form: any) => {
  const plan = (form.subscriptionPlan || "trial").toLowerCase();
  form.duration = PLAN_DEFAULT_DURATIONS[plan] || "";
  updateExpiryFromDuration(form);
};

const updateExpiryFromDuration = (form: any) => {
  if (form.duration === "permanent") {
    form.subscriptionExpiresAt = "";
  } else if (form.duration === "14_days") {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    form.subscriptionExpiresAt = d.toISOString().split("T")[0];
  } else if (form.duration === "30_days") {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    form.subscriptionExpiresAt = d.toISOString().split("T")[0];
  } else if (form.duration === "1_year") {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 1);
    form.subscriptionExpiresAt = d.toISOString().split("T")[0];
  }
};

// Sub Users Management
const showSubUsersModal = ref(false);
const showAddSubUserModal = ref(false);
const selectedOrg = ref<User | null>(null);

const addSubUserForm = ref({
  username: "",
  email: "",
  password: "",
  role: "user",
  subscriptionPlan: "trial",
  subscriptionExpiresAt: "",
  duration: "",
});

const currentSubUsers = computed(() => {
  if (!selectedOrg.value) return [];
  return allUsers.value.filter((u) => u.managedById === selectedOrg.value?.id);
});

const openSubUsers = (org: User) => {
  selectedOrg.value = org;
  showSubUsersModal.value = true;
};

const availablePlansForSubUser = computed(() => {
  if (!selectedOrg.value) return ALL_PLANS.slice(0, 1);
  const managerPlan = (selectedOrg.value.subscriptionPlan || "trial").toLowerCase();
  const managerLevel = PLAN_LEVELS[managerPlan] || 1;
  return ALL_PLANS.filter((p) => PLAN_LEVELS[p.id] <= managerLevel);
});

const openAddUser = () => {
  if (!selectedOrg.value) return;

  // Reset form with defaults matching owner
  addSubUserForm.value = {
    username: "",
    email: "",
    password: "",
    role: "user",
    subscriptionPlan: (selectedOrg.value.subscriptionPlan || "trial") as string,
    subscriptionExpiresAt: (selectedOrg.value.subscriptionExpiresAt
      ? new Date(selectedOrg.value.subscriptionExpiresAt)
          .toISOString()
          .split("T")[0]
      : "") as string,
    duration: "",
  };
  showAddSubUserModal.value = true;
};

const handleAddSubUser = async () => {
  if (!selectedOrg.value) return;

  loading.value = true;
  try {
    const payload = {
      ...addSubUserForm.value,
      managedById: selectedOrg.value.id,
      modules: selectedOrg.value.modules || ["law"],
    };

    const res = await userApi.createUser(payload);
    if (res) {
      await fetchOrganizations(); // Refresh list to update counts
      showAddSubUserModal.value = false;
      alert("Tạo tài khoản thành công!");
    }
  } catch (err: any) {
    alert(err.response?.data?.message || err.message || "Có lỗi xảy ra");
  } finally {
    loading.value = false;
  }
};

// Toggle Status (Freeze/Activate)
const toggleStatus = async (user: User) => {
  const newStatus = user.status === "active" ? "suspended" : "active";
  const res = await userApi.updateUser(user.id, { status: newStatus });
  if (res && (res.status === 200 || !res.status)) {
    // !res.status for successful patch return
    user.status = newStatus;
  }
};

// Edit Modal Logic
const showEditModal = ref(false);
const editData = ref({
  id: "",
  subscriptionPlan: "",
  userQuota: 10,
  duration: "",
  subscriptionExpiresAt: "",
});

const openEditOrg = (org: User) => {
  editData.value = {
    id: org.id,
    subscriptionPlan: org.subscriptionPlan || "trial",
    userQuota: org.userQuota || 10,
    duration: "", // Clear duration on open to allow new selection
    subscriptionExpiresAt: (org.subscriptionExpiresAt
      ? new Date(org.subscriptionExpiresAt).toISOString().split("T")[0]
      : "") as string,
  };
  showEditModal.value = true;
};

const saveOrgSettings = async () => {
  loading.value = true;
  try {
    const res = await userApi.updateUser(editData.value.id, {
      subscriptionPlan: editData.value.subscriptionPlan,
      userQuota: editData.value.userQuota,
      subscriptionExpiresAt: editData.value.subscriptionExpiresAt || "",
    });

    if (res) {
      await fetchOrganizations(); // Refresh the list from server for total accuracy
      showEditModal.value = false;
      alert("Cập nhật tổ chức thành công!");
    }
  } catch (err: any) {
    alert(err.response?.data?.message || err.message || "Có lỗi xảy ra khi cập nhật");
  } finally {
    loading.value = false;
  }
};


onMounted(() => {
  fetchOrganizations();
});

const filteredOrganizations = computed(() => {
  let filtered = organizations.value;

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (o) =>
        (o.organizationName || "").toLowerCase().includes(q) ||
        o.email.toLowerCase().includes(q) ||
        (o.username || "").toLowerCase().includes(q),
    );
  }

  if (typeFilter.value) {
    filtered = filtered.filter((o) => o.customerType === typeFilter.value);
  }

  return filtered;
});
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes zoom-in {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-in {
  animation-fill-mode: forwards;
}

.fade-in {
  animation-name: fade-in;
}

.zoom-in-95 {
  animation-name: zoom-in;
}
</style>
