import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Unfonts from "unplugin-fonts/vite";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueI18nPlugin(),
    Unfonts({
      google: {
        families: [
          {
            name: "Inter",
            styles: "ital,opsz,wght@0,14..32,100..900;1,14..32,100..900",
          },
        ],
      },
    }),
  ],
});
