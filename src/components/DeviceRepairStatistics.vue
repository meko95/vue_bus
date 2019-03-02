<template>
  <div>
    <Header></Header>
    <div id="title">
      设备报修次数统计
    </div>
    <div id="rfid4g"></div>
    <div id="clbq"></div>
    <div id="rfid4gcz"></div>
    <div id="czytj"></div>
    <div id="fcybp"></div>
    <div id="zgybp"></div>
    <div id="bdj"></div>
    <div id="ycyj"></div>
    <div id="zdt"></div>
  </div>
</template>

<script>
  import Header from '@/components/Header'
  import echarts from 'echarts'

  export default {
    name: "DeviceRepairStatistics",
    data() {
      return {}
    },
    components: {
      Header
    },
    methods: {},
    mounted() {
      function my_data() {
        var data = [];
        for (var i = 0; i < 30; i++) {
          data.push(Math.round(Math.random() * (500 - 100) + 100));
        }
        return data;
      }

      const data = ['2016/11/1', '2016/11/2', '2016/11/3', '2016/11/4', '2016/11/5', '2016/11/6', '2016/11/7', '2016/11/8', '2016/11/9', '2016/11/10',
        '2016/11/11', '2016/11/12', '2016/11/13', '2016/11/14', '2016/11/15', '2016/11/16', '2016/11/17', '2016/11/18'
        , '2016/11/19', '2016/11/20', '2016/11/21', '2016/11/22', '2016/11/23', '2016/11/24', '2016/11/25', '2016/11/26', '2016/11/27'
        , '2016/11/28', '2016/11/29', '2016/11/30']
      const rfid4gChart = echarts.init(document.getElementById('rfid4g'))
      const clbqChart = echarts.init(document.getElementById('clbq'))
      const rfid4gczChart = echarts.init(document.getElementById('rfid4gcz'))
      const czytjChart = echarts.init(document.getElementById('czytj'))
      const fcybpChart = echarts.init(document.getElementById('fcybp'))
      const zgybpChart = echarts.init(document.getElementById('zgybp'))
      const bdjChart = echarts.init(document.getElementById('bdj'))
      const ycyjChart = echarts.init(document.getElementById('ycyj'))
      const zdtChart = echarts.init(document.getElementById('zdt'))
      const rfid4gOption = {
        title: {
          text: 'RFID4G',
          textStyle: {
            fontSize: 22
          }
        },
        color: ['#c12e34', '#e6b600', '#0098d9', '#2b821d', '#005eaa', '#fc97af'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          type: 'scroll',
          orient: 'horizontal',
          left: 43,
          top: 23,
          bottom: 20,
          data: ['系统预警', '平台报修', '微信报修', 'QQ报修', '电话报修', '其他']
        },
        grid: {
          left: '3%',
          right: '4%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            data: data
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        toolbox: {
          show: true,
          right: 53,
          top: 20,
          feature: {
            mark: {show: true},
            magicType: {show: true, type: ['tiled']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        calculable: true,
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
            name: '系统预警',
            type: 'bar',
            barMaxWidth: 40,
            stack: 'RFID4G',
            data: my_data()
          },
          {
            name: '平台报修',
            type: 'bar',
            stack: 'RFID4G',
            data: my_data()
          },
          {
            name: '微信报修',
            type: 'bar',
            stack: 'RFID4G',
            data: my_data()
          },
          {
            name: 'QQ报修',
            type: 'bar',
            stack: 'RFID4G',
            data: my_data()
          },
          {
            name: '电话报修',
            type: 'bar',
            stack: 'RFID4G',
            data: my_data()
          },
          {
            name: '其他',
            type: 'bar',
            stack: 'RFID4G',
            data: my_data()
          }
        ]
      }
      const clbqChartOption = {
        title: {
          text: '车辆标签',
          textStyle: {
            fontSize: 22
          }
        },
        color: ['#c12e34', '#e6b600', '#0098d9', '#2b821d', '#005eaa', '#fc97af'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          type: 'scroll',
          orient: 'horizontal',
          left: 43,
          top: 25,
          bottom: 20,
          data: ['系统预警', '平台报修', '微信报修', 'QQ报修', '电话报修', '其他']
        },
        grid: {
          left: '3%',
          right: '4%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            data: data
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        toolbox: {
          show: true,
          right: 53,
          top: 20,
          feature: {
            mark: {show: true},
            magicType: {show: true, type: ['tiled']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        calculable: true,
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
        series: [{
          name: '系统预警',
          type: 'bar',
          barMaxWidth: 40,
          stack: '车辆标签',
          data: my_data()
        },
          {
            name: '平台报修',
            type: 'bar',
            stack: '车辆标签',
            data: my_data()
          },
          {
            name: '微信报修',
            type: 'bar',
            stack: '车辆标签',
            data: my_data()
          },
          {
            name: 'QQ报修',
            type: 'bar',
            stack: '车辆标签',
            data: my_data()
          },
          {
            name: '电话报修',
            type: 'bar',
            stack: '车辆标签',
            data: my_data()
          },
          {
            name: '其他',
            type: 'bar',
            stack: '车辆标签',
            data: my_data()
          }]
      }
      const rfid4gczChartOption = {
        title: {
          text: 'RFID4G（场站）',
          textStyle: {
            fontSize: 22
          }
        },
        color: ['#c12e34', '#e6b600', '#0098d9', '#2b821d', '#005eaa', '#fc97af'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          type: 'scroll',
          orient: 'horizontal',
          left: 43,
          top: 23,
          bottom: 20,
          data: ['系统预警', '平台报修', '微信报修', 'QQ报修', '电话报修', '其他']
        },
        grid: {
          left: '3%',
          right: '4%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            data: data
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        toolbox: {
          show: true,
          right: 53,
          top: 20,
          feature: {
            mark: {show: true},
            magicType: {show: true, type: ['tiled']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        calculable: true,
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
        series: [{
          name: '系统预警',
          type: 'bar',
          barMaxWidth: 40,
          stack: 'RFID4G（场站）',
          data: my_data()
        },
          {
            name: '平台报修',
            type: 'bar',
            stack: 'RFID4G（场站）',
            data: my_data()
          },
          {
            name: '微信报修',
            type: 'bar',
            stack: 'RFID4G（场站）',
            data: my_data()
          },
          {
            name: 'QQ报修',
            type: 'bar',
            stack: 'RFID4G（场站）',
            data: my_data()
          },
          {
            name: '电话报修',
            type: 'bar',
            stack: 'RFID4G（场站）',
            data: my_data()
          },
          {
            name: '其他',
            type: 'bar',
            stack: 'RFID4G（场站）',
            data: my_data()
          }]
      }
      const czytjChartOption = {
        title: {
          text: '车载一体机',
          textStyle: {
            fontSize: 22
          }
        },
        color: ['#c12e34', '#e6b600', '#0098d9', '#2b821d', '#005eaa', '#fc97af'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          type: 'scroll',
          orient: 'horizontal',
          left: 43,
          top: 25,
          bottom: 20,
          data: ['系统预警', '平台报修', '微信报修', 'QQ报修', '电话报修', '其他']
        },
        grid: {
          left: '3%',
          right: '4%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            data: data
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        toolbox: {
          show: true,
          right: 53,
          top: 20,
          feature: {
            mark: {show: true},
            magicType: {show: true, type: ['tiled']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        calculable: true,
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
        series: [{
          name: '系统预警',
          type: 'bar',
          barMaxWidth: 40,
          stack: '车载一体机',
          data: my_data()
        },
          {
            name: '平台报修',
            type: 'bar',
            stack: '车载一体机',
            data: my_data()
          },
          {
            name: '微信报修',
            type: 'bar',
            stack: '车载一体机',
            data: my_data()
          },
          {
            name: 'QQ报修',
            type: 'bar',
            stack: '车载一体机',
            data: my_data()
          },
          {
            name: '电话报修',
            type: 'bar',
            stack: '车载一体机',
            data: my_data()
          },
          {
            name: '其他',
            type: 'bar',
            stack: '车载一体机',
            data: my_data()
          }]
      }
      const fcybpChartOption = {
        title: {
          text: '55寸预报屏',
          textStyle: {
            fontSize: 22
          }
        },
        color: ['#c12e34', '#e6b600', '#0098d9', '#2b821d', '#005eaa', '#fc97af'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          type: 'scroll',
          orient: 'horizontal',
          left: 43,
          top: 25,
          bottom: 20,
          data: ['系统预警', '平台报修', '微信报修', 'QQ报修', '电话报修', '其他']
        },
        grid: {
          left: '3%',
          right: '4%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            data: data
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        toolbox: {
          show: true,
          right: 53,
          top: 25,
          feature: {
            mark: {show: true},
            magicType: {show: true, type: ['tiled']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        calculable: true,
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
        series: [{
          name: '系统预警',
          type: 'bar',
          barMaxWidth: 40,
          stack: '55寸预报屏',
          data: my_data()
        },
          {
            name: '平台报修',
            type: 'bar',
            stack: '55寸预报屏',
            data: my_data()
          },
          {
            name: '微信报修',
            type: 'bar',
            stack: '55寸预报屏',
            data: my_data()
          },
          {
            name: 'QQ报修',
            type: 'bar',
            stack: '55寸预报屏',
            data: my_data()
          },
          {
            name: '电话报修',
            type: 'bar',
            stack: '55寸预报屏',
            data: my_data()
          },
          {
            name: '其他',
            type: 'bar',
            stack: '55寸预报屏',
            data: my_data()
          }]
      }
      const zgybpChartOption = {
        title: {
          text: '站杆预报屏',
          textStyle: {
            fontSize: 22
          }
        },
        color: ['#c12e34', '#e6b600', '#0098d9', '#2b821d', '#005eaa', '#fc97af'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          type: 'scroll',
          orient: 'horizontal',
          left: 43,
          top: 25,
          bottom: 20,
          data: ['系统预警', '平台报修', '微信报修', 'QQ报修', '电话报修', '其他']
        },
        grid: {
          left: '3%',
          right: '4%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            data: data
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        toolbox: {
          show: true,
          right: 53,
          top: 20,
          feature: {
            mark: {show: true},
            magicType: {show: true, type: ['tiled']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        calculable: true,
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
        series: [{
          name: '系统预警',
          type: 'bar',
          barMaxWidth: 40,
          stack: '站杆预报屏',
          data: my_data()
        },
          {
            name: '平台报修',
            type: 'bar',
            stack: '站杆预报屏',
            data: my_data()
          },
          {
            name: '微信报修',
            type: 'bar',
            stack: '站杆预报屏',
            data: my_data()
          },
          {
            name: 'QQ报修',
            type: 'bar',
            stack: '站杆预报屏',
            data: my_data()
          },
          {
            name: '电话报修',
            type: 'bar',
            stack: '站杆预报屏',
            data: my_data()
          },
          {
            name: '其他',
            type: 'bar',
            stack: '站杆预报屏',
            data: my_data()
          }]
      }
      const bdjChartOption = {
        title: {
          text: '报到机',
          textStyle: {
            fontSize: 22
          }
        },
        color: ['#c12e34', '#e6b600', '#0098d9', '#2b821d', '#005eaa', '#fc97af'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          type: 'scroll',
          orient: 'horizontal',
          left: 43,
          top: 25,
          bottom: 20,
          data: ['系统预警', '平台报修', '微信报修', 'QQ报修', '电话报修', '其他']
        },
        grid: {
          left: '3%',
          right: '4%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            data: data
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        toolbox: {
          show: true,
          right: 53,
          top: 20,
          feature: {
            mark: {show: true},
            magicType: {show: true, type: ['tiled']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        calculable: true,
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
        series: [{
          name: '系统预警',
          type: 'bar',
          barMaxWidth: 40,
          stack: '报到机',
          data: my_data()
        },
          {
            name: '平台报修',
            type: 'bar',
            stack: '报到机',
            data: my_data()
          },
          {
            name: '微信报修',
            type: 'bar',
            stack: '报到机',
            data: my_data()
          },
          {
            name: 'QQ报修',
            type: 'bar',
            stack: '报到机',
            data: my_data()
          },
          {
            name: '电话报修',
            type: 'bar',
            stack: '报到机',
            data: my_data()
          },
          {
            name: '其他',
            type: 'bar',
            stack: '报到机',
            data: my_data()
          }]
      }
      const ycyjChartOption = {
        title: {
          text: '一程一检',
          textStyle: {
            fontSize: 22
          }
        },
        color: ['#c12e34', '#e6b600', '#0098d9', '#2b821d', '#005eaa', '#fc97af'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          type: 'scroll',
          orient: 'horizontal',
          left: 43,
          top: 25,
          bottom: 20,
          data: ['系统预警', '平台报修', '微信报修', 'QQ报修', '电话报修', '其他']
        },
        grid: {
          left: '3%',
          right: '4%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            data: data
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        toolbox: {
          show: true,
          right: 53,
          top: 20,
          feature: {
            mark: {show: true},
            magicType: {show: true, type: ['tiled']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        calculable: true,
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
        series: [{
          name: '系统预警',
          type: 'bar',
          barMaxWidth: 40,
          stack: '一程一检',
          data: my_data()
        },
          {
            name: '平台报修',
            type: 'bar',
            stack: '一程一检',
            data: my_data()
          },
          {
            name: '微信报修',
            type: 'bar',
            stack: '一程一检',
            data: my_data()
          },
          {
            name: 'QQ报修',
            type: 'bar',
            stack: '一程一检',
            data: my_data()
          },
          {
            name: '电话报修',
            type: 'bar',
            stack: '一程一检',
            data: my_data()
          },
          {
            name: '其他',
            type: 'bar',
            stack: '一程一检',
            data: my_data()
          }]
      }
      const zdtChartOption = {
        title: {
          text: '站点通',
          textStyle: {
            fontSize: 22
          }
        },
        color: ['#c12e34', '#e6b600', '#0098d9', '#2b821d', '#005eaa', '#fc97af'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          type: 'scroll',
          orient: 'horizontal',
          left: 43,
          top: 25,
          bottom: 23,
          data: ['系统预警', '平台报修', '微信报修', 'QQ报修', '电话报修', '其他']
        },
        grid: {
          left: '3%',
          right: '4%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            data: data
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        toolbox: {
          show: true,
          right: 53,
          top: 20,
          feature: {
            mark: {show: true},
            magicType: {show: true, type: ['tiled']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        calculable: true,
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
        series: [{
          name: '系统预警',
          type: 'bar',
          barMaxWidth: 40,
          stack: '站点通',
          data: my_data()
        },
          {
            name: '平台报修',
            type: 'bar',
            stack: '站点通',
            data: my_data()
          },
          {
            name: '微信报修',
            type: 'bar',
            stack: '站点通',
            data: my_data()
          },
          {
            name: 'QQ报修',
            type: 'bar',
            stack: '站点通',
            data: my_data()
          },
          {
            name: '电话报修',
            type: 'bar',
            stack: '站点通',
            data: my_data()
          },
          {
            name: '其他',
            type: 'bar',
            stack: '站点通',
            data: my_data()
          }]
      }
      rfid4gChart.setOption(rfid4gOption)
      clbqChart.setOption(clbqChartOption)
      rfid4gczChart.setOption(rfid4gczChartOption)
      czytjChart.setOption(czytjChartOption)
      fcybpChart.setOption(fcybpChartOption)
      zgybpChart.setOption(zgybpChartOption)
      bdjChart.setOption(bdjChartOption)
      ycyjChart.setOption(ycyjChartOption)
      zdtChart.setOption(zdtChartOption)
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

  #rfid4g, #clbq, #rfid4gcz, #czytj, #fcybp, #zgybp, #bdj, #ycyj, #zdt {
    height: 636px;
  }
</style>
