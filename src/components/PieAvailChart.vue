<template>
  <div :id="this.chartId"></div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    name: "PieAvailChart",
    props: {
      chartId: String,
      text: String,
      pieData: Array
    },
    mounted() {
      let option = {
        color: ['#c12e34', '#e6b600', '#0098d9', '#2b821d', '#005eaa', '#fc97af'],
        title: {
          text: this.text,
          x: 'left',
          top: 10,
          left: 10
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          right: 80,
          top: 25,
          bottom: 20,
          data: ['当日故障次数', '当月累计故障次数', '当日完好率', '当月平均完好率'],
          selected: true
        },
        series: [
          {
            name: this.text,
            type: 'pie',
            radius: '55%',
            center: ['40%', '50%'],
            data: this.pieData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      const myChart = echarts.init(document.getElementById(this.chartId))
      myChart.setOption(option)
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  div {
    height: 600px;
    width: 50%;
    float: left;
  }
</style>
