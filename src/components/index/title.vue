<!--标题-->
<template>
	<div style="height:100%;width:100%">
		<div style="width:260px;margin-left: 40px;float:left;margin-top: 13px;height: 50px;line-height: 50px;">
			<font style="font-size: 20px;color: white;">
				台区智慧运维系统
			</font>
		</div>
		<div style="height: 100%;width:150px;float:right;">
			<el-button @click="toLogin" type="text" style="margin-top: 10px;">
				<font style="font-size: 18px;color: white;">退出登录</font>
			</el-button>
		</div>
		<div style="height: 100%;width: 100px;float:right;margin-right: 20px;">
			<el-button type="text" @click="toAlarm" style="padding:0px;">
				<font style="font-size: 18px;color: orange;">报警信息({{num}})</font>
			</el-button>
		</div>
		<div style="clear: both;"></div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				num: 0,
				// showAlarm: true,
			}
		},
		mounted() {
			this.getAlarmNum();
		},
		methods: {
			getAlarmNum() {
				var alarmInfoIds = {
					currentPage: 1,
					pageSize: 1,
					IsRead: false,
				}
				this.$axios({
					method: 'get',
					url: '/AlarmInfo/GetManyValue',
					params: alarmInfoIds
				}).then(response => {
					console.log('报警记录数量');
					console.log(response);
					this.num = response.data.data.total;
					// if (this.num == 0) {
					// 	this.showAlarm = false;
					// } else {
					// 	this.showAlarm = true;
					// }
				}).catch(error => { // 请求失败
					console.log('请求失败');
					console.log(error);
				});
			},
			toAlarm() {
				this.$router.push('/index/'+this.$route.params.supplyId+'/alarm-record');
			},
			toLogin(){
				this.$router.push('/login');
				sessionStorage.setItem('token',null);
			}
		},
		watch: {

		}
	}
</script>

<style scoped="scoped">
	.item {
		margin-top: 10px;
		margin-right: 40px;
	}
</style>
