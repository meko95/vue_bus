<template>
  <div>
    <ElementHeader></ElementHeader>
    <el-container style="height: 701px; border: 1px solid #eee">
      <!-- Side Begin -->
      <SideBar sb-type="站杆预报屏" @listenToChildEvent="handleGsTreeSelect"></SideBar>
      <!-- Container Begin -->
      <!-- 设备材质、设备供电 -->
      <el-container>
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
              @keyup.enter.native="searchZgybp"
              prefix-icon="el-icon-search"
              v-model="zgybp.qypbh">
            </el-input>
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
          </div>
          <div style="margin-left: 0;display: inline">
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
                  <el-col :span="6">
                    站杆预报屏编号:
                    <el-input prefix-icon="el-icon-search" v-model="zgybp.sbzbh" size="small" style="width: 150px"
                              placeholder="设备查询编号"></el-input>
                  </el-col>
                  <el-col :span="5">
                    合同编号:
                    <el-input prefix-icon="el-icon-search" v-model="zgybp.htbh" size="small" style="width: 150px"
                              placeholder="设备合同编号"></el-input>
                  </el-col>
                  <el-col :span="4">
                    工作状态:
                    <el-select v-model="zgybp.sbgzztdm" style="width: 100px" size="small" placeholder="工作状态"
                               @change="handleGzztChange">
                      <el-option v-for="item in sbgzzts" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    分片区域:
                    <el-select v-model="zgybp.qypbh" style="width: 120px" clearable size="small" placeholder="请选择"
                               @change="handleFpChange">
                      <el-option v-for="item in fps" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    行政区域:
                    <el-select v-model="zgybp.ssxzqydm" style="width: 120px" clearable size="small" placeholder="请选择"
                               @change="handleXzqyChange">
                      <el-option v-for="item in ssxzqys" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 18px">
                  <el-col :span="5">
                    站牌编号:
                    <el-input prefix-icon="el-icon-search" v-model="zgybp.zpbh" size="small" style="width: 150px"
                              placeholder="站牌编号"></el-input>
                  </el-col>
                  <el-col :span="4">
                    站牌名称:
                    <el-select v-model="zgybp.zpbh" style="width: 100px" size="small" placeholder="站牌名称"
                               @change="handleZpChange">
                      <el-option v-for="item in zps" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    管理等级:
                    <el-select v-model="zgybp.gldjdm" style="width: 100px" size="small" placeholder="管理等级"
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
                      v-model="zgybpPpxhOption"
                      @change="handlePpxhChange"
                      change-on-select>
                    </el-cascader>
                  </el-col>
                  <el-col :span="4">
                    设备材质:
                    <el-select v-model="zgybp.pczdm" style="width: 100px" size="small" placeholder="设备材质"
                               @change="handlePczChange">
                      <el-option v-for="item in pczs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 18px">
                  <el-col :span="4">
                    供电方法:
                    <el-select v-model="zgybp.gdffdm" style="width: 110px" clearable size="small" placeholder="供电方法"
                               @change="handleGdffChange">
                      <el-option v-for="item in gdffs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    屏幕尺寸:
                    <el-select v-model="zgybp.sbccdm" style="width: 110px" clearable size="small" placeholder="屏幕尺寸"
                               @change="handleSbccChange">
                      <el-option v-for="item in sbccs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    光照条件:
                    <el-select v-model="zgybp.gztjdm" style="width: 120px" clearable size="small" placeholder="请选择"
                               @change="handleGztjChange">
                      <el-option v-for="item in gztjs" :key="item.id" :label="item.descriptionZh"
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
                      :options="zgybpGsOptions"
                      v-model="zgybpGsOption"
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
                    <el-select v-model="zgybp.gysmc" style="width: 130px" size="small" placeholder="请选择供应商"
                               @change="handleGysChange">
                      <el-option
                        v-for="item in gs"
                        :key="item.id"
                        :label="item.descriptionZh"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    集成商:
                    <el-select v-model="zgybp.jcsmc" style="width: 130px" size="small" placeholder="请选择集成商"
                               @change="handleJcsChange">
                      <el-option
                        v-for="item in gs"
                        :key="item.id"
                        :label="item.descriptionZh"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="5">
                    条码编号:
                    <el-input prefix-icon="el-icon-search" v-model="zgybp.tmbh" size="small" style="width: 150px"
                              placeholder="设备条码编号"></el-input>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 18px">
                  <el-col :span="5">
                    二维码编号:
                    <el-input prefix-icon="el-icon-search" v-model="zgybp.ewmbh" size="small" style="width: 150px"
                              placeholder="设备二维码编号"></el-input>
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
                      :default-sort="{prop: 'sbqdrq', order: 'descending'}">
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
              <el-table-column prop="ssxzqy" label="行政区域" width="80" align="center"></el-table-column>
              <el-table-column prop="zdmc" label="站点" width="85" align="center"></el-table-column>
              <el-table-column prop="zpbh" label="站牌编号" width="80" align="center"></el-table-column>
              <el-table-column prop="zpmc" label="站牌名称" width="80" align="center"></el-table-column>
              <el-table-column prop="gldj" label="管理等级" width="80" align="center"></el-table-column>
              <el-table-column prop="sbpp" label="品牌" width="70" align="center"></el-table-column>
              <el-table-column prop="sbxh" label="型号" width="70" align="center"></el-table-column>
              <el-table-column prop="pcz" label="材质" width="70" align="center"></el-table-column>
              <el-table-column prop="gdffmc" label="供电" width="70" align="center"></el-table-column>
              <el-table-column prop="sbccmc" label="尺寸" width="70" align="center"></el-table-column>
              <el-table-column prop="gztj" label="光照条件" width="80" align="center"></el-table-column>
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
      <!-- FORM Begin -->
      <el-form :model="zgybp" :rules="rules" ref="zgybp" style="margin: 0px;padding: 0px;">
        <div style="text-align: left">
          <el-dialog :title="dialogTitle" style="padding: auto;" :close-on-click-modal="false"
                     :visible.sync="dialogVisible" width="77%" @close="cancel_add('zgybp')">
            <el-row style="padding-left: 100px">
              <el-col :span="8">
                <div>
                  <el-form-item label="站杆预报屏编号:" prop="sbzbh">
                    <el-input prefix-icon="el-icon-edit" v-model="zgybp.sbzbh" size="small" style="width: 150px"
                              placeholder="请输入设备编号"></el-input>
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
              <el-col :span="7">
                <div>
                  <el-form-item label="工作状态:" prop="sbgzzt">
                    <el-select v-model="zgybp.sbgzztdm" style="width: 150px" size="small" placeholder="请选择"
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
                  <el-form-item label="分片区域:" prop="qypmc">
                    <el-select v-model="zgybp.qypbh" style="width: 120px" size="small" placeholder="请选择"
                               @change="handleFpChange">
                      <el-option v-for="item in fps" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7">
                <div>
                  <el-form-item label="行政区域:" prop="ssxzqy">
                    <el-select v-model="zgybp.ssxzqydm" style="width: 120px" size="small" placeholder="请选择"
                               @change="handleXzqyChange">
                      <el-option v-for="item in ssxzqys" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7">
                <div>
                  <el-form-item label="站点名称:" prop="zdmc">
                    <el-select v-model="zgybp.zdbh" style="width: 120px" size="small" placeholder="请选择"
                               @change="handleZdChange">
                      <el-option v-for="item in zds" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row style="padding-left: 100px">
              <el-col :span="7">
                <div>
                  <el-form-item label="站牌名称:" prop="zpmc">
                    <el-select v-model="zgybp.zpbh" style="width: 120px" size="small" placeholder="请选择"
                               @change="handleZpChange">
                      <el-option v-for="item in zps" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7">
                <div>
                  <el-form-item label="管理等级:" prop="gldj">
                    <el-select v-model="zgybp.gldjdm" style="width: 120px" size="small" placeholder="管理等级"
                               @change="handleGldjChange">
                      <el-option v-for="item in gldjs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7">
                <div>
                  <el-form-item label="品牌型号:" prop="zgybpPpxhOption">
                    <el-cascader
                      size="small"
                      placeholder="请选择设备品牌型号"
                      style="width:162px;"
                      expand-trigger="hover"
                      :options="sbppxh"
                      v-model="zgybpPpxhOption"
                      @change="handlePpxhChange"
                      change-on-select>
                    </el-cascader>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row style="padding-left: 100px">
              <el-col :span="7">
                <div>
                  <el-form-item label="设备材质:" prop="pcz">
                    <el-select v-model="zgybp.pczdm" style="width: 120px" size="small" placeholder="设备材质"
                               @change="handlePczChange">
                      <el-option v-for="item in pczs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7">
                <div>
                  <el-form-item label="供电方法:" prop="gdffmc">
                    <el-select v-model="zgybp.gdffdm" style="width: 120px" size="small" placeholder="供电方法"
                               @change="handleGdffChange">
                      <el-option v-for="item in gdffs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7">
                <div>
                  <el-form-item label="设备尺寸:" prop="sbccmc">
                    <el-select v-model="zgybp.sbccdm" style="width: 120px" size="small" placeholder="设备尺寸"
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
                  <el-form-item label="光照条件:" prop="gztj">
                    <el-select v-model="zgybp.gztjdm" style="width: 120px" size="small" placeholder="请选择"
                               @change="handleGztjChange">
                      <el-option v-for="item in gztjs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
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
                      @change="handleGsChange"
                      change-on-select>
                    </el-cascader>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7">
                <div>
                  <el-form-item label="启动日期:" prop="sbqdrq">
                    <el-date-picker
                      v-model="zgybp.sbqdrq"
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
              <el-col :span="7">
                <div>
                  <el-form-item label="供应商:" prop="gysmc">
                    <el-select v-model="zgybp.gysdm" style="width: 130px" size="small" placeholder="供应商"
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
                    <el-select v-model="zgybp.jcsdm" style="width: 130px" size="small" placeholder="集成商"
                               @change="handleJcsChange">
                      <el-option v-for="item in gs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
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
              <el-col :span="7">
                <div>
                  <el-form-item label="条码编号:" prop="tmbh">
                    <el-input prefix-icon="el-icon-edit" v-model="zgybp.tmbh" size="small" style="width: 150px"
                              placeholder="请输入条码编号"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row style="padding-left: 100px">
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
            <el-button size="large" type="primary" @click="addZgybp('zgybp')">确 定</el-button>
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
    name: "ZgybpBasic",
    data() {
      return {
        zgybp: {
          sbjyh: '',
          sbzbh: '',
          htbh: '',
          sbgzztdm: '',
          sbgzzt: '',
          azzp: '',
          azzpzmz: '',
          azzpcmz: '',
          qypbh: '',
          qypmc: '',
          ssxzqydm: '',
          ssxzqy: '',
          gldjdm: '',
          gldj: '',
          sbppdm: '',
          sbpp: '',
          sbxhdm: '',
          sbxh: '',
          pczdm: '',
          pcz: '',
          gdffdm: '',
          gdffmc: '',
          sbccdm: '',
          sbccmc: '',
          gztjdm: '',
          gztj: '',
          sbgsjtdm: '',
          sbgsjtmc: '',
          sbgsgsdm: '',
          sbgsgsmc: '',
          sbgscddm: '',
          sbgscdmc: '',
          sbgsxldm: '',
          sbgsxlmc: '',
          zdbh: '',
          zdmc: '',
          zpbh: '',
          zpmc: '',
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
          qypmc: [{required: true, message: '必填:分片区域', trigger: 'blur'}],
          ssxzqy: [{required: true, message: '必填:区域名称', trigger: 'blur'}],
          zdmc: [{required: true, message: '必填:归属站点', trigger: 'blur'}],
          zpmc: [{required: true, message: '必填:站牌名称', trigger: 'blur'}],
          gldj: [{required: true, message: '必填:管理等级', trigger: 'blur'}],
          zgybpPpxhOption: [[{required: false, message: '必填:设备品牌型号信息', trigger: 'blur'}],],
          // sbpp: [{required: true, message: '必填:品牌', trigger: 'blur'}],
          // sbxh: [{required: true, message: '必填:型号', trigger: 'blur'}],
          pcz: [{required: true, message: '必填:材质', trigger: 'blur'}],
          sbccmc: [{required: true, message: '必填:设备尺寸', trigger: 'blur'}],
          gdffmc: [{required: true, message: '必填:供电', trigger: 'blur'}],
          gztj: [{required: true, message: '必填:光照条件', trigger: 'blur'}],
          zgybpGsOption: [{required: false, message: '必填:设备归属信息', trigger: 'blur'}],
          // sbgsjtmc: [{required: true, message: '必填:归属集团', trigger: 'blur'}],
          // sbgsgsmc: [{required: true, message: '必填:归属公司', trigger: 'blur'}],
          // sbgscdmc: [{required: true, message: '必填:归属车队', trigger: 'blur'}],
          // sbgsxlmc: [{required: true, message: '必填:归属线路', trigger: 'blur'}],
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
        zgybpGsOption: ['', '', '', ''],
        zgybpPpxhOption: ['', ''],
        fileUploadBtnText: '导入数据',
        dialogTitle: '',
        sbgzzts: [],
        fps: [],
        ssxzqys: [],
        gldjs: [],
        gztjs: [],
        sbppxh: [],
        pczs: [],
        gdffs: [],
        sbccs: [],
        gztjs: [],
        zgybpGsOptions: [],
        zds: [],
        zps: [],
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
        this.getRequest('/api/Sbs/fp').then(res => {
          if (res && res.status === 200) {
            _this.fps = res.data.FpList
          }
        })
        this.getRequest('/api/Sbs/ssxzqy').then(res => {
          if (res && res.status === 200) {
            _this.ssxzqys = res.data.SsxzqyList
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
        this.getRequest('/api/Sbs/pcz').then(res => {
          if (res && res.status === 200) {
            _this.pczs = res.data.PczList
          }
        })
        this.getRequest('/api/Sbs/gdff').then(res => {
          if (res && res.status === 200) {
            _this.gdffs = res.data.GdffList
          }
        })
        this.getRequest('/api/Sbs/sbcc').then(res => {
          if (res && res.status === 200) {
            _this.sbccs = res.data.SbccList
          }
        })
        this.getRequest('/api/Sbs/gztj').then(res => {
          if (res && res.status === 200) {
            _this.gztjs = res.data.GztjList
          }
        })
        this.zgybpGsOptions = this.$store.getters.getAllSubsidiary
        this.getRequest('/api/Sbs/zd').then(res => {
          if (res && res.status === 200) {
            _this.zds = res.data.ZdList
          }
        })
        this.getRequest('/api/Sbs/zp').then(res => {
          if (res && res.status === 200) {
            _this.zps = res.data.ZpList
          }
        })
        this.getRequest('/api/Sbs/gs').then(res => {
          if (res && res.status === 200) {
            _this.gs = res.data.GsList
          }
        })
      },
      // HANDLE FUNCTIONS
      //handlePczChange
      handleGsTreeSelect(data) {
        var _this = this
        this.cardTitle = data.label
        let [jtdm, gsdm, cddm, xldm] = this.getGsTreeInfo(data, this.zgybp.sbgsjtdm, this.zgybp.sbgsgsdm, this.zgybp.sbgscddm, this.zgybp.sbgsxldm)
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
        this.getRequest('/api/zgybp/basic', params).then(res => {
          _this.tableLoading = false
          if (res && res.status === 200) {
            _this.Sbs = res.data.ZgybpList
            // totalRow会发生改变 currentPage、pageSize是向服务端发送的
            _this.totalPage = res.data.totalRow
          }
        })
      },
      handleQypbhChange(val) {
        if (val === '') {
          this.loadZgybpData()
        }
      },
      handleGzztChange(val) {
        var gzzt = parseInt(val)
        if (gzzt) {
          this.zgybp.sbgzzt = this.sbgzzts[gzzt - 1].descriptionZh
        }
      },
      handleFpChange(val) {
        var fp = parseInt(val)
        if (fp) {
          this.zgybp.qypmc = this.fps[fp - 1].descriptionZh
        }
      },
      handleXzqyChange(val) {
        var xzqy = parseInt(val)
        if (xzqy) {
          this.zgybp.ssxzqy = this.ssxzqys[xzqy - 1].descriptionZh
        }
      },
      handleGldjChange(val) {
        var gldj = parseInt(val)
        if (gldj) {
          this.zgybp.gldj = this.gldjs[gldj - 1].descriptionZh
        }
      },
      handlePpxhChange(value) {
        this.zgybpPpxhOption = value
        let [ppdm, pp, xhdm, xh] = this.getPpxhInfo(value, this.zgybp.sbppdm, this.zgybp.sbxhdm, this.zgybp.sbpp, this.zgybp.sbxh, this.sbppxh)
        this.zgybp.sbppdm = ppdm
        this.zgybp.sbpp = pp
        this.zgybp.sbxhdm = xhdm
        this.zgybp.sbxh = xh
        console.log(this.zgybp)
      },
      handlePczChange(val) {
        var pcz = parseInt(val)
        if (pcz) {
          this.zgybp.pcz = this.pczs[pcz - 1].descriptionZh
        }
      },
      handleGdffChange(val) {
        var gdff = parseInt(val)
        if (gdff) {
          this.zgybp.gdffmc = this.gdffs[gdff - 1].descriptionZh
        }
      },
      handleSbccChange(val) {
        var sbcc = parseInt(val)
        if (sbcc) {
          this.zgybp.sbccmc = this.sbccs[sbcc - 1].descriptionZh
        }
      },
      handleGztjChange(val) {
        var gztj = parseInt(val)
        if (gztj) {
          this.zgybp.gztj = this.gztjs[gztj - 1].descriptionZh
        }
      },
      handleGsChange(value) {
        this.zgybpGsOption = value
        let [jtdm, jtmc, gsdm, gsmc, cddm, cdmc, xldm, xlmc] = this.getGsInfo(value, this.zgybpGsOptions, this.zgybp.sbgsjtdm, this.zgybp.sbgsjtmc, this.zgybp.sbgsgsdm, this.zgybp.sbgsgsmc, this.zgybp.sbgscddm, this.zgybp.sbgscdmc, this.zgybp.sbgsxldm, this.zgybp.sbgsxlmc)
        this.zgybp.sbgsjtdm = jtdm
        this.zgybp.sbgsjtmc = jtmc
        this.zgybp.sbgsgsdm = gsdm
        this.zgybp.sbgsgsmc = gsmc
        this.zgybp.sbgscddm = cddm
        this.zgybp.sbgscdmc = cdmc
        this.zgybp.sbgsxldm = xldm
        this.zgybp.sbgsxlmc = xlmc
        console.log(this.zgybp)
      },
      handleZdChange(val) {
        var zd = parseInt(val)
        if (zd) {
          this.zgybp.zdmc = this.zds[zd - 1].descriptionZh
        }
      },
      handleZpChange(val) {
        var zp = parseInt(val)
        if (zp) {
          this.zgybp.zpmc = this.zps[zp - 1].descriptionZh
        }
      },
      handleGysChange(val) {
        var gys = parseInt(val)
        if (gys) {
          this.zgybp.gysmc = this.gs[gys - 1].descriptionZh
        }
      },
      handleJcsChange(val) {
        var jcs = parseInt(val)
        if (jcs) {
          this.zgybp.jcsmc = this.gs[jcs - 1].descriptionZh
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
      showAdvanceSearchView() {
        this.advanceSearchViewVisible = !this.advanceSearchViewVisible
        this.zgybp.qypbh = ''
        if (!this.advanceSearchViewVisible) {
          this.emptyZgybpData()
          this.beginDateScope = ''
          this.updateDateScope = ''
          this.endDateScope = ''
          this.loadZgybpData()
        }
      },
      searchZgybp() {
        this.loadZgybpData()
      },
      cancelSearch() {
        this.advanceSearchViewVisible = false
        this.emptyZgybpData()
        this.beginDateScope = ''
        this.updateDateScope = ''
        this.endDateScope = ''
        this.loadZgybpData()
      },
      showAddZgybpView() {
        this.dialogVisible = true
        this.dialogTitle = "添加站杆预报屏"
      },
      addZgybp(formName) {
        var _this = this
        _this.dialogVisible = true
        this.$refs[formName].validate((valid) => {
          if (valid) {
            _this.zgybp.sbjyh = Date.now().toString()
            console.log('zgybp表单信息（先）', this.zgybp)
          } else {
            return false
          }
        })
      },
      cancel_add(formName) {
        this.$refs[formName].resetFields()
        this.emptyZgybpData()
      },
      showEditZgybpView(row) {
        console.log(row)
        this.dialogVisible = true
        this.dialogTitle = "编辑站杆预报屏"
        this.zgybp = row
        this.zgybp.sbjyh = row.sbjyh
        this.zgybp.sbzbh = row.sbzbh
        this.zgybp.htbh = row.htbh
        this.zgybp.sbgzzt = row.sbgzzt
        this.zgybp.qypbh = row.qypbh
        this.zgybp.qypmc = row.qypmc
        this.zgybp.ssxzqy = row.ssxzqy
        this.zgybp.zdmc = row.zdmc
        this.zgybp.zpbh = row.zpbh
        this.zgybp.zpmc = row.zpmc
        this.zgybp.gldj = row.gldj
        this.zgybpPpxhOption = [row.sbppdm, row.sbxhdm]
        this.zgybp.sbpp = row.sbpp
        this.zgybp.sbxh = row.sbxh
        this.zgybp.pcz = row.pcz
        this.zgybp.sbccmc = row.sbccmc
        this.zgybp.gdffmc = row.gdffmc
        this.zgybp.gztj = row.gztj
        this.zgybpGsOption = [row.sbgsjtdm, row.sbgsgsdm, row.sbgscddm, row.sbgsxldm]
        this.zgybp.sbqdrq = this.formatDate(row.sbqdrq)
        this.zgybp.sbgxrq = this.formatDate(row.sbgxrq)
        this.zgybp.sbbfrq = this.formatDate(row.sbbfrq)
        this.zgybp.gysmc = row.gysmc
        this.zgybp.jcsmc = row.jcsmc
        this.zgybp.simkh = row.simkh
        this.zgybp.tmbh = row.tmbh
        this.zgybp.ewmbh = row.ewmbh
      },
      cancelEidt() {
        this.dialogVisible = false
        this.emptyZgybpData()
      },
      deleteZgybp(row) {
        this.$confirm('此操作将永久删除设备:站杆预报屏' + row.sbzbh + ', 是否继续?', '提示', {
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
      emptyZgybpGs() {
        this.zgybpGsOption = ['', '', '', '']
      },
      emptyZgybpPpxh() {
        this.zgybpPpxhOption = ['', '']
      },
      emptyZgybpData() {
        this.emptyZgybpGs()
        this.emptyZgybpPpxh()
        this.zgybp = {
          sbzbh: '',
          htbh: '',
          sbgzztdm: '',
          sbgzzt: '',
          azzp: '',
          azzpzmz: '',
          azzpcmz: '',
          qypbh: '',
          qypmc: '',
          ssxzqydm: '',
          ssxzqy: '',
          gldjdm: '',
          gldj: '',
          sbppdm: '',
          sbpp: '',
          sbxhdm: '',
          sbxh: '',
          pczdm: '',
          pcz: '',
          gdffdm: '',
          gdffmc: '',
          sbccdm: '',
          sbccmc: '',
          gztjdm: '',
          gztj: '',
          sbgsjtdm: '',
          sbgsjtmc: '',
          sbgsgsdm: '',
          sbgsgsmc: '',
          sbgscddm: '',
          sbgscdmc: '',
          sbgsxldm: '',
          sbgsxlmc: '',
          zdbh: '',
          zdmc: '',
          zpbh: '',
          zpmc: '',
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
      loadZgybpData() {
        var _this = this
        let params
        this.tableLoading = true
        if (this.zgybp.sbgsjtdm) {
          params = {
            page: this.currentPage,
            pagePize: this.pageSize,
            qypbh: this.zgybp.qypbh,
            orderItemName: '',
            order: '',
            sbzbh: this.zgybp.sbzbh,
            htbh: this.zgybp.htbh,
            sbgzztdm: this.zgybp.sbgzztdm,
            // sbgzzt: '',
            // azzp: '',
            // azzpzmz: '',
            // azzpcmz: '',
            qypbh: this.zgybp.qypbh,
            // qypmc: '',
            ssxzqydm: this.zgybp.ssxzqydm,
            // ssxzqy: '',
            gldjdm: this.zgybp.gldjdm,
            // gldj: '',
            sbppdm: this.zgybp.sbppdm,
            // sbpp: '',
            sbxhdm: this.zgybp.sbxhdm,
            // sbxh: '',
            pczdm: this.zgybp.pczdm,
            // pcz: '',
            gdffdm: this.zgybp.gztjdm,
            // gdffmc: '',
            sbccdm: this.zgybp.sbccdm,
            // sbccmc: '',
            gztjdm: this.zgybp.gztjdm,
            // gztj: '',
            sbgsjtdm: this.zgybp.sbgsjtdm,
            // sbgsjtmc: '',
            sbgsgsdm: this.zgybp.sbgsgsdm,
            // sbgsgsmc: '',
            sbgscddm: sbgscddm,
            // sbgscdmc: '',
            sbgsxldm: sbgsxldm,
            // sbgsxlmc: '',
            zdbh: this.zgybp.zdbh,
            // zdmc: '',
            zpbh: this.zgybp.zpbh,
            // zpmc: '',
            sbqdrq: this.zgybp.sbqdrq,
            sbgxrq: this.zgybp.sbgxrq,
            sbbfrq: this.zgybp.sbbfrq,
            gysdm: this.zgybp.gysdm,
            // gysmc: '',
            jcsdm: this.zgybp.jcsdm,
            // jcsmc: '',
            simkh: this.zgybp.simkh,
            tmbh: this.zgybp.tmbh,
            ewmbh: this.zgybp.ewmbh,
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
        this.getRequest('/api/zgybp/basic', params).then(res => {
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
