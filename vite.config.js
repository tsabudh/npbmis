import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vercel from 'vite-plugin-vercel';


const API_URI =
  process.env.NODE_ENV === "production"
    ? "https://skdapi.tsabudh.com.np"
    : "http://localhost:3000/api/v1";

export default defineConfig({
  plugins: [react(),vercel()],
  server: {
    host: true,
  },
  define: {
    "process.env.API_URI": JSON.stringify(API_URI),
  },
});
