<template>
  <div>
    <Header></Header>
    <div id="title">
      设备基础信息
    </div>
    <section class="search-area">
      <div class="sa-ele">
        <label class="se-title">设备类别:</label>
        <select class="se-con" name="type" v-model="formData.sblb">
          <option v-for="(item,index) in DEVICE_LIST" :key="index" :value="item.value">{{item.text}}</option>
          <!--通过js增加-->
        </select>
      </div>
      <div class="sa-ele">
        <button class="search-action" @click="onSearch()">搜索</button>
        <button class="reset-action" @click="onReset()">重置</button>
        <button class="reset-action" @click="onAdd()">新增</button>
      </div>
    </section>
    <section class="grid-main">
      <GridManager
        :option="option"
        :callback="callback"
        ref="grid"
      ></GridManager>
    </section>
    <Modal modal-id="modal_addDeviceBasicInfo" modal-title="输入新增设备信息：" :modal-body="info" footer-btn-left="确定提交"
           @l_func="submit_data"
           btn-left-color="btn btn-success" footer-btn-right="重新填写" btn-right-color="btn btn-default"></Modal>
  </div>
</template>

<script>
  import Header from '@/components/Header'
  import GridManager from '@/components/GridManager'
  import Modal from '@/components/Modal'

  const getDeviceBasicInfo = function (params) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      // GridManager Error  请求数据失败！response中的必须为数组类型，可通过配置项[dataKey]修改字段名 data!!!!!
      // http://kathryn.cn:8080/bus/sbInfo/rfid4g
      xhr.open('POST', 'http://kathryn.cn:8080/bus/contract/getContractList', true)
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
      xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
          return
        }
        if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
          resolve(xhr.response)
        } else {
          reject(xhr)
        }
      }
      // 一个简单的处理参数的示例
      let formData = ''
      for (let key in params) {
        if (formData !== '') {
          formData += '&'
        }
        formData += key + '=' + params[key]
      }
      console.log('xhr.send()参数formData符合参数规则为')
      console.log(formData) // test=22&type=3&cPage=1&pSize=30&sort_createDate=DESC
      xhr.send(formData)
    })
  }
  export default {
    name: "DeviceBasicInfo",
    data() {
      return {
        info: ' ',
        formData: {
          sblb: ''
        },
        DEVICE_LIST: [{
          text: 'RFID4G',
          value: '1'
        }, {
          text: 'RFID4G(场站)',
          value: '2'
        }, {
          text: '车辆标签',
          value: '3'
        }, {
          text: '车载一体机',
          value: '4'
        }, {
          text: '报到机',
          value: '5'
        }, {
          text: '一程一检',
          value: '6'
        }, {
          text: '站点通',
          value: '7'
        }, {
          text: '55寸屏',
          value: '8'
        }, {
          text: '站杆预报屏',
          value: '9'
        }],
        callback: function (query) {
          console.log('callback => ', query)
        },
        option: {
          supportRemind: true,
          gridManagerName: 'DeviceBasicInfo',
          height: '572px',
          supportAjaxPage: true,
          supportSorting: true,
          isCombSorting: false,
          disableCache: false,
          ajax_data: (settings, params) => {
            console.log('ajax_data请求时带的参数为')
            console.log(params)
            return getDeviceBasicInfo(params)
          },
          ajax_type: 'POST',
          supportMenu: true,
          query: {
            htlb: ''
          },
          // 绑定服务器返回数据的key值
          // dataKey: 'data',
          dataKey: 'rowsList',
          // 绑定服务器返回数据总条数
          totalsKey: 'total',
          pageSize: 30,
          columnData: [{
            text: '编号',
            remind: '设备唯一编号',
            key: 'sbjyh',
            width: '200px',
            align: 'center',
            template: '<span>21009872622222131000123</span>'
          }, {
            text: '自编号',
            key: 'sbzbh',
            width: '120px',
            align: 'center',
            template: '<span>123456789012</span>'
          }, {
            text: '管理等级',
            key: 'gldj',
            width: '3px',
            align: 'center',
            template: '<span>A</span>'
          }, {
            text: '设备品牌',
            key: 'sbpp',
            width: '3px',
            align: 'center',
            template: '<span>大索尼</span>'
          }, {
            text: '设备型号',
            key: 'sbxh',
            width: '110px',
            align: 'center',
            template: '<span>Z-SO31-4105</span>'
          },
            {
              text: 'SIM卡号',
              key: 'simkh',
              width: '180px',
              align: 'center',
              template: '<span>12345678901234567890</a></span>'
            }, {
              text: '归属集团',
              remind: '点击可查看设备归属集团详细信息',
              key: 'sbgsjt',
              width: '110px',
              align: 'center',
              // 重点 集团=>公司=>车队=>线路
              template: '<a @click="into_com">设备集团名称A</a>'
            }, {
              text: '启动日期',
              key: 'sbqdrq',
              width: '83px',
              align: 'center',
              template: '<span>2/26/2019</span>'
            }, {
              text: '更新日期',
              key: 'sbgxrq',
              width: '83px',
              align: 'center',
              template: '<span>2/26/2019</span>'
            }, {
              text: '报废日期',
              key: 'sbbfrq',
              width: '83px',
              align: 'center',
              template: '<span>2/26/2019</span>'
            }, {
              text: '供应商',
              key: 'sbgys',
              width: '68px',
              align: 'center',
              template: '<span>供应商A</span>'
            }, {
              text: '集成商',
              key: 'sbjcs',
              width: '68px',
              align: 'center',
              template: '<span>集成商A</span>'
            }, {
              text: '<span style="color: gray">操作</span>',
              key: 'action',
              align: 'center',
              width: '100px',
              // 使用@click
              template: () => {
                return '<span class="plugin-action" @click="delRow(row, index)">&nbsp;删除&nbsp;</span>' +
                  '<span class="plugin-action" @click="editRow(row, index)">&nbsp;修改&nbsp;</span>';
              }
            }]
        }
      }
    },
    components: {
      Header,
      GridManager,
      Modal
    },
    methods: {
      onSearch: function () {

      },
      onReset: function () {
        this.formData.htlb = ''
      },
      onAdd: function () {
        // 条码编号报废日期更新日期启动日期安装照片安装地点SIM卡号公司等级品牌型号自编号编号
        $('.modal-body').html('<div class="modal-body">' +
          '                    <form id="add_contract_form" class="form-horizontal bv-form" method="post" action="http://47.102.117.31:8080/bus/contract/insertContract"' +
          '                        novalidate="novalidate">' +
          '                        <div class="form-group has-feedback">' +
          '                            <label class="col-lg-3 control-label">设备编号</label>' +
          '                            <div class="col-lg-7">' +
          '                                <input type="text" class="form-control" name="sbjyh" placeholder="设备编号" data-bv-field="sbjyh">' +
          '                                <i style="display: none;" class="form-control-feedback" data-bv-icon-for="sbjyh"></i>' +
          '                                <small style="display: none;" class="help-block" data-bv-validator="notEmpty"' +
          '                                    data-bv-for="sbjyh" data-bv-result="NOT_VALIDATED">设备自编号不可为空' +
          '                                </small>' +
          '                            </div>' +
          '                        </div>' +
          '                        <div class="form-group has-feedback">' +
          '                            <label class="col-lg-3 control-label">设备自编号</label>' +
          '                            <div class="col-lg-7">' +
          '                                <input type="text" class="form-control" name="sbzbh" placeholder="设备自编号" data-bv-field="sbzbh">' +
          '                                <i style="display: none;" class="form-control-feedback" data-bv-icon-for="sbzbh"></i>' +
          '                                <small style="display: none;" class="help-block" data-bv-validator="notEmpty"' +
          '                                    data-bv-for="sbzbh" data-bv-result="NOT_VALIDATED">设备自编号不可为空' +
          '                                </small>' +
          '                            </div>' +
          '                        </div>' +
          '                        <div class="form-group has-feedback">' +
          '                            <label class="col-lg-3 control-label">设备型号</label>' +
          '                            <div class="col-lg-4">' +
          '                                <select class="form-control">' +
          '                                    <option value="-1">请选择</option>' +
          '                                    <option value="1">Z-SO31-1</option>' +
          '                                    <option value="2">Z-SO31-2</option>' +
          '                                    <option value="3">Z-SO31-4</option>' +
          '                                </select>' +
          '                                <i style="display: none;" class="form-control-feedback" data-bv-icon-for="sbxh"></i>' +
          '                                <small style="display: none;" class="help-block" data-bv-validator="notEmpty"' +
          '                                    data-bv-for="sbxh" data-bv-result="NOT_VALIDATED">请选择设备型号' +
          '                                </small>' +
          '                            </div>' +
          '                        </div>' +
          '                        <div class="form-group has-feedback">' +
          '                            <label class="col-lg-3 control-label">设备品牌</label>' +
          '                            <div class="col-lg-4">' +
          '                                <select class="form-control">' +
          '                                    <option value="-1">请选择</option>' +
          '                                    <option value="1">美的</option>' +
          '                                    <option value="2">联想</option>' +
          '                                    <option value="3">创维</option>' +
          '                                </select>' +
          '                                <i style="display: none;" class="form-control-feedback" data-bv-icon-for="sbpp"></i>' +
          '                                <small style="display: none;" class="help-block" data-bv-validator="notEmpty"' +
          '                                    data-bv-for="sbpp" data-bv-result="NOT_VALIDATED">请选择设备品牌' +
          '                                </small>' +
          '                            </div>' +
          '                        </div>' +
          '                        <div class="form-group has-feedback">' +
          '                            <label class="col-lg-3 control-label">设备管理等级</label>' +
          '                            <div class="col-lg-4">' +
          '                                <select class="form-control">' +
          '                                    <option value="-1">请选择</option>' +
          '                                    <option value="1">A</option>' +
          '                                    <option value="2">B</option>' +
          '                                    <option value="3">C</option>' +
          '                                    <option value="4">D</option>' +
          '                                </select>' +
          '                                <i style="display: none;" class="form-control-feedback" data-bv-icon-for="gldj"></i>' +
          '                                <small style="display: none;" class="help-block" data-bv-validator="notEmpty"' +
          '                                    data-bv-for="gldj" data-bv-result="NOT_VALIDATED">请选择设备管理等级' +
          '                                </small>' +
          '                            </div>' +
          '                        </div>' +
          '                        <div class="form-group has-feedback">' +
          '                            <label class="col-lg-3 control-label">设备归属公司</label>' +
          '                            <div class="col-lg-4">' +
          '                                <select class="form-control">' +
          '                                    <option value="-1">请选择</option>' +
          '                                    <option value="1">上海集鑫</option>' +
          '                                    <option value="2">上海澳马</option>' +
          '                                    <option value="3">上海宾泰</option>' +
          '                                </select>' +
          '                                <i style="display: none;" class="form-control-feedback" data-bv-icon-for="sbgsgsmc"></i>' +
          '                                <small style="display: none;" class="help-block" data-bv-validator="notEmpty"' +
          '                                    data-bv-for="sbgsgsmc" data-bv-result="NOT_VALIDATED">请选择设备归属公司' +
          '                                </small>' +
          '                            </div>' +
          '                        </div>' +
          '                        <div class="form-group has-feedback">' +
          '                            <label class="col-lg-3 control-label">设备SIM卡号</label>' +
          '                            <div class="col-lg-7">' +
          '                                <input type="text" class="form-control" name="simkh" placeholder="设备SIM卡号"' +
          '                                    data-bv-field="simkh">' +
          '                                <i style="display: none;" class="form-control-feedback" data-bv-icon-for="simkh"></i>' +
          '                                <small style="display: none;" class="help-block" data-bv-validator="notEmpty"' +
          '                                    data-bv-for="simkh" data-bv-result="NOT_VALIDATED">设备SIM卡号不可为空' +
          '                                </small>' +
          '                            </div>' +
          '                        </div>' +
          '                        <div class="form-group has-feedback">' +
          '                            <label class="col-lg-3 control-label">设备安装地点</label>' +
          '                            <div class="col-lg-4">' +
          '                                <select class="form-control">' +
          '                                    <option value="-1">请选择城市</option>' +
          '                                    <option value="1">上海市</option>' +
          '                                    <option value="2">杭州市</option>' +
          '                                    <option value="3">苏州市</option>' +
          '                                    <option value="3">...</option>' +
          '                                </select>' +
          '                                <div style="height:6px"></div>' +
          '                                <select class="form-control">' +
          '                                    <option value="-1">请选择行政区域</option>' +
          '                                    <option value="1">杨浦区</option>' +
          '                                    <option value="2">静安区</option>' +
          '                                    <option value="3">虹口区</option>' +
          '                                    <option value="4">徐汇区</option>' +
          '                                    <option value="5">...</option>' +
          '                                </select>' +
          '                                <div style="height:6px"></div>' +
          '                                <select class="form-control">' +
          '                                    <option value="-1">请选择安装地点</option>' +
          '                                    <option value="1">爱国路</option>' +
          '                                    <option value="2">隆昌路</option>' +
          '                                    <option value="3">宁国路</option>' +
          '                                    <option value="4">...</option>' +
          '                                </select>' +
          '                                <i style="display: none;" class="form-control-feedback" data-bv-icon-for="azddmc"></i>' +
          '                                <small style="display: none;" class="help-block" data-bv-validator="notEmpty"' +
          '                                    data-bv-for="azddmc" data-bv-result="NOT_VALIDATED">请选择设备安装地点' +
          '                                </small>' +
          '                            </div>' +
          '                        </div>' +
          '                        <div>' +
          '                            <b>上传设备安装照片</b>' +
          '                            <input id="file-0" class="file" type="file" multiple data-min-file-count="1">' +
          '                            <br>' +
          '                            <!-- <button id="#add_contract_btn" type="submit" class="btn btn-primary">提交</button> -->' +
          '                            <button id="validateBtn" type="submit" class="btn btn-primary">提交</button>' +
          '                            <button id="resetBtn" type="reset" class="btn btn-primary">重新选择</button>' +
          '                            <!--<button type="reset" class="btn btn-default">重新选择</button>-->' +
          '                        </div>' +
          '                        <div class="form-group has-feedback">' +
          '                            <label class="col-lg-3 control-label">设备启动日期</label>' +
          '                            <div class="col-lg-7">' +
          '                                <input type="text" class="form-control" name="sbqdrq" placeholder="日期选择插件"' +
          '                                    data-bv-field="sbqdrq">' +
          '                                <i style="display: none;" class="form-control-feedback" data-bv-icon-for="sbqdrq"></i>' +
          '                                <small style="display: none;" class="help-block" data-bv-validator="notEmpty"' +
          '                                    data-bv-for="sbqdrq" data-bv-result="NOT_VALIDATED">设备启动日期不可为空' +
          '                                </small>' +
          '                            </div>' +
          '                        </div>' +
          '                        <div class="form-group has-feedback">' +
          '                            <label class="col-lg-3 control-label">设备更新日期</label>' +
          '                            <div class="col-lg-7">' +
          '                                <input type="text" class="form-control" name="sbgxrq" placeholder="日期选择插件"' +
          '                                    data-bv-field="sbgxrq">' +
          '                                <i style="display: none;" class="form-control-feedback" data-bv-icon-for="sbgxrq"></i>' +
          '                                <small style="display: none;" class="help-block" data-bv-validator="notEmpty"' +
          '                                    data-bv-for="sbgxrq" data-bv-result="NOT_VALIDATED">设备更新日期不可为空' +
          '                                </small>' +
          '                            </div>' +
          '                        </div>' +
          '                        <div class="form-group has-feedback">' +
          '                            <label class="col-lg-3 control-label">设备报废日期</label>' +
          '                            <div class="col-lg-7">' +
          '                                <input type="text" class="form-control" name="sbbfrq" placeholder="日期选择插件"' +
          '                                    data-bv-field="sbbfrq">' +
          '                                <i style="display: none;" class="form-control-feedback" data-bv-icon-for="sbbfrq"></i>' +
          '                                <small style="display: none;" class="help-block" data-bv-validator="notEmpty"' +
          '                                    data-bv-for="sbbfrq" data-bv-result="NOT_VALIDATED">设备报废日期不可为空' +
          '                                </small>' +
          '                            </div>' +
          '                        </div>' +
          '                        <div class="form-group has-feedback">' +
          '                            <label class="col-lg-3 control-label">设备条码编号</label>' +
          '                            <div class="col-lg-7">' +
          '                                <input type="text" class="form-control" name="tmbh" placeholder="设备条码编号" data-bv-field="tmbh">' +
          '                                <i style="display: none;" class="form-control-feedback" data-bv-icon-for="tmbh"></i>' +
          '                                <small style="display: none;" class="help-block" data-bv-validator="notEmpty"' +
          '                                    data-bv-for="tmbh" data-bv-result="NOT_VALIDATED">设备条码编号不可为空' +
          '                                </small>' +
          '                            </div>' +
          '                        </div>' +
          '                        <div>' +
          '                            <br>' +
          '                        </div>' +
          '                    </form>' +
          '                </div>')
        $('#modal_addDeviceBasicInfo').modal()
        console.log('----新增操作开始----')
      },
      check_form: function () {
        console.log('表单检查函数')
      },
      submit_data: function () {
        console.log('模态框确定时间 应在此时检查表单输入规范')
        // 首先validator检查 调用check_form()
        // 如果输入规范 addContract接口提交数据 若提交成功关闭模态
        $('#modal_addContract').modal('toggle')
        // 如果输入不规范 validator自会处理
      },
      onReset: function () {

      },
      into_com: function () {
        this.option.columnData = [{
          text: '设备编号',
          remind: '设备唯一编号',
          key: 'sbjyh',
          width: '200px',
          align: 'center',
          template: '<span>21009872622222131000123</span>'
        }, {
          text: '设备自编号',
          key: 'sbzbh',
          width: '120px',
          align: 'center',
          template: '<span>123456789012</span>'
        },
          {
            text: '设备归属集团',
            key: 'jtmc',
            width: '140px',
            align: 'center',
            template: '<span>上海久士公交集团</span>'
          }, {
            text: '设备归属公司',
            key: 'sbgsgsmc',
            width: '120px',
            align: 'center',
            template: '<span>巴士一公司</span>'
          }, {
            text: '设备归属车队',
            key: 'cd',
            width: '80px',
            align: 'center',
            template: '<span>一车队</span>'
          }, {
            text: '设备所属线路',
            key: 'xl',
            width: '240px',
            align: 'center',
            template: '<span>55路,101,B102,306,405,201</span>'
          }, {
            text: '设备条码编号',
            key: 'tmbh',
            width: '120px',
            align: 'center',
            template: '<span>0123456789</span>'
          }, {
            text: '设备二维码编号',
            key: 'ewmbh',
            width: '200px',
            align: 'center',
            template: '<span>0123456789</span>'
          }, {
            text: '<span style="color: gray">操作</span>',
            key: 'action',
            align: 'center',
            width: '100px',
            // 使用@click
            template: () => {
              return '<span class="plugin-action" @click="delRow(row, index)">&nbsp;删除&nbsp;</span>' +
                '<span class="plugin-action" @click="editRow(row, index)">&nbsp;修改&nbsp;</span>';
            }
          }]
        this.$refs['grid'].$el.GM('destroy')
        this.$refs['grid'].$el.GM('init', this.option);
      },
      onDestroy: function () {
        this.$refs['grid'].$el.GM('destroy')
      }
    },
    beforeDestroy() {
      this.onDestroy()
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  #title {
    height: 36px;
    text-align: center;
    background-color: #428bca;
    color: white;
    font-size: 18px;
    line-height: 36px;
  }

  div {
    /*font-size: @font-size-base;*/
    /*color: @brand-primary;*/
    font-size: 14px;
    color: #428bca;
  }

  html, body {
    width: 100%;
    overflow-x: hidden;
    margin: 0;
    padding: 0;
  }

  table .plugin-action {
    display: inline-block;
    color: steelblue;
    margin-right: 10px;
    cursor: pointer;
    text-decoration: none;
  }

  table .plugin-action:hover {
    text-decoration: underline;
  }

  .search-area {
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 110px;
    border: 1px solid #ccc;
    background: #efefef;
    margin-bottom: 15px;
  }

  .search-area .sa-ele {
    display: inline-block;
    padding-left: 48px;
    font-size: 12px;
  }

  .search-area .sa-ele .se-title {
    display: inline-block;
    margin-left: 20px;
  }

  .search-area .sa-ele .se-con {
    display: inline-block;
    width: 180px;
    height: 24px;
    border: 1px solid #ccc;
    padding: 0 4px;
    line-height: 24px;
  }

  .search-area .sa-ele .search-action, .search-area .sa-ele .reset-action {
    display: inline-block;
    width: 80px;
    height: 26px;
    border: 1px solid #ccc;
    background: #e8e8e8;
    padding: 0 4px;
    line-height: 26px;
    text-align: center;
    cursor: pointer;
    margin-right: 10px;
  }

  .search-area .sa-ele .search-action:hover, .search-area .sa-ele .reset-action:hover {
    opacity: 0.7;
  }

  .bottom-bar {
    background: #f8f8f8;
    padding: 10px;
    margin-top: 10px;
  }

  .bottom-bar button {
    padding: 5px 20px;
    margin-right: 10px;
  }
</style>
