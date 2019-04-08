<template>
  <div>
    <ElementHeader></ElementHeader>
    <el-container style="height: 701px; border: 1px solid #eee">
      <el-container>
        <el-header>
          <!-- 标题 Begin -->
          <div id="title">
            <span>RFID4G(场站)报修次数统计</span>
          </div>
        </el-header>
        <el-main>
          <div id="rfid4gcz"></div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import ElementHeader from '../../components/Header'
  import echarts from 'echarts'

  export default {
    name: "Rfid4gczReportInfo",
    data() {
      return {}
    },
    components: {
      ElementHeader
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
      const rfid4gczChart = echarts.init(document.getElementById('rfid4gcz'))
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
      rfid4gczChart.setOption(rfid4gczChartOption)
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

  #rfid4gcz{
    height: 619px;
  }
</style>
