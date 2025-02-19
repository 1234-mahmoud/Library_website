import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/repo/', // Set this to the name of your GitHub repository
  plugins: [react()],
  server:{
    host:true,
  }

})
