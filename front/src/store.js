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
      }
  },
  mutations: {

  },
  actions: {

  }
})
