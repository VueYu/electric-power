<!-- 供电所显示 -->
<template>
	<div class="index_style">
		<div style="height:70px;line-height: 70px;width:100%;background-color: #459D9C;position:fixed;z-index: 99;">
			<Title></Title>
		</div>
		
		<!-- <div class="index_aside_style">
			<NavMenu></NavMenu>
		</div> -->
		<el-row :gutter="20" class="index_aside_style">
			<el-col :span="15" style="min-width: 800px;">
				<NavMenu></NavMenu>
			</el-col>
			<el-col :span="9">
				<NavBreadcrumb style="padding-left:20px;min-width: 400px;"></NavBreadcrumb>
			</el-col>
		</el-row>
		<div class="index_main_style">
			<!-- <div>
				<NavBreadcrumb style="padding-left:20px"></NavBreadcrumb>
			</div> -->
			<router-view v-if="isRouterAlive" style="padding:20px"></router-view>
		</div>
		<!-- <el-button @click="getNewToken">刷新Token</el-button> -->
	</div>
</template>

<script>
	import NavMenu from '../components/index/nav-menu.vue'
	import Demo1 from '../test/demo1.vue'
	import NavBreadcrumb from '../components/index/nav-breadcrumb.vue'
	import Title from '../components/index/title.vue'
	export default{
		components:{
			NavMenu,
			NavBreadcrumb,
			Title,
			Demo1
		},
		data(){
			return{
				isRouterAlive:false,
				timer:null,
			}
		},
		provide () {
			return {
				reload: this.reload
			}
		},
		mounted() {
			this.waitTime();
		},
		methods:{
			reload(){
				this.isRouterAlive = false
				this.$nextTick(function () {
					this.isRouterAlive = true
				})
			},
			getNewToken(){
				this.$axios({
					 method: 'post',
					 url:'/Account/FlushToken',
				 }).then(response => {
					console.log('刷新Token成功');
					// console.log(response.data);
					sessionStorage.setItem('token',response.data);
				 }).catch(error => {  // 请求失败
					console.log('请求失败');
					console.log(error);
				});
			},
			
			refreshTime(){
				var i=sessionStorage.getItem('num');
				i=i-0;
				i=i+1;
				sessionStorage.setItem('num',i);
				// console.log(sessionStorage.getItem('num'));
				if(i==400){
					sessionStorage.setItem('num',0);
					this.getNewToken();
				}
			},
			waitTime(){
				this.timer=window.setInterval(() => {
				  setTimeout(this.refreshTime, 0)
				}, 1000)
			},
			// clearTimeout(this.timeOut)//清除计时器
		},
		beforeDestroy(){
			console.log('清除定时器');
			clearInterval(this.timer);　　// 清除定时器
			sessionStorage.setItem('num',0);
			// this.timer = null;
		},
	}
</script>

<style scoped="scoped">
	.index_style{
		width:100%;
		height: 100%;
		box-sizing: border-box;
		overflow-x: auto;
		overflow-y: auto;
	}
	
	.index_main_style{
		background-color: white;
		width: 100%;
		height: calc(100% - 140px);
		margin-top: 135px;
		/* border: 1px solid #0000FF; */
	}
	
	.index_aside_style{
		width:100%;
		height:60px;
		position:fixed;
		margin-top: 70px;
	}
	.index_aside_style::-webkit-scrollbar { 
		width: 0 !important 
	}
</style>
