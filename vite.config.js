import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  define: {
    "process.env": {},
  },
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0", // อนุญาตให้เข้าถึงจากภายนอก
    port: 5173, // ตรวจสอบว่า port ตรงกับที่ใช้จริง
    strictPort: true,
    allowedHosts: ["5217-183-88-235-220.ngrok-free.app"],
  },
});
