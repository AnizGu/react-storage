import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';
import typescript from '@rollup/plugin-typescript';

const resolvePath = (str: string) => resolve(__dirname, str);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolvePath('src/index.tsx'),
      name: 'react-storage',
      fileName: 'index'
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      plugins: [
        typescript({
          target: "ESNext", // 这里指定编译到的版本，
          rootDir: resolvePath("src/"),
          declaration: true,
          declarationDir: resolvePath("dist"),
          exclude: resolvePath("node_modules/**"),
          allowSyntheticDefaultImports: true,
        })
      ]
    }
  }
})
