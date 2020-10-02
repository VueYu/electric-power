<!--展示前端收集器-->
<template>
	<el-container>
		<el-main v-loading="loading" style="padding-top:0px;margin:0px">
			<FrontCollectorData></FrontCollectorData>
		</el-main>
	</el-container>
</template>


<script>
	import FrontCollectorData from '../components/frontCollector/front-collector-data.vue'
	export default {
		components: {
			FrontCollectorData
		},
		data() {
			return {
				// showAddFrontCollector: false, //是否显示添加前端采集器
				// showSearchData:false,//是否显示搜索条件
				loading: false,//是否显示加载动画
				// show:false,
			}
		},
		mounted: function() {
			// window.setInterval(() => {
			// 	setTimeout(this.getCollectorInfo(1,10), 0)
			// }, 50000)

		},

		methods: {
			// changeShow(){
			// 	if(this.show==true){
			// 		console.log('修改show');
			// 		this.show=false;
			// 	}
			// },
			// hideSearch(val){
			// 	this.showSearchData=val;
			// 	this.show=!val;
			// 	window.setInterval(() => {
			// 		setTimeout(this.changeShow(), 0)
			// 	}, 500)
			// },
			
			//数据加载动画
			handleLoading(num) {
				this.loading = true;
				setTimeout(() => {
					this.loading = false;
				}, num);
			},
		},
		watch:{
			
		}
	}
</script>

<style scoped="scoped">
	.item .el-form-item__label {
		color: #909399;
		font-size: 14px;
		font-weight: 700;
	}

	.font1 {
		font-size: 14px;
	}

	.demo-table-expand {
		font-size: 0;
	}

	.demo-table-expand label {
		width: 90px;
		color: #99a9bf;
	}

	.demo-table-expand .el-form-item {
		margin-right: 0;
		margin-bottom: 0;
		width: 50%;
	}

	.search_box {
		float: left;
		width: 100%;
		margin-right: 3%;
		/* border: 1px solid #000000; */
		padding-top: 5px;
		padding-bottom: 5px;
	}

	.search_input {
		float: left;
	}
</style>
