import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Library_website/', // Set this to the name of your GitHub repository
  plugins: [react()],


})
