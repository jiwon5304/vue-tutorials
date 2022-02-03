import Vue from 'vue'
import store from './store'
import router from './router'
import VueRouter from 'vue-router'
import App from './App.vue'
import './common/axios'

Vue.use(VueRouter)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
