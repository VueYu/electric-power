<!--面包屑-->
<template>
	<div style="height: 60px;line-height: 60px;border-bottom:1px solid #e8e5e3">
		<el-breadcrumb style="display: inline-block;font-size: 14px;">
			<el-breadcrumb-item :to="{ path: '/index/'+$route.params.supplyId+'/collect-data' }">
				<font style="color: #58595a;"><i class="iconfont icon">&#xe622;</i>
					{{supplyName}}
				</font>
			</el-breadcrumb-item>
			<el-breadcrumb-item v-for="(item)  in levelList" :key="item.path" v-if="item.meta.title" :to="item.redirect||item.path">
				<font style="color: #c1cbd8;">
					{{item.meta.title}}
				</font>
			</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
</template>

<script>
	export default {
		name: 'Navbar',
		data() {
			return {
				levelList: [],
				supplyName:''
			}
		},
		watch: {
			$route() {
				this.getBreadcrumb()
			}
		},
		created() {
			this.getBreadcrumb();
		},
		mounted() {
			this.getBreadcrumb();
			this.getTitle();
		},
		methods: {
			getBreadcrumb() {
				let matched = this.$route.matched.filter(item => item.meta.title)
				this.levelList = matched;
			},
			getTitle(){
				this.$axios({
					 method: 'get',
					 url:'/Power-Supply/GetLine',
					 params:{
						PowerSupplyId:this.$route.params.supplyId,
						currentPage:1,
						pageSize:1
					 }
				}).then(response => {
					console.log('供电所名称请求成功');
					console.log(response.data);
					var data=response.data.data.psName;
					this.supplyName=data;
				}).catch(error => {  // 请求失败
					console.log('请求失败');
					console.log(error);
				});
			}
		},
		watch: {
			$route(to, from) {
				this.getBreadcrumb()
			}
		},
		
	}
</script>

<style scoped>
	@import "../../assets/icon/iconfont.css";

	.icon {
		margin-right: 10px;
	}
</style>
