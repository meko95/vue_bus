<template>
  <div>
    <ElementHeader></ElementHeader>
    <el-container style="height: 701px; border: 1px solid #eee">
      <!-- Side Begin -->
      <SideBar sb-type="RFID4G场站" @listenToChildEvent="handleGsTreeSelect"></SideBar>
      <!-- Container Begin -->
      <el-container>
        <!-- Header Begin -->
        <el-header>
          <div style="display: inline">
            <StatisticsCard :s-title="cardTitle"></StatisticsCard>
            <el-input
              placeholder="通过分片编号查询"
              clearable
              @change="handleQypbhChange"
              style="width: 192px;margin-left: 10px;padding: 0;"
              size="mini"
              :disabled="advanceSearchViewVisible"
              @keyup.enter.native="searchRfid4gcz"
              prefix-icon="el-icon-search"
              v-model="rfid4gcz.qypbh">
            </el-input>
            <div style="display: inline">
              <el-button type="primary" style="margin-left: 0px" size="mini" icon="el-icon-search"
                         @click="searchRfid4gcz">
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
            <el-button type="success" size="mini" @click="importRfid4gczs">
              <i class="el-icon-upload2"></i>导入数据
            </el-button>
            <el-button type="success" size="mini" @click="exportRfid4gczs" style="margin-left: 0">
              <i class="el-icon-download"></i>导出数据
            </el-button>
          </div>
          <div style="display: inline">
            <el-button type="primary" size="mini" icon="el-icon-plus" @click="showAddRfid4gczView">添加RFID4G(场站)
            </el-button>
          </div>
        </el-header>
        <!-- Main Begin:高级搜索框、Table、批量删除、分页 -->
        <el-main>
          <div>
            <!-- TRANSITION Begin -->
            <transition name="slide-fade">
              <div
                style="margin-bottom: 10px;border: 1px solid #20a0ff;border-radius: 5px;padding: 20px 35px;box-sizing:border-box;"
                v-show="advanceSearchViewVisible">
                <el-row>
                  <el-col :span="6">
                    RFID4G(场站)编号:
                    <el-input prefix-icon="el-icon-search" v-model="rfid4gcz.sbzbh" size="small" style="width: 150px"
                              placeholder="设备查询编号"></el-input>
                  </el-col>
                  <el-col :span="5">
                    合同编号:
                    <el-input prefix-icon="el-icon-search" v-model="rfid4gcz.htbh" size="small" style="width: 150px"
                              placeholder="设备合同编号"></el-input>
                  </el-col>
                  <el-col :span="4">
                    工作状态:
                    <el-select v-model="rfid4gcz.sbgzztdm" style="width: 120px" clearable size="small" placeholder="请选择"
                               @change="handleGzztChange">
                      <el-option v-for="item in sbgzzts" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="5">
                    安装位置:
                    <el-input prefix-icon="el-icon-search" v-model="rfid4gcz.azwz" size="small" style="width: 150px"
                              placeholder="设备安装位置"></el-input>
                  </el-col>
                  <el-col :span="4">
                    管理等级:
                    <el-select v-model="rfid4gcz.gldj" style="width: 110px" clearable size="small" placeholder="管理等级">
                      <el-option v-for="item in gldjs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.descriptionZh"></el-option>
                    </el-select>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 18px">
                  <el-col :span="4">
                    分片区域:
                    <el-select v-model="rfid4gcz.qypbh" style="width: 120px" clearable size="small" placeholder="请选择"
                               @change="handleFpChange">
                      <el-option v-for="item in fps" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="5">
                    品牌型号:
                    <el-cascader
                      size="small"
                      placeholder="请选择设备品牌型号"
                      style="width: 170px;"
                      expand-trigger="hover"
                      clearable
                      :options="sbppxh"
                      v-model="rfid4gczPpxhOption"
                      @change="handlePpxhChange"
                      change-on-select>
                    </el-cascader>
                  </el-col>
                  <el-col :span="8">
                    设备归属:
                    <el-cascader
                      size="small"
                      placeholder="请选择设备归属"
                      style="width:300px;"
                      expand-trigger="hover"
                      clearable
                      :options="rfid4gczGsOptions"
                      v-model="rfid4gczGsOption"
                      @change="handleGsChange"
                      change-on-select>
                    </el-cascader>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 18px">
                  <el-col :span="9">
                    启动日期:
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
                  <el-col :span="9">
                    更新日期:
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
                </el-row>
                <el-row style="margin-top: 18px">
                  <el-col :span="9">
                    报废日期:
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
                  <el-col :span="4">
                    集成商:
                    <el-select v-model="rfid4gcz.jcsdm" style="width: 130px" clearable size="small" placeholder="请选择集成商"
                               @change="handleJcsChange">
                      <el-option v-for="item in gs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    供应商:
                    <el-select v-model="rfid4gcz.gysdm" style="width: 130px" clearable size="small" placeholder="请选择供应商"
                               @change="handleGysChange">
                      <el-option v-for="item in gs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="6">
                    SIM卡号:
                    <el-input prefix-icon="el-icon-search" v-model="rfid4gcz.simkh" size="small" style="width: 190px"
                              placeholder="长度为20位"></el-input>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 18px">
                  <el-col :span="5">
                    条码编号:
                    <el-input prefix-icon="el-icon-search" v-model="rfid4gcz.tmbh" size="small" style="width: 150px"
                              placeholder="长度为10位"></el-input>
                  </el-col>
                  <el-col :span="5">
                    二维码编号:
                    <el-input prefix-icon="el-icon-search" v-model="rfid4gcz.ewmbh" size="small" style="width: 150px"
                              placeholder="长度为10位"></el-input>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 18px">
                  <el-col :span="4" :offset="21">
                    <el-button size="small" @click="cancelSearch">取消</el-button>
                    <el-button icon="el-icon-search" type="primary" size="small" @click="searchRfid4gcz">搜索</el-button>
                  </el-col>
                </el-row>
              </div>
            </transition>
            <!-- TABLE Begin -->
            <el-table ref="multipleTable" :data="Sbs" v-loading="tableLoading" border tooltip-effect="dark"
                      style="width: 100%;" :row-style="{'height': 0}" :cell-style="{'padding': 0}"
                      @selection-change="handleSelectionChange" stripe size="small" height="559"
                      :default-sort="{prop: 'sbqdrq', order: 'descending'}">
              <el-table-column type="selection" width="36" align="center"></el-table-column>
              <el-table-column prop="sbzbh" label="RFID4G(场站)编号" width="130" align="center" fixed></el-table-column>
              <el-table-column prop="htbh" label="合同编号" width="95" align="center"></el-table-column>
              <el-table-column prop="sbgzzt" label="工作状态" width="80" align="center"></el-table-column>
              <el-table-column prop="azwz" label="安装位置" width="80" align="center">
                <template slot-scope="scope">
                  <a>{{scope.row.azwz}}</a>
                </template>
                <!--<template slot-scope="scope">-->
                <!--<el-popover-->
                <!--placement="top-start"-->
                <!--width="200"-->
                <!--trigger="hover">-->
                <!--<el-table ref="multipleTable" :data="rfid4g_location" v-loading="tableLoading" border-->
                <!--tooltip-effect="dark" style="width: 180px;" max-height="200" :row-style="rowStyle" :cell-style="cellStyle"-->
                <!--stripe size="small">-->
                <!--<el-table-column prop="htbh" label="合同编号" width="85" align="center"></el-table-column>-->
                <!--<el-table-column prop="sblb" label="设备类别" width="85" align="center"></el-table-column>-->
                <!--<el-table-column prop="azddmc" label="安装地点" width="85" align="center"></el-table-column>-->
                <!--<el-table-column label="停车场">-->
                <!--<el-table-column prop="tccbh" label="编号" width="85" align="center"></el-table-column>-->
                <!--<el-table-column prop="tccmc" label="名称" width="85" align="center"></el-table-column>-->
                <!--<el-table-column prop="tccmj" label="面积" width="85" align="center"></el-table-column>-->
                <!--<el-table-column prop="tccghtfls" label="规划停放" width="85" align="center"></el-table-column>-->
                <!--<el-table-column prop="tccsjtfls" label="实际停放" width="85" align="center"></el-table-column>-->
                <!--<el-table-column prop="jcmjzs" label="进出门基站" width="85" align="center"></el-table-column>-->
                <!--<el-table-column prop="tcclcjzs" label="楼层基站" width="85" align="center"></el-table-column>-->
                <!--</el-table-column>-->
                <!--</el-table>-->
                <!--<a slot="reference">安装位置</a>-->
                <!--</el-popover>-->
                <!--</template>-->
              </el-table-column>
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
              <el-table-column prop="gldj" label="管理等级" width="80" align="center"></el-table-column>
              <el-table-column prop="sbpp" label="品牌" width="70" align="center"></el-table-column>
              <el-table-column prop="sbxh" label="型号" width="70" align="center"></el-table-column>
              <el-table-column prop="sbgsjtmc" label="集团" width="110" align="center"></el-table-column>
              <el-table-column prop="sbgsgsmc" label="公司" width="90" align="center"></el-table-column>
              <el-table-column prop="sbgscdmc" label="车队" width="70" align="center"></el-table-column>
              <el-table-column prop="sbgsxlmc" label="线路" width="70" align="center"></el-table-column>
              <el-table-column prop="sbqdrq" label="启用日期" width="100" align="center" sortable>
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
            <!-- 批量删除及分页Begin -->
            <div style="display: flex;justify-content: flex-end;margin-top: 8px">
              <el-button size="small" v-if="Sbs.length>0"
                         :disabled="multipleSelection.length===0||multipleSelection.length>1"
                         @click="showEditRfid4gczView(multipleSelection[0])">编辑
              </el-button>
              <el-button type="danger" size="small" v-if="Sbs.length>0" :disabled="multipleSelection.length==0"
                         @click="deleteManyRfid4gczs">删除
              </el-button>
              <el-button size="small" v-if="Sbs.length>0" :disabled="multipleSelection.length==0"
                         @click="toggleSelection(multipleSelection)">
                取消选择
              </el-button>
              <el-pagination background :page-sizes="[10, 30, 50, 100]" :total="totalRow" :page-size="pageSize"
                             :current-page="currentPage"
                             @current-change="handleCurrentChange" @size-change="handleSizeChange"
                             layout="total, sizes, prev, pager, next, jumper"></el-pagination>
            </div>
            <!-- 批量删除及分页End-->
          </div>
        </el-main>
      </el-container>
      <!-- FORM Begin -->
      <el-form :model="rfid4gcz" :rules="rules" ref="rfid4gcz" style="margin: 0;padding: 0;">
        <div style="text-align: left">
          <el-dialog :title="dialogTitle" style="padding: auto;" :close-on-click-modal="false"
                     :visible.sync="dialogVisible" width="77%" @close="cancel_add('rfid4gcz')">
            <el-row style="padding-left: 100px">
              <el-col :span="8">
                <div>
                  <el-form-item label="RFID4G(场站)编号:" prop="sbzbh">
                    <el-input prefix-icon="el-icon-edit" v-model="rfid4gcz.sbzbh" size="small" style="width: 150px"
                              placeholder="请输入设备编号"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7">
                <div>
                  <el-form-item label="合同编号:" prop="htbh">
                    <el-input prefix-icon="el-icon-edit" v-model="rfid4gcz.htbh" size="small" style="width: 150px"
                              placeholder="请输入设备合同编号"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7">
                <div>
                  <el-form-item label="工作状态:" prop="sbgzzt">
                    <el-select v-model="rfid4gcz.sbgzztdm" style="width: 120px" size="small" placeholder="请选择"
                               @change="handleGzztChange">
                      <el-option v-for="item in sbgzzts" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7">
                <div>
                  <el-form-item label="安装位置:" prop="azwz">
                    <el-input prefix-icon="el-icon-edit" v-model="rfid4gcz.azwz" size="small" style="width: 150px"
                              placeholder="请输入设备安装位置"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div>
                  <el-form-item label="分片名称:" prop="qypmc">
                    <el-select v-model="rfid4gcz.qypbh" style="width: 120px" size="small" placeholder="请选择"
                               @change="handleFpChange">
                      <el-option v-for="item in fps" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div>
                  <el-form-item label="管理等级:" prop="gldj">
                    <el-select v-model="rfid4gcz.gldjdm" style="width: 120px" size="small" placeholder="管理等级"
                               @change="handleGldjChange">
                      <el-option v-for="item in gldjs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row style="padding-left: 100px">
              <el-col :span="7">
                <div>
                  <el-form-item label="品牌型号:" prop="rfid4gczPpxhOption">
                    <el-cascader
                      size="small"
                      placeholder="请选择设备品牌型号"
                      style="width:162px;"
                      expand-trigger="hover"
                      :options="sbppxh"
                      v-model="rfid4gczPpxhOption"
                      @change="handlePpxhChange"
                      change-on-select>
                    </el-cascader>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="11">
                <div>
                  <el-form-item label="设备归属：" prop="rfid4gczGsOption">
                    <el-cascader
                      size="small"
                      placeholder="请选择设备归属"
                      style="width:288px;"
                      expand-trigger="hover"
                      :options="rfid4gczGsOptions"
                      v-model="rfid4gczGsOption"
                      @change="handleGsChange"
                      change-on-select>
                    </el-cascader>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row style="padding-left: 100px">
              <el-col :span="7">
                <div>
                  <el-form-item label="启用日期：" prop="sbqdrq">
                    <el-date-picker
                      v-model="rfid4gcz.sbqdrq"
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
                  <el-form-item label="更新日期：" prop="sbgxrq">
                    <el-date-picker
                      v-model="rfid4gcz.sbgxrq"
                      size="small"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      style="width: 150px"
                      type="date"
                      placeholder="更新日期">
                    </el-date-picker>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7">
                <div>
                  <el-form-item label="报废日期：" prop="sbbfrq">
                    <el-date-picker
                      v-model="rfid4gcz.sbbfrq"
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
                    <el-select v-model="rfid4gcz.gysdm" style="width: 130px" size="small" placeholder="供应商"
                               @change="handleGysChange">
                      <el-option v-for="item in gs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div>
                  <el-form-item label="集成商:" prop="jcsmc">
                    <el-select v-model="rfid4gcz.jcsdm" style="width: 130px" size="small" placeholder="集成商"
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
                    <el-input prefix-icon="el-icon-edit" v-model="rfid4gcz.simkh" size="small" style="width: 190px"
                              placeholder="长度为20位"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row style="padding-left: 100px">
              <el-col :span="6">
                <div>
                  <el-form-item label="条码编号：" prop="tmbh">
                    <el-input prefix-icon="el-icon-edit" v-model="rfid4gcz.tmbh" size="small" style="width: 150px"
                              placeholder="请输入条码编号"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="8">
                <div>
                  <el-form-item label="二维码编号：" prop="ewmbh">
                    <el-input prefix-icon="el-icon-edit" v-model="rfid4gcz.ewmbh" size="small" style="width: 180px"
                              placeholder="请输入设备二维码编号"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
              <el-form-item>
                <el-button size="large" @click="cancelEidt">取 消</el-button>
                <el-button size="large" type="primary" @click="addRfid4gcz('rfid4gcz')">确 定</el-button>
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
    name: "Rfid4gczBasic",
    data() {
      return {
        rfid4gcz: {
          sbzbh: '',
          htbh: '',
          sbgzztdm: '',
          sbgzzt: '',
          azwz: '',
          azzp: '',
          qypbh: '',
          qypmc: '',
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
          sbzbh: [{required: true, validator: this.validateSbzbh, trigger: 'blur'}],
          htbh: [{required: true, message: '必填:合同编号', trigger: 'blur'}],
          azwz: [{required: true, message: '必填:安装位置', trigger: 'blur'}],
          qypmc: [{required: true, message: '必填:分片区域', trigger: 'blur'}],
          sbgzzt: [{required: true, message: '必填:工作状态', trigger: 'blur'}],
          gldj: [{required: true, message: '必填:管理等级', trigger: 'blur'}],
          rfid4gczPpxhOption: [{required: false, message: '必填:品牌型号', trigger: 'blur'}],
          rfid4gczGsOption: [{required: false, message: '必填:设备归属信息', trigger: 'blur'}],
          sbqdrq: [{required: true, message: '必填:启动日期', trigger: 'blur'}],
          sbgxrq: [{required: false, message: '必填:更新日期', trigger: 'blur'}],
          sbbfrq: [{required: false, message: '必填:报废日期', trigger: 'blur'}],
          gysmc: [{required: true, message: '必填:供应商', trigger: 'blur'}],
          jcsmc: [{required: true, message: '必填:集成商', trigger: 'blur'}],
          simkh: [{required: true, validator: this.validateSimkh, trigger: 'blur'}],
          tmbh: [{required: true, validator: this.validateTmbh, trigger: 'blur'}],
          ewmbh: [{required: true, validator: this.validateEwmbh, trigger: 'blur'}]
        },
        cardTitle: '上海久事一集团',
        totalRow: 0,
        pageSize: 10,
        currentPage: 1,
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
        rfid4gczGsOptions: [],
        rfid4gczGsOption: ['', '', '', ''],
        rfid4gczPpxhOption: ['', ''],
        fileUploadBtnText: '导入数据',
        dialogTitle: '',
        sbgzzts: [],
        fps: [],
        gldjs: [],
        sbppxh: [],
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
        // 获取设备归属信息以后要写为接口调用形式
        this.rfid4gczGsOptions = this.$store.getters.getAllSubsidiary
        // 获取工作状态
        this.getRequest('/api/Sbs/gzzt').then(res => {
          if (res && res.status === 200) {
            _this.sbgzzts = res.data.GzztList
          }
        })
        // 获取启用片区域名称
        this.getRequest('/api/Sbs/fp').then(res => {
          if (res && res.status === 200) {
            _this.fps = res.data.FpList
          }
        })
        // 获取品牌型号信息
        this.getRequest('/api/Sbs/ppxh').then(res => {
          if (res && res.status === 200) {
            _this.sbppxh = res.data.PpxhList
          }
        })
      },
      handleGsTreeSelect(data) {
        var _this = this
        this.cardTitle = data.label
        let [jtdm, gsdm, cddm, xldm] = this.getGsTreeInfo(data, this.rfid4gcz.sbgsjtdm, this.rfid4gcz.sbgsgsdm, this.rfid4gcz.sbgscddm, this.rfid4gcz.sbgsxldm)
        this.sbgsjtdm = jtdm
        this.sbgsgsdm = gsdm
        this.sbgscddm = cddm
        this.sbgsxldm = xldm
        let params = {
          sbgsjtdm: jtdm,
          sbgsgsdm: gsdm,
          sbgscddm: cddm,
          sbgsxldm: xldm
        }
        console.log('Tree参数信息', params)
        this.getRequest('/api/rfid4gcz/basic', params).then(res => {
          _this.tableLoading = false
          if (res && res.status === 200) {
            _this.Sbs = res.data.Rfid4gczList
            // totalRow会发生改变 currentPage、pageSize是向服务端发送的
            _this.totalPage = res.data.totalRow
          }
        })
      },
      handleQypbhChange(val) {
        if (val === '') {
          this.loadRfid4gczData()
        }
      },
      handleGzztChange(val) {
        var gzzt = parseInt(val)
        if (gzzt) {
          this.rfid4gcz.sbgzzt = this.sbgzzts[gzzt - 1].descriptionZh
        }
      },
      handleFpChange(val) {
        var fp = parseInt(val)
        if (fp) {
          this.rfid4gcz.qypmc = this.fps[fp - 1].descriptionZh
        }
      },
      handleGldjChange(val) {
        var gldj = parseInt(val)
        if (gldj) {
          this.rfid4gcz.gldj = this.gldjs[gldj - 1].descriptionZh
        }
      },
      handlePpxhChange(value) {
        this.rfid4gczPpxhOption = value
        let [ppdm, pp, xhdm, xh] = this.getPpxhInfo(value, this.rfid4gcz.sbppdm, this.rfid4gcz.sbxhdm, this.rfid4gcz.sbpp, this.rfid4gcz.sbxh, this.sbppxh)
        this.rfid4gcz.sbpp = pp
        this.rfid4gcz.sbppdm = ppdm
        this.rfid4gcz.sbxh = xh
        this.rfid4gcz.sbxhdm = xhdm
        console.log(this.rfid4gcz)
      },
      handleGysChange(val) {
        var gys = parseInt(val)
        if (gys) {
          this.rfid4gcz.gysmc = this.gs[gys - 1].descriptionZh
        }
      },
      handleJcsChange(val) {
        var jcs = parseInt(val)
        if (jcs) {
          this.rfid4gcz.jcsmc = this.gs[jcs - 1].descriptionZh
        }
      },
      handleGsChange(value) {
        this.rfid4gczGsOption = value
        let [jtdm, jtmc, gsdm, gsmc, cddm, cdmc, xldm, xlmc] = this.getGsInfo(value, this.rfid4gczGsOptions, this.rfid4gcz.sbgsjtdm, this.rfid4gcz.sbgsjtmc, this.rfid4gcz.sbgsgsdm, this.rfid4gcz.sbgsgsmc, this.rfid4gcz.sbgscddm, this.rfid4gcz.sbgscdmc, this.rfid4gcz.sbgsxldm, this.rfid4gcz.sbgsxlmc)
        this.rfid4gcz.sbgsjtdm = jtdm
        this.rfid4gcz.sbgsjtmc = jtmc
        this.rfid4gcz.sbgsgsdm = gsdm
        this.rfid4gcz.sbgsgsmc = gsmc
        this.rfid4gcz.sbgscddm = cddm
        this.rfid4gcz.sbgscdmc = cdmc
        this.rfid4gcz.sbgsxldm = xldm
        this.rfid4gcz.sbgsxlmc = xlmc
        console.log(this.rfid4gcz)
      },
      showAdvanceSearchView() {
        this.advanceSearchViewVisible = !this.advanceSearchViewVisible
        this.rfid4gcz.qypbh = ''
        if (!this.advanceSearchViewVisible) {
          this.emptyRfid4gczData()
          this.beginDateScope = ''
          this.updateDateScope = ''
          this.endDateScope = ''
          this.loadRfid4gczData()
        }
      },
      searchRfid4gcz() {
        // enter触发
        this.loadRfid4gczData()
      },
      cancelSearch() {
        this.advanceSearchViewVisible = false
        this.emptyRfid4gczData()
        this.beginDateScope = ''
        this.updateDateScope = ''
        this.endDateScope = ''
        this.loadRfid4gczData()
      },
      showAddRfid4gczView() {
        this.dialogVisible = true
        this.dialogTitle = "添加RFID4G（场站）"
      },
      addRfid4gcz(formName) {
        this.dialogVisible = true
        var _this = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.rfid4gcz.sbjyh = Date.now().toString()
            console.log('rfid4gcz表单信息（先）', this.rfid4gcz)
          } else {
            return false
          }
        })
      },
      cancel_add(formName) {
        this.$refs[formName].resetFields()
        this.emptyRfid4gczData()
      },
      showEditRfid4gczView(row) {
        console.log(row)
        this.dialogVisible = true
        this.dialogTitle = "编辑RFID4G(场站)"
        this.rfid4gcz = row
        this.rfid4gcz.sbjyh = row.sbjyh
        this.rfid4gcz.sbzbh = row.sbzbh
        this.rfid4gcz.htbh = row.htbh
        this.rfid4gcz.sbgzzt = row.sbgzzt
        this.rfid4gcz.azwz = row.azwz
        this.rfid4gcz.azzp = row.azzp
        this.rfid4gcz.qypmc = row.qypmc
        this.rfid4gcz.gldj = row.gldj
        // this.rfid4gcz.sbpp = row.sbpp
        // this.rfid4gcz.sbxh = row.sbxh
        this.rfid4gczPpxhOption = [row.sbppdm, row.sbxhdm]
        this.rfid4gczGsOption = [row.sbgsjtdm, row.sbgsgsdm, row.sbgscddm, row.sbgsxldm]
        // this.rfid4gcz.sbgsjtmc = row.sbgsjtmc
        // this.rfid4gcz.sbgsgsmc = row.sbgsgsmc
        // this.rfid4gcz.sbgscdmc = row.sbgscdmc
        // this.rfid4gcz.sbgsxlmc = row.sbgsxlmc
        this.rfid4gcz.sbqdrq = this.formatDate(row.sbqdrq)
        this.rfid4gcz.sbgxrq = this.formatDate(row.sbgxrq)
        this.rfid4gcz.sbbfrq = this.formatDate(row.sbbfrq)
        this.rfid4gcz.gysmc = row.gysmc
        this.rfid4gcz.jcsmc = row.jcsmc
        this.rfid4gcz.simkh = row.simkh
        this.rfid4gcz.tmbh = row.tmbh
        this.rfid4gcz.ewmbh = row.ewmbh
      },
      cancelEidt() {
        this.dialogVisible = false
        this.emptyRfid4gczData()
      },
      deleteRfid4gcz(row) {
        this.$confirm('此操作将永久删除设备：添加RFID4G（场站）' + row.sbzbh + ', 是否继续?', '提示', {
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
      deleteManyRfid4gczs() {
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
      handleSelectionChange(val) {
        this.multipleSelection = val
        console.log('选中项', val)
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
        this.loadRfid4gczData()
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        this.pageSize = val
        this.loadRfid4gczData()
      },
      emptyRfid4gczGs() {
        this.rfid4gczGsOption = ['', '', '', '']
      },
      emptyRfid4gczPpxh() {
        this.rfid4gczPpxhOption = ['', '']
      },
      emptyRfid4gczData() {
        this.emptyRfid4gczGs()
        this.emptyRfid4gczPpxh()
        this.rfid4gcz = {
          sbzbh: '',
          htbh: '',
          sbgzztdm: '',
          sbgzzt: '',
          azwz: '',
          azzp: '',
          qypbh: '',
          qypmc: '',
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
      loadRfid4gczData() {
        var _this = this
        this.tableLoading = true
        let params
        if (this.rfid4gcz.sbgsjtdm) {
          params = {
            page: this.currentPage,
            pagePize: this.pageSize,
            qypbh: this.rfid4gcz.qypbh,
            orderItemName: '',
            order: '',
            sbzbh: this.rfid4gcz.sbzbh,
            htbh: this.rfid4gcz.htbh,
            sbgzztdm: this.rfid4gcz.sbgzztdm,
            // sbgzzt: '',
            azwz: this.rfid4gcz.azwz,
            azzp: this.rfid4gcz.azzp,
            qypbh: this.rfid4gcz.qypbh,
            // qypmc: '',
            gldjdm: this.rfid4gcz.gldjdm,
            // gldj: '',
            sbppdm: this.rfid4gcz.sbppdm,
            // sbpp: '',
            sbxhdm: this.rfid4gcz.sbxhdm,
            // sbxh: '',
            sbgsjtdm: this.rfid4gcz.sbgsjtdm,
            // sbgsjtmc: '',
            sbgsgsdm: this.rfid4gcz.sbgsgsdm,
            // sbgsgsmc: '',
            sbgscddm: this.rfid4gcz.sbgscddm,
            // sbgscdmc: '',
            sbgsxldm: this.rfid4gcz.sbgsxldm,
            // sbgsxlmc: '',
            sbqdrq: this.rfid4gcz.sbqdrq,
            sbgxrq: this.rfid4gcz.sbgxrq,
            sbbfrq: this.rfid4gcz.sbbfrq,
            gysdm: this.rfid4gcz.gysdm,
            // gysmc: '',
            jcsdm: this.rfid4gcz.jcsdm,
            // jcsmc: '',
            simkh: this.rfid4gcz.simkh,
            tmbh: this.rfid4gcz.tmbh,
            ewmbh: this.rfid4gcz.ewmbh,
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
        console.log(params)
        this.getRequest('/api/rfid4gcz/basic', params).then(res => {
          _this.tableLoading = false
          if (res && res.status === 200) {
            _this.Sbs = res.data.Rfid4gczList
            // totalPage会发生改变 currentPage、pageSize是向服务端发送的
            _this.totalRow = res.data.totalRow
          }
        })
      },
      importRfid4gczs() {
        window.open("/employee/basic/exportEmp", "_parent")
      },
      exportRfid4gczs() {
        window.open("/employee/basic/exportEmp", "_parent")
      }
    },
    mounted() {
      this.initData()
      this.loadRfid4gczData()
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
