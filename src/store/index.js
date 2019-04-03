import Vue from 'vue'
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'

Vue.use(Vuex, VueCookies)
const state = {
  date: new Date(),
  subsidiary: [
    {
      value: '01',
      label: '上海久事一集团',
      children: [
        {
          value: '0101',
          label: '巴士一公司',
          children: [
            {
              value: '010101',
              label: '一车队',
              children: [
                {value: '01010101', label: '55'},
                {value: '01010102', label: '61'},
                {value: '01010103', label: '99'},
                {value: '01010104', label: '307'},
                {value: '01010105', label: '325'},
                {value: '01010106', label: '538'},
                {value: '01010107', label: '1201'},
                {value: '01010108', label: '1218'},
                {value: '01010109', label: '1226'},
                {value: '01010110', label: '1228'},
                {value: '01010111', label: '1255'},
                {value: '01010112', label: '1256'}
              ]
            },
            {
              value: '010102',
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
              value: '010103',
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
              value: '010104',
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
              value: '010105',
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
          value: '0102',
          label: '巴士二公司',
          children: [{
            value: '010201',
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
              value: '010202',
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
              value: '010203',
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
              value: '010204',
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
              value: '010205',
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
          value: '0103',
          label: '巴士三公司',
          children: [{
            value: '010301',
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
              value: '010302',
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
              value: '010303',
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
              value: '010304',
              label: '四车队',
              children: [
                {value: '01030401', label: '60'},
                {value: '01030402', label: '103'},
                {value: '01030403', label: '142'},
                {value: '01030404', label: '195'},
                {value: '01030405', label: '220'},
                {value: '01030406', label: '308'},
                {value: '01030407', label: '329'},
                {value: '01030408', label: '557'},
                {value: '01030409', label: '723'},
                {value: '01030410', label: '842'},
                {value: '01030411', label: '874'}
              ]
            },
            {
              value: '010305',
              label: '五车队',
              children: [
                {value: '01030501', label: '100'},
                {value: '01030502', label: '115'},
                {value: '01030503', label: '123'},
                {value: '01030504', label: '819'},
                {value: '01030505', label: '854'},
                {value: '01030506', label: '942'},
                {value: '01030507', label: '1258'}
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
  PAY_TYPE: [
    {
      text: '支付宝',
      value: '1'
    }, {
      text: '微信',
      value: '2'
    }, {
      text: '银行卡',
      value: '3'
    }]
}
const getters = {
  getSblb(state) {
    return state.sblb
  },
  getAllSubsidiary() {
    return state.subsidiary
  },
  getAllDeviceTypes() {
    return state.DEVICE_LIST
  },
  getAllContractTypes() {
    return state.CONTRACT_TYPE
  },
  getAllPayTypes() {
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
