import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "https://peckeby.github.io/worst-ux/",
  plugins: [react()],
});
