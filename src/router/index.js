import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login'

import DeviceCollectData from '@/components/DeviceCollectData'
import DeviceInstallInfo from '@/components/DeviceInstallInfo'
import DeviceType from '@/components/DeviceType'

// import EJDeviceMoveInfo from '@/components/EJDeviceMoveInfo'

import YTJFaultReason from '@/components/YTJFaultReason'
import DeviceFixStatistics from '@/components/DeviceFixStatistics'
import DeviceDStatistics from '@/components/DeviceDStatistics'
import DeviceMStatistics from '@/components/DeviceMStatistics'

import System from '@/components/System'
// 合同信息
import Contract from '../views/contract/Contract'
/* 各类设备归属统计信息 */
import AllSbStatistics from '../views/statistics/AllSbStatistics'
/* 设备基本信息 */
import Rfid4gBasic from '../views/rfid4g/Rfid4gBasic'
import ClbqBasic from '../views/clbq/ClbqBasic'
import Rfid4gczBasic from '../views/rfid4gcz/Rfid4gczBasic'
import CzytjBasic from '../views/czytj/CzytjBasic'
import BdjBasic from '../views/bdj/BdjBasic'
import YcyjBasic from '../views/ycyj/YcyjBasic'
import ZdtBasic from '../views/zdt/ZdtBasic'
import FfcpBasic from '../views/ffcp/FfcpBasic'
import ZgybpBasic from '../views/zgybp/ZgybpBasic'
/* 设备工作状态 */
import Rfid4gStatus from '../views/rfid4g/Rfid4gStatus'
import Rfid4gczStatus from '../views/rfid4gcz/Rfid4gczStatus'
import ClbqStatus from '../views/clbq/ClbqStatus'
import CzytjStatus from '../views/czytj/CzytjStatus'
import BdjStatus from '../views/bdj/BdjStatus'
import YcyjStatus from '../views/ycyj/YcyjStatus'
import ZdtStatus from '../views/zdt/ZdtStatus'
import ZgybpStatus from '../views/zgybp/ZgybpStatus'
import FfcpStatus from '../views/ffcp/FfcpStatus'
/* 设备故障情况统计 */
import Rfid4gBreakInfo from '../views/rfid4g/Rfid4gBreakInfo'
import Rfid4gczBreakInfo from '../views/rfid4gcz/Rfid4gczBreakInfo'
import ClbqBreakInfo from '../views/clbq/ClbqBreakInfo'
import CzytjBreakInfo from '../views/czytj/CzytjBreakInfo'
import BdjBreakInfo from '../views/bdj/BdjBreakInfo'
import YcyjBreakInfo from '../views/ycyj/YcyjBreakInfo'
import ZdtBreakInfo from '../views/zdt/ZdtBreakInfo'
import ZgybpBreakInfo from '../views/zgybp/ZgybpBreakInfo'
import FfcpBreakInfo from '../views/ffcp/FfcpBreakInfo'
/* 设备报修情况统计 */
import Rfid4gReportInfo from '../views/rfid4g/Rfid4gReportInfo'
import Rfid4gczReportInfo from '../views/rfid4gcz/Rfid4gczReportInfo'
import ClbqReportInfo from '../views/clbq/ClbqReportInfo'
import CzytjReportInfo from '../views/czytj/CzytjReportInfo'
import BdjReportInfo from '../views/bdj/BdjReportInfo'
import YcyjReportInfo from '../views/ycyj/YcyjReportInfo'
import ZdtReportInfo from '../views/zdt/ZdtReportInfo'
import ZgybpReportInfo from '../views/zgybp/ZgybpReportInfo'
import FfcpReportInfo from '../views/ffcp/FfcpReportInfo'
/* 设备变动情况 */
import Rfid4gMove from '../views/rfid4g/Rfid4gMove'
import Rfid4gczMove from '../views/rfid4gcz/Rfid4gczMove'
import ClbqMove from '../views/clbq/ClbqMove'
import CzytjMove from '../views/czytj/CzytjMove'
import BdjMove from '../views/bdj/BdjMove'
import YcyjMove from '../views/ycyj/YcyjMove'
import ZdtMove from '../views/zdt/ZdtMove'
import ZgybpMove from '../views/zgybp/ZgybpMove'
import FfcpMove from '../views/ffcp/FfcpMove'
/* 设备修理情况 */
import Rfid4gFix from '../views/rfid4g/Rfid4gFix'
import Rfid4gczFix from '../views/rfid4gcz/Rfid4gczFix'
import ClbqFix from '../views/clbq/ClbqFix'
import CzytjFix from '../views/czytj/CzytjFix'
import BdjFix from '../views/bdj/BdjFix'
import YcyjFix from '../views/ycyj/YcyjFix'
import ZdtFix from '../views/zdt/ZdtFix'
import ZgybpFix from '../views/zgybp/ZgybpFix'
import FfcpFix from '../views/ffcp/FfcpFix'
/* 设备巡检情况 */
import Rfid4gCheck from '../views/rfid4g/Rfid4gCheck'
import Rfid4gczCheck from '../views/rfid4gcz/Rfid4gczCheck'
import ClbqCheck from '../views/clbq/ClbqCheck'
import CzytjCheck from '../views/czytj/CzytjCheck'
import BdjCheck from '../views/bdj/BdjCheck'
import YcyjCheck from '../views/ycyj/YcyjCheck'
import ZdtCheck from '../views/zdt/ZdtCheck'
import ZgybpCheck from '../views/zgybp/ZgybpCheck'
import FfcpCheck from '../views/ffcp/FfcpCheck'
/* 设备报修情况 */
import Rfid4gReport from '../views/rfid4g/Rfid4gReport'
import Rfid4gczReport from '../views/rfid4gcz/Rfid4gczReport'
import ClbqReport from '../views/clbq/ClbqReport'
import CzytjReport from '../views/czytj/CzytjReport'
import BdjReport from '../views/bdj/BdjReport'
import YcyjReport from '../views/ycyj/YcyjReport'
import ZdtReport from '../views/zdt/ZdtReport'
import ZgybpReport from '../views/zgybp/ZgybpReport'
import FfcpReport from '../views/ffcp/FfcpReport'
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
      name: 'Contract',
      component: Contract
    },
    // 设备统计信息
    {
      path: '/sbs/statistic',
      name: 'AllSbStatistics',
      component: AllSbStatistics
    },
    // 设备基本信息
    {
      path: '/rfid4g/basic',
      name: 'Rfid4gBasic',
      component: Rfid4gBasic
    },
    {
      path: '/rfid4gcz/basic',
      name: 'Rfid4gczBasic',
      component: Rfid4gczBasic
    },
    {
      path: '/clbq/basic',
      name: 'ClbqBasic',
      component: ClbqBasic
    },
    {
      path: '/czytj/basic',
      name: 'CzytjBasic',
      component: CzytjBasic
    },
    {
      path: '/bdj/basic',
      name: 'BdjBasic',
      component: BdjBasic
    },
    {
      path: '/ycyj/basic',
      name: 'YcyjBasic',
      component: YcyjBasic
    },
    {
      path: '/zdt/basic',
      name: 'ZdtBasic',
      component: ZdtBasic
    },
    {
      path: '/ffcp/basic',
      name: 'FfcpBasic',
      component: FfcpBasic
    },
    {
      path: '/zgybp/basic',
      name: 'ZgybpBasic',
      component: ZgybpBasic
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
      name: 'Rfid4gMove',
      component: Rfid4gMove
    },
    {
      path: '/rfid4gcz/move',
      name: 'Rfid4gczMove',
      component: Rfid4gczMove
    },
    {
      path: '/clbq/move',
      name: 'ClbqMove',
      component: ClbqMove
    },
    {
      path: '/czytj/move',
      name: 'CzytjMove',
      component: CzytjMove
    },
    {
      path: '/bdj/move',
      name: 'BdjMove',
      component: BdjMove
    },
    {
      path: '/ycyj/move',
      name: 'YcyjMove',
      component: YcyjMove
    },
    {
      path: '/zdt/move',
      name: 'ZdtMove',
      component: ZdtMove
    },
    {
      path: '/ffcp/move',
      name: 'FfcpMove',
      component: FfcpMove
    },
    {
      path: '/zgybp/move',
      name: 'ZgybpMove',
      component: ZgybpMove
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
      path: '/rfid4g/status',
      name: 'Rfid4gStatus',
      component: Rfid4gStatus
    },
    {
      path: '/rfid4gcz/status',
      name: 'Rfid4gczStatus',
      component: Rfid4gczStatus
    },
    {
      path: '/clbq/status',
      name: 'ClbqStatus',
      component: ClbqStatus
    },
    {
      path: '/czytj/status',
      name: 'CzytjStatus',
      component: CzytjStatus
    },
    {
      path: '/bdj/status',
      name: 'BdjStatus',
      component: BdjStatus
    },
    {
      path: '/ycyj/status',
      name: 'YcyjStatus',
      component: YcyjStatus
    },
    {
      path: '/zdt/status',
      name: 'ZdtStatus',
      component: ZdtStatus
    },
    {
      path: '/ffcp/status',
      name: 'FfcpStatus',
      component: FfcpStatus
    },
    {
      path: '/zgybp/status',
      name: 'ZgybpStatus',
      component: ZgybpStatus
    },
    {
      path: '/bus/status/getYTJFaultReason',
      name: 'YTJFaultReason',
      component: YTJFaultReason
    },
    // 设备故障情况统计
    {
      path: '/rfid4g/breakinfo',
      name: 'Rfid4gBreakInfo',
      component: Rfid4gBreakInfo
    },
    {
      path: '/rfid4gcz/breakinfo',
      name: 'Rfid4gczBreakInfo',
      component: Rfid4gczBreakInfo
    },
    {
      path: '/clbq/breakinfo',
      name: 'ClbqBreakInfo',
      component: ClbqBreakInfo
    },
    {
      path: '/czytj/breakinfo',
      name: 'CzytjBreakInfo',
      component: CzytjBreakInfo
    },
    {
      path: '/bdj/breakinfo',
      name: 'BdjBreakInfo',
      component: BdjBreakInfo
    },
    {
      path: '/ycyj/breakinfo',
      name: 'YcyjBreakInfo',
      component: YcyjBreakInfo
    },
    {
      path: '/zdt/breakinfo',
      name: 'ZdtBreakInfo',
      component: ZdtBreakInfo
    },
    {
      path: '/ffcp/breakinfo',
      name: 'FfcpBreakInfo',
      component: FfcpBreakInfo
    },
    {
      path: '/zgybp/breakinfo',
      name: 'ZgybpBreakInfo',
      component: ZgybpBreakInfo
    },
    // 设备报修情况统计
    {
      path: '/rfid4g/reportinfo',
      name: 'Rfid4gReportInfo',
      component: Rfid4gReportInfo
    },
    {
      path: '/rfid4gcz/reportinfo',
      name: 'Rfid4gczReportInfo',
      component: Rfid4gczReportInfo
    },
    {
      path: '/clbq/reportinfo',
      name: 'ClbqReportInfo',
      component: ClbqReportInfo
    },
    {
      path: '/czytj/reportinfo',
      name: 'CzytjReportInfo',
      component: CzytjReportInfo
    },
    {
      path: '/bdj/reportinfo',
      name: 'BdjReportInfo',
      component: BdjReportInfo
    },
    {
      path: '/ycyj/reportinfo',
      name: 'YcyjReportInfo',
      component: YcyjReportInfo
    },
    {
      path: '/zdt/reportinfo',
      name: 'ZdtReportInfo',
      component: ZdtReportInfo
    },
    {
      path: '/ffcp/reportinfo',
      name: 'FfcpReportInfo',
      component: FfcpReportInfo
    },
    {
      path: '/zgybp/reportinfo',
      name: 'ZgybpReportInfo',
      component: ZgybpReportInfo
    },
    // 设备巡检情况
    {
      path: '/rfid4g/check',
      name: 'Rfid4gCheck',
      component: Rfid4gCheck
    },
    {
      path: '/rfid4gcz/check',
      name: 'Rfid4gczCheck',
      component: Rfid4gczCheck
    },
    {
      path: '/clbq/check',
      name: 'ClbqCheck',
      component: ClbqCheck
    },
    {
      path: '/czytj/check',
      name: 'CzytjCheck',
      component: CzytjCheck
    },
    {
      path: '/bdj/check',
      name: 'BdjCheck',
      component: BdjCheck
    },
    {
      path: '/ycyj/check',
      name: 'YcyjCheck',
      component: YcyjCheck
    },
    {
      path: '/zdt/check',
      name: 'ZdtCheck',
      component: ZdtCheck
    },
    {
      path: '/ffcp/check',
      name: 'FfcpCheck',
      component: FfcpCheck
    },
    {
      path: '/zgybp/check',
      name: 'ZgybpCheck',
      component: ZgybpCheck
    },
    // 设备报修情况
    {
      path: '/rfid4g/report',
      name: 'Rfid4gReport',
      component: Rfid4gReport
    },
    {
      path: '/rfid4gcz/report',
      name: 'Rfid4gczReport',
      component: Rfid4gczReport
    },
    {
      path: '/clbq/report',
      name: 'ClbqReport',
      component: ClbqReport
    },
    {
      path: '/czytj/report',
      name: 'CzytjReport',
      component: CzytjReport
    },
    {
      path: '/bdj/report',
      name: 'BdjReport',
      component: BdjReport
    },
    {
      path: '/ycyj/report',
      name: 'YcyjReport',
      component: YcyjReport
    },
    {
      path: '/zdt/report',
      name: 'ZdtReport',
      component: ZdtReport
    },
    {
      path: '/ffcp/report',
      name: 'FfcpReport',
      component: FfcpReport
    },
    {
      path: '/zgybp/report',
      name: 'ZgybpReport',
      component: ZgybpReport
    },
    // 设备修理情况
    {
      path: '/rfid4g/fix',
      name: 'Rfid4gFix',
      component: Rfid4gFix
    },
    {
      path: '/rfid4gcz/fix',
      name: 'Rfid4gczFix',
      component: Rfid4gczFix
    },
    {
      path: '/clbq/fix',
      name: 'ClbqFix',
      component: ClbqFix
    },
    {
      path: '/czytj/fix',
      name: 'CzytjFix',
      component: CzytjFix
    },
    {
      path: '/bdj/fix',
      name: 'BdjFix',
      component: BdjFix
    },
    {
      path: '/ycyj/fix',
      name: 'YcyjFix',
      component: YcyjFix
    },
    {
      path: '/zdt/fix',
      name: 'ZdtFix',
      component: ZdtFix
    },
    {
      path: '/ffcp/fix',
      name: 'FfcpFix',
      component: FfcpFix
    },
    {
      path: '/zgybp/fix',
      name: 'ZgybpFix',
      component: ZgybpFix
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

