import { ls } from '@/utils'
import { AUTH_ID_KEY } from '@/keys'
import { request, callback } from '@/api/request'

export default {
  namespaced: true,

  state: {
    user: null,
    uid: ls.getItem(AUTH_ID_KEY)
  },

  getters: {
    isAuth(state) {
      return Boolean(state.user)
    }
  },

  mutations: {
    setUser(state, user) {
      state.user = typeof user === 'object' ? user : null
    },
    setUid(state, id) {
      id = id || null
      state.uid = id
      ls.setItem(AUTH_ID_KEY, id)
    }
  },

  actions: {
    login({ commit }, args = {}) {
      request({
        ...args,
        url: 'auth/login',
        method: 'post',
        success: res => {
          // save user
          const { user } = res.data || {}

          commit('setUser', user || null)
          commit('setUid', user ? user.id : null)

          callback(args.success, res)
        }
      })
    },

    me({ commit, state }, args = {}) {
      request({
        ...args,
        url: 'auth/me',
        method: 'get',
        params: {
          authId: state.uid,
          authWith: ['roles']
        },
        success: res => {
          // save user
          const user = res.data

          commit('setUser', user)
          commit('setUid', user ? user.id : null)

          callback(args.success, res)
        }
      })
    }
  }
}
