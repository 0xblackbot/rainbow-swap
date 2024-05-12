import react from '@vitejs/plugin-react';
import fixReactVirtualized from 'esbuild-plugin-react-virtualized';
import {defineConfig} from 'vite';
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
        })
    ],
    optimizeDeps: {
        esbuildOptions: {
            plugins: [fixReactVirtualized]
        }
    }
});
