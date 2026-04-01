<template>
  <div class="min-h-screen bg-[#050508] text-white">
    <!-- Simple Navbar -->
    <nav
      class="border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-md sticky top-0 z-50"
    >
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
      >
        <div
          class="flex items-center gap-3 cursor-pointer"
          @click="$router.push('/npm')"
        >
          <ChevronLeftIcon class="w-5 h-5 text-gray-400" />
          <span class="text-lg font-bold">{{ $t("npmSelectPackage") }}</span>
        </div>
      </div>
    </nav>

    <main class="max-w-3xl mx-auto px-4 py-16">
      <div class="text-center mb-16">
        <h1 class="text-4xl font-extrabold mb-4">
          {{ $t("npmSelectPackage") }}
        </h1>
        <p class="text-gray-400">
          {{ $t("npmRenewSubtitle") }} <strong>{{ projectName }}</strong>
        </p>
      </div>

      <!-- Packages Table -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div
          v-for="pkg in packages"
          :key="pkg.id"
          class="glass-panel group relative overflow-hidden rounded-[2rem] border transition-all p-8 flex flex-col items-center text-center cursor-pointer"
          :class="
            selectedPackage === pkg.id
              ? 'border-purple-600 ring-2 ring-purple-600/20 bg-purple-600/5'
              : 'border-white/5 hover:border-white/10 bg-white/[0.02] hover:bg-white/[0.04]'
          "
          @click="selectedPackage = pkg.id"
        >
          <!-- Badge for Sale/Special -->
          <div
            v-if="pkg.sale"
            class="absolute top-4 right-4 bg-purple-600 text-[10px] px-2 py-0.5 rounded-full font-bold"
          >
            -{{ pkg.sale }}%
          </div>
          <div
            v-if="pkg.special"
            class="absolute top-4 right-4 bg-gradient-to-r from-amber-600 to-orange-600 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider"
          >
            {{ $t("npmRecommended") }}
          </div>

          <h3
            class="text-lg font-bold mb-6 text-gray-300 group-hover:text-white transition-colors"
          >
            {{ $t("npm" + pkg.id.charAt(0).toUpperCase() + pkg.id.slice(1)) }}
          </h3>

          <div class="mb-4">
            <span class="text-4xl font-bold">${{ pkg.price }}</span>
            <span
              v-if="pkg.id !== 'permanent'"
              class="text-xs text-gray-500 block mt-1"
            >
              {{
                pkg.id === "yearly"
                  ? $t("npmBillingYearly")
                  : $t("npmBillingMonthly")
              }}
            </span>
            <span v-else class="text-xs text-gray-500 block mt-1">{{
              $t("npmOneTime")
            }}</span>
          </div>

          <p class="text-xs text-gray-500 mt-2 mb-8" v-if="pkg.id === 'yearly'">
            {{ $t("npmEconomicChoice") }}
          </p>
          <p
            class="text-xs text-gray-500 mt-2 mb-8"
            v-if="pkg.id === 'permanent'"
          >
            {{ $t("npmOneTime") }}
          </p>
          <p
            class="text-xs text-gray-500 mt-2 mb-8"
            v-if="pkg.id === 'monthly'"
          >
            {{ $t("npmMonthly") }}
          </p>

          <div
            class="w-6 h-6 rounded-full border-2 mt-auto"
            :class="
              selectedPackage === pkg.id
                ? 'border-purple-600 bg-purple-600 flex items-center justify-center'
                : 'border-white/20'
            "
          >
            <CheckIcon
              v-if="selectedPackage === pkg.id"
              class="w-4 h-4 text-white"
            />
          </div>
        </div>
      </div>

      <!-- Footer Action -->
      <button
        @click="processPayment"
        :disabled="processing"
        class="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-2xl font-bold transition-all shadow-lg shadow-purple-500/20 disabled:opacity-50 flex items-center justify-center gap-3"
      >
        <Loader2Icon v-if="processing" class="w-5 h-5 animate-spin" />
        <CreditCardIcon v-else class="w-5 h-5" />
        {{ processing ? $t("commonLoading") : $t("npmPurchase") }}
      </button>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  ChevronLeft as ChevronLeftIcon,
  Check as CheckIcon,
  CreditCard as CreditCardIcon,
  Loader2 as Loader2Icon,
} from "lucide-vue-next";

const router = useRouter();
const processing = ref(false);
const selectedPackage = ref("monthly");
const projectName = ref("Glass Studio UI Pro");

const packages = [
  {
    id: "monthly",
    price: "3",
    sale: 0,
    link: "https://www.paypal.com/ncp/payment/VFBN635R38LAS",
  },
  {
    id: "yearly",
    price: "25",
    sale: 30,
    link: "https://www.paypal.com/ncp/payment/F2PZYEHUTMYN8",
  },
  {
    id: "permanent",
    price: "50",
    special: true,
    link: "https://www.paypal.com/ncp/payment/P5PZMWH2Q2FWC",
  },
];

const processPayment = async () => {
  const currentPkg = packages.find((p) => p.id === selectedPackage.value);
  if (currentPkg && currentPkg.link) {
    window.open(currentPkg.link, "_blank");
    return;
  }

  processing.value = true;
  // Simulate API delay
  setTimeout(() => {
    processing.value = false;
    // Redirect to success page with a generated dummy key
    const dummyKey = generateKey();
    router.push({
      path: "/npm/payment-success",
      query: { key: dummyKey },
    });
  }, 2000);
};

const generateKey = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const segment = () =>
    Array.from(
      { length: 4 },
      () => chars[Math.floor(Math.random() * chars.length)],
    ).join("");
  return `${segment()}-${segment()}-${segment()}-${segment()}`;
};
</script>

<style scoped>
.glass-panel {
  backdrop-filter: blur(20px);
}
</style>
