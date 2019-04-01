<template>
  <div>
    <ElementHeader></ElementHeader>
    <el-container style="height: 640px; border: 1px solid #eee">
      <!-- Side Begin -->
      <el-aside style="background-color: rgb(238, 241, 246);width:200px;">
        <el-menu unique-opened default-active="/rfid4g/status/jt1" router>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-info"></i>RFID4G</template>
            <el-menu-item-group>
              <template slot="title">归属集团</template>
              <!-- 获取集团下公司数据所传参数 url?sblbdm=&sbgsjtdm= -->
              <el-menu-item index="/rfid4g/status/jt1">上海久事一集团</el-menu-item>
              <el-menu-item index="/rfid4g/status/jt2">上海久事二集团</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-info"></i>RFID4G（场站）</template>
            <el-menu-item-group>
              <template slot="title">归属集团</template>
              <el-menu-item index="2-1">上海久事一集团</el-menu-item>
              <el-menu-item index="2-2">上海久事二集团</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-info"></i>车辆标签</template>
            <el-menu-item-group>
              <template slot="title">归属集团</template>
              <el-menu-item index="3-1">上海久事一集团</el-menu-item>
              <el-menu-item index="3-2">上海久事二集团</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-info"></i>车载一体机</template>
            <el-menu-item-group>
              <template slot="title">归属集团</template>
              <el-menu-item index="4-1">上海久事一集团</el-menu-item>
              <el-menu-item index="4-2">上海久事二集团</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title"><i class="el-icon-info"></i>报到机</template>
            <el-menu-item-group>
              <template slot="title">归属集团</template>
              <el-menu-item index="5-1">上海久事一集团</el-menu-item>
              <el-menu-item index="5-2">上海久事二集团</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title"><i class="el-icon-info"></i>一程一检</template>
            <el-menu-item-group>
              <template slot="title">归属集团</template>
              <el-menu-item index="6-1">上海久事一集团</el-menu-item>
              <el-menu-item index="6-2">上海久事二集团</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title"><i class="el-icon-info"></i>站点通</template>
            <el-menu-item-group>
              <template slot="title">归属集团</template>
              <el-menu-item index="7-1">上海久事一集团</el-menu-item>
              <el-menu-item index="7-2">上海久事二集团</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="8">
            <template slot="title"><i class="el-icon-info"></i>55寸屏</template>
            <el-menu-item-group>
              <template slot="title">归属集团</template>
              <el-menu-item index="8-1">上海久事一集团</el-menu-item>
              <el-menu-item index="8-2">上海久事二集团</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="9">
            <template slot="title"><i class="el-icon-info"></i>站杆预报屏</template>
            <el-menu-item-group>
              <template slot="title">归属集团</template>
              <el-menu-item index="9-1">上海久事一集团</el-menu-item>
              <el-menu-item index="9-2">上海久事二集团</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- Container Begin -->
      <el-container>
        <!-- Header Begin -->
        <el-header style="text-align: center; font-size: 24px">
          <!-- 标题 Begin -->
          <div id="title">
            <span>RFID4G工作状态</span>
          </div>
          <!-- 搜索框及高级搜索 Begin -->
          <!-- 导入、导出、添加 Begin -->
        </el-header>
        <!-- Main Begin -->
        <el-main>
          <!-- 高级搜索框Begin -->
          <!-- Table Begin -->
          <el-table :data="statistic" v-loading="tableLoading" border stripe size="small" style="width: 100%;"
                    highlight-current-row height="519" tooltip-effect="dark">
            <el-table-column type="selection" width="36" align="center"></el-table-column>
            <el-table-column prop="jt" label="集团" width="110" fixed></el-table-column>
            <el-table-column prop="gs" label="公司" width="110" fixed></el-table-column>
            <el-table-column prop="cd" label="车队" width="110" fixed></el-table-column>
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
            <el-button type="danger" size="small">批量删除</el-button>
            <el-button size="small">取消选择</el-button>
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

  export default {
    name: "Rfid4gStatus",
    data() {
      return {
        totalPage:0,
        pageSize:10,
        currentPage:1
      }
    },
    components: {
      ElementHeader
    },
    methods: {
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
