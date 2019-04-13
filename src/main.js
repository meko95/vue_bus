// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// Main引入的插件能否都放到index.js中去呢？
// 弹性窗口样式最后应用
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'jquery'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

import {getRequest} from "@/utils/api"
import {postRequest} from "@/utils/api"
import {deleteRequest} from "@/utils/api"
import {putRequest} from "@/utils/api"
import '@/utils/filter_utils'
import '@/utils/mock' // !important
Vue.prototype.getRequest = getRequest
Vue.prototype.postRequest = postRequest
Vue.prototype.deleteRequest = deleteRequest
Vue.prototype.putRequest = putRequest

import axios from 'axios'

Vue.prototype.axios = axios // 把axios加到 Vue原型中 其他组件中this.axios调用
// axios.defaults.withCredentials = true
import {VueCookies} from 'vue-cookies'
// Vue.use(VueCookies)
Vue.prototype.VueCookies = VueCookies

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
/* 全局前置路由 */
router.beforeEach((to, from, next) => {
  // 暂时省略一些用户访问需验证登录的路径
  if (to.path === '/bus/contract') {
    const url = 'http://kathryn.cn:8080/bus/isLogin'
    // 使用this.$http.get 报错this.$http未定义vue-resource可能没有axios好用
    axios.post(url).then(res => {
      //先去Login.vue打印80再回到main.js打印56,因为Login第91行代码=>this.$router.push('/bus/contract/getContract')
      console.log('main.js 52')
      console.log(res)
      // 假设不管code如何都通过isLogin
      res.data.code === 0
      if (true) {
        next()
      } else if (res.data.code === 2006) {
        // do nothing
        // 仍停留在登录页面
      }
    }, err => {
      console.log(err)
    })
  } else {
    next()
  }
})
// 全局函数 获取设备Selection归属信息
Vue.prototype.getGsInfo = function (data, options, jtdm, jtmc, gsdm, gsmc, cddm, cdmc, xldm, xlmc) {
  console.log('归属Selection Change 参数选择信息')
  // 设置代码=>dm
  jtdm = data[0]
  gsdm = data[1]
  cddm = data[2]
  xldm = data[3]
  // 设置名称=>mc
  var jt = parseInt(data[0])
  var gs = parseInt(data[1])
  var cd = parseInt(data[2])
  var xl = parseInt(data[3])
  if (jt && gs) {
    // console.log('集团', jt)
    gs = parseInt((data[1]).substring(2, 4))
    // console.log('公司', gs)
    if (cd) {
      cd = parseInt((data[2]).substring(4, 6))
      // console.log('车队', cd)
      if (xl) {
        xl = parseInt((data[3]).substring(6, 8))
        // console.log('线路', xl)
        jtmc = options[jt - 1].label
        gsmc = options[jt - 1].children[gs - 1].label
        cdmc = options[jt - 1].children[gs - 1].children[cd - 1].label
        xlmc = options[jt - 1].children[gs - 1].children[cd - 1].children[xl - 1].label
      }
    }
  }
  return [jtdm, jtmc, gsdm, gsmc, cddm, cdmc, xldm, xlmc]
}
// 全局函数 获取设备TREE归属信息
Vue.prototype.getGsTreeInfo = function (data, jtdm, gsdm, cddm, xldm) {
  console.log('归属Tree Change 参数选择信息')
  const sbGs = data.value
  jtdm = sbGs.substr(0, 2)
  if (sbGs[2]) {
    gsdm = sbGs.substr(0, 4)
    if (sbGs[4]) {
      cddm = sbGs.substr(0, 6)
      if (sbGs[6]) {
        xldm = sbGs.substr(0, 8)
      } else {
        xldm = ''
      }
    } else {
      cddm = ''
    }
  } else {
    gsdm = ''
  }
  return [jtdm, gsdm, cddm, xldm]
}
// 全局函数 获取设备品牌型号信息
Vue.prototype.getPpxhInfo = function (data, sbppdm, sbxhdm, sbpp, sbxh, sbppxh) {
  console.log('品牌型号 参数选择信息')
  // 设置代码=>dm
  sbppdm = data[0]
  sbxhdm = data[1]
  // 设置名称=>mc
  var pp = parseInt(data[0])
  var xh = parseInt(data[1])
  if (pp && xh) {
    xh = parseInt((data[1]).substring(2, 4))
    sbpp = sbppxh[pp - 1].label
    sbxh = sbppxh[pp - 1].children[xh - 1].label
  }
  return [sbppdm, sbpp, sbxhdm, sbxh]
}
