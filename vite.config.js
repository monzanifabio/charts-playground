import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        bar: resolve(__dirname, "charts/bar.html"),
        line: resolve(__dirname, "charts/line.html"),
        pie: resolve(__dirname, "charts/pie.html"),
        stackedBar: resolve(__dirname, "charts/stacked-bar.html"),
        area: resolve(__dirname, "charts/area.html"),
      },
    },
  },
});
