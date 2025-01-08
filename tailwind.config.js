/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      fontWeight: {
        normal: '300',
        semibold: '400',
        bold: '600',
      },
      colors: {
        primary: {
          DEFAULT: '#19192e', // Navy from the image
          light: '#2c67b1', // Blue accent
          dark: '#173258', // Dark blue
        },
        secondary: {
          DEFAULT: '#faad33', // Orange from triangles
          light: '#f47752', // Coral accent
          dark: '#6e68af', // Purple accent
        },
        neutral: {
          DEFAULT: '#728197', // Corporate gray
          light: '#f7f9fc', // Light gray background
          dark: '#292929', // Dark text
        },
        accent: {
          teal: '#37c0c0',
          white: '#ffffff',
          cream: '#f8f9fa',
        },
        glass: {
          light: 'rgba(255, 255, 255, 0.25)',
          medium: 'rgba(255, 255, 255, 0.35)',
          heavy: 'rgba(255, 255, 255, 0.5)',
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(20px, 20px)' },
        },
        'float-medium': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-15px, -15px)' },
        },
        'float-fast': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(10px, -10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOut: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        gradient: 'gradient 15s ease infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'float-medium': 'float-medium 6s ease-in-out infinite',
        'float-fast': 'float-fast 4s ease-in-out infinite',
        fadeIn: 'fadeIn 0.3s ease-out forwards',
        slideIn: 'slideIn 0.3s ease-out forwards',
        slideOut: 'slideOut 0.3s ease-out forwards',
        scaleUp: 'scaleUp 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
};
