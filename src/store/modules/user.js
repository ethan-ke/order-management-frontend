import { signIn, getUserInfo } from '@/api/user'
import { getAccessToken, setAccessToken, removeToken } from '@/utils/auth'

const getDefaultState = () => {
  return {
    access_token: getAccessToken(),
    username: '',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_ACCESS_TOKEN: (state, token) => {
    state.access_token = token
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  }
}

const actions = {
  // user signIn
  signIn({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      signIn({
        client_id: 1,
        client_secret: 'dmNXR88tGxjuns8cECI1RtajDKrQpmiS8ox0BAYx',
        grant_type: 'password',
        username: username.trim(),
        password: password
      }).then(response => {
        const access_token = response.access_token
        commit('SET_ACCESS_TOKEN', access_token)
        setAccessToken(access_token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getUserInfo().then(response => {
        const { data } = response
        commit('SET_USERNAME', data.username)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

