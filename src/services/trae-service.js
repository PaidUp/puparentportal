import trae from 'trae'
import store from '@/store'
import router from '@/router'

trae.before(config => {
  const token = window.localStorage.token
  config.headers['Cache-Control'] = 'no-cache'
  config.headers['Pragma'] = 'no-cache'
  config.headers['Expires'] = 'Sat, 01 Jan 2000 00:00:00 GMT'
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token
  }
  return config
})

const rejectMiddleware = (err) => {
  if (err.status === 401 || err.status === 403) {
    store.commit('userModule/clean')
    store.dispatch('messageModule/setDanger', 'module.user.expired', {
      root: true
    })
    router.push('login')
  }
  return Promise.reject(err)
}

trae.after(resp => resp.data, rejectMiddleware)

export default class Trae {
  constructor (baseUrl) {
    this.instance = trae.create({
      baseUrl
    })
  }

  get get () {
    return this.instance.get
  }

  get post () {
    return this.instance.post
  }

  get put () {
    return this.instance.put
  }

  get delete () {
    return this.instance.delete
  }
}
