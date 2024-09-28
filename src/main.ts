import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createI18n } from "vue-i18n";

const i18n = createI18n({
  locale: navigator.language,
});

const app = createApp(App);

app.use(i18n);

app.mount("#app");
