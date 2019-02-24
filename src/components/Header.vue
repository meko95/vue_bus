<template>
	<header role="banner">
		<div class="container">
			<router-link to="/bus/contract" class="banner-brand visible-md visible-lg">
				<img id="top_img" src="../../static/image/aoma.png" alt="澳马运维公司" width="125">
			</router-link>
			<div class="utility_nav">
				<ul>
					<li id="logout">
						<a href="#" @click.prevent="logout" class="btn-feature"><i class="icon fa fa-sign-out">
							<span>&nbsp;退&nbsp;出&nbsp;账&nbsp;户&nbsp;&nbsp;</span></i>
						</a>
					</li>
				</ul>
			</div>
		</div>
		<!--navbar-fixed-top-->
		<nav class="navbar navbar-default">
			<div class="container">
				<div class="navbar-header">
					<button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".navbar-collapse">
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<router-link to="/bus/contract" class="navbar-brand visible-sm visible-xs">
						<img src="../../static/image/aoma.png" alt="澳马运维公司" width="100">
					</router-link>
				</div>
				<div class="navbar-collapse collapse">
					<ul class="nav navbar-nav">
						<li class="active">
							<router-link to="/bus/contract/getContract">
								合同管理
							</router-link>
						</li>
						<li>
							<router-link to="/bus/basicdata">
								基础数据管理
							</router-link>
						</li>
						<li>
							<router-link to="/bus/change">
								设备变动情况
							</router-link>
						</li>
						<li>
							<router-link to="/bus/status">
								设备工作情况
							</router-link>
						</li>
						<li>
							<router-link to="/bus/check">
								设备巡检报修
							</router-link>
						</li>
						<li>
							<router-link to="/bus/fix">
								设备修理情况
							</router-link>
						</li>
						<li>
							<router-link to="/bus/quality">
								质量分析
							</router-link>
						</li>
						<li>
							<router-link to="/bus/report">
								月度评估分析报告
							</router-link>
						</li>
						<li>
							<router-link to="/bus/sys">
								&nbsp;系统管理&nbsp;
							</router-link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
		<router-view></router-view>
	</header>
</template>

<script>
    export default {
        name: 'Header',
        methods: {
            logout: function () {
                this.$router.push('/bus/login')
            }
        }
    }
</script>

<style lang="less" type="text/less" scoped>

	#top_img {
		width: 125px;
		float: left;
	}

	#logout {
		float: right;
		list-style: none;
		background-color: #428bca;
		height: 33px;
	}
</style>
