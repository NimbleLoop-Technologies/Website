/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // Only scan the specific .tw.css file being processed
    // This will be dynamically set during the build process
    "./Components/**/*.razor.tw.css"
  ],
  theme: {
    extend: {
      // Same theme as main config to ensure consistency
      colors: {
        'nimble-blue': {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          900: '#1e3a8a'
        }
      }
    },
  },
  plugins: [],
  // CSS isolation specific settings
  corePlugins: {
    preflight: true,
  }
}