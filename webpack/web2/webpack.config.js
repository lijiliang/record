const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {

  entry: './src/app.js',

  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'assets/js/app.js',
    publicPath: '/',  // 所有资源的基础路径，而且要以”/“结尾
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html'
    }),
    new CleanWebpackPlugin(['dist'])
  ],
  module: {
    rules: [{
      test: /\.js$/,
      use: [{
        loader: 'babel-loader',
        // options: {
        //   presets: ['react', 'env'],
        //   plugins: ['transform-object-rest-spread']
        // }
      }],
      exclude: [path.resolve(__dirname, 'node_modules')],  // 优化babel 排除
    }, 
    {
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            module: true,   //启用css模块化
            localIdentName: '[name]-[local]-[hash:base64:8]'  //[path][name]-[local]-[hash:base64:8]
          }
        }
      ],
      // 排除以下文件不用css模块化
      exclude: [
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, 'src/common/style/fonts.css')
      ]
    }, 
    // 因为上面已经排队了’node_modules‘，及’src/common/style/fonts.css‘的文件不启用css模块化，所以如果要加载里面的css,还需要单独另起一条规则去处理
    // sass及less的作法是一样的
    {
      test: /\.css$/,
      use: ['style-loader','css-loader'],
      include: [
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, 'src/common/style/fonts.css')
      ]
    }, 
    {
      test: /\.scss$/,
      use: ['style-loader',
      {
        loader: 'css-loader',
        options: {
          module: true,
          localIdentName: '[name]-[local]-[hash:base64:8]'
        }
      }, 'sass-loader']
    },
    {
      test: /\.less$/,
      use: ['style-loader',
      {
        loader: 'css-loader',
        options: {
          module: true,
          localIdentName: '[name]-[local]-[hash:base64:8]'
        }
      }, 'less-loader']
    },
    {
      test: /\.(jpg|png|jpep|gif)(\?.*)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 4096, // 4KB 以下使用 base64
          name: 'assets/img/[name]-[hash:8].[ext]'
        }
      }]
    },
    {
      test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 4096, // 4KB 以下使用 base64
          name: 'assets/fonts/[name]-[hash:8].[ext]'
        }
      }]
    }]
  },
  devServer: {
    open: true,
    port: 9989,
    contentBase: './src',
    // 服务器打包资源后的输出路径
    publicPath: '/'
  }
}