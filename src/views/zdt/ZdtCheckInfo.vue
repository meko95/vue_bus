<template>
  <div>
    <ElementHeader></ElementHeader>
    <el-container style="height: 701px; border: 1px solid #eee">
      <!-- Side Begin -->
      <SideBar sb-type="站点通"></SideBar>
      <!-- Container Begin -->
      <el-container>
        <el-header>
          <!-- 标题 Begin -->
          <div id="title">
            <span>站点通巡检情况</span>
          </div>
        </el-header>
        <el-main>
          <!-- Table Begin -->
          <!--:row-style="{'height': 0}"-->
          <el-table :data="CheckDevices" border stripe size="small" style="width: 100%;" v-loading="tableLoading"
                    :row-style="tableRowStyle" :cell-style="{'padding': 0}" highlight-current-row height="559"
                    tooltip-effect="dark">
            <el-table-column prop="xjsj" label="巡检日期" width="110" align="center" fixed></el-table-column>
            <el-table-column prop="xjdh" label="巡检单号" width="110" align="center"></el-table-column>
            <el-table-column prop="xjsbbh" label="设备编号" width="110" align="center"></el-table-column>
            <el-table-column prop="sbzt" label="设备状态" width="110" align="center"></el-table-column>
            <el-table-column prop="sbgsgsmc" label="公司" width="90" align="center"></el-table-column>
            <el-table-column prop="sbgscdmc" label="车队" width="70" align="center"></el-table-column>
            <el-table-column prop="sbgsxlmc" label="线路" width="70" align="center"></el-table-column>
            <el-table-column prop="xjbz" label="巡检备注" width="110" align="center"></el-table-column>
            <el-table-column prop="xjydm" label="巡检员工号" width="90" align="center"></el-table-column>
            <el-table-column prop="xjygmc" label="巡检人姓名" width="90" align="center"></el-table-column>
            <el-table-column prop="bmzgmc" label="部门主管" width="80" align="center"></el-table-column>
            <el-table-column prop="jcsmc" label="集成商" width="75" align="center"></el-table-column>
            <el-table-column prop="gysmc" label="供应商" width="75" align="center"></el-table-column>
            <el-table-column prop="sbtxm" label="条形码" width="110" align="center"></el-table-column>
            <el-table-column prop="sbewm" label="二维码" width="110" align="center"></el-table-column>
          </el-table>
          <!-- 批量删除、分页Begin -->
          <div style="display: flex;justify-content: flex-end;margin-top: 8px">
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
    name: "Rfid4gCheck",
    data() {
      return {
        totalRow: 0,
        pageSize: 10,
        currentPage: 1,
        tableLoading: false,
        CheckDevices: []
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
      tableRowStyle({row,rowIndex}){
        switch (row.sbzt) {
          case '工作异常':
            return {'height': 0,'background':'#F56C6C'}
            break
        }
      },
      loadCheckDevices() {
        var _this = this
        this.tableLoading = true
        this.getRequest('/api/rfid4g/check/jt1').then(res => {
          _this.tableLoading = false
          if (res && res.status === 200) {
            _this.CheckDevices = res.data.Rfid4gCheckList
            _this.totalRow = res.data.totalRow
          }
        })
      }
    },
    mounted() {
      this.loadCheckDevices()
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
