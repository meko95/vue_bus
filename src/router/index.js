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

import DeviceInspect from '@/components/DeviceInspect'
import DeviceRepair from '@/components/DeviceRepair'
import DeviceRepairStatistics from '@/components/DeviceRepairStatistics'

import DeviceFixInfo from '@/components/DeviceFixInfo'

import DeviceFixStatistics from '@/components/DeviceFixStatistics'
import DeviceDStatistics from '@/components/DeviceDStatistics'
import DeviceMStatistics from '@/components/DeviceMStatistics'

import System from '@/components/System'

/* 设备基本信息 */
import Rfid4gBasicInfo from '../components/rfid4g/Rfid4gBasicInfo'
import ClbqBasicInfo from '../components/clbq/ClbqBasicInfo'
import Rfid4gczBasicInfo from '../components/rfid4gcz/Rfid4gczBasicInfo'
import CzytjBasicInfo from '../components/czytj/CzytjBasicInfo'
import BdjBasicInfo from '../components/bdj/BdjBasicInfo'
import YcyjBasicInfo from '../components/ycyj/YcyjBasicInfo'
import ZdtBasicInfo from '../components/zdt/ZdtBasicInfo'
import FfcpBasicInfo from '../components/ffcp/FfcpBasicInfo'
import ZgybpBasicInfo from '../components/zgybp/ZgybpBasicInfo'
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
    // 设备基本信息组件
    {
      path:'/bus/basicdata/getRfid4gBasicInfo',
      name:'Rfid4gBasicInfo',
      component:Rfid4gBasicInfo
    },
    {
      path:'/bus/basicdata/getClbqBasicInfo',
      name:'ClbqBasicInfo',
      component:ClbqBasicInfo
    },
    {
      path:'/bus/basicdata/getRfid4gczBasicInfo',
      name:'Rfid4gczBasicInfo',
      component:Rfid4gczBasicInfo
    },
    {
      path:'/bus/basicdata/getCzytjBasicInfo',
      name:'CzytjBasicInfo',
      component:CzytjBasicInfo
    },
    {
      path:'/bus/basicdata/getBdjBasicInfo',
      name:'BdjBasicInfo',
      component:BdjBasicInfo
    },
    {
      path:'/bus/basicdata/getYcyjBasicInfo',
      name:'YcyjBasicInfo',
      component:YcyjBasicInfo
    },
    {
      path:'/bus/basicdata/getZdtBasicInfo',
      name:'ZdtBasicInfo',
      component:ZdtBasicInfo
    },
    {
      path:'/bus/basicdata/getFfcpBasicInfo',
      name:'FfcpBasicInfo',
      component:FfcpBasicInfo
    },
    {
      path:'/bus/basicdata/getZgybpBasicInfo',
      name:'ZgybpBasicInfo',
      component:ZgybpBasicInfo
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
    },
    {
      path:'/bus/check',
      redirect:'/bus/check/getDeviceInspect'
    },
    {
      path:'/bus/check/getDeviceInspect',
      name:'DeviceInspect',
      component:DeviceInspect
    },
    {
      path:'/bus/check/getDeviceRepair',
      name:'DeviceRepair',
      component:DeviceRepair
    },
    {
      path:'/bus/check/getDeviceRepairStatistics',
      name:'DeviceRepairStatistics',
      component:DeviceRepairStatistics
    },
    {
      path:'/bus/fix',
      redirect:'/bus/fix/getDeviceFixInfo'
    },
    {
      path:'/bus/fix/getDeviceFixInfo',
      name:'DeviceFixInfo',
      component:DeviceFixInfo
    },
    {
      path:'/bus/quality',
      redirect:'/bus/fix/getDeviceFixStatistics'
    },
    {
      path:'/bus/quality/getDeviceFixStatistics',
      name:'DeviceFixStatistics',
      component:DeviceFixStatistics
    },
    {
      path:'/bus/quality/getDeviceDStatistics',
      name:'DeviceDStatistics',
      component:DeviceDStatistics
    },
    {
      path:'/bus/quality/getDeviceMStatistics',
      name:'DeviceMStatistics',
      component:DeviceMStatistics
    },
    {
      path:'/bus/sys',
      redirect:'/bus/sys/getSystemInfo'
    },
    {
      path:'/bus/sys/getSystemInfo',
      name:'System',
      component:System
    }
  ]
})

