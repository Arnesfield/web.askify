import { state } from '@/store/build/toolbar'

export default {
  namespaced: true,
  state,

  mutations: {
    setIcon(state, icon) {
      if (typeof icon === 'string') {
        icon = {
          text: icon,
          click: () => {}
        }
      }

      icon = icon || null
      state.icon = icon

      // set click globallyyy
      window.$mobile.backables = icon ? icon.click : []
    },
    makeSearchable(state, searchable) {
      state.searchable = typeof searchable === 'boolean' ? searchable : true
    }
  }
}
