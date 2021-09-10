import { createStore } from 'vuex'
import { getAccessToken, setAccessToken } from '@/utils/auth'
import user from './modules/user'

const getDefaultState = () => {
  return {
    access_token: getAccessToken(),
    user_info: {},
  }
}
const state = getDefaultState()

const mutations = {
  SET_ACCESS_TOKEN: (state, access_token) => {
    state.access_token = access_token
  },
  SET_USER_INFO: (state, user) => {
    state.user_info = user
  }
}

const actions = {
  setAccessToken({ commit }, access_token) {
    state.access_token = access_token
    commit('SET_ACCESS_TOKEN', access_token)
    setAccessToken(access_token)
  },
  setUserInfo({ commit }, user_info) {
    state.user_info = user_info
    commit('SET_USER_INFO', user_info)
  }
}

const store = createStore({
  state,
  mutations,
  actions,
  modules: {
    user
  }
})

export default store
