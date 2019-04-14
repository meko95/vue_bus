<template>
  <div>
    <el-container style="height: 762px; border: 1px solid #eee">
      <el-header>
        <div id="title">
          <span>上海澳马设备运维管理系统</span>
        </div>
      </el-header>
      <el-main>
        <div id="login">
          <el-form label-position="right" :model="user" :rules="rules" ref="loginForm" label-width="80px">
            <el-form-item label="账户:" prop="username">
              <el-input prefix-icon="el-icon-edit" autofocus v-model="user.username" clearable
                        placeholder="请输入账户名"></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="password">
              <el-input prefix-icon="el-icon-edit" v-model="user.password" show-password clearable
                        placeholder="请输入密码" @keyup.enter.native="submitForm('loginForm')"></el-input>
            </el-form-item>
            <div style="text-align: center">
              <el-button type="primary" style="width: 180px;margin: 0 auto;" @click="submitForm('loginForm')">登录
              </el-button>
            </div>
          </el-form>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      // let usrReg = /^[\u4e00-\u9fa5]{2,3}$/ // 中文姓名:2-3个汉字
      let usrReg = /^[a-zA-Z\w]{4,8}$/ // 英文姓名:4-8个字母,可带下划线_
      // let usrReg = /^[0-12]{12}$/ // 账号:12个数字
      let validateUsr = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('账户名不可为空'))
        }
        setTimeout(() => {
          if (!usrReg.test(value)) {
            callback(new Error('账户名长度为4-8个字母,可带下划线 "_"'))
          } else {
            callback()
          }
        }, 500)
      }
      let passReg = /^(\w){8,12}$/
      let validatePass = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('密码不可为空'))
        }
        setTimeout(() => {
          if (!passReg.test(value)) {
            callback(new Error('字母、数字、下划线，且密码长度为8-12字符'))
          } else {
            callback()
          }
        }, 500)
      }
      return {
        user: {
          username: '',
          password: '',
          // login_status: '',
          // user_cookie: ''
        },
        rules: {
          username: [
            {required: true, validator: validateUsr, trigger: 'blur'}
          ],
          password: [
            {required: true, validator: validatePass, trigger: 'change'}
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        let [usr, pass] = [this.username, this.password]
        // 前端验证
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //  服务器端验证
            this.postRequest('http://kathryn.cn:8080/bus/login', this.user).then(res => {
              //  通过res.code判断各种类型
              if (true) {
                // 获取服务端session=>浏览器设置cookie=>每次请求判断cookie是否存在 退出账户时移除cookie
                // main.js验证登录状态 next()表示验证通过
                this.$router.push('/bus/contract')
              } else if (code === 2005) {
                this.$message.error('用户名不存在')
              } else if (code === 2014) {
                this.$message.error('密码错误')
                this.user.password = ''
              } else {
                this.user = {
                  username: '',
                  password: ''
                }
              }
            })
          } else {
            return false
          }
          // this.user = {
          //   username: '',
          //   password: ''
          // }
          // return false
        })
      }
    }
  }
</script>

<style scoped>
  .el-header {
    padding: 0;
  }

  #title {
    text-align: left;
    font-size: 26px;
    height: 60px;
    line-height: 60px;
    background: -webkit-linear-gradient(165deg, #67c2ff 20%, #9576ff 80%); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(165deg, #67c2ff 20%, #9576ff 80%); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(165deg, #67c2ff 20%, #9576ff 80%); /* Firefox 3.6 - 15 */
    background: linear-gradient(165deg, #67c2ff 20%, #9576ff 80%); /* 标准的语法（必须放在最后） */
  }

  #login {
    border: 1px solid #c5c5c5;
    padding: 40px 20px;
    width: 420px;
    height: 259.56px;
    margin: 80px auto;
  }
</style>
