<template>
  <div>
    <ElementHeader></ElementHeader>
    <el-container style="height: 701px; border: 1px solid #eee">
      <!-- Side Begin -->
      <SideBar sb-type="RFID4G" @listenToChildEvent="handleGsTreeSelect"></SideBar>
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
              @keyup.enter.native="searchRfid4g"
              prefix-icon="el-icon-search"
              v-model="rfid4g.qypbh">
            </el-input>
            <div style="display: inline">
              <el-button type="primary" style="margin-left: 10px" size="mini" icon="el-icon-search"
                         @click="searchRfid4g">
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
            <el-button type="success" size="mini" @click="importRfid4gs">
              <i class="el-icon-upload2" style="margin-right: 3px"></i>导入数据
            </el-button>
            <el-button type="success" size="mini" @click="exportRfid4gs">
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
                    RFID4G编号:
                    <el-input prefix-icon="el-icon-search" v-model="rfid4g.sbzbh" size="small" style="width: 150px"
                              placeholder="设备查询编号"></el-input>
                  </el-col>
                  <el-col :span="5">
                    合同编号:
                    <el-input prefix-icon="el-icon-search" v-model="rfid4g.htbh" size="small" style="width: 150px"
                              placeholder="设备合同编号"></el-input>
                  </el-col>
                  <el-col :span="4">
                    工作状态:
                    <el-select v-model="rfid4g.sbgzztdm" style="width: 120px" clearable size="small" placeholder="请选择"
                               @change="handleGzztChange">
                      <el-option v-for="item in sbgzzts" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    分片区域:
                    <el-select v-model="rfid4g.qypbh" style="width: 120px" clearable size="small" placeholder="请选择"
                               @change="handleFpChange">
                      <el-option v-for="item in fps" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 18px">
                  <el-col :span="4">
                    行政区域:
                    <el-select v-model="rfid4g.ssxzqydm" style="width: 120px" clearable size="small" placeholder="请选择"
                               @change="handleXzqyChange">
                      <el-option v-for="item in ssxzqys" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    基站名称:
                    <el-select v-model="rfid4g.jzbh" style="width: 130px" clearable size="small" placeholder="请选择基站"
                               @change="handleJzChange">
                      <el-option v-for="item in jzs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    站点名称:
                    <el-select v-model="rfid4g.zdbh" style="width: 130px" clearable size="small" placeholder="请选择站点"
                               @change="handleZdChange">
                      <el-option v-for="item in zds" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    管理等级:
                    <el-select v-model="rfid4g.gldjdm" style="width: 110px" clearable size="small" placeholder="管理等级"
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
                      v-model="rfid4gPpxhOption"
                      @change="handlePpxhChange"
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
                    <el-select v-model="rfid4g.jcsdm" style="width: 130px" clearable size="small" placeholder="请选择集成商"
                               @change="handleJcsChange">
                      <el-option v-for="item in gs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    供应商:
                    <el-select v-model="rfid4g.gysdm" style="width: 130px" clearable size="small" placeholder="请选择供应商"
                               @change="handleGysChange">
                      <el-option v-for="item in gs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 18px">
                  <el-col :span="5">
                    站点编号:
                    <el-input prefix-icon="el-icon-search" v-model="rfid4g.zdbh" size="small" style="width: 150px"
                              placeholder="设备站点编号"></el-input>
                  </el-col>
                  <el-col :span="5">
                    基站编号:
                    <el-input prefix-icon="el-icon-search" v-model="rfid4g.jzbh" size="small" style="width: 150px"
                              placeholder="设备基站编号"></el-input>
                  </el-col>
                  <el-col :span="5">
                    条码编号:
                    <el-input prefix-icon="el-icon-search" v-model="rfid4g.tmbh" size="small" style="width: 150px"
                              placeholder="设备条码编号"></el-input>
                  </el-col>
                  <el-col :span="5">
                    二维码编号:
                    <el-input prefix-icon="el-icon-search" v-model="rfid4g.ewmbh" size="small" style="width: 150px"
                              placeholder="设备二维码编号"></el-input>
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
                      :options="rfid4gGsOptions"
                      v-model="rfid4gGsOption"
                      @change="handleGsChange"
                      change-on-select>
                    </el-cascader>
                  </el-col>
                  <el-col :span="4" :offset="21">
                    <el-button size="small" @click="cancelSearch">取消</el-button>
                    <el-button icon="el-icon-search" type="primary" size="small" @click="searchRfid4g">搜索</el-button>
                  </el-col>
                </el-row>
              </div>
            </transition>
            <!-- RFID4G基础信息Begin -->
            <el-table ref="multipleTable" :data="Sbs" v-loading="tableLoading" border tooltip-effect="dark"
                      style="width: 100%;" :row-style="{'height': 0}" :cell-style="{'padding': 0}"
                      @selection-change="handleSelectionChange" stripe size="small"
                      highlight-current-row height="559"
                      :default-sort="{prop: 'sbqdrq', order: 'descending'}">
              <el-table-column type="selection" width="36" align="center"></el-table-column>
              <el-table-column prop="sbzbh" label="RFID4G编号" width="120" align="center" fixed></el-table-column>
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
              <el-table-column prop="ssxzqy" label="行政区域" width="70" align="center"></el-table-column>
              <el-table-column prop="jzmc" label="基站名称" width="80" align="center"></el-table-column>
              <el-table-column prop="zdmc" label="站点名称" width="80" align="center"></el-table-column>
              <el-table-column prop="gldj" label="管理等级" width="80" align="center"></el-table-column>
              <el-table-column prop="sbpp" label="品牌" width="70" align="center"></el-table-column>
              <el-table-column prop="sbxh" label="型号" width="70" align="center"></el-table-column>
              <el-table-column prop="sbgsjtmc" label="集团" width="110" align="center"></el-table-column>
              <el-table-column prop="sbgsgsmc" label="公司" width="90" align="center"></el-table-column>
              <el-table-column prop="sbgscdmc" label="车队" width="70" align="center"></el-table-column>
              <el-table-column prop="sbgsxlmc" label="线路" width="70" align="center"></el-table-column>
              <el-table-column prop="sbqdrq" label="启用日期" width="100" align="center" sortable>
                <template slot-scope="scope">{{ scope.row.sbqdrq | formatDate}}</template>
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
              <el-table-column prop="jzbh" label="基站编号" width="90" align="center"></el-table-column>
              <el-table-column prop="simkh" label="SIM卡号" width="160" align="center"></el-table-column>
              <el-table-column prop="tmbh" label="条码编号" width="100" align="center"></el-table-column>
              <el-table-column prop="ewmbh" label="二维码编号" width="100" align="center"></el-table-column>
            </el-table>
            <!-- 批量删除Begin -->
            <div style="display: flex;justify-content: flex-end;margin-top: 8px">
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
      <!-- FORM Begin -->
      <el-form :model="rfid4g" :rules="rules" ref="rfid4g" style="margin: 0;padding: 0;">
        <div style="text-align: left">
          <el-dialog :title="dialogTitle" style="padding: auto;" :close-on-click-modal="false"
                     :visible.sync="dialogVisible" width="77%" @close="cancelAdd('rfid4g')">
            <el-row style="padding-left: 100px">
              <el-col :span="7">
                <div>
                  <el-form-item label="RFID4G编号:" prop="sbzbh">
                    <el-input prefix-icon="el-icon-edit" v-model="rfid4g.sbzbh" size="small" style="width: 150px"
                              placeholder="请输入设备编号"></el-input>
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
              <el-col :span="7">
                <div>
                  <el-form-item label="工作状态:" prop="sbgzzt">
                    <el-select v-model="rfid4g.sbgzztdm" style="width: 120px" size="small" placeholder="请选择"
                               @change="handleGzztChange">
                      <el-option v-for="item in sbgzzts" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row style="padding-left: 100px">
              <el-col :span="6">
                <div>
                  <el-form-item label="分片名称:" prop="qypmc">
                    <el-select v-model="rfid4g.qypbh" style="width: 120px" size="small" placeholder="请选择"
                               @change="handleFpChange">
                      <el-option v-for="item in fps" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div>
                  <el-form-item label="行政区域:" prop="ssxzqy">
                    <el-select v-model="rfid4g.ssxzqydm" style="width: 120px" size="small" placeholder="请选择"
                               @change="handleXzqyChange">
                      <el-option v-for="item in ssxzqys" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div>
                  <el-form-item label="基站名称:" prop="jzmc">
                    <el-select v-model="rfid4g.jzbh" style="width: 120px" size="small" placeholder="请选择"
                               @change="handleJzChange">
                      <el-option v-for="item in jzs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div>
                  <el-form-item label="站点名称:" prop="zdmc">
                    <el-select v-model="rfid4g.zdbh" style="width: 120px" size="small" placeholder="请选择"
                               @change="handleZdChange">
                      <el-option v-for="item in zds" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row style="padding-left: 100px">
              <el-col :span="6">
                <div>
                  <el-form-item label="管理等级:" prop="gldj">
                    <el-select v-model="rfid4g.gldjdm" style="width: 120px" size="small" placeholder="管理等级"
                               @change="handleGldjChange">
                      <el-option v-for="item in gldjs" :key="item.id" :label="item.descriptionZh"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div>
                  <el-form-item label="品牌型号:" prop="rfid4gPpxhOption">
                    <el-cascader
                      size="small"
                      placeholder="请选择设备品牌型号"
                      style="width:135px;"
                      expand-trigger="hover"
                      :options="sbppxh"
                      v-model="rfid4gPpxhOption"
                      @change="handlePpxhChange"
                      change-on-select>
                    </el-cascader>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div>
                  <el-form-item label="设备归属:" prop="rfid4gGsOption">
                    <el-cascader
                      size="small"
                      placeholder="请选择设备归属"
                      style="width: 300px;"
                      expand-trigger="hover"
                      :options="rfid4gGsOptions"
                      v-model="rfid4gGsOption"
                      @change="handleGsChange"
                      change-on-select>
                    </el-cascader>
                  </el-form-item>
                </div>
              </el-col>
              <!-- 设备归属线路如果不只属于一条线路，想多选则把归属线路信息与集团、公司、车队独立出来，根据前三位代码动态加载线路可选项并且设置选择框为multiple -->
            </el-row>
            <el-row style="padding-left: 100px">
              <el-col :span="7">
                <div>
                  <el-form-item label="启动日期:" prop="sbqdrq">
                    <el-date-picker
                      v-model="rfid4g.sbqdrq"
                      size="small"
                      format="yyyy-MM-dd"
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
              <el-col :span="7">
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
                    <el-select v-model="rfid4g.gysdm" style="width: 130px" size="small" placeholder="供应商"
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
                    <el-select v-model="rfid4g.jcsdm" style="width: 130px" size="small" placeholder="集成商"
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
                    <el-input prefix-icon="el-icon-edit" v-model="rfid4g.simkh" size="small" style="width: 190px"
                              placeholder="请输入SIM卡号"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row style="padding-left: 100px">
              <el-col :span="7">
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
              <el-form-item>
               <el-button size="large" @click="cancelEidt">取 消</el-button>
               <el-button size="large" type="primary" @click="addRfid4g('rfid4g')">确 定</el-button>
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
    name: "Rfid4gBasic",
    data() {
      return {
        rfid4g: {
          sbjyh: '',
          sbzbh: '',
          htbh: '',
          sbgzztdm: '',
          sbgzzt: '',
          azzp: '',
          qypbh: '',
          qypmc: '',
          jzbh: '',
          jzmc: '',
          zdbh: '',
          zdmc: '',
          ssxzqydm: '',
          ssxzqy: '',
          gldjdm: '',
          gldj: '',
          sbppdm: '',
          sbpp: '',
          sbxhdm: '',
          sbxh: '',
          simkh: '',
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
          tmbh: '',
          ewmbh: ''
        },
        rules: {
          sbzbh: [{required: true, message: '必填:自编号', trigger: 'blur'}],
          htbh: [{required: true, message: '必填:合同编号', trigger: 'blur'}],
          sbgzzt: [{required: true, message: '必填:工作状态', trigger: 'blur'}],
          azzp: [{required: true, message: '必填:安装照片', trigger: 'blur'}],
          qypmc: [{required: true, message: '必填:分片名称', trigger: 'blur'}],
          ssxzqy: [{required: true, message: '必填:行政区域', trigger: 'blur'}],
          jzmc: [{required: true, message: '必填:基站名称', trigger: 'blur'}],
          zdmc: [{required: true, message: '必填:站点名称', trigger: 'blur'}],
          gldj: [{required: true, message: '必填:管理等级', trigger: 'change'}],
          rfid4gPpxhOption: [{required: false, message: '必填:品牌型号', trigger: 'blur'}],
          simkh: [{required: true, message: '必填:SIM卡号', trigger: 'blur'}],
          rfid4gGsOption: [{required: false, message: '必填:设备归属', trigger: 'blur'}],
          sbqdrq: [{required: true, message: '必填:启动日期', trigger: 'blur'}],
          sbgxrq: [{required: false, message: '必填:更新日期', trigger: 'blur'}],
          sbbfrq: [{required: false, message: '必填:报废日期', trigger: 'blur'}],
          gysmc: [{required: true, message: '必填:供应商', trigger: 'change'}],
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
        rfid4gGsOptions: [],
        rfid4gGsOption: ['', '', '', ''],
        sbppxh: [],
        rfid4gPpxhOption: ['', ''],
        fileUploadBtnText: '导入数据',
        dialogTitle: '',
        sbgzzts: [],
        fps: [],
        ssxzqys: [],
        gldjs: [],
        gs: [],
        jzs: [],
        zds: [],
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
        // 获取管理等级字典
        // this.getRequest('/api/dictionary?pCode=6').then(res => {
        //   if (res && res.status === 200) {
        //     console.log(res.data.data.list)
        //     _this.gldj = res.data.data.list
        //   }
        // })
        this.getRequest('/api/Sbs/gldj').then(res => {
          if (res && res.status === 200) {
            _this.gldjs = res.data.GldjList
          }
        })
        // 获取公司字典
        // this.getRequest('/api/dictionary?pCode=2').then(res => {
        //   if (res && res.status === 200) {
        //     _this.gs = res.data.data.list
        //   }
        // })
        this.getRequest('/api/Sbs/gs').then(res => {
          if (res && res.status === 200) {
            _this.gs = res.data.GsList
          }
        })
        // 获取设备归属信息以后要写为接口调用形式
        this.rfid4gGsOptions = this.$store.getters.getAllSubsidiary
        // 获取工作状态
        this.getRequest('/api/Sbs/gzzt').then(res => {
          if (res && res.status === 200) {
            _this.sbgzzts = res.data.GzztList
          }
        })
        // 获取品牌型号信息
        this.getRequest('/api/Sbs/ppxh').then(res => {
          if (res && res.status === 200) {
            _this.sbppxh = res.data.PpxhList
          }
        })
        // 获取设备所属行政区域信息
        this.getRequest('/api/Sbs/ssxzqy').then(res => {
          if (res && res.status === 200) {
            _this.ssxzqys = res.data.SsxzqyList
          }
        })
        this.getRequest('/api/Sbs/jz').then(res => {
          if (res && res.status === 200) {
            _this.jzs = res.data.JzList
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
      },
      // HANDLE FUNCTIONS
      handleGsTreeSelect(data) {
        var _this = this
        this.cardTitle = data.label
        let [jtdm, gsdm, cddm, xldm] = this.getGsTreeInfo(data, this.rfid4g.sbgsjtdm, this.rfid4g.sbgsgsdm, this.rfid4g.sbgscddm, this.rfid4g.sbgsxldm)
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
        this.getRequest('/api/rfid4g/basic', params).then(res => {
          _this.tableLoading = false
          if (res && res.status === 200) {
            _this.Sbs = res.data.Rfid4gList
            // totalRow会发生改变 currentPage、pageSize是向服务端发送的
            _this.totalPage = res.data.totalRow
          }
        })
      },
      handleQypbhChange(val) {
        // 点击输入框叉号触发if条件语句的执行
        if (val === '') {
          this.loadRfid4gData()
        }
      },
      handleGzztChange(val) {
        var gzzt = parseInt(val)
        if (gzzt) {
          this.rfid4g.sbgzzt = this.sbgzzts[gzzt - 1].descriptionZh
        }
      },
      handleFpChange(val) {
        var fp = parseInt(val)
        if (fp) {
          this.rfid4g.qypmc = this.fps[fp - 1].descriptionZh
        }
      },
      handleXzqyChange(val) {
        var xzqy = parseInt(val)
        if (xzqy) {
          this.rfid4g.ssxzqy = this.ssxzqys[xzqy - 1].descriptionZh
        }
      },
      handleJzChange(val) {
        var jz = parseInt(val)
        if (jz) {
          this.rfid4g.jzmc = this.jzs[jz - 1].descriptionZh
        }
      },
      handleZdChange(val) {
        var zd = parseInt(val)
        if (zd) {
          this.rfid4g.zdmc = this.zds[zd - 1].descriptionZh
        }
      },
      handleGldjChange(val) {
        var gldj = parseInt(val)
        if (gldj) {
          this.rfid4g.gldj = this.gldjs[gldj - 1].descriptionZh
        }
      },
      handlePpxhChange(value) {
        this.rfid4gPpxhOption = value
        let [ppdm, pp, xhdm, xh] = this.getPpxhInfo(value, this.rfid4g.sbppdm, this.rfid4g.sbxhdm, this.rfid4g.sbpp, this.rfid4g.sbxh, this.sbppxh)
        this.rfid4g.sbpp = pp
        this.rfid4g.sbppdm = ppdm
        this.rfid4g.sbxh = xh
        this.rfid4g.sbxhdm = xhdm
        console.log(this.rfid4g)
      },
      handleGysChange(val) {
        var gys = parseInt(val)
        if (gys) {
          this.rfid4g.gysmc = this.gs[gys - 1].descriptionZh
        }
      },
      handleJcsChange(val) {
        var jcs = parseInt(val)
        if (jcs) {
          this.rfid4g.jcsmc = this.gs[jcs - 1].descriptionZh
        }
      },
      handleGsChange(value) {
        this.rfid4gGsOption = value
        let [jtdm, jtmc, gsdm, gsmc, cddm, cdmc, xldm, xlmc] = this.getGsInfo(value, this.rfid4gGsOptions, this.rfid4g.sbgsjtdm, this.rfid4g.sbgsjtmc, this.rfid4g.sbgsgsdm, this.rfid4g.sbgsgsmc, this.rfid4g.sbgscddm, this.rfid4g.sbgscdmc, this.rfid4g.sbgsxldm, this.rfid4g.sbgsxlmc)
        this.rfid4g.sbgsjtdm = jtdm
        this.rfid4g.sbgsjtmc = jtmc
        this.rfid4g.sbgsgsdm = gsdm
        this.rfid4g.sbgsgsmc = gsmc
        this.rfid4g.sbgscddm = cddm
        this.rfid4g.sbgscdmc = cdmc
        this.rfid4g.sbgsxldm = xldm
        this.rfid4g.sbgsxlmc = xlmc
        console.log(this.rfid4g)
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        this.pageSize = val
        this.loadRfid4gData()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.loadRfid4gData()
      },
      // 显示高级搜索框
      showAdvanceSearchView() {
        this.advanceSearchViewVisible = !this.advanceSearchViewVisible
        this.rfid4g.qypbh = ''
        // 再次点击高级搜索advanceSearchViewVisible由true=>false，以下if语句执行
        if (!this.advanceSearchViewVisible) {
          this.emptyRfid4gData()
          this.beginDateScope = ''
          this.updateDateScope = ''
          this.endDateScope = ''
          this.loadRfid4gData()
        }
      },
      // enter触发
      searchRfid4g() {
        this.loadRfid4gData()
      },
      // 高级搜索的取消
      cancelSearch() {
        this.advanceSearchViewVisible = false
        this.emptyRfid4gData()
        this.beginDateScope = ''
        this.updateDateScope = ''
        this.endDateScope = ''
        this.loadRfid4gData()
      },
      showAddRfid4gView() {
        this.dialogVisible = true
        this.dialogTitle = "添加RFID4G"
      },
      addRfid4g(formName) {
        this.dialogVisible = true
        var _this = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            _this.rfid4g.sbjyh = Date.now().toString()
            // 新增设备与编辑已有设备时唯一区别就是this.rfid4g.sbjyh存不存在,编辑时存在putRequest;
            // 新增时this.rfid4g.sbjyh不存在,但这时就要校验所填数据唯一性及合理性
            // 故,点击取消编辑按钮,一定要empty this.rfid4g.sbjyh
            console.log('rfid4g表单信息（先）', this.rfid4g)
            console.log('判断设备基因号', this.rfid4g.sbjyh)
          } else {
            alert('FALSE')
            return false
          }
        })
      },
      cancelAdd(formName) {
        this.$refs[formName].resetFields()
        this.emptyRfid4gData()
      },
      showEditRfid4gView(row) {
        this.dialogVisible = true
        this.dialogTitle = "编辑RFID4G"
        this.rfid4g = row
        this.rfid4g.sbjyh = row.sbjyh // !important
        this.rfid4g.sbzbh = row.sbzbh
        this.rfid4g.htbh = row.htbh
        this.rfid4g.sbgzzt = row.sbgzzt
        this.rfid4g.qypbh = row.qypbh
        this.rfid4g.qypmc = row.qypmc
        this.rfid4g.gldj = row.gldj
        this.rfid4g.sbppdm = row.sbppdm
        this.rfid4g.sbxhdm = row.sbxhdm
        // 显示时名称，查询时代码
        this.rfid4gGsOption = [row.sbgsjtdm, row.sbgsgsdm, row.sbgscddm, row.sbgsxldm]
        this.rfid4gPpxhOption = [row.sbppdm, row.sbxhdm]
        this.rfid4g.sbgsjtmc = row.sbgsjtmc
        this.rfid4g.sbgsgsmc = row.sbgsgsmc
        this.rfid4g.sbgscdmc = row.sbgscdmc
        this.rfid4g.sbgsxlmc = row.sbgsxlmc
        this.rfid4g.sbqdrq = this.formatDate(row.sbqdrq)
        this.rfid4g.sbgxrq = this.formatDate(row.sbgxrq)
        this.rfid4g.sbbfrq = this.formatDate(row.sbbfrq)
        this.rfid4g.gysmc = row.gysmc
        this.rfid4g.jcsmc = row.jcsmc
        this.rfid4g.jzbh = row.jzbh
        this.rfid4g.zdbh = row.zdbh
        this.rfid4g.tmbh = row.tmbh
        this.rfid4g.ewmbh = row.ewmbh
        this.rfid4g.simkh = row.simkh
      },
      cancelEidt() {
        this.dialogVisible = false
        this.emptyRfid4gData()
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
          if (res && res.status === 200) {
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
        })
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
      emptyRfid4gGs() {
        this.rfid4gGsOption = ['', '', '', '']
      },
      emptyRfid4gPpxh() {
        this.rfid4gPpxhOption = ['', '']
      },
      // 清空Form填写信息
      emptyRfid4gData() {
        this.emptyRfid4gGs()
        this.emptyRfid4gPpxh()
        this.rfid4g = {
          sbjyh: '',
          sbzbh: '',
          htbh: '',
          sbgzztdm: '',
          sbgzzt: '',
          azzp: '',
          qypbh: '',
          qypmc: '',
          jzbh: '',
          jzmc: '',
          zdbh: '',
          zdmc: '',
          ssxzqydm: '',
          ssxzqy: '',
          gldjdm: '',
          gldj: '',
          sbppdm: '',
          sbpp: '',
          sbxhdm: '',
          sbxh: '',
          simkh: '',
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
          tmbh: '',
          ewmbh: ''
        }
      },
      /* 分页处理 pageSize currentPage 发生变化时向服务器发送 */
      // 根据所有可缺省参数向服务器请求数据
      loadRfid4gData() {
        var _this = this
        let params
        this.tableLoading = true
        if(this.rfid4g.sbgsjtdm){
          params = {
            page: this.currentPage,
            size: this.pageSize,
            orderItemName: '',
            order: '',
            // dyxljhdm: '',
            // dyxljhmc: '',
            sbzbh: this.rfid4g.sbzbh,
            htbh: this.rfid4g.htbh,
            sbgzztdm: this.rfid4g.sbgzztdm,
            // sbgzzt: '',
            // azzp: '',
            qypbh: this.rfid4g.qypbh,
            // qypmc: '',
            jzbh: this.rfid4g.jzbh,
            // jzmc: '',
            zdbh: this.rfid4g.zdbh,
            // zdmc: '',
            ssxzqydm: this.rfid4g.ssxzqydm,
            // ssxzqy: '',
            gldjdm: this.rfid4g.gldjdm,
            // gldj: '',
            sbppdm: this.rfid4g.sbppdm,
            // sbpp: '',
            sbxhdm: this.rfid4g.sbxhdm,
            // sbxh: '',
            simkh: this.rfid4g.simkh,
            sbgsjtdm: this.rfid4g.sbgsjtdm,
            // sbgsjtmc: '',
            sbgsgsdm: this.rfid4g.sbgsgsdm,
            // sbgsgsmc: '',
            sbgscddm: this.rfid4g.sbgscddm,
            // sbgscdmc: '',
            sbgsxldm: this.rfid4g.sbgsxldm,
            // sbgsxlmc: '',
            beginDateScope: this.beginDateScope,
            // sbqdrq: this.rfid4g.sbqdrq,
            updateDateScope: this.updateDateScope,
            // sbgxrq: this.rfid4g.sbqdrq,
            endDateScope: this.endDateScope,
            // sbbfrq: this.rfid4g.sbbfrq,
            gysdm: this.rfid4g.gysdm,
            // gysmc: '',
            jcsdm: this.rfid4g.jcsdm,
            // jcsmc: '',
            tmbh: this.rfid4g.tmbh,
            ewmbh: this.rfid4g.ewmbh,
            beginDateScope: this.beginDateScope,
            updateDateScope: this.updateDateScope,
            endDateScope: this.endDateScope
          }
        }else{
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
        // console.log(params.beginDateScope) // 数组 Date类型
        // console.log(this.formatDate(params.beginDateScope[0])) // 字符串 String类型 2019-03-15
        this.getRequest('/api/rfid4g/basic', params).then(res => {
          _this.tableLoading = false
          if (res && res.status === 200) {
            _this.Sbs = res.data.Rfid4gList
            // totalRow会发生改变 currentPage、pageSize是向服务端发送的
            _this.totalPage = res.data.totalRow
          }
        })
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
    // watch: {
    //   '$route'(to, from) {
    //     switch ((to.path)) {
    //       case '/rfid4g/jt1':
    //
    //         break
    //       case '/rfid4g/jt2':
    //
    //         break
    //       //  ...
    //     }
    //   }
    // }
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
