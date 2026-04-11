<template>
  <div
    class="h-[calc(100vh-180px)] flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
  >
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h3 class="text-2xl font-bold text-white flex items-center gap-3">
          <SparklesIcon class="w-8 h-8 text-indigo-400 animate-pulse" />
          AI Playground
        </h3>
        <p class="text-gray-500 mt-1">
          Trải nghiệm sức mạnh của Generative AI được tích hợp trong hệ thống.
        </p>
      </div>
      <div class="flex items-center gap-4">
        <div
          class="flex items-center gap-2 bg-white/5 border border-white/5 p-1 rounded-xl"
        >
          <button
            v-for="m in availableModels"
            :key="m.id"
            @click="
              selectedModel = m.id;
              customModel = '';
            "
            class="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all"
            :class="
              selectedModel === m.id && !customModel
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'text-gray-500 hover:text-gray-300'
            "
          >
            {{ m.name }}
          </button>

          <div class="h-4 w-px bg-white/10 mx-1"></div>

          <input
            v-model="customModel"
            placeholder="Mã Model tùy chỉnh..."
            @input="selectedModel = customModel"
            class="bg-transparent border-none text-[10px] text-gray-400 placeholder:text-gray-600 focus:outline-none w-32 px-2"
          />
        </div>

        <button
          @click="clearChat"
          class="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-xl text-sm transition-all border border-white/5 flex items-center gap-2"
        >
          <Trash2Icon class="w-4 h-4" />
          Xóa
        </button>
      </div>
    </div>

    <!-- Chat Area -->
    <div
      class="flex-1 bg-[#0a0a0f] rounded-3xl border border-white/5 flex flex-col overflow-hidden relative shadow-2xl"
    >
      <!-- Welcome screen when empty -->
      <div
        v-if="messages.length === 0"
        class="flex-1 flex flex-col items-center justify-center p-8 text-center"
      >
        <div
          class="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mb-6"
        >
          <BotIcon class="w-10 h-10 text-indigo-400" />
        </div>
        <h4 class="text-xl font-bold mb-2">
          Xin chào! Tôi có thể giúp gì cho bạn?
        </h4>
        <p class="text-gray-500 max-w-sm">
          Tôi là trí tuệ nhân tạo Gemini được tích hợp sẵn. Bạn có thể hỏi tôi
          về lập trình, pháp luật, hoặc bất cứ điều gì.
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8 w-full max-w-lg">
          <button
            v-for="suggestion in suggestions"
            :key="suggestion"
            @click="useSuggestion(suggestion)"
            class="p-4 bg-white/5 border border-white/5 rounded-2xl text-xs text-left text-gray-400 hover:text-white hover:bg-white/10 hover:border-indigo-500/30 transition-all group"
          >
            {{ suggestion }}
            <ArrowRightIcon
              class="w-3 h-3 mt-2 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400"
            />
          </button>
        </div>
      </div>

      <!-- Messages List -->
      <div
        v-else
        ref="chatContainer"
        class="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
      >
        <div
          v-for="(msg, i) in messages"
          :key="i"
          class="flex"
          :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
        >
          <div
            class="max-w-[80%] flex gap-4"
            :class="msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'"
          >
            <!-- Avatar -->
            <div
              class="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center shadow-lg"
              :class="
                msg.role === 'user'
                  ? 'bg-indigo-600'
                  : 'bg-gradient-to-br from-purple-600 to-indigo-700'
              "
            >
              <UserIcon v-if="msg.role === 'user'" class="w-5 h-5 text-white" />
              <BotIcon v-else class="w-5 h-5 text-white" />
            </div>

            <!-- Bubble -->
            <div
              class="p-4 rounded-2xl text-sm leading-relaxed"
              :class="
                msg.role === 'user'
                  ? 'bg-indigo-600 text-white rounded-tr-none'
                  : 'bg-white/5 text-gray-200 border border-white/5 rounded-tl-none'
              "
            >
              <div
                v-html="formatMessage(msg.content)"
                class="prose prose-invert max-w-none"
              ></div>
            </div>
          </div>
        </div>

        <!-- Thinking indicator -->
        <div v-if="loading" class="flex justify-start">
          <div class="flex gap-4 items-center pl-14">
            <div class="flex gap-1.5">
              <div
                class="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]"
              ></div>
              <div
                class="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"
              ></div>
              <div
                class="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"
              ></div>
            </div>
            <span
              class="text-[10px] uppercase tracking-widest text-gray-500 font-bold"
              >AI đang suy nghĩ...</span
            >
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <div class="p-6 border-t border-white/5 bg-black/20 backdrop-blur-xl">
        <form @submit.prevent="sendMessage" class="relative">
          <textarea
            v-model="input"
            @keydown.enter.prevent="sendMessage"
            rows="1"
            placeholder="Nhập câu hỏi của bạn tại đây..."
            class="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-16 text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all resize-none max-h-32"
          ></textarea>
          <button
            type="submit"
            :disabled="!input.trim() || loading"
            class="absolute right-2 top-2 w-12 h-12 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 disabled:hover:bg-indigo-600 rounded-xl flex items-center justify-center transition-all shadow-lg shadow-indigo-500/20 text-white"
          >
            <SendIcon class="w-5 h-5" />
          </button>
        </form>
        <p
          class="text-[10px] text-gray-600 text-center mt-3 uppercase tracking-tighter"
        >
          Phát triển bởi Google Gemini
          {{ selectedModel.includes("2.0") ? "2.0" : "1.5" }} • Kết nối ổn định
          • Phản hồi thức thì
        </p>
        <CgCard type="heavy-frost" shadow="mist">
          <h3>Liquid Glass Title</h3>
          <p>This card features deep blur and high-fidelity frost texture.</p>
        </CgCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue";

import {
  Sparkles as SparklesIcon,
  Bot as BotIcon,
  User as UserIcon,
  Send as SendIcon,
  Trash2 as Trash2Icon,
  ArrowRight as ArrowRightIcon,
} from "lucide-vue-next";
import { aiApi } from "@/api/ai";
import { CgCard } from "glass-studio-ui-pro";

const messages = ref<{ role: "user" | "model"; content: string }[]>([]);
const input = ref("");
const loading = ref(false);
const chatContainer = ref<HTMLElement | null>(null);

const availableModels = [
  { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash" },
  { id: "gemini-3-flash-preview", name: "Gemini 3 Flash" },
  { id: "gemma-3-1b-it", name: "Gemma 3 1B" },
  { id: "gemini-2.5-flash-lite", name: "Gemini 2.5 Flash Lite" },
  {
    id: "gemini-3.1-flash-lite-preview",
    name: "Gemini 3.1 Flash Lite Preview",
  },
];

const selectedModel = ref("gemini-3-flash-preview");
const customModel = ref("");

const suggestions = [
  "Viết email chào mừng nhân viên mới",
  "Giải thích về Blockchain cho người mới",
  "Tư vấn về luật sở hữu trí tuệ tại VN",
  "Viết code NestJS để gửi email",
];

const scrollToBottom = async () => {
  await nextTick();
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
};

const clearChat = () => {
  messages.value = [];
};

const useSuggestion = (text: string) => {
  input.value = text;
  sendMessage();
};

const sendMessage = async () => {
  if (!input.value.trim() || loading.value) return;

  const userContent = input.value.trim();
  messages.value.push({ role: "user", content: userContent });
  input.value = "";
  loading.value = true;

  await scrollToBottom();

  const aiMessageIndex = messages.value.length;
  messages.value.push({ role: "model", content: "" });

  try {
    // Collect history for context
    const history = messages.value.slice(0, -2).map((m) => ({
      role: m.role,
      parts: [{ text: m.content }],
    }));

    await aiApi.chatStream(
      userContent,
      history,
      selectedModel.value,
      (chunk) => {
        if (messages.value[aiMessageIndex]) {
          messages.value[aiMessageIndex].content += chunk;
          scrollToBottom();
        }
      },
    );
  } catch (error: any) {
    console.error("AI Error:", error);
    if (messages.value[aiMessageIndex]) {
      messages.value[aiMessageIndex].content =
        `⚠️ Lỗi từ AI: ${error.message || "Không thể kết nối tới Google Gemini."}`;
    }
  } finally {
    loading.value = false;
    await scrollToBottom();
  }
};

const formatMessage = (text: string) => {
  // Simple markdown-to-html (very basic implementation)
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\n/g, "<br />")
    .replace(
      /```([\s\S]*?)```/g,
      '<pre class="bg-black/50 p-4 rounded-xl font-mono text-xs my-3 border border-white/10 overflow-x-auto">$1</pre>',
    );
};
</script>

<style scoped>
.prose pre {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>
