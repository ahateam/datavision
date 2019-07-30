import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      /* 导航栏*/
      navDefaultActive:'0',
      /*流程图相关*/
      nodeList:[],
      flowData:{
        graph:'',
        /*选中节点*/
        nodeActive:'0',

      }
  },
  mutations: {

  },
  actions: {

  }
})
