<template>
  <div>
    <div id="head">
      <img src="../../static/image/aoma.png" alt="上海奥马运维有限公司">
    </div>
    <div class="container">
      <div class="row">
        <div id="form_panel">
          <!--<form @submit.prevent="checkData" id="login_form" method="post" action="http://kathryn.cn:8080/bus/login"-->
          <!--novalidate="novalidate">-->
          <form id="login_form" @submit.prevent="checkData" method="post" novalidate="novalidate">
            <div id="inputId">
              <div class="form-group-lg">
                <label>工号：</label>
                <input type="text" name="uid" v-model="formData.uid" data-bv-field="uid"
                       class="form-control"
                       placeholder="请在此输入工号">
              </div>
            </div>
            <div id="inputPass">
              <div class="form-group-lg">
                <label>密码：</label>
                <input type="password" name="password" v-model="formData.password" class="form-control"
                       placeholder="请在此输入密码">
              </div>
            </div>
            <div id="register">
              没有账户？<a href="#">注册账户</a>
            </div>
            <div id="login">
              <!--data-toggle="modal" data-target="#myModal"-->
              <!--data-toggle="modal" :data-target="modal_id"-->
              <!--不可同时使用data和Javascript方式调用模态-->
              <button id="btn_login" class="btn btn-primary btn_login"
                      type="submit">
                <div>登录</div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- Modals -->
    <Modal modal-size="modal-dialog modal-md" modal-id="modal_login" modal-title="警告：" :modal-body="info" footer-btn-left="取消"
           btn-left-color="btn btn-default" @l_func="cancel" footer-btn-right="确定" btn-right-color="btn btn-danger"
           @r_func="ok"></Modal>

  </div>
</template>

<script>
  import Modal from "@/components/Modal"

  export default {
    name: "Login",
    components: {Modal},
    data() {
      return {
        formData: {
          uid: '',
          password: ''
        },
        info: ''
      }
    },
    methods: {
      checkData: function () {
        if (this.formData.uid === '' || this.formData.password === '') {
          this.info = '工号/密码不可为空'
          $('#modal_login').modal()
          this.clearData()
        } else {
          // 100001 lab607
          // 测试模式登录
          this.$router.push('/bus/contract/getContract')
          this.axios.post('http://kathryn.cn:8080/bus/login', JSON.stringify(this.formData)).then(res => {
            // console.log(JSON.stringify(this.formData))
            console.log('Login.vue 77')
            console.log(res)
            let code = res.data.code
            console.log(code)
            // code == 0
            if (true) {
              // 获取服务端session=>浏览器设置cookie=>每次请求判断cookie是否存在 退出账户时移除cookie
              // main.js验证登录状态 next()表示验证通过
              this.$router.push('/bus/contract/getContract')
              this.clearData()
            } else if (code == 2005) {
              this.info = '工号不存在'
              $('#modal_login').modal()
            } else if (code == 2014) {
              this.info = '密码错误'
              $('#modal_login').modal()
              this.formData.password = ''
            } else {
              this.info = res.data.msg
              $('#modal_login').modal()
              this.clearData()
            }
          }).catch(function (err) {
            console.log(err)
          })
        }
      },
      clearData: function () {
        this.formData.uid = ''
        this.formData.password = ''
      },
      cancel: function () {
        $('#modal_login').modal('toggle')
      },
      ok: function () {
        $('#modal_login').modal('toggle')
      }
    },
    comments: {
      Modal
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  #head {
    height: 86px;
    background-color: white;
  }

  #form_panel {
    border: 1px solid gray;
    padding: 40px 20px;
    width: 350px;
    height: 400px;
    margin: 80px auto;
  }

  label {
    font-size: 24px;
    font-family: Helvetica;
  }

  #register {
    margin-top: 10px;
    letter-spacing: 2px;
    text-align: right;
  }

  #login {
    margin: 20px auto;
    text-align: center;

    .btn_login {
      letter-spacing: 18px;
      text-indent: 18px;
      font-size: 24px;
      width: 190px;
      margin: 36px auto
    }
  }
</style>
