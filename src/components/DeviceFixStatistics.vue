<template>
  <div>
    <Header></Header>
    <div id="title">
      设备修复统计
    </div>
    <PieFixChart chart-id="amgs" text="澳马公司" :pieData="this.data"></PieFixChart>
    <PieFixChart chart-id="zakj" text="中安科技" :pieData="this.data"></PieFixChart>
    <PieFixChart chart-id="qskj" text="强生科技" :pieData="this.data"></PieFixChart>
    <PieFixChart chart-id="xxmt" text="新新媒体" :pieData="this.data"></PieFixChart>
    <PieFixChart chart-id="qtjcs" text="其他集成商" :pieData="this.data"></PieFixChart>
    <PieFixChart chart-id="syjcs" text="所有集成商" :pieData="this.data"></PieFixChart>
  </div>
</template>

<script>
  import Header from '@/components/Header'
  import PieFixChart from '@/components/PieFixChart'
  export default {
    name: "DeviceFixStatistics",
    data() {
      return {
        data: [{name: '当天修复', value: 8}, {name: '次日修复', value: 4}, {name: '3天内修复', value: 3}, {
          name: '超过3天修复',
          value: 1
        }, {name: '不能修复', value: 1}, {name: '更换设备', value: 1}]
      }
    },
    components: {
      Header,
      PieFixChart
    },
    methods: {},
    beforeDestroy() {

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
</style>
