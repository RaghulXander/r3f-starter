import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPathsPlugin from 'vite-tsconfig-paths';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPathsPlugin(),
    visualizer({ template: 'sunburst' }),
  ],
});
