import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import {fileURLToPath, URL} from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData:
          '@import "./src/app/ui/assets/style/settings/_index.scss";'
      }
    }
  },

  resolve: {
    alias: {
      '@modules': fileURLToPath(new URL('./src/modules', import.meta.url)),
      '@app': fileURLToPath(new URL('./src/app', import.meta.url))
    }
  }
});
