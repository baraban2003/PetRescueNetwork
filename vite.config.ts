import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr"

// https://vitejs.dev/config/
export default defineConfig({
  base: "/PetRescueNetwork/",
  plugins: [react(), svgr()],
  server: {
    open: true,
  },
  build: {
    outDir: "build",
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests",
    mockReset: true,
  },
})
