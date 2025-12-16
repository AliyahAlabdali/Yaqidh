/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      brand: {
        50: 'var(--color-brand-50)',
        100: 'var(--color-brand-100)',
        200: 'var(--color-brand-200)',
        500: 'var(--color-brand-500)',
        600: 'var(--color-brand-600)',
        900: 'var(--color-brand-900)',
      },
      danger: 'var(--color-danger)',
      safe: 'var(--color-safe)',
      white: '#ffffff',
      slate: {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        500: '#64748b',
        700: '#334155',
        800: '#1e293b',
      },
    },
    borderRadius: {
      'xl': 'var(--radius-xl)',
      '2xl': 'var(--radius-2xl)',
    },
  },
}