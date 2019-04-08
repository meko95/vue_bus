<template>
  <div>
    <ElementHeader></ElementHeader>
    <el-container style="height: 701px; border: 1px solid #eee">
      <!-- Side Begin -->
      <SideBar sb-type="55寸屏" @listenToChildEvent="getGsSelected"></SideBar>
      <!-- Container Begin -->
      <!-- 尺寸、供电方式 -->
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
              @keyup.enter.native="searchFfcp"
              prefix-icon="el-icon-search"
              v-model="ffcp.qypbh">
            </el-input>
            <div style="display: inline">
              <el-button type="primary" style="margin-left: 10px" size="mini" icon="el-icon-search" @click="searchFfcp">
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
          <div style="margin-left: 5px;display: inline">
            <el-button type="success" size="mini" @click="importFfcps">
              <i class="el-icon-upload2" style="margin-right: 3px"></i>导入数据
            </el-button>
            <el-button type="success" size="mini" @click="exportFfcps" style="margin-left: 0px">
              <i class="el-icon-download" style="margin-right: 3px"></i>导出数据
            </el-button>
          </div>
          <div style="display: inline;margin-left: 7px">
            <el-button type="primary" size="mini" icon="el-icon-plus" @click="showAddFfcpView">添加55寸预报屏</el-button>
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
                    预报屏编号:
                    <el-input prefix-icon="el-icon-search" v-model="ffcp.sbzbh" size="small" style="width: 150px"
                              placeholder="设备查询编号"></el-input>
                  </el-col>
                  <el-col :span="5">
                    合同编号:
                    <el-input prefix-icon="el-icon-search" v-model="ffcp.htbh" size="small" style="width: 150px"
                              placeholder="设备合同编号"></el-input>
                  </el-col>
                  <el-col :span="4">
                    分片区域:
                    <el-select v-model="ffcp.qypmc" style="width: 120px" clearable size="small" placeholder="请选择">
                      <el-option v-for="item in qypmcs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.descriptionZh"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    管理等级:
                    <el-select v-model="ffcp.gldj" style="width: 100px" size="small" placeholder="管理等级">
                      <el-option v-for="item in gldjs" :key="item.id" :label="item.descriptionZh" :value="item.descriptionZh"></el-option>
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
                      v-model="ffcpPpxhOption"
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
                    <el-select v-model="ffcp.gysmc" style="width: 130px" size="small" placeholder="请选择供应商">
                      <el-option
                        v-for="item in gs"
                        :key="item.id"
                        :label="item.descriptionZh"
                        :value="item.descriptionZh">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    集成商:
                    <el-select v-model="ffcp.jcsmc" style="width: 130px" size="small" placeholder="请选择集成商">
                      <el-option
                        v-for="item in gs"
                        :key="item.id"
                        :label="item.descriptionZh"
                        :value="item.descriptionZh">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="5">
                    站亭名称:
                    <el-input prefix-icon="el-icon-search" v-model="ffcp.ztmc" size="small" style="width: 150px"
                              placeholder="设备站亭名称"></el-input>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 18px">
                  <el-col :span="5">
                    安装站点:
                    <el-input prefix-icon="el-icon-search" v-model="ffcp.azzdmc" size="small" style="width: 150px"
                              placeholder="设备安装站点"></el-input>
                  </el-col>
                  <el-col :span="8">
                    设备归属:
                    <el-cascader
                      size="small"
                      placeholder="请选择设备归属"
                      style="width:300px;"
                      expand-trigger="hover"
                      :options="ffcpGsOptions"
                      v-model="ffcpGsOption"
                      @change="handleGsChange"
                      change-on-select>
                    </el-cascader>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 18px">
                  <el-col :span="4" :offset="21">
                    <el-button size="small" @click="cancelSearch">取消</el-button>
                    <el-button icon="el-icon-search" type="primary" size="small" @click="searchFfcp">搜索</el-button>
                  </el-col>
                </el-row>
              </div>
            </transition>
            <!-- 55寸屏基础信息Begin -->
            <el-table ref="multipleTable" :data="Sbs" v-loading="tableLoading" border tooltip-effect="dark"
                      style="width: 100%;" :row-style="{'height': 0}" :cell-style="{'padding': 0}"
                      @selection-change="handleSelectionChange" stripe size="small" height="559"
                      :default-sort="{prop: 'sbqdrq', order: 'descending'}">
              <el-table-column type="selection" width="36" align="center"></el-table-column>
              <el-table-column prop="sbzbh" label="55寸预报屏编号" width="130" align="center" fixed></el-table-column>
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
              <el-table-column prop="ztmc" label="站亭名称" width="80" align="center"></el-table-column>
              <el-table-column prop="azzdmc" label="安装站点" width="110" align="center"></el-table-column>
              <el-table-column prop="ssqymc" label="区域名称" width="80" align="center"></el-table-column>
              <el-table-column prop="gztj" label="光照条件" width="80" align="center"></el-table-column>
              <el-table-column prop="gldj" label="管理等级" width="70" align="center"></el-table-column>
              <el-table-column prop="sbpp" label="品牌" width="70" align="center"></el-table-column>
              <el-table-column prop="sbxh" label="型号" width="70" align="center"></el-table-column>
              <el-table-column prop="sbccmc" label="尺寸" width="70" align="center"></el-table-column>
              <el-table-column prop="gdffmc" label="供电" width="70" align="center"></el-table-column>
              <el-table-column prop="simkh" label="SIM卡号" width="160" align="center"></el-table-column>
              <el-table-column prop="sbgsjtmc" label="集团" width="110" align="center"></el-table-column>
              <el-table-column prop="sbgsgsmc" label="公司" width="90" align="center"></el-table-column>
              <el-table-column prop="sbgscdmc" label="车队" width="70" align="center"></el-table-column>
              <!--<el-table-column prop="sbgszdmc" label="站点" width="85" align="center"></el-table-column>-->
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
              <el-table-column prop="ztbh" label="站亭编号" width="100" align="center"></el-table-column>
              <el-table-column prop="pbh" label="屏编号" width="100" align="center"></el-table-column>
              <el-table-column prop="tmbh" label="条码编号" width="100" align="center"></el-table-column>
              <el-table-column prop="ewmbh" label="二维码编号" width="100" align="center"></el-table-column>
            </el-table>
            <!-- 批量删除及分页Begin -->
            <div style="display: flex;justify-content: flex-end;margin-top: 8px">
              <el-button size="small" v-if="Sbs.length>0"
                         :disabled="multipleSelection.length===0||multipleSelection.length>1"
                         @click="showEditFfcpView(multipleSelection[0])">编辑
              </el-button>
              <el-button type="danger" size="small" v-if="Sbs.length>0" :disabled="multipleSelection.length==0"
                         @click="deleteManyFfcps">删除
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
      <!-- 添加55寸屏信息Begin -->
      <el-form :model="ffcp" :rules="rules" ref="ffcp" style="margin: 0px;padding: 0px;">
        <div style="text-align: left">
          <el-dialog :title="dialogTitle" style="padding: auto;" :close-on-click-modal="false"
                     :visible.sync="dialogVisible" width="77%" @close="cancel_add('ffcp')">
            <el-row style="padding-left: 100px">
              <el-col :span="7">
                <div>
                  <el-form-item label="55寸屏编号:" prop="sbzbh">
                    <el-input prefix-icon="el-icon-edit" v-model="ffcp.sbzbh" size="small" style="width: 150px"
                              placeholder="请输入设备编号"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7">
                <div>
                  <el-form-item label="屏编号:" prop="pbh">
                    <el-input prefix-icon="el-icon-edit" v-model="ffcp.pbh" size="small" style="width: 150px"
                              placeholder="请输入屏编号"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7">
                <div>
                  <el-form-item label="合同编号:" prop="htbh">
                    <el-input prefix-icon="el-icon-edit" v-model="ffcp.htbh" size="small" style="width: 150px"
                              placeholder="请输入设备合同编号"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row style="padding-left: 100px">
              <el-col :span="8">
                <div>
                  <el-form-item label="55寸屏分片编号:" prop="qypbh">
                    <el-input prefix-icon="el-icon-edit" v-model="ffcp.qypbh" size="small" style="width: 150px"
                              placeholder="请输入分片编号"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7">
                <div>
                  <el-form-item label="分片区域:" prop="qypmc">
                    <el-select v-model="ffcp.qypmc" style="width: 120px" size="small" placeholder="请选择">
                      <el-option v-for="item in qypmcs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.descriptionZh"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7">
                <div>
                  <el-form-item label="工作状态:" prop="sbgzzt">
                    <el-select v-model="ffcp.sbgzzt" style="width: 120px" size="small" placeholder="请选择">
                      <el-option v-for="item in sbgzzts" :key="item.id" :label="item.descriptionZh"
                                 :value="item.descriptionZh"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row style="padding-left: 100px">
              <el-col :span="8">
                <div>
                  <el-form-item label="站亭编号:" prop="ztbh">
                    <el-input prefix-icon="el-icon-edit" v-model="ffcp.ztbh" size="small" style="width: 150px"
                              placeholder="请输入站亭编号"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="8">
                <div>
                  <el-form-item label="站亭名称:" prop="ztmc">
                    <el-input prefix-icon="el-icon-edit" v-model="ffcp.ztmc" size="small" style="width: 150px"
                              placeholder="请输入站亭名称"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="8">
                <div>
                  <el-form-item label="安装站点:" prop="azzdmc">
                    <el-input prefix-icon="el-icon-edit" v-model="ffcp.azzdmc" size="small" style="width: 150px"
                              placeholder="请输入安装站点"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row style="padding-left: 100px">
              <el-col :span="8">
                <div>
                  <el-form-item label="区域名称:" prop="ssqymc">
                    <el-input prefix-icon="el-icon-edit" v-model="ffcp.ssqymc" size="small" style="width: 150px"
                              placeholder="请输入区域名称"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div>
                  <el-form-item label="光照条件:" prop="gztj">
                    <el-select v-model="ffcp.gztj" style="width: 120px" size="small" placeholder="光照条件">
                      <el-option v-for="item in gztjs" :key="item.id" :label="item.descriptionZh" :value="item.descriptionZh"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div>
                  <el-form-item label="管理等级:" prop="gldj">
                    <el-select v-model="ffcp.gldj" style="width: 120px" size="small" placeholder="管理等级">
                      <el-option v-for="item in gldjs" :key="item.id" :label="item.descriptionZh" :value="item.descriptionZh"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row style="padding-left: 100px">
              <el-col :span="8">
                <div>
                  <el-form-item label="设备尺寸:" prop="sbccmc">
                    <el-input prefix-icon="el-icon-edit" v-model="ffcp.sbccmc" size="small" style="width: 150px"
                              placeholder="请输入设备尺寸"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="8">
                <div>
                  <el-form-item label="供电方法:" prop="gdffmc">
                    <el-input prefix-icon="el-icon-edit" v-model="ffcp.gdffmc" size="small" style="width: 150px"
                              placeholder="请输入供电方法"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7">
                <div>
                  <el-form-item label="品牌型号:" prop="ffcpPpxhOption">
                    <el-cascader
                      size="small"
                      placeholder="请选择设备品牌型号"
                      style="width:162px;"
                      expand-trigger="hover"
                      :options="sbppxh"
                      v-model="ffcpPpxhOption"
                      @change="handlePpxhChange"
                      change-on-select>
                    </el-cascader>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row style="padding-left: 100px">
              <el-col :span="6">
                <div>
                  <el-form-item label="SIM卡号:" prop="simkh">
                    <el-input prefix-icon="el-icon-edit" v-model="ffcp.simkh" size="small" style="width: 150px"
                              placeholder="请输入SIM卡号"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="9">
                <div>
                  <el-form-item label="设备归属:" prop="ffcpGsOption">
                    <el-cascader
                      size="small"
                      placeholder="请选择设备归属"
                      style="width:266px;"
                      expand-trigger="hover"
                      :options="ffcpGsOptions"
                      v-model="ffcpGsOption"
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
                      v-model="ffcp.sbqdrq"
                      size="small"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      style="width: 150px"
                      type="date"
                      placeholder="启动日期">
                    </el-date-picker>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row style="padding-left: 100px">
              <el-col :span="6">
                <div>
                  <el-form-item label="更新日期:" prop="sbgxrq">
                    <el-date-picker
                      v-model="ffcp.sbgxrq"
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
                      v-model="ffcp.sbbfrq"
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
                    <el-select v-model="ffcp.gysmc" style="width: 130px" size="small" placeholder="供应商">
                      <el-option v-for="item in gs" :key="item.id" :label="item.descriptionZh" :value="item.descriptionZh"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row style="padding-left: 100px">
              <el-col :span="5">
                <div>
                  <el-form-item label="集成商:" prop="jcsmc">
                    <el-select v-model="ffcp.jcsmc" style="width: 130px" size="small" placeholder="集成商">
                      <el-option v-for="item in gs" :key="item.id" :label="item.descriptionZh" :value="item.descriptionZh"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div>
                  <el-form-item label="条码编号:" prop="tmbh">
                    <el-input prefix-icon="el-icon-edit" v-model="ffcp.tmbh" size="small" style="width: 150px"
                              placeholder="请输入条码编号"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="8">
                <div>
                  <el-form-item label="二维码编号:" prop="ewmbh">
                    <el-input prefix-icon="el-icon-edit" v-model="ffcp.ewmbh" size="small" style="width: 180px"
                              placeholder="请输入设备二维码编号"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
            <el-button size="large" @click="cancelEidt">取 消</el-button>
            <el-button size="large" type="primary" @click="addFfcp('ffcp')">确 定</el-button>
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
    name: "FfcpBasic",
    data() {
      return {
        ffcp: {
          // sblb: this.$store.getters.getSblb,
          sbzbh: '',
          htbh: '',
          sbgzzt: '',
          azzp: '',
          azzpzmz: '',
          azzpcmz: '',
          qypbh: '',
          qypmc: '',
          ztmc: '',
          azzdmc: '',
          ssqymc: '',
          gztj: '',
          gldj: '',
          sbpp: '',
          sbxh: '',
          sbccmc: '',
          gdffmc: '',
          simkh: '',
          sbgsjtmc: '',
          sbgsgsmc: '',
          sbgscdmc: '',
          sbgsxlmc: '',
          // sbgszdmc: '',
          sbqdrq: '',
          sbgxrq: '',
          sbbfrq: '',
          gysmc: '',
          jcsmc: '',
          pbh: '',
          tmbh: '',
          ewmbh: ''
        },
        rules: {
          sbzbh: [{required: true, message: '必填:编号', trigger: 'blur'}],
          htbh: [{required: true, message: '必填:合同编号', trigger: 'blur'}],
          qypmc: [{required: true, message: '必填:分片区域', trigger: 'blur'}],
          ztmc: [{required: true, message: '必填:站亭名称', trigger: 'blur'}],
          azzdmc: [{required: true, message: '必填:安装站点', trigger: 'blur'}],
          ssqymc: [{required: true, message: '必填:区域名称', trigger: 'blur'}],
          sbgzzt: [{required: true, message: '必填:工作状态', trigger: 'blur'}],
          ztbh: [{required: true, message: '必填:站亭编号', trigger: 'blur'}],
          gztj: [{required: true, message: '必填:光照条件', trigger: 'blur'}],
          gldj: [{required: true, message: '必填:管理等级', trigger: 'blur'}],
          ffcpPpxhOption: [{required: false, message: '必填:品牌型号', trigger: 'blur'}],
          sbccmc: [{required: true, message: '必填:尺寸', trigger: 'blur'}],
          gdffmc: [{required: true, message: '必填:供电方式', trigger: 'blur'}],
          simkh: [{required: true, message: '必填:SIM卡号', trigger: 'blur'}],
          ffcpGsOption: [{required: false, message: '必填:设备归属信息', trigger: 'blur'}],
          sbqdrq: [{required: true, message: '必填:启动日期', trigger: 'blur'}],
          sbgxrq: [{required: false, message: '必填:更新日期', trigger: 'blur'}],
          sbbfrq: [{required: false, message: '必填:报废日期', trigger: 'blur'}],
          gysmc: [{required: true, message: '必填:供应商', trigger: 'blur'}],
          jcsmc: [{required: true, message: '必填:集成商', trigger: 'blur'}],
          pbh: [{required: true, message: '必填:屏编号', trigger: 'blur'}],
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
        ffcpGsOption: ['', '', '', ''],
        ffcpGsOptions: [],
        sbppxh: [],
        ffcpPpxhOption: ['', ''],
        fileUploadBtnText: '导入数据',
        dialogTitle: '',
        gs: [],
        gldjs: [],
        sbgzzts: [],
        qypmcs: [],
        gztjs: []
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
        this.getSbGsInfo(data,this.ffcp.sbgsjtdm,this.ffcp.sbgsgsdm,this.ffcp.sbgscddm,this.ffcp.sbgsxldm)
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
        this.ffcpGsOptions = this.$store.getters.getAllSubsidiary
        this.getRequest('/api/Sbs/gztj').then(res=>{
          if (res && res.status === 200) {
            _this.gztjs = res.data.GztjList
          }
        })
      },
      qypbhChange(val) {
        if (val === '') {
          this.loadFfcpData()
        }
      },
      showAdvanceSearchView() {
        this.advanceSearchViewVisible = !this.advanceSearchViewVisible
        this.ffcp.qypbh = ''
        if (!this.advanceSearchViewVisible) {
          this.emptyFfcpData()
          this.beginDateScope = ''
          this.updateDateScope = ''
          this.endDateScope = ''
          this.loadFfcpData()
        }
      },
      searchFfcp() {
        this.loadFfcpData()
      },
      cancelSearch() {
        this.advanceSearchViewVisible = false
        this.emptyFfcpData()
        this.beginDateScope = ''
        this.updateDateScope = ''
        this.endDateScope = ''
        this.loadFfcpData()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      addFfcp(formName) {
        var _this = this
        _this.dialogVisible = true
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('ffcp表单信息（先）', this.ffcp)
          } else {
            return false
          }
        })
      },
      cancel_add(formName) {
        this.$refs[formName].resetFields()
        this.emptyFfcpData()
      },
      showAddFfcpView() {
        this.dialogVisible = true
        this.dialogTitle = "添加55寸预报屏"
      },
      showEditFfcpView(row) {
        console.log(row)
        this.dialogVisible = true
        this.dialogTitle = "编辑55寸预报屏"
        this.ffcp = row
        this.ffcp.sbzbh = row.sbzbh
        this.ffcp.qypbh = row.qypbh
        this.ffcp.qypmc = row.qypmc
        this.ffcp.htbh = row.htbh
        this.ffcp.sblb = row.sblb
        this.ffcp.sbgzzt = row.sbgzzt
        this.ffcp.azzdmc = row.azzdmc
        this.ffcp.gldj = row.gldj
        this.ffcp.sbppdm = row.sbppdm
        this.ffcp.sbpp = row.sbpp
        this.ffcp.sbxhdm = row.sbxhdm
        this.ffcp.sbxh = row.sbxh
        this.ffcp.sbccmc = row.sbccmc
        this.ffcp.gdffmc = row.gdffmc
        this.ffcp.simkh = row.simkh
        this.ffcpGsOption = [row.sbgsjtmc, row.sbgsgsmc, row.sbgscdmc, row.sbgsxldm]
        this.ffcpPpxhOption = [row.sbppdm, row.sbxhdm]
        this.ffcp.sbqdrq = this.formatDate(row.sbqdrq)
        this.ffcp.sbgxrq = this.formatDate(row.sbgxrq)
        this.ffcp.sbbfrq = this.formatDate(row.sbbfrq)
        this.ffcp.gysmc = row.gysmc
        this.ffcp.jcsmc = row.jcsmc
        this.ffcp.tmbh = row.tmbh
        this.ffcp.ewmbh = row.ewmbh
      },
      cancelEidt() {
        this.dialogVisible = false
        this.emptyFfcpData()
      },
      deleteFfcp(row) {
        this.$confirm('此操作将永久删除设备:55寸屏' + row.sbzbh + ', 是否继续?', '提示', {
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
      deleteManyFfcps() {
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
        this.loadfFCPData()
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        this.pageSize = val
        this.loadFfcpData()
      },
      handlePpxhChange(value) {
        this.ffcpPpxhOption = value
        // this.getPpxhInfo(value, this.rfid4g.sbppdm, this.rfid4g.sbxhdm, this.rfid4g.sbpp, this.rfid4g.sbxh, this.sbppxh)
        // 设置代码=>dm
        this.ffcp.sbppdm = value[0]
        this.ffcp.sbxhdm = value[1]
        // 设置名称=>mc
        var pp = parseInt(value[0])
        var xh = parseInt(value[1])
        if (pp && xh) {
          xh = parseInt((value[1]).substring(2, 4))
          this.ffcp.sbpp = this.sbppxh[pp - 1].label
          this.ffcp.sbxh = this.sbppxh[pp - 1].children[xh - 1].label
        }
        // 但就是未成功修改ffcp
        console.log(this.ffcp)
      },
      handleGsChange(value) {
        this.ffcpGsOption = value
        this.ffcp.sbgsjtdm = value[0]
        this.ffcp.sbgsgsdm = value[1]
        this.ffcp.sbgscddm = value[2]
        this.ffcp.sbgsxldm = value[3]
        // 设置名称
        var jt = parseInt(value[0])
        var gs = parseInt(value[1])
        var cd = parseInt(value[2])
        var xl = parseInt(value[3])
        if (jt && gs) {
          console.log('集团', jt)
          gs = parseInt((value[1]).substring(2, 4))
          console.log('公司', gs)
          if (cd) {
            cd = parseInt((value[2]).substring(4, 6))
            if (xl) {
              xl = parseInt((value[3]).substring(6, 8))
              // console.log('线路', xl)
              this.ffcp.sbgsjtmc = this.ffcpGsOptions[jt - 1].label
              this.ffcp.sbgsgsmc = this.ffcpGsOptions[jt - 1].children[gs - 1].label
              this.ffcp.sbgscdmc = this.ffcpGsOptions[jt - 1].children[gs - 1].children[cd - 1].label
              this.ffcp.sbgsxlmc = this.ffcpGsOptions[jt - 1].children[gs - 1].children[cd - 1].children[xl - 1].label
              console.log(this.ffcp)
            }
          }
        }
      },
      emptyFfcpGs() {
        this.ffcpGsOption = ['', '', '', '']
      },
      emptyFfcpPpxh() {
        this.ffcpPpxhOption = ['', '']
      },
      emptyFfcpData() {
        this.emptyFfcpGs()
        this.emptyFfcpPpxh()
        this.ffcp = {
          sblb: '',
          sbzbh: '',
          qypbh: '',
          qypmc: '',
          azzdmc: '',
          ztmc: '',
          sbgzzt: '',
          htbh: '',
          gldj: '',
          sbpp: '',
          sbxh: '',
          sbccmc: '',
          gdffmc: '',
          simkh: '',
          sbgsjtmc: '',
          sbgsgsmc: '',
          sbgscdmc: '',
          // sbgszdmc: '',
          sbgsxlmc: '',
          sbqdrq: '',
          sbgxrq: '',
          sbbfrq: '',
          gysmc: '',
          jcsmc: '',
          tmbh: '',
          ewmbh: ''
        }
      },
      loadFfcpData() {
        var _this = this
        this.tableLoading = true
        let params = {
          page: this.currentPage,
          pagePize: this.pageSize,
          orderItemName: '',
          order: '',
          sblb: this.ffcp.sblb,
          gzzt: '',
          sbzbh: this.ffcp.sbzbh,
          // 区域片编号
          qypbh: this.ffcp.qypbh,
          ssxzdm: '',
          ssxzqy: '',
          zdbh: '',
          jzbh: '',
          azzp: '',
          dyxljhdm: '',
          dyxljhmc: '',
          sbxh: this.ffcp.sbxh,
          sbpp: this.ffcp.sbpp,
          // sbcc:this.ffcp.sbcc,
          // sbgd:this.ffcp.sbgd,
          simkh: '',
          gldj: this.ffcp.gldj,
          sbgsjtdm: this.ffcpGsOption[0],
          sbgsjtmc: '',
          sbgsgsdm: this.ffcpGsOption[1],
          sbgsgsmc: '',
          sbgscddm: this.ffcpGsOption[2],
          sbgscdmc: '',
          sbgsxldm: this.ffcpGsOption[3],
          sbgsxlmc: '',
          gysdm: '',
          gysmc: this.ffcp.gysmc,
          jcsdm: '',
          jcsmc: this.ffcp.jcsmc,
          beginDateScope: this.beginDateScope,
          updateDateScope: this.updateDateScope,
          endDateScope: this.endDateScope
        }
        console.log('1123 本次查询参数为')
        console.log(params)
        this.getRequest('/api/ffcp/basic/jt1').then(res => {
          _this.tableLoading = false
          if (res && res.status === 200) {
            _this.Sbs = res.data.FfcpList
            // totalPage会发生改变 currentPage、pageSize是向服务端发送的
            _this.totalPage = res.data.totalRow
          }
        })
      },
      importFfcps() {
        window.open("/employee/basic/exportEmp", "_parent")
      },
      exportFfcps() {
        window.open("/employee/basic/exportEmp", "_parent")
      }
    },
    mounted() {
      this.initData()
      this.loadFfcpData()
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
