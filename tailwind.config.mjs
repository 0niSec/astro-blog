/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)", // Replace with your desired green shade
        "accent-primary": "rgb(var(--color-accent-primary) / <alpha-value>)", // Array for easier access
        "accent-secondary":
          "rgb(var(--color-accent-secondary) / <alpha-value>)",
        success: "rgb(var(--color-success) / <alpha-value>)", // Can inherit from primary
        info: "rgb(var(--color-info) / <alpha-value>)", // Teal
        warning: "rgb(var(--color-warning) / <alpha-value>)", // Yellow
        error: "rgb(var(--color-error) / <alpha-value>)", // Red
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
