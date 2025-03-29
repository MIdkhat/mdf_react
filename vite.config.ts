import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(), // React plugin for JSX transformation
    svgr(), // SVG plugin for importing SVGs as React components
  ],
  build: {
    outDir: 'dist', // Output directory for production build
    target: 'esnext', // Target modern JavaScript for improved performance
    chunkSizeWarningLimit: 1000, // Increase chunk size warning limit to 1MB (optional)
    rollupOptions: {
      output: {
        // Manual chunks to split dependencies into separate files
        manualChunks(id) {
          // Vendor chunk for third-party libraries from node_modules
          if (id.includes('node_modules')) {
            return 'vendor'; // Move all node_modules to a vendor chunk
          }
          // Optionally split large components or assets
          if (id.includes('src/components')) {
            return 'components'; // Split components into a separate chunk
          }
        },
        // Control how chunks are named
        entryFileNames: '[name].[hash].js',
        chunkFileNames: '[name].[hash].js',
        assetFileNames: '[name].[hash].[ext]',
      },
    },
    // Additional optimizations
    minify: 'esbuild', // Use esbuild for faster and smaller minification
    sourcemap: false, // Disable sourcemaps for production to save space (optional)
  },
});