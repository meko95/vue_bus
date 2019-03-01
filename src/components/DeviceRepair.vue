<template>
  <div>
    <Header></Header>
    <div id="title">
      报修信息
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
  </div>
</template>

<script>
  import Header from '@/components/Header'
  import GridManager from '@/components/GridManager'

  const getDeviceRepair = function (params) {
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
    name: "DeviceRepair",
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
          gridManagerName: 'DeviceInspect',
          height: '572px',
          supportAjaxPage: true,
          supportSorting: true,
          isCombSorting: false,
          disableCache: false,
          ajax_data: (settings, params) => {
            console.log('ajax_data请求时带的参数为')
            console.log(params)
            return getDeviceRepair(params)
          },
          ajax_type: 'POST',
          supportMenu: true,
          query: {
            htlb: ''
          },
          // 绑定服务器返回数据的key值
          dataKey: 'rowsList',
          // 绑定服务器返回数据总条数
          totalsKey: 'total',
          pageSize: 30,
          columnData: [
            {
              text: '报修单号',
              key: 'sbbxdh',
              width: '113px',
              align: 'center',
              template: '<span>012345678912</span>'
            },
            {
              text: '设备编号',
              key: 'sbjyh',
              width: '190px',
              align: 'center',
              template: '<span>01234567890123456789123</span>'
            },
            {
              text: '报修时间',
              key: 'sbbxsj',
              width: '124px',
              align: 'center',
              template: '<span>11/11/2011 11:11</span>'
            },
            {
              text: '条形码',
              remind: '设备条形码',
              key: 'sbtxm',
              width: '100px',
              align: 'center',
              template: '<span>0123456789</span>'
            },
            {
              text: '二维码',
              key: '设备二维码',
              width: '100px',
              align: 'center',
              template: '<span>0123456789</span>'
            },
            {
              text: '报修工号',
              remind: '报修员工工号',
              key: 'bxyggh',
              width: '70px',
              align: 'center',
              template: '<span>00001</span>'
            },
            {
              text: '报修人',
              key: 'bxygxm',
              width: '70px',
              align: 'center',
              template: '<span>胡八一</span>'
            },
            {
              text: '部门主管',
              key: 'bmzgmc',
              width: '70px',
              align: 'center',
              template: '<span>王胖子</span>'
            },
            {
              text: '维修工号',
              remind: '拟维修人员工号',
              key: 'nwxrygh',
              width: '70px',
              align: 'center',
              template: '<span>00002</span>'
            },
            {
              text: '维修人',
              key: '拟维修人员姓名',
              width: '70px',
              align: 'center',
              template: '<span>鹧鸪哨</span>'
            },
            {
              text: '报修内容',
              key: 'bxnr',
              width: '90px',
              align: 'center',
              template: '<span>市井无电</span>'
            },
            {
              text: '报修类型',
              key: 'sbbxlx',
              width: '70px',
              align: 'center',
              template: '<span>人工报修</span>'
            },
            {
              text: '报修方式',
              key: 'sbbxfs',
              width: '70px',
              align: 'center',
              template: '<span>微信报修</span>'
            },
            {
              text: '供应商',
              key: 'sbgys',
              width: '70px',
              align: 'center',
              template: '<span>华为</span>'
            },
            {
              text: '集成商',
              key: 'sbjcs',
              width: '70px',
              align: 'center',
              template: '<span>三星</span>'
            }
          ]
        }
      }
    },
    components: {
      Header,
      GridManager
    },
    methods: {
      onSearch: function () {

      },
      onReset: function () {
        this.formData.htlb = ''
      },
      onAdd: function () {

      },
      check_form: function () {
        console.log('表单检查函数')
      },
      onReset: function () {

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
