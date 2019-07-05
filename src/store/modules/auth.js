import { ls } from '@/utils'
import { User } from '@/entities'
import { isAuth } from '@/helpers'
import { request, callback } from '@/api/request'
import { AUTH_ID_KEY, AUTH_USER_KEY } from '@/keys'

export default {
  namespaced: true,

  state: {
    uid: ls.getItem(AUTH_ID_KEY),
    user: JSON.parse(ls.getItem(AUTH_USER_KEY))
  },

  getters: {
    isAuth(state) {
      return Boolean(state.uid && state.user)
    },
    isAsker(state) {
      const { user } = state
      return user ? isAuth([3]) : false
    },
    isExpert(state) {
      const { user } = state
      return user ? isAuth([4]) : false
    }
  },

  mutations: {
    setUser(state, user) {
      user = typeof user === 'object' ? user : null
      state.user = user
      ls.setItem(AUTH_USER_KEY, JSON.stringify(user))
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
          const { user } = new User(res.data || {})

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
          authWith: ['roles', 'tags']
        },
        success: res => {
          // save user
          const user = new User(res.data)

          commit('setUser', user)
          commit('setUid', user ? user.id : null)

          callback(args.success, res)
        }
      })
    },

    logout({ commit }, args) {
      commit('setUser', null)
      commit('setUid', null)

      callback(args)
    }
  }
}
