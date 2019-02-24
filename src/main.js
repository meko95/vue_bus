// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// Main引入的插件能否都放到index.js中去呢？
// 弹性窗口样式最后应用
import Vue from 'vue'
import App from './App'
import router from './router'
import 'jquery'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrapvalidator'
import '../static/css/bootstrapValidator.min.css'
// import VueResource from 'vue-resource'
import axios from 'axios'
// Vue.use(VueResource)
// Vue.use(axios)
Vue.prototype.axios = axios
import GridManager from './components/GridManager'

// Vue install, Vue.use 会调用该方法
// GridManagerVue.install = (Vue, opts = {}) => {
//   Vue.prototype.$gridManager = window.GridManager;
//   Vue.component('grid-manager', GridManagerVue);
// }
// 通过script标签引入Vue的环境
if (typeof window !== 'undefined' && window.Vue) {
    GridManager.install(window.Vue)
}
// GridManager 的版本号。 需要注意的是: 这仅仅是vue环境的壳, 验证功能需要查看GridManager的版本号
GridManager.version = process.env.VERSION
// 将构造函数挂载至Vue原型上，这样在Vue环境下可直接用 this.$gridManager调用
// export default GridManager

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {
        App
    },
    template: '<App/>'
})

/* 全局前置路由 */

router.beforeEach((to, from, next) => {
    // 暂时省略一些用户访问需验证登录的路径
    if (to.path == '/bus/contract/getContract') {
        const url = 'http://kathryn.cn:8080/bus/isLogin'
        // 使用this.$http.get 报错this.$http未定义vue-resource可能没有axios好用
        axios.post(url).then(res => {
            //先去Login.vue打印80再回到main.js打印56,因为Login第91行代码=>this.$router.push('/bus/contract/getContract')
            console.log('main.js 52')
            console.log(res)
            // 假设不管code如何都通过isLogin
            res.data.code == 0
            if (true) {
                next()
            } else if (res.data.code == 2006){
                // do nothing
            }
        }, err => {
            console.log(err)
        })
    } else {
        next()
    }
})
