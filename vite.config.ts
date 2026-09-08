import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Set base to the repository name so built asset paths work on GitHub project pages
export default defineConfig({
  base: '/portfolio2/',
  plugins: [react()],
})
