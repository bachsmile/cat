<template>
  <div id="app-root">
    <!-- 🌠 Global Aurora Background -->
    <div class="aurora-bg">
      <div class="aurora-blob blob-1"></div>
      <div class="aurora-blob blob-2"></div>
      <div class="aurora-blob blob-3"></div>
    </div>

    <GlobalPageTransition ref="pageTransitionRef" />
    <SystemOnboarding ref="onboardingRef" @on-show="handleOnboardingVisible" @on-hide="handleOnboardingHidden" />
    
    <!-- Use v-if to completely prevent rendering if we are in onboarding mode -->
    <main v-if="!isForceHidden" :class="{ 'opacity-0': isOverlayingOnboarding }" class="transition-opacity duration-700">
      <router-view />
    </main>
    
    <!-- Placeholder or loading state if needed during flash suppression -->
    <div v-else class="fixed inset-0 bg-[#050508] z-[50]"></div>

    <CmFilters />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import CmFilters from "glass-studio-ui-pro";
import "glass-studio-ui-pro/style.css";
import GlobalPageTransition from "./components/common/GlobalPageTransition.vue";
import SystemOnboarding from "./components/common/SystemOnboarding.vue";

const pageTransitionRef = ref<any>(null);
const onboardingRef = ref<any>(null);
const isOverlayingOnboarding = ref(false);
const isForceHidden = ref(false);
const route = useRoute();

const checkOnboarding = () => {
  const rawUser = localStorage.getItem("user");
  if (!rawUser) {
    isForceHidden.value = false;
    return;
  }
  
  try {
    const user = JSON.parse(rawUser);
    const hasSeenOnboarding = localStorage.getItem("has_seen_onboarding") === "true";
    const loginCount = parseInt(user.loginCount || "0");
    
    // Check path immediately
    const path = window.location.pathname; // use location for immediate check
    const isPostLogin = path.includes('dashboard') || 
                        path.includes('home') || 
                        path.includes('law-admin') ||
                        path.includes('retail');
    
    if (!hasSeenOnboarding && (loginCount <= 1) && isPostLogin) {
       // CRITICAL: Block rendering BEFORE it can even start
       isForceHidden.value = true;
       isOverlayingOnboarding.value = true;
       
       // Onboarding show might need a small tick for the ref
       setTimeout(() => {
         onboardingRef.value?.show();
       }, 50);
    } else {
       isForceHidden.value = false;
       isOverlayingOnboarding.value = false;
    }
  } catch (e) {
    isForceHidden.value = false;
  }
};

const handleOnboardingVisible = () => {
  isOverlayingOnboarding.value = true;
  isForceHidden.value = true;
};

const handleOnboardingHidden = () => {
  isOverlayingOnboarding.value = false;
  isForceHidden.value = false;
};

// Global handles
onMounted(() => {
  (window as any).$pageTransition = {
    trigger: (target?: string) => pageTransitionRef.value?.trigger(target)
  };
});

// Watch route to trigger if user just logged in or navigates
// Set immediate to catch the very first load
watch(() => route.path, () => {
  checkOnboarding();
}, { immediate: true });

// Run once immediately in setup context
checkOnboarding();
</script>

<style>
#app-root {
  overflow-x: hidden;
  min-height: 100vh;
}
</style>
