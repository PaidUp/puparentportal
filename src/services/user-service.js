import Trae from '@/services/trae-service'
import config from '@/config'

const trae = new Trae(config.apiUrl)

export default class UserService {
  static login = function (params) {
    let p = {
      email: params.email,
      password: params.password,
      rememberMe: params.rememberMe
    }
    return trae
      .post('/api/v1/user/login/email', p)
      .then(res => res.data)
  }

  static current = function () {
    return trae
      .get('/api/v1/user/current')
      .then(res => res.data)
  }

  static logout = function () {
    return trae
      .get('/api/v1/user/logout')
      .then(res => res.data)
  }

  static fbLogin = function (fbResponse) {
    return trae
      .post('/api/v1/user/login/fb', fbResponse)
      .then(res => res.data)
  }

  static signup = function (userForm) {
    return trae
      .post('/api/v1/user', userForm)
      .then(res => res.data)
  }
}
