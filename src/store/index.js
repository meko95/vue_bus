import Vue from 'vue'
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'

Vue.use(Vuex, VueCookies)
const state = {
  date : new Date(),
  subsidiary: [
    {
      id: 1,
      label: '上海久事一集团',
      children: [
        {
          label: '巴士一公司',
          children: [
            {
              label: '一车队',
              children: [
                {label: '55'},
                {label: '61'},
                {label: '99'},
                {label: '307'},
                {label: '325'},
                {label: '538'},
                {label: '1201'},
                {label: '1218'},
                {label: '1226'},
                {label: '1228'},
                {label: '1255'},
                {label: '1256'}
              ]
            },
            {
              label: '二车队',
              children: [
                {label: '47'},
                {label: '66'},
                {label: '66区间'},
                {label: '97'},
                {label: '140'},
                {label: '179'},
                {label: '306'},
                {label: '597'}
              ]
            },
            {
              label: '三车队',
              children: [
                {label: '70'},
                {label: '79'},
                {label: '80'},
                {label: '137'},
                {label: '222'},
                {label: '310'},
                {label: '559'},
                {label: '758'},
                {label: '875'},
                {label: '960'}
              ]
            },
            {
              label: '四车队',
              children: [
                {label: '60'},
                {label: '103'},
                {label: '142'},
                {label: '195'},
                {label: '220'},
                {label: '308'},
                {label: '329'},
                {label: '557'},
                {label: '723'},
                {label: '842'},
                {label: '874'}
              ]
            },
            {
              label: '五车队',
              children: [
                {label: '100'},
                {label: '115'},
                {label: '123'},
                {label: '819'},
                {label: '854'},
                {label: '942'},
                {label: '1258'}
              ]
            }
          ]
        },
        {
          label: '巴士二公司',
          children: [{
            label: '一车队',
            children: [
              {label: '55'},
              {label: '61'},
              {label: '99'},
              {label: '307'},
              {label: '325'},
              {label: '538'},
              {label: '1201'},
              {label: '1218'},
              {label: '1226'},
              {label: '1228'},
              {label: '1255'},
              {label: '1256'}
            ]
          },
            {
              label: '二车队',
              children: [
                {label: '47'},
                {label: '66'},
                {label: '66区间'},
                {label: '97'},
                {label: '140'},
                {label: '179'},
                {label: '306'},
                {label: '597'}
              ]
            },
            {
              label: '三车队',
              children: [
                {label: '70'},
                {label: '79'},
                {label: '80'},
                {label: '137'},
                {label: '222'},
                {label: '310'},
                {label: '559'},
                {label: '758'},
                {label: '875'},
                {label: '960'}
              ]
            },
            {
              label: '四车队',
              children: [
                {label: '60'},
                {label: '103'},
                {label: '142'},
                {label: '195'},
                {label: '220'},
                {label: '308'},
                {label: '329'},
                {label: '557'},
                {label: '723'},
                {label: '842'},
                {label: '874'}
              ]
            },
            {
              label: '五车队',
              children: [
                {label: '100'},
                {label: '115'},
                {label: '123'},
                {label: '819'},
                {label: '854'},
                {label: '942'},
                {label: '1258'}
              ]
            }]
        },
        {
          label: '巴士三公司',
          children: [{
            label: '一车队',
            children: [
              {label: '55'},
              {label: '61'},
              {label: '99'},
              {label: '307'},
              {label: '325'},
              {label: '538'},
              {label: '1201'},
              {label: '1218'},
              {label: '1226'},
              {label: '1228'},
              {label: '1255'},
              {label: '1256'}
            ]
          },
            {
              label: '二车队',
              children: [
                {label: '47'},
                {label: '66'},
                {label: '66区间'},
                {label: '97'},
                {label: '140'},
                {label: '179'},
                {label: '306'},
                {label: '597'}
              ]
            },
            {
              label: '三车队',
              children: [
                {label: '70'},
                {label: '79'},
                {label: '80'},
                {label: '137'},
                {label: '222'},
                {label: '310'},
                {label: '559'},
                {label: '758'},
                {label: '875'},
                {label: '960'}
              ]
            },
            {
              label: '四车队',
              children: [
                {label: '60'},
                {label: '103'},
                {label: '142'},
                {label: '195'},
                {label: '220'},
                {label: '308'},
                {label: '329'},
                {label: '557'},
                {label: '723'},
                {label: '842'},
                {label: '874'}
              ]
            },
            {
              label: '五车队',
              children: [
                {label: '100'},
                {label: '115'},
                {label: '123'},
                {label: '819'},
                {label: '854'},
                {label: '942'},
                {label: '1258'}
              ]
            }]
        }
      ]
    }
  ],
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
  getAllSubsidiary(){
    return state.subsidiary
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
