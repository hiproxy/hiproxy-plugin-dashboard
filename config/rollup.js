import babel   from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'
import cjs from 'rollup-plugin-commonjs'

export default {
  entry: 'src/app.js',
  dest: 'dist/bundle.js',
  format: 'umd',
  plugins: [
    resolve(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [ [ 'es2015', { modules: false } ], 'stage-0', 'react' ],
      plugins: [ 'external-helpers' ]
    }),
    cjs({
      // exclude: 'node_modules/process-es6/**',
      include: [
        'node_modules/fbjs/**',
        'node_modules/object-assign/**',
        'node_modules/react/**',
        'node_modules/react-dom/**',
        'node_modules/prop-types/**'
      ]
    })
  ],
  external: [
    'react',
    'react-dom',
    'react-redux',
    'redux'
  ],
  globals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-redux': 'ReactRedux',
    'redux': 'Redux'
  }
}
