<template>
  <div>
    <ElementHeader></ElementHeader>
    <el-container style="height: 701px; border: 1px solid #eee">
      <SideBar sb-type="设备归属" @listenToChildEvent="handleGsTreeSelect"></SideBar>
      <!-- Container Begin -->
      <el-container>
        <!-- Header Begin -->
        <el-header>
          <div id="title">
            <span>设备统计信息</span>
          </div>
        </el-header>
        <el-main>
          <!-- 设备统计信息Begin -->
          <el-table :data="statistics" v-loading="tableLoading" border tooltip-effect="dark" style="width: 100%;"
                    stripe size="small" highlight-current-row height="599">
            <el-table-column prop="sblx" label="设备类型" width="112" align="left" fixed></el-table-column>
            <el-table-column label="设备工作情况" align="center">
              <el-table-column prop="sb_sum" label="设备总数" width="70" align="center">
                <template slot-scope="scope">
                  <a @click="goSbBasic(scope)">{{scope.row.sb_sum}}</a>
                </template>
              </el-table-column>
              <el-table-column prop="sb_online" label="上线数" width="58" align="center"></el-table-column>
              <el-table-column prop="sb_offline" label="下线数" width="58" align="center"></el-table-column>
              <el-table-column prop="sb_sxl" label="上线率" width="65" align="center"></el-table-column>
            </el-table-column>
            <el-table-column prop="sb_update" label="更新设备数" width="82" align="center"></el-table-column>
            <el-table-column prop="sb_down" label="报废设备数" width="82" align="center"></el-table-column>
            <el-table-column prop="sb_change" label="迁移设备数" width="82" align="center">
              <template slot-scope="scope">
                <a @click="goSbMove(scope)">{{scope.row.sb_sum}}</a>
              </template>
            </el-table-column>
            <el-table-column prop="gz_sum" label="故障设备数" width="82" align="center"></el-table-column>
            <el-table-column label="设备质量统计" align="center">
              <el-table-column prop="sb_check" label="巡检设备数" width="82" align="center">
                <template slot-scope="scope">
                  <a @click="goSbCheck(scope)">{{scope.row.sb_check}}</a>
                </template>
              </el-table-column>
              <el-table-column prop="sb_report" label="报修设备数" width="82" align="center">
                <template slot-scope="scope">
                  <a @click="goSbReport(scope)">{{scope.row.sb_report}}</a>
                </template>
              </el-table-column>
              <el-table-column label="修理设备数" align="center">
                <el-table-column prop="fix_sum" label="修理总数" width="70" align="center">
                  <template slot-scope="scope">
                    <a @click="goSbFix(scope)">{{scope.row.fix_sum}}</a>
                  </template>
                </el-table-column>
                <el-table-column prop="today" label="当天修复" width="70" align="center"></el-table-column>
                <el-table-column prop="nextday" label="次日修复" width="70" align="center"></el-table-column>
                <el-table-column prop="threeday" label="三天内修复" width="82" align="center"></el-table-column>
                <el-table-column prop="moreday" label="超过三天修复" width="94" align="center"></el-table-column>
                <el-table-column prop="bad" label="不能修复" width="70" align="center"></el-table-column>
                <el-table-column prop="replace" label="更换设备" width="70" align="center"></el-table-column>
              </el-table-column>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import ElementHeader from '../../components/Header'
  import SideBar from '../../components/SideBar'
  export default {
    name: "AllSbStatistics",
    data() {
      return {
        tableLoading: false,
        statistics: [],
        sb: {
          sblx: '',
          sbgsjtdm: '',
          sbgsgsdm: '',
          sbgscddm: '',
          sbgsxldm: '',
        },
        subsidiary: this.$store.getters.getAllSubsidiary,
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    components: {
      ElementHeader,
      SideBar
    },
    methods: {
      handleGsTreeSelect(data){
        let [jtdm, gsdm, cddm, xldm] = this.getGsTreeInfo(data,this.sb.sbgsjtdm,this.sb.sbgsgsdm,this.sb.sbgscddm,this.sb.sbgsxldm)
        this.sb.sbgsjtdm = jtdm
        this.sb.sbgsgsdm = gsdm
        this.sb.sbgscddm = cddm
        this.sb.sbgsxldm = xldm
        console.log(this.sb)
      },
      goSbBasic(scope) {
        switch (scope.row.sblx) {
          case 'RFID4G':
            // 路由导向并携带当前集团、公司、车队、线路信息 应用路由参数???
            this.$router.push('/rfid4g/basic')
            break
          case 'RFID4G(场站)':
            this.$router.push('/rfid4gcz/basic')
            break
          case '车辆标签':
            this.$router.push('/clbq/basic')
            break
          case '车载一体机':
            this.$router.push('/czytj/basic')
            break
          case '报到机':
            this.$router.push('/bdj/basic')
            break
          case '一程一检':
            this.$router.push('/ycyj/basic')
            break
          case '站点通':
            this.$router.push('/zdt/basic')
            break
          case '55寸屏':
            this.$router.push('/ffcp/basic')
            break
          case '站杆预报屏':
            this.$router.push('/zgybp/basic')
            break
          default:
        }
      },
      goSbMove(scope){
        switch (scope.row.sblx) {
          case 'RFID4G':
            // 路由导向并携带当前集团、公司、车队、线路信息 应用路由参数???
            this.$router.push('/rfid4g/move')
            break
          case 'RFID4G(场站)':
            this.$router.push('/rfid4gcz/move')
            break
          case '车辆标签':
            this.$router.push('/clbq/move')
            break
          case '车载一体机':
            this.$router.push('/czytj/move')
            break
          case '报到机':
            this.$router.push('/bdj/move')
            break
          case '一程一检':
            this.$router.push('/ycyj/move')
            break
          case '站点通':
            this.$router.push('/zdt/move')
            break
          case '55寸屏':
            this.$router.push('/ffcp/move')
            break
          case '站杆预报屏':
            this.$router.push('/zgybp/move')
            break
          default:
        }
      },
      goSbCheck(scope){
        switch (scope.row.sblx) {
          case 'RFID4G':
            // 路由导向并携带当前集团、公司、车队、线路信息 应用路由参数???
            this.$router.push('/rfid4g/check')
            break
          case 'RFID4G(场站)':
            this.$router.push('/rfid4gcz/check')
            break
          case '车辆标签':
            this.$router.push('/clbq/check')
            break
          case '车载一体机':
            this.$router.push('/czytj/check')
            break
          case '报到机':
            this.$router.push('/bdj/check')
            break
          case '一程一检':
            this.$router.push('/ycyj/check')
            break
          case '站点通':
            this.$router.push('/zdt/check')
            break
          case '55寸屏':
            this.$router.push('/ffcp/check')
            break
          case '站杆预报屏':
            this.$router.push('/zgybp/check')
            break
          default:
        }
      },
      goSbReport(scope){
        switch (scope.row.sblx) {
          case 'RFID4G':
            // 路由导向并携带当前集团、公司、车队、线路信息 应用路由参数???
            this.$router.push('/rfid4g/report')
            break
          case 'RFID4G(场站)':
            this.$router.push('/rfid4gcz/report')
            break
          case '车辆标签':
            this.$router.push('/clbq/report')
            break
          case '车载一体机':
            this.$router.push('/czytj/report')
            break
          case '报到机':
            this.$router.push('/bdj/report')
            break
          case '一程一检':
            this.$router.push('/ycyj/report')
            break
          case '站点通':
            this.$router.push('/zdt/report')
            break
          case '55寸屏':
            this.$router.push('/ffcp/report')
            break
          case '站杆预报屏':
            this.$router.push('/zgybp/report')
            break
          default:
        }
      },
      goSbFix(scope){
        switch (scope.row.sblx) {
          case 'RFID4G':
            // 路由导向并携带当前集团、公司、车队、线路信息 应用路由参数???
            this.$router.push('/rfid4g/fix')
            break
          case 'RFID4G(场站)':
            this.$router.push('/rfid4gcz/fix')
            break
          case '车辆标签':
            this.$router.push('/clbq/fix')
            break
          case '车载一体机':
            this.$router.push('/czytj/fix')
            break
          case '报到机':
            this.$router.push('/bdj/fix')
            break
          case '一程一检':
            this.$router.push('/ycyj/fix')
            break
          case '站点通':
            this.$router.push('/zdt/fix')
            break
          case '55寸屏':
            this.$router.push('/ffcp/fix')
            break
          case '站杆预报屏':
            this.$router.push('/zgybp/fix')
            break
          default:
        }
      },
      loadSbsStatistics() {
        var _this = this
        this.tableLoading = true
        // 统一一个接口or九个接口
        // 九个接口=>九个统计结果加入统计数组->查询时带上设备类型参数
        // 一个接口=>一个json数组九类设备统计结果->查询时不带设备类型参数
        this.getRequest('/api/Sbs/statistics').then(res => {
          _this.tableLoading = false
          if (res && res.status === 200) {
            _this.statistics = res.data.SbStatisticsList
          }
        })
      }
    },
    mounted() {
      this.loadSbsStatistics()
    }
  }
</script>

<style scoped>
  #title {
    background-color: #eef1f6;
    text-align: center;
    font-size: 26px;
    height: 60px;
    line-height: 60px;
  }
</style>
