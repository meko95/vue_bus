import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
import ContractList from '@/components/ContractList'

import DeviceCollectData from '@/components/DeviceCollectData'
import DeviceBasicInfo from '@/components/DeviceBasicInfo'
import DeviceComInfo from '@/components/DeviceComInfo'
import DeviceLineInfo from '@/components/DeviceLineInfo'
import DeviceInstallInfo from '@/components/DeviceInstallInfo'
import DeviceType from '@/components/DeviceType'

import DeviceMoveInfo from '@/components/DeviceMoveInfo'
import EJDeviceMoveInfo from '@/components/EJDeviceMoveInfo'

import DeviceStatusInfo from '@/components/DeviceStatusInfo'
import YTJFaultReason from '@/components/YTJFaultReason'
import DeviceFaultStatistics from '@/components/DeviceFaultStatistics'

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
      path:'/bus/basicdata/getDeviceComInfo',
      name:'DeviceComInfo',
      component:DeviceComInfo
    },
    {
      path:'/bus/basicdata/getDeviceLineInfo',
      name:'DeviceLineInfo',
      component:DeviceLineInfo
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
    },
    {
      path:'/bus/changedata/getEJDeviceMoveInfo',
      name:'EJDeviceMoveInfo',
      component:EJDeviceMoveInfo
    },
    {
      path:'/bus/status',
      redirect:'/bus/status/getDeviceStatusInfo'
    },
    {
      path:'/bus/status/getDeviceStatusInfo',
      name:'DeviceStatusInfo',
      component:DeviceStatusInfo
    },
    {
      path:'/bus/status/getYTJFaultReason',
      name:'YTJFaultReason',
      component:YTJFaultReason
    },
    {
      path:'/bus/status/getDeviceFaultStatistics',
      name:'DeviceFaultStatistics',
      component:DeviceFaultStatistics
    }
  ]
})

