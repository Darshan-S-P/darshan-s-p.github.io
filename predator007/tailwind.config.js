/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyberCyan: "#00f2fe",
        cyberPink: "#ff007f",
        cyberMagenta: "#d946ef",
        cyberPurple: "#8b5cf6",
        cyberNeon: "#00ff88",
        cyberDark: "#06070c",
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
        cyber: ['"Orbitron"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(0, 242, 254, 0.45)',
        'neon-pink': '0 0 20px rgba(255, 0, 127, 0.45)',
        'neon-purple': '0 0 20px rgba(139, 92, 246, 0.45)',
        'neon-green': '0 0 15px rgba(0, 255, 136, 0.45)',
      },
      animation: {
        'pulse-fast': 'pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flicker': 'flicker 3s infinite',
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: 0.99,
            filter: 'drop-shadow(0 0 10px rgba(0, 242, 254, 0.8))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: 0.4,
            filter: 'none',
          },
        },
      },
    },
  },
  plugins: [],
}
