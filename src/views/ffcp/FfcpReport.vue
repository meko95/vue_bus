<template>
  <div>
    <ElementHeader></ElementHeader>
    <el-container style="height: 701px; border: 1px solid #eee">
      <!-- Side Begin -->
      <SideBar sb-type="55寸屏"></SideBar>
      <!-- Container Begin -->
      <el-container>
        <el-header style="text-align: center; font-size: 24px">
          <!-- 标题 Begin -->
          <div id="title">
            <span>55寸屏报修情况</span>
          </div>
          <!-- 搜索框及高级搜索 Begin -->
          <!-- 导入、导出、添加 Begin -->
        </el-header>
        <el-main>
          <!-- 高级搜索框Begin -->
          <!-- Table Begin -->
          <el-table :data="ReportDevices" border stripe size="small" style="width: 100%;" :row-style="{'height': 0}"
                    :cell-style="{'padding': 0}"
                    highlight-current-row height="559" tooltip-effect="dark">
            <el-table-column prop="bxsj" label="报修日期" width="110" align="center" fixed></el-table-column>
            <el-table-column prop="bxdh" label="报修单号" width="110" align="center"></el-table-column>
            <el-table-column prop="bxsbbh" label="设备编号" width="110" align="center"></el-table-column>
            <el-table-column prop="sbgsgsmc" label="公司" width="90" align="center"></el-table-column>
            <el-table-column prop="sbgscdmc" label="车队" width="70" align="center"></el-table-column>
            <el-table-column prop="sbgsxlmc" label="线路" width="70" align="center"></el-table-column>
            <el-table-column prop="xjydm" label="巡检员工号" width="90" align="center"></el-table-column>
            <el-table-column prop="xjygmc" label="巡检人姓名" width="90" align="center"></el-table-column>
            <el-table-column prop="bxnr" label="报修内容" width="95" align="center"></el-table-column>
            <el-table-column prop="bxlx" label="报修类型" width="75" align="center"></el-table-column>
            <el-table-column prop="bxfs" label="报修方式" width="95" align="center"></el-table-column>
            <el-table-column prop="bxgzmc" label="报修故障名称" width="125" align="center"></el-table-column>
            <el-table-column prop="bmzgmc" label="部门主管" width="80" align="center"></el-table-column>
            <el-table-column prop="bxrydm" label="拟维修人员工号" width="110" align="center"></el-table-column>
            <el-table-column prop="bxrymc" label="拟维修人员姓名" width="75" align="center"></el-table-column>
            <el-table-column prop="jcsmc" label="集成商" width="75" align="center"></el-table-column>
            <el-table-column prop="gysmc" label="供应商" width="75" align="center"></el-table-column>
            <el-table-column prop="sbtxm" label="条形码" width="110" align="center"></el-table-column>
            <el-table-column prop="sbewm" label="二维码" width="110" align="center"></el-table-column>
          </el-table>
          <!-- 批量删除、分页Begin -->
          <div style="display: flex;justify-content: flex-end;margin: 4px">
            <el-pagination background :page-sizes="[10, 30, 50, 100]" :total="totalRow" :page-size="pageSize"
                           :current-page="currentPage"
                           @current-change="handleCurrentChange" @size-change="handleSizeChange"
                           layout="total, sizes, prev, pager, next, jumper">
            </el-pagination>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import ElementHeader from '../../components/Header'
  import SideBar from '../../components/SideBar'

  export default {
    name: "FfcpReport",
    data() {
      return {
        totalRow: 0,
        pageSize: 10,
        currentPage: 1,
        ReportDevices: [],
        tableLoading: false
      }
    },
    components: {
      ElementHeader,
      SideBar
    },
    methods: {
      handleCurrentChange(val) {
        this.currentPage = val
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        this.pageSize = val
      },
      loadReportDevices(){
        var _this = this
        this.tableLoading = true
        this.getRequest('/api/rfid4g/report/jt1').then(res=>{
        _this.tableLoading = false
          if(res&&res.status===200){
            _this.ReportDevices = res.data.Rfid4gReportList
            _this.totalRow = res.data.totalRow
          }
        })
      }
    },
    mounted(){
      this.loadReportDevices()
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
