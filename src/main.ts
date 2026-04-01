import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import GlassUI from "glass-studio-ui-pro";
import i18n from "./i18n";

const app = createApp(App);
app.use(router);
app.use(i18n);
app.use(GlassUI, {
  licenseKey: "B771-00CA-789B-0C6E-4A04-6EBB-7564-0DEB-7EB6-F075-6EAC-5D1B",
});

app.mount("#app");
