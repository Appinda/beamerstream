/** @type {import('tailwindcss').Config} */
import headlessui from "@headlessui/tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [headlessui],
};
