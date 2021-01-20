import Vue from 'vue'
import Vuex from 'vuex'
import jwtDecode from 'jwt-decode'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    user: null
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_USER(state, user) {
      state.user = user
    }
  },
  actions: {
    saveToken({ commit }, token) {
      commit('SET_TOKEN', token)
      commit('SET_USER', jwtDecode(token))
      localStorage.setItem('jwt', token)
    },
    autoLogin({ commit }) {
      const token = localStorage.getItem('jwt')
      if (token) {
        commit('SET_TOKEN', token)
        commit('SET_USER', jwtDecode(token))
        return true
      } else {
        return false
      }
    },
    logout({ commit }) {
      commit('SET_TOKEN', null)
      commit('SET_USER', null)
      localStorage.removeItem('jwt')
      router.push({ name: 'Welcome' })
    }
  },
  modules: {
  }
})
