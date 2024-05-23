import react from '@vitejs/plugin-react';
import fixReactVirtualized from 'esbuild-plugin-react-virtualized';
import {defineConfig} from 'vite';
import mkcert from 'vite-plugin-mkcert';
import {nodePolyfills} from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    plugins: [
        react(),
        nodePolyfills({
            globals: {
                Buffer: true
            }
        }),
        mkcert({force: true})
    ],
    optimizeDeps: {
        esbuildOptions: {
            plugins: [fixReactVirtualized]
        }
    }
});
