<template>
  <div>
    <ElementHeader></ElementHeader>
    <el-container style="height: 701px; border: 1px solid #eee">
      <el-container>
        <el-header>
          <!-- 标题 Begin -->
          <div id="title">
            <span>一程一检故障统计</span>
          </div>
        </el-header>
        <el-main>
          <div id="charts"></div>
          <div id="charts1"></div>
          <div id="charts2"></div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import ElementHeader from '../../components/Header'
  import echarts from 'echarts'

  export default {
    name: "YcyjBreakInfo",
    data() {
      return {
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
        }]
      }
    },
    components: {
      ElementHeader
    },
    methods: {

    },
    mounted() {
      function my_data() {
        var data = [];
        for (var i = 0; i < 30; i++) {
          data.push(Math.round(Math.random() * (500 - 100) + 100));
        }
        ;
        return data;
      }
      var date = ['2016/11/1', '2016/11/2', '2016/11/3', '2016/11/4', '2016/11/5', '2016/11/6', '2016/11/7', '2016/11/8', '2016/11/9', '2016/11/10',
        '2016/11/11', '2016/11/12', '2016/11/13', '2016/11/14', '2016/11/15', '2016/11/16', '2016/11/17', '2016/11/18'
        , '2016/11/19', '2016/11/20', '2016/11/21', '2016/11/22', '2016/11/23', '2016/11/24', '2016/11/25', '2016/11/26', '2016/11/27'
        , '2016/11/28', '2016/11/29', '2016/11/30'];
      const myChart = echarts.init(document.getElementById('charts'))
      const option = {
        color: ['#c12e34', '#e6b600', '#0098d9', '#2b821d','#005eaa','#fc97af'],
        title: {
          text: '不上线故障发生次数'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          type: 'scroll',
          orient: 'horizontal',
          left:0,
          top: 25,
          bottom: 20,
          data: ['设备故障', '天线断', 'SIM卡欠费', '其他']
        },
        toolbox: {
          show: true,
          feature: {
            mark: {show: true},
            magicType: {show: true, type: ['tiled']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            data: date
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        grid: {
          left: '3%',
          right: '4%',
          containLabel: true
        },
        dataZoom: [{
          type: 'inside',
          start: 74,
          end: 100,
        }, {
          start: 74,
          end: 100,
          handleSize: '80%',
          handleStyle: {
            color: '#fff',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        }],
        series: [
          {
            name: '设备故障',
            type: 'bar',
            stack: '总量',
            barMaxWidth: 39,
            data: my_data()
          },
          {
            name: '天线断',
            type: 'bar',
            stack: '总量',
            barMaxWidth: 39,
            data: my_data()
          },
          {
            name: 'SIM卡欠费',
            type: 'bar',
            stack: '总量',
            barMaxWidth: 39,
            data: my_data()
          },
          {
            name: '其他',
            type: 'bar',
            stack: '总量',
            barMaxWidth: 39,
            data: my_data()
          }
        ]
      }
      myChart.setOption(option)
      var myChart1 = echarts.init(document.getElementById('charts1'))
      var option1 = {
        color: ['#c12e34', '#e6b600', '#0098d9', '#2b821d','#005eaa','#fc97af','#eb8146','#8c6ac4','#32a487'],
        title: {
          text: '巴士通（GPS）故障发生次数'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          type: 'scroll',
          orient: 'horizontal',
          left:0,
          top: 25,
          bottom: 20,
          data: ['漂移', '不报站', '电子路单不生成或出错', '不推送车号和时间', '不切换路线', '走字屏不显示或显示错误', '不显示班次', '无法签到签退']
        },
        toolbox: {
          show: true,
          feature: {
            mark: {show: true},
            magicType: {show: true, type: ['tiled']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            data: date
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        grid: {
          left: '3%',
          right: '4%',
          containLabel: true
        },
        dataZoom: [{
          type: 'inside',
          start: 74,
          end: 100,
        }, {
          start: 74,
          end: 100,
          handleSize: '80%',
          handleStyle: {
            color: '#fff',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        }],
        series: [
          {
            name: '漂移',
            type: 'bar',
            stack: '总量',
            barMaxWidth: 39,
            data: my_data()
          },
          {
            name: '不报站',
            type: 'bar',
            stack: '总量',
            barMaxWidth: 39,
            data: my_data()
          },
          {
            name: '电子路单不生成或出错',
            type: 'bar',
            stack: '总量',
            barMaxWidth: 39,
            data: my_data()
          },
          {
            name: '超级VIP会员',
            type: 'bar',
            stack: '总量',
            barMaxWidth: 39,
            data: my_data()
          },
          {
            name: '不推送车号和时间',
            type: 'bar',
            stack: '总量',
            barMaxWidth: 39,
            data: my_data()
          },{
            name: '不切换路线',
            type: 'bar',
            stack: '总量',
            barMaxWidth: 39,
            data: my_data()
          },{
            name: '走字屏不显示或显示错误',
            type: 'bar',
            stack: '总量',
            barMaxWidth: 39,
            data: my_data()
          },
          {
            name: '不显示班次',
            type: 'bar',
            stack: '总量',
            barMaxWidth: 39,
            data: my_data()
          },{
            name: '无法签到签退',
            type: 'bar',
            stack: '总量',
            barMaxWidth: 39,
            data: my_data()
          }
        ]
      }
      myChart1.setOption(option1)
      var myChart2 = echarts.init(document.getElementById('charts2'))
      var option2 = {
        color: ['#c12e34', '#e6b600', '#0098d9', '#2b821d','#005eaa','#fc97af'],
        title: {
          text: '流媒体（DVR）故障发生次数'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          type: 'scroll',
          orient: 'horizontal',
          left:0,
          top: 25,
          bottom: 20,
          data: ['无图像', '导不出录像', '倒车视屏故障', '其他']
        },
        toolbox: {
          show: true,
          feature: {
            mark: {show: true},
            magicType: {show: true, type: [ 'tiled']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            data: date
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        grid: {
          left: '3%',
          right: '4%',
          containLabel: true
        },
        dataZoom: [{
          type: 'inside',
          start: 74,
          end: 100,
        }, {
          start: 74,
          end: 100,
          handleSize: '80%',
          handleStyle: {
            color: '#fff',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        }],
        series: [
          {
            name: '无图像',
            type: 'bar',
            stack: '总量',
            barMaxWidth: 39,
            data: my_data()
          },
          {
            name: '导不出录像',
            type: 'bar',
            stack: '总量',
            barMaxWidth: 39,
            data: my_data()
          },
          {
            name: '倒车视屏故障',
            type: 'bar',
            stack: '总量',
            barMaxWidth: 39,
            data: my_data()
          },
          {
            name: '其他',
            type: 'bar',
            stack: '总量',
            barMaxWidth: 39,
            data: my_data()
          }
        ]
      }
      myChart2.setOption(option2)
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  #title {
    background-color: #eef1f6;
    text-align: center;
    font-size: 26px;
    height: 60px;
    line-height: 60px;
  }

  #charts,#charts1,#charts2 {
    height: 636px;
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
