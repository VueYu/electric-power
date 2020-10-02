import Vue from 'vue'
import App from './App.vue'

// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
//

//引入element组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//

//引入公共数据
import common from '../public/common.js'
Vue.prototype.COMMON = common;
//

//引入路由
import router from './router/index.js'
//

//引入axios
import axios from 'axios'
Vue.prototype.$axios = axios;
axios.defaults.baseURL=common.apiUrl;//每个axios请求前会自动加上请求地址
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'; //配置请求头

axios.interceptors.request.use(
	function(config) {
		// 在发送请求之前做些什么
		// 每次请求就不需要设置参数token了
		config.headers.Authorization = window.sessionStorage.getItem('token')
		return config
	}
)

axios.interceptors.response.use(function(res){
    //res是axios所包装的数据，包含data,headers,status,statusText
    //可以在这里对返回的数据进行处理
    return res;//返回请求成功的所以数据
},function(err){
    //处理响应的错误信息
	console.log('err');
	console.log(err.response.status);//显示报错信息(例如401、500)
	if (err && err.response) {
	        switch (err.response.status) {
	            case 401: 
					this.$message({
						message: '登录验证已经过期，已返回登录界面，请重新登录！',
						type: 'warning'
					});
					err.message = '未授权，请重新登录(401)'; 
					router.push("/login");
					sessionStorage.setItem('token',null);
					break;
	        }
	    }else{
	        err.message = '连接服务器失败!'
	    }
	    return Promise.reject(err);
	
})

import qs from 'qs';
Vue.prototype.qs = qs;
//



Vue.config.productionTip = false

//引入从阿里下载的图标
import './assets/icon/iconfont.css'

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
