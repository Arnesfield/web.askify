import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './plugins'

import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import './assets/scss/app.scss'
import './assets/js/registerMobile'

Vue.config.productionTip = false

// show loading screen
const preloader = document.getElementById('preloader')
preloader.style.display = 'flex'

console.log(window)

store.dispatch('auth/me', {
  lastly: () => {
    new Vue({
      router,
      store,
      render: h => {
        preloader.style.display = 'none'
        return h(App)
      }
    }).$mount('#app')
  }
})
