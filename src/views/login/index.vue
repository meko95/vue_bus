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
          <el-form label-position="left" :model="user" :rules="rules" ref="loginForm" label-width="80px">
            <el-form-item label="用户名:" prop="username">
              <el-input prefix-icon="el-icon-edit" autofocus v-model="user.username" clearable
                        placeholder="请输入用户名"></el-input>
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
      return {
        user: {
          username: '',
          password: '',
          // login_status: '',
          // user_cookie: ''
        },
        rules: {
          username: [
            {required: true, message: '请输入姓名', trigger: 'blur'},
            {min: 2, max: 3, message: '长度在2到3个字符', trigger: 'change'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 8, max: 12, message: '长度在8到12个字符 不可包含特殊字符', trigger: 'change'}
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
            this.postRequest('http://kathryn.cn:8080/bus/login',this.user).then(res=>{
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
          } else{
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
    background-color: #324157;
    text-align: left;
    font-size: 26px;
    color: #409eff;
    height: 60px;
    line-height: 60px;
  }

  #login {
    border: 1px solid #c5c5c5;
    padding: 40px 20px;
    width: 420px;
    height: 259.56px;
    margin: 80px auto;
  }
</style>
