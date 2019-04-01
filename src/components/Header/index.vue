<template>
  <div id="header">
    <el-menu :default-active="$route.path" router class="el-menu" mode="horizontal"
             @select="handleSelect">
      <el-menu-item style="background-color: #324157;color: white;font-size: 16px">上海澳马设备运维管理系统</el-menu-item>
      <el-menu-item index="/bus/contract/getContract">合同管理</el-menu-item>
      <el-submenu index="2">
        <template slot="title">设备基础数据管理</template>
        <el-menu-item index="/Sbs/jt1">查看设备归属统计</el-menu-item>
        <el-submenu index="2-2">
          <template slot="title">查看基础信息</template>
          <el-menu-item index="/rfid4g/basic/jt1">RFID4G</el-menu-item>
          <el-menu-item index="/rfid4gcz/basic/jt1">RFID4G场站</el-menu-item>
          <el-menu-item index="/clbq/basic/jt1">车辆标签</el-menu-item>
          <el-menu-item index="/czytj/basic/jt1">车载一体机</el-menu-item>
          <el-menu-item index="/bgj/basic/jt1">报到机</el-menu-item>
          <el-menu-item index="/ycyj/basic/jt1">一程一检</el-menu-item>
          <el-menu-item index="/zdt/basic/jt1">站点通</el-menu-item>
          <el-menu-item index="/ffcp/basic/jt1">55寸屏</el-menu-item>
          <el-menu-item index="/zgybp/basic/jt1">站杆预报屏</el-menu-item>
        </el-submenu>
        <el-menu-item index="/bus/basicdata/getDeviceCollectData">查看采集数据</el-menu-item>
        <el-menu-item index="/bus/basicdata/getDeviceInstallInfo">查看安装信息</el-menu-item>
        <el-menu-item index="/bus/basicdata/getDeviceType">管理设备类型</el-menu-item>
      </el-submenu>

      <el-submenu index="/rfid4g/change/jt1">
        <template slot="title">设备迁移情况</template>
        <el-menu-item index="/rfid4g/move/jt1">RFID4G</el-menu-item>
        <el-menu-item index="2-2">RFID4G（场站）</el-menu-item>
        <el-menu-item index="2-3">车辆标签</el-menu-item>
        <el-menu-item index="2-1">车载一体机</el-menu-item>
        <el-menu-item index="2-2">报到机</el-menu-item>
        <el-menu-item index="2-3">一程一检</el-menu-item>
        <el-menu-item index="2-1">站点通</el-menu-item>
        <el-menu-item index="2-2">55寸屏</el-menu-item>
        <el-menu-item index="2-3">站杆预报屏</el-menu-item>
      </el-submenu>

      <el-submenu index="4">
        <template slot="title">设备工作情况</template>
        <el-menu-item index="/rfid4g/status/jt1">查看设备工作情况</el-menu-item>
        <el-menu-item index="/bus/status/getDeviceFaultStatistics">设备故障情况统计</el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">设备巡检报修</template>
        <el-submenu index="/rfid4g/check/jt1">
          <template slot="title">查看巡检设备</template>
          <el-menu-item index="/rfid4g/check/jt1">RFID4G</el-menu-item>
          <el-menu-item index="2-2">RFID4G（场站）</el-menu-item>
          <el-menu-item index="2-3">车辆标签</el-menu-item>
          <el-menu-item index="2-1">车载一体机</el-menu-item>
          <el-menu-item index="2-2">报到机</el-menu-item>
          <el-menu-item index="2-3">一程一检</el-menu-item>
          <el-menu-item index="2-1">站点通</el-menu-item>
          <el-menu-item index="2-2">55寸屏</el-menu-item>
          <el-menu-item index="2-3">站杆预报屏</el-menu-item>
        </el-submenu>
        <div></div>
        <el-submenu index="/rfid4g/report/jt1">
          <template slot="title">查看报修设备</template>
          <el-menu-item index="/rfid4g/report/jt1">RFID4G</el-menu-item>
          <el-menu-item index="2-2">RFID4G（场站）</el-menu-item>
          <el-menu-item index="2-3">车辆标签</el-menu-item>
          <el-menu-item index="2-1">车载一体机</el-menu-item>
          <el-menu-item index="2-2">报到机</el-menu-item>
          <el-menu-item index="2-3">一程一检</el-menu-item>
          <el-menu-item index="2-1">站点通</el-menu-item>
          <el-menu-item index="2-2">55寸屏</el-menu-item>
          <el-menu-item index="2-3">站杆预报屏</el-menu-item>
        </el-submenu>
        <el-menu-item index="/bus/check/getDeviceRepairStatistics">查看报修次数统计</el-menu-item>

      </el-submenu>
      <el-submenu index="/rfid4g/fix/jt1">
        <template slot="title">设备修理情况</template>
        <el-menu-item index="/rfid4g/fix/jt1">RFID4G</el-menu-item>
        <el-menu-item index="2-2">RFID4G（场站）</el-menu-item>
        <el-menu-item index="2-3">车辆标签</el-menu-item>
        <el-menu-item index="2-1">车载一体机</el-menu-item>
        <el-menu-item index="2-2">报到机</el-menu-item>
        <el-menu-item index="2-3">一程一检</el-menu-item>
        <el-menu-item index="2-1">站点通</el-menu-item>
        <el-menu-item index="2-2">55寸屏</el-menu-item>
        <el-menu-item index="2-3">站杆预报屏</el-menu-item>
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
