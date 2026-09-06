import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#0B0E14",
          surface: "#12161F",
          elevated: "#171D2A",
        },
        structure: {
          DEFAULT: "#5C7CFA",
          muted: "rgba(92, 124, 250, 0.15)",
          glow: "rgba(92, 124, 250, 0.4)",
        },
        signal: {
          DEFAULT: "#F2B441",
          muted: "rgba(242, 180, 65, 0.15)",
          glow: "rgba(242, 180, 65, 0.4)",
        },
        text: {
          primary: "#EDEFF4",
          muted: "#8A90A0",
        },
        line: {
          DEFAULT: "#232838",
          highlight: "#323B52",
        },
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
