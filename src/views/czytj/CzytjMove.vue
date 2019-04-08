<template>
  <div>
    <ElementHeader></ElementHeader>
    <el-container style="height: 701px; border: 1px solid #eee">
      <!-- Side Begin -->
      <SideBar sb-type="车载一体机"></SideBar>
      <!-- Container Begin -->
      <el-container>
        <!-- Header Begin -->
        <el-header>
          <div id="title">
            <span>车载一体机迁移情况</span>
          </div>
        </el-header>
        <!-- Main Begin -->
        <el-main>
          <!-- 高级搜索框、Table Begin -->
          <el-table :data="MoveDevices" v-loading="tableLoading" border stripe size="small" style="width: 100%"
                    :row-style="{'height': 0}" :cell-style="{'padding': 0}"
                    highlight-current-row height="559" tooltip-effect="dark">
            <el-table-column prop="sbqybh" label="设备迁移日期" width="110" align="center" fixed></el-table-column>
            <el-table-column prop="qydh" label="迁移单号" width="110" align="center"></el-table-column>
            <el-table-column prop="sbbh" label="设备编号" width="110" align="center"></el-table-column>
            <el-table-column prop="sbgsgsmc" label="公司" width="90" align="center"></el-table-column>
            <el-table-column prop="sbgscdmc" label="车队" width="70" align="center"></el-table-column>
            <el-table-column prop="sbgsxlmc" label="线路" width="70" align="center"></el-table-column>
            <el-table-column prop="sbysdz" label="原始地址" width="110" align="center"></el-table-column>
            <el-table-column prop="sbqymbdz" label="目标地址" width="110" align="center"></el-table-column>
            <el-table-column prop="sbqyczrygh" label="操作人员工号" width="100" align="center"></el-table-column>
            <el-table-column prop="sbqyczryxm" label="操作人员姓名" width="100" align="center"></el-table-column>
            <el-table-column prop="sbqysprygh" label="审批人员工号" width="100" align="center"></el-table-column>
            <el-table-column prop="sbqyspryxm" label="审批人员姓名" width="100" align="center"></el-table-column>
            <el-table-column prop="sbqybz" label="迁移备注" width="90" align="center">
              <template slot-scope="scope">
                <el-popover placement="left-start" title="迁移备注" width="200" trigger="hover">
                  <p>3小时完成设备迁移，迁移后设备处于正常工作状态</p>
                  <a slot="reference">查看备注</a>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页Begin -->
          <div style="display: flex;justify-content: flex-end;margin-top: 8px">
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
    name: "CzytjMove",
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
  #title {
    background-color: #eef1f6;
    text-align: center;
    font-size: 26px;
    height: 60px;
    line-height: 60px;
  }
</style>
