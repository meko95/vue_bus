<template>
  <div>
    <ElementHeader></ElementHeader>
    <el-container style="height: 707px; border: 1px solid #eee">
      <!-- Side Begin -->
      <SideBar sb-type="RFID4G"></SideBar>
      <!-- Container Begin -->
      <el-container>
        <!-- Header Begin -->
        <el-header style="text-align: center; font-size: 24px">
          <span>RFID4G迁移情况</span>
        </el-header>
        <!-- Main Begin -->
        <el-main>
          <!-- 高级搜索框、Table Begin -->
          <el-table :data="MoveDevices" v-loading="tableLoading" border stripe size="small" style="width: 100%;"
                    highlight-current-row height="585" tooltip-effect="dark">
            <el-table-column prop="sbqybh" label="设备迁移日期" width="110" align="center" fixed></el-table-column>
            <el-table-column prop="qydh" label="迁移单号" width="110" align="center"></el-table-column>
            <el-table-column prop="sbbh" label="设备编号" width="110" align="center"></el-table-column>
            <el-table-column prop="sbysdz" label="原始地址" width="110" align="center"></el-table-column>
            <el-table-column prop="sbqymbdz" label="目标地址" width="110" align="center"></el-table-column>
            <el-table-column prop="sbqyczrygh" label="操作人员工号" width="110" align="center"></el-table-column>
            <el-table-column prop="sbqyczryxm" label="操作人员姓名" width="110" align="center"></el-table-column>
            <el-table-column prop="sbqysprygh" label="审批人员工号" width="110" align="center"></el-table-column>
            <el-table-column prop="sbqyspryxm" label="审批人员姓名" width="110" align="center"></el-table-column>
            <el-table-column prop="sbqybz" label="迁移备注" width="110" align="center"></el-table-column>
          </el-table>
          <!-- 分页Begin -->
          <div style="display: flex;justify-content: flex-end;margin: 4px">
            <el-pagination background :page-sizes="[10, 30, 50, 100]" :total="totalPage" :page-size="pageSize"
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
    name: "Rfid4gChangeInfo",
    data() {
      return {
        tableLoading: false,
        totalPage: 0,
        pageSize: 10,
        currentPage: 1,
        multipleSelection: [],
        MoveDevices: []
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
      loadMoveDevices() {
        this.tableLoading = true
        var _this = this
        this.getRequest('/api/rfid4g/move/jt1').then(res => {
          _this.tableLoading = false
          if (res && res.status === 200) {
            _this.MoveDevices = res.data.Rfid4gMoveList
            _this.totalPage = res.data.totalRow
          }
        })
      }
    },
    mounted() {
      this.loadMoveDevices()
    }
  }
</script>

<style scoped>

</style>
