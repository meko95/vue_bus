<template>
  <router-view></router-view>
</template>

<script>
  import Login from '@/components/Login'
  import DeviceCollectData from '@/components/DeviceCollectData'
  import DeviceType from '@/components/DeviceType'
  export default {
    name: 'App',
    components:{
      Login,
      DeviceCollectData,
      DeviceType
    }
  }
</script>

<style>

</style>
