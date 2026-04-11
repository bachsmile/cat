import { ref } from "vue";

export interface Toast {
  id: number;
  message: string;
  type: "success" | "error" | "info" | "warning";
  duration?: number;
}

const toasts = ref<Toast[]>([]);
let counter = 0;

export function useToast() {
  const showToast = (
    message: string,
    type: Toast["type"] = "success",
    duration = 3000
  ) => {
    const id = ++counter;
    toasts.value.push({ id, message, type, duration });

    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id: number) => {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  };

  return {
    toasts,
    showToast,
    removeToast,
  };
}
