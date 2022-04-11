import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgSfc from "vite-plugin-svg-sfc";
import {resolve} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src') 
    }
  },
  plugins: [vue(), svgSfc()]
})
