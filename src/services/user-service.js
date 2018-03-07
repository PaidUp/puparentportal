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
  }

  current = function () {
    return trae
      .get('/current')
  }

  logout = function () {
    return trae
      .delete('/logout')
  }

  fbLogin = function (fbResponse) {
    return trae
      .post('/login/fb', fbResponse)
  }

  signup = function (userForm) {
    return trae
      .post('/', userForm)
  }

  update = function (id, values) {
    return trae
      .put('/', { id, values })
  }
}

userService = new UserService()

export default userService
