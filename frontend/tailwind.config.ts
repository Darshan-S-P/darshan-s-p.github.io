import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#08090d",
        surface: "#0f1118",
        surfaceLight: "#181b26",
        neonCyan: "#00f2fe",
        neonBlue: "#4facfe",
        neonPurple: "#9d4edd",
        neonEmerald: "#10b981",
        neonAmber: "#f59e0b",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-cyber": "linear-gradient(135deg, #00f2fe 0%, #4facfe 50%, #9d4edd 100%)",
        "mesh-pattern": "radial-gradient(circle at 50% 50%, rgba(0, 242, 254, 0.08) 0%, transparent 60%)",
      },
      boxShadow: {
        "glow-cyan": "0 0 25px -5px rgba(0, 242, 254, 0.4)",
        "glow-purple": "0 0 25px -5px rgba(157, 78, 221, 0.4)",
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "scanline": "scanline 8s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        }
      }
    },
  },
  plugins: [],
};
export default config;
