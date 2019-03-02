<template>
  <div>
    <Header></Header>
    <div id="title">
      各供应商 2019年3月2日 故障及完好率统计
    </div>
    <div id="dChart"></div>
  </div>
</template>

<script>
  import Header from '@/components/Header'
  import echarts from 'echarts'
  export default {
    name: "DeviceDStatistics",
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
        ;
        return data;
      }
      const dChart = echarts.init(document.getElementById('dChart'))
      const option = {
        color: ['#c12e34', '#e6b600', '#0098d9', '#2b821d','#005eaa','#fc97af'],
        // title: {
        //   text: '2019/3/2故障及完好率统计'
        // },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          type: 'scroll',
          orient: 'horizontal',
          left:70,
          top: 20,
          bottom: 20,
          data: ['当日故障次数', '当日设备完好率']
        },
        toolbox: {
          show: true,
          top: 20,
          right:70,
          feature: {
            mark: {show: true},
            saveAsImage: {show: true}
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            data: ['澳马公司', '中安科特', '强生科特', '新新媒体','其他供应商','所有供应商']
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
        series: [
          {
            name: '当日故障次数',
            type: 'bar',
            barMaxWidth: 39,
            data: my_data()
          },
          {
            name: '当日设备完好率',
            type: 'bar',
            barMaxWidth: 39,
            data: my_data()
          }
        ]
      }
      dChart.setOption(option)
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
  #dChart{
    height: 597px;
  }
</style>
