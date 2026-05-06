import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    base: '/worst-ux/', // This fixes the 404 by prefixing all paths
    plugins: [react()],
})
