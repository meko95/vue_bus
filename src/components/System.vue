<template>
  <div>
    <Header></Header>
    <div id="title">
      系统管理
    </div>
    <section class="search-area">
      <div class="sa-ele">
        <label class="se-title">运营公司:</label>
        <input class="se-con" v-model="formData.yygs"/>
      </div>
      <div class="sa-ele">
        <label class="se-title">车队:</label>
        <input class="se-con" v-model="formData.cd"/>
      </div>
      <div class="sa-ele">
        <label class="se-title">职工卡号:</label>
        <input class="se-con" v-model="formData.zgkh"/>
      </div>
      <div class="sa-ele">
        <label class="se-title">职工姓名:</label>
        <input class="se-con" v-model="formData.zgxm"/>
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
  </div>
</template>

<script>
  import Header from '@/components/Header'
  import GridManager from '@/components/GridManager'
  import Modal from '@/components/Modal'

  const getSystemInfo = function (params) {
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
    name: "System",
    data() {
      return {
        // 模态框body嵌入表单
        info: ' ',
        // 表单数据
        formData: {
          yygs:'',
          cd:'',
          zgkh:'',
          zgxm:''
        },
        // 表格渲染回调函数
        // query为gmOptions中配置的query
        callback: function (query) {
          console.log('callback => ', query)
        },
        option: {
          supportRemind: true,
          gridManagerName: 'System',
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
            return getSystemInfo(params)
          },
          ajax_type: 'POST',
          supportMenu: true,
          query: {
            // url查询时传的参数
            yygs: '',
            cd: '',
            zgkh: '',
            zgxm:''
          },
          // 绑定服务器返回数据的key值
          dataKey: 'rowsList',
          totalsKey: 'total',
          pageSize: 30,
          columnData: [
            {
              text:'营运公司',
              key:'yygs',
              width:'70px',
              align:'center',
              template:'<span>交投信科</span>'
            },
            {
              text:'车队',
              key:'cd',
              width:'90px',
              align:'center',
              template:'<span>投信科本部</span>'
            },
            {
              text:'线路',
              key:'xl',
              width:'130px',
              align:'center',
              template:'<span>投信科本部研发部</span>'
            },
            {
              text:'职工姓名',
              key:'zgxm',
              width:'70px',
              align:'center',
              template:'<span>鹧鸪哨</span>'
            },
            {
              text:'卡号',
              key:'zgkh',
              width:'90px',
              align:'center',
              template:'<span>010030114</span>'
            },
            {
              text:'性别',
              key:'zgxb',
              width:'50px',
              align:'center',
              template:'<span>男</span>'
            },
            {
              text:'出生日期',
              key:'zgcsrq',
              width:'90px',
              align:'center',
              template:'<span>12/10/1974</span>'
            },
            {
              text:'民族',
              key:'zgmz',
              width:'50px',
              align:'center',
              template:'<span>汉</span>'
            },
            {
              text:'到本单位时间',
              key:'dbdwsj',
              width:'90px',
              align:'center',
              template:'<span>6/11/2019</span>'
            },
            {
              text:'转正时间',
              key:'zzsj',
              width:'90px',
              align:'center',
              template:'<span>10/9/2019</span>'
            },
            {
              text:'家庭住址',
              key:'zgjtzz',
              width:'360px',
              align:'center',
              template:'<span>上海市杨浦区军工路516号上海理工大学计算中心607</span>'
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
            }
          ]
        }
      }
    },
    components: {
      Header,
      GridManager,
      Modal
    },
    methods: {
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
