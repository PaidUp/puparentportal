import Trae from '@/services/trae-service'
import config from '@/config'

const trae = new Trae(config.api.user)
let userService

class UserService {
  login = function (params) {
    let p = {
      email: params.email,
      password: params.password,
      rememberMe: params.rememberMe
    }
    return trae
      .post('/login/email', p)
      .then(res => res.data)
  }

  current = function () {
    return trae
      .get('/current')
      .then(res => res.data)
  }

  logout = function () {
    return trae
      .delete('/logout')
      .then(res => res.data)
  }

  fbLogin = function (fbResponse) {
    return trae
      .post('/login/fb', fbResponse)
      .then(res => res.data)
  }

  signup = function (userForm) {
    return trae
      .post('/', userForm)
      .then(res => res.data)
  }

  update = function (id, values) {
    return trae
      .put('/', { id, values })
      .then(res => res.data)
  }
}

userService = new UserService()

export default userService
