import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-terser'
import external from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'

export default 
    {
        input: './index.js',
        output: [
            {
                file: 'dist/index.es.js',
                format: 'es',
                exports: 'named'
            }
        ],
        plugins: [
            babel({
                exclude: 'node_modules/**',
                presets: ['@babel/preset-react']
            }),
            external(),
            resolve(),
            terser(),
        ]
    }
