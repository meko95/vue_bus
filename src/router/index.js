import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login'
import Contract from '../views/contract/Contract'

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
/* 各类设备归属统计信息 */
import AllSbStatistics from '../views/statistics/AllSbStatistics'
/* 设备基本信息 */
import Rfid4gBasicInfo from '../views/rfid4g/Rfid4gBasicInfo'
import ClbqBasicInfo from '../views/clbq/ClbqBasicInfo'
import Rfid4gczBasicInfo from '../views/rfid4gcz/Rfid4gczBasicInfo'
import CzytjBasicInfo from '../views/czytj/CzytjBasicInfo'
import BdjBasicInfo from '../views/bdj/BdjBasicInfo'
import YcyjBasicInfo from '../views/ycyj/YcyjBasicInfo'
import ZdtBasicInfo from '../views/zdt/ZdtBasicInfo'
import FfcpBasicInfo from '../views/ffcp/FfcpBasicInfo'
import ZgybpBasicInfo from '../views/zgybp/ZgybpBasicInfo'
/* 设备工作状态 */
import Rfid4gStatus from '../views/rfid4g/Rfid4gStatus'
/* 设备变动情况 */
import Rfid4gMoveInfo from '../views/rfid4g/Rfid4gMoveInfo'
/* 设备修理情况 */
import Rfid4gFixInfo from '../views/rfid4g/Rfid4gFixInfo'
/* 设备巡检情况 */
import Rfid4gCheckInfo from '../views/rfid4g/Rfid4gCheckInfo'
/* 设备报修情况 */
import Rfid4gReportInfo from '../views/rfid4g/Rfid4gReportInfo'
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
    // 设备统计信息
    {
      path: '/Sbs/jt1',
      name: 'AllSbStatistics',
      component: AllSbStatistics
    },
    // 设备基本信息
    {
      path: '/rfid4g/basic/jt1',
      name: 'Rfid4gBasicInfo',
      component: Rfid4gBasicInfo
    },
    {
      path: '/rfid4gcz/basic/jt1',
      name: 'Rfid4gczBasicInfo',
      component: Rfid4gczBasicInfo
    },
    {
      path: '/clbq/basic/jt1',
      name: 'ClbqBasicInfo',
      component: ClbqBasicInfo
    },
    {
      path: '/czytj/basic/jt1',
      name: 'CzytjBasicInfo',
      component: CzytjBasicInfo
    },
    {
      path: '/bgj/basic/jt1',
      name: 'BdjBasicInfo',
      component: BdjBasicInfo
    },
    {
      path: '/ycyj/basic/jt1',
      name: 'YcyjBasicInfo',
      component: YcyjBasicInfo
    },
    {
      path: '/zdt/basic/jt1',
      name: 'ZdtBasicInfo',
      component: ZdtBasicInfo
    },
    {
      path: '/ffcp/basic/jt1',
      name: 'FfcpBasicInfo',
      component: FfcpBasicInfo
    },
    {
      path: '/zgybp/basic/jt1',
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
    // 设备迁移情况
    {
      path: '/rfid4g/move/jt1',
      name: 'Rfid4gMoveInfo',
      component: Rfid4gMoveInfo
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
    // 设备报修情况
    {
      path: '/rfid4g/report/jt1',
      name: 'Rfid4gReportInfo',
      component: Rfid4gReportInfo
    },
    {
      path: '/bus/check/getDeviceRepairStatistics',
      name: 'DeviceRepairStatistics',
      component: DeviceRepairStatistics
    },
    // 设备修理情况
    {
      path: '/rfid4g/fix/jt1',
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

