/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // Only scan the specific .tw.css file being processed
    // This will be dynamically set during the build process
    "./Components/**/*.razor.tw.css"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['RobotoVariable', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        // Primary colors
        primary: {
          DEFAULT: '#003366',
          dark: '#ffa500',
        },
        // Secondary colors
        secondary: {
          DEFAULT: '#008080',
          dark: '#32cd32',
        },
        // Foreground colors
        foreground: {
          DEFAULT: '#2f3135',
          dark: '#fafafa',
        },
        // Background colors
        light: '#fafafa',
        dark: '#2f3135',
        // Info colors
        info1: {
          DEFAULT: '#e3ebf4',
          dark: '#003366',
        },
        info2: {
          DEFAULT: '#dfeded',
          dark: '#008080',
        },
        // Utility colors
        muted: '#cacaca',
        // Error colors
        error: {
          DEFAULT: '#dc2626',
          light: '#fee2e2',
          dark: '#ef4444',
        },
        // Warning colors
        warning: {
          DEFAULT: '#f59e0b',
          light: '#fef3c7',
          dark: '#fbbf24',
        },
      },
    },
  },
  plugins: [],
  // CSS isolation specific settings
  corePlugins: {
    preflight: true,
  }
}