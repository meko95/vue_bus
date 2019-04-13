<template>
  <div>
    <ElementHeader></ElementHeader>
    <el-container style="height: 701px; border: 1px solid #eee">
      <!-- Side Begin -->
      <SideBar sb-type="RFID4G场站" @listenToChildEvent="handleGsTreeSelect"></SideBar>
      <!-- Container Begin -->
      <el-container>
        <!-- Header Begin -->
        <el-header style="text-align: center; font-size: 24px">
          <!-- 标题 Begin -->
          <div id="title">
            <span>RFID4G(场站)工作状态</span>
          </div>
          <!-- 搜索框及高级搜索 Begin -->
          <!-- 导入、导出、添加 Begin -->
        </el-header>
        <!-- Main Begin -->
        <el-main>
          <!-- 高级搜索框Begin -->
          <!-- Table Begin -->
          <el-table :data="statistic" v-loading="tableLoading" border stripe size="small" style="width: 100%;"
                    highlight-current-row height="559" tooltip-effect="dark">
            <el-table-column prop="rq" label="日期" width="100" align="center" sortable>
              <template slot-scope="scope">{{ scope.row.rq | formatDate}}</template>
            </el-table-column>
            <el-table-column prop="jt" label="集团" width="110"></el-table-column>
            <el-table-column prop="jt" label="集团" width="110"></el-table-column>
            <el-table-column prop="gs" label="公司" width="110"></el-table-column>
            <el-table-column prop="cd" label="车队" width="110"></el-table-column>
            <!--<el-table-column prop="xl" label="线路" width="110" fixed></el-table-column>-->
            <el-table-column label="班次接收情况" align="center">
              <el-table-column prop="dzbc" label="到站班次" width="100" align="center"></el-table-column>
              <el-table-column prop="jsbc" label="接收班次" width="100" algin="center"></el-table-column>
              <el-table-column prop="sjsbc" label="少接收班次" width="100" algin="center"></el-table-column>
              <el-table-column prop="bcjsl" label="班次接收率" width="100" algin="center"></el-table-column>
              <el-table-column prop="pjbcjsl" label="平均接收率" width="100" algin="center"></el-table-column>
            </el-table-column>
            <el-table-column label="车辆接收情况" align="center">
              <el-table-column prop="dzcl" label="到站车辆" width="100" align="center"></el-table-column>
              <el-table-column prop="jscl" label="接收车辆" width="100" algin="center"></el-table-column>
              <el-table-column prop="sjscl" label="少接收车辆" width="100" algin="center"></el-table-column>
              <el-table-column prop="cljsl" label="车辆接收率" width="100" algin="center"></el-table-column>
              <el-table-column prop="pjcljsl" label="平均接收率" width="100" algin="center"></el-table-column>
            </el-table-column>
          </el-table>
          <!-- 批量删除、分页Begin -->
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
    name: "Rfid4gczStatus",
    data() {
      return {
        tableLoading: false,
        totalPage:0,
        pageSize:10,
        currentPage:1,
        rfid4gcz:{
          sbgsjtdm: '',
          sbgsgsdm: '',
          sbgscddm: '',
          sbgsxldm: ''
        },
        statistic: []
      }
    },
    components: {
      ElementHeader,
      SideBar
    },
    methods: {
      handleGsTreeSelect(data) {
        let [jtdm, gsdm, cddm, xldm] = this.getGsTreeInfo(data,this.rfid4gcz.sbgsjtdm,this.rfid4gcz.sbgsgsdm,this.rfid4gcz.sbgscddm,this.rfid4gcz.sbgsxldm)
        this.rfid4gcz.sbgsjtdm = jtdm
        this.rfid4gcz.sbgsgsdm = gsdm
        this.rfid4gcz.sbgscddm = cddm
        this.rfid4gcz.sbgsxldm = xldm
        console.log(this.rfid4gcz)
      },
      handleCurrentChange(val){
        this.currentPage = val
      },
      handleSizeChange(val){
        console.log(`每页 ${val} 条`)
        this.pageSize = val
      }
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
