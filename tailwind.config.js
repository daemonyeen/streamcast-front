/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  safelist: ["animate-toast-in", "animate-toast-out"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter, sans-serif"],
      },
      backgroundImage: {
        pattern: "url('/media/pattern.svg')",
      },
      keyframes: {
        "toast-in": {
          "0%": {
            transform: "translateY(-5px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        "toast-out": {
          "0%": {
            transform: "translateY(0)",
            opacity: "1",
          },
          "100%": {
            transform: "translateY(-5px)",
            opacity: "0",
          },
        },
      },
      animation: {
        "toast-in": "toast-in 150ms ease-in",
        "toast-out": "toast-out 150ms ease-out",
      },
    },
  },
};
