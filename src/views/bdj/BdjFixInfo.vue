<template>
  <div>
    <ElementHeader></ElementHeader>
    <el-container style="height: 701px; border: 1px solid #eee">
      <!-- Side Begin -->
      <SideBar sb-type="报到机"></SideBar>
      <!-- Container Begin -->
      <el-container>
        <!-- Header Begin -->
        <el-header>
          <!-- 标题 Begin -->
          <div id="title">
            <span>报到机修理情况</span>
          </div>
        </el-header>
        <el-main>
          <!-- Table Begin -->
          <el-table :data="FixDevices" border stripe size="small" style="width: 100%;" :row-style="{'height': 0}"
                    :cell-style="{'padding': 0}" v-loading="tableLoading"
                    highlight-current-row height="580" tooltip-effect="dark">
            <el-table-column prop="wxsj" label="维修日期" width="110" align="center" fixed></el-table-column>
            <el-table-column prop="wxdh" label="维修单号" width="110" align="center"></el-table-column>
            <el-table-column prop="ybxdh" label="原报修单号" width="110" align="center"></el-table-column>
            <el-table-column prop="bxsbbh" label="设备编号" width="110" align="center"></el-table-column>
            <el-table-column prop="sbgsgsmc" label="公司" width="90" align="center"></el-table-column>
            <el-table-column prop="sbgscdmc" label="车队" width="70" align="center"></el-table-column>
            <el-table-column prop="sbgsxlmc" label="线路" width="70" align="center"></el-table-column>
            <el-table-column prop="xlgs" label="修理工时" width="75" align="center"></el-table-column>
            <el-table-column prop="xfzt" label="修复状态" width="75" align="center"></el-table-column>
            <el-table-column prop="xffs" label="修复方式" width="75" align="center"></el-table-column>
            <el-table-column prop="xfnr" label="修复内容" width="95" align="center"></el-table-column>
            <el-table-column prop="xfrdm" label="修复人工号" width="90" align="center"></el-table-column>
            <el-table-column prop="xfrmc" label="修复人姓名" width="90" align="center"></el-table-column>
            <el-table-column prop="bmzgmc" label="部门主管" width="80" align="center"></el-table-column>
            <el-table-column prop="jcsmc" label="集成商" width="75" align="center"></el-table-column>
            <el-table-column prop="gysmc" label="供应商" width="75" align="center"></el-table-column>
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
    name: "Rfid4gFixInfo",
    data() {
      return {
        totalRow: 0,
        pageSize: 10,
        currentPage: 1,
        FixDevices: [],
        tableLoading: true
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
      loadFixDevices() {
        var _this = this
        this.tableLoading = true
        this.getRequest('/api/rfid4g/fix/jt1').then(res => {
          _this.tableLoading = false
          if (res && res.status === 200) {
            _this.FixDevices = res.data.Rfid4gFixList
            _this.totalRow = res.data.totalRow
          }
        })
      }
    },
    mounted() {
      this.loadFixDevices()
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
