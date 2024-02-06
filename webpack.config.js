const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env) => {
  // Determine if we're doing a production build or not
  const isProduction = env.production === true;

  return {
    // Adjust the mode based on the passed environment variable
    mode: isProduction ? 'production' : 'development',
    // Enable source maps conditionally
    devtool: isProduction ? false : 'cheap-module-source-map',
    entry: {
      swiperStyles: './src/scss/swiper.scss',
      // base: './assets/base.css',
      // app: './assets/app.css',
      // Add other entry points for JS or CSS here
      highlighted_products: './src/js/highlighted_products.js',
      hero_home_page_style: './src/scss/sections/hero_home_page.scss',
      hero_home_page: './src/js/hero_home_page.js',
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
        new CssMinimizerPlugin(),
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].min.css',
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: 'node_modules/swiper/swiper-bundle.min.js', to: 'swiper-bundle.min.js' },
          // Add other files or directories here
          // { from: 'src/js/highlighted_products.js', to: 'highlighted_products.js' }
        ],
      }),
    ],
  };
};
