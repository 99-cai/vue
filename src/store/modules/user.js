import { login, logout, getInfo,getRouter } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    menus:""
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_MENU: (state, menus) => {
    state.menus = menus
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        console.log(data);
        commit('SET_TOKEN', data.userInfo.token)
        setToken(data.userInfo.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response
        // const menus = response.data
        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name } = data

        commit('SET_NAME', name)
        // commit('SET_AVATAR', avatar)
        commit('SET_AVATAR', 'https://img1.baidu.com/it/u=3009731526,373851691&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500') //把头像保存到vuex中
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // getRouter
  getRouter({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      getRouter().then(response => {
        const menus = response.data.routeList
        //如果需要404 页面，请在此处添加
        menus.push({
          path: "/404",
          component: "404",
          hidden: true
        }, {
          path: "*",
          redirect: "/404",
          hidden: true
        })
        commit('SET_MENU', menus) //把name 保存到vuex中
        resolve()
      }).catch(error => {
        console.log(error);
        reject(error)
      })
    })
  },
  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
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

