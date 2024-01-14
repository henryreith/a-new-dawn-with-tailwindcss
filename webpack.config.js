const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { merge } = require('webpack-merge');
const glob = require('glob');

// Custom plugin to inline CSS into a Liquid file
class InlineCssToLiquidPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('InlineCssToLiquidPlugin', (compilation, callback) => {
      // Read the combined and minified CSS content
      const combinedCss = compilation.assets['combined.min.css'].source();

      // Create the critical-css.liquid content
      const liquidContent = `{% style %}\n${combinedCss}\n{% endstyle %}`;

      // Add critical-css.liquid to the compilation assets
      compilation.assets['./snippets/critical-css.liquid'] = {
        source: () => liquidContent,
        size: () => liquidContent.length,
      };

      callback();
    });
  }
}

// Get all JS files in the custom/js folder except for x.js files
const customJsFiles = glob.sync('./src/custom/js/*.js').reduce((entries, file) => {
  const fileName = path.basename(file, '.js');
  // Exclude files that are manually included in other bundles
  if (!['critical', 'secondary'].includes(fileName)) {
    entries[fileName] = file;
  }
  return entries;
}, {});

module.exports = {
    entry: {
      'critical': [
        './src/custom/js/critical.js', // Critical JS file
        // Add other JS files or node_modules imports for this bundle
      ],
      'secondary': './src/custom/js/secondary.js', // Secondary JS bundle
      'swiper': './node_modules/swiper/swiper-bundle.js', // Directly bundling Swiper from node_modules
      'custom': './src/custom/scss/custom.scss', // SCSS entry point
      ...customJsFiles,
    },
    output: {
      path: path.resolve(__dirname, 'assets'), // Output to assets folder
      filename: '[name].bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
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
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/[name].css',
      }),
      new InlineCssToLiquidPlugin(),
      new CopyPlugin({
        patterns: [
          // Copy other necessary files
        ],
      }),
    ],
    optimization: {
      minimizer: [
        new CssMinimizerPlugin(),
      ],
      // usedExports: true,
    },
    mode: 'development', // Change to 'production' when ready to deploy
  };
  
  const combineCssConfig = {
    entry: {
      'combined.min': [
        './assets/base.css',
        './assets/app.css',
        './assets/custom.css',
        // Add other CSS files to combine
      ],
    },
    output: {
      path: path.resolve(__dirname, 'assets'),
      filename: '[name].css',
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
    ],
    optimization: {
      minimizer: [
        new CssMinimizerPlugin(),
      ],
    },
    mode: 'production',
  };
  
  module.exports = merge(module.exports, combineCssConfig);