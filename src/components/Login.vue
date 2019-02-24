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
		<Modal modal-id="modal_login" modal-title="警告：" :modal-body="error" modal-footer="确定"></Modal>

	</div>
</template>

<script>
    import Modal from "@/components/Modal";
    import axios from 'axios'

    export default {
        name: "Login",
        components: {Modal},
        data() {
            return {
                formData: {
                    uid: '',
                    password: ''
                },
                error: ''
            }
        },
        methods: {
            checkData: function () {
                if (this.formData.uid == '' || this.formData.password == '') {
                    this.error = '工号/密码不可为空'
                    $('#modal_login').modal()
                    this.clearData()
                } else {
                    // 100001 lab607
                    axios.post('http://kathryn.cn:8080/bus/login/check', JSON.stringify(this.formData)).then(res => {
                        // console.log(JSON.stringify(this.formData))
                        console.log('Login.vue 82')
                        console.log(res)
                        let code = res.data.code
                        // code == 0
                        if (true) {
                            // main.js验证登录状态 next()表示验证通过
                            this.$router.push('/bus/contract/getContract')
                            this.clearData()
                        } else if (code == 2005) {
                            this.error = '工号不存在'
                            $('#modal_login').modal()
                        } else if (code == 2014) {
                            this.error = '密码错误'
                            $('#modal_login').modal()
                            this.formData.password = ''
                        } else {
                            this.error = res.data.msg
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
