import { userService } from '@/services'

function handlerError (err, context, message) {
  if (!message) {
    if (err.status === 403) {
      message = 'service.user.invalid_email'
    }
    if (err.status === 401) {
      message = 'service.user.invalid_password'
    } else {
      message = 'common.error.default'
    }
  }
  context.dispatch('messageModule/setDanger', message, {
    root: true
  })
}

const module = {
  namespaced: true,

  state: {
    loginParams: {
      email: '',
      password: '',
      rememberMe: false
    },
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
    setSession (state, data) {
      let arr = data.token.split('.')
      if (arr.length === 3) {
        localStorage.token = data.token
        state.token = data.token
      }
      localStorage.user = JSON.stringify(data.user)
      state.user = data.user
    },
    clean (state) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      state.user = {}
      state.token = ''
    }
  },

  actions: {
    login (context) {
      return userService
        .login(context.state.loginParams)
        .then(res => {
          if (res.error) {
            return context.dispatch('messageModule/setDanger', res.error.message, {
              root: true
            })
          }
          context.commit('setSession', res)
          return res
        })
        .catch(err => {
          handlerError(err, context)
        })
    },
    onFbLoginSuccess (context, fbResponse) {
      fbResponse.rememberMe = context.state.loginParams.rememberMe
      return userService
        .fbLogin(fbResponse)
        .then(data => {
          context.commit('setSession', data)
        })
        .catch(err => {
          handlerError(err, context)
        })
    },
    onFbLoginError (error) {
      console.log('OH NOES', error)
    },
    signup (context, userForm) {
      return userService
        .signup(userForm)
        .then(data => {
          context.commit('setSession', data)
        })
        .catch(err => {
          const message = (err.data.message && err.data.message.includes('The specified email address is already in use')) ? 'module.user.email_address_in_use' : null
          handlerError(err, context, message)
        })
    },
    logout (context) {
      return userService
        .logout()
        .then(res => {
          context.commit('clean')
          return res.data
        })
        .catch(err => {
          handlerError(err, context)
        })
    },
    getUser (context) {
      return userService.current().then(user => {
        // context.commit('setUser', user)
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
    }
  }
}

export default module
