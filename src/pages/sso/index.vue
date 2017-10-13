<style scoped>
.form {
	width: 100%;
	max-width: 400px;
	margin: 0px auto 0px auto;
}

.login-content {
	width: 100%;
	max-width: 400px;
	background-color: white;
	float: left;
	text-align: center;
	padding-top: 50px;
	border-radius: 4px;
	height: 300px;
}

.input-group {
	margin: 0px 0px 30px 0px !important;
}

.form-control,
.input-group {
	height: 40px;
}

.form-group {
	margin-bottom: 0px !important;
}

.link p {
	line-height: 20px;
	margin-top: 30px;
}

.btn-sm {
	width: 100%;
	font-size: 16px !important;
}

#userError {
	text-align: left;
	color: red;
	margin-top: 10px;
}

.login-parent {
	width: 0;
	height: 0;
	position: fixed;
	left: 50%;
	right: 50%;
	top: 50%;
	bottom: 50%;
}

.login-center {
	width: 500px;
	height: 394px;
	margin-left: -250px;
	margin-top: -187px;
}

.remember-text {
	vertical-align: middle;
	font-size: 12px;
	font-family: Tahoma;
	color: #337ab7;
}

#remember {
	vertical-align: middle;
}

.logo,
.logo:visited,
.logo:focus,
.logo:hover {
	color: #326BD1;
	text-decoration: none;
}

.logo {
	font-size: 34px;
	font-family: 'Microsoft YaHei';
	font-weight: bold;
	color: #326BD1;
}
</style>
<template>
	<div id="app">
		<div class="login-parent">
			<div class="container-fluid login-center">
				<div class="row-fluid" style="text-align:center; ">

					<div style="margin-bottom:50px;">
						<a href="#" target="_parent" class="logo"><img src="../../../static/Content/images/logo2.png" style="width:80px;float:left;" />四川省防汛抗旱指挥系统<br />单点登录门户</a>

					</div>
				</div>
				<div class="row-fluid">
					<div class="form">
						<div class="login-content">
							<form action="#" method="post" autocomplete="off">
								<div class="form-group">
									<div class="col-md-12">
										<div class="input-group">
											<span class="input-group-addon">
												<span class="fa fa-user"></span>
											</span>
											<input autocomplete="off" type="text" class="form-control UserName" placeholder="请输入用户名|手机号" v-model="username" @keyup="enter_keyup($event)" />
										</div>
									</div>
								</div>
								<div class="form-group">
									<div class="col-md-12">
										<div class="input-group">
											<span class="input-group-addon">
												<span class="fa fa-lock"></span>
											</span>
											<input type="password" class="form-control Password" placeholder="请输入密码" v-model="password" @keyup="enter_keyup($event)" />
										</div>
									</div>
								</div>
								<div class="form-group form-actions">
									<div class="col-md-12">
										<p class="text-left remove-margin" style="display:block;height:23px; vertical-align:middle;font-size: 12px;color:#337ab7">
											<label v-show="sRemember">自动登录</label>
											<input type="checkbox" id="remember" name="remember" v-show="sRemember" v-model="remember" style="vertical-align:-3px;" />
										</p>
										<input type="button" id="login" @click="login()" class="btn btn-sm btn-info" v-model="bottonText" />
									</div>
								</div>
								<div class="form-group">
									<div class="col-md-12">
										<p id="userError">{{error}}</p>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'app1',
	components: {
	},
	data() {
		return {
			sRemember: true,
			remember: false,
			username: '',
			password: '',
			error: '',
			bottonText: '登录'
		}
	},
	methods: {
		login: function() {

			if (this.username == '') {
				this.error = "用户名不能为空！";
				$('.UserName').focus();
				return;
			}

			if (this.password == '') {
				this.error = "密码不能为空！";
				$('.Password').focus();
				return;
			}

			if (this.username != "admin" || this.password != "admin123") {
				this.error = "invalid username or password";
				$('.UserName').focus();
				return;
			}
			// // 该接口为8763的本地接口
			// this.$http.get("http://localhost:8763/rest/template/xx")
			// 	.then((rep) => {
			// 		console.log(rep.bodyText);
			// 		console.log(rep);
			// 	});

			// // 该接口为8763作为zuul带来的路由接口
			// this.$http.get("http://localhost:8763/test1?accessToken=xx")
			// 	.then((rep) => {
			// 		console.log(rep.bodyText);
			// 		console.log(rep);
			// 	});

			// 模拟登录
			window.location.href = window.location.origin + "/pages/main/index.html";
			return;

			this.error = "";
			this.$http.get("/api/UserCenter/CheckLogin"
				+ "?userName=" + this.username
				+ "&password=" + this.password
				+ "&returnUrl=" + returnUrl
				+ "&remember=" + this.remember)
				.then((rep) => {
					console.log(rep.data);
					if (rep.data.code == '000') {
						localStorage.setItem('remember', this.remember);
						localStorage.setItem('token', rep.data.data.token);

						if (!window.location.origin) {
							console.log(window.location.protocol);
							window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
						}

						console.log(window.location.origin);
						console.log(window.location.href);
						window.location.href = window.location.origin + "/pages/main/index.html";
					}
					else {
						this.error = rep.data.error;
					}
				});
		},
		enter_keyup: function(ev) {

			if (ev.keyCode == 13) {
				this.login();
			}
		},
	},
	created: function() {
		console.log("created");
	},
	mounted: function() {
		console.log("mounted");
		// this.username = "admin";
		// this.password = "111111";
		// this.login();
	},
	updated: function() {
		console.log("updated");
	}
}

</script>