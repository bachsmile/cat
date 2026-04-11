<template>
  <Transition name="fade">
    <div
      v-if="isVisible"
      class="fixed inset-0 z-[9999] bg-[#050508] overflow-hidden flex flex-col items-center justify-center "
    >
      <!-- Background Ambient -->
      <div class="absolute inset-0 z-0 pointer-events-none">
        <div
          class="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full animate-pulse-slow"
        ></div>
        <div
          class="absolute bottom-1/4 right-1/4 w-[800px] h-[800px] bg-indigo-600/10 blur-[200px] rounded-full animate-pulse-slow"
          style="animation-delay: 2s"
        ></div>
      </div>

      <!-- Main Content Container -->
      <div
        v-if="currentStepData"
        class="relative z-10 w-full max-w-6xl px-10 h-full flex flex-col justify-center"
      >
        <!-- Step Navigation Progress -->
        <div class="absolute top-12 left-1/2 -translate-x-1/2 flex gap-3">
          <div
            v-for="i in steps.length"
            :key="i"
            class="h-1.5 rounded-full transition-all duration-500"
            :class="
              i === currentStep + 1 ? 'w-12 bg-purple-500' : 'w-4 bg-white/10'
            "
          ></div>
        </div>

        <Transition name="slide-fade" mode="out-in">
          <div
            :key="currentStep"
            class="flex flex-col md:flex-row items-center gap-16"
          >
            <!-- Text Side -->
            <div
              class="flex-1 space-y-8 animate-fade-in text-center md:text-left"
            >
              <div
                class="inline-block px-4 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold tracking-widest uppercase mb-4"
              >
                {{ currentStepData.tag }}
              </div>
              <h2
                class="text-6xl font-black text-white leading-tight tracking-tighter"
              >
                {{ currentStepData.title }}
              </h2>
              <p
                class="text-xl text-gray-400 font-light leading-relaxed max-w-xl mx-auto md:mx-0"
              >
                {{ currentStepData.desc }}
              </p>

              <div
                class="flex flex-wrap gap-4 pt-10 justify-center md:justify-start"
              >
                <button
                  @click="nextStep"
                  class="px-10 py-5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-full shadow-2xl shadow-purple-500/40 hover:-translate-y-1 transition-all"
                >
                  {{
                    currentStep < steps.length - 1 ? "Tiếp Tục" : "Bắt Đầu Ngay"
                  }}
                </button>
                <button
                  @click="skip"
                  class="px-10 py-5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-full border border-white/10 transition-all"
                >
                  Bỏ Qua
                </button>
              </div>
            </div>

            <!-- Image Side -->
            <div class="flex-1 relative group">
              <div
                class="absolute inset-0 bg-purple-500/10 blur-[100px] rounded-full scale-125 animate-pulse-slow"
              ></div>
              <div
                class="relative bg-white/5 backdrop-blur-3xl rounded-[3rem] border border-white/10 p-4 shadow-2xl overflow-hidden hover:border-purple-500/30 transition-all duration-700"
              >
                <img
                  :src="currentStepData.image"
                  :alt="currentStepData.title"
                  class="w-full h-auto rounded-[2.5rem] object-cover scale-100 group-hover:scale-105 transition-transform duration-[2000ms]"
                />
              </div>
            </div>
          </div>
        </Transition>
      </div>

      <!-- Close Button -->
      <button
        @click="skip"
        class="absolute top-12 right-12 text-gray-500 hover:text-white transition-colors"
      >
        <XIcon class="w-8 h-8" />
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { X as XIcon } from "lucide-vue-next";
import ecosystemMap from "../../assets/images/ecosystem_map.png";
import reportingStats from "../../assets/images/reporting_stats.png";
import partnersImg from "../../assets/images/partners.png";

const emit = defineEmits(["on-show", "on-hide"]);
const isVisible = ref(false);
const currentStep = ref(0);

const steps = [
  {
    tag: "Welcome",
    title: "Khám Phá Hệ Sinh Thái Finzo",
    desc: "Chào mừng bạn đến với kỷ nguyên quản trị thông minh. Một hệ thống duy nhất, tích hợp đa lĩnh vực từ Pháp lý, Tài chính đến Y tế và Logistics.",
    image: ecosystemMap,
  },
  {
    tag: "Intelligence",
    title: "Phân Tích & Báo Cáo Chuyên Sâu",
    desc: "Tối ưu hóa hiệu suất với hệ thống dữ liệu trực quan. Mọi chỉ số vận hành được tổng hợp và phân tích 24/7 dựa trên trí tuệ nhân tạo.",
    image: reportingStats,
  },
  {
    tag: "Network",
    title: "Kết Nối Bất Tận Với Đối Tác",
    desc: "Mở rộng mạng lưới hợp tác toàn cầu. Finzo kết nối hơn 500+ doanh nghiệp và định chế tài chính hàng đầu, đảm bảo sự phát triển vững bền.",
    image: partnersImg,
  },
];

const currentStepData = computed(() => steps[currentStep.value]);

const nextStep = () => {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++;
  } else {
    finish();
  }
};

const skip = () => finish();

const finish = () => {
  isVisible.value = false;
  emit("on-hide");
  // Mark as seen
  localStorage.setItem("has_seen_onboarding", "true");
};

const show = () => {
  isVisible.value = true;
  emit("on-show");
};

defineExpose({ show });
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(40px) scale(0.95);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-40px) scale(1.05);
}

.animate-pulse-slow {
  animation: pulse 8s infinite cubic-bezier(0.4, 0, 0.6, 1);
}
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.1);
  }
}

.animate-fade-in {
  animation: fadeIn 1s ease-out forwards;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
