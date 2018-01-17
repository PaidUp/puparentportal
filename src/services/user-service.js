import trae from '@/services/trae-service'

const userService = {}

userService.login = function (params) {
  let p = {
    email: params.email,
    password: params.password,
    rememberMe: params.rememberMe
  }
  return trae
    .post('/api/v1/auth/local/login', p)
    .then(res => res.data)
}

userService.current = function () {
  return trae
    .get('/api/v1/user/current')
    .then(res => res.data)
}

userService.logout = function () {
  return trae
    .get('/api/v1/auth/logout')
    .then(res => res.data)
}

export default userService
