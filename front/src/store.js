import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      /* 导航栏*/
      navDefaultActive:'0',
      /*流程图相关*/
      flowId:'',
      flowData:{
        graph:'',
        /*选中节点*/
        graphActive:{
          graphId:'',
          graphLabel:'',
          graphType:'',
        }
      }
  },
  mutations: {

  },
  actions: {

  }
})
