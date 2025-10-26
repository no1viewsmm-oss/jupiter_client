import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import obfuscatorPlugin from 'vite-plugin-javascript-obfuscator'
export default defineConfig({
  server: {
    host: "localhost",
    port: 3000,
  },
  plugins: [
    react(),
    obfuscatorPlugin({
      options: {
        compact: true,
        controlFlowFlattening: true
      }
    })
  ]
});
