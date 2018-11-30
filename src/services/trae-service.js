import trae from 'trae'
import store from '@/store'
import router from '@/router'

const rejectMiddleware = (err) => {
  if (err.status === 401 || err.status === 403) {
    store.commit('userModule/clean')
    store.dispatch('messageModule/setDanger', 'module.user.expired', {
      root: true
    })
    router.push({name: 'login'})
  }
  return Promise.reject(err.data)
}

export default class Trae {
  constructor (baseUrl) {
    this.instance = trae.create({
      baseUrl
    })
    this.instance.before(config => {
      const token = window.localStorage.token
      config.cache = 'no-cache'
      config.headers['Access-Control-Allow-Origin'] = '*'
      config.headers['Cache-Control'] = 'no-cache'
      config.headers['Pragma'] = 'no-cache'
      config.headers['Expires'] = 'Sat, 01 Jan 2000 00:00:00 GMT'
      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token
      }
      return config
    })
    this.instance.after(resp => resp.data, rejectMiddleware)
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
