<template>
  <div id="header">
    <el-menu :default-active="$route.path" router class="el-menu" mode="horizontal"
             @select="handleSelect">
      <el-menu-item style="background-color: #324157;color: white;font-size: 16px">上海澳马设备运维管理系统</el-menu-item>
      <el-menu-item index="/bus/contract">合同管理</el-menu-item>
      <el-submenu index="2">
        <template slot="title">设备基础数据管理</template>
        <el-menu-item index="/sbs/statistic">查看设备归属统计</el-menu-item>
        <el-submenu index="2-2">
          <template slot="title">查看基础信息</template>
          <el-menu-item index="/rfid4g/basic">RFID4G</el-menu-item>
          <el-menu-item index="/rfid4gcz/basic">RFID4G(场站)</el-menu-item>
          <el-menu-item index="/clbq/basic">车辆标签</el-menu-item>
          <el-menu-item index="/czytj/basic">车载一体机</el-menu-item>
          <el-menu-item index="/bdj/basic">报到机</el-menu-item>
          <el-menu-item index="/ycyj/basic">一程一检</el-menu-item>
          <el-menu-item index="/zdt/basic">站点通</el-menu-item>
          <el-menu-item index="/ffcp/basic">55寸屏</el-menu-item>
          <el-menu-item index="/zgybp/basic">站杆预报屏</el-menu-item>
        </el-submenu>
        <!--<el-menu-item index="/bus/basicdata/getDeviceCollectData">查看采集数据</el-menu-item>-->
        <!--<el-menu-item index="/bus/basicdata/getDeviceInstallInfo">查看安装信息</el-menu-item>-->
        <el-menu-item index="/bus/basicdata/getDeviceType">管理设备类型</el-menu-item>
      </el-submenu>

      <el-submenu index="/rfid4g/change">
        <template slot="title">设备迁移情况</template>
        <el-menu-item index="/rfid4g/move">RFID4G</el-menu-item>
        <el-menu-item index="/rfid4gcz/move">RFID4G(场站)</el-menu-item>
        <el-menu-item index="/clbq/move">车辆标签</el-menu-item>
        <el-menu-item index="/czytj/move">车载一体机</el-menu-item>
        <el-menu-item index="/bdj/move">报到机</el-menu-item>
        <el-menu-item index="/ycyj/move">一程一检</el-menu-item>
        <el-menu-item index="/zdt/move">站点通</el-menu-item>
        <el-menu-item index="/ffcp/move">55寸屏</el-menu-item>
        <el-menu-item index="/zgybp/move">站杆预报屏</el-menu-item>
      </el-submenu>

      <el-submenu index="4">
        <template slot="title">设备工作情况</template>
        <el-submenu index="/rfid4g/status">
          <template slot="title">查看设备工作情况</template>
          <el-menu-item index="/rfid4g/status">RFID4G</el-menu-item>
          <el-menu-item index="/rfid4gcz/status">RFID4G(场站)</el-menu-item>
          <el-menu-item index="/clbq/status">车辆标签</el-menu-item>
          <el-menu-item index="/czytj/status">车载一体机</el-menu-item>
          <el-menu-item index="/bdj/status">报到机</el-menu-item>
          <el-menu-item index="/ycyj/status">一程一检</el-menu-item>
          <el-menu-item index="/zdt/status">站点通</el-menu-item>
          <el-menu-item index="/ffcp/status">55寸屏</el-menu-item>
          <el-menu-item index="/zgybp/status">站杆预报屏</el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">设备故障情况统计</template>
          <el-menu-item index="/rfid4g/breakinfo">RFID4G</el-menu-item>
          <el-menu-item index="/rfid4gcz/breakinfo">RFID4G(场站)</el-menu-item>
          <el-menu-item index="/clbq/breakinfo">车辆标签</el-menu-item>
          <el-menu-item index="/czytj/breakinfo">车载一体机</el-menu-item>
          <el-menu-item index="/bdj/breakinfo">报到机</el-menu-item>
          <el-menu-item index="/ycyj/breakinfo">一程一检</el-menu-item>
          <el-menu-item index="/zdt/breakinfo">站点通</el-menu-item>
          <el-menu-item index="/ffcp/breakinfo">55寸屏</el-menu-item>
          <el-menu-item index="/zgybp/breakinfo">站杆预报屏</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title">设备巡检报修</template>
        <el-submenu index="/rfid4g/check">
          <template slot="title">查看巡检设备</template>
          <el-menu-item index="/rfid4g/check">RFID4G</el-menu-item>
          <el-menu-item index="/rfid4gcz/check">RFID4G(场站)</el-menu-item>
          <el-menu-item index="/clbq/check">车辆标签</el-menu-item>
          <el-menu-item index="/czytj/check">车载一体机</el-menu-item>
          <el-menu-item index="/bdj/check">报到机</el-menu-item>
          <el-menu-item index="/ycyj/check">一程一检</el-menu-item>
          <el-menu-item index="/zdt/check">站点通</el-menu-item>
          <el-menu-item index="/ffcp/check">55寸屏</el-menu-item>
          <el-menu-item index="/zgybp/check">站杆预报屏</el-menu-item>
        </el-submenu>
        <div></div>
        <el-submenu index="/rfid4g/report">
          <template slot="title">查看报修设备</template>
          <el-menu-item index="/rfid4g/report">RFID4G</el-menu-item>
          <el-menu-item index="/rfid4gcz/report">RFID4G(场站)</el-menu-item>
          <el-menu-item index="/clbq/report">车辆标签</el-menu-item>
          <el-menu-item index="/czytj/report">车载一体机</el-menu-item>
          <el-menu-item index="/bdj/report">报到机</el-menu-item>
          <el-menu-item index="/ycyj/report">一程一检</el-menu-item>
          <el-menu-item index="/zdt/report">站点通</el-menu-item>
          <el-menu-item index="/ffcp/report">55寸屏</el-menu-item>
          <el-menu-item index="/zgybp/report">站杆预报屏</el-menu-item>
        </el-submenu>
        <el-submenu index="/bus/check/getDeviceRepairStatistics">
          <template slot="title">查看报修次数统计</template>
          <el-menu-item index="/rfid4g/reportinfo">RFID4G</el-menu-item>
          <el-menu-item index="/rfid4gcz/reportinfo">RFID4G(场站)</el-menu-item>
          <el-menu-item index="/clbq/reportinfo">车辆标签</el-menu-item>
          <el-menu-item index="/czytj/reportinfo">车载一体机</el-menu-item>
          <el-menu-item index="/bdj/reportinfo">报到机</el-menu-item>
          <el-menu-item index="/ycyj/reportinfo">一程一检</el-menu-item>
          <el-menu-item index="/zdt/reportinfo">站点通</el-menu-item>
          <el-menu-item index="/ffcp/reportinfo">55寸屏</el-menu-item>
          <el-menu-item index="/zgybp/reportinfo">站杆预报屏</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="/rfid4g/fix">
        <template slot="title">设备修理情况</template>
        <el-menu-item index="/rfid4g/fix">RFID4G</el-menu-item>
        <el-menu-item index="/rfid4gcz/fix">RFID4G(场站)</el-menu-item>
        <el-menu-item index="/clbq/fix">车辆标签</el-menu-item>
        <el-menu-item index="/czytj/fix">车载一体机</el-menu-item>
        <el-menu-item index="/bdj/fix">报到机</el-menu-item>
        <el-menu-item index="/ycyj/fix">一程一检</el-menu-item>
        <el-menu-item index="/zdt/fix">站点通</el-menu-item>
        <el-menu-item index="/ffcp/fix">55寸屏</el-menu-item>
        <el-menu-item index="/zgybp/fix">站杆预报屏</el-menu-item>
      </el-submenu>
      <el-submenu index="7">
        <template slot="title">质量分析</template>
        <el-menu-item index="/bus/quality/getDeviceFixStatistics">查看修复情况</el-menu-item>
        <el-menu-item index="/bus/quality/getDeviceDStatistics">查看当日统计</el-menu-item>
        <el-menu-item index="/bus/quality/getDeviceMStatistics">查看当月统计</el-menu-item>
      </el-submenu>
      <el-menu-item index="/bus/report">
        月度评估分析报告
      </el-menu-item>
      <el-menu-item index="/bus/sys/getSystemInfo">
        系统管理
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: "ElementHeader",
    data() {
      return {}
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath)
      },
      sign_out() {
        this.$router.push('/bus/login')
      }
    }
  }
</script>

<style lang="less" scoped>
  .el-menu {
    background-color: white;
    color: #6c737b;
  }

  .el-menu-item:hover {
    color: #409EFF !important;
  }
</style>
