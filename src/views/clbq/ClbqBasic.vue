<template>
  <div>
    <ElementHeader></ElementHeader>
    <el-container style="height: 701px; border: 1px solid #eee">
      <!-- Side Begin -->
      <SideBar sb-type="车辆标签" @listenToChildEvent="handleGsTreeSelect"></SideBar>
      <!-- Container Begin -->
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
              @keyup.enter.native="searchClbp"
              prefix-icon="el-icon-search"
              v-model="clbq.qypbh">
            </el-input>
            <div style="display: inline">
              <el-button type="primary" style="margin-left: 10px" size="mini" icon="el-icon-search" @click="searchClbp">
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
            <el-button type="success" size="mini" @click="importClbps">
              <i class="fa fa-lg fa-level-down"></i>导入数据
            </el-button>
            <el-button type="success" size="mini" @click="exportClbps" style="margin-left: 0">
              <i class="fa fa-lg fa-level-down"></i>导出数据
            </el-button>
          </div>
          <div style="display: inline;margin-left: 7px">
            <el-button type="primary" size="mini" icon="el-icon-plus" @click="showAddClbpView">添加车辆标签</el-button>
          </div>
        </el-header>
        <el-main>
          <div>
            <!-- TRANSITION Begin -->
            <transition name="slide-fade">
              <div
                style="margin-bottom: 10px;border: 1px solid #20a0ff;border-radius: 5px;padding: 20px 35px;box-sizing:border-box;"
                v-show="advanceSearchViewVisible">
                <el-row>
                  <el-col :span="6">
                    车辆标签编号:
                    <el-input prefix-icon="el-icon-search" v-model="clbq.sbzbh" size="small" style="width: 150px"
                              placeholder="设备查询编号"></el-input>
                  </el-col>
                  <el-col :span="5">
                    合同编号:
                    <el-input prefix-icon="el-icon-search" v-model="clbq.htbh" size="small" style="width: 150px"
                              placeholder="设备合同编号"></el-input>
                  </el-col>
                  <el-col :span="4">
                    工作状态:
                    <el-select v-model="clbq.sbgzztdm" style="width: 120px" clearable size="small" placeholder="请选择"
                               @change="handleGzztChange">
                      <el-option v-for="item in sbgzzts" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    分片区域:
                    <el-select v-model="clbq.qypbh" style="width: 120px" clearable size="small" placeholder="请选择"
                               @change="handleFpChange">
                      <el-option v-for="item in fps" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="5">
                    车牌号:
                    <el-input prefix-icon="el-icon-search" v-model="clbq.azclcph" size="small" style="width: 150px"
                              placeholder="例：沪-A-10243"></el-input>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 18px">
                  <el-col :span="5">
                    车辆编号:
                    <el-input prefix-icon="el-icon-search" v-model="clbq.azclzbh" size="small" style="width: 150px"
                              placeholder="长度为10位"></el-input>
                  </el-col>
                  <el-col :span="4">
                    动力类别:
                    <el-select v-model="clbq.azcldllbdm" style="width: 120px" clearable size="small" placeholder="请选择"
                               @change="handleDllbChange">
                      <el-option v-for="item in dllbs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    管理等级:
                    <el-select v-model="clbq.gldjdm" style="width: 110px" clearable size="small" placeholder="管理等级"
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
                      v-model="clbqPpxhOption"
                      @change="handlePpxhChange"
                      change-on-select>
                    </el-cascader>
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
                      :options="clbqGsOptions"
                      v-model="clbqGsOption"
                      @change="handleGsChange"
                      change-on-select>
                    </el-cascader>
                  </el-col>
                  <el-col :span="4">
                    起点基站:
                    <el-select v-model="clbq.qdjzdm" style="width: 130px" clearable size="small" placeholder="请选择基站"
                               @change="handleQdjzChange">
                      <el-option v-for="item in jzs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    终点基站:
                    <el-select v-model="clbq.zdjzdm" style="width: 130px" clearable size="small" placeholder="请选择基站"
                               @change="handleZdjzChange">
                      <el-option v-for="item in jzs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    区间基站:
                    <el-select v-model="clbq.qjjzdm" style="width: 130px" clearable size="small" placeholder="请选择基站"
                               @change="handleQjjzChange">
                      <el-option v-for="item in jzs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 18px">
                  <el-col :span="9">
                    启用日期:
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
                    <el-select v-model="clbq.gysdm" style="width: 130px" clearable size="small" placeholder="请选择供应商"
                               @change="handleGysChange">
                      <el-option v-for="item in gs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    集成商:
                    <el-select v-model="clbq.jcsdm" style="width: 130px" clearable size="small" placeholder="请选择集成商"
                               @change="handleJcsChange">
                      <el-option v-for="item in gs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="5">
                    条码编号:
                    <el-input prefix-icon="el-icon-search" v-model="clbq.tmbh" size="small" style="width: 150px"
                              placeholder="长度为10位"></el-input>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 18px">
                  <el-col :span="5">
                    二维码编号:
                    <el-input prefix-icon="el-icon-search" v-model="clbq.ewmbh" size="small" style="width: 150px"
                              placeholder="长度为10位"></el-input>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 18px">
                  <el-col :span="4" :offset="21">
                    <el-button size="small" @click="cancelSearch">取消</el-button>
                    <el-button icon="el-icon-search" type="primary" size="small" @click="searchClbp">搜索</el-button>
                  </el-col>
                </el-row>
              </div>
            </transition>
            <!-- 车辆标签基础信息Begin -->
            <el-table ref="multipleTable" :data="Sbs" v-loading="tableLoading" border tooltip-effect="dark"
                      style="width: 100%;" :row-style="{'height': 0}" :cell-style="{'padding': 0}"
                      @selection-change="handleSelectionChange" stripe size="small"
                      highlight-current-row height="559"
                      :default-sort="{prop: 'sbqdrq', order: 'descending'}">
              <el-table-column type="selection" width="36" align="center"></el-table-column>
              <el-table-column prop="sbzbh" label="车辆标签编号" width="120" align="center" fixed></el-table-column>
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
                <el-table-column prop="azcldllbdm" label="动力类别" width="80" align="center"></el-table-column>
                <el-table-column prop="ancldyxlj" label="线路集合" width="80" align="center"></el-table-column>
              </el-table-column>
              <el-table-column prop="gldj" label="管理等级" width="80" align="center"></el-table-column>
              <el-table-column prop="sbpp" label="品牌" width="70" align="center"></el-table-column>
              <el-table-column prop="sbxh" label="型号" width="70" align="center"></el-table-column>
              <el-table-column prop="sbgsjtmc" label="集团" width="110" align="center"></el-table-column>
              <el-table-column prop="sbgsgsmc" label="公司" width="90" align="center"></el-table-column>
              <el-table-column prop="sbgscdmc" label="车队" width="70" align="center"></el-table-column>
              <el-table-column prop="sbgsxlmc" label="线路" width="70" align="center"></el-table-column>
              <el-table-column prop="qdjz" label="起点基站" width="80" align="center"></el-table-column>
              <el-table-column prop="zdjz" label="终点基站" width="80" align="center"></el-table-column>
              <el-table-column prop="qjjz" label="区间站" width="80" align="center"></el-table-column>
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
              <el-table-column prop="tmbh" label="条码编号" width="100" align="center"></el-table-column>
              <el-table-column prop="ewmbh" label="二维码编号" width="100" align="center"></el-table-column>
            </el-table>
            <!-- 批量删除及分页Begin -->
            <div style="display: flex;justify-content: flex-end;margin-top: 8px">
              <el-button size="small" v-if="Sbs.length>0"
                         :disabled="multipleSelection.length===0||multipleSelection.length>1"
                         @click="showEditClbqView(multipleSelection[0])">编辑
              </el-button>
              <el-button type="danger" size="small" v-if="Sbs.length>0" :disabled="multipleSelection.length==0"
                         @click="deleteManyClbps">删除
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
          </div>
        </el-main>
      </el-container>
      <!-- FORM Begin -->
      <el-form :model="clbq" :rules="rules" ref="clbq" style="margin: 0px;padding: 0px;">
        <div style="text-align: left">
          <el-dialog :title="dialogTitle" style="padding: auto;" :close-on-click-modal="false"
                     :visible.sync="dialogVisible" width="77%" @close="cancel_add('clbq')">
            <el-row style="padding-left: 100px">
              <el-col :span="7">
                <div>
                  <el-form-item label="车辆标签编号:" prop="sbzbh">
                    <el-input prefix-icon="el-icon-edit" v-model="clbq.sbzbh" size="small" style="width: 150px"
                              placeholder="请输入设备编号"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7">
                <div>
                  <el-form-item label="合同编号:" prop="htbh">
                    <el-input prefix-icon="el-icon-edit" v-model="clbq.htbh" size="small" style="width: 150px"
                              placeholder="请输入设备合同编号"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7">
                <div>
                  <el-form-item label="工作状态:" prop="sbgzzt">
                    <el-select v-model="clbq.sbgzztdm" style="width: 120px" size="small" placeholder="请选择"
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
                    <el-select v-model="clbq.qypbh" style="width: 120px" size="small" placeholder="请选择"
                               @change="handleFpChange">
                      <el-option v-for="item in fps" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7">
                <div>
                  <el-form-item label="安装车牌号:" prop="azclcph">
                    <el-input prefix-icon="el-icon-edit" v-model="clbq.azclcph" size="small" style="width: 150px"
                              placeholder="请输入车牌号"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7">
                <div>
                  <el-form-item label="车辆编号:" prop="azclzbh">
                    <el-input prefix-icon="el-icon-edit" v-model="clbq.azclzbh" size="small" style="width: 150px"
                              placeholder="请输入车牌号"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row style="padding-left: 100px">
              <el-col :span="7">
                <div>
                  <el-form-item label="动力类别:" prop="azcldllbmc">
                    <el-select v-model="clbq.azcldllbdm" style="width: 120px" size="small" placeholder="车辆动力"
                               @change="handleDllbChange">
                      <el-option v-for="item in dllbs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7">
                <div>
                  <el-form-item label="管理等级:" prop="gldj">
                    <el-select v-model="clbq.gldjdm" style="width: 120px" size="small" placeholder="管理等级"
                               @change="handleGldjChange">
                      <el-option v-for="item in gldjs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7">
                <div>
                  <el-form-item label="品牌型号:" prop="clbqPpxhOption">
                    <el-cascader
                      size="small"
                      placeholder="请选择设备品牌型号"
                      style="width:162px;"
                      expand-trigger="hover"
                      :options="sbppxh"
                      v-model="clbqPpxhOption"
                      @change="handlePpxhChange"
                      change-on-select>
                    </el-cascader>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row style="padding-left: 100px">
              <el-col :span="10">
                <div>
                  <el-form-item label="设备归属：" prop="clbqGsOption">
                    <el-cascader
                      size="small"
                      placeholder="请选择设备归属"
                      style="width:266px;"
                      expand-trigger="hover"
                      :options="clbqGsOptions"
                      v-model="clbqGsOption"
                      @change="handleGsChange"
                      change-on-select>
                    </el-cascader>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7">
                <div>
                  <el-form-item label="起点基站:" prop="qdjz">
                    <el-select v-model="clbq.qdjzdm" style="width: 120px" size="small" placeholder="起点基站"
                               @change="handleQdjzChange">
                      <el-option v-for="item in jzs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7">
                <div>
                  <el-form-item label="终点基站:" prop="zdjz">
                    <el-select v-model="clbq.zdjzdm" style="width: 120px" size="small" placeholder="终点基站"
                               @change="handleZdjzChange">
                      <el-option v-for="item in jzs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row style="padding-left: 100px">
              <el-col :span="7">
                <div>
                  <el-form-item label="区间基站:" prop="qjjz">
                    <el-select v-model="clbq.qjjzdm" style="width: 120px" size="small" placeholder="区间基站"
                               @change="handleQjjzChange">
                      <el-option v-for="item in jzs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7">
                <div>
                  <el-form-item label="启动日期：" prop="sbqdrq">
                    <el-date-picker
                      v-model="clbq.sbqdrq"
                      size="small"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      style="width: 170px"
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
                      v-model="clbq.sbgxrq"
                      size="small"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      style="width: 170px"
                      type="date"
                      placeholder="更新日期">
                    </el-date-picker>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row style="padding-left: 100px">
              <el-col :span="7">
                <div>
                  <el-form-item label="报废日期：" prop="sbbfrq">
                    <el-date-picker
                      v-model="clbq.sbbfrq"
                      size="small"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      style="width: 170px"
                      type="date"
                      placeholder="报废日期">
                    </el-date-picker>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7">
                <div>
                  <el-form-item label="供应商：" prop="gysmc">
                    <el-select v-model="clbq.gysdm" style="width: 130px" size="small" placeholder="供应商"
                               @change="handleGysChange">
                      <el-option v-for="item in gs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7">
                <div>
                  <el-form-item label="集成商：" prop="jcsmc">
                    <el-select v-model="clbq.jcsdm" style="width: 130px" size="small" placeholder="集成商"
                               @change="handleJcsChange">
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
                  <el-form-item label="条码编号：" prop="tmbh">
                    <el-input prefix-icon="el-icon-edit" v-model="clbq.tmbh" size="small" style="width: 160px"
                              placeholder="请输入条码编号"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="8">
                <div>
                  <el-form-item label="二维码编号：" prop="ewmbh">
                    <el-input prefix-icon="el-icon-edit" v-model="clbq.ewmbh" size="small" style="width: 180px"
                              placeholder="请输入设备二维码编号"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
            <el-button size="large" @click="cancelEidt">取 消</el-button>
            <el-button size="large" type="primary" @click="addClbp('clbq')">确 定</el-button>
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
    name: "ClbqBasic",
    data() {
      return {
        clbq: {
          sbzbh: '',
          htbh: '',
          qypbh: '',
          sbgzztdm: '',
          sbgzzt: '',
          qypbh: '',
          qypmc: '',
          azclcph: '',
          azclzbh: '',
          azcldllbdm: '',
          azcldllbmc: '',
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
          qdjzdm: '',
          qdjz: '',
          zdjzdm: '',
          zdjz: '',
          qjjzdm: '',
          qjjz: '',
          sbqdrq: '',
          sbgxrq: '',
          sbbfrq: '',
          gysdm: '',
          gysmc: '',
          jcsdm: '',
          jcsmc: '',
          tmbh: '',
          ewmbh: ''
        },
        rules: {
          sbzbh: [{required: true, validator: this.validateSbzbh, trigger: 'blur'}],
          htbh: [{required: true, validator: this.validateHtbh, trigger: 'blur'}],
          qypmc: [{required: true, message: '必填:分片名称', trigger: 'blur'}],
          sbgzzt: [{required: true, message: '必填:工作状态', trigger: 'blur'}],
          azclcph: [{required: true, validator: this.validateCph, trigger: 'blur'}],
          azclzbh: [{required: true, validator: this.validateClzbh, trigger: 'blur'}],
          azcldllbmc: [{required: true, message: '必填:车辆动力类别', trigger: 'blur'}],
          gldj: [{required: true, message: '必填:管理等级', trigger: 'blur'}],
          clbqPpxhOption: [{required: false, message: '必填:品牌型号', trigger: 'blur'}],
          clbqGsOption: [{required: false, message: '必填:设备归属信息', trigger: 'blur'}],
          qdjz: [{required: true, message: '必填:起点基站', trigger: 'blur'}],
          zdjz: [{required: true, message: '必填:终点基站', trigger: 'blur'}],
          qjjz: [{required: true, message: '必填:区间基站', trigger: 'blur'}],
          sbqdrq: [{required: true, message: '必填:启动日期', trigger: 'blur'}],
          sbgxrq: [{required: false, message: '必填:更新日期', trigger: 'blur'}],
          sbbfrq: [{required: false, message: '必填:报废日期', trigger: 'blur'}],
          gysmc: [{required: true, message: '必填:供应商', trigger: 'blur'}],
          jcsmc: [{required: true, message: '必填:集成商', trigger: 'blur'}],
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
        clbqGsOptions: [],
        clbqGsOption: ['', '', '', ''],
        clbqPpxhOption: ['', ''],
        fileUploadBtnText: '导入数据',
        dialogTitle: '',
        sbgzzts: [],
        fps: [],
        dllbs: [],
        gldjs: [],
        sbppxh: [],
        jzs: [],
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
        this.clbqGsOptions = this.$store.getters.getAllSubsidiary
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
        this.getRequest('/api/Sbs/dllb').then(res => {
          if (res && res.status === 200) {
            _this.dllbs = res.data.DllbList
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
        this.getRequest('/api/Sbs/jz').then(res => {
          if (res && res.status === 200) {
            _this.jzs = res.data.JzList
          }
        })
        this.getRequest('/api/Sbs/gs').then(res => {
          if (res && res.status === 200) {
            _this.gs = res.data.GsList
          }
        })
      },
      handleGsTreeSelect(data) {
        var _this = this
        this.cardTitle = data.label
        let [jtdm, gsdm, cddm, xldm] = this.getGsTreeInfo(data, this.clbq.sbgsjtdm, this.clbq.sbgsgsdm, this.clbq.sbgscddm, this.clbq.sbgsxldm)
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
        this.getRequest('/api/clbq/basic', params).then(res => {
          _this.tableLoading = false
          if (res && res.status === 200) {
            _this.Sbs = res.data.ClbqList
            // totalRow会发生改变 currentPage、pageSize是向服务端发送的
            _this.totalPage = res.data.totalRow
          }
        })
      },
      handleQypbhChange(val) {
        if (val === '') {
          this.loadClbpData()
        }
      },
      handleGzztChange(val) {
        var gzzt = parseInt(val)
        if (gzzt) {
          this.clbq.sbgzzt = this.sbgzzts[gzzt - 1].descriptionZh
        }
      },
      handleFpChange(val) {
        var fp = parseInt(val)
        if (fp) {
          this.clbq.qypmc = this.fps[fp - 1].descriptionZh
        }
      },
      handleGldjChange(val) {
        var gldj = parseInt(val)
        if (gldj) {
          this.clbq.gldj = this.gldjs[gldj - 1].descriptionZh
        }
      },
      handleDllbChange(val) {
        let dllb = parseInt(val)
        if (dllb) {
          this.clbq.azcldllbmc = this.dllbs[dllb - 1].descriptionZh
        }
      },
      handlePpxhChange(value) {
        this.clbqPpxhOption = value
        let [ppdm, pp, xhdm, xh] = this.getPpxhInfo(value, this.clbq.sbppdm, this.clbq.sbxhdm, this.clbq.sbpp, this.clbq.sbxh, this.sbppxh)
        this.clbq.sbpp = pp
        this.clbq.sbppdm = ppdm
        this.clbq.sbxh = xh
        this.clbq.sbxhdm = xhdm
        console.log(this.clbq)
      },
      handleQdjzChange(val) {
        var jz = parseInt(val)
        if (jz) {
          this.clbq.qdjz = this.jzs[jz - 1].descriptionZh
        }
      },
      handleZdjzChange(val) {
        var jz = parseInt(val)
        if (jz) {
          this.clbq.zdjz = this.jzs[jz - 1].descriptionZh
        }
      },
      handleQjjzChange(val) {
        var jz = parseInt(val)
        if (jz) {
          this.clbq.qjjz = this.jzs[jz - 1].descriptionZh
        }
      },
      handleGsChange(value) {
        this.clbqGsOption = value
        let [jtdm, jtmc, gsdm, gsmc, cddm, cdmc, xldm, xlmc] = this.getGsInfo(value, this.clbqGsOptions, this.clbq.sbgsjtdm, this.clbq.sbgsjtmc, this.clbq.sbgsgsdm, this.clbq.sbgsgsmc, this.clbq.sbgscddm, this.clbq.sbgscdmc, this.clbq.sbgsxldm, this.clbq.sbgsxlmc)
        this.clbq.sbgsjtdm = jtdm
        this.clbq.sbgsjtmc = jtmc
        this.clbq.sbgsgsdm = gsdm
        this.clbq.sbgsgsmc = gsmc
        this.clbq.sbgscddm = cddm
        this.clbq.sbgscdmc = cdmc
        this.clbq.sbgsxldm = xldm
        this.clbq.sbgsxlmc = xlmc
        console.log(this.clbq)
      },
      handleGysChange(val) {
        var gys = parseInt(val)
        if (gys) {
          this.clbq.gysmc = this.gs[gys - 1].descriptionZh
        }
      },
      handleJcsChange(val) {
        var jcs = parseInt(val)
        if (jcs) {
          this.clbq.jcsmc = this.gs[jcs - 1].descriptionZh
        }
      },
      showAdvanceSearchView() {
        this.advanceSearchViewVisible = !this.advanceSearchViewVisible
        this.clbq.qypbh = ''
        if (!this.advanceSearchViewVisible) {
          this.emptyClbqData()
          this.beginDateScope = ''
          this.updateDateScope = ''
          this.endDateScope = ''
          this.loadClbpData()
        }
      },
      searchClbp() {
        this.loadClbpData()
      },
      cancelSearch() {
        this.advanceSearchViewVisible = false
        this.emptyClbqData()
        this.emptyClbpGs()
        this.beginDateScope = ''
        this.updateDateScope = ''
        this.endDateScope = ''
        this.loadClbpData()
      },
      cancel_add(formName) {
        this.$refs[formName].resetFields()
        this.emptyClbqData()
      },
      showAddClbpView() {
        this.dialogVisible = true
        this.dialogTitle = "添加车辆标签"
      },
      showEditClbqView(row) {
        console.log(row)
        this.dialogVisible = true
        this.dialogTitle = "编辑车辆标签"
        this.clbq = row
        this.clbq.sbjyh = row.sbjyh
        this.clbq.sbzbh = row.sbzbh
        this.clbq.qypbh = row.qypbh
        this.clbq.htbh = row.htbh
        this.clbq.gldj = row.gldj
        this.clbq.sbppdm = row.sbppdm
        this.clbq.sbpp = row.sbpp
        this.clbq.sbxhdm = row.sbxhdm
        this.clbq.sbxh = row.sbxh
        this.clbqGsOption = [row.sbgsjtdm, row.sbgsgsdm, row.sbgscddm, row.sbgsxldm]
        this.clbqPpxhOption = [row.sbppdm, row.sbxhdm]
        this.clbq.sbgsjtmc = row.sbgsjtmc
        this.clbq.sbgsgsmc = row.sbgsgsmc
        this.clbq.sbgscdmc = row.sbgscdmc
        this.clbq.sbgsxlmc = row.sbgsxlmc
        this.clbq.sbqdrq = this.formatDate(row.sbqdrq)
        this.clbq.sbgxrq = this.formatDate(row.sbgxrq)
        this.clbq.sbbfrq = this.formatDate(row.sbbfrq)
        this.clbq.gysmc = row.gysmc
        this.clbq.jcsmc = row.jcsmc
        this.clbq.tmbh = row.tmbh
        this.clbq.ewmbh = row.ewmbh
      },
      cancelEidt() {
        this.dialogVisible = false
        this.emptyClbqData()
      },
      addClbp(formName) {
        var _this = this
        _this.dialogVisible = true
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('clbq表单信息（先）', this.clbq)
          } else {
            return false
          }
        })
      },
      deleteClbp(row) {
        this.$confirm('此操作将永久删除设备：车辆标签' + row.sbzbh + ', 是否继续?', '提示', {
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
      deleteManyClbps() {
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
      handleCurrentChange(val) {
        this.currentPage = val
        this.loadRfid4gData()
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        this.pageSize = val
        this.loadRfid4gData()
      },
      emptyClbpGs() {
        this.clbqGsOption = ['', '', '', '']
      },
      emptyClbqPpxh() {
        this.clbqPpxhOption = ['', '']
      },
      emptyClbqData() {
        this.emptyClbpGs()
        this.emptyClbqPpxh()
        this.clbq = {
          sbzbh: '',
          htbh: '',
          qypbh: '',
          sbgzztdm: '',
          sbgzzt: '',
          qypbh: '',
          qypmc: '',
          azclcph: '',
          azclzbh: '',
          azcldllbdm: '',
          azcldllbmc: '',
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
          qdjzdm: '',
          qdjz: '',
          zdjzdm: '',
          zdjz: '',
          qjjzdm: '',
          qjjz: '',
          sbqdrq: '',
          sbgxrq: '',
          sbbfrq: '',
          gysdm: '',
          gysmc: '',
          jcsdm: '',
          jcsmc: '',
          tmbh: '',
          ewmbh: ''
        }
      },
      loadClbpData() {
        var _this = this
        this.tableLoading = true
        let params
        if (this.clbq.sbgsjtdm) {
          params = {
            page: this.currentPage,
            pagePize: this.pageSize,
            keywords: this.keywords,
            orderItemName: '',
            order: '',
            sbzbh: this.clbq.sbzbh,
            htbh: this.clbq.htbh,
            qypbh: this.clbq.qypbh,
            sbgzztdm: this.clbq.sbgzztdm,
            // sbgzzt: '',
            qypbh: this.clbq.qypbh,
            // qypmc: '',
            azclcph: this.clbq.azclcph,
            azclzbh: this.clbq.azclzbh,
            azcldllbdm: this.clbq.azcldllbdm,
            // azcldllbmc: '',
            gldjdm: this.clbq.gldjdm,
            // gldj: '',
            sbppdm: this.clbq.sbppdm,
            // sbpp: '',
            sbxhdm: this.clbq.sbxhdm,
            // sbxh: '',
            sbgsjtdm: this.clbq.sbgsjtdm,
            // sbgsjtmc: '',
            sbgsgsdm: this.clbq.sbgsgsdm,
            // sbgsgsmc: '',
            sbgscddm: this.clbq.sbgscddm,
            // sbgscdmc: '',
            sbgsxldm: this.clbq.sbgsxldm,
            // sbgsxlmc: '',
            qdjzdm: this.clbq.qdjzdm,
            // qdjz: '',
            zdjzdm: this.clbq.zdjzdm,
            // zdjz: '',
            qjjzdm: this.clbq.qjjzdm,
            // qjjz: '',
            sbqdrq: this.clbq.sbqdrq,
            sbgxrq: this.clbq.sbgxrq,
            sbbfrq: this.clbq.sbbfrq,
            gysdm: this.clbq.gysdm,
            // gysmc: '',
            jcsdm: this.clbq.jcsdm,
            // jcsmc: '',
            tmbh: this.clbq.tmbh,
            ewmbh: this.clbq.ewmbh,
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
        this.getRequest('/api/clbq/basic', params).then(res => {
          _this.tableLoading = false
          if (res && res.status === 200) {
            _this.Sbs = res.data.ClbqList
            // totalRow会发生改变 currentPage、pageSize是向服务端发送的
            _this.totalRow = res.data.totalRow
          }
        })
      },
      importClbps() {
        window.open("/employee/basic/exportEmp", "_parent")
      },
      exportClbps() {
        window.open("/employee/basic/exportEmp", "_parent")
      }
    },
    mounted() {
      this.initData()
      this.loadClbpData()
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
