<!-- 登录界面 -->
<template>
	<div class="bgStyle">
		<div class="title">
			<div class="handleStyle">
				<Login v-show="showHide" @showRegister="showRegister"></Login>
				<Register v-show="!showHide" @showLogin="showLogin"></Register>
			</div>
			<div style="float: left;margin-top:8%;margin-left: 5%;">
				<div class="title-text">
					机器人智慧运维
				</div>
				<div class="title-text" style="margin-left: 30%;margin-top: 50px;width:260px">
					管理系统
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Login from '../components/login/login.vue'
	import Register from '../components/login/register.vue'
	export default{
		components:{
			Login,
			Register
		},
		data(){
			return{
				showHide:true,
			}
		},
		mounted() {
			
		},
		methods:{
			showRegister(){
				this.showHide=false;
			},
			showLogin(){
				this.showHide=true;
			},
		},
		
	}
</script>

<style scoped="scoped">
	.bgStyle{
		width:calc(100% - 2px) ;
		height: calc(100vh - 2px);
		border:1px solid #000000;
		background:url(../assets/power-poles.jpg);
		background-size: 100% 100%;
	}
	
	.handleStyle{
		width: 350px;
		height: 100%;
		margin-top: 10px;
		/* border:1px solid blue; */
		float:right;
		margin-right: 10%;
		/* background-color:rgba(192,192,192,0.5); */
	}
	
	.title-text {
		color: #158183;
		font-size: 50px;
		letter-spacing: 15px;
		font-weight: 700;
		/* border:1px solid #000000 */
		
	}
	
	.title {
		width: 100%;
		height: calc(100vh / 2);
		background: rgba(255, 255, 255, 0.5);
		margin-top: 12%;
	}
	
	
	/* @media (min-width: 600px) {
	  .class {
	    background: #fff;
	   你的样式
	  }
	} */
</style>
