import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Unocss from "unocss/vite";
import presetUno from "@unocss/preset-uno";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Unocss({
      presets: [presetUno()],
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
