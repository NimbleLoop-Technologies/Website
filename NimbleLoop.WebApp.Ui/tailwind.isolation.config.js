/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // Only scan the specific .tw.css file being processed
    // This will be dynamically set during the build process
    "./Components/**/*.razor.tw.css"
  ],
  plugins: [],
  // CSS isolation specific settings
  corePlugins: {
    preflight: true,
  }
}