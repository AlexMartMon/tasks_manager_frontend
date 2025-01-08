import formsPlugin from '@tailwindcss/forms';

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {},
  },
  plugins: [
    formsPlugin
  ],
};
