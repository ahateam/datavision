import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import './assets/icon/iconfont.css'
import util from 'ahaapi'
import api from './commen/api'
import commen from './commen/commen'


Vue.use(ElementUI)
Vue.config.productionTip = false

Vue.prototype.$util = util
Vue.prototype.$commen = commen.commen
Vue.prototype.$api = api

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
