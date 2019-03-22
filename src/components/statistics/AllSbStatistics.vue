<template>
  <div>
    <ElementHeader></ElementHeader>
    <el-container style="height: 707px; border: 1px solid #eee">
      <!-- Side Begin -->
      <el-aside width="146px" style="background-color: rgb(238, 241, 246)">
        <span style="text-align: center; font-size: 24px">设备归属信息</span>
        <el-tree :data="subsidiary" :props="defaultProps" accordion @node-click="handleNodeClick"
                 highlight-current node-key="id" :default-expanded-keys="[1]"></el-tree>
      </el-aside>
      <!-- Container Begin -->
      <el-container>
        <!-- Header Begin -->
        <el-header>
          <div id="title">
            <span>设备统计信息</span>
          </div>
        </el-header>
        <el-main>
          <!-- 设备统计信息Begin -->
          <el-table :data="sbStatistics" v-loading="tableLoading" border tooltip-effect="dark" style="width: 100%;"
                    stripe size="small" highlight-current-row height="625">
            <el-table-column prop="sblb" label="设备类别" width="120" align="left" fixed></el-table-column>
            <el-table-column label="设备工作情况" align="center">
              <el-table-column prop="sbzs" label="设备总数" width="100" align="left"></el-table-column>
              <el-table-column prop="sbtys" label="停用数" width="100" align="left"></el-table-column>
              <el-table-column prop="sbgzs" label="故障数" width="100" align="left"></el-table-column>
              <el-table-column prop="online" label="上线数" width="100" align="left"></el-table-column>
              <el-table-column prop="offline" label="下线数" width="100" align="left"></el-table-column>
              <el-table-column prop="sbsxl" label="上线率" width="100" align="left"></el-table-column>
            </el-table-column>
            <el-table-column label="设备故障" align="left">
              <el-table-column prop="sbgzzs" label="设备故障总数" width="100" align="left"></el-table-column>
              <el-table-column prop="jzgz" label="基站故障次数" width="100" align="left"></el-table-column>
              <el-table-column prop="bqgz" label="标签故障次数" width="100" align="left"></el-table-column>
              <el-table-column prop="fgz" label="非故障次数" width="100" align="left"></el-table-column>
              <el-table-column prop="am" label="澳马" width="100" align="left"></el-table-column>
              <el-table-column prop="xp" label="秀派" width="100" align="left"></el-table-column>
              <el-table-column prop="zn" label="中安" width="100" align="left"></el-table-column>
              <el-table-column prop="gys" label="公用所" width="100" align="left"></el-table-column>
            </el-table-column>
            <el-table-column label="设备质量" align="left">
              <el-table-column prop="xjcs" label="巡检次数" width="100" align="left"></el-table-column>
              <el-table-column prop="bxcs" label="报修次数" width="100" align="left"></el-table-column>
              <el-table-column label="修理情况" align="left">
                <el-table-column prop="day" label="当天修复" width="100" align="left"></el-table-column>
                <el-table-column prop="afterday" label="次日修复" width="100" align="left"></el-table-column>
                <el-table-column prop="threeday" label="三天内修复" width="100" align="left"></el-table-column>
                <el-table-column prop="moreday" label="超过三天修复" width="100" align="left"></el-table-column>
                <el-table-column prop="bad" label="不能修复" width="100" align="left"></el-table-column>
                <el-table-column prop="replace" label="更换设备" width="100" align="left"></el-table-column>
              </el-table-column>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import ElementHeader from '../ElementHeader'

  export default {
    name: "AllSbStatistics",
    data() {
      return {
        sbStatistics:[{sblb:'RFID4G'},{sblb:'RFID4G（场站）'},{sblb:'车辆标签'},{sblb:'车载一体机'},{sblb:'报到机'},{sblb:'一程一检'},{sblb:'站点通'},{sblb:'55寸屏'},{sblb:'站杆预报屏'}],
        subsidiary: [
          {
            id: 1,
            label: '上海久事一集团',
            children: [
              {
                label: '巴士一公司',
                children: [
                  {
                    label: '一车队',
                    children: [
                      {label: '55'},
                      {label: '61'},
                      {label: '99'},
                      {label: '307'},
                      {label: '325'},
                      {label: '538'},
                      {label: '1201'},
                      {label: '1218'},
                      {label: '1226'},
                      {label: '1228'},
                      {label: '1255'},
                      {label: '1256'}
                    ]
                  },
                  {
                    label: '二车队',
                    children: [
                      {label: '47'},
                      {label: '66'},
                      {label: '66区间'},
                      {label: '97'},
                      {label: '140'},
                      {label: '179'},
                      {label: '306'},
                      {label: '597'}
                    ]
                  },
                  {
                    label: '三车队',
                    children: [
                      {label: '70'},
                      {label: '79'},
                      {label: '80'},
                      {label: '137'},
                      {label: '222'},
                      {label: '310'},
                      {label: '559'},
                      {label: '758'},
                      {label: '875'},
                      {label: '960'}
                    ]
                  },
                  {
                    label: '四车队',
                    children: [
                      {label: '60'},
                      {label: '103'},
                      {label: '142'},
                      {label: '195'},
                      {label: '220'},
                      {label: '308'},
                      {label: '329'},
                      {label: '557'},
                      {label: '723'},
                      {label: '842'},
                      {label: '874'}
                    ]
                  },
                  {
                    label: '五车队',
                    children: [
                      {label: '100'},
                      {label: '115'},
                      {label: '123'},
                      {label: '819'},
                      {label: '854'},
                      {label: '942'},
                      {label: '1258'}
                    ]
                  }
                ]
              },
              {
                label: '巴士二公司',
                children: [{
                  label: '一车队',
                  children: [
                    {label: '55'},
                    {label: '61'},
                    {label: '99'},
                    {label: '307'},
                    {label: '325'},
                    {label: '538'},
                    {label: '1201'},
                    {label: '1218'},
                    {label: '1226'},
                    {label: '1228'},
                    {label: '1255'},
                    {label: '1256'}
                  ]
                },
                  {
                    label: '二车队',
                    children: [
                      {label: '47'},
                      {label: '66'},
                      {label: '66区间'},
                      {label: '97'},
                      {label: '140'},
                      {label: '179'},
                      {label: '306'},
                      {label: '597'}
                    ]
                  },
                  {
                    label: '三车队',
                    children: [
                      {label: '70'},
                      {label: '79'},
                      {label: '80'},
                      {label: '137'},
                      {label: '222'},
                      {label: '310'},
                      {label: '559'},
                      {label: '758'},
                      {label: '875'},
                      {label: '960'}
                    ]
                  },
                  {
                    label: '四车队',
                    children: [
                      {label: '60'},
                      {label: '103'},
                      {label: '142'},
                      {label: '195'},
                      {label: '220'},
                      {label: '308'},
                      {label: '329'},
                      {label: '557'},
                      {label: '723'},
                      {label: '842'},
                      {label: '874'}
                    ]
                  },
                  {
                    label: '五车队',
                    children: [
                      {label: '100'},
                      {label: '115'},
                      {label: '123'},
                      {label: '819'},
                      {label: '854'},
                      {label: '942'},
                      {label: '1258'}
                    ]
                  }]
              },
              {
                label: '巴士三公司',
                children: [{
                  label: '一车队',
                  children: [
                    {label: '55'},
                    {label: '61'},
                    {label: '99'},
                    {label: '307'},
                    {label: '325'},
                    {label: '538'},
                    {label: '1201'},
                    {label: '1218'},
                    {label: '1226'},
                    {label: '1228'},
                    {label: '1255'},
                    {label: '1256'}
                  ]
                },
                  {
                    label: '二车队',
                    children: [
                      {label: '47'},
                      {label: '66'},
                      {label: '66区间'},
                      {label: '97'},
                      {label: '140'},
                      {label: '179'},
                      {label: '306'},
                      {label: '597'}
                    ]
                  },
                  {
                    label: '三车队',
                    children: [
                      {label: '70'},
                      {label: '79'},
                      {label: '80'},
                      {label: '137'},
                      {label: '222'},
                      {label: '310'},
                      {label: '559'},
                      {label: '758'},
                      {label: '875'},
                      {label: '960'}
                    ]
                  },
                  {
                    label: '四车队',
                    children: [
                      {label: '60'},
                      {label: '103'},
                      {label: '142'},
                      {label: '195'},
                      {label: '220'},
                      {label: '308'},
                      {label: '329'},
                      {label: '557'},
                      {label: '723'},
                      {label: '842'},
                      {label: '874'}
                    ]
                  },
                  {
                    label: '五车队',
                    children: [
                      {label: '100'},
                      {label: '115'},
                      {label: '123'},
                      {label: '819'},
                      {label: '854'},
                      {label: '942'},
                      {label: '1258'}
                    ]
                  }]
              }
            ]
          }
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    components: {
      ElementHeader
    },
    methods: {}
  }
</script>

<style scoped>
  #title {
    background-color: #eef1f6;
    text-align: center;
    font-size: 26px;
    height: 60px;
    line-height: 60px;
  }
</style>
