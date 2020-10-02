<!--添加后端收集器-->
<template>
	<div>
		<el-form ref="addFrontForm" :model="addFrontForm" label-width="110px" size="mini" label-position="left">
			<div class="divSty">
				<el-form-item 
					label="终端通讯地址" 
					prop="commAddress"
					:rules="[
						{ required: true, message: '请输入终端通讯地址', trigger: 'blur' },
						{pattern: /^[0-9]\d*$/,message: '终端通讯地址只能输入数字',trigger: 'change'}
					]"
				>
					<el-input v-model="addFrontForm.commAddress" clearable></el-input>
				</el-form-item>
			</div>
			<div class="divSty">
				<el-form-item label="供电线路编号" >
					<!--不为空-->
					<el-select 
						v-model="addFrontForm.lineSn" 
						filterable 
						clearable 
						placeholder="请选择" 
						style="width: 100%;" 
						
						@change="changeData"
					>
					  <el-option
					    v-for="(item,index) in lineData"
					    :key="item.index"
					    :label="item.value"
					    :value="item.value">
					  </el-option>
					</el-select>
				</el-form-item>
			</div>
			<div class="divSty">
				<el-form-item label="台区名称" >
					<el-input v-model="addFrontForm.subStationAreas" clearable @input="changeData"></el-input>
				</el-form-item>
			</div>
			<div class="divSty">
				<el-form-item label="终端型号">
					<el-input v-model="addFrontForm.model" clearable></el-input>
				</el-form-item>
			</div>
			<div class="divSty">
				<el-form-item label="通讯规约">
					<el-input v-model="addFrontForm.commProtocol" clearable></el-input>
				</el-form-item>
			</div>
			<div class="divSty">
				<el-form-item label="SIM卡号">
					<el-input v-model="addFrontForm.simNumber" clearable></el-input>
				</el-form-item>
			</div>
			<div class="divSty">
				<el-form-item label="额定电压">
					<el-input v-model="addFrontForm.ratedVoltage" clearable></el-input>
				</el-form-item>
			</div>
			<div class="divSty">
				<el-form-item label="安装地址">
					<el-input v-model="addFrontForm.location" clearable></el-input>
				</el-form-item>
			</div>
			<div class="divSty">
				<el-form-item label="总表规格型号">
					<el-input v-model="addFrontForm.capacity" clearable></el-input>
				</el-form-item>
			</div>
			<!-- <div class="divSty">
				<el-form-item label="总表综合倍率">
					<el-input v-model="addFrontForm.ratio" clearable></el-input>
				</el-form-item>
			</div> -->
			<div class="divSty">
				<el-form-item label="总表电压倍率">
					<el-input v-model="addFrontForm.VoltageRatio" clearable></el-input>
				</el-form-item>
			</div>
			<div class="divSty">
				<el-form-item label="总表电流倍率">
					<el-input v-model="addFrontForm.Currentratio" clearable></el-input>
				</el-form-item>
			</div>
			<div class="divSty">
				<el-form-item label="台变负责人">
					<el-input v-model="addFrontForm.principal" clearable></el-input>
				</el-form-item>
			</div>
			<div class="divSty">
				<el-form-item label="投运日期">
					<el-date-picker
					  v-model="addFrontForm.putOperationDate"
					  type="date"
					  clearable
					  style="width: 290px;"
					  placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
			</div>
			<div style="clear:both"></div>
			
			<div style="height:40px;width:260px;margin-left:auto;margin-top: 20px;">
				<el-button type="primary" @click="submitForm('addFrontForm')" size="mini">添加</el-button>
				<el-button @click="hideAddFront1" size="mini">取消</el-button>
			</div>

		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				addFrontForm:{
					department:'',
					powerSupplyID:'',
					isAlive:false,
					line:'',
					type:true
				}, //存放数据
				
				powerSupplyData:[],//存放供电所数据
				lineData:[],//存放供电线路
				subStationAreasData:[],//存放台区名称
				
				// disabled1:true,//供电线路编号，不可选
				// disabled2:true,//台区名称，不可选
				
				totalNum:0,
			}
		},
		mounted() {
			this.getPowerSupply();
			this.getLineTotal();
		},
		methods: {
			//刷新el-select的下拉数据
			changeData(){
				this.$forceUpdate();
			},
			//获取供电所下线路的总数
			getLineTotal(){
				this.$axios({
					method: 'get',
					url:'/Power-Supply/GetLine',
					params:{
						 currentPage:1,
						 pageSize:1
					}
				}).then(response => {
					console.log('供电线路总数请求成功');
					console.log(response.data.data.total);
					this.totalNum=response.data.data.total;
					console.log(this.totalNum);
					this.getPowerLineData();
				}).catch(error => {  // 请求失败
					console.log('请求失败');
					console.log(error);
				});
			},
			//获取供电所下所有的供电线路
			getPowerLineData(){
				var getData={
					currentPage:1,
					pageSize:this.totalNum,
					PowerSupplyId:this.$route.params.supplyId
				};
				console.log('getData');
				console.log(getData);
				this.$axios({
					 method: 'get',
					 url:'/Power-Supply/GetLine',
					 params:getData
				}).then(response => {
					console.log('供电线路请求成功');
					console.log(response.data);
					var lineData=[];
					var data=response.data;
					if(response.data.code==200){
						for(var i=0;i<data.data.lineSns.length;i++){
							this.$set(lineData,i,{value:data.data.lineSns[i].lineSn})
						}
						console.log(lineData);
						this.lineData=lineData;
					}else{
						this.$message({
							message: '该供电所暂时没有供电线路',
							type: 'warning'
						});
						this.lineData=[];
					}
					
				}).catch(error => {  // 请求失败
					console.log('请求失败');
					console.log(error);
				});
			},
			//获取当前供电所信息
			getPowerSupply(){
				this.$axios({
					method: 'get',
					url:'/Power-Supply/GetPSByPSName',
					params: {
						psid:this.$route.params.supplyId,
						currentPage:1,
						pageSize:1
					}
				}).then(response => {
					console.log('供电所请求成功');
					console.log(response.data);
					var data=response.data.data.data[0];
					this.addFrontForm.department=data.psName;
				}).catch(error => { // 请求失败
					console.log('请求失败');
					console.log(error);
				});
			},
			
			//隐藏添加界面
			hideAddFront1() {
				console.log('隐藏');
				this.$emit("hideAddFront1",false);
			},
			//隐藏添加界面
			hideAddFront2(){
				console.log('隐藏');
				this.$emit("hideAddFront2",false);
			},
			
			//时间转换
			formatDate(date){
				var Y=date.getFullYear();
				var M=this.addZero(date.getMonth()+1);
				var D=this.addZero(date.getDate());
				
				// var h=this.addZero(date.getHours());
				// var m=this.addZero(date.getMinutes());
				// var s=this.addZero(date.getSeconds());
				console.log(Y+'-'+M+'-'+D);
				return Y+'-'+M+'-'+D
			},
			//给小于10的数加0
			addZero(num) {
				return num < 10 ? '0' + num : num;
			},
			
			//添加巡检机器人
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						var addfront=this.addFrontForm;
						if(addfront.putOperationDate!=null){
							addfront.putOperationDate=this.formatDate(addfront.putOperationDate);
						};
						addfront.ratedVoltage=addfront.ratedVoltage-0;
						addfront.ratio=addfront.ratio-0;
						this.$set(addfront,'addDate',this.formatDate(new Date));
						this.$set(addfront,'terminalNum',addfront.commAddress);
						
						console.log('addfront1');
						console.log(addfront);
						var addtransformer={
							LineSn:addfront.lineSn,
							SubStationAreas:addfront.subStationAreas,
							Capacity: addfront.capacity,
							Principal: addfront.principal,
							VoltageRatio:addfront.VoltageRatio,
							Currentratio:addfront.Currentratio
						}
						this.$set(addtransformer,'Ratio',addfront.VoltageRatio*addfront.Currentratio);
						this.$axios({
							 method: 'post',
							 url:'/Transformer/AddTransformer',
							 params:addtransformer
						}).then(response => {
							console.log('台变添加成功');
							console.log(response);
							var transformer={
								line_sn:addfront.lineSn,
								SubStationAreas:addfront.subStationAreas,
							};
							this.$set(addfront,'ratio',addfront.VoltageRatio*addfront.Currentratio);
							
							this.$axios({
								 method: 'get',
								 url:'/Transformer/GetTransformer',
								 params:transformer
							}).then(response => {
								console.log('台变ID获取成功');
								console.log(response);
								this.$set(addfront,'transformerId',response.data.data[0].transformerId);
								console.log('addfront2');
								console.log(addfront);
								this.$axios({
									 method: 'post',
									 url:'/Terminal/AddType1',
									 data:addfront
								}).then(response => {
									console.log('response');
									console.log(response);
									// console.log(JSON.stringify(response.data.code));
									if(response.data.code==200){
										console.log('成功');
										this.$message({
										  message: '巡检机器人添加成功',
										  type: 'success'
										});
										this.addFrontForm.putOperationDate=null;
										this.addFrontForm.terminalNum='';
										this.addFrontForm.subStationAreas='';
										this.addFrontForm.commAddress='';
										this.hideAddFront2();
									}else{
										console.log('出错');
										this.$message({
											  message: '数据输入有误，添加失败，请重新填写',
											  type: 'warning'
										});
										this.addFrontForm.terminalNum='';
										this.addFrontForm.subStationAreas='';
										this.addFrontForm.commAddress='';
										this.addFrontForm.putOperationDate=null;
									}
								}).catch(error => {  // 请求失败
									console.log('请求失败');
									console.log(error);
								});
							}).catch(error => {  // 请求失败
								console.log('请求失败');
								console.log(error);
							});
						}).catch(error => {  // 请求失败
							console.log('请求失败');
							console.log(error);
						});
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
		},
		watch: {
			// 'addFrontForm.lineSn':{
			// 	handler: function(val, oldVal) {
			// 		console.log('val-line');
			// 		console.log(JSON.stringify(val));
			// 		if(val=='' || val==null){
			// 			this.addFrontForm.subStationAreas='';
			// 			this.disabled2=true;
			// 		}else{
			// 			this.disabled2=false;
			// 			console.log('line   dis',this.disabled2);
			// 			let lineData = {};
			// 			console.log('val');
			// 			console.log(val);
			// 			lineData = this.lineData.find((item)=>{//这里的就是上面遍历的数据源
			// 				 return item.value == val;
			// 				 //筛选出匹配数据，是对应数据的整个对象
			// 			});
			// 			this.lineSn=lineData.value;
						
			// 		}
			// 	},
			// }
		},
	}
</script>

<style scoped="scoped">
	.divSty {
		float: left;
		margin-left: 30px;
		margin-top: 10px;
		width: 400px;
		/* border:1px solid #000000 */
	}
</style>
