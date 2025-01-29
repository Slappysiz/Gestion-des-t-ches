/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(-20px)' },
          '50%': { transform: 'translateY(20px)' },
        },
        'float-reverse': {
          '0%, 100%': { transform: 'translateY(20px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        'float-reverse': 'float-reverse 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
