var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), 
{ // WebpackDevServer本身的配置
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true, 
    quiet: false, // false在控制台显示错误，true为静默不显示
    noInfo: false, // 只显示错误
    stats: {
        assets: false, // 配置最少展示信息
        colors: true,
        version: false,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false,
    }
}).listen(3000, 'localhost', function (err) {
    if(err){
        console.log(err);
    }

    console.log('Listening at localhost:3000');
});