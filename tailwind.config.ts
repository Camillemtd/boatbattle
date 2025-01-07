import type { Config } from "tailwindcss"

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(100%)" },
        },
        noise: {
          "0%, 100%": { transform: "translate(0,0)" },
          "10%": { transform: "translate(-5%,-5%)" },
          "20%": { transform: "translate(-10%,5%)" },
          "30%": { transform: "translate(5%,-10%)" },
          "40%": { transform: "translate(-5%,15%)" },
          "50%": { transform: "translate(-10%,5%)" },
          "60%": { transform: "translate(15%,0)" },
          "70%": { transform: "translate(0,10%)" },
          "80%": { transform: "translate(-15%,0)" },
          "90%": { transform: "translate(10%,5%)" },
        },
        distortionBand: {
          "0%": { transform: "translateY(-100vh)" },
          "100%": { transform: "translateY(100vh)" },
        },
        colorShift: {
          "0%, 100%": { opacity: "0.1" },
          "50%": { opacity: "0.15" },
        },
        textGlitch: {
          "0%, 100%": { transform: "translateX(0)" },
          "92%": { transform: "translateX(0)" },
          "94%": { transform: "translateX(4px)" },
          "96%": { transform: "translateX(-4px)" },
          "98%": { transform: "translateX(4px)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
        vignettePulse: {
          "0%, 100%": { boxShadow: "inset 0 0 100px rgba(0,0,0,0.8)" },
          "50%": { boxShadow: "inset 0 0 100px rgba(0,0,0,0.9)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config