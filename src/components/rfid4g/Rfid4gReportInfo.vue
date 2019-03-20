<template>
  <div>
    <ElementHeader></ElementHeader>
    <el-container style="height: 640px; border: 1px solid #eee">
      <el-aside style="background-color: rgb(238, 241, 246);width:200px;">
        <el-menu unique-opened default-active="/rfid4g/report/jt1" router>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-info"></i>RFID4G</template>
            <el-menu-item-group>
              <template slot="title">归属集团</template>
              <!-- 获取集团下公司数据所传参数 url?sblbdm=&sbgsjtdm= -->
              <el-menu-item index="/rfid4g/report/jt1">上海久事一集团</el-menu-item>
              <el-menu-item index="/rfid4g/report/jt2">上海久事二集团</el-menu-item>
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
      <el-container>
        <el-header style="text-align: center; font-size: 24px">
          <!-- 标题 Begin -->
          <span>RFID4G报修情况</span>
          <!-- 搜索框及高级搜索 Begin -->
          <!-- 导入、导出、添加 Begin -->
        </el-header>
        <el-main>
          <!-- 高级搜索框Begin -->
          <!-- Table Begin -->
          <el-table :data="statistic" border stripe size="small" style="width: 100%;"
                    highlight-current-row height="519" tooltip-effect="dark">
            <el-table-column type="selection" width="36" align="center"></el-table-column>
            <el-table-column prop="bxdh" label="报修单号" width="110" align="center" fixed></el-table-column>
            <el-table-column prop="bxsbbh" label="设备编号" width="110" align="center"></el-table-column>
            <el-table-column prop="bxsj" label="报修日期" width="110" align="center"></el-table-column>
            <el-table-column prop="sbtxm" label="条形码" width="110" align="center"></el-table-column>
            <el-table-column prop="sbewm" label="二维码" width="110" align="center"></el-table-column>
            <el-table-column prop="xjydm" label="工号?巡检员代码" width="110" align="center"></el-table-column>
            <el-table-column prop="xjygmc" label="巡检人" width="110" align="center"></el-table-column>
            <el-table-column prop="bxnr" label="报修内容" width="110" align="center"></el-table-column>
            <el-table-column prop="bxlx" label="报修类型" width="110" align="center"></el-table-column>
            <el-table-column prop="bxfs" label="报修方式" width="110" align="center"></el-table-column>
            <el-table-column prop="bmzgmc" label="部门主管" width="110" align="center"></el-table-column>
            <el-table-column prop="bxrymc" label="拟维修人员" width="110" align="center"></el-table-column>
            <el-table-column prop="jcsmc" label="集成商" width="110" align="center"></el-table-column>
            <el-table-column prop="gysmc" label="供应商" width="110" align="center"></el-table-column>
            <el-table-column fixed="right" label="操作" width="150" align="center">
              <template slot-scope="scope">
                <el-button style="padding: 5px 10px;margin: 6px" size="large">编辑</el-button>
                <el-button type="danger" style="padding: 5px 10px;margin: 6px" size="large">删除</el-button>
              </template>
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
  import ElementHeader from '../ElementHeader'
  export default {
    name: "Rfid4gReportInfo",
    data(){
      return {
        totalPage:0,
        pageSize:10,
        currentPage:1
      }
    },
    components:{
      ElementHeader
    },
    methods:{
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

</style>
