class Animal {
    constructor(name) {
        this.name = name
    }
    getName() {
        console.log(this.name);
        return this.name
    }
}
const dog = new Animal('dog')
console.log('aa111833331111118600068');
import './index.less';
import './assets/QQ截图20180927113147.jpg'
import Vue from 'vue'
import App from './assets/App.vue'
new Vue({
    render: h=> h(App)
}).$mount('#app')



document.getElementById('btn').onclick = function() {
    import('./assets/handle').then(fn => console.log('点击了'));  //webpack 的import() 语法提供按需加载，需要 @babel/plugin-syntax-dynamic-import 的插件支持，但是因为当前 @babel/preset-env 预设中已经包含了 @babel/plugin-syntax-dynamic-import，因此我们不需要再单独安装和配置。
}

// if(module && module.hot) {
//     module.hot.accept()
// }

fetch("/login/account", {
    method: "POST",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        username: "admin1",
        password: "88898333444"
    })
})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));