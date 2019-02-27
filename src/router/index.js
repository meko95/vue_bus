import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
import ContractList from '@/components/ContractList'

import DeviceCollectData from '@/components/DeviceCollectData'
import DeviceBasicInfo from '@/components/DeviceBasicInfo'
import DeviceInstallInfo from '@/components/DeviceInstallInfo'
import DeviceType from '@/components/DeviceType'

import DeviceMoveInfo from '@/components/DeviceMoveInfo'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/bus/login'
    },
    {
      path: '/bus/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/bus/contract',
      redirect: '/bus/contract/getContract'
    },
    {
      path: '/bus/contract/getContract',
      name: 'ContractList',
      component: ContractList
    },
    {
      path: '/bus/basicdata/getDeviceType',
      name: 'DeviceType',
      component: DeviceType
    },
    {
      path: '/bus/basicdata/getDeviceBasicInfo',
      name: 'DeviceBasicInfo',
      component: DeviceBasicInfo
    },
    {
      path: '/bus/basicdata/getDeviceInstallInfo',
      name: 'DeviceInstallInfo',
      component: DeviceInstallInfo
    },
    {
      path: '/bus/basicdata/getDeviceCollectData',
      name: 'DeviceCollectData',
      component: DeviceCollectData
    },
    {
      path:'/bus/changedata',
      redirect:'/bus/changedata/getDeviceMoveInfo'
    },
    {
      path:'/bus/changedata/getDeviceMoveInfo',
      name:'DeviceMoveInfo',
      component:DeviceMoveInfo
    }
  ]
})

