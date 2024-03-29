import Vue from 'vue'
import Vuex from 'vuex'

import base from './base'
import * as modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  ...base,
  modules
})
