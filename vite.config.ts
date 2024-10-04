import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';
import mkcert from 'vite-plugin-mkcert';
import Terminal from 'vite-plugin-terminal';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/',
    plugins: [react(), mkcert({force: true}), Terminal()],
    build: {
        minify: 'terser'
    }
});
