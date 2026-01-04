import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import del from 'rollup-plugin-delete'
import dts from 'rollup-plugin-dts'

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.global.js',
        name: 'xyHttp',
        format: 'iife',
        globals: {
          axios: 'axios',
        },
      },
      {
        file: 'dist/index.cjs',
        format: 'cjs',
      },
      {
        file: 'dist/index.mjs',
        format: 'esm',
      },
    ],
    external: [
      'axios',
    ],
    plugins: [
      del({ targets: 'dist' }),
      typescript(),
      resolve(),
      commonjs(),
      terser(),
    ],
  },
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.d.ts',
        format: 'cjs',
      },
    ],
    plugins: [
      dts(),
    ],
  },
]
