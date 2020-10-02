<!--展示后端收集器详细信息-->
<template>
	<el-container>
		<el-main v-loading="loading" style="padding-top:0px;margin:0px">
			<RearCollectorData></RearCollectorData>
			<!--添加前端采集器-->
			<el-drawer
				:visible.sync="showSearchData"
				direction="ltr"
				custom-class="demo-drawer"
				:before-close="handleClose"
				:show-close="true"
				
			  >
			  <SearchData></SearchData>
			  </el-drawer>
		</el-main>
	</el-container>
</template>


<script>
	import SearchData from '../components/rearCollector/search-data.vue'
	import RearCollectorData from '../components/rearCollector/rear-collector-data.vue'
	import AddRearCollector from '../components/rearCollector/add-rear-collector.vue'
	export default {
		components: {
			SearchData,
			RearCollectorData,
			AddRearCollector,
		},
		data() {
			return {
				showAddRearCollector: false, //是否显示添加前端采集器
				showSearchData:false,//是否显示搜索条件
				loading: false,//是否显示加载动画
				booln:false,
			}
		},
		mounted: function() {
			// window.setInterval(() => {
			// 	setTimeout(this.getCollectorInfo(1,10), 0)
			// }, 50000)

		},

		methods: {
			//数据加载动画
			handleLoading(num) {
				this.loading = true;
				setTimeout(() => {
					this.loading = false;
				}, num);
			},
			handleClose() {
				console.log('关闭')
				if(this.booln){
					this.showSearchData=false;
				}else{
					return;
				}
			},
			//筛选
			handleSeek() {
				var seekData = {};
				//根据查看的数据进行搜索
					//前端采集器
					//利用循环判断搜索条件是否为空，如果都为空就提示选择筛选数据
					//如果至少有一个不为空，那么就把不为空的数据赋给**seekData**作为筛选条件向后台发送请求
					//JSON.stringify(seekData)=='{}'   判断对象是否为空
					//Object.keys(xxx).length==0
				seekData=this.traverseObject(this.seekData1);
				if(JSON.stringify(seekData)!='{}'){
					this.$axios({
						method: 'post',
						url: '',
						data: seekData
					}).then(response => {
						//从response中拿到筛选后的数据再赋给tableData
						//this.tableData=
					}).catch(error => { // 请求失败
						console.log('请求失败');
						console.log(error);
					});
				}else{
					console.log('清输入条件进行查询');
				}
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
