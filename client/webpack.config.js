const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { GenerateSW, InjectManifest } = require('workbox-webpack-plugin');


module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Jate',
      }),
      // new GenerateSW({
      //   runtimeCaching: [
      //     {
      //       urlPattern: '/',
      //       handler: 'CacheFirst',
      //       options: {
      //         cacheName: 'text',

      //       }
      //     }
      //   ]
      // }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
      new WebpackPwaManifest({
        name: 'Text Editor',
        short_name: 'TE',
        description: 'This is a application to take notes.',
        background_color: '#272822',
        fingerprints: false,
        inject:true,
        start_url: '/',
        publicPath: '/',
        icons: [
          // {
          //   src: path.resolve('./favicon.ico'),
          //   sizes: [96, 128, 192, 256, 384, 512],
          //   sizes: [48],
          //   destination: path.join('assets', 'icons')
          // },
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons')
          }
        ]
      })
    ],

    module: {
      // CSS loaders
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          // We use babel-loader in order to use ES6.
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
