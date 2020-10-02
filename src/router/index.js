//引入路由
import Vue from 'vue';
import Router from "vue-router"
Vue.use(Router);

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

import Index from '../view/index.vue'
import Index2 from '../view/index2.vue'

import Login from '../view/login.vue'

import FrontCollector from '../view/front-collector.vue' //前端采集器信息
import RearCollector from '../view/rear-collector.vue'  //后端采集器信息

import AlarmRecord from '../view/alarm-record.vue'//警告信息界面

import LineLoss from '../view/line-loss2.vue'  

import Test1 from '../view/line-loss2.vue'  

import ShowDataFront from '../view/show-data-front.vue' //前端采集器信息
import ShowDataRear from '../view/show-data-rear.vue'  //后端采集器信息

import CollectData from '../view/collect-data.vue'  //后端采集器信息


// import LineLoss from '../view/line-loss.vue' //线损率

import PowerSupply from '../view/power-supply.vue'

let router = new Router({
	mode: 'history',
	routes: [{
		path: '/',
		name: '/',
		redirect: '/login',
		//redirect   表示当路径使用到‘/’是，就自动跳转到路径为‘/login’
	}, {
		path: '/login',
		name: 'Login',
		component: Login,
	},{
		path: '/index/:supplyId',
		name: 'Index',
		component: Index,
		meta: {
			requireAuth: true
		},
		children: [
			{
				path: '/index/:supplyId/collect-data',
				name: 'CollectData',
				component: CollectData,
				meta: {
					title: "信息汇总",
					requireAuth: true
				}
			},{
				path: '/index/:supplyId/front-collector',
				name: 'FrontCollector',
				meta: {
					title: '档案管理 / 前端采集器',
					requireAuth: true
				},
				component: FrontCollector
			},{
				path: '/index/:supplyId/rear-collector',
				name: 'RearCollector',
				meta: {
					title: '档案管理 / 后端采集器',
					requireAuth: true
				},
				component: RearCollector
			},{
				path: '/index/:supplyId/alarm-record',
				name: 'AlarmRecord',
				component: AlarmRecord,
				meta: {
					title: "报警记录",
					requireAuth: true
				}
			},{
				path: '/index/:supplyId/test',
				name: 'Test',
				component: CollectData,
				meta: {
					title: "测试组件",
					requireAuth: true
				}
			},{
				path: '/index/:supplyId/line-loss',
				name: 'LineLoss',
				component: LineLoss,
				meta: {
					title: "线损检测  / 台变",
					requireAuth: true
				}
			},{
				path: '/index/:supplyId/show-data-front',
				name: 'ShowDataFront',
				component: ShowDataFront,
				meta: {
					title: "数据监测 / 总表",
					requireAuth: true
				},
			},{
				path: '/index/:supplyId/show-data-rear',
				name: 'ShowDataRear',
				component: ShowDataRear,
				meta: {
					title: "数据监测 / 户表",
					requireAuth: true
				},
			},
			{
				path: '/index/:supplyId/power-supply',
				name: 'PowerSupply',
				component: PowerSupply,
				meta: {
					title: "供电所信息",
					requireAuth: true
				},
			},
		]
	},{
		path: '/index2/:bureauId',
		name: 'Index2',
		component: Index2,
		meta: {
			// title: "供电所",
			requireAuth: true
		},
		children: [
			{
				path: '/index2/:bureauId/collect-data',
				name: 'CollectData2',
				component: CollectData,
				meta: {
					title: "信息汇总",
					requireAuth: true
				}
			},{
				path: '/index2/:bureauId/front-collector/:supplyId',
				name: 'FrontCollector2',
				component: FrontCollector,
				meta: {
					title: '档案管理 / 前端采集器',
					requireAuth: true
				},
				
			},{
				path: '/index2/:bureauId/rear-collector/:supplyId',
				name: 'RearCollector2',
				component: RearCollector,
				meta: {
					title: '档案管理 / 后端采集器',
					requireAuth: true
				},
				
			},{
				path: '/index2/:bureauId/alarm-record/:supplyId',
				name: 'AlarmRecord2',
				component: AlarmRecord,
				meta: {
					title: "警告记录",
					requireAuth: true
				}
			},{
				path: '/index2/:bureauId/test',
				name: 'Test2',
				component: CollectData,
				meta: {
					title: "测试组件",
					requireAuth: true
				}
			},{
				path: '/index2/:bureauId/line-loss/:supplyId',
				name: 'LineLoss2',
				component: LineLoss,
				meta: {
					title: "线损检测  / 台变",
					requireAuth: true
				}
			},{
				path: '/index2/:bureauId/show-data-front/:supplyId',
				name: 'ShowDataFront2',
				component: ShowDataFront,
				meta: {
					title: "数据监测 / 总表",
					requireAuth: true
				},
			},{
				path: '/index2/:bureauId/show-data-rear/:supplyId',
				name: 'ShowDataRear2',
				component: ShowDataRear,
				meta: {
					title: "数据监测 / 户表",
					requireAuth: true
				},
			},
			{
				path: '/index2/:bureauId/power-supply',
				name: 'PowerSupply2',
				component: PowerSupply,
				meta: {
					title: "供电所信息",
					requireAuth: true
				},
			},
		]
	}
	]
})

export default router


//登录拦截
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        if (sessionStorage.getItem("token")) {  // 通过sessionStorage 获取当前的token是否存在
            next();
        }
		else {
            next({
                path: '/login',// 将跳转的路由path作为参数，登录成功后跳转到该路由
                // query: {redirect: to.fullPath}  
            })
        }
    }
    else {
        next();
    }
	
	if(to.fullPath=='/login'){
		sessionStorage.setItem("timeF",null);
		sessionStorage.setItem("timeR",null);
	}
})