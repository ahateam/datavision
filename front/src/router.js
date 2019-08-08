import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home'

/** 业务组件页面*/
const formDesign =()=>import('./views/formDesign')
const flowDesign =()=>import('./views/flowDesign')
const g6Editor =()=>import('./views/g6Editor')
const page =()=>import('./views/page')
const tableDesign =()=> import('./views/tableDesign')

/** page页面*/
const pageHome =()=>import('./views/page/home/pageHome')
const processList =()=> import('./views/page/process/processList')

/** 用户使用流程 填写*/
const userFlowList =()=>import('./views/userInData/userFlowList')
const userInflow =()=>import('./views/userInData/userInflow')

Vue.use(Router)

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: home
        },

        {
            path:'/formDesign',
            name:'formDesign',
            component:formDesign
        },
        {
            path:'/flowDesign',
            name:'flowDesign',
            component:flowDesign
		},
        {
            path:'/g6Editor',
            name:'g6Editor',
            component:g6Editor
        },
        {
            path:'/page',
            name:'page',
            component:page
        },
        {
            path:'/tableDesign',
            name:'tableDesign',
            component:tableDesign
        },
        /* 录入流程实例的数据*/
        {
            path:'/tableDesign',
            name:'tableDesign',
            component:tableDesign
        },

        /** 页面*/
        {
            path:'/pageHome',
            name:'pageHome',
            component:pageHome,
            children:[
                {
                    path:'/processList',
                    name:'processList',
                    component:processList
                },

                {
                    path:'/userFlowList',
                    name:'userFlowList',
                    component:userFlowList
                },
                {
                    path:'/userInflow',
                    name:'userInflow',
                    component:userInflow
                },


            ]
        },

    ]
})
