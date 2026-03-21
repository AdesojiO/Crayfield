/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#C0622A',
          dark:    '#8B4513',
          light:   '#F5E6D3',
          muted:   '#EDD9C0',
        },
        neutral: {
          bg:     '#FAF7F4',
          border: '#E8E0D5',
          muted:  '#5C5C5C',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        pill: '999px',
      },
      boxShadow: {
        card: '0 2px 12px rgba(0,0,0,.08)',
        btn:  '0 4px 14px rgba(192,98,42,.30)',
      },
    },
  },
  plugins: [],
}
