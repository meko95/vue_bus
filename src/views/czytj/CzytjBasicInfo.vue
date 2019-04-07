<template>
  <div>
    <ElementHeader></ElementHeader>
    <el-container style="height: 701px; border: 1px solid #eee">
      <!-- Side Begin -->
      <SideBar sb-type="车载一体机" @listenToChildEvent="getGsSelected"></SideBar>
      <!-- Container Begin -->
      <el-container>
        <el-header>
          <div style="display: inline">
            <StatisticsCard :s-title="cardTitle"></StatisticsCard>
            <el-input
              placeholder="通过分片编号查询"
              clearable
              @change="qypbhChange"
              style="width: 192px;margin-left: 10px;padding: 0;"
              size="mini"
              :disabled="advanceSearchViewVisible"
              @keyup.enter.native="searchCzytj"
              prefix-icon="el-icon-search"
              v-model="czytj.qypbh">
            </el-input>
          </div>
          <div style="display: inline">
            <el-button type="primary" style="margin-left: 9px" size="mini" icon="el-icon-search" @click="searchCzytj">
              搜索
            </el-button>
            <el-button slot="reference" type="primary" size="mini" style="margin-left: 0px"
                       @click="showAdvanceSearchView">
              <i class="fa fa-lg" :class="[advanceSearchViewVisible ? searchUp:searchDown]"
                 style="margin-right: 5px">
              </i>高级搜索
            </el-button>
          </div>
          <div style="margin-left: 0;display: inline">
            <el-button type="success" size="mini" @click="importCzytjs">
              <i class="el-icon-upload2" style="margin-right: 3px"></i>导入数据
            </el-button>
            <el-button type="success" size="mini" @click="exportCzytjs" style="margin-left: 0">
              <i class="el-icon-download" style="margin-right: 3px"></i>导出数据
            </el-button>
          </div>
          <div style="display: inline;margin-left: 0">
            <el-button type="primary" size="mini" icon="el-icon-plus" @click="showAddCzytjView">添加车载一体机</el-button>
          </div>
        </el-header>
        <el-main>
          <div>
            <!-- 高级搜索 -->
            <transition name="slide-fade">
              <div
                style="margin-bottom: 10px;border: 1px solid #20a0ff;border-radius: 5px;padding: 20px 35px;box-sizing:border-box;"
                v-show="advanceSearchViewVisible">
                <el-row>
                  <el-col :span="6">
                    车载一体机编号:
                    <el-input prefix-icon="el-icon-search" v-model="czytj.sbzbh" size="small" style="width: 150px"
                              placeholder="设备查询编号"></el-input>
                  </el-col>
                  <el-col :span="5">
                    合同编号:
                    <el-input prefix-icon="el-icon-search" v-model="czytj.htbh" size="small" style="width: 150px"
                              placeholder="设备合同编号"></el-input>
                  </el-col>
                  <el-col :span="4">
                    分片区域:
                    <el-select v-model="czytj.qypmc" style="width: 120px" clearable size="small" placeholder="请选择">
                      <el-option v-for="item in qypmcs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.descriptionZh"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    管理等级:
                    <el-select v-model="czytj.gldj" style="width: 100px" size="small" placeholder="管理等级">
                      <el-option v-for="item in gldjs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.descriptionZh"></el-option>
                    </el-select>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 18px">
                  <el-col :span="6">
                    品牌型号:
                    <el-cascader
                      size="small"
                      placeholder="请选择设备品牌型号"
                      style="width: 170px;"
                      expand-trigger="hover"
                      clearable
                      :options="sbppxh"
                      v-model="czytjPpxhOption"
                      @change="handlePpxhChange"
                      change-on-select>
                    </el-cascader>
                  </el-col>
                  <el-col :span="9">
                    启动日期:
                    <el-date-picker
                      v-model="beginDateScope"
                      unlink-panels
                      size="small"
                      type="daterange"
                      value-format="yyyy-MM-dd"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>
                  </el-col>
                  <el-col :span="9">
                    更新日期:
                    <el-date-picker
                      v-model="updateDateScope"
                      unlink-panels
                      size="small"
                      type="daterange"
                      value-format="yyyy-MM-dd"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 18px">
                  <el-col :span="9">
                    报废日期:
                    <el-date-picker
                      v-model="endDateScope"
                      unlink-panels
                      size="small"
                      type="daterange"
                      value-format="yyyy-MM-dd"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>
                  </el-col>
                  <el-col :span="4">
                    供应商:
                    <el-select v-model="czytj.gysmc" style="width: 130px" clearable size="small" placeholder="请选择供应商">
                      <el-option v-for="item in gs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.descriptionZh">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    集成商:
                    <el-select v-model="czytj.jcsmc" style="width: 130px" clearable size="small" placeholder="请选择集成商">
                      <el-option v-for="item in gs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.descriptionZh">
                      </el-option>
                    </el-select>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 18px">
                  <el-col :span="8">
                    设备归属:
                    <el-cascader
                      size="small"
                      placeholder="请选择设备归属"
                      style="width:300px;"
                      expand-trigger="hover"
                      clearable
                      :options="czytjGsOptions"
                      v-model="czytjGsOption"
                      @change="handleChange"
                      change-on-select>
                    </el-cascader>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 18px">
                  <el-col :span="4" :offset="21">
                    <el-button size="small" @click="cancelSearch">取消</el-button>
                    <el-button icon="el-icon-search" type="primary" size="small" @click="searchCzytj">搜索</el-button>
                  </el-col>
                </el-row>
              </div>
            </transition>
            <!-- 车载一体机基础信息Begin -->
            <el-table ref="multipleTable" :data="Sbs" v-loading="tableLoading" border tooltip-effect="dark"
                      style="width: 100%;" :row-style="{'height': 0}" :cell-style="{'padding': 0}"
                      @selection-change="handleSelectionChange" stripe size="small" height="559"
                      :default-sort="{prop: 'sbqyrq', order: 'descending'}">
              <el-table-column type="selection" width="36" align="center"></el-table-column>
              <el-table-column prop="sbzbh" label="车载一体机编号" width="120" align="center" fixed></el-table-column>
              <el-table-column prop="htbh" label="合同编号" width="95" align="center"></el-table-column>
              <el-table-column prop="sbgzzt" label="工作状态" width="80" align="center"></el-table-column>
              <el-table-column prop="azzp" label="安装照片" width="80" align="center">
                <template slot-scope="scope">
                  <el-popover
                    placement="top-start"
                    width="200"
                    trigger="hover">
                    <!--<img :src="scope.row.picture"/>-->
                    <!--<img slot="reference" :src="scope.row.picture" :alt="scope.row.picture"-->
                    <!--style="max-height: 50px;max-width: 130px">-->
                    <a slot="reference">{{scope.row.azzp}}</a>
                    <img src="../../../static/image/logo.png" style="max-height: 130px;max-width: 130px">
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column prop="qypbh" label="分片编号" width="70" align="center"></el-table-column>
              <el-table-column prop="qypmc" label="分片名称" width="80" align="center"></el-table-column>
              <el-table-column label="安装车辆信息" align="center">
                <el-table-column prop="azclcph" label="车牌号" width="100" align="center"></el-table-column>
                <el-table-column prop="azclzbh" label="车辆编号" width="95" align="center"></el-table-column>
              </el-table-column>
              <el-table-column prop="gldj" label="管理等级" width="70" align="center"></el-table-column>
              <el-table-column prop="sbpp" label="品牌" width="70" align="center"></el-table-column>
              <el-table-column prop="sbxh" label="型号" width="70" align="center"></el-table-column>
              <el-table-column prop="qxd" label="清晰度" width="130" align="center"></el-table-column>
              <el-table-column prop="cnsxts" label="车内摄像头" width="90" align="center"></el-table-column>
              <el-table-column prop="cwsxts" label="车外摄像头" width="90" align="center"></el-table-column>
              <el-table-column prop="sbgsjtmc" label="集团" width="110" align="center"></el-table-column>
              <el-table-column prop="sbgsgsmc" label="公司" width="90" align="center"></el-table-column>
              <el-table-column prop="sbgscdmc" label="车队" width="70" align="center"></el-table-column>
              <el-table-column prop="sbgsxlmc" label="线路" width="70" align="center"></el-table-column>
              <el-table-column prop="sbqyrq" label="启用日期" width="100" align="center" sortable>
                <!--<template slot-scope="scope">{{ scope.row.sbqyrq | formatDate}}</template>-->
              </el-table-column>
              <el-table-column prop="sbgxrq" label="更新日期" width="100" align="center" sortable>
                <!--<template slot-scope="scope">{{ scope.row.sbgxrq | formatDate}}</template>-->
              </el-table-column>
              <el-table-column prop="sbbfrq" label="报废日期" width="100" align="center" sortable>
                <!--<template slot-scope="scope">{{ scope.row.sbbfrq | formatDate}}</template>-->
              </el-table-column>
              <el-table-column prop="gysmc" label="供应商" width="75" align="center">
              </el-table-column>
              <el-table-column prop="jcsmc" label="集成商" width="75" align="center">
              </el-table-column>
              <el-table-column prop="simkh" label="SIM卡号" width="160" align="center"></el-table-column>
              <el-table-column prop="tmbh" label="条码编号" width="100" align="center"></el-table-column>
              <el-table-column prop="ewmbh" label="二维码编号" width="100" align="center"></el-table-column>
            </el-table>
            <!-- 批量删除及分页Begin -->
            <div style="display: flex;justify-content: flex-end;margin-top: 8px">
              <el-button size="small" v-if="Sbs.length>0"
                         :disabled="multipleSelection.length===0||multipleSelection.length>1"
                         @click="showEditCzytjView(multipleSelection[0])">编辑
              </el-button>
              <el-button type="danger" size="small" v-if="Sbs.length>0" :disabled="multipleSelection.length==0"
                         @click="deleteManyCzytjs">删除
              </el-button>
              <el-button size="small" v-if="Sbs.length>0" :disabled="multipleSelection.length==0"
                         @click="toggleSelection(multipleSelection)">
                取消选择
              </el-button>
              <el-pagination background :page-sizes="[10, 30, 50, 100]" :total="totalPage" :page-size="pageSize"
                             :current-page="currentPage"
                             @current-change="handleCurrentChange" @size-change="handleSizeChange"
                             layout="total, sizes, prev, pager, next, jumper"></el-pagination>
            </div>
            <!-- 批量删除及分页End-->
          </div>
        </el-main>
      </el-container>
      <!-- 添加车载一体机信息Begin -->
      <el-form :model="czytj" :rules="rules" ref="czytj" style="margin: 0px;padding: 0px;">
        <div style="text-align: left">
          <el-dialog :title="dialogTitle" style="padding: auto;" :close-on-click-modal="false"
                     :visible.sync="dialogVisible" width="77%" @close="cancel_add('czytj')">
            <el-row style="padding-left: 100px">
              <el-col :span="7">
                <div>
                  <el-form-item label="车载一体机编号:" prop="sbzbh">
                    <el-input prefix-icon="el-icon-edit" v-model="czytj.sbzbh" size="small" style="width: 150px"
                              placeholder="请输入设备编号"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7">
                <div>
                  <el-form-item label="合同编号:" prop="htbh">
                    <el-input prefix-icon="el-icon-edit" v-model="czytj.htbh" size="small" style="width: 150px"
                              placeholder="请输入设备合同编号"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7">
                <div>
                  <el-form-item label="分片编号:" prop="qypbh">
                    <el-input prefix-icon="el-icon-edit" v-model="czytj.qypbh" size="small" style="width: 150px"
                              placeholder="请输入分片编号"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row style="padding-left: 100px">
              <el-col :span="7">
                <div>
                  <el-form-item label="工作状态:" prop="sbgzzt">
                    <el-select v-model="czytj.sbgzzt" style="width: 120px" size="small" placeholder="请选择">
                      <el-option v-for="item in sbgzzts" :key="item.id" :label="item.descriptionZh"
                                 :value="item.descriptionZh"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7">
                <div>
                  <el-form-item label="分片区域:" prop="qypmc">
                    <el-select v-model="czytj.qypmc" style="width: 120px" size="small" placeholder="请选择">
                      <el-option v-for="item in qypmcs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.descriptionZh"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="5">
                <div>
                  <el-form-item label="管理等级:" prop="gldj">
                    <el-select v-model="czytj.gldj" style="width: 120px" size="small" placeholder="管理等级">
                      <el-option v-for="item in gldjs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.descriptionZh"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row style="padding-left: 100px">
              <el-col :span="7">
                <div>
                  <el-form-item label="品牌型号:" prop="czytjPpxhOption">
                    <el-cascader
                      size="small"
                      placeholder="请选择设备品牌型号"
                      style="width:162px;"
                      expand-trigger="hover"
                      :options="sbppxh"
                      v-model="czytjPpxhOption"
                      @change="handlePpxhChange"
                      change-on-select>
                    </el-cascader>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7">
                <div>
                  <el-form-item label="清晰度:" prop="qxd">
                    <el-input prefix-icon="el-icon-edit" v-model="czytj.qxd" size="small" style="width: 130px"
                              placeholder="请输入清晰度"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7">
                <div>
                  <el-form-item label="安装车牌号:" prop="ancph">
                    <el-input prefix-icon="el-icon-edit" v-model="czytj.azclcph" size="small" style="width: 150px"
                              placeholder="请输入车牌号"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row style="padding-left: 100px">
              <el-col :span="7">
                <div>
                  <el-form-item label="车辆编号:" prop="azclbh">
                    <el-input prefix-icon="el-icon-edit" v-model="czytj.azclzbh" size="small" style="width: 150px"
                              placeholder="请输入车牌号"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7">
                <div>
                  <el-form-item label="车内摄像头数:" prop="cnsxts">
                    <el-input prefix-icon="el-icon-edit" v-model="czytj.cnsxts" size="small" style="width: 130px"
                              placeholder="车内摄像头数"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7">
                <div>
                  <el-form-item label="车外摄像头数:" prop="cwsxts">
                    <el-input prefix-icon="el-icon-edit" v-model="czytj.cwsxts" size="small" style="width: 130px"
                              placeholder="车外摄像头数"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row style="padding-left: 100px">
              <el-col :span="7">
                <div>
                  <el-form-item label="SIM卡号:" prop="simkh">
                    <el-input prefix-icon="el-icon-edit" v-model="czytj.simkh" size="small" style="width: 200px"
                              placeholder="请输入SIM卡号"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="9">
                <div>
                  <el-form-item label="设备归属:" prop="czytjGsOption">
                    <el-cascader
                      size="small"
                      placeholder="请选择设备归属"
                      style="width:266px;"
                      expand-trigger="hover"
                      :options="czytjGsOptions"
                      v-model="czytjGsOption"
                      @change="handleGsChange"
                      change-on-select>
                    </el-cascader>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="8">
                <div>
                  <el-form-item label="二维码编号:" prop="ewmbh">
                    <el-input prefix-icon="el-icon-edit" v-model="czytj.ewmbh" size="small" style="width: 180px"
                              placeholder="请输入设备二维码编号"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row style="padding-left: 100px">
              <el-col :span="7">
                <div>
                  <el-form-item label="启动日期:" prop="sbqyrq">
                    <el-date-picker
                      v-model="czytj.sbqyrq"
                      size="small"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      style="width: 150px"
                      type="date"
                      placeholder="启动日期">
                    </el-date-picker>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7">
                <div>
                  <el-form-item label="更新日期:" prop="sbgxrq">
                    <el-date-picker
                      v-model="czytj.sbgxrq"
                      size="small"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      style="width: 150px"
                      type="date"
                      placeholder="更新日期">
                    </el-date-picker>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div>
                  <el-form-item label="报废日期:" prop="sbbfrq">
                    <el-date-picker
                      v-model="czytj.sbbfrq"
                      size="small"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      style="width: 150px"
                      type="date"
                      placeholder="报废日期">
                    </el-date-picker>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row style="padding-left: 100px">
              <el-col :span="6">
                <div>
                  <el-form-item label="供应商:" prop="gysmc">
                    <el-select v-model="czytj.gysmc" style="width: 130px" size="small" placeholder="供应商">
                      <el-option v-for="item in gs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.descriptionZh"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div>
                  <el-form-item label="集成商:" prop="jcsmc">
                    <el-select v-model="czytj.jcsmc" style="width: 130px" size="small" placeholder="集成商">
                      <el-option v-for="item in gs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.descriptionZh"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div>
                  <el-form-item label="条码编号:" prop="tmbh">
                    <el-input prefix-icon="el-icon-edit" v-model="czytj.tmbh" size="small" style="width: 150px"
                              placeholder="请输入条码编号"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
              <el-form-item>
                <el-button size="large" @click="cancelEidt">取 消</el-button>
                <el-button size="large" type="primary" @click="addCzytj('czytj')">确 定</el-button>
              </el-form-item>
            </span>
          </el-dialog>
        </div>
      </el-form>
    </el-container>
  </div>
</template>

<script>
  import ElementHeader from '../../components/Header'
  import SideBar from '../../components/SideBar'
  import StatisticsCard from '../../components/StatisticsCard'

  export default {
    name: "CzytjBasicInfo",
    data() {
      return {
        czytj: {
          // sblb: this.$store.getters.getSblb,
          sbjyh: '',
          sbzbh: '',
          qypbh: '',
          htbh: '',
          sbgzzt: '',
          gldj: '',
          azzp: '',
          azclcph: '',
          azclzbh: '',
          qypbh: '',
          qypmc: '',
          sbppdm: '',
          sbpp: '',
          sbxhdm: '',
          sbxh: '',
          qxd: '',
          cnsxts: '',
          cwsxts: '',
          sbgsjtdm: '',
          sbgsjtmc: '',
          sbgsgsdm: '',
          sbgsgsmc: '',
          sbgscddm: '',
          sbgscdmc: '',
          sbgsxldm: '',
          sbgsxlmc: '',
          sbqyrq: '',
          sbgxrq: '',
          sbbfrq: '',
          gysmc: '',
          jcsmc: '',
          tmbh: '',
          ewmbh: ''
        },
        rules: {
          sbzbh: [{required: true, message: '必填:编号', trigger: 'blur'}],
          htbh: [{required: true, message: '必填:合同编号', trigger: 'blur'}],
          sbgzzt: [{required: true, message: '必填:工作状态', trigger: 'blur'}],
          qypbh: [{required: true, message: '必填:分片编号', trigger: 'blur'}],
          qypmc: [{required: true, message: '必填:分片名称', trigger: 'blur'}],
          gldj: [{required: true, message: '必填:管理等级', trigger: 'blur'}],
          czytjPpxhOption: [{required: false, message: '必填:品牌型号', trigger: 'blur'}],
          // sbpp: [{required: true, message: '必填:品牌', trigger: 'blur'}],
          // sbxh: [{required: true, message: '必填:型号', trigger: 'blur'}],
          qxd: [{required: true, message: '必填:清晰度', trigger: 'blur'}],
          cnsxts: [{required: true, message: '必填:车内摄像头数', trigger: 'blur'}],
          cwsxts: [{required: true, message: '必填:车外摄像头数', trigger: 'blur'}],
          czytjGsOption: [{required: false, message: '必填:设备归属信息', trigger: 'blur'}],
          // sbgsjtmc: [{required: true, message: '必填:归属集团', trigger: 'blur'}],
          // sbgsgsmc: [{required: true, message: '必填:归属公司', trigger: 'blur'}],
          // sbgscdmc: [{required: true, message: '必填:归属车队', trigger: 'blur'}],
          // sbgsxlmc: [{required: true, message: '必填:归属线路', trigger: 'blur'}],
          sbqyrq: [{required: true, message: '必填:启动日期', trigger: 'blur'}],
          sbgxrq: [{required: false, message: '必填:更新日期', trigger: 'blur'}],
          sbbfrq: [{required: false, message: '必填:报废日期', trigger: 'blur'}],
          gysmc: [{required: true, message: '必填:供应商', trigger: 'blur'}],
          jcsmc: [{required: true, message: '必填:集成商', trigger: 'blur'}],
          tmbh: [{required: true, message: '必填:条码编号', trigger: 'blur'}],
          ewmbh: [{required: true, message: '必填:二维码编号', trigger: 'blur'}]
        },
        cardTitle: '上海久事一集团',
        subsidiary: this.$store.getters.getAllSubsidiary,
        totalPage: 0,
        pageSize: 10,
        currentPage: 1,
        DEVICE_LIST: this.$store.getters.getAllDeviceTypes,
        advanceSearchViewVisible: false,
        dialogVisible: false,
        tableLoading: false,
        beginDateScope: '',
        updateDateScope: '',
        endDateScope: '',
        Sbs: [],
        multipleSelection: [],
        searchUp: 'el-icon-arrow-up',
        searchDown: 'el-icon-arrow-down',
        czytjGsOption: ['', '', '', ''],
        czytjGsOptions: [],
        sbppxh: [],
        czytjPpxhOption: ['', ''],
        fileUploadBtnText: '导入数据',
        dialogTitle: '',
        gs: [],
        gldjs: [],
        sbgzzts: [],
        qypmcs: []
      }
    },
    components: {
      ElementHeader,
      SideBar,
      StatisticsCard
    },
    methods: {
      getGsSelected(data) {
        this.cardTitle = data.label
        this.getSbGsInfo(data, this.czytj.sbgsjtdm, this.czytj.sbgsgsdm, this.czytj.sbgscddm, this.czytj.sbgsxldm)
      },
      initData() {
        var _this = this
        this.getRequest('/api/Sbs/gldj').then(res => {
          if (res && res.status === 200) {
            _this.gldjs = res.data.GldjList
          }
        })
        this.getRequest('/api/Sbs/gs').then(res => {
          if (res && res.status === 200) {
            _this.gs = res.data.GsList
          }
        })
        this.czytjGsOptions = this.$store.getters.getAllSubsidiary
        this.getRequest('/api/Sbs/gzzt').then(res => {
          if (res && res.status === 200) {
            _this.sbgzzts = res.data.GzztList
          }
        })
        this.getRequest('/api/Sbs/qypmc').then(res => {
          if (res && res.status === 200) {
            _this.qypmcs = res.data.QypmcList
          }
        })
        this.getRequest('/api/Sbs/ppxh').then(res => {
          if (res && res.status === 200) {
            _this.sbppxh = res.data.PpxhList
          }
        })
      },
      qypbhChange(val) {
        if (val === '') {
          this.loadCzytjData()
        }
      },
      searchCzytj() {
        this.loadCzytjData()
      },
      cancelSearch() {
        this.advanceSearchViewVisible = false
        this.emptyCzytjData()
        this.beginDateScope = ''
        this.updateDateScope = ''
        this.endDateScope = ''
        this.loadCzytjData()
      },
      cancel_add(formName) {
        this.$refs[formName].resetFields()
        this.emptyCzytjData()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      showAdvanceSearchView() {
        this.advanceSearchViewVisible = !this.advanceSearchViewVisible
        this.czytj.qypbh = ''
        if (!this.advanceSearchViewVisible) {
          this.emptyCzytjData()
          this.beginDateScope = ''
          this.updateDateScope = ''
          this.endDateScope = ''
          this.loadCzytjData()
        }
      },
      showAddCzytjView() {
        this.dialogVisible = true
        this.dialogTitle = "添加车载一体机"
      },
      showEditCzytjView(row) {
        console.log(row)
        this.dialogVisible = true
        this.dialogTitle = "编辑车载一体机"
        this.czytj = row
        this.czytj.sbjyh = row.sbjyh
        this.czytj.sbzbh = row.sbzbh
        this.czytj.qypbh = row.qypbh
        this.czytj.htbh = row.htbh
        this.czytj.azclcph = row.azclcph
        this.czytj.azclzbh = row.azclzbh
        this.czytj.gldj = row.gldj
        this.czytj.sbppdm = row.sbppdm
        this.czytj.sbpp = row.sbpp
        this.czytj.sbxhdm = row.sbxhdm
        this.czytj.sbxh = row.sbxh
        this.czytj.qxd = row.qxd
        this.czytj.cnsxt = row.cnsxt
        this.czytj.cwsxt = row.cwsxt
        this.czytjGsOption = [row.sbgsjtdm, row.sbgsgsdm, row.sbgscddm, row.sbgsxldm]
        this.czytjPpxhOption = [row.sbppdm, row.sbxhdm]
        this.czytj.sbgsjtmc = row.sbgsjtmc
        this.czytj.sbgsgsmc = row.sbgsgsmc
        this.czytj.sbgscdmc = row.sbgscdmc
        this.czytj.sbgsxlmc = row.sbgsxlmc
        this.czytj.sbqdrq = this.formatDate(row.sbqdrq)
        this.czytj.sbgxrq = this.formatDate(row.sbgxrq)
        this.czytj.sbbfrq = this.formatDate(row.sbbfrq)
        this.czytj.gysmc = row.gysmc
        this.czytj.jcsmc = row.jcsmc
        this.czytj.tmbh = row.tmbh
        this.czytj.ewmbh = row.ewmbh
      },
      cancelEidt() {
        this.dialogVisible = false
        this.emptyCzytjData()
      },
      addCzytj(formName) {
        var _this = this
        _this.dialogVisible = true
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('czytj表单信息（先）', this.czytj)
          } else {
            return false
          }
        })
      },
      deleteCzytj(row) {
        this.$confirm('此操作将永久删除设备:车载一体机' + row.sbzbh + ', 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.doDelete(row.id)
        }).catch(() => {
        })
      },
      doDelete() {
        this.tableLoading = true;
        var _this = this;
      },
      deleteManyCzytjs() {
        this.$confirm('此操作将删除[' + this.multipleSelection.length + ']条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var ids = ''
          for (var i = 0; i < this.multipleSelection.length; i++) {
            ids += this.multipleSelection[i].id + ","
          }
          this.doDelete(ids);
        }).catch(() => {
        });
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row)
          })
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.loadCzytjData()
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        this.pageSize = val
        this.loadCzytjData()
      },
      handleChange(value) {
        this.czytj.sbgsjtdm = value[0]
        this.czytj.sbgsgsdm = value[1]
        this.czytj.sbgscddm = value[2]
      },
      handlePpxhChange(value) {
        this.czytjPpxhOption = value
        // this.getPpxhInfo(value, this.czytj.sbppdm, this.czytj.sbxhdm, this.czytj.sbpp, this.czytj.sbxh, this.sbppxh)
        // 设置代码=>dm
        this.czytj.sbppdm = value[0]
        this.czytj.sbxhdm = value[1]
        // 设置名称=>mc
        var pp = parseInt(value[0])
        var xh = parseInt(value[1])
        if (pp && xh) {
          xh = parseInt((value[1]).substring(2, 4))
          this.czytj.sbpp = this.sbppxh[pp - 1].label
          this.czytj.sbxh = this.sbppxh[pp - 1].children[xh - 1].label
        }
        // 但就是未成功修改czytj
        console.log(this.czytj)
      },
      handleGsChange(value) {
        this.czytjGsOption = value
        // 设置代码=>dm
        this.czytj.sbgsjtdm = value[0]
        this.czytj.sbgsgsdm = value[1]
        this.czytj.sbgscddm = value[2]
        this.czytj.sbgsxldm = value[3]
        // 设置名称=>mc
        var jt = parseInt(value[0])
        var gs = parseInt(value[1])
        var cd = parseInt(value[2])
        var xl = parseInt(value[3])
        if (jt && gs) {
          // console.log('集团', jt)
          gs = parseInt((value[1]).substring(2, 4))
          // console.log('公司', gs)
          if (cd) {
            cd = parseInt((value[2]).substring(4, 6))
            // console.log('车队', cd)
            if (xl) {
              xl = parseInt((value[3]).substring(6, 8))
              // console.log('线路', xl)
              this.czytj.sbgsjtmc = this.czytjGsOptions[jt - 1].label
              this.czytj.sbgsgsmc = this.czytjGsOptions[jt - 1].children[gs - 1].label
              this.czytj.sbgscdmc = this.czytjGsOptions[jt - 1].children[gs - 1].children[cd - 1].label
              this.czytj.sbgsxlmc = this.czytjGsOptions[jt - 1].children[gs - 1].children[cd - 1].children[xl - 1].label
              console.log(this.czytj)
            }
          }
        }
      },
      emptyCzytjPpxh() {
        this.czytjPpxhOption = ['', '']
      },
      emptyCzytjGs() {
        this.czytjGsOption = ['', '', '']
      },
      emptyCzytjData() {
        this.emptyCzytjGs()
        this.emptyCzytjPpxh()
        this.czytj = {
          sblb: '',
          sbzbh: '',
          qypbh: '',
          htbh: '',
          sbgzzt: '',
          qypbh: '',
          qypmc: '',
          azclcph: '',
          azclzbh: '',
          gldj: '',
          sbppdm: '',
          sbpp: '',
          sbxhdm: '',
          sbxh: '',
          qxd: '',
          cnsxt: '',
          cwsxt: '',
          sbgsjtmc: '',
          sbgsgsmc: '',
          sbgscdmc: '',
          sbgsxlmc: '',
          sbqyrq: '',
          sbgxrq: '',
          sbbfrq: '',
          gysmc: '',
          jcsmc: '',
          tmbh: '',
          ewmbh: ''
        }
      },
      loadCzytjData() {
        var _this = this
        this.tableLoading = true
        let params = {
          page: this.currentPage,
          pagePize: this.pageSize,
          qypbh: this.czytj.qypbh,
          orderItemName: '',
          order: '',
          sblb: this.czytj.sblb,
          gzzt: '',
          sbzbh: this.czytj.sbzbh,
          // 区域片编号
          qypbh: '',
          azdddm: '',
          ssxzdm: '',
          ssxzqy: '',
          zdbh: '',
          jzbh: '',
          azzp: '',
          dyxljhdm: '',
          dyxljhmc: '',
          sbxh: this.czytj.sbxh,
          sbpp: this.czytj.sbpp,
          // qxd:this.czytj.qxd,
          // cnsxt:this.czytj.cnsxt,
          // cwsxt:this.czytj.cwsxt,
          simkh: '',
          gldj: this.czytj.gldj,
          sbgsjtdm: this.czytjGsOption[0],
          sbgsjtmc: this.czytj.sbgsjtmc,
          sbgsgsdm: this.czytjGsOption[1],
          sbgsgsmc: this.czytj.sbgsgsmc,
          sbgscddm: this.czytjGsOption[2],
          sbgscdmc: this.czytj.sbgscdmc,
          // sbgsxldm: '',
          sbgsxldm: this.czytjGsOption[3],
          sbgsxlmc: this.czytj.sbgsxlmc,
          gysmc: this.czytj.gysmc,
          jcsmc: this.czytj.jcsmc,
          beginDateScope: this.beginDateScope,
          updateDateScope: this.updateDateScope,
          endDateScope: this.endDateScope
        }
        console.log('1123 本次查询参数为')
        console.log(params)
        this.getRequest('/api/czytj/basic/jt1').then(res => {
          _this.tableLoading = false
          if (res && res.status === 200) {
            _this.Sbs = res.data.CzytjList
            // totalPage会发生改变 currentPage、pageSize是向服务端发送的
            _this.totalPage = res.data.totalRow
          }
        })
      },
      importCzytjs() {
        window.open("/employee/basic/exportEmp", "_parent")
      },
      exportCzytjs() {
        window.open("/employee/basic/exportEmp", "_parent")
      }
    },
    mounted() {
      this.initData()
      this.loadCzytjData()
    }
  }
</script>

<style lang="less" scoped>
  .box-card {
    float: left;
    width: 550px;
    margin: 5px 0;
    height: 70px;
  }

  .text {
    font-size: 14px;
    line-height: 14px;
    text-align: center;
  }

  .item {
    float: left;
    margin: 11px 2px 4px 6px;
    width: 100px;
    height: 14px;
  }

  .title {
    color: #409eff;
  }

  .el-header {
    background-color: white;
    color: black;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }

  .el-dialog__body {
    padding-top: 0px;
    padding-bottom: 0px;
  }

  .slide-fade-enter-active {
    transition: all .6s ease;
  }

  .slide-fade-leave-active {
    transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
