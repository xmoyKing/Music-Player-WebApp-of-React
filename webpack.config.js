var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:3000', // 加入依赖的webpack-dev-server的入口
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch', // 热更新工具
        path.join(__dirname, 'app/index.js'),
    ],
    output: {
        path: __dirname + '/dist', // 等同  path.join(__dirname, '/dist/'),
        filename: '[name].js',
        publicPath: '/'
    },
    plugins:[
        new HtmlWebpackPlugin({ // 根据模版自动生成html，自动链接打包、导入bundle
            template: './index.tpl.html',
            inject: 'body',
            filename: './index.html'
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],
    module:{
        loaders:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            }
        ]
    }
}