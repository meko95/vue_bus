<template>
  <div>
    <ElementHeader></ElementHeader>
    <!--暂时不考虑合并进Header组件-->
    <div id="title">
      合同列表
    </div>
    <el-container style="height: 665px; border: 1px solid #eee">
      <el-header style="padding: 0px;display:flex;justify-content:space-between;align-items: center">
        <div style="display: inline">
          <el-input
            placeholder="通过合同编号查询"
            clearable
            @change="keywordsChange"
            style="width: 300px;margin-left: 56px;padding: 0;"
            size="mini"
            :disabled="advanceSearchViewVisible"
            @keyup.enter.native="searchContract"
            prefix-icon="el-icon-search"
            v-model="keywords">
          </el-input>
          <el-select v-model="sblb" size="mini" style="width: 200px;margin-left: 20px;padding: 0;" clearable
                     placeholder="通过设备类别查询">
            <el-option
              v-for="item in DEVICE_LIST"
              :key="item.text"
              :label="item.text"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="contract.htlb" size="mini" style="width: 200px;margin-left: 20px;padding: 0;" clearable
                     placeholder="通过合同类别查询">
            <el-option
              v-for="item in CONTRACT_TYPE"
              :key="item.text"
              :label="item.text"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button type="primary" style="margin-left: 10px" size="mini" icon="el-icon-search" @click="searchContract">
            搜索
          </el-button>
          <el-button slot="reference" type="primary" size="mini" style="margin-left: 10px"
                     @click="showAdvanceSearchView">
            <i :class="[advanceSearchViewVisible ? searchUp:searchDown]"
               style="margin-right: 5px">
            </i>高级搜索
          </el-button>
        </div>

        <div style="margin-left: 5px;margin-right: 20px;display: inline">
          <el-button type="success" size="mini" @click="importContracts">
            <i class="fa fa-lg fa-level-down" style="margin-right: 10px"></i>导入数据
          </el-button>
          <el-button type="success" size="mini" @click="exportContracts">
            <i class="fa fa-lg fa-level-down" style="margin-right: 10px"></i>导出数据
          </el-button>
          <el-button type="primary" size="mini" icon="el-icon-plus" @click="showAddContractView">添加合同
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
                  合同编号：
                  <el-input prefix-icon="el-icon-search" v-model="contract.sbzbh" size="small" style="width: 160px"
                            placeholder="查询合同编号"></el-input>
                </el-col>
                <el-col :span="4">
                  合同类别：
                  <el-select v-model="contract.htlb" style="width: 100px" size="small" placeholder="合同类别">
                    <el-option v-for="item in CONTRACT_TYPE" :key="item.text" :label="item.text"
                               :value="item.value"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="5">
                  合同名称：
                  <el-input prefix-icon="el-icon-search" v-model="contract.htmc" size="small" style="width: 170px"
                            placeholder="合同名称"></el-input>
                </el-col>
                <el-col :span="5">
                  甲方名称：
                  <el-input prefix-icon="el-icon-search" v-model="contract.jfmc" size="small" style="width: 150px"
                            placeholder="甲方名称"></el-input>
                </el-col>
                <el-col :span="4">
                  乙方名称：
                  <el-input prefix-icon="el-icon-search" v-model="contract.yfmc" size="small" style="width: 150px"
                            placeholder="乙方名称"></el-input>
                </el-col>
              </el-row>
              <el-row style="margin-top: 18px">
                <el-col :span="5">
                  丙方名称：
                  <el-input prefix-icon="el-icon-search" v-model="contract.bfmc" size="small" style="width: 160px"
                            placeholder="丙方名称"></el-input>
                </el-col>
                <el-col :span="9">
                  签订日期：
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
                <el-col :span="4">
                  合同期限：
                  <el-input prefix-icon="el-icon-search" v-model="contract.htqx" size="small" style="width: 150px"
                            placeholder="单位：月"></el-input>
                </el-col>
              </el-row>
              <el-row style="margin-top: 18px">
                <el-col :span="5">
                  付款方式：
                  <el-select v-model="contract.fkfs" style="width: 160px" size="small" placeholder="请选择付款方式">
                    <el-option v-for="item in PAY_TYPE" :key="item.text" :label="item.text"
                               :value="item.value"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="4">
                  使用寿命：
                  <el-input prefix-icon="el-icon-search" v-model="contract.sbsysm" size="small" style="width: 100px"
                            placeholder="单位：月"></el-input>
                </el-col>
                <el-col :span="5">
                  设备质包款：
                  <el-input prefix-icon="el-icon-search" v-model="contract.sbzbk" size="small" style="width: 156px"
                            placeholder="单位：万元"></el-input>
                </el-col>
                <el-col :span="5">
                  设备质保期：
                  <el-input prefix-icon="el-icon-search" v-model="contract.sbzbq" size="small" style="width: 136px"
                            placeholder="单位：月"></el-input>
                </el-col>
              </el-row>
              <el-row style="margin-top: 18px">
                <el-col :span="4" :offset="21">
                  <el-button size="small" @click="cancelSearch">取消</el-button>
                  <el-button icon="el-icon-search" type="primary" size="small" @click="searchContract">搜索</el-button>
                </el-col>
              </el-row>
            </div>
          </transition>
          <!-- 合同信息Begin -->
          <el-table ref="multipleTable" :data="contracts" v-loading="tableLoading" border tooltip-effect="dark"
                    style="width: 100%;" :row-style="{'height': 0}" :cell-style="{'padding': 0}"
                    @selection-change="handleSelectionChange" stripe size="small" height="543"
                    :default-sort="{prop: 'htqdrq', order: 'descending'}">
            <el-table-column type="selection" width="36" align="center"></el-table-column>
            <el-table-column prop="htbh" label="合同编号" width="90" align="center" fixed></el-table-column>
            <el-table-column prop="htlb" label="合同类别" width="80" align="center"></el-table-column>
            <el-table-column prop="htmc" label="合同名称" width="170" align="center"></el-table-column>
            <el-table-column prop="jfmc" label="甲方名称" width="170" align="center"></el-table-column>
            <el-table-column prop="yfmc" label="乙方名称" width="170" align="center"></el-table-column>
            <el-table-column prop="bfmc" label="丙方名称" width="170" align="center"></el-table-column>
            <el-table-column prop="htqdrq" label="签订日期" width="90" align="center"></el-table-column>
            <el-table-column prop="htqx" label="合同期限(单位:月)" width="120" align="center"></el-table-column>
            <el-table-column prop="fkfs" label="付款方式" width="80" align="center"></el-table-column>
            <el-table-column prop="sbsysm" label="设备使用寿命(单位:月)" width="150" align="center"></el-table-column>
            <el-table-column prop="sbzbk" label="设备质包款" width="100" align="center"></el-table-column>
            <el-table-column prop="sbzbq" label="设备质保期(单位:月)" width="130" align="center"></el-table-column>
          </el-table>
          <!-- 合同信息End -->
          <!-- 批量删除及分页Begin -->
          <div style="display: flex;justify-content: flex-end;margin-top: 8px">
            <el-button size="small" v-if="contracts.length>0"
                       :disabled="multipleSelection.length===0||multipleSelection.length>1"
                       @click="showEditContractView(multipleSelection[0])">编辑
            </el-button>
            <el-button type="danger" size="small" v-if="contracts.length>0" :disabled="multipleSelection.length==0"
                       @click="deleteManyContracts">批量删除
            </el-button>
            <el-button size="small" v-if="contracts.length>0" :disabled="multipleSelection.length==0"
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
    <!-- 新增合同信息Begin -->
    <el-form :model="contract" :rules="rules" ref="addContractForm" style="margin: 0px;padding: 0px;">
      <div style="text-align: left">
        <el-dialog :title="dialogTitle" style="padding: auto;" :close-on-click-modal="false"
                   :visible.sync="dialogVisible" width="77%">
          <el-row style="padding-left: 100px">
            <el-col :span="7">
              <div>
                <el-form-item label="合同编号:" prop="htbh">
                  <el-input prefix-icon="el-icon-edit" v-model="contract.htbh" size="small" style="width: 150px"
                            placeholder="请输入合同编号"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div>
                <el-form-item label="合同类别:" prop="htlb">
                  <el-select v-model="contract.htlb" style="width: 100px" size="small" placeholder="合同类别">
                    <el-option v-for="item in CONTRACT_TYPE" :key="item.text" :label="item.text"
                               :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div>
                <el-form-item label="合同名称:" prop="htmc">
                  <el-input prefix-icon="el-icon-edit" v-model="contract.htmc" size="small" style="width: 150px"
                            placeholder="请输入设备合同名称"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row style="padding-left: 100px">
            <el-col :span="7">
              <div>
                <el-form-item label="甲方名称:" prop="jfmc">
                  <el-input prefix-icon="el-icon-edit" v-model="contract.jfmc" size="small" style="width: 150px"
                            placeholder="请输入甲方名称"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div>
                <el-form-item label="乙方名称:" prop="jfmc">
                  <el-input prefix-icon="el-icon-edit" v-model="contract.yfmc" size="small" style="width: 150px"
                            placeholder="请输入乙方名称"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div>
                <el-form-item label="丙方名称:" prop="bfmc">
                  <el-input prefix-icon="el-icon-edit" v-model="contract.bfmc" size="small" style="width: 150px"
                            placeholder="请输入丙方名称"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div>
                <el-form-item label="签订日期:" prop="htqdrq">
                  <el-date-picker
                    v-model="contract.htqdrq"
                    size="small"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    style="width: 150px"
                    type="date"
                    placeholder="签订日期">
                  </el-date-picker>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div>
                <el-form-item label="合同期限:" prop="htqx">
                  <el-input prefix-icon="el-icon-edit" v-model="contract.htqx" size="small" style="width: 150px"
                            placeholder="单位：月"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row style="padding-left: 100px">
            <el-col :span="7">
              <div>
                <el-form-item label="付款方式:" prop="fkfs">
                  <el-select v-model="contract.fkfs" style="width: 150px" size="small" placeholder="付款方式">
                    <el-option v-for="item in PAY_TYPE" :key="item.text" :label="item.text"
                               :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <!-- 使用寿命是否要放在设备基本信息表里面？？方便及时维护设备 -->
            <el-col :span="7">
              <div>
                <el-form-item label="使用寿命:" prop="sbsysm">
                  <el-input prefix-icon="el-icon-edit" v-model="contract.sbsysm" size="small" style="width: 150px"
                            placeholder="单位：月"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div>
                <el-form-item label="质包款:" prop="sbzbk">
                  &nbsp;&nbsp;
                  <el-input prefix-icon="el-icon-edit" v-model="contract.sbzbk" size="small" style="width: 150px"
                            placeholder="单位：万元"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div>
                <el-form-item label="质保期:" prop="sbzbq">
                  &nbsp;&nbsp;
                  <el-input prefix-icon="el-icon-edit" v-model="contract.sbzbq" size="small" style="width: 150px"
                            placeholder="单位：月"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <span slot="footer" class="dialog-footer">
            <el-button size="large" @click="cancelEidt">取 消</el-button>
            <el-button size="large" type="primary" @click="addContract('addContractForm')">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </el-form>
    <!-- 新增合同信息End -->
  </div>
</template>
<script>
  import ElementHeader from '../../components/Header'

  export default {
    name: "Contract",
    data() {
      return {
        sblb: '',
        totalRow: 0,
        pageSize: 10,
        currentPage: 1,
        DEVICE_LIST: this.$store.getters.getAllDeviceTypes,
        CONTRACT_TYPE: this.$store.getters.getAllContractTypes,
        PAY_TYPE: this.$store.getters.getAllPayTypes,
        advanceSearchViewVisible: false,
        dialogVisible: false,
        tableLoading: false,
        keywords: '',
        dateScope: '',
        contract: {
          htbh: '',
          htlb: '',
          htmc: '',
          jfmc: '',
          yfmc: '',
          bfmc: '',
          htqdrq: '',
          htqx: '',
          fkfsdm: '',
          fkfs: '',
          sbsysm: '',
          sbzbk: '',
          sbzbq: ''
        },
        contracts: [],
        multipleSelection: [],
        searchUp: 'el-icon-arrow-up',
        searchDown: 'el-icon-arrow-down',
        contractGsOption: ['', '', ''],
        contractGsOptions: [],
        fileUploadBtnText: '导入数据',
        dialogTitle: '',
        gys: [],
        jcs: [],
        gsxl: [],
        xh: [],
        pp: [],
        gldj: [],
        rules: {
          htbh: [{required: true, message: '必填:合同编号', trigger: 'blur'}],
          htlb: [{required: true, message: '必填:合同类别', trigger: 'blur'}],
          htmc: [{required: true, message: '必填:合同名称', trigger: 'blur'}],
          jfmc: [{required: true, message: '必填:甲方名称', trigger: 'blur'}],
          yfmc: [{required: true, message: '必填:乙方名称', trigger: 'blur'}],
          bfmc: [{required: true, message: '必填:丙方名称', trigger: 'blur'}],
          htqdrq: [{required: true, message: '必填:签订日期', trigger: 'blur'}],
          htqx: [{required: true, message: '必填:合同期限', trigger: 'blur'}],
          fkfs: [{required: true, message: '必填:付款方式', trigger: 'blur'}],
          sbsysm: [{required: true, message: '必填:设备使用寿命', trigger: 'blur'}],
          sbzbk: [{required: true, message: '必填:质包款', trigger: 'blur'}],
          sbzbq: [{required: true, message: '必填:质保期', trigger: 'blur'}]
        }
      }
    },
    components: {
      ElementHeader
    },
    methods: {
      keywordsChange(val) {
        if (val == '') {
          this.loadContractData()
        }
      },
      searchContract() {
        this.loadContractData()
      },
      cancelSearch() {
        this.advanceSearchViewVisible = false
        this.emptyContractData()
        this.emptyContractGs()
        this.dateScope = ''
        this.loadContractData()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      // 高级搜索的取消
      showAdvanceSearchView() {
        this.advanceSearchViewVisible = !this.advanceSearchViewVisible
        this.keywords = ''
        if (!this.advanceSearchViewVisible) {
          this.emptyContractData()
          this.dateScope = ''
          this.loadContractData()
        }
      },
      showAddContractView() {
        this.dialogVisible = true
        this.dialogTitle = "添加合同"
        console.log('添加合同')
      },
      showEditContractView(row) {
        console.log(row)
        this.dialogVisible = true
        this.dialogTitle = "编辑合同"
        this.contract = row
        this.contract.htbh = row.htbh
        this.contract.htlb = row.htlb
        this.contract.htmc = row.htmc
        this.contract.jfmc = row.jfmc
        this.contract.yfmc = row.yfmc
        this.contract.bfmc = row.bfmc
        this.contract.htqdrq = row.htqdrq
        this.contract.htqx = row.htqx
        this.contract.fkfs = row.fkfs
        this.contract.sbsysm = row.sbsysm
        this.contract.sbzbk = row.sbzbk
        this.contract.sbzbq = row.sbzbq
      },
      cancelEidt() {
        this.dialogVisible = false
        this.emptyContractData()
        this.emptyContractGs()
      },
      addContract(formName) {
        var _this = this
        _this.dialogVisible = true
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.contract.htbh) {
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
      deleteContract(row) {
        this.$confirm('此操作将永久删除合同：合同' + row.htbh + ', 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.doDelete(row.id)
        }).catch(() => {
        })
      },
      doDelete(ids) {
        this.tableLoading = true;
        var _this = this;
        // this.deleteRequest("/employee/basic/emp/" + ids).then(resp => {
        //   _this.tableLoading = false
        //   if (resp && resp.status == 200) {
        //     var data = resp.data
        //     _this.contracts = data.contracts
        //     _this.loadEmps()
        //   }
        // })
      },
      deleteManyContracts() {
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
        this.loadContractData()
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        this.pageSize = val
        this.loadContractData()
      },
      emptyContractData() {
        this.contract = {
          htbh: '',
          htlb: '',
          htmc: '',
          jfmc: '',
          yfmc: '',
          bfmc: '',
          htqdrq: '',
          htqx: '',
          fkfsdm: '',
          fkfs: '',
          sbsysm: '',
          sbzbk: '',
          sbzbq: ''
        }
      },
      /* 分页处理 pageSize currentPage 发生变化时向服务器发送 */
      // 根据所有可缺省参数向服务器请求数据
      loadContractData() {
        var _this = this
        this.tableLoading = true
        let params = {
          page: this.currentPage,
          size: this.pageSize,
          keywords: this.keywords,
          orderItemName: '',
          order: '',
          htbh: this.contract.htbh,
          htlb: this.contract.htlb,
          htmc: this.contract.htmc,
          jfmc: this.contract.jfmc,
          yfmc: this.contract.yfmc,
          bfmc: this.contract.bfmc,
          htqdrq: this.contract.htqdrq,
          htqx: this.contract.htqx,
          fkfsdm: this.contract.fkfsdm,
          fkfs: this.contract.fkfs,
          sbsysm: this.contract.sbsysm,
          sbzbk: this.contract.sbzbk,
          sbzbq: this.contract.sbzbq,
          dateScope: this.dateScope
        }
        console.log(params)
        // 接口待写
        this.getRequest('/api/sbs/contract').then(res => {
          _this.tableLoading = false
          if (res && res.status === 200) {
            _this.contracts = res.data.ContractList
            // totalRow会发生改变 currentPage、pageSize是向服务端发送的
            _this.totalRow = res.data.totalRow
          }
        })
      },
      importContracts() {
        window.open("/employee/basic/importEmp", "_parent")
      },
      exportContracts() {
        window.open("/employee/basic/exportEmp", "_parent")
      }
    },
    mounted() {
      this.loadContractData()
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
