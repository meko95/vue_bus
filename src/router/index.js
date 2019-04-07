import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login'
import Contract from '../views/contract/Contract'

import DeviceCollectData from '@/components/DeviceCollectData'
import DeviceInstallInfo from '@/components/DeviceInstallInfo'
import DeviceType from '@/components/DeviceType'

// import EJDeviceMoveInfo from '@/components/EJDeviceMoveInfo'

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
import Rfid4gczMoveInfo from '../views/rfid4gcz/Rfid4gczMoveInfo'
import ClbqMoveInfo from '../views/clbq/ClbqMoveInfo'
import CzytjMoveInfo from '../views/czytj/CzytjMoveInfo'
import BdjMoveInfo from '../views/bdj/BdjMoveInfo'
import YcyjMoveInfo from '../views/ycyj/YcyjMoveInfo'
import ZdtMoveInfo from '../views/zdt/ZdtMoveInfo'
import ZgybpMoveInfo from '../views/zgybp/ZgybpMoveInfo'
import FfcpMoveInfo from '../views/ffcp/FfcpMoveInfo'
/* 设备修理情况 */
import Rfid4gFixInfo from '../views/rfid4g/Rfid4gFixInfo'
import Rfid4gczFixInfo from '../views/rfid4gcz/Rfid4gczFixInfo'
import ClbqFixInfo from '../views/clbq/ClbqFixInfo'
import CzytjFixInfo from '../views/czytj/CzytjFixInfo'
import BdjFixInfo from '../views/bdj/BdjFixInfo'
import YcyjFixInfo from '../views/ycyj/YcyjFixInfo'
import ZdtFixInfo from '../views/zdt/ZdtFixInfo'
import ZgybpFixInfo from '../views/zgybp/ZgybpFixInfo'
import FfcpFixInfo from '../views/ffcp/FfcpFixInfo'
/* 设备巡检情况 */
import Rfid4gCheckInfo from '../views/rfid4g/Rfid4gCheckInfo'
import Rfid4gczCheckInfo from '../views/rfid4gcz/Rfid4gczCheckInfo'
import ClbqCheckInfo from '../views/clbq/ClbqCheckInfo'
import CzytjCheckInfo from '../views/czytj/CzytjCheckInfo'
import BdjCheckInfo from '../views/bdj/BdjCheckInfo'
import YcyjCheckInfo from '../views/ycyj/YcyjCheckInfo'
import ZdtCheckInfo from '../views/zdt/ZdtCheckInfo'
import ZgybpCheckInfo from '../views/zgybp/ZgybpCheckInfo'
import FfcpCheckInfo from '../views/ffcp/FfcpCheckInfo'
/* 设备报修情况 */
import Rfid4gReportInfo from '../views/rfid4g/Rfid4gReportInfo'
import Rfid4gczReportInfo from '../views/rfid4gcz/Rfid4gczReportInfo'
import ClbqReportInfo from '../views/clbq/ClbqReportInfo'
import CzytjReportInfo from '../views/czytj/CzytjReportInfo'
import BdjReportInfo from '../views/bdj/BdjReportInfo'
import YcyjReportInfo from '../views/ycyj/YcyjReportInfo'
import ZdtReportInfo from '../views/zdt/ZdtReportInfo'
import ZgybpReportInfo from '../views/zgybp/ZgybpReportInfo'
import FfcpReportInfo from '../views/ffcp/FfcpReportInfo'
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
      path: '/rfid4g/move',
      name: 'Rfid4gMoveInfo',
      component: Rfid4gMoveInfo
    },
    {
      path: '/rfid4gcz/move',
      name: 'Rfid4gczMoveInfo',
      component: Rfid4gczMoveInfo
    },
    {
      path: '/clbq/move',
      name: 'ClbqMoveInfo',
      component: ClbqMoveInfo
    },
    {
      path: '/czytj/move',
      name: 'CzytjMoveInfo',
      component: CzytjMoveInfo
    },
    {
      path: '/bdj/move',
      name: 'BdjMoveInfo',
      component: BdjMoveInfo
    },
    {
      path: '/ycyj/move',
      name: 'YcyjMoveInfo',
      component: YcyjMoveInfo
    },
    {
      path: '/zdt/move',
      name: 'ZdtMoveInfo',
      component: ZdtMoveInfo
    },
    {
      path: '/ffcp/move',
      name: 'FfcpMoveInfo',
      component: FfcpMoveInfo
    },
    {
      path: '/zgybp/move',
      name: 'ZgybpMoveInfo',
      component: ZgybpMoveInfo
    },
    // {
    //   path: '/bus/changedata',
    //   redirect: '/bus/changedata/getDeviceMoveInfo'
    // },
    // {
    //   path: '/bus/changedata/getEJDeviceMoveInfo',
    //   name: 'EJDeviceMoveInfo',
    //   component: EJDeviceMoveInfo
    // },
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
      path: '/rfid4g/check',
      name: 'Rfid4gCheckInfo',
      component: Rfid4gCheckInfo
    },
    {
      path: '/rfid4gcz/check',
      name: 'Rfid4gczCheckInfo',
      component: Rfid4gczCheckInfo
    },
    {
      path: '/clbq/check',
      name: 'ClbqCheckInfo',
      component: ClbqCheckInfo
    },
    {
      path: '/czytj/check',
      name: 'CzytjCheckInfo',
      component: CzytjCheckInfo
    },
    {
      path: '/bdj/check',
      name: 'BdjCheckInfo',
      component: BdjCheckInfo
    },
    {
      path: '/ycyj/check',
      name: 'YcyjCheckInfo',
      component: YcyjCheckInfo
    },
    {
      path: '/zdt/check',
      name: 'ZdtCheckInfo',
      component: ZdtCheckInfo
    },
    {
      path: '/ffcp/check',
      name: 'FfcpCheckInfo',
      component: FfcpCheckInfo
    },
    {
      path: '/zgybp/check',
      name: 'ZgybpCheckInfo',
      component: ZgybpCheckInfo
    },
    // 设备报修情况
    {
      path: '/rfid4g/report',
      name: 'Rfid4gReportInfo',
      component: Rfid4gReportInfo
    },
    {
      path: '/rfid4gcz/report',
      name: 'Rfid4gczReportInfo',
      component: Rfid4gczReportInfo
    },
    {
      path: '/clbq/report',
      name: 'ClbqReportInfo',
      component: ClbqReportInfo
    },
    {
      path: '/czytj/report',
      name: 'CzytjReportInfo',
      component: CzytjReportInfo
    },
    {
      path: '/bdj/report',
      name: 'BdjReportInfo',
      component: BdjReportInfo
    },
    {
      path: '/ycyj/report',
      name: 'YcyjReportInfo',
      component: YcyjReportInfo
    },
    {
      path: '/zdt/report',
      name: 'ZdtReportInfo',
      component: ZdtReportInfo
    },
    {
      path: '/ffcp/report',
      name: 'FfcpReportInfo',
      component: FfcpReportInfo
    },
    {
      path: '/zgybp/report',
      name: 'ZgybpReportInfo',
      component: ZgybpReportInfo
    },
    {
      path: '/bus/report/getDeviceRepairStatistics',
      name: 'DeviceRepairStatistics',
      component: DeviceRepairStatistics
    },
    // 设备修理情况
    {
      path: '/rfid4g/fix',
      name: 'Rfid4gFixInfo',
      component: Rfid4gFixInfo
    },
    {
      path: '/rfid4gcz/fix',
      name: 'Rfid4gczFixInfo',
      component: Rfid4gczFixInfo
    },
    {
      path: '/clbq/fix',
      name: 'ClbqFixInfo',
      component: ClbqFixInfo
    },
    {
      path: '/czytj/fix',
      name: 'CzytjFixInfo',
      component: CzytjFixInfo
    },
    {
      path: '/bdj/fix',
      name: 'BdjFixInfo',
      component: BdjFixInfo
    },
    {
      path: '/ycyj/fix',
      name: 'YcyjFixInfo',
      component: YcyjFixInfo
    },
    {
      path: '/zdt/fix',
      name: 'ZdtFixInfo',
      component: ZdtFixInfo
    },
    {
      path: '/ffcp/fix',
      name: 'FfcpFixInfo',
      component: FfcpFixInfo
    },
    {
      path: '/zgybp/fix',
      name: 'ZgybpFixInfo',
      component: ZgybpFixInfo
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

