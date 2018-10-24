import { userService } from '@/services'
import config from '@/config'
import graphqlClient from '@/util/graphql'
import gql from 'graphql-tag'

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
    user: {},
    fbUser: {
      contacts: {
        phone: ''
      }
    },
    avatar: null
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
    reloadAvatar (state) {
      let urlPath = `${config.media.user.url}avatar/${state.user._id}.png?a=${Math.random()}`
      state.avatar = urlPath
    },
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
          console.log('err: ', JSON.stringify(err))
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
      const input = {
        accessToken: fbResponse.authResponse.accessToken,
        rememberMe: false,
        phone: context.state.fbUser.contacts.phone,
        emailSuggested: localStorage.getItem('email')
      }
      graphqlClient.mutate({
        variables: {
          input
        },
        mutation: gql`
          mutation userFbSignUp ($input: NewFbUser!) {
          userFbSignUp(user:$input){
            token
            user {
              _id
              firstName
              lastName
              email
              type
              organizationId
              phone
              roles
              facebookId
            }
          }
        }
      `
      }).then(response => {
        context.commit('setSession', response.data.userFbSignUp)
        localStorage.removeItem('email')
      }).catch(err => {
        const message = (err.message && err.message.indexOf('The specified email address is already in use') > -1) ? 'module.user.email_address_in_use' : null
        handlerError(err, context, message)
      })
    },
    onFbLoginError (error) {
      console.log('OH NOES', error)
    },
    signup (context, userForm) {
      userForm.type = 'customer'
      userForm.emailSuggested = localStorage.getItem('email')
      graphqlClient.mutate({
        variables: {
          input: userForm
        },
        mutation: gql`
          mutation userSignUp ($input: NewUser!) {
          userSignUp(user:$input){
            token
            user {
              _id
              firstName
              lastName
              email
              type
              organizationId
              phone
              roles
              facebookId
            }
          }
        }
      `
      }).then(response => {
        context.commit('setSession', response.data.userSignUp)
        localStorage.removeItem('email')
      }).catch(err => {
        const message = (err.message && err.message.indexOf('The specified email address is already in use') > -1) ? 'module.user.email_address_in_use' : null
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
        context.dispatch('messageModule/setDanger', message, {
          root: true
        })
      })
    },
    recovery (context, { email, token, password }) {
      return userService.recovery(email, token, password)
      .then(user => {
        return user
      })
      .catch(reason => {
        let message = reason.message
        context.dispatch('messageModule/setDanger', message, {
          root: true
        })
      })
    },
    reset (context, email) {
      return userService.reset(email)
      .then(user => {
        return user
      })
      .catch(reason => {
        let message = reason.message
        context.dispatch('messageModule/setDanger', message, {
          root: true
        })
      })
    },
    verifyResetToken (context, token) {
      return userService.verifyResetToken(token)
      .then(resp => {
        return resp
      })
      .catch(reason => {
        let message = reason.message
        context.dispatch('messageModule/setDanger', message, {
          root: true
        })
      })
    }
  }
}

export default module
