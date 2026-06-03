import react from '@vitejs/plugin-react';
import {visualizer} from 'rollup-plugin-visualizer';
import {defineConfig} from 'vite';
import mkcert from 'vite-plugin-mkcert';
import Terminal from 'vite-plugin-terminal';

const matchesNodeModule = (id: string, packages: string[]) =>
    packages.some(packageName => id.includes(`/node_modules/${packageName}/`));

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
            rolldownOptions: {
                output: {
                    codeSplitting: {
                        groups: [
                            {
                                name: 'react',
                                test: id =>
                                    matchesNodeModule(id, [
                                        'react',
                                        'react-dom',
                                        'react-router-dom'
                                    ])
                            },
                            {
                                name: 'redux',
                                test: id =>
                                    matchesNodeModule(id, [
                                        '@reduxjs/toolkit',
                                        'react-redux',
                                        'redux-persist'
                                    ])
                            },
                            {
                                name: 'ton',
                                test: id =>
                                    matchesNodeModule(id, [
                                        '@ton/core',
                                        '@ton/crypto',
                                        '@tonconnect/ui'
                                    ])
                            },
                            {
                                name: 'ui',
                                test: id =>
                                    matchesNodeModule(id, [
                                        '@floating-ui/react',
                                        'react-toastify',
                                        'swiper'
                                    ])
                            },
                            {
                                name: 'rxjs',
                                test: id =>
                                    matchesNodeModule(id, [
                                        'rxjs',
                                        'redux-observable'
                                    ])
                            }
                        ]
                    }
                }
            }
        }
    };
});
