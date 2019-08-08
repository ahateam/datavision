import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      /* 导航栏*/
      navDefaultActive:'0',
      /*流程图相关*/
      /*流程图样式*/
      flowStyle:{
          nodeList:[],
          edgeList:[],      //流程图 所有的actions 对应的线条
      },
      flowData:{
        graph:'',
        /*选中节点*/
        nodeActive:'0',
        nodeActiveInfo:{}
      },
      /** 表格tableEditor 相关*/
      tableEditor:{
            tableActive:'-1',   //-1 默认打开    val：选中的table的下标
            tableActiveArr:[],
            tableData:[],       //表格数组
            changeIndex:'-1',   //编辑的表格 行
      },
      /** 用户使用流程 process*/
      process:{
          activityId:'',
      }
  },
  mutations: {

  },
  actions: {

  }
})
