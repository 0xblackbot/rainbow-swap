import react from '@vitejs/plugin-react';
import {visualizer} from 'rollup-plugin-visualizer';
import {defineConfig} from 'vite';
import mkcert from 'vite-plugin-mkcert';
import Terminal from 'vite-plugin-terminal';

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
    const isDev = mode === 'development';
    const shouldAnalyze = process.env.VITE_ANALYZE === 'true';

    return {
        base: process.env.VITE_BASE_URL ?? '/',
        plugins: [
            react(),
            ...(isDev ? [mkcert({force: true}), Terminal()] : []),
            ...(shouldAnalyze ? [visualizer({open: true})] : [])
        ],
        build: {
            minify: 'terser',
            rollupOptions: {
                output: {
                    manualChunks: {
                        react: ['react', 'react-dom', 'react-router-dom'],
                        redux: [
                            '@reduxjs/toolkit',
                            'react-redux',
                            'redux-persist'
                        ],
                        ton: ['@ton/core', '@ton/crypto', '@tonconnect/ui'],
                        ui: ['@floating-ui/react', 'react-toastify', 'swiper'],
                        rxjs: ['rxjs', 'redux-observable']
                    }
                }
            }
        }
    };
});
