import { state } from '@/store/build/nav'

export default {
  namespaced: true,
  state,

  mutations: {
    clip(state, clip) {
      state.clipped = typeof clip === 'boolean' ? clip : true
    },
    setModel(state, model) {
      state.model = (typeof model === 'boolean' || model === null) ? model : true
    },
    makeTemporary(state, temporary) {
      state.temporary = typeof temporary === 'boolean' ? temporary : true
    },
    makeShy(state, shy) {
      shy = typeof shy === 'boolean' ? shy : true

      state.shy = shy
      state.temporary = shy
      // state.clipped = !shy
      // show if unshy-d
      state.model = !shy
    },

    toggle(state) {
      state.model = !state.model
    }
  }
}
