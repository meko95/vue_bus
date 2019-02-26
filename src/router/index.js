import Vue from 'vue'
import Router from 'vue-router'
import ContractList from '@/components/ContractList'
import Login from '@/components/Login'
import DeviceType from '@/components/DeviceType'
import DeviceBasicInfo from '@/components/DeviceBasicInfo'
import DeviceInstallInfo from '@/components/DeviceInstallInfo'
import DeviceCollectData from '@/components/DeviceCollectData'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/bus/login'
    },
    {
      path: '/bus/contract',
      redirect: '/bus/contract/getContract'
    },
    {
      path:'/bus/basicdata/getDeviceType',
      name:'DeviceType',
      component:DeviceType
    },
    {
      path:'/bus/basicdata/getDeviceBasicInfo',
      name:'DeviceBasicInfo',
      component:DeviceBasicInfo
    },
    {
      path:'/bus/basicdata/getDeviceInstallInfo',
      name:'DeviceInstallInfo',
      component:DeviceInstallInfo
    },
    {
      path:'/bus/basicdata/getDeviceCollectData',
      name:'DeviceCollectData',
      component:DeviceCollectData
    },
    {
      path: '/bus/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/bus/contract/getContract',
      name: 'ContractList',
      component: ContractList
    }
  ]
})

