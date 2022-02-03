import Vue from 'vue'
import Vuex from 'vuex'

const AUTH_TOKEN_KEY = 'token'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    token: null,
    isAuthenticated: false,
  },
  getters: {
    currentUser (state) {
      return state.user
    },
    isAuthenticated (state) {
      return state.isAuthenticated
    },
  },
  actions: {
    async LOGIN (context, credentials) {
      const resp = await Vue.axios.post('auth/login', credentials)
      if (resp.status === 200) {
        context.commit('SET_AUTH', resp.data)
        return resp
      }
    },
    async CHECK_AUTH (context) {
      const { status, data } = await Vue.axios.get('auth/me')
      if (status === 200) {
        context.commit('SET_CURRENT_USER', data)
        return data
      }
    },
  },
  mutations: {
    SET_AUTH (state, user) {
      state.isAuthenticated = true
      state.user = user
      state.token = user.token
      localStorage.setItem(AUTH_TOKEN_KEY, user.token)
    },
    SET_CURRENT_USER (state, user) {
      state.isAuthenticated = true
      state.user = user
    },

  }
})

