import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	build: {
		outDir: 'dist', // Directorio de salida
		sourcemap: mode === 'development', // Mapas de fuente solo en desarrollo
		minify: 'esbuild', // Minificación con esbuild (rápida y eficiente)
		rollupOptions: {
			output: {
				manualChunks: {
					react: ['react', 'react-dom'], // Separar React en un chunk aparte
				},
			},
		},
	},
	server: {
		port: 3000,
	},
}));
