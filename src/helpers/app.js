import store from '@/store'

const appHelper = {
  title: (e) => {
    store.commit('setTitle', e)
  },
  load: (e) => {
    store.commit('load', e)
  }
}

export default appHelper
