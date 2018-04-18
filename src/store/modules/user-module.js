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
    user: {
      firstName: 'HardcodedFirstName'
    },
    fbUser: {
      contacts: {
        phone: ''
      }
    }
  },

  getters: {
    isAutenticated (state) {
      if (state.token && state.token.trim().length !== 0) {
        return true
      }
      return false
    }
  },

  mutations: {
    setSession (state, data) {
      let arr = data.token.split('.')
      if (arr.length === 3 && data.user) {
        localStorage.token = data.token
        state.token = data.token
        localStorage.user = JSON.stringify(data.user)
        state.user = data.user
      }
      state.loginParams.password = ''
    },
    setUser (state, user) {
      if (user) {
        localStorage.user = JSON.stringify(user)
        state.user = user
      }
    },
    clean (state) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      state.user = {}
      state.token = ''
    },
    setFbUser (state, data) {
      state.fbUser = data
    }
  },

  actions: {
    login (context) {
      return userService
        .login(context.state.loginParams)
        .then(res => {
          if (res.error) {
            let msg
            if (res.error.message === 'This email is not registered.') {
              msg = 'module.user.invalid_email'
            } else if (res.error.message === 'This a facebook account.') {
              msg = 'module.user.is_facebook_account'
            } else if (res.error.message === 'Invalid password.') {
              msg = 'module.user.invalid_password'
            } else {
              msg = res.error.message
            }
            return context.dispatch('messageModule/setDanger', msg, {
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
          if (data.fbUser) {
            return context.commit('setFbUser', {
              firstName: data.fbUser.first_name,
              lastName: data.fbUser.last_name,
              email: data.fbUser.email,
              contacts: {
                phone: ''
              }
            })
          }
          context.commit('setSession', data)
        })
        .catch(err => {
          handlerError(err, context)
        })
    },
    onFbSignupSuccess (context, fbResponse) {
      fbResponse.phone = context.state.fbUser.contacts.phone
      return userService
        .fbSignup(fbResponse)
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
      userForm.type = 'customer'
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
      return userService.current()
      .then(user => user)
      .catch(reason => {
        console.log(reason)
      })
    },
    update (context, { id, values }) {
      return userService.update(id, values)
      .then(user => {
        context.commit('setUser', user)
        return user
      })
      .catch(reason => {
        let message = reason.message
        if (reason.status === 401) {
          context.commit('clean')
          message = 'module.user.expired'
        }
        context.dispatch('messageModule/setDanger', message, {
          root: true
        })
      })
    }
  }
}

export default module
