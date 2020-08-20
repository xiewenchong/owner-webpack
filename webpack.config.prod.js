// 生产环境主要实现的是压缩代码、提取css文件、合理的sourceMap、分割代码
// 此时需要package.json 中dev指令添加--config=webpack.config.dev.js  表示指定哪个配置文件
const webpack = require('webpack');
const {merge} = require('webpack-merge');  //webpack提供的用来合并数组，对象等的一个插件
const baseWebpackConfig = require('./webpack.config.base');

const firstPlugin = require('./webpack-firstPlugin.js')  //自定义插件

const proConfig = merge(baseWebpackConfig, {
    mode: 'production',
    devtool: 'source-map',
    //...其它的一些配置
    plugins: [
        new webpack.DefinePlugin({//定义环境变量。  使得开发中普通js里面也能用变量来判断是测试还是预发布还是线上
            DEV: JSON.stringify('dev'), //字符串   //然后在index.js中就可以   if(DEV === 'dev') {//开发环境}else {//生产环境}
            FLAG: 'true' //FLAG 是个布尔类型
        }),
        new firstPlugin()
    ]
});
module.exports = proConfig;
