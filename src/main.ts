import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import GlassUI from "glass-studio-ui-pro";
import i18n from "./i18n";

// 🎨 Initialize Global Font from LocalStorage immediately
const initSystemFont = () => {
  const savedFont = localStorage.getItem("system_font");
  if (savedFont) {
    document.documentElement.style.setProperty("--system-font", savedFont);
  } else {
    // Default system stack if not set
    const defaultStack = `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`;
    document.documentElement.style.setProperty("--system-font", defaultStack);
  }
};

initSystemFont();

// Expose global helper for dynamic font switching
(window as any).$setSystemFont = (fontName: string) => {
  localStorage.setItem("system_font", fontName);
  document.documentElement.style.setProperty("--system-font", fontName);
};

const app = createApp(App);
app.use(router);
app.use(i18n);
app.use(GlassUI as any, {
  licenseKey: "B771-00CA-789B-0C6E-4A04-6EBB-7564-0DEB-7EB6-F075-6EAC-5D1B",
});

app.mount("#app");
