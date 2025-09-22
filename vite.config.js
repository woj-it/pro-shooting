import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: '/pro-shooting/',   // <- nazwa repo
  plugins: [react()],
  test: {
    globals: true,        // wtedy nie musisz importować describe/it/expect
    environment: "node",  // dla utili; użyj "jsdom" gdy testujesz DOM
    include: ["tests/**/*.test.ts"]
  }
});
