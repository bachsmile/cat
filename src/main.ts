import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import GlassUI from "glass-studio-ui-pro";
const app = createApp(App);
app.use(router);
app.use(GlassUI, {
  licenseKey: "88AF-100B-5E8E-5919-4E8A-33A9-3F03-E938-563C-1BFC-B153-1C56",
});

app.mount("#app");
