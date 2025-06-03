const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  
  return {
    entry: './chatbot-library.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? 'chatbot-library.min.js' : 'chatbot-library.js',
      library: 'ChatBot',
      libraryTarget: 'umd',
      globalObject: 'this',
      clean: true
    },
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: isProduction,
              drop_debugger: isProduction
            },
            mangle: {
              reserved: ['ChatBot'] // 라이브러리 이름은 유지
            },
            format: {
              comments: false
            }
          },
          extractComments: false
        })
      ]
    },
    plugins: [
      // 개발 모드에서 예시 HTML 생성
      ...(isProduction ? [] : [
        new HtmlWebpackPlugin({
          template: './example.html',
          filename: 'index.html',
          inject: false
        })
      ])
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, '.'),
      },
      compress: true,
      port: 8080,
      open: true,
      hot: true
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  targets: {
                    browsers: ['> 1%', 'last 2 versions', 'ie >= 11']
                  }
                }]
              ]
            }
          }
        }
      ]
    }
  };
}; 