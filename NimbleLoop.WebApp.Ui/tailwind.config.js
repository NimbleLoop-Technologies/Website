/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // Scan all project files for global Tailwind classes
    // This will be used for the main style.css generation
    "../**/*.{html,js,razor,cs}",
    "../../**/*.{html,js,razor,cs}",
    "./**/*.{html,js,razor,cs}",
    "./Components/**/*.{razor,html}",
    "./Pages/**/*.{razor,html}",
    "./wwwroot/**/*.{html,js}",
    
    // Exclude .tw.css files from global scanning to prevent duplication
    "!./Components/**/*.tw.css",
    "!./**/*.tw.css"
  ],
  plugins: [
    // Add Tailwind plugins here if needed
  ],
  // CSS isolation support - this ensures styles are scoped
  corePlugins: {
    // Enable all core plugins
    preflight: true,
  }
}