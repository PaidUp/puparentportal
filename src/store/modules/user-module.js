import { userService } from '@/services'

const module = {
  namespaced: true,

  state: {
    token: localStorage.token || '',
    user: localStorage.user ? JSON.parse(localStorage.user) : {}
  },

  getters: {
    isAutenticated (state) {
      if (state.user && state.user._id && state.token && state.token.trim().length !== 0) {
        return true
      }
      return false
    }
  },

  mutations: {
    setUser (state, user) {
      localStorage.user = JSON.stringify(user)
      state.user = user
    },
    setToken (state, token) {
      let arr = token.split('.')
      if (arr.length === 3) {
        localStorage.token = token
        state.token = token
      }
    },
    clean (state) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      state.user = {}
      state.token = ''
    }
  },

  actions: {
    login (context, payload) {
      return userService
        .login(payload)
        .then(res => {
          if (res.token) {
            context.commit('setToken', res.token)
            context.dispatch('getUser')
          }
          return res
        })
        .catch(err => {
          let message = ''
          if (err.status === 403) {
            message = 'service.user.invalid_email'
          }
          if (err.status === 401) {
            message = 'service.user.invalid_password'
          } else {
            message = 'common.error.default'
          }
          context.dispatch('messageModule/setDanger', message, {
            root: true
          })
        })
    },
    getUser (context) {
      return userService.current().then(user => {
        context.commit('setUser', user)
      }).catch(reason => {
        let message = reason.message
        if (reason.status === 401) {
          context.commit('logout')
          message = 'module.user.unauthorized'
        }
        context.dispatch('messageModule/setDanger', message, {
          root: true
        })
      })
    },
    logout (context) {
      return userService.logout().then(res => {
        context.commit('clean')
        return res.data
      })
    }
  }
}

export default module
