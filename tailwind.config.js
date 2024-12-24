/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        feature: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(1rem)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        footerItem: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(1rem)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        headerLogoSlideIn: {
          '0%': { 
            opacity: '0',
            transform: 'translateX(-1.25rem)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        headerLangSlideIn: {
          '0%': { 
            opacity: '0',
            transform: 'translateX(1.25rem)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        headerLogoHover: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' }
        },
        howItWorksStep: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(1.25rem)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        introContent: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(1.25rem)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          }
        }
      },
      animation: {
        feature: 'feature 0.5s ease-out',
        'footer-item': 'footerItem 0.5s ease-out forwards',
        'header-logo-slide': 'headerLogoSlideIn 0.5s ease-out forwards',
        'header-lang-slide': 'headerLangSlideIn 0.5s ease-out forwards',
        'header-logo-hover': 'headerLogoHover 0.3s ease-in-out',
        'how-it-works-step': 'howItWorksStep 0.5s ease-out forwards',
        'intro-content': 'introContent 0.7s ease-out forwards'
      }
    },
  },
  plugins: [],
} 