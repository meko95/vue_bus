<template>
  <div>
    <Header></Header>
    <div id="title">
      站点通基本信息
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
  import Header from '../Header'
  import GridManager from '../GridManager'
  import Modal from '../Modal'

  const getZdtBasicInfo = function (params) {
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
        // 服务器返回参数中无sblb这项
        formData += key + '=' + params[key]
      }
      console.log('xhr.send()参数formData符合参数规则为')
      console.log(formData) // test=22&type=3&cPage=1&pSize=30&sort_createDate=DESC
      xhr.send(formData)
    })
  }
  export default {
    name: "ZdtBasicInfo",
    data() {
      return {
        info: ' ',
        formData: {
          sblb: this.$store.getters.getSblb
        },
        DEVICE_LIST: this.$store.getters.getAllDeviceTypes,
        callback: function (query) {
          console.log('callback => ', query)
        },
        option: {
          supportRemind: true,
          gridManagerName: 'ZdtBasicInfo',
          height: '572px',
          supportAjaxPage: true,
          supportSorting: true,
          isCombSorting: false,
          ajax_data: (settings, params) => {
            console.log('ajax_data请求时带的参数为')
            console.log(params)
            return getZdtBasicInfo(params)
          },
          ajax_type: 'POST',
          supportMenu: true,
          query: {
            sblb: ''
          },
          dataKey: 'rowsList',
          totalsKey: 'total',
          pageSize: 30,
          columnData: [
            {
              text: '站点通编号',
              key: 'sbzbh',
              width: '5px',
              align: 'center',
              template: '<span>123456789012</span>'
            },
            {
              text: '分片编号',
              key: 'fpbh',
              width: '76px',
              align: 'center',
              template: '<span>00001</span>'
            },
            {
              text: '合同编号',
              key: 'rfidhtbh',
              width: '96px',
              align: 'center',
              template: '<span>0123456789</span>'
            },
            {
              text: '管理等级',
              key: 'gldj',
              width: '3px',
              align: 'center',
              template: '<span>A</span>'
            },
            {
              text: '设备品牌',
              key: 'sbpp',
              width: '3px',
              align: 'center',
              template: '<span>大索尼</span>'
            },
            {
              text: '设备型号',
              key: 'sbxh',
              width: '110px',
              align: 'center',
              template: '<span>Z-SO31-4105</span>'
            },
            {
              text: 'SIM卡号',
              key: 'simkh',
              width: '5px',
              align: 'center',
              template: '<span>12345678901234567890</span>'
            },
            {
              text: '线路',
              key: 'ycyjdyxl',
              width: '110px',
              align: 'center',
              template: '<span>1001;上南路;B支4</span>'
            },
            {
              text: '站点',
              key: 'ycyjzd',
              width: '80px',
              align: 'center',
              template: '<span>上南路站</span>'
            },
            {
              text: '归属集团',
              remind: '点击可查看设备归属集团详细信息',
              key: 'sbgsjt',
              width: '110px',
              align: 'center',
              // 重点 集团=>公司=>车队=>线路
              template: '<router-link to="/bus/basicdata/getDeviceComInfo">设备集团名称A</router-link>'
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
        const device_type = parseInt(this.$store.getters.getSblb)
        if(device_type===7){
          this.$refs['grid'].$el.GM('refreshGrid')
          return
        }
        console.log(device_type)
        switch (device_type) {
          case 1:
            this.$router.push('/bus/basicdata/getRfid4gBasicInfo')
            break
          case 2:
            this.$router.push('/bus/basicdata/getRfid4gczBasicInfo')
            break
          case 3:
            this.$router.push('/bus/basicdata/getClbqBasicInfo')
            break
          case 4:
            this.$router.push('/bus/basicdata/getCzytjBasicInfo')
            break
          case 5:
            this.$router.push('/bus/basicdata/getBdjBasicInfo')
            break
          case 6:
            this.$router.push('/bus/basicdata/getYcyjBasicInfo')
            break
          case 7:
            this.$router.push('/bus/basicdata/getZdtBasicInfo')
            break
          case 8:
            this.$router.push('/bus/basicdata/getFfcpBasicInfo')
            break
          case 9:
            this.$router.push('/bus/basicdata/getZgybpBasicInfo')
            break
          default:
            console.log('Alert("请先选择设备类别")')
        }
      },
      onReset: function () {
        this.formData.sblb = ''
      },
      onAdd: function () {

      },
      onInit() {
        this.$refs['grid'].$el.GM('init', this.option)
      },
      onDestroy: function () {
        this.$refs['grid'].$el.GM('destroy')
      },
      delRow(row, index) {
        console.log('删除事件')
      },
      editRow(row, index) {
        console.log('修改事件')
      }
    },
    beforeUpdate() {
      this.$store.commit('setSblb', this.formData.sblb)
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
