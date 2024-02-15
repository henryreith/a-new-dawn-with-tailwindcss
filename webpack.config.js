const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

module.exports = (env) => {
  // Determine if we're doing a production build or not
  const isProduction = env.production === true;

  return {
    // Adjust the mode based on the passed environment variable
    mode: isProduction ? 'production' : 'development',
    // Enable source maps conditionally
    devtool: isProduction ? false : 'cheap-module-source-map',
    entry: {
      base: './assets/base.css',
      app: './assets/app.css',
      // Add other entry points for JS or CSS here
      
      // -- SCSS --
      // Sections
      'section-hero-home-page': './src/scss/sections/section-hero-home-page.scss',

      // Other
      swiperStyles: './src/scss/swiper.scss',
      'hrm-animations': './src/scss/utils/hrm-animations.scss',
      
      // -- JS -- 
      // Sections
      'hero__home-page': './src/js/hero__home-page.js',
      'highlighted-products': './src/js/highlighted-products.js',

      // Other
      'cart-recommendations': './src/js/cart-recommendations.js',
    },
    output: {
      path: path.resolve(__dirname, 'assets'),
      filename: '[name].min.js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.(scss|css)$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
                loader: 'postcss-loader',
                options: {
                    postcssOptions: {
                        plugins: [
                            require('autoprefixer')
                        ]
                    }
                }
            },
            'sass-loader',
          ],
        },
      ],
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
            parallel: true, // Enable parallel processing
            terserOptions: {
                format: {
                    comments: false,
                },
                // Enable Tree Shaking https://dev.to/fritzlolpro/getting-started-with-tree-shaking-in-webpack-2bcg
                compress: {
                  unused: true,
                  dead_code: true,
                },
            },
            extractComments: false,
        }),
        new CssMinimizerPlugin({
          minimizerOptions: {
            preset: [
              'default',
              {
                discardComments: { removeAll: true },
              },
            ],
          },
        }),
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].min.css',
      }),
      new RemoveEmptyScriptsPlugin(),
      /* new CopyWebpackPlugin({
        patterns: [
          { from: 'node_modules/swiper/swiper-bundle.min.js', to: 'swiper-bundle.min.js' },
          // Add other files or directories here
          // { from: 'src/js/highlighted_products.js', to: 'highlighted_products.js' }
        ],
      }), */
    ],
  };
};
