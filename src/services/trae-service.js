import trae from 'trae'
import config from '@/config'

export default class Trae {
  constructor (baseUrl) {
    this.instance = trae.create({
      baseUrl: config.api.user
    })

    this.instance.before(config => {
      const token = window.localStorage.token
      config.headers['Cache-Control'] = 'no-cache'
      config.headers['Pragma'] = 'no-cache'
      config.headers['Expires'] = 'Sat, 01 Jan 2000 00:00:00 GMT'
      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token
      }
      return config
    })
  }

  get get () {
    return this.instance.get
  }

  get post () {
    return this.instance.post
  }
}
