import Trae from '@/services/trae-service'
import config from '@/config'

const trae = new Trae(config.api.user)
let userService

class UserService {
  login (params) {
    let p = {
      email: params.email,
      password: params.password,
      rememberMe: params.rememberMe
    }
    return trae
      .post('/login/email', p)
  }

  current () {
    return trae
      .get('/current')
  }

  logout () {
    return trae
      .delete('/logout')
  }

  fbLogin (fbResponse) {
    return trae
      .post('/login/fb', fbResponse)
  }

  fbSignup (fbResponse) {
    return trae
      .post('/signup/fb', fbResponse)
  }

  signup (userForm) {
    return trae
      .post('/', userForm)
  }

  update (id, values) {
    return trae
      .put('/', { id, values })
  }
}

userService = new UserService()

export default userService
