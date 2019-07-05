import router from '@/router'
import { setDocTitle } from '@/utils'
import { state } from '@/store/build/base'

export default {
  state,

  mutations: {
    setTitle(state, title) {
      state.title = typeof title === 'string' ? title : null
      setDocTitle(router.currentRoute)
    },
    loadApp(state, load) {
      state.loading = typeof load === 'boolean' ? load : true
    },
    setFetchables(state, f = []) {
      state.fetchables = f
    },
    runFetchables(state) {
      state.fetchables.forEach(f => typeof f === 'function' ? f() : undefined)
    }
  }
}
