<template>
  <div>
    <Header></Header>
    <!--暂时不考虑合并进Header组件-->
    <div id="title">
      合同列表
    </div>
    <section class="search-area">
      <div class="sa-ele">
        <label class="se-title">合同名称:</label>
        <input class="se-con" v-model="formData.htmc"/>
      </div>
      <div class="sa-ele">
        <label class="se-title">合同编号:</label>
        <input class="se-con" v-model="formData.htbh"/>
      </div>
      <div class="sa-ele">
        <label class="se-title">合同类别:</label>
        <select class="se-con" name="type" v-model="formData.htlb">
          <!--<option value="-1">请选择</option>-->
          <option v-for="(item,index) in TYPE_LIST" :key="index" :value="item.value">{{item.text}}</option>
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
    <!--Modals-->
    <Modal modal-id="modal_addContract" modal-title="输入新增合同信息：" :modal-body="info" footer-btn-left="确定提交"
           @l_func="submit_data"
           btn-left-color="btn btn-success" footer-btn-right="重新填写" btn-right-color="btn btn-default"></Modal>
  </div>
</template>
<script>
  import GridManager from '@/components/GridManager'
  import Header from '@/components/Header'
  import Modal from '@/components/Modal'
  // 模拟的一个Promise请求
  const getContractList = function (params) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      // GridManager Error  请求数据失败！response中的必须为数组类型，可通过配置项[dataKey]修改字段名 data!!!!!
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
    name: "ContractList",
    data() {
      return {
        // 模态框body嵌入表单
        info: ' ',
        // 表单数据
        formData: {
          htmc: '',
          htbh: '',
          htlb: ''
        },
        // 分类
        TYPE_LIST: [
          {
            value: '1',
            text: '主'
          },
          {
            value: '2',
            text: '分包'
          }
        ],
        // 表格渲染回调函数
        // query为gmOptions中配置的query
        callback: function (query) {
          console.log('callback => ', query)
        },

        // GM所需参数
        option: {
          supportRemind: true,
          gridManagerName: 'ContractList',
          height: '570px',
          supportAjaxPage: true,
          supportSorting: true,
          isCombSorting: false,
          disableCache: false,
          // settings: 当前的options配置项汇总，包含分页及排序等信息
          // params: 当前请求时所需要协带的参数信息
          ajax_data: (settings, params) => {
            console.log('ajax_data请求时带的参数为')
            console.log(params)
            return getContractList(params)
          },
          ajax_type: 'POST',
          supportMenu: true,
          query: {
            // url查询时传的参数
            htmc: '',
            htbh: '',
            htlb: ''
          },
          // 绑定服务器返回数据的key值
          dataKey: 'rowsList',
          totalsKey: 'total',
          pageSize: 30,
          columnData: [
            {
              text: '编号',
              key: 'htbh',
              width: '160px',
              align: 'center',
              template: '<span>{{row.htbh}}</span>'
            },
            {
              text: '类别',
              // 表头筛选条件, 该值由用户操作后会将选中的值以{key: value}的形式覆盖至query参数内。非必设项
              filter: {
                // 筛选条件列表, 数组对象。格式: [{value: '1', text: 'HTML/CSS'}],在使用filter时该参数为必设项。
                option: [
                  {
                    value: '1',
                    text: '主'
                  },
                  {
                    value: '2',
                    text: '分包'
                  }
                ],
                // 筛选选中项,字符串,默认为''.非必设项,选中的过滤条件将会覆盖query
                selected: '',
                // 否为多选, 布尔值, 默认为false。非必设项
                isMultiple: false
              },
              key: 'htlb',
              width: '55px',
              align: 'center',
              // v-if="item.value === row.htlb.toString()" :selected="item.value === row.htlb.toString()"
              // 筛选功能待实现
              template: '<span>{{row.htlb}}</span>'
            },
            {
              text: '名称',
              key: 'htmc',
              width: '240px',
              align: 'center',
              template: '<span>{{row.htmc}}</span>'
            },
            {
              text: '甲方',
              key: 'jfmc',
              width: '70px',
              align: 'center',
              template: '<span>{{row.jfmc}}甲方A</span>'
            },
            {
              text: '乙方',
              key: 'yfmc',
              width: '70px',
              align: 'center',
              template: '<span>{{row.yfmc}}乙方B</span>'
            },
            {
              text: '丙方',
              key: 'bfmc',
              width: '70px',
              align: 'center',
              template: '<span>{{row.bfmc}}丙方C</span>'
            },
            {
              text: '签订日期',
              remind: '默认降序',
              key: 'qdrq',
              width: '55px',
              sorting: 'DESC',
              // 使用函数返回 htmlString
              template: function (qdrq, rowObject) {
                // return new Date(qdrq).toLocaleDateString()
                // row.qdrq
                return new Date().toLocaleDateString()
              }
            },
            {
              text: '期限',
              remind: '单位：月',
              key: 'htqx',
              width: '55px',
              align: 'center',
              template: '<span>{{row.htqx}}</span>'
            },
            {
              text: '付款方式',
              key: 'fkfs',
              width: '55px',
              align: 'center',
              template: '<span>{{row.fkfs}}</span>'
            },
            {
              text: '寿命',
              remind: '单位：年',
              key: 'sbsysm',
              width: '55px',
              align: 'center',
              template: '<span>{{row.sbsysm}}</span>'
            },
            {
              text: '设备质包款',
              remind: '单位：万元',
              key: 'sbzbk',
              width: '55px',
              align: 'center',
              template: '<span>{{row.sbzbk}}</span>'
            },
            {
              text: '设备质保期',
              remind: '单位：年',
              key: 'sbzbq',
              width: '55px',
              align: 'center',
              template: '<span>{{row.sbzbq}}</span>'
            },
            {
              text: '其他条款',
              key: 'qttk',
              width: '55px',
              align: 'center',
              // :href="'https://www.lovejavascript.com/#!zone/blog/content.html?id='+ row.id" :title="'点击阅读['+ 其他条款 +']'"
              template: '<a class="plugin-action" target="_blank" href="#" title="点击阅读">{{row.qttk}}其他条款</a>'
            },
            {
              key: 'action',
              remind: 'the action',
              align: 'center',
              width: '100px',
              text: '<span style="color: gray">操作</span>',
              // 使用@click
              template: () => {
                return '<span class="plugin-action" @click="delRow(row, index)">&nbsp;删除&nbsp;</span>' +
                  '<span class="plugin-action" @click="editRow(row, index)">&nbsp;修改&nbsp;</span>';
              }
            }],
          // 排序后事件
          sortingAfter: function (data) {
            console.log('sortAfter', data)
          }
        }
      }
    },
    components: {
      GridManager,
      Header,
      Modal
    },
    methods: {
      // 测试vue下的GM事件
      delRow: function (row, index) {
        if (window.confirm(`确认要删除当前页第[${index}]条的['${row.title}]?`)) {
          console.log('----删除操作开始----')
          this.$refs['grid'].$el.GM('refreshGrid')
          console.log('数据没变是正常的, 因为这只是个示例,并不会真实删除数据.');
          console.log('----删除操作完成----')
        }
      },
      editRow: function (row, index) {
        if (window.confirm(`确认要修改当前页第[${index}]条的['${row.title}]?`)) {
          console.log('----修改操作开始----')
          this.$refs['grid'].$el.GM('refreshGrid')
          console.log('数据没变是正常的, 因为这只是个示例,并不会真实修改数据.');
          console.log('----修改操作完成----')
        }
      },
      // 事件:搜索
      onSearch: function () {
        var params = Object.assign({
          cPage: 1
        }, this.formData)
        this.$refs['grid'].$el.GM('setQuery', params, function () {
          console.log('setQuery执行成功')
        })
      },
      // 事件:重置
      onReset: function () {
        this.formData.htmc = ''
        this.formData.htbh = ''
        this.formData.htlb = ''
      },
      // 事件:新增
      onAdd: function () {
        $('.modal-body').html('<div class="modal-body">' +
          '                    <form id="add_contract_form" class="form-horizontal bv-form" method="post" action="http://47.102.117.31:8080/bus/contract/insertContract"' +
          '                        novalidate="novalidate">' +
          '                        <div class="form-group has-feedback">' +
          '                            <label class="col-lg-3 control-label">合同编号</label>' +
          '                            <div class="col-lg-7">' +
          '                                <input type="text" class="form-control" name="htbh" placeholder="合同编号" data-bv-field="htbh">' +
          '                                <i style="display: none;" class="form-control-feedback" data-bv-icon-for="htbh"></i>' +
          '                                <small style="display: none;" class="help-block" data-bv-validator="notEmpty"' +
          '                                    data-bv-for="htbh" data-bv-result="NOT_VALIDATED">合同编号不可为空' +
          '                                </small>' +
          '                            </div>' +
          '                        </div>' +
          '                        <div class="form-group has-feedback">' +
          '                            <label class="col-lg-3 control-label">合同名称</label>' +
          '                            <div class="col-lg-7">' +
          '                                <input type="text" class="form-control" name="htmc" placeholder="合同名称" data-bv-field="htmc">' +
          '                                <i style="display: none;" class="form-control-feedback" data-bv-icon-for="htmc"></i>' +
          '                                <small style="display: none;" class="help-block" data-bv-validator="notEmpty"' +
          '                                    data-bv-for="htmc" data-bv-result="NOT_VALIDATED">合同名称不可为空' +
          '                                </small>' +
          '                            </div>' +
          '                        </div>' +
          '                        <div class="form-group has-feedback">' +
          '                            <label class="col-lg-3 control-label">合同类别</label>' +
          '                            <!-- <input type="text" class="form-control" name="htlb" placeholder="合同类别" data-bv-field="htlb"> -->' +
          '                            <div class="col-lg-4">' +
          '                                <select class="form-control" id="exampleFormControlSelect1">' +
          '                                    <option value="-1">请选择</option>' +
          '                                    <option value="1">主合同</option>' +
          '                                    <option value="0">分包合同</option>' +
          '                                </select>' +
          '                                <i style="display: none;" class="form-control-feedback" data-bv-icon-for="htlb"></i>' +
          '                                <small style="display: none;" class="help-block" data-bv-validator="notEmpty"' +
          '                                    data-bv-for="htlb" data-bv-result="NOT_VALIDATED">请选择合同类别' +
          '                                </small>' +
          '                            </div>' +
          '                        </div>' +
          '                        <div class="form-group has-feedback">' +
          '                            <label class="col-lg-3 control-label">甲方名称</label>' +
          '                            <div class="col-lg-5">' +
          '                                <input type="text" class="form-control" name="jfmc" placeholder="请输入甲方名称" data-bv-field="fmc">' +
          '                                <i style="display: none;" class="form-control-feedback" data-bv-icon-for="fmc"></i>' +
          '                                <small style="display: none;" class="help-block" data-bv-validator="notEmpty"' +
          '                                    data-bv-for="fmc" data-bv-result="NOT_VALIDATED">甲方名称不可为空' +
          '                                </small>' +
          '                                <small style="display: none;" class="help-block" data-bv-validator="stringLength"' +
          '                                    data-bv-for="fmc" data-bv-result="NOT_VALIDATED">The username must be more than 6' +
          '                                    and less than 30 characters long' +
          '                                </small>' +
          '                                <small style="display: none;" class="help-block" data-bv-validator="regexp" data-bv-for="fmc"' +
          '                                    data-bv-result="NOT_VALIDATED">The username can only consist of alphabetical,' +
          '                                    number, dot and' +
          '                                    underscore' +
          '                                </small>' +
          '                                <small style="display: none;" class="help-block" data-bv-validator="remote" data-bv-for="fmc"' +
          '                                    data-bv-result="NOT_VALIDATED">The username is not available' +
          '                                </small>' +
          '                                <small style="display: none;" class="help-block" data-bv-validator="different"' +
          '                                    data-bv-for="fmc" data-bv-result="NOT_VALIDATED">The username and password cannot' +
          '                                    be the same as each other' +
          '                                </small>' +
          '                            </div>' +
          '                        </div>' +
          '                        <div class="form-group has-feedback">' +
          '                            <label class="col-lg-3 control-label">乙方名称</label>' +
          '                            <div class="col-lg-5">' +
          '                                <input type="text" class="form-control" name="yfmc" placeholder="请输入乙方名称" data-bv-field="fmc">' +
          '                                <i style="display: none;" class="form-control-feedback" data-bv-icon-for="fmc"></i>' +
          '                                <small style="display: none;" class="help-block" data-bv-validator="notEmpty"' +
          '                                    data-bv-for="fmc" data-bv-result="NOT_VALIDATED">The username is required and' +
          '                                    cannot be empty' +
          '                                </small>' +
          '                                <small style="display: none;" class="help-block" data-bv-validator="stringLength"' +
          '                                    data-bv-for="fmc" data-bv-result="NOT_VALIDATED">The username must be more than 6' +
          '                                    and less than 30 characters long' +
          '                                </small>' +
          '                                <small style="display: none;" class="help-block" data-bv-validator="regexp" data-bv-for="fmc"' +
          '                                    data-bv-result="NOT_VALIDATED">The username can only consist of alphabetical,' +
          '                                    number, dot and' +
          '                                    underscore' +
          '                                </small>' +
          '                                <small style="display: none;" class="help-block" data-bv-validator="remote" data-bv-for="fmc"' +
          '                                    data-bv-result="NOT_VALIDATED">The username is not available' +
          '                                </small>' +
          '                                <small style="display: none;" class="help-block" data-bv-validator="different"' +
          '                                    data-bv-for="fmc" data-bv-result="NOT_VALIDATED">The username and password cannot' +
          '                                    be the same as each other' +
          '                                </small>' +
          '                            </div>' +
          '                        </div>' +
          '                        <div class="form-group has-feedback">' +
          '                            <label class="col-lg-3 control-label">丙方名称</label>' +
          '                            <div class="col-lg-5">' +
          '                                <input type="text" class="form-control" name="bfmc" placeholder="请输入丙方名称" data-bv-field="fmc">' +
          '                                <i style="display: none;" class="form-control-feedback" data-bv-icon-for="fmc"></i>' +
          '                                <small style="display: none;" class="help-block" data-bv-validator="notEmpty"' +
          '                                    data-bv-for="fmc" data-bv-result="NOT_VALIDATED">The username is required and' +
          '                                    cannot be empty' +
          '                                </small>' +
          '                                <small style="display: none;" class="help-block" data-bv-validator="stringLength"' +
          '                                    data-bv-for="fmc" data-bv-result="NOT_VALIDATED">The username must be more than 6' +
          '                                    and less than 30 characters long' +
          '                                </small>' +
          '                                <small style="display: none;" class="help-block" data-bv-validator="regexp" data-bv-for="fmc"' +
          '                                    data-bv-result="NOT_VALIDATED">The username can only consist of alphabetical,' +
          '                                    number, dot and' +
          '                                    underscore' +
          '                                </small>' +
          '                                <small style="display: none;" class="help-block" data-bv-validator="remote" data-bv-for="fmc"' +
          '                                    data-bv-result="NOT_VALIDATED">The username is not available' +
          '                                </small>' +
          '                                <small style="display: none;" class="help-block" data-bv-validator="different"' +
          '                                    data-bv-for="fmc" data-bv-result="NOT_VALIDATED">The username and password cannot' +
          '                                    be the same as each other' +
          '                                </small>' +
          '                            </div>' +
          '                        </div>' +
          '                        <div class="form-group has-feedback">' +
          '                            <label class="col-lg-3 control-label">签订日期</label>' +
          '                            <div class="col-lg-5">' +
          '                                <input type="text" class="form-control" name="qdrq" placeholder="请输入合同签订日期"' +
          '                                    data-bv-field="qdrq">' +
          '                                <i style="display: none;" class="form-control-feedback" data-bv-icon-for="qdrq"></i>' +
          '                                YYYY-MM-DD，例如2019-01-24' +
          '                                <small style="display: none;" class="help-block" data-bv-validator="date" data-bv-for="qdrq"' +
          '                                    data-bv-result="NOT_VALIDATED">签订日期输入错误，请重新输入' +
          '                                </small>' +
          '                            </div>' +
          '                        </div>' +
          '                        <div class="form-group has-feedback">' +
          '                            <label class="col-lg-3 control-label">合同期限</label>' +
          '                            <div class="col-lg-5">' +
          '                                <input type="text" class="form-control" name="htqx" placeholder="请输入合同期限" data-bv-field="htqx">' +
          '                                <i style="display: none;" class="form-control-feedback" data-bv-icon-for="htqx"></i>' +
          '                                单位：年' +
          '                                <small style="display: none;" class="help-block" data-bv-validator="date" data-bv-for="htqx"' +
          '                                    data-bv-result="NOT_VALIDATED">' +
          '                                </small>' +
          '                            </div>' +
          '                        </div>' +
          '                        <div class="form-group has-feedback">' +
          '                            <label class="col-lg-3 control-label">付款方式</label>' +
          '                            <div class="col-lg-5">' +
          '                                <div class="radio">' +
          '                                    <label>' +
          '                                        <input type="radio" name="fkfs" value="0" data-bv-field="fkfs">支付宝' +
          '                                    </label>' +
          '                                </div>' +
          '                                <div class="radio">' +
          '                                    <label>' +
          '                                        <input type="radio" name="fkfs" value="1" data-bv-field="fkfs">微信' +
          '                                    </label>' +
          '                                </div>' +
          '                                <div class="radio">' +
          '                                    <label>' +
          '                                        <input type="radio" name="fkfs" value="2" data-bv-field="fkfs">银行卡' +
          '                                    </label>' +
          '                                    <i style="display: none;" class="form-control-feedback" data-bv-icon-for="fkfs"></i>' +
          '                                </div>' +
          '                                <small style="display: none;" class="help-block" data-bv-validator="notEmpty"' +
          '                                    data-bv-for="fkfs" data-bv-result="NOT_VALIDATED">请选择付款方式' +
          '                                </small>' +
          '                            </div>' +
          '                        </div>' +
          '                        <div class="form-group has-feedback">' +
          '                            <label class="col-lg-3 control-label">设备使用寿命</label>' +
          '                            <div class="col-lg-5">' +
          '                                <input type="text" class="form-control" name="sbsysm" placeholder="请输入合同期限"' +
          '                                    data-bv-field="sbsysm">' +
          '                                <i style="display: none;" class="form-control-feedback" data-bv-icon-for="sbsysm"></i>' +
          '                                单位：年' +
          '                                <small style="display: none;" class="help-block" data-bv-validator="date" data-bv-for="sbsysm"' +
          '                                    data-bv-result="NOT_VALIDATED">' +
          '                                </small>' +
          '                            </div>' +
          '                        </div>' +
          '                        <div class="form-group has-feedback">' +
          '                            <label class="col-lg-3 control-label">设备质包款</label>' +
          '                            <div class="col-lg-5">' +
          '                                <input type="text" class="form-control" name="sbzbk" placeholder="请输入设备质包款"' +
          '                                    data-bv-field="sbzbk">' +
          '                                <i style="display: none;" class="form-control-feedback" data-bv-icon-for="sbzbk"></i>' +
          '                                单位：万元' +
          '                                <small style="display: none;" class="help-block" data-bv-validator="date" data-bv-for="sbzbk"' +
          '                                    data-bv-result="NOT_VALIDATED">' +
          '                                </small>' +
          '                            </div>' +
          '                        </div>' +
          '                        <div class="form-group has-feedback">' +
          '                            <label class="col-lg-3 control-label">设备质保期</label>' +
          '                            <div class="col-lg-5">' +
          '                                <input type="text" class="form-control" name="sbzbq" placeholder="请输入设备质包款"' +
          '                                    data-bv-field="sbzbq">' +
          '                                <i style="display: none;" class="form-control-feedback" data-bv-icon-for="sbzbq"></i>' +
          '                                单位：月' +
          '                                <small style="display: none;" class="help-block" data-bv-validator="date" data-bv-for="sbzbq"' +
          '                                    data-bv-result="NOT_VALIDATED">' +
          '                                </small>' +
          '                            </div>' +
          '                        </div>' +
          '                        <div>' +
          '                            <br>' +
          '                        </div>' +
          '                    </form>' +
          '                </div>')
        $('#modal_addContract').modal()
        console.log('----新增操作开始----')
      },
      check_form: function () {
        console.log('表单检查函数')
      },
      submit_data: function () {
        console.log('模态框确定时间 应在此时检查表单输入规范')
        // 如果输入规范 addContract接口提交数据 若提交成功关闭模态
        $('#modal_addContract').modal('toggle')
        // 如果输入不规范 validator检查并重新填写 调用check_form()
      },
      // 事件: 初始化
      onInit: function () {
        this.$refs['grid'].$el.GM('init', this.option);
      },
      // 事件: 销毁
      onDestroy: function () {
        this.$refs['grid'].$el.GM('destroy')
      }
    },
    beforeDestroy() {
      this.onDestroy()
    }
  }
</script>

<style lang="less" scoped>
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
