/// <reference types="vitest" />
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: "/src" },
      { find: "@ui", replacement: "/src/components/ui" },
      { find: "@icons", replacement: "/src/components/icons" },
    ],
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/jest.setup.ts",
    css: true,
  },
})
