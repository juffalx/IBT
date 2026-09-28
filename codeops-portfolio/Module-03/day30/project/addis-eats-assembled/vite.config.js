import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import mockApi from './server/mockApi.js'

export default defineConfig({
  plugins: [react(), mockApi()],
})
