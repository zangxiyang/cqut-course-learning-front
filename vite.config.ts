import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import alias from "@rollup/plugin-alias";
import * as path from "path";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    alias({
      entries: [
        {find: '@', replacement: path.resolve(__dirname, 'src')}
      ]
    })
  ]
})
