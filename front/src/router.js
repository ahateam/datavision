import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home'

/** 业务组件页面*/
const formDesign = () => import('./views/form/formDesign')
const flowDesign = () => import('./views/flowDesign')
const g6Editor = () => import('./views/g6Editor')
const page = () => import('./views/page')
const tableDesign = () => import('./views/tableDesign')
const reportDesign = () => import('./views/report/reportDesign')

/** page页面*/
const pageHome = () => import('./views/page/home/pageHome')
const processList = () => import('./views/page/process/processList')

/** 用户使用流程 填写*/
const userFlowList = () => import('./views/userInData/userFlowList')
const userInflow = () => import('./views/userInData/userInflow')

/** 表单设计相关 */
const formList =()=>import('./views/form/formList')

/** 后端测试页面*/
const test = () => import('./views/test/test')

/** 后端测试创建流程定义页面*/
const testCreatePD = () => import('./views/test/testCreatePD')
const new_file = () => import('./views/test/new_file')



Vue.use(Router)

export default new Router({
	mode: 'hash',
	routes: [{
			path: '/',
			name: 'home',
			component: home
		},

		{
			path: '/formDesign',
			name: 'formDesign',
			component: formDesign
		},
		{
			path: '/flowDesign',
			name: 'flowDesign',
			component: flowDesign
		},
		{
			path: '/g6Editor',
			name: 'g6Editor',
			component: g6Editor
		},
		{
			path: '/page',
			name: 'page',
			component: page
		},
		{
			path: '/tableDesign',
			name: 'tableDesign',
			component: tableDesign
		},
		/* 录入流程实例的数据*/
		{
			path: '/tableDesign',
			name: 'tableDesign',
			component: tableDesign
		},
		/** 报表设计器*/
		{
			path: '/reportDesign',
			name: 'reportDesign',
			component: reportDesign
		},
		/** 页面*/
		{
			path: '/pageHome',
			name: 'pageHome',
			component: pageHome,
			children: [{
					path: '/processList',
					name: 'processList',
					component: processList
				},
				{
					path: '/userFlowList',
					name: 'userFlowList',
					component: userFlowList
				},
				{
					path: '/userInflow',
					name: 'userInflow',
					component: userInflow
				},
				{
					path:'/formList',
					name:'formList',
					component:formList
				},
			
				{
					path: '/test',
					name: 'test',
					component: test
				},
			
				{
					path: '/testCreatePD',
					name: 'testCreatePD',
					component: testCreatePD
				},
				{
					path: '/new_file',
					name: 'new_file',
					component: new_file
				},

			]
		},

	]
})
