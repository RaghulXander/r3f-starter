//import typescript from 'rollup-plugin-typescript2';
//import terser from '@rollup/plugin-terser';
//import postcss from 'rollup-plugin-postcss';

//export default {
//  input: 'src/main.tsx', // Path to your entry file
//  output: {
//    file: 'dist/modelViewer.min.js', // Output file path
//    format: 'iife', // Output format (IIFE for browser)
//    name: 'AllenModelViewer', // Name of the global variable (if exporting as a library)
//    sourcemap: true, // Generate sourcemaps
//  },
//  plugins: [
//   typescript({
//      tsconfig: 'tsconfig.json',
//     abortOnError: false,
//      check: false
//    }),
//    terser(), // Minify the output
//    postcss({
//      extract: true, // Extract CSS to a separate file (optional)
//      modules: true // Enable CSS modules (optional)
//    })
//  ],
//};

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import peerDeps from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';

export default {
  input: [
    './src/index.ts',
  ],
  output: {
    dir: 'dist',
    format: 'esm',
    //preserveModules: true,
    //preserveModulesRoot: 'src',
    sourcemap: true,
  },
  plugins: [
    peerDeps(),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: 'tsconfig.json',
      abortOnError: false,
      check: false
    }),
    postcss(),
    terser(),
  ],
  external: ["react", "react-dom"]
};