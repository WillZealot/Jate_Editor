const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');




module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    // Added and configured workbox plugins for a service worker and manifest file.
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'JATE'
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }), 
      new WebpackPwaManifest({
        filename: 'manifest.json',
        inject: true,
        name: 'Jate',
        short_name: 'J.A.T.E',
        description: 'Text Editor!',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: '/',
        publicPath: './',
        orientation: "portrait",
        display: "standalone",
        icons:[
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            type: "image/png",
            destination: path.join('assets', 'icons'),
            purpose: "any",
          },
        ],
      }),
      
    ],

    module: {
      // Added CSS loaders and babel to webpack.
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader', // You can also use 'asset/resource' for newer Webpack versions
              options: {
                name: '[name].[ext]', // Preserve the original filename
                outputPath: 'assets/icons', // Output path relative to 'dist'
              },
            },
          ],
        },
      ],
    },
  };
};
