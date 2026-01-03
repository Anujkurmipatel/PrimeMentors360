/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mykidstheme: {
          "primary": "#FF6B6B",    // Playful Red/Pink
          "secondary": "#4ECDC4",  // Bright Teal
          "accent": "#FFE66D",     // Bright Yellow
          "neutral": "#292929",    // Dark Grey for text
          "base-100": "#FFFDF9",   // Warm White background (easier on eyes than pure white)
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
          
          // These control the "roundness" - higher numbers = more playful
          "--rounded-box": "1rem", // Border radius for cards
          "--rounded-btn": "1.5rem", // Border radius for buttons
          "--rounded-badge": "2rem", // Border radius for badges
        },
      },
      "light", // Fallback
    ],
  },
}