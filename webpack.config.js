const path = require('path');
const fs = require('fs');
const postcss = require('postcss');
const cssnano = require('cssnano');
const discardDuplicates = require('postcss-discard-duplicates');
const mergeRules = require('postcss-merge-rules');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

class InlineAndMinifyCriticalCssPlugin {
  constructor() {
    this.cssFiles = ['./assets/base.css', './assets/app.css'];
    this.outputFile = path.join(__dirname, 'assets', 'combine.css');
    this.liquidOutputPath = path.join(__dirname, 'snippets', 'critical-css.liquid');
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tapPromise('InlineAndMinifyCriticalCssPlugin', async (compilation, callback) => {
      return new Promise(async (resolve, reject) => {
      // Combine CSS content
      let combinedCss = this.cssFiles.map(file => {
        let filePath = path.join(__dirname, file);
        return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf-8') : '';
      }).join('\n');

      // Apply cssnano with additional plugins
      try {
        const result = await postcss([
          discardDuplicates(),
          mergeRules(),
          cssnano({preset: 'lite'})
        ]).process(combinedCss, { from: undefined });

        // Remove all line breaks
        const finalCss = result.css.replace(/[\r\n]+/gm, ' ');

        // Generate or update the critical-css.liquid file with the combined and minified CSS
        const liquidContent = `{% style %}\n${finalCss}\n{% endstyle %}`;
        fs.writeFileSync(this.liquidOutputPath, liquidContent, 'utf-8');
        console.log('CSS combined, minified, and inlined successfully.');
      } catch (error) {
        console.error('Error processing CSS:', error);
      }
      resolve(); // Resolve the promise when your plugin logic completes successfully
    });
    });
  }
}


module.exports = (env) => {
  // Determine if we're doing a production build or not
  const isProduction = env.production === true;

  return {
    // Adjust the mode based on the passed environment variable
    mode: isProduction ? 'production' : 'development',
    // Enable source maps conditionally
    devtool: isProduction ? false : 'cheap-module-source-map',
    entry: {
      // base: './assets/base.css',
      // app: './assets/app.css',
      // Add other entry points for JS or CSS here
      'combine': ['./assets/base.css', './assets/app.css'],
      
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
      new InlineAndMinifyCriticalCssPlugin(), // Add the custom plugin here
    ],
  };
};
