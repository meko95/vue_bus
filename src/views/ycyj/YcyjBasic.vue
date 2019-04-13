<template>
  <div>
    <ElementHeader></ElementHeader>
    <el-container style="height: 701px; border: 1px solid #eee">
      <!-- Side Begin -->
      <SideBar sb-type="一程一检" @listenToChildEvent="handleGsTreeSelect"></SideBar>
      <!-- Container Begin -->
      <el-container>
        <el-header>
          <div style="display: inline">
            <StatisticsCard :s-title="cardTitle"></StatisticsCard>
            <el-input
              placeholder="通过分片编号查询，长度为5位"
              clearable
              @change="handleQypbhChange"
              style="width: 192px;margin-left: 10px;padding: 0;"
              size="mini"
              :disabled="advanceSearchViewVisible"
              @keyup.enter.native="searchYcyj"
              prefix-icon="el-icon-search"
              v-model="ycyj.qypbh">
            </el-input>
            <div style="display: inline">
              <el-button type="primary" style="margin-left: 10px" size="mini" icon="el-icon-search" @click="searchYcyj">
                搜索
              </el-button>
              <el-button slot="reference" type="primary" size="mini" style="margin-left: 0"
                         @click="showAdvanceSearchView">
                <i :class="[advanceSearchViewVisible ? searchUp:searchDown]"
                   style="margin-right: 5px">
                </i>高级搜索
              </el-button>
            </div>
          </div>
          <div style="display: inline">
            <el-button type="success" size="mini" @click="importYcyjs">
              <i class="el-icon-upload2"></i>导入数据
            </el-button>
            <el-button type="success" size="mini" @click="exportYcyjs" style="margin-left: 0">
              <i class="el-icon-download"></i>导出数据
            </el-button>
          </div>
          <div style="display: inline;margin-left: 5px">
            <el-button type="primary" size="mini" icon="el-icon-plus" @click="showAddYcyjView">添加一程一检</el-button>
          </div>
        </el-header>
        <el-main>
          <div>
            <!-- TRANSITION Begin-->
            <transition name="slide-fade">
              <div
                style="margin-bottom: 10px;border: 1px solid #20a0ff;border-radius: 5px;padding: 20px 35px;box-sizing:border-box;"
                v-show="advanceSearchViewVisible">
                <el-row>
                  <el-col :span="6">
                    一程一检编号:
                    <el-input prefix-icon="el-icon-search" v-model="ycyj.sbzbh" size="small" style="width: 150px"
                              placeholder="长度为12位"></el-input>
                  </el-col>
                  <el-col :span="5">
                    合同编号:
                    <el-input prefix-icon="el-icon-search" v-model="ycyj.htbh" size="small" style="width: 150px"
                              placeholder="长度为10位"></el-input>
                  </el-col>
                  <el-col :span="4">
                    工作状态:
                    <el-select v-model="ycyj.sbgzztdm" style="width: 120px" clearable size="small" placeholder="请选择"
                               @change="handleGzztChange">
                      <el-option v-for="item in sbgzzts" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    安装地点:
                    <el-select v-model="ycyj.azdddm" style="width: 120px" clearable size="small" placeholder="请选择"
                               @change="handleAzddChange">
                      <el-option v-for="item in azdds" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="5">
                    屏编号:
                    <el-input prefix-icon="el-icon-search" v-model="ycyj.pbh" size="small" style="width: 150px"
                              placeholder="长度为10位"></el-input>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 18px">
                  <!--<el-col :span="5">-->
                    <!--分片编号:-->
                    <!--<el-input prefix-icon="el-icon-search" v-model="ycyj.qypbh" size="small" style="width: 150px"-->
                              <!--placeholder="长度为5位"></el-input>-->
                  <!--</el-col>-->
                  <el-col :span="4">
                    分片区域:
                    <el-select v-model="ycyj.qypbh" style="width: 120px" clearable size="small" placeholder="请选择"
                               @change="handleFpChange">
                      <el-option v-for="item in fps" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-col>
                  <!--<el-col :span="5">-->
                    <!--站点编号:-->
                    <!--<el-input prefix-icon="el-icon-search" v-model="ycyj.zdbh" size="small" style="width: 150px"-->
                              <!--placeholder="长度为5位"></el-input>-->
                  <!--</el-col>-->
                  <el-col :span="4">
                    站点名称:
                    <el-select v-model="ycyj.zdbh" style="width: 120px" clearable size="small" placeholder="请选择"
                               @change="handleZdChange">
                      <el-option v-for="item in zds" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    管理等级：
                    <el-select v-model="ycyj.gldjdm" style="width: 100px" size="small" placeholder="管理等级"
                               @change="handleGldjChange">
                      <el-option v-for="item in gldjs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 18px">
                  <el-col :span="5">
                    品牌型号:
                    <el-cascader
                      size="small"
                      placeholder="请选择设备品牌型号"
                      style="width: 170px;"
                      expand-trigger="hover"
                      clearable
                      :options="sbppxh"
                      v-model="ycyjPpxhOption"
                      @change="handlePpxhChange"
                      change-on-select>
                    </el-cascader>
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
                      @change="handleGsChange"
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
                </el-row>
                <el-row style="margin-top: 18px">
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
                    <el-select v-model="ycyj.gysdm" style="width: 130px" size="small" placeholder="请选择供应商"
                               @change="handleGysChange">
                      <el-option v-for="item in gs" :key="item.id" :label="item.descriptionZh" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 18px">
                  <el-col :span="4">
                    集成商:
                    <el-select v-model="ycyj.jcsdm" style="width: 130px" size="small" placeholder="请选择集成商"
                               @change="handleJcsChange">
                      <el-option v-for="item in gs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="5">
                    条码编号:
                    <el-input prefix-icon="el-icon-search" v-model="ycyj.tmbh" size="small" style="width: 150px"
                              placeholder="长度为10位"></el-input>
                  </el-col>
                  <el-col :span="5">
                    二维码编号:
                    <el-input prefix-icon="el-icon-search" v-model="ycyj.ewmbh" size="small" style="width: 150px"
                              placeholder="长度为10位"></el-input>
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
            <el-table ref="multipleTable" :data="Sbs" v-loading="tableLoading" border tooltip-effect="dark"
                      style="width: 100%;" :row-style="{'height': 0}" :cell-style="{'padding': 0}"
                      @selection-change="handleSelectionChange" stripe size="small" height="559"
                      :default-sort="{prop: 'sbqdrq', order: 'descending'}">
              <el-table-column type="selection" width="36" align="center"></el-table-column>
              <el-table-column prop="sbzbh" label="一程一检编号" width="130" align="center" fixed></el-table-column>
              <el-table-column prop="htbh" label="合同编号" width="95" align="center"></el-table-column>
              <el-table-column prop="sbgzzt" label="工作状态" width="80" align="center"></el-table-column>
              <el-table-column prop="azdd" label="安装地点" width="105" align="center"></el-table-column>
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
              <el-table-column prop="zdbh" label="站点编号" width="75" align="center"></el-table-column>
              <el-table-column prop="zdmc" label="站点名称" width="90" align="center"></el-table-column>
              <el-table-column prop="gldj" label="管理等级" width="80" align="center"></el-table-column>
              <el-table-column prop="sbpp" label="品牌" width="70" align="center"></el-table-column>
              <el-table-column prop="sbxh" label="型号" width="70" align="center"></el-table-column>
              <el-table-column prop="sbgsjtmc" label="集团" width="110" align="center"></el-table-column>
              <el-table-column prop="sbgsgsmc" label="公司" width="90" align="center"></el-table-column>
              <el-table-column prop="sbgscdmc" label="车队" width="70" align="center"></el-table-column>
              <el-table-column prop="sbgsxlmc" label="线路" width="70" align="center"></el-table-column>
              <el-table-column prop="sbqdrq" label="启动日期" width="100" align="center" sortable>
                <!--<template slot-scope="scope">{{ scope.row.sbqdrq | formatDate}}</template>-->
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
            <!-- RFID基础信息End -->
            <!-- 批量删除及分页Begin -->
            <div style="display: flex;justify-content: flex-end;margin-top: 8px">
              <el-button size="small" v-if="Sbs.length>0"
                         :disabled="multipleSelection.length===0||multipleSelection.length>1"
                         @click="showEditYcyjView(multipleSelection[0])">编辑
              </el-button>
              <el-button type="danger" size="small" v-if="Sbs.length>0" :disabled="multipleSelection.length==0"
                         @click="deleteManyYcyjs">删除
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
      <!-- FORM Begin -->
      <el-form :model="ycyj" :rules="rules" ref="ycyj" style="margin: 0px;padding: 0px;">
        <div style="text-align: left">
          <el-dialog :title="dialogTitle" style="padding: auto;" :close-on-click-modal="false"
                     :visible.sync="dialogVisible" width="77%" @close="cancelAdd('ycyj')">
            <el-row style="padding-left: 100px">
              <el-col :span="7">
                <div>
                  <el-form-item label="一程一检编号:" prop="sbzbh">
                    <el-input prefix-icon="el-icon-edit" v-model="ycyj.sbzbh" size="small" style="width: 150px"
                              placeholder="长度为12位"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7">
                <div>
                  <el-form-item label="合同编号:" prop="htbh">
                    <el-input prefix-icon="el-icon-edit" v-model="ycyj.htbh" size="small" style="width: 150px"
                              placeholder="长度为10位"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7">
                <div>
                  <el-form-item label="工作状态:" prop="sbgzzt">
                    <el-select v-model="ycyj.sbgzztdm" style="width: 120px" size="small" placeholder="请选择"
                               @change="handleGzztChange">
                      <el-option v-for="item in sbgzzts" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row style="padding-left: 100px">
              <el-col :span="7">
                <div>
                  <el-form-item label="安装地点:" prop="azdd">
                    <el-select v-model="ycyj.azdddm" style="width: 120px" size="small" placeholder="请选择"
                               @change="handleAzddChange">
                      <el-option v-for="item in azdds" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7">
                <div>
                  <el-form-item label="屏编号:" prop="pbh">
                    <el-input prefix-icon="el-icon-edit" v-model="ycyj.pbh" size="small" style="width: 150px"
                              placeholder="长度为10位"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7">
                <div>
                  <el-form-item label="分片区域:" prop="qypmc">
                    <el-select v-model="ycyj.qypbh" style="width: 120px" size="small" placeholder="请选择" @change="handleFpChange">
                      <el-option v-for="item in fps" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row style="padding-left: 100px">
              <el-col :span="7">
                <div>
                  <el-form-item label="站点名称:" prop="zdmc">
                    <el-select v-model="ycyj.zdbh" style="width: 120px" size="small" placeholder="请选择"
                               @change="handleZdChange">
                      <el-option v-for="item in zds" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7">
                <div>
                  <el-form-item label="管理等级:" prop="gldj">
                    <el-select v-model="ycyj.gldjdm" style="width: 120px" size="small" placeholder="管理等级"
                               @change="handleGldjChange">
                      <el-option v-for="item in gldjs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7">
                <div>
                  <el-form-item label="品牌型号:" prop="ycyjPpxhOption">
                    <el-cascader
                      size="small"
                      placeholder="请选择设备品牌型号"
                      style="width:162px;"
                      expand-trigger="hover"
                      :options="sbppxh"
                      v-model="ycyjPpxhOption"
                      @change="handlePpxhChange"
                      change-on-select>
                    </el-cascader>
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
                      @change="handleGsChange"
                      change-on-select>
                    </el-cascader>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div>
                  <el-form-item label="启动日期:" prop="sbqdrq">
                    <el-date-picker
                      v-model="ycyj.sbqdrq"
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
            </el-row>
            <el-row style="padding-left: 100px">
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
              <el-col :span="6">
                <div>
                  <el-form-item label="供应商:" prop="gysmc">
                    <el-select v-model="ycyj.gysdm" style="width: 130px" size="small" placeholder="供应商"
                               @change="handleGysChange">
                      <el-option v-for="item in gs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="5">
                <div>
                  <el-form-item label="集成商:" prop="jcsmc">
                    <el-select v-model="ycyj.jcsdm" style="width: 130px" size="small" placeholder="集成商"
                               @change="handleJcsChange">
                      <el-option v-for="item in gs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7">
                <div>
                  <el-form-item label="SIM卡号:" prop="simkh">
                    <el-input prefix-icon="el-icon-edit" v-model="ycyj.simkh" size="small" style="width: 190px"
                              placeholder="长度为20位"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row style="padding-left: 100px">
              <el-col :span="6">
                <div>
                  <el-form-item label="条码编号:" prop="tmbh">
                    <el-input prefix-icon="el-icon-edit" v-model="ycyj.tmbh" size="small" style="width: 150px"
                              placeholder="长度为10位"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="8">
                <div>
                  <el-form-item label="二维码编号:" prop="ewmbh">
                    <el-input prefix-icon="el-icon-edit" v-model="ycyj.ewmbh" size="small" style="width: 180px"
                              placeholder="长度为10位"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
            <el-button size="large" @click="cancelEidt">取 消</el-button>
            <el-button size="large" type="primary" @click="addYcyj('ycyj')">确 定</el-button>
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
    name: "YcyjBasic",
    data() {
      return {
        ycyj: {
          sbjyh: '',
          sbzbh: '',
          htbh: '',
          pbh: '',
          sbgzztdm: '',
          sbgzzt: '',
          azdddm: '',
          azdd: '',
          qypbh: '',
          qypmc: '',
          zdbh: '',
          zdmc: '',
          gldjdm: '',
          gldj: '',
          sbppdm: '',
          sbpp: '',
          sbxhdm: '',
          sbxh: '',
          sbgsjtdm: '',
          sbgsjtmc: '',
          sbgsgsdm: '',
          sbgsgsmc: '',
          sbgscddm: '',
          sbgscdmc: '',
          sbgsxldm: '',
          sbgsxlmc: '',
          sbqdrq: '',
          sbgxrq: '',
          sbbfrq: '',
          gysdm: '',
          gysmc: '',
          jcsdm: '',
          jcsmc: '',
          simkh: '',
          tmbh: '',
          ewmbh: ''
        },
        rules: {
          sbzbh: [{required: true, message: '必填:编号', trigger: 'blur'}],
          htbh: [{required: true, message: '必填:合同编号', trigger: 'blur'}],
          pbh: [{required: true, message: '必填:屏编号', trigger: 'blur'}],
          sbgzzt: [{required: true, message: '必填:工作状态', trigger: 'blur'}],
          qypmc: [{required: true, message: '必填:分片区域', trigger: 'blur'}],
          azdd: [{required: true, message: '必填:安装地点', trigger: 'blur'}],
          zdmc: [{required: true, message: '必填:安装站点', trigger: 'blur'}],
          gldj: [{required: true, message: '必填:管理等级', trigger: 'blur'}],
          ycyjPpxhOption: [{required: false, message: '必填:品牌型号', trigger: 'blur'}],
          ycyjGsOption: [{required: false, message: '必填:设备归属信息', trigger: 'blur'}],
          sbqdrq: [{required: true, message: '必填:启动日期', trigger: 'blur'}],
          sbgxrq: [{required: false, message: '必填:更新日期', trigger: 'blur'}],
          sbbfrq: [{required: false, message: '必填:报废日期', trigger: 'blur'}],
          gysmc: [{required: true, message: '必填:供应商', trigger: 'blur'}],
          jcsmc: [{required: true, message: '必填:集成商', trigger: 'blur'}],
          simkh: [{required: true, message: '必填:SIM卡号', trigger: 'blur'}],
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
        ycyjGsOption: ['', '', '', ''],
        ycyjPpxhOption: ['', ''],
        fileUploadBtnText: '导入数据',
        dialogTitle: '',
        sbgzzts: [],
        azdds: [],
        fps: [],
        zds: [],
        gldjs: [],
        sbppxh: [],
        ycyjGsOptions: [],
        gs: [],
        sbgsjtdm: '',
        sbgsgsdm: '',
        sbgscddm: '',
        sbgsxldm: ''
      }
    },
    components: {
      ElementHeader,
      SideBar,
      StatisticsCard
    },
    methods: {
      initData() {
        var _this = this
        this.getRequest('/api/Sbs/gzzt').then(res => {
          if (res && res.status === 200) {
            _this.sbgzzts = res.data.GzztList
          }
        })
        this.getRequest('/api/Sbs/azdd').then(res => {
          if (res && res.status === 200) {
            _this.azdds = res.data.AzddList
          }
        })
        this.getRequest('/api/Sbs/zd').then(res => {
          if (res && res.status === 200) {
            _this.zds = res.data.ZdList
          }
        })
        this.getRequest('/api/Sbs/fp').then(res => {
          if (res && res.status === 200) {
            _this.fps = res.data.FpList
          }
        })
        this.getRequest('/api/Sbs/gldj').then(res => {
          if (res && res.status === 200) {
            _this.gldjs = res.data.GldjList
          }
        })
        this.getRequest('/api/Sbs/ppxh').then(res => {
          if (res && res.status === 200) {
            _this.sbppxh = res.data.PpxhList
          }
        })
        this.ycyjGsOptions = this.$store.getters.getAllSubsidiary
        this.getRequest('/api/Sbs/gs').then(res => {
          if (res && res.status === 200) {
            _this.gs = res.data.GsList
          }
        })
      },
      handleGsTreeSelect(data) {
        var _this = this
        this.cardTitle = data.label
        let [jtdm, gsdm, cddm, xldm] = this.getGsTreeInfo(data, this.ycyj.sbgsjtdm, this.ycyj.sbgsgsdm, this.ycyj.sbgscddm, this.ycyj.sbgsxldm)
        this.sbgsjtdm = jtdm
        this.sbgsgsdm = gsdm
        this.sbgscddm = cddm
        this.sbgsxldm = xldm
        // this.loadRfid4gData()
        let params = {
          sbgsjtdm: jtdm,
          sbgsgsdm: gsdm,
          sbgscddm: cddm,
          sbgsxldm: xldm
        }
        console.log('Tree参数信息', params)
        this.getRequest('/api/ycyj/basic', params).then(res => {
          _this.tableLoading = false
          if (res && res.status === 200) {
            _this.Sbs = res.data.YcyjList
            // totalRow会发生改变 currentPage、pageSize是向服务端发送的
            _this.totalPage = res.data.totalRow
          }
        })
      },
      handleQypbhChange(val) {
        if (val === '') {
          this.loadYcyjData()
        }
      },
      handleGzztChange(val) {
        var gzzt = parseInt(val)
        if (gzzt) {
          this.ycyj.sbgzzt = this.sbgzzts[gzzt - 1].descriptionZh
        }
      },
      handleAzddChange(val) {
        var azdd = parseInt(val)
        if (azdd) {
          this.ycyj.azdd = this.azdds[azdd - 1].descriptionZh
        }
      },
      handleFpChange(val) {
        var fp = parseInt(val)
        if (fp) {
          this.ycyj.qypmc = this.fps[fp - 1].descriptionZh
        }
      },
      handleZdChange(val) {
        var zd = parseInt(val)
        if (zd) {
          this.ycyj.zdmc = this.zds[zd - 1].descriptionZh
        }
      },
      handleGldjChange(val) {
        var gldj = parseInt(val)
        if (gldj) {
          this.ycyj.gldj = this.gldjs[gldj - 1].descriptionZh
        }
      },
      handlePpxhChange(value) {
        this.ycyjPpxhOption = value
        let [ppdm, pp, xhdm, xh] = this.getPpxhInfo(value, this.ycyj.sbppdm, this.ycyj.sbxhdm, this.ycyj.sbpp, this.ycyj.sbxh, this.sbppxh)
        this.ycyj.sbpp = pp
        this.ycyj.sbppdm = ppdm
        this.ycyj.sbxh = xh
        this.ycyj.sbxhdm = xhdm
        console.log(this.ycyj)
      },
      handleGsChange(value) {
        this.ycyjGsOption = value
        let [jtdm, jtmc, gsdm, gsmc, cddm, cdmc, xldm, xlmc] = this.getGsInfo(value, this.ycyjGsOptions, this.ycyj.sbgsjtdm, this.ycyj.sbgsjtmc, this.ycyj.sbgsgsdm, this.ycyj.sbgsgsmc, this.ycyj.sbgscddm, this.ycyj.sbgscdmc, this.ycyj.sbgsxldm, this.ycyj.sbgsxlmc)
        this.ycyj.sbgsjtdm = jtdm
        this.ycyj.sbgsjtmc = jtmc
        this.ycyj.sbgsgsdm = gsdm
        this.ycyj.sbgsgsmc = gsmc
        this.ycyj.sbgscddm = cddm
        this.ycyj.sbgscdmc = cdmc
        this.ycyj.sbgsxldm = xldm
        this.ycyj.sbgsxlmc = xlmc
        console.log(this.ycyj)
      },
      handleGysChange(val) {
        var gys = parseInt(val)
        if (gys) {
          this.ycyj.gysmc = this.gs[gys - 1].descriptionZh
        }
      },
      handleJcsChange(val) {
        var jcs = parseInt(val)
        if (jcs) {
          this.ycyj.jcsmc = this.gs[jcs - 1].descriptionZh
        }
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        this.pageSize = val
        this.loadYcyjData()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.loadYcyjData()
      },
      showAdvanceSearchView() {
        this.advanceSearchViewVisible = !this.advanceSearchViewVisible
        this.ycyj.qypbh = ''
        if (!this.advanceSearchViewVisible) {
          this.emptyYcyjData()
          this.beginDateScope = ''
          this.updateDateScope = ''
          this.endDateScope = ''
          this.loadYcyjData()
        }
      },
      searchYcyj() {
        this.loadYcyjData()
      },
      cancelSearch() {
        this.advanceSearchViewVisible = false
        this.emptyYcyjData()
        this.beginDateScope = ''
        this.updateDateScope = ''
        this.endDateScope = ''
        this.loadYcyjData()
      },
      showAddYcyjView() {
        this.dialogVisible = true
        this.dialogTitle = "添加一程一检"
      },
      addYcyj(formName) {
        var _this = this
        _this.dialogVisible = true
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.ycyj.sbjyh = Date.now().toString()
            console.log('ycyj表单信息（先）', this.ycyj)
          } else {
            return false
          }
        })
      },
      cancelAdd(formName) {
        this.$refs[formName].resetFields()
        this.emptyYcyjData()
      },
      showEditYcyjView(row) {
        console.log(row)
        this.dialogVisible = true
        this.dialogTitle = "编辑一程一检"
        this.ycyj = row
        this.ycyj.sbjyh = row.sbjyh
        this.ycyj.sbzbh = row.sbzbh
        this.ycyj.htbh = row.htbh
        this.ycyj.pbh = row.pbh
        this.ycyj.sbgzzt = row.sbgzzt
        this.ycyj.azdd = row.azdd
        this.ycyj.qypmc = row.qypmc
        this.ycyj.zdmc = row.zdmc
        this.ycyj.gldj = row.gldj
        this.ycyjPpxhOption = [row.sbppdm, row.sbxhdm]
        this.ycyj.sbpp = row.sbpp
        this.ycyj.sbxh = row.sbxh
        this.ycyjGsOption = [row.sbgsjtdm, row.sbgsgsdm, row.sbgscddm, row.sbgsxldm]
        this.ycyj.sbqdrq = this.formatDate(row.sbqdrq)
        this.ycyj.sbgxrq = this.formatDate(row.sbgxrq)
        this.ycyj.sbbfrq = this.formatDate(row.sbbfrq)
        this.ycyj.gysmc = row.gysmc
        this.ycyj.jcsmc = row.jcsmc
        this.ycyj.simkh = row.simkh
        this.ycyj.tmbh = row.tmbh
        this.ycyj.ewmbh = row.ewmbh
      },
      cancelEidt() {
        this.dialogVisible = false
        this.emptyYcyjData()
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
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
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
      emptyYcyjGs() {
        this.ycyjGsOption = ['', '', '', '']
      },
      emptyYcyjPpxh() {
        this.ycyjPpxhOption = ['', '']
      },
      emptyYcyjData() {
        this.emptyYcyjGs()
        this.emptyYcyjPpxh()
        this.ycyj = {
          sbjyh: '',
          sbzbh: '',
          htbh: '',
          pbh: '',
          sbgzztdm: '',
          sbgzzt: '',
          azdddm: '',
          azdd: '',
          qypbh: '',
          qypmc: '',
          zdbh: '',
          zdmc: '',
          gldjdm: '',
          gldj: '',
          sbppdm: '',
          sbpp: '',
          sbxhdm: '',
          sbxh: '',
          sbgsjtdm: '',
          sbgsjtmc: '',
          sbgsgsdm: '',
          sbgsgsmc: '',
          sbgscddm: '',
          sbgscdmc: '',
          sbgsxldm: '',
          sbgsxlmc: '',
          sbqdrq: '',
          sbgxrq: '',
          sbbfrq: '',
          gysdm: '',
          gysmc: '',
          jcsdm: '',
          jcsmc: '',
          simkh: '',
          tmbh: '',
          ewmbh: ''
        }
      },
      loadYcyjData() {
        var _this = this
        this.tableLoading = true
        let params
        if (this.ycyj.sbgsjtdm) {
          params = {
            page: this.currentPage,
            pagePize: this.pageSize,
            qypbh: this.ycyj.qypbh,
            orderItemName: '',
            order: '',
            sbzbh: this.ycyj.sbzbh,
            htbh: this.ycyj.htbh,
            pbh: this.ycyj.pbh,
            sbgzztdm: this.ycyj.sbgzztdm,
            // sbgzzt: '',
            azdddm: this.ycyj.azdddm,
            // azdd: '',
            qypbh: this.ycyj.qypbh,
            // qypmc: '',
            zdbh: this.ycyj.zdbh,
            // zdmc: '',
            gldjdm: this.ycyj.gldjdm,
            // gldj: '',
            sbppdm: this.ycyj.sbppdm,
            // sbpp: '',
            sbxhdm: this.ycyj.sbxhdm,
            // sbxh: '',
            sbgsjtdm: this.ycyj.sbgsjtdm,
            // sbgsjtmc: '',
            sbgsgsdm: this.ycyj.sbgsgsdm,
            // sbgsgsmc: '',
            sbgscddm: this.ycyj.sbgscddm,
            // sbgscdmc: '',
            sbgsxldm: this.ycyj.sbgsxldm,
            // sbgsxlmc: '',
            sbqdrq: this.ycyj.sbqdrq,
            sbgxrq: this.ycyj.sbgxrq,
            sbbfrq: this.ycyj.sbbfrq,
            gysdm: this.ycyj.gysdm,
            // gysmc: '',
            jcsdm: this.ycyj.jcsdm,
            // jcsmc: '',
            simkh: this.ycyj.simkh,
            tmbh: this.ycyj.tmbh,
            ewmbh: this.ycyj.ewmbh,
            beginDateScope: this.beginDateScope,
            updateDateScope: this.updateDateScope,
            endDateScope: this.endDateScope
          }
        } else {
          params = {
            page: this.currentPage,
            size: this.pageSize,
            orderItemName: '',
            order: '',
            sbgsjtdm: this.sbgsjtdm,
            sbgsgsdm: this.sbgsgsdm,
            sbgscddm: this.sbgscddm,
            sbgsxldm: this.sbgsxldm,
            beginDateScope: this.beginDateScope,
            updateDateScope: this.updateDateScope,
            endDateScope: this.endDateScope
          }
        }
        console.log('1123 本次查询参数为')
        console.log(params)
        this.getRequest('/api/ycyj/basic', params).then(res => {
          _this.tableLoading = false
          if (res && res.status === 200) {
            _this.Sbs = res.data.YcyjList
            // totalPage会发生改变 currentPage、pageSize是向服务端发送的
            _this.totalPage = res.data.totalRow
          }
        })
      },
      importYcyjs() {
        window.open("/employee/basic/exportEmp", "_parent")
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
