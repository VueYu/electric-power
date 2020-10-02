<template>
	<div style="width: 100%;height: 100%;">
		<el-menu 
			default-active="2" 
			class="el-menu-vertical-demo" 
			@open="handleOpen" 
			@close="handleClose"
			@select="handleSelect"
			:default-active="activeIndex"
			style="height: 100%;border-bottom:1px solid #e8e5e3"
			text-color="#459D9C"
			mode="horizontal"
			router
		>
		<!-- 
		background-color="#459D9C"
		active-text-color="black"
		 -->
			<el-menu-item :index="'/index/'+$route.params.supplyId+'/collect-data'">
				<i class="el-icon-location" style="color:white"></i>
				<span>汇总</span>
			</el-menu-item>
			<el-menu-item :index="'/index/'+$route.params.supplyId+'/line-loss'">
				<i class="el-icon-location" style="color:white"></i>
				<span>线损监测</span>
			</el-menu-item>
			
			<el-submenu index="2">
				<template slot="title">
					<i class="el-icon-location" style="color:white"></i>
					<span>数据监测</span>
				</template>
				<el-menu-item :index="'/index/'+$route.params.supplyId+'/show-data-front'">
					巡检机器人
				</el-menu-item>
				<el-menu-item :index="'/index/'+$route.params.supplyId+'/show-data-rear'">
					管理单元
				</el-menu-item>
			</el-submenu>
			
			<el-menu-item :index="'/index/'+$route.params.supplyId+'/alarm-record'">
				<i class="el-icon-location" style="color:white"></i>
				报警记录
			</el-menu-item>
			
			<el-submenu index="3">
				<template slot="title">
					<i class="el-icon-location" style="color:white"></i>
					<span>档案管理</span>
				</template>
				<el-menu-item :index="'/index/'+$route.params.supplyId+'/front-collector'">
					巡检机器人
				</el-menu-item>
				<el-menu-item :index="'/index/'+$route.params.supplyId+'/rear-collector'">
					管理单元
				</el-menu-item>
			</el-submenu>
			<!-- <el-menu-item :index="'/index/'+$route.params.supplyId+'/power-supply'">
				<i class="el-icon-location" style="color:white"></i>
				供电所管理
			</el-menu-item> -->
			<!-- <el-menu-item :index="'/index/'+$route.params.supplyId+'/test'">
				<i class="el-icon-location" style="color:white"></i>
				demo
			</el-menu-item> -->
		</el-menu>
	</div>
</template>

<script> 
	export default {
		inject: ['reload'],
		data() {
			return {
				activeIndex: this.$route.path,
			}
		},
		mounted() {
			this.reload()
		},
		methods: {
			handleSelect (index) {
				if (index === this.$route.path) {
					this.reload()
				}
			},
			//获取供电局、供电所信息
			getData(){
				
			},
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			}
		},
		watch:{
			$route: {
			    handler: function(val, oldVal){
					this.activeIndex=val.fullPath;
			    },
			    // 深度观察监听
			    deep: true
			},
		}
	}
</script>

<style>
	
</style>
