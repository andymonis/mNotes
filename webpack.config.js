/**
 * # webpack.config.js
 * PumpFace aOS webpack config for loading legacy AMD modules
 * AMONIS: 12/03/2018
 */
const path = require('path');
const webpack = require('webpack');

module.exports = env => {
  // Set the build type based on Node Env ( Jenkins should do a production build )
  var mode = process.env.NODE_ENV === "production" ? "production" : "development";

  return {
    context: __dirname,
    mode: mode,

    entry: [ './app/app.js' ],

    // Output configuration
    output: {
        // The filename of aos
        filename: 'app.js',
        // The target path for all build items
        path: path.resolve( __dirname, "deploy" ),
        libraryTarget: 'this'
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          include: [
            path.resolve( __dirname, "app" )
          ],
          use: {
            loader: 'babel-loader'
          }
        }
      ]
    },

    // Define external dependencies ( loaded via script tags )
    externals: {
    },

    resolve: {
        // directories where to look for modules
        modules: [
            path.resolve( __dirname, "node_modules" ),
            path.resolve( __dirname, "app" )
        ],

        // extensions that are used
        extensions: [ ".js", ".html", ".json" ],

        // aliases to be matched
        alias: {
        }
    },

    resolveLoader: {
    }
  };

};
