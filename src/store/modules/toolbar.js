import { state } from '@/store/build/toolbar'

export default {
  namespaced: true,
  state,

  mutations: {
    changeIcon(state, icon) {
      if (typeof icon === 'string') {
        icon = {
          text: icon,
          click: () => {}
        }
      }

      state.icon = icon || null
    },
    makeSearchable(state, searchable) {
      state.searchable = typeof searchable === 'boolean' ? searchable : true
    }
  }
}
