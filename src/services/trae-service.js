import trae from 'trae'
import config from '@/config'

const traeService = trae.create({
  baseUrl: config.apiUrl
})

traeService.before(config => {
  const token = window.localStorage.token
  config.headers['Cache-Control'] = 'no-cache'
  config.headers['Pragma'] = 'no-cache'
  config.headers['Expires'] = 'Sat, 01 Jan 2000 00:00:00 GMT'
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token
  }
  return config
})

export default traeService
