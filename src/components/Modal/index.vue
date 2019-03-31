<template>
  <!-- Modal -->
  <div class="modal fade" :id="modalId" tabindex="-1" role="dialog" aria-labelledby="model_title">

    <div :class="modalSize" role="document">
      <div class="modal-content">

        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title" id="model_title">{{modalTitle}}</h4>
        </div>

        <div class="modal-body">
          <span>{{modalBody}}</span>
        </div>

        <div class="modal-footer">
          <button type="button" :class="btnLeftColor" @click="l_click">{{footerBtnLeft}}</button>
          <button type="button" :class="btnRightColor" @click="r_click">{{footerBtnRight}}</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Modal",
    props: {
      modalSize:String,
      modalId: String,
      modalTitle: String,
      modalBody: String,
      footerBtnLeft: String,
      footerBtnRight: String,
      btnLeftColor:String,
      btnRightColor:String,
      click_ok:''
    },
    methods:{
      l_click:function(){
        this.$emit('l_func')
      },
      r_click:function () {
        this.$emit('r_func')
      }
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  .modal-body span {
    margin-left: 60px;
    letter-spacing: 3px;
  }
</style>
