//手写插件
// Compiler 和 Compilation，前者是代表了完整的 webpack 环境配置，后者代表了一次资源版本构建，当运行 webpack 开发环境中间件时，每当检测到一个文件变化，就会创建一个新的 compilation，从而生成一组新的编译资源
class firstPlugin{
    constructor(options){
      this.options = options
    }
    apply(compiler){
        compiler.hooks.emit.tap('FileListPlugin',(compilation)=>{   //webpack4不推荐使用compiler.plugin来注册插件，webpack5将不支持
        let str = ''
        for (let filename in compilation.assets){
          str += `文件:${filename}  大小${compilation.assets[filename]['size']()}\n`
        }
        // 通过compilation.assets可以获取打包后静态资源信息，同样也可以写入资源
        compilation.assets['fileSize.md'] = {
          source:function(){
            return str
          },
          size:function(){
            return str.length
          }
        }
        // callback()
      })
    }
  }
  module.exports = firstPlugin