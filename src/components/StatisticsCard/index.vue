<template>
  <el-card class="box-card" shadow="hover" :body-style="{padding: '2px'}">
    <div class="text item title">{{sTitle}}</div>
    <div>
      <div class="text item">{{'设备总数:' + 100 }}</div>
      <div class="text item">{{'故障数:' + 2 }}</div>
      <div class="text item">{{'暂停使用:' + 1 }}</div>
      <div class="text item">{{'上线数:' + 97 }}</div>
      <div class="text item">{{'上线率:' + '97%'}}</div>
    </div>
    <div>
      <div class="text item">{{'报修数:' + 10 }}</div>
      <div class="text item">{{'正在维修:' + 2 }}</div>
      <div class="text item">{{'修复完成:' + 8 }}</div>
      <div class="text item">{{'修复率:' + '80%'}}</div>
    </div>
  </el-card>
</template>

<script>
  export default {
    name: "StatisticsCard",
    props: ['sTitle']
  }
</script>

<style scoped>
  .box-card {
    float: left;
    width: 550px;
    margin: 5px 0;
    height: 70px;
  }

  .text {
    font-size: 14px;
    line-height: 14px;
    text-align: center;
  }

  .item {
    float: left;
    margin: 11px 2px 4px 6px;
    width: 100px;
    height: 14px;
  }

  .title {
    color: #409eff;
  }
</style>
