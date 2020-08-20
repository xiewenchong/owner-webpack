// 开发环境主要实现的是热更新,不要压缩代码，完整的sourceMap
// 此时需要package.json 中dev指令添加--config=webpack.config.dev.js  表示指定哪个配置文件
const webpack = require('webpack');
const {merge} = require('webpack-merge');  //webpack提供的用来合并数组，对象等的一个插件
const baseWebpackConfig = require('./webpack.config.base');

const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");  //分析打包数据
const smp = new SpeedMeasurePlugin();

const devConfig = merge(baseWebpackConfig, {
    mode: 'development',
    // noParse: /jquery/, //webpack会去解析jq这个库是否有依赖其他的包。但是我们对类似jquery这类依赖库，一般会认为不会引用其他的包(特殊除外,自行判断)。增加noParse属性,告诉webpack不必解析，以此增加打包速度
    //...其它的一些配置
    plugins: [
        new webpack.DefinePlugin({//定义环境变量。  使得开发中普通js里面也能用变量来判断是测试还是预发布还是线上
            DEV: JSON.stringify('dev'), //字符串   //然后在index.js中就可以   if(DEV === 'dev') {//开发环境}else {//生产环境}
            FLAG: 'true' //FLAG 是个布尔类型
        })
    ]
});
module.exports = smp.wrap(devConfig);
