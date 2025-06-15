// tailwind.config.js
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        neu: '#e0e0e0',
      },
      boxShadow: {
        neu: '8px 8px 16px #bebebe, -8px -8px 16px #ffffff',
        neuInset: 'inset 4px 4px 8px #bebebe, inset -4px -4px 8px #ffffff',
      },
    },
  },
};
