
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/travel/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "TravelGo - Travel Booking",
        short_name: "TravelGo",
        description: "Explore destinations and book your next trip.",
        theme_color: "#0c4c5b",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/travel/",
        scope: "/travel/",
        icons: [
          {
            src: "/travel/icons.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any",
          },
        ],
      },
    }),
  ],
});
