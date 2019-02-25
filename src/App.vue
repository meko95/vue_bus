<template>
  <router-view></router-view>
</template>

<script>
  import Login from '@/components/Login'
  import DeviceCollectData from '@/components/DeviceCollectData'
  import DeviceBasicInfo from '@/components/DeviceBasicInfo'
  import DeviceType from '@/components/DeviceType'
  export default {
    name: 'App',
    components:{
      Login,
      DeviceCollectData,
      DeviceBasicInfo,
      DeviceType
    }
  }
</script>

<style>

</style>
