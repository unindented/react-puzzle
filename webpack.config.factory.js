'use strict'

var webpack = require('webpack')

module.exports = function (options) {
  var isTest = options.test
  var hasCoverage = options.coverage
  var isOptimized = options.environment === 'production'

  return {
    entry: {
      'ReactPuzzle': './src/'
    },

    output: {
      path: './dist/',
      pathinfo: !isOptimized,

      filename: 'react-puzzle' + (isOptimized ? '.min' : '') + '.js',

      library: '[name]',
      libraryTarget: 'umd'
    },

    externals: (!isTest ? {
      'react': {
        root: 'React',
        amd: 'react',
        commonjs: 'react',
        commonjs2: 'react'
      },
      'react-motion': {
        root: 'ReactMotion',
        amd: 'react-motion',
        commonjs: 'react-motion',
        commonjs2: 'react-motion'
      }
    } : {}),

    debug: isTest,
    devtool: (isTest ? 'eval' : null),

    resolve: {
      modulesDirectories: [
        'node_modules'
      ]
    },

    resolveLoader: {
      modulesDirectories: [
        'node_modules'
      ]
    },

    module: {
      loaders: [
        {
          test: /\.css$/,
          exclude: /node_modules[\\\/]/,
          loader: 'style!css?modules'
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules[\\\/]/,
          loader: hasCoverage ? 'isparta' : 'babel'
        },
        {
          test: /\.svg$/,
          exclude: /node_modules[\\\/]/,
          loader: 'file'
        },
        {
          test: require.resolve('react'),
          loader: 'expose?React'
        }
      ]
    },

    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(options.environment)
        }
      })
    ].concat(isOptimized ? [
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          screw_ie8: true,
          warnings: false
        }
      })
    ] : [])
  }
}
