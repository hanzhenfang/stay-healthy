import { defineConfig, Plugin } from "vite";
import vue from "@vitejs/plugin-vue";
import Unocss from "unocss/vite";
import presetUno from "@unocss/preset-uno";
import { resolve } from "path";
import vueJsx from "@vitejs/plugin-vue-jsx";

function myPlugin() {
  return {
    name: "my-plugin",
    install(aa) {
      console.log(aa);
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    myPlugin(),
    vueJsx(),
    Unocss({
      presets: [presetUno()],
      shortcuts: {
        centered: "flex items-center justify-center"
      }
    })
  ],
  build: {
    sourcemap: true
  },
  esbuild: {
    sourcemap: true
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src/"),
      "~": resolve(__dirname, "/")
    }
  },

  server: {
    host: "0.0.0.0"
  }
});
