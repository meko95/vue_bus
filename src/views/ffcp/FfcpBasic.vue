<template>
  <div>
    <ElementHeader></ElementHeader>
    <el-container style="height: 701px; border: 1px solid #eee">
      <!-- Side Begin -->
      <SideBar sb-type="55寸屏" @listenToChildEvent="handleGsTreeSelect"></SideBar>
      <!-- Container Begin -->
      <!-- 尺寸、供电方式 -->
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
                    设备自编号:
                    <el-input prefix-icon="el-icon-search" v-model="ffcp.sbzbh" size="small" style="width: 150px"
                              placeholder="长度为12位"></el-input>
                  </el-col>
                  <el-col :span="5">
                    合同编号:
                    <el-input prefix-icon="el-icon-search" v-model="ffcp.htbh" size="small" style="width: 150px"
                              placeholder="长度为10位"></el-input>
                  </el-col>
                  <el-col :span="5">
                    屏编号:
                    <el-input prefix-icon="el-icon-search" v-model="ffcp.pbh" size="small" style="width: 150px"
                              placeholder="长度为10位"></el-input>
                  </el-col>
                  <el-col :span="4">
                    分片区域:
                    <el-select v-model="ffcp.qypbh" style="width: 120px" clearable size="small" placeholder="请选择"
                               @change="handleFpChange">
                      <el-option v-for="item in fps" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    站亭名称:
                    <el-select v-model="ffcp.ztbh" style="width: 120px" clearable size="small" placeholder="请选择"
                               @change="handleZtChange">
                      <el-option v-for="item in zts" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 18px">
                  <el-col :span="4">
                    安装站点:
                    <el-select v-model="ffcp.zdbh" style="width: 120px" clearable size="small" placeholder="请选择"
                               @change="handleZdChange">
                      <el-option v-for="item in zds" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    行政区域:
                    <el-select v-model="ffcp.ssxzqydm" style="width: 120px" clearable size="small" placeholder="请选择"
                               @change="handleXzqyChange">
                      <el-option v-for="item in ssxzqys" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    光照条件:
                    <el-select v-model="ffcp.gztjdm" style="width: 120px" clearable size="small" placeholder="请选择"
                               @change="handleGztjChange">
                      <el-option v-for="item in gztjs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    管理等级:
                    <el-select v-model="ffcp.gldjdm" style="width: 110px" clearable size="small" placeholder="管理等级"
                               @change="handleGldjChange">
                      <el-option v-for="item in gldjs" :key="item.id" :label="item.descriptionZh"
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
                      v-model="ffcpPpxhOption"
                      @change="handlePpxhChange"
                      change-on-select>
                    </el-cascader>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 18px">
                  <el-col :span="4">
                    尺寸:
                    <el-select v-model="ffcp.sbccdm" style="width: 110px" clearable size="small" placeholder="管理等级"
                               @change="handleSbccChange">
                      <el-option v-for="item in sbccs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    供电方法:
                    <el-select v-model="ffcp.gdffdm" style="width: 110px" clearable size="small" placeholder="供电方法"
                               @change="handleGdffChange">
                      <el-option v-for="item in gdffs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
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
                    <el-select v-model="ffcp.gysdm" style="width: 130px" size="small" placeholder="请选择供应商"
                               @change="handleGysChange">
                      <el-option v-for="item in gs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    集成商:
                    <el-select v-model="ffcp.jcsdm" style="width: 130px" size="small" placeholder="请选择集成商"
                               @change="handleJcsChange">
                      <el-option v-for="item in gs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="5">
                    条码编号:
                    <el-input prefix-icon="el-icon-search" v-model="ffcp.tmbh" size="small" style="width: 150px"
                              placeholder="长度为10位"></el-input>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 18px">
                  <el-col :span="5">
                    二维码编号:
                    <el-input prefix-icon="el-icon-search" v-model="ffcp.ewmbh" size="small" style="width: 150px"
                              placeholder="长度为10位"></el-input>
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
              <el-table-column prop="pbh" label="屏编号" width="100" align="center"></el-table-column>
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
              <el-table-column prop="ztbh" label="站亭编号" width="100" align="center"></el-table-column>
              <el-table-column prop="ztmc" label="站亭名称" width="80" align="center"></el-table-column>
              <el-table-column prop="zdmc" label="安装站点" width="110" align="center"></el-table-column>
              <el-table-column prop="ssxzqy" label="行政区域" width="80" align="center"></el-table-column>
              <el-table-column prop="gztj" label="光照条件" width="80" align="center"></el-table-column>
              <el-table-column prop="gldj" label="管理等级" width="80" align="center"></el-table-column>
              <el-table-column prop="sbpp" label="品牌" width="70" align="center"></el-table-column>
              <el-table-column prop="sbxh" label="型号" width="70" align="center"></el-table-column>
              <el-table-column prop="sbccmc" label="尺寸" width="70" align="center"></el-table-column>
              <el-table-column prop="gdffmc" label="供电" width="70" align="center"></el-table-column>
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
              <el-table-column prop="simkh" label="SIM卡号" width="160" align="center"></el-table-column>
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
      <!-- FORM Begin -->
      <el-form :model="ffcp" :rules="rules" ref="ffcp" style="margin: 0px;padding: 0px;">
        <div style="text-align: left">
          <el-dialog :title="dialogTitle" style="padding: auto;" :close-on-click-modal="false"
                     :visible.sync="dialogVisible" width="77%" @close="cancelAdd('ffcp')">
            <el-row style="padding-left: 100px">
              <el-col :span="7">
                <div>
                  <el-form-item label="55寸屏编号:" prop="sbzbh">
                    <el-input prefix-icon="el-icon-edit" v-model="ffcp.sbzbh" size="small" style="width: 150px"
                              placeholder="长度为12位"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7">
                <div>
                  <el-form-item label="合同编号:" prop="htbh">
                    <el-input prefix-icon="el-icon-edit" v-model="ffcp.htbh" size="small" style="width: 150px"
                              placeholder="长度为10位"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7">
                <div>
                  <el-form-item label="屏编号:" prop="pbh">
                    <el-input prefix-icon="el-icon-edit" v-model="ffcp.pbh" size="small" style="width: 150px"
                              placeholder="长度为10位"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row style="padding-left: 100px">
              <el-col :span="7">
                <div>
                  <el-form-item label="工作状态:" prop="sbgzzt">
                    <el-select v-model="ffcp.sbgzztdm" style="width: 120px" size="small" placeholder="请选择"
                               @change="handleGzztChange">
                      <el-option v-for="item in sbgzzts" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7">
                <div>
                  <el-form-item label="分片区域:" prop="qypmc">
                    <el-select v-model="ffcp.qypbh" style="width: 120px" size="small" placeholder="请选择"
                               @change="handleFpChange">
                      <el-option v-for="item in fps" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7">
                <div>
                  <el-form-item label="站亭名称:" prop="ztmc">
                    <el-select v-model="ffcp.ztbh" style="width: 120px" size="small" placeholder="请选择"
                               @change="handleZtChange">
                      <el-option v-for="item in zts" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row style="padding-left: 100px">
              <el-col :span="7">
                <div>
                  <el-form-item label="安装站点:" prop="zdmc">
                    <el-select v-model="ffcp.zdbh" style="width: 120px" size="small" placeholder="请选择"
                               @change="handleZdChange">
                      <el-option v-for="item in zds" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7">
                <div>
                  <el-form-item label="行政区域:" prop="ssxzqy">
                    <el-select v-model="ffcp.ssxzqydm" style="width: 120px" size="small" placeholder="请选择"
                               @change="handleXzqyChange">
                      <el-option v-for="item in ssxzqys" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div>
                  <el-form-item label="光照条件:" prop="gztj">
                    <el-select v-model="ffcp.gztjdm" style="width: 120px" size="small" placeholder="光照条件"
                               @change="handleGztjChange">
                      <el-option v-for="item in gztjs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row style="padding-left: 100px">
              <el-col :span="7">
                <div>
                  <el-form-item label="管理等级:" prop="gldj">
                    <el-select v-model="ffcp.gldjdm" style="width: 120px" size="small" placeholder="管理等级"
                               @change="handleGldjChange">
                      <el-option v-for="item in gldjs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
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
              <el-col :span="6">
                <div>
                  <el-form-item label="设备尺寸:" prop="sbccmc">
                    <el-select v-model="ffcp.sbccdm" style="width: 120px" size="small" placeholder="设备尺寸"
                               @change="handleSbccChange">
                      <el-option v-for="item in sbccs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row style="padding-left: 100px">
              <el-col :span="7">
                <div>
                  <el-form-item label="供电方法:" prop="gdffmc">
                    <el-select v-model="ffcp.gdffdm" style="width: 120px" size="small" placeholder="设备尺寸"
                               @change="handleGdffChange">
                      <el-option v-for="item in gdffs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
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
              <el-col :span="7">
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
              <el-col :span="7">
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
                    <el-select v-model="ffcp.gysdm" style="width: 130px" size="small" placeholder="供应商"
                               @change="handleGysChange">
                      <el-option v-for="item in gs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row style="padding-left: 100px">
              <el-col :span="7">
                <div>
                  <el-form-item label="集成商:" prop="jcsmc">
                    <el-select v-model="ffcp.jcsdm" style="width: 130px" size="small" placeholder="集成商"
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
                    <el-input prefix-icon="el-icon-edit" v-model="ffcp.simkh" size="small" style="width: 150px"
                              placeholder="长度为20位"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div>
                  <el-form-item label="条码编号:" prop="tmbh">
                    <el-input prefix-icon="el-icon-edit" v-model="ffcp.tmbh" size="small" style="width: 150px"
                              placeholder="长度为10位"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row style="padding-left: 100px">
              <el-col :span="8">
                <div>
                  <el-form-item label="二维码编号:" prop="ewmbh">
                    <el-input prefix-icon="el-icon-edit" v-model="ffcp.ewmbh" size="small" style="width: 180px"
                              placeholder="长度为10位"></el-input>
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
          sbzbh: '',
          htbh: '',
          pbh: '',
          sbgzztdm: '',
          sbgzzt: '',
          azzp: '',
          azzpzmz: '',
          azzpcmz: '',
          qypbh: '',
          qypmc: '',
          ztbh: '',
          ztmc: '',
          zdbh: '',
          zdmc: '',
          ssxzqydm: '',
          ssxzqy: '',
          gztjdm: '',
          gztj: '',
          gldjdm: '',
          gldj: '',
          sbppdm: '',
          sbpp: '',
          sbxhdm: '',
          sbxh: '',
          sbccdm: '',
          sbccmc: '',
          gdffdm: '',
          gdffmc: '',
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
          htbh: [{required: true, validator: this.validateHtbh, trigger: 'blur'}],
          pbh: [{required: true, validator: this.validatePbh, trigger: 'blur'}],
          sbgzzt: [{required: true, message: '必填:工作状态', trigger: 'blur'}],
          qypmc: [{required: true, message: '必填:分片区域', trigger: 'blur'}],
          ztmc: [{required: true, message: '必填:站亭名称', trigger: 'blur'}],
          zdmc: [{required: true, message: '必填:安装站点', trigger: 'blur'}],
          ssxzqy: [{required: true, message: '必填:区域名称', trigger: 'blur'}],
          gztj: [{required: true, message: '必填:光照条件', trigger: 'blur'}],
          gldj: [{required: true, message: '必填:管理等级', trigger: 'blur'}],
          ffcpPpxhOption: [{required: false, message: '必填:品牌型号', trigger: 'blur'}],
          sbccmc: [{required: true, message: '必填:尺寸', trigger: 'blur'}],
          gdffmc: [{required: true, message: '必填:供电方式', trigger: 'blur'}],
          ffcpGsOption: [{required: false, message: '必填:设备归属信息', trigger: 'blur'}],
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
        ffcpPpxhOption: ['', ''],
        fileUploadBtnText: '导入数据',
        dialogTitle: '',
        gs: [],
        gldjs: [],
        sbgzzts: [],
        fps: [],
        gztjs: [],
        sbppxh: [],
        ssxzqys: [],
        zts: [],
        zds: [],
        sbccs: [],
        gdffs: [],
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
        this.ffcpGsOptions = this.$store.getters.getAllSubsidiary
        this.getRequest('/api/Sbs/gzzt').then(res => {
          if (res && res.status === 200) {
            _this.sbgzzts = res.data.GzztList
          }
        })
        this.getRequest('/api/Sbs/ppxh').then(res => {
          if (res && res.status === 200) {
            _this.sbppxh = res.data.PpxhList
          }
        })
        this.getRequest('/api/Sbs/ssxzqy').then(res => {
          if (res && res.status === 200) {
            _this.ssxzqys = res.data.SsxzqyList
          }
        })
        this.getRequest('/api/Sbs/zt').then(res => {
          if (res && res.status === 200) {
            _this.zts = res.data.ZtList
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
        this.getRequest('/api/Sbs/gztj').then(res => {
          if (res && res.status === 200) {
            _this.gztjs = res.data.GztjList
          }
        })
        this.getRequest('/api/Sbs/sbcc').then(res => {
          if (res && res.status === 200) {
            _this.sbccs = res.data.SbccList
          }
        })
        this.getRequest('/api/Sbs/gdff').then(res => {
          if (res && res.status === 200) {
            _this.gdffs = res.data.GdffList
          }
        })
      },
      // HANDLE FUNCTIONS
      handleGsTreeSelect(data) {
        var _this = this
        this.cardTitle = data.label
        let [jtdm, gsdm, cddm, xldm] = this.getGsTreeInfo(data, this.ffcp.sbgsjtdm, this.ffcp.sbgsgsdm, this.ffcp.sbgscddm, this.ffcp.sbgsxldm)
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
        this.getRequest('/api/ffcp/basic', params).then(res => {
          _this.tableLoading = false
          if (res && res.status === 200) {
            _this.Sbs = res.data.FfcpList
            // totalRow会发生改变 currentPage、pageSize是向服务端发送的
            _this.totalPage = res.data.totalRow
          }
        })
      },
      handleQypbhChange(val) {
        if (val === '') {
          this.loadFfcpData()
        }
      },
      handleGzztChange(val) {
        var gzzt = parseInt(val)
        if (gzzt) {
          this.ffcp.sbgzzt = this.sbgzzts[gzzt - 1].descriptionZh
        }
      },
      handleFpChange(val) {
        var fp = parseInt(val)
        if (fp) {
          this.ffcp.qypmc = this.fps[fp - 1].descriptionZh
        }
      },
      handleZtChange(val) {
        var zt = parseInt(val)
        if (zt) {
          this.ffcp.ztmc = this.zts[zt - 1].descriptionZh
        }
      },
      handleZdChange(val) {
        var zd = parseInt(val)
        if (zd) {
          this.ffcp.zdmc = this.zds[zd - 1].descriptionZh
        }
      },
      handleXzqyChange(val) {
        var xzqy = parseInt(val)
        if (xzqy) {
          this.ffcp.ssxzqy = this.ssxzqys[xzqy - 1].descriptionZh
        }
      },
      handleGztjChange(val) {
        var gztj = parseInt(val)
        if (gztj) {
          this.ffcp.gztj = this.gztjs[gztj - 1].descriptionZh
        }
      },
      handleGldjChange(val) {
        var gldj = parseInt(val)
        if (gldj) {
          this.ffcp.gldj = this.gldjs[gldj - 1].descriptionZh
        }
      },
      handlePpxhChange(value) {
        this.ffcpPpxhOption = value
        let [ppdm, pp, xhdm, xh] = this.getPpxhInfo(value, this.ffcp.sbppdm, this.ffcp.sbxhdm, this.ffcp.sbpp, this.ffcp.sbxh, this.sbppxh)
        this.ffcp.sbppdm = ppdm
        this.ffcp.sbpp = pp
        this.ffcp.sbxhdm = xhdm
        this.ffcp.sbxh = xh
        console.log(this.ffcp)
      },
      handleSbccChange(val) {
        var sbcc = parseInt(val)
        if (sbcc) {
          this.ffcp.sbccmc = this.sbccs[sbcc - 1].descriptionZh
        }
      },
      handleGdffChange(val) {
        var gdff = parseInt(val)
        if (gdff) {
          this.ffcp.gdffmc = this.gdffs[gdff - 1].descriptionZh
        }
      },
      handleGysChange(val) {
        var gys = parseInt(val)
        if (gys) {
          this.ffcp.gysmc = this.gs[gys - 1].descriptionZh
        }
      },
      handleJcsChange(val) {
        var jcs = parseInt(val)
        if (jcs) {
          this.ffcp.jcsmc = this.gs[jcs - 1].descriptionZh
        }
      },
      handleGsChange(value) {
        this.ffcpGsOption = value
        let [jtdm, jtmc, gsdm, gsmc, cddm, cdmc, xldm, xlmc] = this.getGsInfo(value, this.ffcpGsOptions, this.ffcp.sbgsjtdm, this.ffcp.sbgsjtmc, this.ffcp.sbgsgsdm, this.ffcp.sbgsgsmc, this.ffcp.sbgscddm, this.ffcp.sbgscdmc, this.ffcp.sbgsxldm, this.ffcp.sbgsxlmc)
        this.ffcp.sbgsjtdm = jtdm
        this.ffcp.sbgsjtmc = jtmc
        this.ffcp.sbgsgsdm = gsdm
        this.ffcp.sbgsgsmc = gsmc
        this.ffcp.sbgscddm = cddm
        this.ffcp.sbgscdmc = cdmc
        this.ffcp.sbgsxldm = xldm
        this.ffcp.sbgsxlmc = xlmc
        console.log(this.ffcp)
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        this.pageSize = val
        this.loadFfcpData()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.loadFfcpData()
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
      showAddFfcpView() {
        this.dialogVisible = true
        this.dialogTitle = "添加55寸预报屏"
      },
      addFfcp(formName) {
        var _this = this
        _this.dialogVisible = true
        this.$refs[formName].validate((valid) => {
          if (valid) {
            _this.ffcp.sbjyh = Date.now().toString()
            console.log('ffcp表单信息（先）', this.ffcp)
          } else {
            return false
          }
        })
      },
      cancelAdd(formName) {
        this.$refs[formName].resetFields()
        this.emptyFfcpData()
      },
      showEditFfcpView(row) {
        console.log(row)
        this.dialogVisible = true
        this.dialogTitle = "编辑55寸预报屏"
        this.ffcp = row
        this.ffcp.sbjyh = row.sbjyh
        this.ffcp.sbzbh = row.sbzbh
        this.ffcp.htbh = row.htbh
        this.ffcp.pbh = row.pbh
        // this.ffcp.sbgzztdm = row.sbgzztdm
        this.ffcp.sbgzzt = row.sbgzzt
        this.ffcp.qypbh = row.qypbh
        this.ffcp.qypmc = row.qypmc
        // this.ffcp.ztbh = row.ztbh
        this.ffcp.ztmc = row.ztmc
        // this.ffcp.zdbh = row.zdbh
        this.ffcp.zdmc = row.zdmc
        // this.ffcp.ssxzqydm = row.ssxzqydm
        this.ffcp.ssxzqy = row.ssxzqy
        // this.ffcp.gztjdm = row.gztjdm
        this.ffcp.gztj = row.gztj
        // this.ffcp.gldjdm = row.gldjdm
        this.ffcp.gldj = row.gldj
        // this.ffcp.sbppdm = row.sbppdm
        this.ffcp.sbpp = row.sbpp
        // this.ffcp.sbxhdm = row.sbxhdm
        this.ffcp.sbxh = row.sbxh
        // this.ffcp.sbccdm = row.sbccdm
        this.ffcp.sbccmc = row.sbccmc
        // this.ffcp.gdffdm = row.gdffdm
        this.ffcp.gdffmc = row.gdffmc
        this.ffcpGsOption = [row.sbgsjtdm, row.sbgsgsdm, row.sbgscddm, row.sbgsxldm]
        this.ffcpPpxhOption = [row.sbppdm, row.sbxhdm]
        this.ffcp.sbgsjtmc = row.sbgsjtmc
        this.ffcp.sbgsgsmc = row.sbgsgsmc
        this.ffcp.sbgscdmc = row.sbgscdmc
        this.ffcp.sbgsxlmc = row.sbgsxlmc
        this.ffcp.sbqdrq = this.formatDate(row.sbqdrq)
        this.ffcp.sbgxrq = this.formatDate(row.sbgxrq)
        this.ffcp.sbbfrq = this.formatDate(row.sbbfrq)
        this.ffcp.gysmc = row.gysmc
        this.ffcp.jcsmc = row.jcsmc
        this.ffcp.simkh = row.simkh
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
          sbzbh: '',
          htbh: '',
          pbh: '',
          sbgzztdm: '',
          sbgzzt: '',
          azzp: '',
          azzpzmz: '',
          azzpcmz: '',
          qypbh: '',
          qypmc: '',
          ztbh: '',
          ztmc: '',
          zdbh: '',
          zdmc: '',
          ssxzqydm: '',
          ssxzqy: '',
          gztjdm: '',
          gztj: '',
          gldjdm: '',
          gldj: '',
          sbppdm: '',
          sbpp: '',
          sbxhdm: '',
          sbxh: '',
          sbccdm: '',
          sbccmc: '',
          gdffdm: '',
          gdffmc: '',
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
      loadFfcpData() {
        var _this = this
        let params
        this.tableLoading = true
        if (this.ffcp.sbgsjtdm) {
          params = {
            page: this.currentPage,
            pagePize: this.pageSize,
            orderItemName: '',
            order: '',
            sbzbh: this.ffcp.sbzbh,
            htbh: this.ffcp.htbh,
            pbh: this.ffcp.pbh,
            sbgzztdm: this.ffcp.sbgzztdm,
            // sbgzzt: '',
            // azzp: '',
            // azzpzmz: '',
            // azzpcmz: '',
            qypbh: this.ffcp.qypbh,
            // qypmc: '',
            ztbh: this.ffcp.ztbh,
            // ztmc: '',
            zdbh: this.ffcp.zdbh,
            // zdmc: '',
            ssxzqydm: this.ffcp.ssxzqydm,
            // ssxzqy: '',
            gztjdm: this.ffcp.gztjdm,
            // gztj: '',
            gldjdm: this.ffcp.gldjdm,
            // gldj: '',
            sbppdm: this.ffcp.sbppdm,
            // sbpp: '',
            sbxhdm: this.ffcp.sbxhdm,
            // sbxh: '',
            sbccdm: this.ffcp.sbccdm,
            // sbccmc: '',
            gdffdm: this.ffcp.gdffdm,
            // gdffmc: '',
            sbgsjtdm: this.ffcp.sbgsjtdm,
            // sbgsjtmc: '',
            sbgsgsdm: this.ffcp.sbgsgsdm,
            // sbgsgsmc: '',
            sbgscddm: this.ffcp.sbgscddm,
            // sbgscdmc: '',
            sbgsxldm: this.ffcp.sbgsxldm,
            // sbgsxlmc: '',
            sbqdrq: this.ffcp.sbqyrq,
            sbgxrq: this.ffcp.sbgxrq,
            sbbfrq: this.ffcp.sbbfrq,
            gysdm: this.ffcp.gysdm,
            // gysmc: '',
            jcsdm: this.ffcp.jcsdm,
            // jcsmc: '',
            simkh: '',
            tmbh: this.ffcp.tmbh,
            ewmbh: this.ffcp.ewmbh,
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
        this.getRequest('/api/ffcp/basic', params).then(res => {
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
