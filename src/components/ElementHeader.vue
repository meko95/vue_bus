<template>
  <div id="header">
    <div id="com">
      上海澳马设备运维管理系统
      <el-button type="text" @click="sign_out">退出</el-button>
    </div>
    <el-menu :default-active="$route.path" router class="el-menu" mode="horizontal"
             @select="handleSelect">
      <el-menu-item index="/bus/contract/getContract">合同管理</el-menu-item>
      <el-submenu index="2">
        <template slot="title">设备基础数据管理</template>
        <el-menu-item index="/bus/basicdata/getDeviceCollectData">查看采集数据</el-menu-item>
        <el-menu-item index="/rfid4g/basic/jt1">查看基础信息</el-menu-item>
        <el-badge value="10">
          <el-menu-item index="/bus/basicdata/getDeviceInstallInfo">查看安装信息</el-menu-item>
        </el-badge>
        <el-menu-item index="/bus/basicdata/getDeviceType">管理设备类型</el-menu-item>
      </el-submenu>

      <el-menu-item index="/rfid4g/change/jt1">
        设备迁移情况
        <el-badge :value="2" style="margin-left: 4px"></el-badge>
      </el-menu-item>

      <el-submenu index="4">
        <template slot="title">设备工作情况</template>
        <el-menu-item index="/rfid4g/status/jt1">查看设备工作情况</el-menu-item>
        <el-badge value="5">
          <el-menu-item index="/bus/status/getDeviceFaultStatistics">设备故障情况统计</el-menu-item>
        </el-badge>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">设备巡检报修</template>
        <el-badge :value="2">
          <el-menu-item index="/rfid4g/check/jt1">查看巡检设备</el-menu-item>
        </el-badge>
        <div></div>
        <el-badge :value="2">
          <el-menu-item index="/rfid4g/report/jt1">查看报修设备</el-menu-item>
        </el-badge>
        <div></div>
        <el-badge :value="2">
          <el-menu-item index="/bus/check/getDeviceRepairStatistics">查看报修次数统计</el-menu-item>
        </el-badge>
      </el-submenu>
      <el-menu-item index="/rfid4g/fixInfo/jt1">
        设备修理情况
        <el-badge :value="2" style="margin-left: 4px"></el-badge>
      </el-menu-item>
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
      return {

      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath)
      },
      sign_out(){
        this.$router.push('/bus/login')
      }
    }
  }
</script>

<style lang="less" scoped>
  #com{
    font-size: 25px;
    line-height: 25px;
    padding:10px 20px;
    background-color: #324157;
    color: white;
  }
  #com .el-button{
    margin-left: 1000px;
  }
  .el-menu{
    padding-left: 120px;
    background-color: white;
    color: #6c737b;
  }
  .el-menu-item:hover{
    color: #409EFF !important;
  }
</style>
