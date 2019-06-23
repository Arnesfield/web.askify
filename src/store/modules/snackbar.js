//! examples

// default message, default action
// $snackbar()

// custom message, default action
// $snackbar('Some message')

// custom message, default action
/*
$snackbar({
  text: 'Some message',
  
  // @nullable, default: ''
  mode: vertical|multi-line, 

  // @nullable, default: 6000
  timeout: 6000, 

  // @nullable, can be an Object or an Array of Objects
  btns: [
    {
      text: 'Dismiss',
      icon: false,
      color: 'accent',
      to: '',
      click: close => {
        close()
      }
    }
  ]
})
*/

import { makeCloseBtn } from '@/helpers/snackbar'

const PROPS = [
  { key: 'text', type: 'string', def: 'Woah!' },
  { key: 'mode', type: 'string', def: '' },
  { key: 'timeout', type: 'number', def: 6000 },
  {
    key: 'btns',
    type: 'object',
    def: [makeCloseBtn()]
  }
]

export { makeCloseBtn }
export default {
  namespaced: true,

  state: {
    model: null,
    text: '',
    mode: '',
    timeout: 6000,
    btns: null
  },

  mutations: {
    setModel(state, model) {
      state.model = (typeof model === 'boolean' || model === null) ? model : true
    },

    build(state, options) {
      // if string only, convert to text
      if (typeof options === 'string') {
        options = { text: options }
      }

      const { btns } = options || {}

      // set values
      PROPS.forEach(e => {
        // special check for btns
        if (
          e.key === 'btns' &&
          typeof btns !== 'undefined'
        ) {
          if (btns === null) {
            state.btns = []
            return
          } else if (btns.constructor.name === 'Array') {
            state.btns = btns
          } else if (btns.constructor.name === 'Object') {
            state.btns = [btns]
          }
          return
        }

        state[e.key] =
          options && typeof options[e.key] === e.type ? options[e.key] : e.def
      })

      // show the snackbar
      state.model = true
    }
  },

  actions: {
    make({ commit, state }, options) {
      const currModel = state.model
      const isOptionsBoolean = typeof options === 'boolean'
      const model = isOptionsBoolean ? options : false

      // open or close current snackbar
      commit('setModel', model)

      if (isOptionsBoolean) {
        return
      }

      if (currModel) {
        setTimeout(() => {
          commit('build', options)
        }, 300)
      } else {
        commit('build', options)
      }
    }
  }
}
