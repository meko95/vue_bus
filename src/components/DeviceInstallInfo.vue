<template>
  <div>
    <Header></Header>
    <div id="title">
      设备安装信息
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
    <Modal modal-id="modal_addDeviceInstallInfo" modal-title="输入新增设备信息：" :modal-body="info" footer-btn-left="确定提交"
           @l_func="submit_data"
           btn-left-color="btn btn-success" footer-btn-right="重新填写" btn-right-color="btn btn-default"></Modal>
  </div>
</template>

<script>
  import GridManager from '@/components/GridManager'
  import Header from '@/components/Header'
  import Modal from '../components/Modal'

  const getDeviceInstallInfo = function (params) {
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
    name: "DeviceInstallInfo",
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
          gridManagerName: 'DeviceInstallInfo',
          height: '572px',
          supportAjaxPage: true,
          supportSorting: true,
          isCombSorting: false,
          disableCache: false,
          ajax_data: (settings, params) => {
            console.log('ajax_data请求时带的参数为')
            console.log(params)
            return getDeviceInstallInfo(params)
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
          columnData: [
            {
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
              text: '安装地点',
              key: 'sbazdd',
              width: '120px',
              align: 'center',
              template: '<span>世界路新江湾城</span>'
            }, {
              text: '安装照片',
              key: 'azzp',
              width: '150px',
              align: 'center',
              // 重点 {{row.azzp}}
              template: '<span>照片</span>'
            }, {
              text: '行政区域',
              remind:'所属行政区域',
              key: 'ssxzqy',
              width: '80px',
              align: 'center',
              template: '<span>杨浦区</span>'
            }, {
              text: '站点名称',
              key: 'zdmc',
              width: '100px',
              align: 'center',
              template: '<span>南浦大桥站</span>'
            }, {
              text: '基站编号',
              key: 'jzbh',
              width: '240px',
              align: 'center',
              template: '<span>041073;045001;046031;045869;</span>'
            },
            {
              text: '设备条码编号',
              key: 'tmbh',
              width: '100px',
              align: 'center',
              template: '<span>0123456789</span>'
            }, {
              text: '设备二维码编号',
              key: 'ewmbh',
              width: '140px',
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
      submit_data: function () {
        console.log('模态框确定时间 应在此时检查表单输入规范')
        // 首先validator检查 调用check_form()
        // 如果输入规范 addContract接口提交数据 若提交成功关闭模态
        $('#modal_addContract').modal('toggle')
        // 如果输入不规范 validator自会处理
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
