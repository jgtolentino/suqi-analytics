/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // TBWA Brand Colors - ensure these are always included in production
    'bg-tbwa-black', 'bg-tbwa-white', 'bg-tbwa-yellow', 'bg-tbwa-gray', 'bg-tbwa-lightGray',
    'text-tbwa-black', 'text-tbwa-white', 'text-tbwa-yellow', 'text-tbwa-gray', 'text-tbwa-lightGray',
    'border-tbwa-black', 'border-tbwa-white', 'border-tbwa-yellow', 'border-tbwa-gray', 'border-tbwa-lightGray',
    'hover:bg-tbwa-black', 'hover:bg-tbwa-white', 'hover:bg-tbwa-yellow', 'hover:bg-tbwa-gray',
    'hover:text-tbwa-black', 'hover:text-tbwa-white', 'hover:text-tbwa-yellow', 'hover:text-tbwa-gray',
    // Background opacity variants
    'bg-opacity-10', 'bg-opacity-20', 'bg-opacity-30', 'text-opacity-70', 'text-opacity-80', 'border-opacity-30',
    // Scout brand colors
    'bg-scout-primary', 'bg-scout-secondary', 'text-scout-primary', 'text-scout-secondary',
  ],
  theme: {
    extend: {
      colors: {
        scout: {
          primary: '#000000',     // TBWA Black
          secondary: '#FFD700',   // TBWA Yellow
          accent: '#1E40AF',      // TBWA Blue  
          dark: '#000000',        // TBWA Black
          light: '#F5F5F5',       // TBWA Light Gray
          text: '#000000',        // TBWA Black text
          card: '#FFFFFF',        // TBWA White
          border: '#F5F5F5',      // TBWA Light Gray border
        },
        tbwa: {
          yellow: '#FFD700',      // TBWA Yellow
          black: '#000000',       // TBWA Black
          white: '#FFFFFF',       // TBWA White
          gray: '#4A4A4A',        // TBWA Gray
          lightGray: '#F5F5F5',   // TBWA Light Gray
          darkYellow: '#E6C200',  // TBWA Dark Yellow
          blue: '#1E40AF',        // TBWA Blue
          purple: '#6B46C1',      // Accent Purple
          emerald: '#059669',     // Accent Emerald
          red: '#DC2626',         // Accent Red
          orange: '#D97706',      // Accent Orange
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}