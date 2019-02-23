// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../static/css/bootstrap.min.css'

import VueResource from 'vue-resource'
Vue.use(VueResource)

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
