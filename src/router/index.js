import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
import Contract from '../components/contract/Contract'

import DeviceCollectData from '@/components/DeviceCollectData'
import DeviceInstallInfo from '@/components/DeviceInstallInfo'
import DeviceType from '@/components/DeviceType'

import EJDeviceMoveInfo from '@/components/EJDeviceMoveInfo'

import YTJFaultReason from '@/components/YTJFaultReason'
import DeviceFaultStatistics from '@/components/DeviceFaultStatistics'
import DeviceRepairStatistics from '@/components/DeviceRepairStatistics'
import DeviceFixStatistics from '@/components/DeviceFixStatistics'
import DeviceDStatistics from '@/components/DeviceDStatistics'
import DeviceMStatistics from '@/components/DeviceMStatistics'

import System from '@/components/System'

/* 设备基本信息 */
import Rfid4gBasicInfo from '../components/rfid4g/Rfid4gBasicInfo'
// import Rfid4gBasicInfov_3_14 from '../components/rfid4g/Rfid4gBasicInfov_3_14.vue'
import ClbqBasicInfo from '../components/clbq/ClbqBasicInfo'
import Rfid4gczBasicInfo from '../components/rfid4gcz/Rfid4gczBasicInfo'
import CzytjBasicInfo from '../components/czytj/CzytjBasicInfo'
import BdjBasicInfo from '../components/bdj/BdjBasicInfo'
import YcyjBasicInfo from '../components/ycyj/YcyjBasicInfo'
import ZdtBasicInfo from '../components/zdt/ZdtBasicInfo'
import FfcpBasicInfo from '../components/ffcp/FfcpBasicInfo'
import ZgybpBasicInfo from '../components/zgybp/ZgybpBasicInfo'
/* 设备工作状态 */
import Rfid4gStatus from '../components/rfid4g/Rfid4gStatus'
/* 设备变动情况 */
import Rfid4gChangeInfo from '../components/rfid4g/Rfid4gChangeInfo'
/* 设备修理情况 */
import Rfid4gFixInfo from '../components/rfid4g/Rfid4gFixInfo'
/* 设备巡检情况 */
import Rfid4gCheckInfo from '../components/rfid4g/Rfid4gCheckInfo'
/* 设备报修情况 */
import Rfid4gReportInfo from '../components/rfid4g/Rfid4gReportInfo'
/* 测试组件 */
import Test from '../components/test/Test'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/bus/login'
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    // 测试路由End
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
      name: 'Contract',
      component: Contract
    },
    // 设备基本信息组件
    {
      path: '/rfid4g/basic/jt1',
      name: 'Rfid4gBasicInfo',
      component: Rfid4gBasicInfo
    },
    // {
    //   path: '/rfid4g/basic/jt2',
    //   name: 'Rfid4gBasicInfov_3_14',
    //   component: Rfid4gBasicInfov_3_14
    // },
    {
      path: '/bus/basicdata/getClbqBasicInfo',
      name: 'ClbqBasicInfo',
      component: ClbqBasicInfo
    },
    {
      path: '/bus/basicdata/getRfid4gczBasicInfo',
      name: 'Rfid4gczBasicInfo',
      component: Rfid4gczBasicInfo
    },
    {
      path: '/bus/basicdata/getCzytjBasicInfo',
      name: 'CzytjBasicInfo',
      component: CzytjBasicInfo
    },
    {
      path: '/bus/basicdata/getBdjBasicInfo',
      name: 'BdjBasicInfo',
      component: BdjBasicInfo
    },
    {
      path: '/bus/basicdata/getYcyjBasicInfo',
      name: 'YcyjBasicInfo',
      component: YcyjBasicInfo
    },
    {
      path: '/bus/basicdata/getZdtBasicInfo',
      name: 'ZdtBasicInfo',
      component: ZdtBasicInfo
    },
    {
      path: '/bus/basicdata/getFfcpBasicInfo',
      name: 'FfcpBasicInfo',
      component: FfcpBasicInfo
    },
    {
      path: '/bus/basicdata/getZgybpBasicInfo',
      name: 'ZgybpBasicInfo',
      component: ZgybpBasicInfo
    },
    {
      path: '/bus/basicdata/getDeviceType',
      name: 'DeviceType',
      component: DeviceType
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
    // 设备变动情况
    {
      path: '/rfid4g/change/jt1',
      name: 'Rfid4gChangeInfo',
      component: Rfid4gChangeInfo
    },
    {
      path: '/rfid4g/change/jt2',
      name: 'Rfid4gChangeInfo',
      component: Rfid4gChangeInfo
    },
    {
      path: '/bus/changedata',
      redirect: '/bus/changedata/getDeviceMoveInfo'
    },
    {
      path: '/bus/changedata/getEJDeviceMoveInfo',
      name: 'EJDeviceMoveInfo',
      component: EJDeviceMoveInfo
    },
    // 设备工作状况
    {
      path: '/rfid4g/status/jt1',
      name: 'Rfid4gStatus',
      component: Rfid4gStatus
    },
    {
      path: '/rfid4g/status/jt2',
      name: 'Rfid4gStatus',
      component: Rfid4gStatus
    },
    {
      path: '/bus/status/getYTJFaultReason',
      name: 'YTJFaultReason',
      component: YTJFaultReason
    },
    {
      path: '/bus/status/getDeviceFaultStatistics',
      name: 'DeviceFaultStatistics',
      component: DeviceFaultStatistics
    },
    // 设备巡检情况
    {
      path: '/rfid4g/check/jt1',
      name: 'Rfid4gCheckInfo',
      component: Rfid4gCheckInfo
    },
    {
      path: '/rfid4g/check/jt2',
      name: 'Rfid4gCheckInfo',
      component: Rfid4gCheckInfo
    },
    // 设备报修情况
    {
      path:'/rfid4g/report/jt1',
      name:'Rfid4gReportInfo',
      component:Rfid4gReportInfo
    },
    {
      path:'/rfid4g/report/jt2',
      name:'Rfid4gReportInfo',
      component:Rfid4gReportInfo
    },
    {
      path: '/bus/check/getDeviceRepairStatistics',
      name: 'DeviceRepairStatistics',
      component: DeviceRepairStatistics
    },
    // 设备修理情况
    {
      path: '/rfid4g/fixInfo/jt1',
      name: 'Rfid4gFixInfo',
      component: Rfid4gFixInfo
    },
    {
      path: '/rfid4g/fixInfo/jt2',
      name: 'Rfid4gFixInfo',
      component: Rfid4gFixInfo
    },
    {
      path: '/bus/quality',
      redirect: '/bus/fix/getDeviceFixStatistics'
    },
    {
      path: '/bus/quality/getDeviceFixStatistics',
      name: 'DeviceFixStatistics',
      component: DeviceFixStatistics
    },
    {
      path: '/bus/quality/getDeviceDStatistics',
      name: 'DeviceDStatistics',
      component: DeviceDStatistics
    },
    {
      path: '/bus/quality/getDeviceMStatistics',
      name: 'DeviceMStatistics',
      component: DeviceMStatistics
    },
    {
      path: '/bus/sys',
      redirect: '/bus/sys/getSystemInfo'
    },
    {
      path: '/bus/sys/getSystemInfo',
      name: 'System',
      component: System
    }
  ]
})

