<template>
  <div>
    <ElementHeader></ElementHeader>
    <el-container style="height: 701px; border: 1px solid #eee">
      <!-- Side Begin -->
      <SideBar sb-type="站杆预报屏" @listenToChildEvent="getGsSelected"></SideBar>
      <!-- Container Begin -->
      <!-- 设备材质、设备供电 -->
      <el-container>
        <el-header>
          <div style="display: inline">
            <StatisticsCard :s-title="cardTitle"></StatisticsCard>
            <el-input
              placeholder="通过分片编号查询"
              clearable
              @change="keywordsChange"
              style="width: 192px;margin-left: 10px;padding: 0;"
              size="mini"
              :disabled="advanceSearchViewVisible"
              @keyup.enter.native="searchZgybp"
              prefix-icon="el-icon-search"
              v-model="keywords">
            </el-input>
          </div>
          <div style="display: inline">
            <el-button type="primary" style="margin-left: 5px" size="mini" icon="el-icon-search" @click="searchZgybp">
              搜索
            </el-button>
            <el-button slot="reference" type="primary" size="mini" style="margin-left: 0px"
                       @click="showAdvanceSearchView">
              <i :class="[advanceSearchViewVisible ? searchUp:searchDown]"
                 style="margin-right: 5px">
              </i>高级搜索
            </el-button>
          </div>
          <div style="margin-left: 7px;display: inline">
            <el-button type="success" size="mini" @click="importZgybps">
              <i class="el-icon-upload2" style="margin-right: 10px"></i>导入数据
            </el-button>
            <el-button type="success" size="mini" @click="exportZgybps" style="margin-left: 0px">
              <i class="el-icon-download" style="margin-right: 10px"></i>导出数据
            </el-button>
          </div>
          <div style="display: inline;margin-left: 7px">
            <el-button type="primary" size="mini" icon="el-icon-plus" @click="showAddZgybpView">添加站杆预报屏</el-button>
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
                  <el-col :span="5">
                    站杆预报屏编号：
                    <el-input prefix-icon="el-icon-search" v-model="zgybp.sbzbh" size="small" style="width: 150px"
                              placeholder="设备查询编号"></el-input>
                  </el-col>
                  <el-col :span="4">
                    管理等级：
                    <el-select v-model="zgybp.gldj" style="width: 100px" size="small" placeholder="管理等级">
                      <el-option v-for="item in gldj" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    品牌：
                    <el-select v-model="zgybp.sbpp" style="width: 130px" size="small" placeholder="请选择品牌">
                      <el-option v-for="item in pp" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="5">
                    型号:
                    <el-select v-model="zgybp.sbxh" style="width: 130px" size="small" placeholder="请选择型号">
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
                    <el-select v-model="zgybp.gysmc" style="width: 130px" size="small" placeholder="请选择供应商">
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
                    <el-select v-model="zgybp.jcsmc" style="width: 130px" size="small" placeholder="请选择集成商">
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
                      :options="zgybpGsOptions"
                      v-model="zgybpGsOption"
                      @change="handleChange"
                      change-on-select
                    >
                    </el-cascader>
                  </el-col>
                  <el-col :span="6">
                    线路：
                    <el-input prefix-icon="el-icon-search" v-model="zgybp.sbgsxlmc" size="small" style="width: 250px"
                              placeholder="输入设备线路，以中文逗号相间隔"></el-input>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 18px">
                  <el-col :span="4" :offset="21">
                    <el-button size="small" @click="cancelSearch">取消</el-button>
                    <el-button icon="el-icon-search" type="primary" size="small" @click="searchZgybp">搜索</el-button>
                  </el-col>
                </el-row>
              </div>
            </transition>
            <!-- 站杆预报屏基础信息Begin -->
            <el-table ref="multipleTable" :data="Sbs" v-loading="tableLoading" border tooltip-effect="dark"
                      style="width: 100%;" :row-style="{'height': 0}" :cell-style="{'padding': 0}"
                      @selection-change="handleSelectionChange" stripe size="small" height="559"
                      :default-sort="{prop: 'sbqyrq', order: 'descending'}">
              <el-table-column type="selection" width="36" align="center"></el-table-column>
              <el-table-column prop="sbzbh" label="站杆预报屏编号" width="110" align="center" fixed></el-table-column>
              <el-table-column prop="htbh" label="合同编号" width="95" align="center"></el-table-column>
              <el-table-column prop="sbgzzt" label="工作状态" width="80" align="center"></el-table-column>
              <el-table-column prop="azzp" label="安装全景照片" width="95" align="center">
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
              <el-table-column prop="azzpzmz" label="安装正面照片" width="95" align="center">
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
              <el-table-column prop="azzpcmz" label="安装侧面照片" width="95" align="center">
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
              <el-table-column prop="ssqymc" label="区域名称" width="80" align="center"></el-table-column>
              <el-table-column prop="azddmc" label="安装地点" width="80" align="center"></el-table-column>
              <el-table-column prop="gldj" label="管理等级" width="70" align="center"></el-table-column>
              <el-table-column prop="sbpp" label="品牌" width="70" align="center"></el-table-column>
              <el-table-column prop="sbxh" label="型号" width="70" align="center"></el-table-column>
              <el-table-column prop="sbcz" label="材质" width="70" align="center"></el-table-column>
              <el-table-column prop="gdffmc" label="供电" width="70" align="center"></el-table-column>
              <el-table-column prop="gztj" label="光照条件" width="80" align="center"></el-table-column>
              <el-table-column prop="sbgsjtmc" label="集团" width="110" align="center"></el-table-column>
              <el-table-column prop="sbgsgsmc" label="公司" width="90" align="center"></el-table-column>
              <el-table-column prop="sbgscdmc" label="车队" width="70" align="center"></el-table-column>
              <el-table-column prop="sbgszdmc" label="站点" width="85" align="center"></el-table-column>
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
            <div style="display: flex;justify-content: flex-end;margin: 2px">
              <el-button size="small" v-if="Sbs.length>0"
                         :disabled="multipleSelection.length===0||multipleSelection.length>1"
                         @click="showEditZgybpView(multipleSelection[0])">编辑
              </el-button>
              <el-button type="danger" size="small" v-if="Sbs.length>0" :disabled="multipleSelection.length==0"
                         @click="deleteManyZgybps">删除
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
      <!-- 添加站杆预报屏信息Begin -->
      <el-form :model="zgybp" :rules="rules" ref="addZgybpForm" style="margin: 0px;padding: 0px;">
        <div style="text-align: left">
          <el-dialog :title="dialogTitle" style="padding: auto;" :close-on-click-modal="false"
                     :visible.sync="dialogVisible" width="77%">
            <el-row style="padding-left: 100px">
              <el-col :span="7">
                <div>
                  <el-form-item label="站杆预报屏编号:" prop="sbzbh">
                    <el-input prefix-icon="el-icon-edit" v-model="zgybp.sbzbh" size="small" style="width: 150px"
                              placeholder="请输入设备编号"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="8">
                <div>
                  <el-form-item label="站杆预报屏分片编号:" prop="qypbh">
                    <el-input prefix-icon="el-icon-edit" v-model="zgybp.qypbh" size="small" style="width: 150px"
                              placeholder="请输入分片编号"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7">
                <div>
                  <el-form-item label="合同编号:" prop="htbh">
                    <el-input prefix-icon="el-icon-edit" v-model="zgybp.htbh" size="small" style="width: 150px"
                              placeholder="请输入设备合同编号"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row style="padding-left: 100px">
              <el-col :span="4">
                <div>
                  <el-form-item label="管理等级:" prop="gldj">
                    <el-select v-model="zgybp.gldj" style="width: 60px" size="small" placeholder="管理等级">
                      <el-option v-for="item in gldj" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="5">
                <div>
                  <el-form-item label="设备品牌:" prop="sbpp">
                    <el-select v-model="zgybp.sbpp" style="width: 100px" size="small" placeholder="设备品牌">
                      <el-option v-for="item in pp" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div>
                  <el-form-item label="设备型号:" prop="sbxh">
                    <el-select v-model="zgybp.sbxh" style="width: 140px" size="small" placeholder="设备型号">
                      <el-option v-for="item in xh" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div>
                  <el-form-item label="SIM卡号:" prop="simkh">
                    <el-input prefix-icon="el-icon-edit" v-model="zgybp.simkh" size="small" style="width: 150px"
                              placeholder="请输入SIM卡号"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row style="padding-left: 100px">
              <el-col :span="9">
                <div>
                  <el-form-item label="设备归属:" prop="zgybpGsOption">
                    <el-cascader
                      size="small"
                      placeholder="请选择设备归属"
                      style="width:266px;"
                      expand-trigger="hover"
                      :options="zgybpGsOptions"
                      v-model="zgybpGsOption"
                      @change="handleChange"
                      change-on-select>
                    </el-cascader>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="8">
                <div>
                  <el-form-item label="归属线路:" prop="sbgsxlmc">
                    <el-input prefix-icon="el-icon-edit" v-model="zgybp.sbgsxlmc" size="small" style="width: 150px"
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
                      v-model="zgybp.sbqyrq"
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
                      v-model="zgybp.sbgxrq"
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
                      v-model="zgybp.sbbfrq"
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
                    <el-select v-model="zgybp.gysmc" style="width: 130px" size="small" placeholder="供应商">
                      <el-option v-for="item in gys" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="5">
                <div>
                  <el-form-item label="集成商:" prop="jcsmc">
                    <el-select v-model="zgybp.jcsmc" style="width: 130px" size="small" placeholder="集成商">
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
                    <el-input prefix-icon="el-icon-edit" v-model="zgybp.tmbh" size="small" style="width: 150px"
                              placeholder="请输入条码编号"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="8">
                <div>
                  <el-form-item label="二维码编号:" prop="ewmbh">
                    <el-input prefix-icon="el-icon-edit" v-model="zgybp.ewmbh" size="small" style="width: 180px"
                              placeholder="请输入设备二维码编号"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
            <el-button size="large" @click="cancelEidt">取 消</el-button>
            <el-button size="large" type="primary" @click="addZgybp('addZgybpForm')">确 定</el-button>
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
    name: "ZgybpBasicInfo",
    data() {
      return {
        cardTitle: '上海久事一集团',
        subsidiary: this.$store.getters.getAllSubsidiary,
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        totalPage: 0,
        pageSize: 10,
        currentPage: 1,
        DEVICE_LIST: this.$store.getters.getAllDeviceTypes,
        advanceSearchViewVisible: false,
        dialogVisible: false,
        tableLoading: false,
        keywords: '',
        dateScope: '',
        zgybp: {
          sblb: this.$store.getters.getSblb,
          sbzbh: '',
          qypbh: '',
          htbh: '',
          gldj: '',
          sbpp: '',
          sbxh: '',
          sbcz: '',
          gdffmc: '',
          sbpmczm: '',
          gztj: '',
          ytjcw: '',
          simkh: '',
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
        Sbs: [],
        multipleSelection: [],
        searchUp: 'el-icon-arrow-up',
        searchDown: 'el-icon-arrow-down',
        zgybpGsOption: ['', '', ''],
        zgybpGsOptions: [],
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
          sbcz: [{required: true, message: '必填:材质', trigger: 'blur'}],
          gdffmc: [{required: true, message: '必填:供电', trigger: 'blur'}],
          simkh: [{required: true, message: '必填:SIM卡号', trigger: 'blur'}],
          zgybpGsOption: [{required: true, message: '必填:设备归属信息', trigger: 'blur'}],
          sbgsjtmc: [{required: true, message: '必填:归属集团', trigger: 'blur'}],
          sbgsgsmc: [{required: true, message: '必填:归属公司', trigger: 'blur'}],
          sbgscdmc: [{required: true, message: '必填:归属车队', trigger: 'blur'}],
          sbgszdmc: [{required: true, message: '必填:归属站点', trigger: 'blur'}],
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
      ElementHeader,
      SideBar,
      StatisticsCard
    },
    methods: {
      getGsSelected(data){
        this.cardTitle = data.label
        this.getSbGsInfo(data,this.zgybp.sbgsjtdm,this.zgybp.sbgsgsdm,this.zgybp.sbgscddm,this.zgybp.sbgsxldm)
      },
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
        this.zgybpGsOptions = [
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
          this.loadZgybpData()
        }
      },
      searchZgybp() {
        const device_type = parseInt(this.zgybp.sblb)
        if (device_type === 9) {
          this.loadZgybpData()
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
            this.loadZgybpData()
        }
      },
      cancelSearch() {
        this.advanceSearchViewVisible = false
        this.emptyZgybpData()
        this.emptyZgybpGs()
        this.dateScope = ''
        this.loadZgybpData()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      showAddZgybpView() {
        this.dialogVisible = true
        this.dialogTitle = "添加站杆预报屏"
        // var _this = this;
        console.log('添加站杆预报屏设备')
        // this.getRequest("/employee/basic/maxWorkID").then(resp => {
        //   if (resp && resp.status == 200) {
        //     _this.emp.workID = resp.data;
        //   }
        // })
      },
      showEditZgybpView(row) {
        console.log(row)
        this.dialogVisible = true
        this.dialogTitle = "编辑站杆预报屏"
        this.zgybp = row
        this.zgybp.sbzbh = row.sbzbh
        this.zgybp.qypbh = row.qypbh
        this.zgybp.htbh = row.htbh
        this.zgybp.gldj = row.gldj
        this.zgybp.sbpp = row.sbpp
        this.zgybp.sbxh = row.sbxh
        // this.zgybp.sbcz = row.sbcz
        // this.zgybp.gdffmc = row.gdffmc
        this.zgybp.simkh = row.simkh
        this.zgybpGsOption = [row.sbgsjtmc, row.sbgsgsmc, row.sbgscdmc]
        this.zgybp.sbgsxlmc = row.sbgsxlmc
        this.zgybp.sbqdrq = row.sbqdrq
        this.zgybp.sbgxrq = row.sbgxrq
        this.zgybp.sbbfrq = row.sbbfrq
        this.zgybp.gysmc = row.gysmc
        this.zgybp.jcsmc = row.jcsmc
        this.zgybp.tmbh = row.tmbh
        this.zgybp.ewmbh = row.ewmbh
      },
      cancelEidt() {
        this.dialogVisible = false
        this.emptyZgybpData()
        this.emptyZgybpGs()
      },
      addZgybp(formName) {
        var _this = this
        _this.dialogVisible = true
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.zgybp.sbzbh) {
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
      deleteZgybp(row) {
        this.$confirm('此操作将永久删除设备：站杆预报屏' + row.sbzbh + ', 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.doDelete(row.id)
        }).catch(() => {
        })
      },
      doDelete() {
        this.tableLoading = true
        var _this = this
      },
      deleteManyZgybps() {
        this.$confirm('此操作将删除[' + this.multipleSelection.length + ']条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var ids = ''
          for (var i = 0; i < this.multipleSelection.length; i++) {
            ids += this.multipleSelection[i].id + ","
          }
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
        this.loadZgybpData()
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        this.pageSize = val
        this.loadZgybpData()
      },
      handleChange(value) {
        this.zgybp.sbgsjtdm = value[0]
        this.zgybp.sbgsgsdm = value[1]
        this.zgybp.sbgscddm = value[2]
      },
      showAdvanceSearchView() {
        this.advanceSearchViewVisible = !this.advanceSearchViewVisible
        this.keywords = ''
        if (!this.advanceSearchViewVisible) {
          this.emptyZgybpData()
          this.dateScope = ''
          this.loadZgybpData()
        }
      },
      emptyZgybpGs() {
        this.zgybpGsOption = ['', '', '']
      },
      emptyZgybpData() {
        this.zgybpGsOption = ['', '', '']
        this.zgybp = {
          sblb: '',
          sbzbh: '',
          qypbh: '',
          htbh: '',
          gldj: '',
          sbpp: '',
          sbxh: '',
          // sbcz:'',
          // gdffmc:'',
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
      loadZgybpData() {
        var _this = this
        this.tableLoading = true
        let params = {
          page: this.currentPage,
          pagePize: this.pageSize,
          keywords: this.keywords,
          orderItemName: '',
          order: '',
          sblb: this.zgybp.sblb,
          gzzt: '',
          sbzbh: this.zgybp.sbzbh,
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
          sbxh: this.zgybp.sbxh,
          sbpp: this.zgybp.sbpp,
          // sbcz:this.zgybp.sbcz,
          // gdffmc:this.zgybp.gdffmc,
          simkh: '',
          gldj: this.zgybp.gldj,
          sbgsjtdm: this.zgybpGsOption[0],
          sbgsjtmc: '',
          sbgsgsdm: this.zgybpGsOption[1],
          sbgsgsmc: '',
          sbgscddm: this.zgybpGsOption[2],
          sbgscdmc: '',
          sbgsxldm: this.zgybp.sbgsxlmc,
          sbgsxlmc: '',
          gysdm: '',
          gysmc: this.zgybp.gysmc,
          jcsdm: '',
          jcsmc: this.zgybp.jcsmc,
          dateScope: this.dateScope
        }
        console.log('1123 本次查询参数为')
        console.log(params)
        this.getRequest('/api/zgybp/basic/jt1').then(res => {
          _this.tableLoading = false
          if (res && res.status === 200) {
            _this.Sbs = res.data.ZgybpList
            // totalPage会发生改变 currentPage、pageSize是向服务端发送的
            _this.totalPage = res.data.totalRow
          }
        })
      },
      importZgybps() {
        window.open("/employee/basic/exportEmp", "_parent")
      },
      exportZgybps() {
        window.open("/employee/basic/exportEmp", "_parent")
      }
    },
    mounted() {
      this.initData()
      this.loadZgybpData()
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
