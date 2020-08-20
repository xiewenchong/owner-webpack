// const path = require('path');
// const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');   //html模板
// const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //每次打包前清空dist
// const CopyWebpackPlugin = require('copy-webpack-plugin');  //构建的时候帮我们拷贝一些不想编译的文件到dist下，防止手动拷贝出错（如我们在 public/index.html 中引
//                                                            //入了 public 目录下的 js 或 css 文件。这个时候，如果直接打包，那么在构建出来之后，肯定是找不到对应的 js / css 了。）
// const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //抽离css 。 CSS 文件默认不会被压缩，如果想要压缩，需要配置 optimization
// const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin'); //压缩css文件
// const apiMocker = require('mocker-api'); //mock数据

// const isDev = process.env.NODE_ENV === 'development';
// const config = require('./public/config')[isDev ? 'dev' : 'build'];

// const Happypack = require('happypack'); //把任务分解给多个子进程去并发的执行，子进程处理完后再把结果发送给主进程  提升构建速度
//                                         //当你的项目不是很复杂时，不需要配置 happypack，因为进程的分配和管理也需要时间，并不能有效提升构建速度，甚至会变慢。
// var HardSourceWebpackPlugin = require('hard-source-webpack-plugin'); //为模块提供中间缓存,构建时间大约可以节约 80%

// const baseConfig = {
//     //...webpack配置
//     entry: './src/index.js', //webpack的默认配置是./src/index.js，entry 的值可以是一个字符串，一个数组或是一个对象。
//     // entry: {   //多入口配置
//     //     index: './src/index.js',
//     //     login: './src/login.js'
//     // },                        // 为数组时，表示有“多个主入口”，
//     output: {
//         path: path.resolve(__dirname, 'dist'), //必须是绝对路径
//         filename: 'bundle.[hash].js',  //考虑到缓存的问题，我们一般会给文件名加上 hash如：bundle.[hash:6].js
//         publicPath: '/' //通常是CDN地址（例如，你最终编译出来的代码部署在 CDN 上，资源的地址为: 'https://AAA/BBB/YourProject/XXX'，那么可以将生产的 publicPath 配置为: //AAA/BBB/。
//                                         //编译时，可以不配置，或者配置为 /。可以在我们之前提及的 config.js 中指定 publicPath（config.js 中区分了 dev 和 public）， 当然还可以区分不同的环境指定配置文件来设置，或者是根据 isDev 字段来设置。）
//     },
                        
//     //development：将 process.env.NODE_ENV 的值设置为 development，启用 NamedChunksPlugin 和 NamedModulesPlugin 
//     //production：将 process.env.NODE_ENV 的值设置为 production，启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin
//     mode: isDev ? 'development' : 'production',

//     externals: {//一些第三方资源放在cdn  此时就可以配置 externals不会对其进行打包，但是也可以通过 import 的方式去引用
//         //jquery通过script引入之后，全局中即有了 jQuery 变量
//         'jquery': 'jQuery'
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.jsx?$/,
//                 // use: [  //开启Happypack了后不需要在这配置
//                 //     'cache-loader',   //loader 都可以开启缓存   需要下载npm install cache-loader -D
//                 //     {
//                 //         loader: 'babel-loader',
//                 //         options: {
//                 //             presets: ['@babel/preset-env'],//主要作用是对我们所使用的并且目标浏览器中缺失的功能进行代码转换和加载 polyfill，在不进行任何配置的情况下，@babel/preset-env 所包含的插件将支持所有最新的JS特性(ES2015,ES2016等，不包含 stage 阶段)，将其转换成ES5代码
//                 //             plugins: [
//                 //                 [
//                 //                     "@babel/plugin-transform-runtime",//是一个可以重复使用 Babel 注入的帮助程序，以节省代码大小的插件。
//                 //                     {
//                 //                         "corejs": 3 //@babel/preset-env 提供了一个 useBuiltIns 参数，设置值为 usage 时，就只会包含代码需要的 polyfill,配置此参数的值为 usage ，必须要同时设置 corejs
//                 //                     }
//                 //                 ]
//                 //             ],
//                 //              cacheDirectory: true,  //除了加cache-loader，也可以设置这个参数开启缓存
//                 //         }
//                 //     }
//                 // ],
//                 use: 'Happypack/loader?id=js',  //开启happypack后在下面插件处配置相应loader了
//                 include: [path.resolve(__dirname, 'src')],  //表示src 目录下的文件才需要babel-loader处理
//                 exclude: /node_modules/ //排除 node_modules 目录 ,指定 include 或是 exclude，指定其中一个即可，node_modules目录通常不需要我们去编译，排除后，有效提升编译效率。
//             },{
//                 test: /\.(le|c)ss$/,
//                 // use: [
//                 //     {   //替换之前的 style-loader   ，这里就行压缩css
//                 //         loader: MiniCssExtractPlugin.loader, 
//                 //         options: {   //
//                 //             hmr: isDev,  //修改css热更新
//                 //             reloadAll: true,
//                 //             publicPath: '../'  //最好配置下，避免css中引入图片时路径出错
//                 //         }
//                 //     },
//                 //     // 'style-loader',  //默认不压缩
//                 //     'css-loader', 
//                 //     {  //style-loader 动态创建 style 标签，将 css 插入到 head 中.  css-loader 负责处理 @import 等语句。
//                 //         loader: 'postcss-loader', //postcss-loader 和 autoprefixer，自动生成浏览器兼容性前缀 
//                 //         options: {
//                 //             plugins: function () {
//                 //                 return [
//                 //                     require('autoprefixer')(
//                 //                         // {"overrideBrowserslist": [   //这里可配置  也可以单独抽离到根目录的.browserslistrc 文件下，这样可以多个 loader 共享配置
//                 //                         //     ">0.25%",
//                 //                         //     "not dead"
//                 //                         // ]}
//                 //                     )
//                 //                 ]
//                 //             }
//                 //         }
//                 //     }, 
//                 //     'less-loader' //less-loader 负责处理编译 .less 文件,将其转为 css
//                 // ],  
//                 use: 'Happypack/loader?id=css', //开启happypack后在下面插件处配置相应loader了
//                 exclude: /node_modules/   //排除node_modules目录
//             },{
//                 test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
//                 use: [
//                     {
//                         loader: 'url-loader',
//                         options: {
//                             limit: 10240, //10K  资源大小小于 10K 时，将资源转换为 base64，超过 10K，将图片拷贝到 dist 目录
//                                           //base64 可以减少网络请求次数，但是 base64 数据较大，如果太多的资源是 base64，会导致加载变慢，因此设置 limit 值时，需要二者兼顾。
//                             esModule: false,  //设置为 false，否则，<img src={require('XXX.jpg')} /> 会出现 <img src=[Module Object] />
//                             name: '[name]_[hash:6].[ext]',  //默认情况下，生成的文件的文件名就是文件内容的 MD5 哈希值并会保留所引用资源的原始扩展名,也可以通过 options 参数进行修改。
//                             outputPath: 'assets'
//                         }
//                     }
//                 ],
//                 exclude: /node_modules/
//             },
//         ]
//     },
//     plugins: [
//         //数组 放着所有的webpack插件
//         new HtmlWebpackPlugin({
//             template: './public/index.html',
//             filename: 'index.html', //打包后的文件名
//             minify: {
//                 removeAttributeQuotes: false, //是否删除属性的双引号
//                 collapseWhitespace: false, //是否折叠空白
//             },
//             config: config.template
//             // hash: true //是否加上hash，默认是 false
//         }),

//         //多入口配置，filename 字段不可缺省，，指定chunks，配置此参数仅会将数组中指定的js引入到html文件中而不是两个入口html都引入相同js
//         // new HtmlWebpackPlugin({
//         //     template: './public/index.html',
//         //     filename: 'index.html', //打包后的文件名
//         //     chunks: ['index']
//         // }),
//         // new HtmlWebpackPlugin({
//         //     template: './public/login.html',
//         //     filename: 'login.html', //打包后的文件名
//         //     chunks: ['login']
//         // }),
//         new webpack.DllReferencePlugin({
//             manifest: path.resolve(__dirname, 'dist', 'dll', 'manifest.json')
//         }),
//         new CleanWebpackPlugin({//可以不需要传参数喔，它可以找到 outputPath
//             cleanOnceBeforeBuildPatterns:['**/*', '!dll', '!dll/**'] //可配置参数，不希望整个 dist 目录都被清空，比如不删除dll目录下的文件
//         }),

//         new CopyWebpackPlugin({
//             patterns: [{
//                 from: 'public/js/*.js',
//                 to: path.resolve(__dirname, 'dist', 'js'),
//                 flatten: true, //设置为 true，那么它只会拷贝文件，而不会把文件夹路径都拷贝上
//                 // globOptions: {
//                 //     ignore: ['other.js']  //忽略的文件夹  改配置不生效 不知道为什么
//                 // }
//             }]
//         }),

//         new webpack.ProvidePlugin({  //ProvidePlugin 的作用就是不需要 import 或 require 就可以在项目中到处使用  相当于全局变量，如React项目每个文件中引入都要React
//                                     //这样相当于不用写important 随心所欲的使用 $、_map
//             React: 'react', //React 使用的是 module.exports 导出的，因此不要写 default。
//             Component: ['react', 'Component'],
//             Vue: ['vue/dist/vue.esm.js', 'default'], //vue.esm.js 中使用的是 export default 导出的，对于这种，必须要指定 defaul
//             $: 'jquery',
//             _map: ['lodash', 'map']
//         }),

//         new MiniCssExtractPlugin({
//             filename: 'css/[name].css'
//             //个人习惯将css文件放在单独目录下
//             //publicPath:'../'   //如果你的output的publicPath配置的是 './' 这种相对路径，那么如果将css文件放在单独目录下，记得在这里指定一下publicPath 
//         }),

//         new webpack.HotModuleReplacementPlugin(), //热更新插件

//         //Happypack发挥多核 CPU 电脑的威力，以提升构建速度
//         new Happypack({
//             id: 'js', //和rule中的id=js对应
//             use: ['cache-loader','babel-loader'] //必须是数组  //将之前 rule 中的 loader 在此配置
//         }),
//         new Happypack({
//             id: 'css',//和rule中的id=css对应
//             use: ['style-loader', 'css-loader','postcss-loader'],  //postcss-loader对应的一些配置参数就需要抽离出来放到根目录postcss.config.js中了
//         }),

//         new HardSourceWebpackPlugin()//为模块提供中间缓存
//     ],

//     //生产环境可以使用 none 或者是 source-map，使用 source-map 最终会单独打包出一个 .map 文件，我们可以根据报错信息和此 map 文件，进行错误解析，定位到源代码。
//     devtool: 'cheap-module-eval-source-map', //开发环境下使用

//     devServer: {
//         hot: true, //热跟新 搭配插件new webpack.HotModuleReplacementPlugin()  在入口中加多module.hot判断  //可以实现局部刷新而不是这个页面刷新 
//         port: '3000', //默认是8080
//         quiet: false, //默认不启用 除了初始启动信息之外的任何内容都不会被打印到控制台 肯定不开启呀
//         inline: true, //默认开启 inline 模式，如果设置为false,开启 iframe 模式
//         stats: "errors-only", //终端仅打印 error
//         overlay: false, //默认不启用 ，当编译出错时，会在浏览器窗口全屏输出错误，默认是关闭的。
//         clientLogLevel: "silent", //日志等级
//         compress: true, //是否启用 gzip 压缩
//         proxy: {   //通过代理可以解决跨域  我们前端是3000端口  接口在4000端口
//             '/api': {
//                 target: 'http://localhost:4000',
//                 pathRewrite: {
//                     '/api': ''   //忽略api前缀
//                 }
//             }
//         },
//         before(app){
//             apiMocker(app, path.resolve('./mock/mocker.js'))
//         },
//         contentBase: path.resolve(__dirname, 'dist')
//     },
//     resolve: {  //resolve配置项处理一些webpack的查找文件的路径
//         // modules:['./src/components','node_modules'],  //第三方模块默认在从左到右去找，默认只是在node_modules文件夹里面找
//         alias: {
//             'react-native': '@my/react-native-web' //设置别名
//         },
//         // extensions参数
//         // enforceExtension参数
//     },

//     //抽离公共代码(如果多个页面引入了一些公共模块，那么可以把这些公共的模块抽离出来，单独打包。公共代码只需要下载一次就缓存起来了，避免了重复下载)
//     optimization: {
//         splitChunks: {//分割代码块
//             cacheGroups: {
//                 vendor: {
//                     //第三方依赖
//                     priority: 1, //设置优先级，首先抽离第三方模块
//                     name: 'vendor',
//                     test: /node_modules/,
//                     chunks: 'initial',
//                     minSize: 0,
//                     minChunks: 1 //最少引入了1次
//                 },
//                 //缓存组
//                 common: {
//                     //公共模块
//                     chunks: 'initial',
//                     name: 'common',
//                     minSize: 100, //大小超过100个字节
//                     minChunks: 3 //最少引入了3次
//                 }
//             }
//         },
//         runtimeChunk: {  //runtimeChunk 的作用是将包含 chunk 映射关系的列表从 main.js 中抽离出来，在配置了 splitChunk 时，记得配置 runtimeChunk.
//             name: 'manifest'
//         }
//     }
// }
// module.exports = baseConfig;