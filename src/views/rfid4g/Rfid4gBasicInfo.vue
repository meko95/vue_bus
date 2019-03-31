<template>
  <div>
    <ElementHeader></ElementHeader>
    <el-container style="height: 707px; border: 1px solid #eee">
      <!-- Side Begin -->
      <SideBar sb-type="RFID4G"></SideBar>
      <!-- Container Begin -->
      <el-container>
        <!-- Header Begin -->
        <el-header>
          <div style="display: inline">
            <StatisticsCard s-title="上海久事一集团"></StatisticsCard>
            <el-input
              placeholder="通过分片编号查询"
              clearable
              @change="keywordsChange"
              style="width: 192px;margin-left: 10px;padding: 0;"
              size="mini"
              :disabled="advanceSearchViewVisible"
              @keyup.enter.native="searchRfid4g"
              prefix-icon="el-icon-search"
              v-model="keywords">
            </el-input>
            <div style="display: inline">
              <el-button type="primary" style="margin-left: 10px" size="mini" icon="el-icon-search"
                         @click="searchRfid4g">
                搜索
              </el-button>
              <el-button slot="reference" type="primary" size="mini" style="margin-left: 0px"
                         @click="showAdvanceSearchView">
                <i :class="[advanceSearchViewVisible ? searchUp:searchDown]"
                   style="margin-right: 5px">
                </i>高级搜索
              </el-button>
            </div>
          </div>
          <div style="display: inline">
            <el-button type="success" size="mini" @click="importRfid4gs">
              <i class="el-icon-upload2" style="margin-right: 3px"></i>导入数据
            </el-button>
            <el-button type="success" size="mini" @click="exportRfid4gs" style="margin-left: 0px">
              <i class="el-icon-download" style="margin-right: 3px"></i>导出数据
            </el-button>
          </div>
          <div style="margin-left: 7px;display: inline">
            <el-button type="primary" size="mini" icon="el-icon-plus" @click="showAddRfid4gView">添加RFID4G</el-button>
          </div>
        </el-header>
        <!-- Main Begin:高级搜索框、Table、批量删除、分页 -->
        <el-main>
          <div>
            <!-- 高级搜索 -->
            <transition name="slide-fade">
              <div
                style="margin-bottom: 10px;border: 1px solid #20a0ff;border-radius: 5px;padding: 20px 35px;box-sizing:border-box;"
                v-show="advanceSearchViewVisible">
                <el-row>
                  <el-col :span="5">
                    RFID4G编号：
                    <el-input prefix-icon="el-icon-search" v-model="rfid4g.sbzbh" size="small" style="width: 150px"
                              placeholder="设备查询编号"></el-input>
                  </el-col>
                  <el-col :span="4">
                    管理等级：
                    <el-select v-model="rfid4g.gldj" style="width: 120px" size="small" placeholder="管理等级">
                      <el-option v-for="item in gldj" :key="item.id" :label="item.descriptionZh"
                                 :value="item.descriptionZh"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    品牌：
                    <el-input prefix-icon="el-icon-search" v-model="rfid4g.sbpp" size="small" style="width: 150px"
                              placeholder="输入设备品牌"></el-input>
                  </el-col>
                  <el-col :span="5">
                    型号：
                    <el-input prefix-icon="el-icon-search" v-model="rfid4g.sbxh" size="small" style="width: 150px"
                              placeholder="输入设备型号"></el-input>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 18px">
                  <el-col :span="8">
                    启动日期：
                    <el-date-picker
                      v-model="beginDateScope"
                      unlink-panels
                      size="small"
                      type="daterange"
                      format="yyyy-MM-dd"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>
                  </el-col>
                  <el-col :span="8">
                    更新日期：
                    <el-date-picker
                      v-model="updateDateScope"
                      unlink-panels
                      size="small"
                      type="daterange"
                      format="yyyy-MM-dd"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>
                  </el-col>
                  <el-col :span="8">
                    报废日期：
                    <el-date-picker
                      v-model="endDateScope"
                      unlink-panels
                      size="small"
                      type="daterange"
                      format="yyyy-MM-dd"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 18px">
                  <el-col :span="4">
                    供应商：
                    <el-select v-model="rfid4g.gysmc" style="width: 130px" size="small" placeholder="请选择供应商">
                      <el-option v-for="item in gs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.descriptionZh"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    集成商：
                    <el-select v-model="rfid4g.jcsmc" style="width: 130px" size="small" placeholder="请选择集成商">
                      <el-option v-for="item in gs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.descriptionZh"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="8">
                    设备归属：
                    <el-cascader
                      size="small"
                      placeholder="请选择设备归属"
                      style="width:300px;"
                      expand-trigger="hover"
                      :options="rfid4gGsOptions"
                      v-model="rfid4gGsOption"
                      @change="handleChange"
                      change-on-select>
                    </el-cascader>
                  </el-col>
                  <el-col :span="6">
                    线路：
                    <el-input prefix-icon="el-icon-search" v-model="rfid4g.sbgsxlmc" size="small" style="width: 250px"
                              placeholder="输入设备线路，以中文逗号相间隔"></el-input>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 18px">
                  <el-col :span="4" :offset="21">
                    <el-button size="small" @click="cancelSearch">取消</el-button>
                    <el-button icon="el-icon-search" type="primary" size="small" @click="searchRfid4g">搜索</el-button>
                  </el-col>
                </el-row>
              </div>
            </transition>
            <!-- RFID4G基础信息Begin -->
            <el-table ref="multipleTable" :data="Sbs"
                      v-loading="tableLoading" border tooltip-effect="dark"
                      style="width: 100%;" :row-style="{'height': 0}" :cell-style="{'padding': 0}"
                      @selection-change="handleSelectionChange" stripe size="small"
                      highlight-current-row height="585"
                      :default-sort="{prop: 'sbqyrq', order: 'descending'}">
              <el-table-column type="selection" width="36" align="center"></el-table-column>
              <el-table-column prop="sbzbh" label="RFID4G编号" width="100" align="center"
                               fixed></el-table-column>
              <el-table-column prop="htbh" label="合同编号" width="85" align="center"></el-table-column>
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
              <el-table-column prop="ssxzqy" label="行政区域" width="70" align="center"></el-table-column>
              <el-table-column prop="gldj" label="管理等级" width="70" align="center"></el-table-column>
              <el-table-column prop="sbpp" label="品牌" width="70" align="center"></el-table-column>
              <el-table-column prop="sbxh" label="型号" width="70" align="center"></el-table-column>
              <el-table-column prop="sbgsjtmc" label="集团" width="110" align="center"></el-table-column>
              <el-table-column prop="sbgsgsmc" label="公司" width="90" align="center"></el-table-column>
              <el-table-column prop="sbgscdmc" label="车队" width="70" align="center"></el-table-column>
              <el-table-column prop="sbgsxlmc" label="线路" width="70" align="center"></el-table-column>
              <el-table-column prop="sbqyrq" label="启用日期" width="100" align="center" sortable>
                <template slot-scope="scope">{{ scope.row.sbqyrq | formatDate}}</template>
              </el-table-column>
              <el-table-column prop="sbgxrq" label="更新日期" width="100" align="center" sortable>
                <template slot-scope="scope">{{ scope.row.sbgxrq | formatDate}}</template>
              </el-table-column>
              <el-table-column prop="sbbfrq" label="报废日期" width="100" align="center" sortable>
                <template slot-scope="scope">{{ scope.row.sbbfrq | formatDate}}</template>
              </el-table-column>
              <el-table-column prop="gysmc" label="供应商" width="75" align="center"></el-table-column>
              <el-table-column prop="jcsmc" label="集成商" width="75" align="center"></el-table-column>
              <el-table-column prop="zdbh" label="站点编号" width="70" align="center"></el-table-column>
              <el-table-column prop="jzbh" label="基站编号" width="85" align="center"></el-table-column>
              <el-table-column prop="simkh" label="SIM卡号" width="160" align="center"></el-table-column>
              <el-table-column prop="tmbh" label="条码编号" width="100" align="center"></el-table-column>
              <el-table-column prop="ewmbh" label="二维码编号" width="100" align="center"></el-table-column>
            </el-table>
            <!-- 批量删除Begin -->
            <div style="display: flex;justify-content: flex-end;margin: 4px">
              <el-button size="small" v-if="Sbs.length>0"
                         :disabled="multipleSelection.length===0||multipleSelection.length>1"
                         @click="showEditRfid4gView(multipleSelection[0])">编辑
              </el-button>
              <el-button type="danger" size="small" v-if="Sbs.length>0" :disabled="multipleSelection.length===0"
                         @click="deleteManyRfid4gs">删除
              </el-button>
              <el-button size="small" v-if="Sbs.length>0" :disabled="multipleSelection.length===0"
                         @click="toggleSelection(multipleSelection)">
                取消选择
              </el-button>
              <el-pagination background :page-sizes="[10, 30, 50, 100]" :total="totalPage" :page-size="pageSize"
                             :current-page="currentPage"
                             @current-change="handleCurrentChange" @size-change="handleSizeChange"
                             layout="total, sizes, prev, pager, next, jumper">
              </el-pagination>
            </div>
          </div>
        </el-main>
      </el-container>
      <!-- Form Begin -->
      <el-form :model="rfid4g" :rules="rules" ref="addRfid4gForm" style="margin: 0px;padding: 0px;">
        <div style="text-align: left">
          <el-dialog :title="dialogTitle" style="padding: auto;" :close-on-click-modal="false"
                     :visible.sync="dialogVisible" width="77%" @close="cancel_add">
            <el-row style="padding-left: 100px">
              <el-col :span="7">
                <div>
                  <el-form-item label="RFID4G编号:" prop="sbzbh">
                    <el-input prefix-icon="el-icon-edit" v-model="rfid4g.sbzbh" size="small" style="width: 150px"
                              placeholder="请输入设备编号"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="8">
                <div>
                  <el-form-item label="RFID4G分片编号:" prop="qypbh">
                    <el-input prefix-icon="el-icon-edit" v-model="rfid4g.qypbh" size="small" style="width: 150px"
                              placeholder="请输入分片编号"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7">
                <div>
                  <el-form-item label="合同编号:" prop="htbh">
                    <el-input prefix-icon="el-icon-edit" v-model="rfid4g.htbh" size="small" style="width: 150px"
                              placeholder="请输入设备合同编号"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row style="padding-left: 100px">
              <el-col :span="5">
                <div>
                  <el-form-item label="管理等级:" prop="gldj">
                    <el-select v-model="rfid4g.gldj" style="width: 120px" size="small" placeholder="管理等级">
                      <el-option v-for="item in gldj" :key="item.id" :label="item.descriptionZh"
                                 :value="item.descriptionZh"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div>
                  <el-form-item label="设备品牌:" prop="sbpp">
                    <el-input prefix-icon="el-icon-edit" v-model="rfid4g.sbpp" size="small" style="width: 150px"
                              placeholder="请输入设备品牌"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div>
                  <el-form-item label="设备型号:" prop="sbxh">
                    <el-input prefix-icon="el-icon-edit" v-model="rfid4g.sbxh" size="small" style="width: 150px"
                              placeholder="请输入设备型号"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div>
                  <el-form-item label="SIM卡号:" prop="simkh">
                    <el-input prefix-icon="el-icon-edit" v-model="rfid4g.simkh" size="small" style="width: 150px"
                              placeholder="请输入SIM卡号"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row style="padding-left: 100px">
              <el-col :span="9">
                <div>
                  <el-form-item label="设备归属:" prop="rfid4gGsOption">
                    <el-cascader
                      size="small"
                      placeholder="请选择设备归属"
                      style="width:266px;"
                      expand-trigger="hover"
                      :options="rfid4gGsOptions"
                      v-model="rfid4gGsOption"
                      @change="handleChange"
                      change-on-select>
                    </el-cascader>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="8">
                <div>
                  <el-form-item label="归属线路:" prop="sbgsxlmc">
                    <el-input prefix-icon="el-icon-edit" v-model="rfid4g.sbgsxlmc" size="small" style="width: 150px"
                              placeholder="请输入归属线路"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row style="padding-left: 100px">
              <el-col :span="6">
                <div>
                  <el-form-item label="启动日期:" prop="sbqyrq">
                    <el-date-picker
                      v-model="rfid4g.sbqyrq"
                      size="small"
                      format="yyyy-MM-dd"
                      style="width: 150px"
                      type="date"
                      placeholder="启动日期">
                    </el-date-picker>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div>
                  <el-form-item label="更新日期:" prop="sbgxrq">
                    <el-date-picker
                      v-model="rfid4g.sbgxrq"
                      size="small"
                      format="yyyy-MM-dd"
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
                      v-model="rfid4g.sbbfrq"
                      size="small"
                      format="yyyy-MM-dd"
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
                    <el-select v-model="rfid4g.gysmc" style="width: 130px" size="small" placeholder="供应商">
                      <el-option v-for="item in gs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.descriptionZh"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="5">
                <div>
                  <el-form-item label="集成商:" prop="jcsmc">
                    <el-select v-model="rfid4g.jcsmc" style="width: 130px" size="small" placeholder="集成商">
                      <el-option v-for="item in gs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.descriptionZh"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row style="padding-left: 100px">
              <el-col :span="6">
                <div>
                  <el-form-item label="条码编号:" prop="tmbh">
                    <el-input prefix-icon="el-icon-edit" v-model="rfid4g.tmbh" size="small" style="width: 150px"
                              placeholder="请输入条码编号"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="8">
                <div>
                  <el-form-item label="二维码编号:" prop="ewmbh">
                    <el-input prefix-icon="el-icon-edit" v-model="rfid4g.ewmbh" size="small" style="width: 180px"
                              placeholder="请输入设备二维码编号"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
            <el-button size="large" @click="cancelEidt">取 消</el-button>
            <el-button size="large" type="primary" @click="addRfid4g('addRfid4gForm')">确 定</el-button>
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
    name: "Rfid4gBasicInfo",
    data() {
      return {
        subsidiary: this.$store.getters.getAllSubsidiary,
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        sblbdm: '',
        sbgsjtdm: '',
        sbgsgsdm: '',
        sbgscddm: '',
        sbgsxldm: '',
        totalPage: 0,
        pageSize: 10,
        currentPage: 1,
        DEVICE_LIST: this.$store.getters.getAllDeviceTypes,
        advanceSearchViewVisible: false,
        dialogVisible: false,
        tableLoading: false,
        keywords: '',
        beginDateScope: '',
        updateDateScope: '',
        endDateScope: '',
        rfid4g: {
          sbjyh: '',
          sblb: '',
          sbzbh: '',
          qypbh: '',
          htbh: '',
          gldj: '',
          sbpp: '',
          sbxh: '',
          simkh: '',
          sbgsjtdm: '',
          sbgsjtmc: '',
          sbgsgsdm: '',
          sbgsgsmc: '',
          sbgscddm: '',
          sbgscdmc: '',
          sbgsxlmc: '',
          sbqyrq: '',
          sbgxrq: '',
          sbbfrq: '',
          gysmc: '',
          jcsmc: '',
          tmbh: '',
          ewmbh: ''
        },
        Sbs: [],
        multipleSelection: [],
        searchUp: 'el-icon-arrow-up',
        searchDown: 'el-icon-arrow-down',
        rfid4gGsOption: ['', '', ''],
        rfid4gGsOptions: [],
        fileUploadBtnText: '导入数据',
        dialogTitle: '',
        gs: [],
        gsxl: [],
        gldj: [],
        rules: {
          sbzbh: [{required: true, message: '必填:编号', trigger: 'blur'}],
          qypbh: [{required: true, message: '必填:分片编号', trigger: 'blur'}],
          htbh: [{required: true, message: '必填:合同编号', trigger: 'blur'}],
          gldj: [{required: true, message: '必填:管理等级', trigger: 'change'}],
          sbpp: [{required: true, message: '必填:品牌', trigger: 'blur'}],
          sbxh: [{required: true, message: '必填:型号', trigger: 'blur'}],
          simkh: [{required: true, message: '必填:SIM卡号', trigger: 'blur'}],
          sbgsjtmc: [{required: true, message: '必填:归属集团', trigger: 'change'}],
          sbgsgsmc: [{required: true, message: '必填:归属公司', trigger: 'change'}],
          sbgscdmc: [{required: true, message: '必填:归属车队', trigger: 'change'}],
          sbgsxlmc: [{required: true, message: '必填:归属线路', trigger: 'blur'}],
          sbqyrq: [{required: true, message: '必填:启动日期', trigger: 'blur'}],
          sbgxrq: [{required: false, message: '必填:更新日期', trigger: 'blur'}],
          sbbfrq: [{required: false, message: '必填:报废日期', trigger: 'blur'}],
          gysmc: [{required: true, message: '必填:供应商', trigger: 'change'}],
          jcsmc: [{required: true, message: '必填:集成商', trigger: 'blur'}],
          tmbh: [{required: true, message: '必填:条码编号', trigger: 'blur'}],
          ewmbh: [{required: true, message: '必填:二维码编号', trigger: 'blur'}]
        }
      }
    },
    components: {
      ElementHeader,
      SideBar,
      StatisticsCard
    },
    methods: {
      handleNodeClick(data) {
        console.log(data.id)
      },
      initData() {
        var _this = this
        this.gsxl = [
          {id: 1, name: '1001'},
          {id: 2, name: 'B支4'},
          {id: 3, name: '上南路西'}
        ]
        // 获取管理等级字典
        this.getRequest('/api/dictionary?pCode=6').then(res => {
          if (res && res.status === 200) {
            console.log(res.data.data.list)
            _this.gldj = res.data.data.list
          }
        })
        // 获取公司字典
        this.getRequest('/api/dictionary?pCode=2').then(res => {
          if (res && res.status === 200) {
            _this.gs = res.data.data.list
          }
        })
        this.rfid4gGsOptions = [
          {
            value: '01',
            label: '上海久事一集团',
            children: [
              {
                value: '0101',
                label: '巴士一公司',
                children: [
                  {
                    value: '010101',
                    label: '一车队'
                  },
                  {
                    value: '010102',
                    label: '二车队'
                  },
                  {
                    value: '010103',
                    label: '三车队'
                  }
                ]
              },
              {
                value: '0102',
                label: '巴士二公司',
                children: [
                  {
                    value: '010201',
                    label: '1车队'
                  },
                  {
                    value: '010202',
                    label: '2车队'
                  },
                  {
                    value: '010203',
                    label: '3车队'
                  }
                ]
              },
              {
                value: '0103',
                label: '巴士三公司',
                children: [
                  {
                    value: '010301',
                    label: '壹车队'
                  },
                  {
                    value: '010302',
                    label: '贰车队'
                  },
                  {
                    value: '010303',
                    label: '叁车队'
                  }
                ]
              }
            ]
          },
          {
            value: '02',
            label: '上海久事二集团',
            children: [
              {
                value: '0201',
                label: '巴士1公司',
                children: [
                  {
                    value: '020101',
                    label: '一车队'
                  },
                  {
                    value: '020102',
                    label: '二车队'
                  },
                  {
                    value: '020103',
                    label: '三车队'
                  }
                ]
              },
              {
                value: '0202',
                label: '巴士2公司',
                children: [
                  {
                    value: '020201',
                    label: '1车队'
                  },
                  {
                    value: '020202',
                    label: '2车队'
                  },
                  {
                    value: '020203',
                    label: '3车队'
                  }
                ]
              },
              {
                value: '0203',
                label: '巴士3公司',
                children: [
                  {
                    value: '020301',
                    label: '壹车队'
                  },
                  {
                    value: '020302',
                    label: '贰车队'
                  },
                  {
                    value: '020303',
                    label: '叁车队'
                  }
                ]
              }
            ]
          },
          {
            value: '03',
            label: '上海久事三集团',
            children: [
              {
                value: '0301',
                label: '巴士壹公司',
                children: [
                  {
                    value: '030101',
                    label: '一车队'
                  },
                  {
                    value: '030102',
                    label: '二车队'
                  },
                  {
                    value: '030103',
                    label: '三车队'
                  }
                ]
              },
              {
                value: '0302',
                label: '巴士贰公司',
                children: [
                  {
                    value: '030201',
                    label: '1车队'
                  },
                  {
                    value: '030202',
                    label: '2车队'
                  },
                  {
                    value: '030203',
                    label: '3车队'
                  }
                ]
              },
              {
                value: '0303',
                label: '巴士叁公司',
                children: [
                  {
                    value: '030301',
                    label: '壹车队'
                  },
                  {
                    value: '030302',
                    label: '贰车队'
                  },
                  {
                    value: '030303',
                    label: '叁车队'
                  }
                ]
              }
            ]
          }
        ]
      },
      keywordsChange(val) {
        if (val == '') {
          this.loadRfid4gData()
        }
      },
      searchRfid4g() {
        this.loadRfid4gData()
      },
      cancelSearch() {
        this.advanceSearchViewVisible = false
        this.emptyRfid4gData()
        this.beginDateScope = ''
        this.updateDateSope = ''
        this.endDateScope = ''
        this.loadRfid4gData()
      },
      cancel_add() {
        this.emptyRfid4gData()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
        console.log('选中项', val)
      },
      // 高级搜索的取消
      showAdvanceSearchView() {
        this.advanceSearchViewVisible = !this.advanceSearchViewVisible
        this.keywords = ''
        if (!this.advanceSearchViewVisible) {
          this.emptyRfid4gData()
          this.beginDateScope = ''
          this.updateDateSope = ''
          this.endDateScope = ''
          this.loadRfid4gData()
        }
      },
      showAddRfid4gView() {
        this.dialogVisible = true
        this.dialogTitle = "添加RFID4G"
      },
      showEditRfid4gView(row) {
        console.log(row)
        this.dialogVisible = true
        this.dialogTitle = "编辑RFID4G"
        this.rfid4g = row
        this.rfid4g.sbjyh = row.sbjyh
        this.rfid4g.sbzbh = row.sbzbh
        this.rfid4g.qypbh = row.qypbh
        this.rfid4g.htbh = row.htbh
        this.rfid4g.gldj = row.gldj
        this.rfid4g.sbpp = row.sbpp
        this.rfid4g.sbxh = row.sbxh
        this.rfid4g.simkh = row.simkh
        // 显示时名称，查询时代码
        this.rfid4gGsOption = [row.sbgsjtdm, row.sbgsgsdm, row.sbgscddm]
        this.rfid4g.sbgsjtmc = row.sbgsjtmc
        this.rfid4g.sbgsgsmc = row.sbgsgsmc
        this.rfid4g.sbgscdmc = row.sbgscdmc
        this.rfid4g.sbgsxlmc = row.sbgsxlmc
        this.rfid4g.sbqdrq = this.formatDate(row.sbqdrq)
        this.rfid4g.sbgxrq = this.formatDate(row.sbgxrq)
        this.rfid4g.sbbfrq = this.formatDate(row.sbbfrq)
        this.rfid4g.gysmc = row.gysmc
        this.rfid4g.jcsmc = row.jcsmc
        this.rfid4g.tmbh = row.tmbh
        this.rfid4g.ewmbh = row.ewmbh
      },
      // 添加员工信息的取消按钮
      cancelEidt() {
        this.dialogVisible = false
        this.emptyRfid4gData()
      },
      addRfid4g(formName) {
        var _this = this
        _this.dialogVisible = true
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // this.rfid4g.sbzbh 判断唯一性 存在则edit后更新 不存在则add
            // this.rfid4g.sbzbh刚刚填写的肯定存在true永远执行不到下一步
            // 但是基因号是在新增时临时生成可通过其作为判断
            console.log(this.rfid4g.sbjyh)
            if (this.rfid4g.sbjyh) {
              // Edit
              this.putRequest('/api/sb/rfid4g', this.rfid4g).then(res => {
                if (res && res.status == 200) {
                  console.log('没有执行到此')
                  this.loadRfid4gData()
                }
              })
            } else {
              // Add
              this.tableLoading = true
              this.rfid4g.sbjyh = Date.now().toString()
              this.postRequest('/api/sb/rfid4g', this.rfid4g).then(res => {
                _this.tableLoading = false
                _this.dialogVisible = false
                if (res && res.status == 200) {
                  this.loadRfid4gData()
                }
              })
            }
          } else {
            return false
          }
        })
      },
      deleteRfid4g(row) {
        this.$confirm('此操作将永久删除设备：RFID4G' + row.sbzbh + ', 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.doDelete(row.sbjyh)
        }).catch(() => {
        })
      },
      doDelete(ids) {
        this.tableLoading = true;
        var _this = this
        this.deleteRequest('/api/sb/rfid4g?sbjyh=' + ids).then(res => {
          _this.tableLoading = false
          if (res && res.status == 200) {
            _this.Sbs = res.data.data.list
            _this.emptyRfid4gData()
            _this.loadRfid4gData()
          }
        })
      },
      deleteManyRfid4gs() {
        this.$confirm('此操作将删除[' + this.multipleSelection.length + ']条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var ids = ''
          for (var i = 0; i < this.multipleSelection.length; i++) {
            ids += this.multipleSelection[i].sbjyh + ","
          }
          console.log(ids)
          this.doDelete(ids)
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
        this.loadRfid4gData()
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        this.pageSize = val
        this.loadRfid4gData()
      },
      handleChange(value) {
        // 设置代码
        console.log(value)
        this.rfid4g.sbgsjtdm = value[0]
        this.rfid4g.sbgsgsdm = value[1]
        this.rfid4g.sbgscddm = value[2]
        // 设置名称
        var jt = parseInt(value[0])
        var gs = parseInt(value[1])
        var cd = parseInt(value[2])
        if (jt && gs) {
          console.log('集团', jt)
          gs = parseInt((value[1]).substring(2, 4))
          console.log('公司', gs)
          if (cd) {
            cd = parseInt((value[2]).substring(4, 6))
            console.log('车队', cd)
            this.rfid4g.sbgsjtmc = this.rfid4gGsOptions[jt - 1].label
            this.rfid4g.sbgsgsmc = this.rfid4gGsOptions[jt - 1].children[gs - 1].label
            this.rfid4g.sbgscdmc = this.rfid4gGsOptions[jt - 1].children[gs - 1].children[cd - 1].label
          }
        }
      },
      emptyRfid4gGs() {
        this.rfid4gGsOption = ['', '', '']
      },
      // 清空rfid4g表单填写信息
      emptyRfid4gData() {
        this.emptyRfid4gGs()
        this.rfid4g = {
          // 设备基因号固定不可修改
          sbjyh: '',
          sblb: '',
          sbzbh: '',
          qypbh: '',
          htbh: '',
          gldj: '',
          sbpp: '',
          sbxh: '',
          simkh: '',
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
      /* 分页处理 pageSize currentPage 发生变化时向服务器发送 */
      // 根据所有可缺省参数向服务器请求数据
      loadRfid4gData() {
        var _this = this
        this.tableLoading = true
        let params = {
          page: this.currentPage,
          size: this.pageSize,
          keywords: this.keywords,
          orderItemName: '',
          order: '',
          sbjyh: this.rfid4g.sbjyh,
          sblb: this.rfid4g.sblb,
          // gzzt: '',
          sbzbh: this.rfid4g.sbzbh,
          qypbh: this.rfid4g.qypbh,
          // azdddm: '',
          // ssxzdm: '',
          // ssxzqy: '',
          // zdbh: '',
          // jzbh: '',
          // azzp: '',
          // dyxljhdm: '',
          // dyxljhmc: '',
          sbxh: this.rfid4g.sbxh,
          sbpp: this.rfid4g.sbpp,
          simkh: this.rfid4g.simkh,
          gldj: this.rfid4g.gldj,
          sbgsjtdm: this.rfid4gGsOption[0],
          sbgsjtmc: this.rfid4g.sbgsjtmc,
          sbgsgsdm: this.rfid4gGsOption[1],
          sbgsgsmc: this.rfid4g.sbgsgsmc,
          sbgscddm: this.rfid4gGsOption[2],
          sbgscdmc: this.rfid4g.sbgscdmc,
          // sbgsxldm: '',
          sbgsxlmc: this.rfid4g.sbgsxlmc,
          // gysdm: '',
          gysmc: this.rfid4g.gysmc,
          // jcsdm: '',
          jcsmc: this.rfid4g.jcsmc,
          // beginDateScope: 'date_sbqyrq_' + this.formatDate(this.beginDateScope[0]) + '_' + this.formatDate(this.beginDateScope[1]),
          // updateDateScope: 'date_sbgxrq_' + this.formatDate(this.updateDateScope[0]) + '_' + this.formatDate(this.updateDateScope[1]),
          // endDateScope: 'date_sbbfrq_' + this.formatDate(this.endDateScope[0]) + '_' + this.formatDate(this.endDateScope[1])
          beginDateScope: this.beginDateScope,
          updateDateScope: this.updateDateSope,
          endDateScope: this.endDateScope
        }
        // console.log(params.beginDateScope) // 数组 Date类型
        // console.log(this.formatDate(params.beginDateScope[0])) // 2019-03-15

        // this.getRequest('/api/sb/rfid4g', params).then(res => {
        //   _this.tableLoading = false
        //   if (res && res.status === 200) {
        //     _this.Sbs = res.data.data.list
        //     // totalRow会发生改变 currentPage、pageSize是向服务端发送的
        //     _this.totalPage = res.data.data.total
        //   }
        // })
        this.getRequest('/api/rfid4g/basic/jt1').then(res=>{
          _this.tableLoading = false
          if (res && res.status === 200) {
              _this.Sbs = res.data.Rfid4gList
              // totalRow会发生改变 currentPage、pageSize是向服务端发送的
              _this.totalPage = res.data.totalRow
            }
        })
      },
      loadSbBasicInfo(type, jtdm, gsdm, cddm, xldm) {
        var _this = this
        this.tableLoading = true
        if (xldm != '') {
          this.getRequest('/api/sb/' + type + '?jtdm=' + jtdm + '&gsdm=' + gsdm + '&cddm=' + cddm + '&xldm=' + xldm).then(res => {
            _this.tableLoading = false
            if (res && res.status === 200) {
              _this.Sbs = res.data.data.list // 9类设备基本基本基本基本信息
              _this.totalPage = res.data.data.total
            }
          })
        } else {
          this.getRequest('/api/sb/' + type + '?jtdm=' + jtdm + '&gsdm=' + gsdm + '&cddm=' + cddm).then(res => {
            _this.tableLoading = false
            if (res && res.status === 200) {
              // _this.count = res.data.data.countData // 公司、车队、线路统计统计统计统计信息
              _this.totalPage = res.data.data.total
            }
          })
        }
      },
      exportRfid4gs() {
        window.open("/employee/basic/exportEmp", "_parent")
      },
      importRfid4gs() {
        window.open("/employee/basic/importEmp", "_parent")
      }
    },
    mounted() {
      this.initData()
      this.loadRfid4gData()
    },
    watch: {
      '$route'(to, from) {
        switch ((to.path)) {
          case '/rfid4g/jt1':

            break
          case '/rfid4g/jt2':

            break
          //  ...
        }
      }
    }
  }
</script>
<style scoped>
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
    transition: all .8s ease;
  }

  .slide-fade-leave-active {
    transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
