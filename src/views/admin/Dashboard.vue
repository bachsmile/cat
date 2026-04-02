<template>
  <div
    class="h-screen bg-transparent text-white flex font-['Inter',_sans-serif] overflow-hidden"
  >
    <!-- Sidebar - Desktop -->
    <aside
      class="hidden lg:flex w-64 glass-panel border-r flex-col h-screen sticky top-0"
    >
      <div class="p-6 flex items-center gap-3 mb-6">
        <div
          class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform"
        >
          <TerminalIcon class="w-5 h-5 text-white" />
        </div>
        <span class="text-xl font-bold tracking-tight">Finzo</span>
      </div>

      <nav
        class="flex-1 px-4 space-y-1.5 overflow-y-auto custom-sidebar-scroll"
      >
        <div v-for="item in menuItems" :key="item.name" class="space-y-1">
          <!-- Main Menu Item -->
          <div v-if="item.children" class="flex flex-col">
            <button
              @click="toggleSubmenu(item.name)"
              class="flex items-center justify-between w-full px-4 py-2.5 rounded-xl transition-all duration-200 group relative text-gray-500 hover:text-white hover:bg-white/5"
            >
              <div class="flex items-center gap-3">
                <component
                  :is="item.icon"
                  class="w-5 h-5 group-hover:scale-110 transition-transform relative z-10"
                  :style="{
                    color: isAnyChildActive(item)
                      ? getModuleColor((item as any).module)
                      : '',
                  }"
                />
                <span
                  class="font-bold text-sm relative z-10 tracking-tight"
                  :class="{ 'text-white/90': isAnyChildActive(item) }"
                  >{{ item.name }}</span
                >
              </div>
              <ChevronDownIcon
                class="w-4 h-4 transition-transform duration-300"
                :class="{ 'rotate-180': expandedMenus.includes(item.name) }"
              />
            </button>

            <!-- Submenu Items (3-Level support) -->
            <div
              v-show="expandedMenus.includes(item.name)"
              class="mt-1 ml-4 pl-4 border-l border-white/5 space-y-4 overflow-hidden py-2"
            >
              <div
                v-for="sub in item.children as any[]"
                :key="sub.name"
                class="space-y-2"
              >
                <!-- If sub has children (Sub-group) -->
                <div v-if="sub.children" class="space-y-1">
                  <p
                    class="text-[9px] font-black uppercase tracking-[0.2em] text-gray-600 mb-2 pl-4 select-none"
                  >
                    {{ sub.name }}
                  </p>
                  <div class="space-y-1">
                    <a
                      v-for="leaf in sub.children"
                      :key="leaf.name"
                      href="#"
                      @click.prevent="handleMenuClick(leaf.name)"
                      class="flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200 group relative text-[13px]"
                      :class="
                        activeTab === leaf.name
                          ? 'glass-active'
                          : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.03]'
                      "
                      :style="
                        activeTab === leaf.name
                          ? { '--active-color': getModuleColor(leaf.module) }
                          : {}
                      "
                    >
                      <div
                        v-if="activeTab === leaf.name"
                        class="w-1 h-4 rounded-full absolute left-0 shadow-lg"
                        :style="{
                          backgroundColor: getModuleColor(leaf.module),
                        }"
                      ></div>
                      <component
                        v-if="leaf.icon"
                        :is="leaf.icon"
                        class="w-3.5 h-3.5 transition-opacity"
                        :class="
                          activeTab === leaf.name
                            ? 'opacity-100'
                            : 'opacity-60 group-hover:opacity-100'
                        "
                      />
                      <span :class="{ 'font-bold': activeTab === leaf.name }">{{
                        leaf.name
                      }}</span>
                    </a>
                  </div>
                </div>

                <!-- If sub is a leaf item (Direct child) -->
                <a
                  v-else
                  href="#"
                  @click.prevent="handleMenuClick(sub.name)"
                  class="flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200 group relative text-[13px]"
                  :class="
                    activeTab === sub.name
                      ? 'glass-active'
                      : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.03]'
                  "
                  :style="
                    activeTab === sub.name
                      ? { '--active-color': getModuleColor(sub.module) }
                      : {}
                  "
                >
                  <div
                    v-if="activeTab === sub.name"
                    class="w-1 h-4 rounded-full absolute left-0 shadow-lg"
                    :style="{ backgroundColor: getModuleColor(sub.module) }"
                  ></div>
                  <component
                    v-if="sub.icon"
                    :is="sub.icon"
                    class="w-3.5 h-3.5 transition-opacity"
                    :class="
                      activeTab === sub.name
                        ? 'opacity-100'
                        : 'opacity-60 group-hover:opacity-100'
                    "
                  />
                  <span :class="{ 'font-bold': activeTab === sub.name }">{{
                    sub.name
                  }}</span>
                </a>
              </div>
            </div>
          </div>

          <!-- Single Menu Item -->
          <a
            v-else
            href="#"
            @click.prevent="handleMenuClick(item.name)"
            class="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group relative overflow-hidden"
            :class="
              activeTab === item.name
                ? 'glass-active'
                : 'text-gray-500 hover:text-white hover:bg-white/[0.05]'
            "
            :style="
              activeTab === item.name
                ? { '--active-color': getModuleColor((item as any).module) }
                : {}
            "
          >
            <component
              :is="item.icon"
              class="w-5 h-5 group-hover:scale-110 transition-transform relative z-10"
              :style="{
                color:
                  activeTab === item.name
                    ? getModuleColor((item as any).module)
                    : '',
              }"
            />
            <span class="font-bold text-sm relative z-10 tracking-tight">{{
              item.name
            }}</span>
            <div
              v-if="activeTab === item.name"
              class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full"
              :style="{ backgroundColor: getModuleColor(item.module) }"
            ></div>
          </a>
        </div>
      </nav>

      <div class="mt-auto px-6 py-6 border-t border-white/5 space-y-1">
        <button
          @click="router.push('/home')"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:text-teal-400 hover:bg-teal-400/5 transition-all w-full group"
        >
          <UserIcon
            class="w-5 h-5 group-hover:scale-110 transition-transform"
          />
          <span class="font-semibold text-sm">Chế độ người dùng</span>
        </button>
        <button
          @click="logout"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-400/5 transition-all w-full group"
        >
          <LogOutIcon
            class="w-5 h-5 group-hover:translate-x-1 transition-transform"
          />
          <span class="font-semibold text-sm">Logout</span>
        </button>
      </div>
    </aside>

    <!-- Sidebar - Mobile Overlay -->
    <div
      v-if="isMobileMenuOpen"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
      @click="isMobileMenuOpen = false"
    ></div>

    <!-- Sidebar - Mobile Drawer -->
    <aside
      class="fixed top-0 left-0 bottom-0 w-72 glass-panel z-50 transform transition-transform duration-300 lg:hidden flex flex-col p-6 border-r"
      :class="isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="flex items-center justify-between mb-12">
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center"
          >
            <TerminalIcon class="w-5 h-5 text-white" />
          </div>
          <span class="text-xl font-bold tracking-tight">Finzo</span>
        </div>
        <button
          @click="isMobileMenuOpen = false"
          class="p-2 text-gray-400 hover:text-white"
        >
          <XIcon class="w-6 h-6" />
        </button>
      </div>

      <nav
        class="flex-1 px-4 space-y-1.5 overflow-y-auto custom-sidebar-scroll"
      >
        <div v-for="item in menuItems" :key="item.name" class="space-y-1">
          <div v-if="item.children" class="flex flex-col">
            <button
              @click="toggleSubmenu(item.name)"
              class="flex items-center justify-between w-full px-4 py-2.5 rounded-xl transition-all duration-200 text-gray-500"
            >
              <div class="flex items-center gap-3">
                <component
                  :is="item.icon"
                  class="w-5 h-5"
                  :style="{
                    color: isAnyChildActive(item)
                      ? getModuleColor((item as any).module)
                      : '',
                  }"
                />
                <span
                  class="font-bold text-sm"
                  :class="{ 'text-white/90': isAnyChildActive(item) }"
                  >{{ item.name }}</span
                >
              </div>
              <ChevronDownIcon
                class="w-4 h-4 transition-transform duration-300"
                :class="{ 'rotate-180': expandedMenus.includes(item.name) }"
              />
            </button>
            <div
              v-show="expandedMenus.includes(item.name)"
              class="ml-4 pl-4 border-l border-white/5 space-y-1.5"
            >
              <a
                v-for="sub in item.children"
                :key="sub.name"
                href="#"
                @click.prevent="
                  handleMenuClick(sub.name);
                  isMobileMenuOpen = false;
                "
                class="flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200 text-[13px] relative"
                :class="
                  activeTab === sub.name ? 'glass-active' : 'text-gray-500'
                "
                :style="
                  activeTab === sub.name
                    ? { '--active-color': getModuleColor((sub as any).module) }
                    : {}
                "
              >
                <div
                  v-if="activeTab === sub.name"
                  class="w-1 h-3.5 rounded-full absolute left-0"
                  :style="{
                    backgroundColor: getModuleColor((sub as any).module),
                  }"
                ></div>
                <span>{{ sub.name }}</span>
              </a>
            </div>
          </div>
          <a
            v-else
            href="#"
            @click.prevent="
              handleMenuClick(item.name);
              isMobileMenuOpen = false;
            "
            class="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 relative"
            :class="
              activeTab === item.name
                ? 'glass-active'
                : 'text-gray-500 hover:text-white hover:bg-white/5'
            "
            :style="
              activeTab === item.name
                ? { '--active-color': getModuleColor((item as any).module) }
                : {}
            "
          >
            <component
              :is="item.icon"
              class="w-5 h-5"
              :style="{
                color:
                  activeTab === item.name
                    ? getModuleColor((item as any).module)
                    : '',
              }"
            />
            <span class="font-bold text-sm tracking-tight">{{
              item.name
            }}</span>
          </a>
        </div>
      </nav>

      <!-- Mobile Wallet Section -->
      <div class="mt-6 p-4 bg-white/5 rounded-2xl border border-white/5">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <WalletIcon class="w-5 h-5 text-purple-400" />
            <span class="text-sm font-bold">Wallet</span>
          </div>
          <span
            v-if="account"
            class="text-[10px] bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full border border-purple-500/20"
          >
            Connected
          </span>
        </div>

        <div v-if="account" class="space-y-3">
          <div
            class="text-xs font-mono text-gray-400 break-all bg-black/20 p-2 rounded-lg border border-white/5"
          >
            {{ account }}
          </div>
          <div class="flex items-center justify-between">
            <span class="text-xs text-gray-500">Balance</span>
            <div class="flex items-center gap-1 group/token cursor-help">
              <span
                class="text-sm font-bold text-white group-hover/token:text-purple-400 transition-colors"
                >{{ fzBalance || "0.0" }}</span
              >
              <img
                src="../../assets/images/finzo2.png"
                alt="FZ"
                class="w-7 h-7 object-contain transition-all duration-500 group-hover/token:scale-125 group-hover/token:rotate-12"
                style="
                  -webkit-mask-image: radial-gradient(
                    circle,
                    black 65%,
                    transparent 70%
                  );
                  mask-image: radial-gradient(
                    circle,
                    black 65%,
                    transparent 70%
                  );
                  filter: drop-shadow(0 0 10px rgba(168, 85, 247, 0.8));
                "
              />
            </div>
          </div>
        </div>

        <button
          v-else
          @click="connect"
          :disabled="isConnecting"
          class="w-full py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold text-sm transition-all shadow-lg shadow-purple-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <div
            v-if="isConnecting"
            class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
          ></div>
          {{ isConnecting ? "Connecting..." : "Connect Wallet" }}
        </button>
      </div>

      <div class="mt-auto pt-6 border-t border-white/5 space-y-2">
        <button
          @click="router.push('/home')"
          class="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-teal-400 transition-colors w-full group"
        >
          <UserIcon class="w-5 h-5" />
          <span class="font-medium">Chế độ người dùng</span>
        </button>
        <button
          @click="logout"
          class="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-red-400 transition-colors w-full group"
        >
          <LogOutIcon class="w-5 h-5" />
          <span class="font-medium">Logout</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto p-4 md:p-10">
      <!-- Top Bar -->
      <header
        class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 md:mb-12 sticky top-0 md:top-4 z-[40] glass-panel px-6 md:px-8 py-5 rounded-[2rem] border border-white/10 shadow-2xl backdrop-blur-3xl"
      >
        <div class="flex items-center justify-between w-full md:w-auto">
          <div class="flex items-center gap-4 lg:hidden">
            <button
              @click="isMobileMenuOpen = true"
              class="p-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
            >
              <MenuIcon class="w-6 h-6 text-white" />
            </button>
          </div>
          <div class="hidden md:block">
            <h2 class="text-2xl md:text-3xl font-bold text-white">
              {{
                activeTab === "Báo cáo tổng quan"
                  ? "Financial Overview"
                  : "System Dashboard"
              }}
            </h2>
            <p class="text-gray-500 mt-1">
              {{
                activeTab === "Báo cáo tổng quan"
                  ? "Quản lý tài chính và dòng tiền cá nhân"
                  : "Welcome back, Administrator"
              }}
            </p>
          </div>
          <div class="md:hidden">
            <h2 class="text-xl font-bold text-white">Dashboard</h2>
          </div>
          <div class="lg:hidden">
            <div class="relative group">
              <BellIcon class="w-6 h-6 text-gray-400" />
              <span
                class="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 border-2 border-[#050508] rounded-full"
              ></span>
            </div>
          </div>
        </div>

        <div
          class="flex items-center justify-between md:justify-end gap-4 md:gap-6"
        >
          <div class="hidden lg:block relative group">
            <BellIcon
              class="w-6 h-6 text-gray-400 group-hover:text-white cursor-pointer transition-colors"
            />
            <span
              class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-[#050508] rounded-full animate-ping opacity-75"
            ></span>
            <span
              class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-[#050508] rounded-full"
            ></span>
          </div>
          <div class="hidden md:flex items-center gap-3">
            <button
              @click="connect"
              :disabled="isConnecting"
              class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl font-bold text-sm transition-all border border-white/10 shadow-lg shadow-purple-500/20 disabled:opacity-50"
            >
              <WalletIcon v-if="!isConnecting" class="w-4 h-4" />
              <div
                v-else
                class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
              ></div>
              <span>{{
                account
                  ? `${account.slice(0, 6)}...${account.slice(-4)}`
                  : "Connect Wallet"
              }}</span>
            </button>
            <div
              v-if="account"
              class="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg border border-purple-500/30 font-black text-purple-400 uppercase tracking-widest shadow-[inset_0_0_15px_rgba(168,85,247,0.1)] group/token cursor-pointer"
            >
              <span
                class="text-[10px] group-hover/token:text-white transition-colors"
                >{{ fzBalance || "0.0" }}</span
              >
              <img
                src="../../assets/images/finzo2.png"
                alt="FZ"
                class="w-6 h-6 object-contain transition-transform duration-500 group-hover/token:scale-110"
                style="
                  -webkit-mask-image: radial-gradient(
                    circle,
                    black 65%,
                    transparent 70%
                  );
                  mask-image: radial-gradient(
                    circle,
                    black 65%,
                    transparent 70%
                  );
                "
              />
            </div>
          </div>

          <div
            class="flex-1 md:flex-none flex items-center gap-3 bg-white/5 px-4 py-2 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
          >
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="avatar"
              class="w-8 h-8 rounded-full border border-white/10"
            />
            <span class="font-semibold text-sm truncate max-w-[120px]">{{
              user.email
            }}</span>
            <ChevronDownIcon
              class="w-4 h-4 text-gray-500 group-hover:text-white transition-colors"
            />
          </div>
        </div>
      </header>

      <!-- Tab Content Area -->
      <div
        v-if="route.meta.module === 'overview'"
        class="animate-in fade-in duration-300"
      >
        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard v-for="stat in stats" :key="stat.label" :stat="stat" />
        </div>

        <!-- Main Grid Sections -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Activity Chart -->
          <div
            class="lg:col-span-2 glass-panel p-6 md:p-8 rounded-3xl border shadow-xl group overflow-hidden"
          >
            <div
              class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
            >
              <div>
                <h3 class="text-lg md:text-xl font-bold">Network Throughput</h3>
                <p class="text-[10px] md:text-xs text-gray-500 mt-1">
                  Live traffic monitoring
                </p>
              </div>
              <div class="flex gap-2">
                <button
                  class="flex-1 sm:flex-none px-4 py-2 text-[10px] md:text-xs bg-purple-600 rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                >
                  Live View
                </button>
                <button
                  class="flex-1 sm:flex-none px-4 py-2 text-[10px] md:text-xs bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 font-bold transition-all"
                >
                  History
                </button>
              </div>
            </div>
            <div
              class="h-48 md:h-64 flex items-end justify-between gap-1 md:gap-2 px-2 md:px-4 relative"
            >
              <!-- Mock Bars -->
              <div
                v-for="(h, i) in [
                  40, 70, 55, 90, 65, 80, 45, 100, 75, 60, 85, 50, 70, 40, 90,
                ]"
                :key="i"
                class="flex-1 rounded-t md:rounded-t-lg bg-gradient-to-t transition-all duration-700 hover:brightness-125 cursor-pointer relative group/bar"
                :class="
                  i % 2 === 0
                    ? 'from-purple-600/20 to-purple-600'
                    : 'from-indigo-600/20 to-indigo-600'
                "
                :style="{ height: h + '%' }"
              >
                <div
                  class="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[8px] md:text-[10px] font-bold px-1.5 md:px-2 py-0.5 md:py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-20"
                >
                  {{ h }}%
                </div>
              </div>
              <!-- Grid Lines -->
              <div class="absolute inset-x-0 top-0 h-px bg-white/5"></div>
              <div class="absolute inset-x-0 top-1/2 h-px bg-white/5"></div>
              <div class="absolute inset-x-0 bottom-0 h-px bg-white/10"></div>
            </div>
            <div
              class="flex justify-between mt-6 px-2 md:px-4 text-[8px] md:text-[10px] font-bold text-gray-600 uppercase tracking-widest"
            >
              <span>00:00</span><span class="hidden sm:inline">04:00</span
              ><span>08:00</span><span class="hidden sm:inline">12:00</span
              ><span>16:00</span><span class="hidden sm:inline">20:00</span
              ><span>Now</span>
            </div>
          </div>

          <!-- Recent Logs -->
          <div
            class="glass-panel p-6 md:p-8 rounded-3xl border relative overflow-hidden"
          >
            <h3 class="text-lg md:text-xl font-bold mb-8">System Activity</h3>
            <div class="space-y-6 md:space-y-8 relative">
              <div
                v-for="(log, i) in activities"
                :key="i"
                class="flex gap-4 group/item"
              >
                <div class="relative">
                  <div
                    class="w-3 h-3 rounded-full mt-1 shrink-0 relative z-10"
                    :class="log.color"
                  ></div>
                  <div
                    v-if="i < activities.length - 1"
                    class="absolute top-4 bottom-[-24px] md:bottom-[-32px] left-1.5 w-px bg-white/10"
                  ></div>
                </div>
                <div class="flex-1">
                  <p
                    class="text-xs md:text-sm font-semibold text-white group-hover/item:text-purple-400 transition-colors line-clamp-2 md:line-clamp-none"
                  >
                    {{ log.msg }}
                  </p>
                  <p
                    class="text-[10px] md:text-[11px] text-gray-500 mt-1 flex items-center gap-1"
                  >
                    <ClockIcon class="w-3 h-3" />
                    {{ log.time }}
                  </p>
                </div>
              </div>
            </div>
            <button
              class="w-full mt-8 md:mt-10 py-3 md:py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-[10px] md:text-xs font-bold transition-all border border-white/5 hover:border-white/10 tracking-widest uppercase"
            >
              View All Metrics
            </button>
          </div>
        </div>
      </div>

      <!-- Assets Module Content -->
      <div
        v-else-if="route.meta.module === 'inventory'"
        class="animate-in fade-in duration-300"
      >
        <AssetsContainer />
      </div>

      <!-- User Management Module -->
      <div
        v-else-if="route.meta.module === 'users'"
        class="animate-in fade-in duration-300"
      >
        <UserManagementView />
      </div>

      <!-- Law Module Views -->
      <div
        v-else-if="route.meta.module === 'law'"
        class="animate-in fade-in duration-300"
      >
        <LawView :key="route.fullPath" />
      </div>

      <!-- Retail Module View -->
      <div
        v-else-if="route.meta.module === 'retail'"
        class="animate-in fade-in duration-300 h-full"
      >
        <RetailView :key="route.fullPath" />
      </div>

      <!-- Other Modules Placeholders -->
      <div
        v-else-if="
          ['finance', 'medical', 'education', 'logistics'].includes(
            route.meta.module as string,
          )
        "
        class="animate-in fade-in duration-300 h-full"
      >
        <div
          class="bg-[#0a0a0f] rounded-3xl border border-white/5 p-20 text-center min-h-[500px] flex flex-col items-center justify-center"
        >
          <div
            class="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <LayersIcon class="w-10 h-10 text-blue-400" />
          </div>
          <h3 class="text-xl font-bold mb-2">{{ activeTab }}</h3>
          <p class="text-gray-500">
            Kênh quản trị đang được cấu hình đồng bộ...
          </p>
        </div>
      </div>

      <!-- Reports Module -->
      <div
        v-else-if="route.meta.module === 'reports'"
        class="animate-in fade-in duration-300"
      >
        <AssetReportsView />
      </div>

      <!-- Performance Metrics Module -->
      <div
        v-else-if="route.meta.module === 'metrics'"
        class="animate-in fade-in duration-300"
      >
        <ReportsView />
      </div>

      <!-- Blockchain Explorer -->
      <div
        v-else-if="route.meta.module === 'blockchain'"
        class="animate-in fade-in duration-300"
      >
        <BlockchainView />
      </div>

      <!-- Wallets Vault -->
      <div
        v-else-if="route.meta.module === 'vault'"
        class="animate-in fade-in duration-300"
      >
        <WalletsVaultView />
      </div>

      <!-- Module Management -->
      <div
        v-else-if="route.meta.module === 'system_modules'"
        class="animate-in fade-in duration-300"
      >
        <ModuleManagementView />
      </div>

      <!-- License Management -->
      <div
        v-else-if="route.meta.module === 'licenses'"
        class="animate-in fade-in duration-300"
      >
        <LicenseManagementView />
      </div>

      <!-- AI Playground -->
      <div
        v-else-if="route.meta.module === 'ai'"
        class="animate-in fade-in duration-300"
      >
        <AiTestView />
      </div>

      <!-- Law View (Keep old one for compat if any) -->
      <div
        v-else-if="activeTab === 'Luật'"
        class="animate-in fade-in duration-300"
      >
        <LawView />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import {
  Activity as ActivityIcon,
  Bell as BellIcon,
  ChevronDown as ChevronDownIcon,
  Clock as ClockIcon,
  Cpu as CpuIcon,
  LayoutDashboard as LayoutDashboardIcon,
  LogOut as LogOutIcon,
  Menu as MenuIcon,
  Shield as SecurityIcon,
  Database as StorageIcon,
  Terminal as TerminalIcon,
  Users as UsersIcon,
  Wallet as WalletIcon,
  X as XIcon,
  Zap as ZapIcon,
  Scale as ScaleIcon,
  LineChart as LineChartIcon,
  Stethoscope as StethoscopeIcon,
  BookOpen as BookOpenIcon,
  FileText as FileTextIcon,
  Calendar as CalendarIcon,
  Book as BookIcon,
  Layers as LayersIcon,
  MessageSquare as MessageSquareIcon,
  MessageCircle as ChatIcon,
  GraduationCap as GraduationCapIcon,
  Users2 as Users2Icon,
  Store as StoreIcon,
  Truck as TruckIcon,
  Package as PackageIcon,
  ShoppingBag as ShoppingBagIcon,
  Box as BoxIcon,
  BriefcaseBusiness as BriefcaseBusinessIcon,
  User as UserIcon,
  ShieldCheck as ShieldCheckIcon,
  FolderSearch as FolderSearchIcon,
  Sparkles as SparklesIcon,
  Bot as BotIcon,
} from "lucide-vue-next";

import { computed, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { DOMAINS } from "../../constants/modules";

import StatCard from "../../components/StatCard.vue";
import LawView from "../law/AdminLawView.vue";
import UserManagementView from "./UserManagementView.vue";
import RetailView from "../retail/RetailManagementView.vue";
import ModuleManagementView from "./ModuleManagementView.vue";
import LicenseManagementView from "./LicenseManagementView.vue";
import AiTestView from "./AiTestView.vue";

import { useWeb3 } from "../../composables/useWeb3";
import AssetReportsView from "./AssetReportsView.vue";
import AssetsContainer from "./AssetsContainer.vue";
import BlockchainView from "./BlockchainView.vue";
import ReportsView from "./ReportsView.vue";
import WalletsVaultView from "./WalletsVaultView.vue";

const { account, connect, isConnecting, fzBalance } = useWeb3();

const isMobileMenuOpen = ref(false);
const router = useRouter();
const user = ref(
  JSON.parse(
    localStorage.getItem("user") || '{"email": "Guest", "role": "guest"}',
  ),
);

const logout = () => {
  localStorage.clear();
  router.push("/");
};

const expandedMenus = ref<string[]>(["Hệ thống", "Quản lý", "Báo cáo"]);

const toggleSubmenu = (name: string) => {
  const index = expandedMenus.value.indexOf(name);
  if (index > -1) {
    expandedMenus.value.splice(index, 1);
  } else {
    expandedMenus.value.push(name);
  }
};

const getModuleColor = (modId?: string) => {
  if (!modId) return "#a855f7"; // default purple
  const domain = DOMAINS.find((d) => d.id === modId);
  return domain?.hexColor || "#a855f7";
};

const isAnyChildActive = (item: any) => {
  if (activeTab.value === item.name) return true;
  if (item.children) {
    return item.children.some((sub: any) => {
      if (activeTab.value === sub.name) return true;
      if (sub.children) {
        return sub.children.some((leaf: any) => activeTab.value === leaf.name);
      }
      return false;
    });
  }
  return false;
};

onMounted(() => {
  // Auto-expand parent of current active tab
  allModules.forEach((item: any) => {
    const isMatched =
      item.children &&
      item.children.some((sub: any) => {
        if (sub.children) {
          return sub.children.some((leaf: any) => leaf.path === route.path);
        }
        return (
          sub.path === route.path ||
          (route.path === "/law-admin" && sub.path === "/law-admin/chat")
        );
      });

    if (isMatched) {
      if (!expandedMenus.value.includes(item.name)) {
        expandedMenus.value.push(item.name);
      }
    }
  });

  // Also expand PHÁP LÝ by default for trial or specific roles if needed, already handled above
});

const allModules = [
  {
    name: "Overview",
    icon: LayoutDashboardIcon,
    path: "/dashboard",
    module: "overview",
  },
  {
    name: "Kho lưu trữ",
    icon: FolderSearchIcon,
    path: "/inventory",
    module: "inventory",
  },

  {
    name: "PHÁP LÝ",
    icon: ScaleIcon,
    children: [
      {
        name: "Dịch vụ Khách hàng",
        children: [
          {
            name: "Quản lý Lịch hẹn",
            icon: CalendarIcon,
            path: "/law-admin/appointments",
            module: "law",
          },
          {
            name: "Tư vấn Trực tuyến",
            icon: ChatIcon,
            path: "/law-admin/chat",
            module: "law",
          },
        ],
      },
      {
        name: "Nhân sự & Cơ sở",
        children: [
          {
            name: "Phòng Luật & Lịch",
            icon: BriefcaseBusinessIcon,
            path: "/law-admin/offices",
            module: "law",
          },
          {
            name: "Đội ngũ Luật sư",
            icon: UsersIcon,
            path: "/law-admin/lawyers",
            module: "law",
          },
        ],
      },
      {
        name: "Hồ sơ & Kiến thức",
        children: [
          {
            name: "Hồ sơ Khách hàng",
            icon: FileTextIcon,
            path: "/law-admin/applications",
            module: "law",
          },
          {
            name: "Hỏi đáp Pháp luật",
            icon: MessageSquareIcon,
            path: "/law-admin/questions",
            module: "law",
          },
          {
            name: "Thư viện Bài viết",
            icon: BookOpenIcon,
            path: "/law-admin/posts",
            module: "law",
          },
        ],
      },
    ],
  },
  {
    name: "Tài chính",
    icon: LineChartIcon,
    module: "finance",
    children: [
      {
        name: "Danh mục đầu tư",
        icon: WalletIcon,
        path: "/finance/portfolio",
        module: "finance",
      },
      {
        name: "Thị trường AI",
        icon: ZapIcon,
        path: "/finance/markets",
        module: "finance",
      },
      {
        name: "Phân tích xu hướng",
        icon: ActivityIcon,
        path: "/finance/trends",
        module: "finance",
      },
    ],
  },
  {
    name: "Y tế",
    icon: StethoscopeIcon,
    module: "medical",
    children: [
      {
        name: "Hồ sơ bệnh án",
        icon: FileTextIcon,
        path: "/medical/records",
        module: "medical",
      },
      {
        name: "Lịch khám bệnh",
        icon: CalendarIcon,
        path: "/medical/appointments",
        module: "medical",
      },
      {
        name: "Tư vấn Sức khỏe AI",
        icon: ActivityIcon,
        path: "/medical/ai-consult",
        module: "medical",
      },
    ],
  },
  {
    name: "Giáo dục",
    icon: BookOpenIcon,
    module: "education",
    children: [
      {
        name: "Quản lý Đào tạo",
        children: [
          {
            name: "Quản lý Khóa học",
            icon: BookIcon,
            path: "/education/courses",
            module: "education",
          },
          {
            name: "Bài giảng AI",
            icon: LayersIcon,
            path: "/education/lectures",
            module: "education",
          },
          {
            name: "Quản lý Lớp",
            icon: LayersIcon,
            path: "/education/classes",
            module: "education",
          },
          {
            name: "Quản lý Bộ môn",
            icon: BookOpenIcon,
            path: "/education/departments",
            module: "education",
          },
        ],
      },
      {
        name: "Nhân sự & Học sinh",
        children: [
          {
            name: "Quản lý Giáo viên",
            icon: Users2Icon,
            path: "/education/teachers",
            module: "education",
          },
          {
            name: "Quản lý Học sinh",
            icon: GraduationCapIcon,
            path: "/education/students",
            module: "education",
          },
          {
            name: "Sinh viên & Điểm",
            icon: ActivityIcon,
            path: "/education/grades",
            module: "education",
          },
        ],
      },
    ],
  },
  {
    name: "Kinh doanh Store",
    icon: StoreIcon,
    module: "retail",
    children: [
      {
        name: "Quản lý Bán hàng",
        children: [
          {
            name: "Lập đơn hàng",
            icon: ShoppingBagIcon,
            path: "/retail/orders",
            module: "retail",
          },
          {
            name: "Khách hàng",
            icon: UsersIcon,
            path: "/retail/customers",
            module: "retail",
          },
          {
            name: "Báo cáo doanh thu",
            icon: LineChartIcon,
            path: "/retail/sales",
            module: "retail",
          },
        ],
      },
      {
        name: "Quản lý Sản phẩm",
        children: [
          {
            name: "Hàng hóa",
            icon: BoxIcon,
            path: "/retail/products",
            module: "retail",
          },
          {
            name: "Kho & Tồn kho",
            icon: PackageIcon,
            path: "/retail/inventory",
            module: "retail",
          },
        ],
      },
    ],
  },
  {
    name: "Logistics",
    icon: TruckIcon,
    module: "logistics",
    children: [
      {
        name: "Vận hành",
        children: [
          {
            name: "Đội xe & Tài xế",
            icon: UsersIcon,
            path: "/logistics/fleet",
            module: "logistics",
          },
          {
            name: "Lộ trình giao hàng",
            icon: ActivityIcon,
            path: "/logistics/routes",
            module: "logistics",
          },
        ],
      },
      {
        name: "Kho bãi",
        children: [
          {
            name: "Nhập / Xuất kho",
            icon: PackageIcon,
            path: "/logistics/warehouse",
            module: "logistics",
          },
          {
            name: "Kiểm kê",
            icon: FileTextIcon,
            path: "/logistics/audit",
            module: "logistics",
          },
        ],
      },
    ],
  },

  {
    name: "AI & Thông minh",
    icon: SparklesIcon,
    module: "ai_group",
    children: [
      {
        name: "AI Playground",
        icon: BotIcon,
        path: "/ai-playground",
        module: "ai",
      },
    ],
  },
  {
    name: "Hệ thống",

    icon: TerminalIcon,
    module: "system_group",
    children: [
      {
        name: "Quản lý Module",
        icon: ZapIcon,
        path: "/system/modules",
        module: "system_modules",
      },
    ],
  },
  {
    name: "Quản lý",
    icon: SecurityIcon,
    module: "admin_group",
    children: [
      {
        name: "Quản lý người dùng",
        icon: UsersIcon,
        path: "/users",
        module: "users",
      },
      {
        name: "Cấp License NPM",
        icon: ShieldCheckIcon,
        path: "/licenses",
        module: "licenses",
      },
    ],
  },

  {
    name: "Báo cáo",
    icon: ActivityIcon,
    module: "reports_group",
    children: [
      {
        name: "Báo cáo tổng quan",
        icon: LayoutDashboardIcon,
        path: "/reports",
        module: "reports",
      },
      {
        name: "Hiệu suất hệ thống",
        icon: ActivityIcon,
        path: "/metrics",
        module: "metrics",
      },
    ],
  },
  {
    name: "Cơ sở hạ tầng",
    icon: StorageIcon,
    module: "infra_group",
    children: [
      {
        name: "Database Nodes",
        icon: StorageIcon,
        path: "/db-nodes",
        module: "db-nodes",
      },
      {
        name: "Blockchain Explorer",
        icon: CpuIcon,
        path: "/blockchain",
        module: "blockchain",
      },
      {
        name: "Wallets Vault",
        icon: SecurityIcon,
        path: "/vault",
        module: "vault",
      },
    ],
  },
];

const menuItems = computed(() => {
  const authorizedModules =
    user.value.modules || (user.value.module ? [user.value.module] : []);

  // Real Admin sees everything, Trial Manager sees limited
  const isSuperAdmin = user.value.role === "admin";

  if (isSuperAdmin) return allModules;

  // Clone and filter
  return allModules
    .map((item) => ({
      ...item,
      children: item.children ? [...item.children] : undefined,
    }))
    .filter((item) => {
      // Basic modules like overview are always allowed
      if (item.module === "overview") return true;

      // If it has children, check if any child is authorized
      if (item.children) {
        const allowedChildren = item.children.filter((child: any) => {
          if (child.children) {
            const allowedLeafs = child.children.filter((leaf: any) =>
              authorizedModules.includes(leaf.module),
            );
            if (allowedLeafs.length > 0) {
              child.children = allowedLeafs;
              return true;
            }
            return false;
          }
          return authorizedModules.includes(child.module);
        });

        if (allowedChildren.length > 0) {
          item.children = allowedChildren;
          return true;
        }
        return false;
      }

      // Individual items
      return authorizedModules.includes(item.module as any);
    });
});

const findMenuItem = (nameOrModule: string) => {
  for (const item of allModules) {
    if (item.name === nameOrModule || (item as any).module === nameOrModule)
      return item;
    if (item.children) {
      for (const sub of item.children) {
        if (sub.name === nameOrModule || (sub as any).module === nameOrModule)
          return sub;
        if ((sub as any).children) {
          const leaf = (sub as any).children.find(
            (l: any) => l.name === nameOrModule || l.module === nameOrModule,
          );
          if (leaf) return leaf;
        }
      }
    }
  }
  return null;
};

const route = useRoute();
const activeTab = computed(() => {
  const currentPath = route.path;

  // First try exact path match for sub-items
  for (const item of allModules) {
    if ((item as any).path === currentPath) return item.name;
    if (item.children) {
      for (const sub of item.children) {
        if ((sub as any).path === currentPath) return sub.name;
        if ((sub as any).children) {
          const leaf = (sub as any).children.find(
            (l: any) => l.path === currentPath,
          );
          if (leaf) return leaf.name;
        }
      }
    }
  }

  // Special handle for root /law-admin which defaults to chat
  if (currentPath === "/law-admin") return "Tư vấn Trực tuyến";

  const currentModule = route.meta.module as string;
  const item = findMenuItem(currentModule);
  return item ? item.name : "Overview";
});

const handleMenuClick = async (tabName: string) => {
  const item = findMenuItem(tabName);
  if (item && item.path) {
    if ((window as any).$pageTransition) {
      // Find extra info from DOMAINS if it's a primary module
      const domainInfo = DOMAINS.find((d) => d.id === item.module);

      await (window as any).$pageTransition.trigger(item.path, {
        icon: item.icon,
        color: domainInfo?.hexColor || "#a855f7", // fallback to purple
        label: item.name,
      });
    } else {
      router.push(item.path);
    }
  }
};

const stats = [
  {
    label: "CPU Usage",
    value: "24.8%",
    icon: CpuIcon,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    trend: 12,
  },
  {
    label: "Active RAM",
    value: "4.2 GB",
    icon: ZapIcon,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    trend: 5,
  },
  {
    label: "Network",
    value: "1.2 Gbps",
    icon: ActivityIcon,
    color: "text-green-400",
    bg: "bg-green-400/10",
    trend: 18,
  },
  {
    label: "Sys Uptime",
    value: "12d 4h",
    icon: TerminalIcon,
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    trend: 2,
  },
];

const activities = [
  {
    msg: "System kernel updated to v2.4.1",
    time: "2 mins ago",
    color: "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]",
  },
  {
    msg: "Global SSL certificates renewed",
    time: "14 mins ago",
    color: "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.4)]",
  },
  {
    msg: "Suspicious IP blocked: 192.168.1.104",
    time: "1 hour ago",
    color: "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]",
  },
  {
    msg: "Automated backup completed",
    time: "3 hours ago",
    color: "bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.4)]",
  },
];
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap");

.glass-active {
  background: color-mix(in srgb, var(--active-color) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--active-color) 20%, transparent);
  color: var(--active-color);
  box-shadow: 0 4px 15px -1px
    color-mix(in srgb, var(--active-color) 15%, transparent);
  backdrop-filter: blur(4px);
}

.custom-sidebar-scroll::-webkit-scrollbar {
  width: 4px;
}
.custom-sidebar-scroll::-webkit-scrollbar-track {
  background: transparent;
}
.custom-sidebar-scroll::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 10px;
  transition: all 0.3s ease;
}
.custom-sidebar-scroll:hover::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.08);
}
</style>
