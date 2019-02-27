<template>
  <header role="banner">
    <div class="container">
      <router-link to="/bus/contract" class="banner-brand visible-md visible-lg">
        <img id="top_img" src="../../static/image/aoma.png" width="125">
      </router-link>
      <div class="utility_nav">
        <ul>
          <li id="logout">
            <a href="#" @click.prevent="logout" class="btn btn-primary">
              <i class="icon fa fa-sign-out">
                <span>&nbsp;退&nbsp;出&nbsp;账&nbsp;户&nbsp;&nbsp;</span>
              </i>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <!--class="navbar navbar-default"-->
    <nav>
      <div class="container">
        <div class="navbar-header">
          <button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <router-link to="/bus/contract" class="navbar-brand visible-sm visible-xs">
            <img src="../../static/image/aoma.png" alt="澳马运维公司" width="100">
          </router-link>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav nav-tabs">
            <li class="active">
              <router-link to="/bus/contract/getContract">
                合同管理
              </router-link>
            </li>
            <li role="presentation" class="dropdown">
              <!--<router-link to="/bus/basicdata" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"-->
              <!--aria-expanded="false">-->
              <!--基础数据管理<span class="caret"></span>-->
              <!--</router-link>-->
              <a class="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true"
                 aria-expanded="false">
                设备基础数据管理&nbsp;&nbsp;<span class="caret"></span>
              </a>
              <ul class="dropdown-menu">
                <li>
                  <router-link to="/bus/basicdata/getDeviceCollectData">查看采集数据</router-link>
                </li>
                <li>
                  <router-link to="/bus/basicdata/getDeviceBasicInfo">查看基础信息</router-link>
                </li>
                <li>
                  <router-link to="/bus/basicdata/getDeviceInstallInfo">查看安装信息</router-link>
                </li>
                <li>
                  <router-link to="/bus/basicdata/getDeviceType">管理设备类型</router-link>
                </li>
              </ul>
            </li>
            <li>
              <router-link to="/bus/changedata">
                设备迁移情况
              </router-link>
            </li>
            <li>
              <router-link to="/bus/status">
                设备工作情况
              </router-link>
            </li>
            <li>
              <router-link to="/bus/check">
                设备巡检报修
              </router-link>
            </li>
            <li>
              <router-link to="/bus/fix">
                设备修理情况
              </router-link>
            </li>
            <li>
              <router-link to="/bus/quality">
                质量分析
              </router-link>
            </li>
            <li>
              <router-link to="/bus/report">
                月度评估分析报告
              </router-link>
            </li>
            <li>
              <router-link to="/bus/sys">
                &nbsp;系统管理&nbsp;
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </header>
</template>

<script>
  export default {
    name: 'Header',
    methods: {
      logout: function () {
        this.$router.push('/bus/login')
      }
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  #navbar {
    margin-top: 10px;
    margin-bottom: 1px;
  }

  #top_img {
    width: 125px;
    float: left;
  }

  #logout {
    font-size: 20px;
    height: 33px;
    line-height: 33px;
    float: right;
    list-style: none;
  }
</style>
