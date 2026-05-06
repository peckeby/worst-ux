import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    base: '/worst-ux/', // This ensures paths become /worst-ux/src/main.tsx
})
