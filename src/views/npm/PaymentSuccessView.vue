<template>
  <div
    class="min-h-screen bg-[#050508] text-white flex items-center justify-center p-4"
  >
    <div class="max-w-xl w-full">
      <!-- Success Icon Animation -->
      <div class="flex justify-center mb-8">
        <div
          class="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center relative"
        >
          <div
            class="absolute inset-0 bg-green-500/20 blur-2xl rounded-full animate-pulse"
          ></div>
          <CheckCircleIcon class="w-12 h-12 text-green-500 relative z-10" />
        </div>
      </div>

      <!-- Success Message -->
      <div class="text-center mb-12">
        <h1 class="text-3xl font-extrabold mb-4">
          {{ $t("npmPaymentSuccess") }}
        </h1>
        <p class="text-gray-400 mb-2">{{ $t("npmThanks") }}</p>
        <p class="text-xs text-gray-500 italic">{{ $t("npmSupportNote") }}</p>
      </div>

      <!-- License Key Panel -->
      <transition
        enter-active-class="transform transition duration-500 ease-out"
        enter-from-class="scale-95 opacity-0"
        enter-to-class="scale-100 opacity-100"
      >
        <div
          v-if="licenseKey"
          class="glass-panel p-8 rounded-[2.5rem] border border-white/10 bg-white/[0.02] mb-8 text-center relative overflow-hidden animate-in zoom-in duration-500"
        >
          <div class="absolute top-0 right-0 p-4 opacity-10">
            <KeyIcon class="w-20 h-20 text-purple-500" />
          </div>

          <p
            class="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-4"
          >
            LICENSE CODE
          </p>
          <div class="flex items-center justify-center gap-3">
            <code
              class="text-2xl md:text-3xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500 select-all"
            >
              {{ licenseKey }}
            </code>
            <button
              @click="copyKey"
              class="p-2 hover:bg-white/5 rounded-xl transition-colors text-gray-400 hover:text-white"
              title="Copy"
            >
              <CopyIcon class="w-5 h-5" />
            </button>
          </div>
        </div>

        <div v-else class="text-center mb-8">
          <button
            @click="claimCode"
            :disabled="claiming"
            class="px-12 py-5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-3xl font-extrabold text-lg transition-all shadow-[0_0_50px_rgba(147,51,234,0.4)] hover:shadow-[0_0_60px_rgba(147,51,234,0.6)] flex items-center justify-center gap-4 mx-auto group active:scale-95 disabled:opacity-50"
          >
            <Loader2Icon v-if="claiming" class="w-6 h-6 animate-spin" />
            <GiftIcon
              v-else
              class="w-6 h-6 group-hover:rotate-12 transition-transform"
            />
            {{ claiming ? $t("commonLoading") : "Claim License Code" }}
          </button>
          <p class="text-gray-500 text-xs mt-4 animate-pulse">
            Click to generate your premium license key
          </p>
        </div>
      </transition>

      <!-- Instructions -->
      <div
        v-if="licenseKey"
        class="glass-panel p-8 rounded-[2.5rem] border border-white/5 bg-black/40 animate-in fade-in slide-in-from-bottom-4 duration-700"
      >
        <h3 class="text-lg font-bold mb-6 flex items-center gap-2">
          <TerminalIcon class="w-5 h-5 text-purple-400" />
          {{ $t("npmUsageGuide") }}
        </h3>
        <div class="space-y-6 text-sm text-gray-400">
          <div class="flex gap-4">
            <span
              class="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] shrink-0 font-bold"
              >1</span
            >
            <p>{{ $t("npmStep1") }}</p>
          </div>
          <div class="flex gap-4">
            <span
              class="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] shrink-0 font-bold"
              >2</span
            >
            <p>{{ $t("npmStep2") }}</p>
          </div>
          <div class="bg-black/60 rounded-2xl p-4 border border-white/5">
            <pre class="text-[11px] leading-relaxed overflow-x-auto">
<span class="text-purple-400">import</span> GlassUI <span class="text-purple-400">from</span> <span class="text-emerald-400">"glass-studio-ui-pro"</span>;

app.<span class="text-yellow-400">use</span>(GlassUI, {
  licenseKey: <span class="text-emerald-500">"{{ licenseKey }}"</span>
});</pre>
          </div>
          <div class="flex gap-4 pt-2">
            <span
              class="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] shrink-0 font-bold"
              >3</span
            >
            <p>{{ $t("npmStep3") }}</p>
          </div>
        </div>
      </div>

      <!-- Back Button -->
      <div class="mt-12 text-center">
        <button
          @click="$router.push('/home')"
          class="px-10 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bold transition-all"
        >
          {{ $t("commonBack") }}
        </button>
      </div>
    </div>

    <!-- Background Blobs -->
    <div
      class="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-20"
    >
      <div
        class="absolute top-[20%] right-[10%] w-[30vw] h-[30vh] bg-purple-600 blur-[150px] rounded-full"
      ></div>
      <div
        class="absolute bottom-[20%] left-[10%] w-[30vw] h-[30vh] bg-blue-600 blur-[150px] rounded-full"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import {
  CheckCircle as CheckCircleIcon,
  Copy as CopyIcon,
  Key as KeyIcon,
  Terminal as TerminalIcon,
  Loader2 as Loader2Icon,
  Gift as GiftIcon,
} from "lucide-vue-next";
import { licenseApi } from "../../api/license";

const { t } = useI18n();
const route = useRoute();
const licenseKey = ref("");
const claiming = ref(false);

const claimCode = async () => {
  claiming.value = true;
  try {
    const code = route.query.code as string;
    let expiresAt = new Date();

    // Determine duration based on code param
    if (code === "GLP-2") {
      expiresAt.setFullYear(expiresAt.getFullYear() + 1);
    } else if (code === "GLP-3") {
      // Permanent license
      expiresAt = new Date("9999-12-31");
    } else {
      // Default 1 month
      expiresAt.setMonth(expiresAt.getMonth() + 1);
    }

    const result = await licenseApi.create({
      expiresAt,
      metadata: `NPM Purchase - Type: ${code || "Standard"}`,
    });

    licenseKey.value = result.licenseKey;
  } catch (err) {
    console.error("Failed to claim code:", err);
    alert(
      "System error: Could not generate license code. Please contact support.",
    );
  } finally {
    claiming.value = false;
  }
};

const copyKey = () => {
  if (!licenseKey.value) return;
  navigator.clipboard.writeText(licenseKey.value);
  alert(t("npmCopied"));
};
</script>

<style scoped>
.glass-panel {
  backdrop-filter: blur(20px);
}
</style>
