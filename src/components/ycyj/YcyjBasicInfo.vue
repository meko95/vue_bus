<template>
  <div>
    <ElementHeader></ElementHeader>
    <div id="title">
      一程一检基本信息
    </div>
    <el-container>
      <el-header style="padding: 0px;display:flex;justify-content:space-between;align-items: center">
        <div style="display: inline">
          <el-input
            placeholder="通过分片编号查询"
            clearable
            @change="keywordsChange"
            style="width: 300px;margin-left: 56px;padding: 0;"
            size="mini"
            :disabled="advanceSearchViewVisible"
            @keyup.enter.native="searchYcyj"
            prefix-icon="el-icon-search"
            v-model="keywords">
          </el-input>
          <el-select v-model="ycyj.sblb" size="mini" style="width: 200px;margin-left: 20px;padding: 0;" clearable
                     placeholder="通过设备类别查询">
            <el-option
              v-for="item in DEVICE_LIST"
              :key="item.text"
              :label="item.text"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button type="primary" style="margin-left: 10px" size="mini" icon="el-icon-search" @click="searchYcyj">
            搜索
          </el-button>
          <el-button slot="reference" type="primary" size="mini" style="margin-left: 10px"
                     @click="showAdvanceSearchView">
            <i class="fa fa-lg" :class="[advanceSearchViewVisible ? faangledoubleup:faangledoubledown]"
               style="margin-right: 5px">
            </i>高级搜索
          </el-button>
        </div>

        <div style="margin-left: 5px;margin-right: 20px;display: inline">
          <el-button type="success" size="mini" @click="exportYcyjs">
            <i class="fa fa-lg fa-level-down" style="margin-right: 10px"></i>导出数据
          </el-button>
          <el-button type="primary" size="mini" icon="el-icon-plus" @click="showAddYcyjView">添加一程一检
          </el-button>
        </div>

      </el-header>
      <el-main style="padding-left: 20px;padding-top: 0">
        <div>
          <!-- 高级搜索 -->
          <transition name="slide-fade">
            <div
              style="margin-bottom: 10px;border: 1px solid #20a0ff;border-radius: 5px;padding: 20px 35px;box-sizing:border-box;"
              v-show="advanceSearchViewVisible">
              <el-row>
                <el-col :span="5">
                  一程一检编号：
                  <el-input prefix-icon="el-icon-search" v-model="ycyj.sbzbh" size="small" style="width: 150px"
                            placeholder="设备查询编号"></el-input>
                </el-col>
                <el-col :span="4">
                  管理等级：
                  <el-select v-model="ycyj.gldj" style="width: 100px" size="small" placeholder="管理等级">
                    <el-option v-for="item in gldj" :key="item.id" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="4">
                  品牌：
                  <el-select v-model="ycyj.sbpp" style="width: 130px" size="small" placeholder="请选择品牌">
                    <el-option v-for="item in pp" :key="item.id" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="5">
                  型号:
                  <el-select v-model="ycyj.sbxh" style="width: 130px" size="small" placeholder="请选择型号">
                    <el-option v-for="item in xh" :key="item.id" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-col>
              </el-row>
              <el-row style="margin-top: 18px">
                <el-col :span="8">
                  启动日期:
                  <el-date-picker
                    v-model="dateScope"
                    unlink-panels
                    size="small"
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </el-col>
                <el-col :span="8">
                  更新日期:
                  <el-date-picker
                    v-model="dateScope"
                    unlink-panels
                    size="small"
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </el-col>
                <el-col :span="8">
                  报废日期:
                  <el-date-picker
                    v-model="dateScope"
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
                <el-col :span="4">
                  供应商:
                  <el-select v-model="ycyj.gysmc" style="width: 130px" size="small" placeholder="请选择供应商">
                    <el-option
                      v-for="item in gys"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="4">
                  集成商:
                  <el-select v-model="ycyj.jcsmc" style="width: 130px" size="small" placeholder="请选择集成商">
                    <el-option
                      v-for="item in jcs"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="8">
                  设备归属：
                  <el-cascader
                    size="small"
                    placeholder="请选择设备归属"
                    style="width:300px;"
                    expand-trigger="hover"
                    :options="ycyjGsOptions"
                    v-model="ycyjGsOption"
                    @change="handleChange"
                    change-on-select
                  >
                  </el-cascader>
                </el-col>
                <el-col :span="6">
                  线路：
                  <el-input prefix-icon="el-icon-search" v-model="ycyj.sbgsxlmc" size="small" style="width: 250px"
                            placeholder="输入设备线路，以中文逗号相间隔"></el-input>
                </el-col>
              </el-row>
              <el-row style="margin-top: 18px">
                <el-col :span="4" :offset="21">
                  <el-button size="small" @click="cancelSearch">取消</el-button>
                  <el-button icon="el-icon-search" type="primary" size="small" @click="searchYcyj">搜索</el-button>
                </el-col>
              </el-row>
            </div>
          </transition>
          <!-- RFID基础信息Begin -->
          <el-table ref="multipleTable" :data="ycyjs" v-loading="tableLoading" border tooltip-effect="dark"
                    style="width: 100%;" @selection-change="handleSelectionChange" stripe size="small" height="490"
                    :default-sort="{prop: 'sbqyrq', order: 'descending'}">
            <el-table-column type="selection" width="36" align="center"></el-table-column>
            <el-table-column prop="sbzbh" label="一程一检编号" width="130" align="center" fixed></el-table-column>
            <el-table-column prop="qypbh" label="分片编号" width="85" align="center" ></el-table-column>
            <el-table-column prop="htbh" label="合同编号" width="90" align="center"></el-table-column>
            <el-table-column prop="gldj" label="管理等级" width="85" align="center"></el-table-column>
            <el-table-column prop="sbpp" label="品牌" width="70" align="center"></el-table-column>
            <el-table-column prop="sbxh" label="型号" width="50" align="center"></el-table-column >
            <el-table-column prop="simkh" label="SIM卡号" width="110" align="center"></el-table-column>
            <el-table-column prop="sbgsjtmc" label="集团" width="100" align="center"></el-table-column>
            <el-table-column prop="sbgsgsmc" label="公司" width="180" align="center"></el-table-column>
            <el-table-column prop="sbgscdmc" label="车队" width="100" align="center"></el-table-column>
            <el-table-column prop="sbgszdmc" label="站点" width="100" align="center"></el-table-column>
            <el-table-column prop="sbgsxlmc" label="线路" width="220" align="center"></el-table-column>
            <el-table-column prop="sbqyrq" label="启用日期" width="115" align="center" sortable>
              <!--<template slot-scope="scope">{{ scope.row.sbqyrq | formatDate}}</template>-->
            </el-table-column>
            <el-table-column prop="sbgxrq" label="更新日期" width="115" align="center" sortable>
              <!--<template slot-scope="scope">{{ scope.row.sbgxrq | formatDate}}</template>-->
            </el-table-column>
            <el-table-column prop="sbbfrq" label="报废日期" width="115" align="center" sortable>
              <!--<template slot-scope="scope">{{ scope.row.sbbfrq | formatDate}}</template>-->
            </el-table-column>
            <el-table-column prop="gysmc" label="供应商" width="100" align="center">
            </el-table-column>
            <el-table-column prop="jcsmc" label="集成商" width="100" align="center">
            </el-table-column>
            <el-table-column prop="tmbh" label="条码编号" width="100" align="center"></el-table-column>
            <el-table-column prop="ewmbh" label="二维码编号" width="100" align="center"></el-table-column>
            <el-table-column fixed="right" label="操作" width="195" align="center">
              <template slot-scope="scope">
                <el-button @click="showEditYcyjView(scope.row)" style="padding: 5px 10px;margin: 6px"
                           size="large">编辑
                </el-button>
                <el-button type="danger" style="padding: 5px 10px;margin: 6px" size="large"
                           @click="deleteYcyj(scope.row)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- RFID基础信息End -->
          <!-- 批量删除及分页Begin -->
          <div style="display: flex;justify-content: space-between;margin: 2px">
            <el-button type="danger" size="small" v-if="ycyjs.length>0" :disabled="multipleSelection.length==0"
                       @click="deleteManyYcyjs">批量删除
            </el-button>
            <el-button size="small" :disabled="multipleSelection.length==0" @click="toggleSelection(multipleSelection)">
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

    <!-- 添加RFID4G信息Begin -->
    <el-form :model="ycyj" :rules="rules" ref="addYcyjForm" style="margin: 0px;padding: 0px;">
      <div style="text-align: left">
        <el-dialog :title="dialogTitle" style="padding: auto;" :close-on-click-modal="false"
                   :visible.sync="dialogVisible" width="77%">
          <el-row style="padding-left: 100px">
            <el-col :span="7">
              <div>
                <el-form-item label="一程一检编号:" prop="sbzbh">
                  <el-input prefix-icon="el-icon-edit" v-model="ycyj.sbzbh" size="small" style="width: 150px"
                            placeholder="请输入设备编号"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-form-item label="一程一检分片编号:" prop="qypbh">
                  <el-input prefix-icon="el-icon-edit" v-model="ycyj.qypbh" size="small" style="width: 150px"
                            placeholder="请输入分片编号"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div>
                <el-form-item label="合同编号:" prop="htbh">
                  <el-input prefix-icon="el-icon-edit" v-model="ycyj.htbh" size="small" style="width: 150px"
                            placeholder="请输入设备合同编号"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row style="padding-left: 100px">
            <el-col :span="4">
              <div>
                <el-form-item label="管理等级:" prop="gldj">
                  <el-select v-model="ycyj.gldj" style="width: 60px" size="small" placeholder="管理等级">
                    <el-option v-for="item in gldj" :key="item.id" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="5">
              <div>
                <el-form-item label="设备品牌:" prop="sbpp">
                  <el-select v-model="ycyj.sbpp" style="width: 100px" size="small" placeholder="设备品牌">
                    <el-option v-for="item in pp" :key="item.id" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-form-item label="设备型号:" prop="sbxh">
                  <el-select v-model="ycyj.sbxh" style="width: 140px" size="small" placeholder="设备型号">
                    <el-option v-for="item in xh" :key="item.id" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-form-item label="SIM卡号:" prop="simkh">
                  <el-input prefix-icon="el-icon-edit" v-model="ycyj.simkh" size="small" style="width: 150px"
                            placeholder="请输入SIM卡号"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row style="padding-left: 100px">
            <el-col :span="9">
              <div>
                <el-form-item label="设备归属:" prop="ycyjGsOption">
                  <el-cascader
                    size="small"
                    placeholder="请选择设备归属"
                    style="width:266px;"
                    expand-trigger="hover"
                    :options="ycyjGsOptions"
                    v-model="ycyjGsOption"
                    @change="handleChange"
                    change-on-select>
                  </el-cascader>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-form-item label="归属线路:" prop="sbgsxlmc">
                  <el-input prefix-icon="el-icon-edit" v-model="ycyj.sbgsxlmc" size="small" style="width: 150px"
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
                    v-model="ycyj.sbqyrq"
                    size="small"
                    value-format="yyyy-MM-dd HH:mm:ss"
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
                    v-model="ycyj.sbgxrq"
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
                    v-model="ycyj.sbbfrq"
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
                  <el-select v-model="ycyj.gysmc" style="width: 130px" size="small" placeholder="供应商">
                    <el-option v-for="item in gys" :key="item.id" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="5">
              <div>
                <el-form-item label="集成商:" prop="jcsmc">
                  <el-select v-model="ycyj.jcsmc" style="width: 130px" size="small" placeholder="集成商">
                    <el-option v-for="item in jcs" :key="item.id" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row style="padding-left: 100px">
            <el-col :span="6">
              <div>
                <el-form-item label="条码编号:" prop="tmbh">
                  <el-input prefix-icon="el-icon-edit" v-model="ycyj.tmbh" size="small" style="width: 150px"
                            placeholder="请输入条码编号"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-form-item label="二维码编号:" prop="ewmbh">
                  <el-input prefix-icon="el-icon-edit" v-model="ycyj.ewmbh" size="small" style="width: 180px"
                            placeholder="请输入设备二维码编号"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <span slot="footer" class="dialog-footer">
            <el-button size="large" @click="cancelEidt">取 消</el-button>
            <el-button size="large" type="primary" @click="addYcyj('addYcyjForm')">确 定</el-button>
          </span>
        </el-dialog>

      </div>
    </el-form>
  </div>
</template>

<script>
  import ElementHeader from '../ElementHeader'

  export default {
    name: "YcyjBasicInfo",
    data() {
      return {
        totalPage: 100,
        pageSize: 10,
        currentPage: 1,
        DEVICE_LIST: this.$store.getters.getAllDeviceTypes,
        advanceSearchViewVisible: false,
        dialogVisible:false,
        tableLoading: false,
        keywords: '',
        dateScope: '',
        ycyj: {
          sblb: this.$store.getters.getSblb,
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
          sbgszdmc:'',
          sbqyrq: '',
          sbgxrq: '',
          sbbfrq: '',
          gysmc: '',
          jcsmc: '',
          tmbh: '',
          ewmbh: ''
        },
        ycyjs: [],
        multipleSelection: [],
        faangledoubleup: 'fa-angle-double-up',
        faangledoubledown: 'fa-angle-double-down',
        ycyjGsOption: ['', '', ''],
        ycyjGsOptions: [],
        fileUploadBtnText: '导入数据',
        dialogTitle: '',
        xh: [],
        pp: [],
        gldj: [],
        gys: [],
        jcs: [],
        gsxl: [],
        rules: {
          sbzbh: [{required: true, message: '必填:编号', trigger: 'blur'}],
          qypbh: [{required: true, message: '必填:分片编号', trigger: 'blur'}],
          htbh: [{required: true, message: '必填:合同编号', trigger: 'blur'}],
          gldj: [{required: true, message: '必填:管理等级', trigger: 'blur'}],
          sbpp: [{required: true, message: '必填:品牌', trigger: 'blur'}],
          sbxh: [{required: true, message: '必填:型号', trigger: 'blur'}],
          simkh: [{required: true, message: '必填:SIM卡号', trigger: 'blur'}],
          ycyjGsOption: [{required: true, message: '必填:设备归属信息', trigger: 'blur'}],
          sbgsjtmc: [{required: true, message: '必填:归属集团', trigger: 'blur'}],
          sbgsgsmc: [{required: true, message: '必填:归属公司', trigger: 'blur'}],
          sbgscdmc: [{required: true, message: '必填:归属车队', trigger: 'blur'}],
          sbgsxlmc: [{required: true, message: '必填:归属线路', trigger: 'blur'}],
          sbqyrq: [{required: true, message: '必填:启动日期', trigger: 'blur'}],
          sbgxrq: [{required: false, message: '必填:更新日期', trigger: 'blur'}],
          sbbfrq: [{required: false, message: '必填:报废日期', trigger: 'blur'}],
          gysmc: [{required: true, message: '必填:供应商', trigger: 'blur'}],
          jcsmc: [{required: true, message: '必填:集成商', trigger: 'blur'}],
          tmbh: [{required: true, message: '必填:条码编号', trigger: 'blur'}],
          ewmbh: [{required: true, message: '必填:二维码编号', trigger: 'blur'}]
        }
      }
    },
    components: {
      ElementHeader
    },
    methods: {
      initData() {
        this.gsxl = [
          {id: 1, name: '1001'},
          {id: 2, name: 'B支4'},
          {id: 3, name: '上南路西'}
        ]
        this.gys = [
          {id: 1, name: '澳马公司'},
          {id: 2, name: '中安科技'},
          {id: 3, name: '强生科技'},
          {id: 4, name: '新新媒体'}
        ]
        this.jcs = [
          {id: 1, name: '澳马公司'},
          {id: 2, name: '中安科技'},
          {id: 3, name: '强生科技'},
          {id: 4, name: '新新媒体'}
        ]
        this.xh = [
          {id: 1, name: 'Z-SO31-4105'},
          {id: 2, name: 'Z-SO31-4106'},
          {id: 3, name: 'Z-SO31-4107'}
        ]
        this.pp = [
          {id: 1, name: '索尼'},
          {id: 2, name: '联想'},
          {id: 3, name: '戴尔'}
        ]
        this.gldj = [
          {id: 1, name: 'A'},
          {id: 2, name: 'B'},
          {id: 3, name: 'C'}
        ]
        // 清晰度 标清高清 带与不带？？？？？
        this.ycyjGsOptions = [
          {
            value: '01',
            label: '上海久事一集团',
            children: [
              {
                value: '01001',
                label: '巴士一公司',
                children: [
                  {
                    value: '0100101',
                    label: '一车队'
                  },
                  {
                    value: '0100102',
                    label: '二车队'
                  },
                  {
                    value: '0100103',
                    label: '三车队'
                  }
                ]
              },
              {
                value: '01002',
                label: '巴士二公司',
                children: [
                  {
                    value: '0100201',
                    label: '1车队'
                  },
                  {
                    value: '0100202',
                    label: '2车队'
                  },
                  {
                    value: '0100203',
                    label: '3车队'
                  }
                ]
              },
              {
                value: '01003',
                label: '巴士三公司',
                children: [
                  {
                    value: '0100301',
                    label: '壹车队'
                  },
                  {
                    value: '0100302',
                    label: '贰车队'
                  },
                  {
                    value: '0100303',
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
                value: '02001',
                label: '巴士1公司',
                children: [
                  {
                    value: '0200101',
                    label: '一车队'
                  },
                  {
                    value: '0200102',
                    label: '二车队'
                  },
                  {
                    value: '0200103',
                    label: '三车队'
                  }
                ]
              },
              {
                value: '02002',
                label: '巴士2公司',
                children: [
                  {
                    value: '0200201',
                    label: '1车队'
                  },
                  {
                    value: '0200202',
                    label: '2车队'
                  },
                  {
                    value: '0200203',
                    label: '3车队'
                  }
                ]
              },
              {
                value: '02003',
                label: '巴士3公司',
                children: [
                  {
                    value: '0200301',
                    label: '壹车队'
                  },
                  {
                    value: '0200302',
                    label: '贰车队'
                  },
                  {
                    value: '0200303',
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
                value: '03001',
                label: '巴士壹公司',
                children: [
                  {
                    value: '0300101',
                    label: '一车队'
                  },
                  {
                    value: '0300102',
                    label: '二车队'
                  },
                  {
                    value: '0300103',
                    label: '三车队'
                  }
                ]
              },
              {
                value: '03002',
                label: '巴士贰公司',
                children: [
                  {
                    value: '0300201',
                    label: '1车队'
                  },
                  {
                    value: '0300202',
                    label: '2车队'
                  },
                  {
                    value: '0300203',
                    label: '3车队'
                  }
                ]
              },
              {
                value: '03003',
                label: '巴士叁公司',
                children: [
                  {
                    value: '0300301',
                    label: '壹车队'
                  },
                  {
                    value: '0300302',
                    label: '贰车队'
                  },
                  {
                    value: '0300303',
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
      searchYcyj() {
        const device_type = parseInt(this.ycyj.sblb)
        if (device_type === 6) {
          this.loadYcyjData()
          return
        }
        switch (device_type) {
          case 1:
            this.$router.push('/bus/basicdata/getRfid4gBasicInfo')
            break
          case 2:
            this.$router.push('/bus/basicdata/getRfid4gczBasicInfo')
            break
          case 3:
            this.$router.push('/bus/basicdata/getClbqBasicInfo')
            break
          case 4:
            this.$router.push('/bus/basicdata/getCzytjBasicInfo')
            break
          case 5:
            this.$router.push('/bus/basicdata/getBdjBasicInfo')
            break
          case 6:
            this.$router.push('/bus/basicdata/getYcyjBasicInfo')
            break
          case 7:
            this.$router.push('/bus/basicdata/getZdtBasicInfo')
            break
          case 8:
            this.$router.push('/bus/basicdata/getFfcpBasicInfo')
            break
          case 9:
            this.$router.push('/bus/basicdata/getZgybpBasicInfo')
            break
          default:
            this.loadYcyjData()
        }
      },
      cancelSearch() {
        this.advanceSearchViewVisible = false
        this.emptyYcyjData()
        this.emptyYcyjGs()
        this.dateScope = ''
        this.loadYcyjData()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      showAddYcyjView() {
        this.dialogVisible = true
        this.dialogTitle = "添加一程一检"
        // var _this = this;
        console.log('添加一程一检设备')
        // this.getRequest("/employee/basic/maxWorkID").then(resp => {
        //   if (resp && resp.status == 200) {
        //     _this.emp.workID = resp.data;
        //   }
        // })
      },
      showEditYcyjView(row) {
        console.log(row)
        this.dialogVisible = true
        this.dialogTitle = "编辑一程一检"
        this.ycyj = row
        this.ycyj.sbzbh = row.sbzbh
        this.ycyj.qypbh = row.qypbh
        this.ycyj.htbh = row.htbh
        this.ycyj.gldj = row.gldj
        this.ycyj.sbpp = row.sbpp
        this.ycyj.sbxh = row.sbxh
        this.ycyj.simkh = row.simkh
        this.ycyjGsOption = [row.sbgsjtmc, row.sbgsgsmc, row.sbgscdmc]
        this.ycyj.sbgsxlmc = row.sbgsxlmc
        this.ycyj.sbqdrq = row.sbqdrq
        this.ycyj.sbgxrq = row.sbgxrq
        this.ycyj.sbbfrq = row.sbbfrq
        this.ycyj.gysmc = row.gysmc
        this.ycyj.jcsmc = row.jcsmc
        this.ycyj.tmbh = row.tmbh
        this.ycyj.ewmbh = row.ewmbh
      },
      cancelEidt() {
        this.dialogVisible = false
        this.emptyRfid4gData()
        this.emptyRfid4gGs()
      },
      addYcyj(formName){
        var _this = this
        _this.dialogVisible = true
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.ycyj.sbzbh) {
              // Edit
              this.tableLoading = true
            } else {
              // Add
              this.tableLoading = true
            }
          } else {
            return false
          }
        })
      },
      deleteYcyj(row) {
        this.$confirm('此操作将永久删除设备：一程一检' + row.sbzbh + ', 是否继续?', '提示', {
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
      deleteManyYcyjs() {
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
        this.loadRfid4gData()
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        this.pageSize = val
        this.loadRfid4gData()
      },
      handleChange(value) {
        this.ycyj.sbgsjtdm = value[0]
        this.ycyj.sbgsgsdm = value[1]
        this.ycyj.sbgscddm = value[2]
      },
      showAdvanceSearchView() {
        this.advanceSearchViewVisible = !this.advanceSearchViewVisible
        this.keywords = ''
        if (!this.advanceSearchViewVisible) {
          this.emptyYcyjData()
          this.dateScope = ''
          this.loadYcyjData()
        }
      },
      emptyYcyjGs() {
        this.ycyjGsOption = ['', '', '']
      },
      emptyYcyjData() {
        this.emptyYcyjGs()
        this.ycyj = {
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
      loadYcyjData() {
        var _this = this
        this.tableLoading = true
        let params = {
          page: this.currentPage,
          pagePize: this.pageSize,
          keywords: this.keywords,
          orderItemName: '',
          order: '',
          sblb: this.ycyj.sblb,
          gzzt: '',
          sbzbh: this.ycyj.sbzbh,
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
          sbxh: this.ycyj.sbxh,
          sbpp: this.ycyj.sbpp,
          simkh: '',
          gldj: this.ycyj.gldj,
          sbgsjtdm: this.ycyjGsOption[0],
          sbgsjtmc: '',
          sbgsgsdm: this.ycyjGsOption[1],
          sbgsgsmc: '',
          sbgscddm: this.ycyjGsOption[2],
          sbgscdmc: '',
          sbgsxldm: this.ycyj.sbgsxlmc,
          sbgsxlmc: '',
          gysdm: '',
          gysmc: this.ycyj.gysmc,
          jcsdm: '',
          jcsmc: this.ycyj.jcsmc,
          dateScope: this.dateScope
        }
        console.log('1123 本次查询参数为')
        console.log(params)
        this.axios.get('/api/sb/rfid4g', JSON.stringify(params)).then(res => {
          _this.tableLoading = false
          if (res && res.status === 200) {
            const data = res.data.data
            _this.ycyjs = data.rfid4gList
            // totalPage会发生改变 currentPage、pageSize是向服务端发送的
            _this.totalPage = data.totalPage
          }
        }, err => {
          console.log(err)
        })
      },
      exportYcyjs() {
        window.open("/employee/basic/exportEmp", "_parent")
      }
    },
    mounted() {
      this.initData()
      this.loadYcyjData()
    }
  }
</script>

<style lang="less" scoped>
  #title {
    height: 36px;
    text-align: center;
    background-color: white;
    color: black;
    font-size: 18px;
    line-height: 36px;
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
