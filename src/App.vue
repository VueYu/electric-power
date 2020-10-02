<template>
 <div id="app">
	<router-view></router-view>
  </div>
  
</template>

<script>
	//let centerdata=require("./test/DataCenter.js")
	export default {
		
		data(){
			return{
				
			}
		},
		mounted() {
			
		},
		methods:{
			
		},
		watch:{
			
		}
	}
</script>

<style>
	*{
		font-family: 微软雅黑;
		maring:0px;
		padding:0px
	}
	/* 取消滚动条 */
	/* ::-webkit-scrollbar {
		width: 0 !important;
	}
	::-webkit-scrollbar {
		width: 0 !important;height: 0;
	} */
	#app {
	  /* overflow: hidden; */
	  width:100%;
	}
</style>
