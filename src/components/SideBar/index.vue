<template>
  <el-aside width="140px" style="background-color: rgb(238, 241, 246)">
    <span style="display: block; text-align: center; font-size: 24px">{{sbType}}</span>
    <el-tree :data="subsidiary" :props="defaultProps" accordion @node-click="handleNodeClick"
             highlight-current node-key="id" :default-expanded-keys="[1]"></el-tree>
  </el-aside>
</template>

<script>
  export default {
    name: "SideBar",
    data(){
      return {
        subsidiary: this.$store.getters.getAllSubsidiary,
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    props: ['sbType'],
    methods:{
      handleNodeClick(data){
        console.log(data)
      }
    }
  }
</script>

<style scoped>

</style>
