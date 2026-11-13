import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import process from "node:process";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const token = env.VITE_WYNN_AUTH_TOKEN || "";

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        "/api/wynn": {
          target: "https://api.wynncraft.com",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/wynn/, ""),
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        },
      },
    },
  };
});
