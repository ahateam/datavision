import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import FormMaking from 'form-making'
import 'form-making/dist/FormMaking.css'
import './assets/icon/iconfont.css'
import util from 'ahaapi'
import api from './commen/api'
import commen from './commen/commen'
import constData from './commen/constData'



Vue.use(ElementUI)
Vue.use(FormMaking)
Vue.config.productionTip = false

Vue.prototype.$util = util
Vue.prototype.$commen = commen.commen
Vue.prototype.$api = api
Vue.prototype.$constData = constData.constData

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
