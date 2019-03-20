import Vue from 'vue'
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'

Vue.use(Vuex, VueCookies)
const state = {
  date : new Date(),
  DEVICE_LIST: [
    {
    text: 'RFID4G',
    value: '1'
  }, {
    text: 'RFID4G(场站)',
    value: '2'
  }, {
    text: '车辆标签',
    value: '3'
  }, {
    text: '车载一体机',
    value: '4'
  }, {
    text: '报到机',
    value: '5'
  }, {
    text: '一程一检',
    value: '6'
  }, {
    text: '站点通',
    value: '7'
  }, {
    text: '55寸屏',
    value: '8'
  }, {
    text: '站杆预报屏',
    value: '9'
  }],
  CONTRACT_TYPE: [
    {
    text: '主合同',
    value: '1'
  }, {
    text: '分包合同',
    value: '2'
  }],
  PAY_TYPE:[
    {
    text:'支付宝',
    value:'1'
  },{
    text:'微信',
    value:'2'
  },{
    text:'银行卡',
    value:'3'
  }]
}
const getters = {
  getSblb(state){
    return state.sblb
  },
  getAllDeviceTypes() {
    return state.DEVICE_LIST
  },
  getAllContractTypes(){
    return state.CONTRACT_TYPE
  },
  getAllPayTypes(){
    return state.PAY_TYPE
  }
}
// 同步方法
const mutations = {
  // this.$store.commit('方法名')
  setSblb(state, n) {
    state.sblb = n
  }
}
// 异步方法 与同步方法有什么区别?
const actions = {
  // this.$store.dispatch('方法名')
}
const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
export default store
