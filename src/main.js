import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './plugins'

import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import './assets/scss/app.scss'

Vue.config.productionTip = false

store.dispatch('auth/me', {
  lastly: () => {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
