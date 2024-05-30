import babel from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'

export default 
    {
        input: './index.js',
        output: [
            {
                file: 'dist/index.js',
                format: 'cjs'
            }
        ],
        plugins: [
            babel({
                exclude: 'node_modules/**',
                presets: ['@babel/preset-react']
            }),
            {'react' : ['useState']},
            commonjs(),
            terser(),
            nodeResolve()
        ]
    }
