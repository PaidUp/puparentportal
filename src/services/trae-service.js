import trae from 'trae'
import config from '@/config'

const traeService = trae.create({
  baseUrl: config.apiUrl
})

traeService.before(config => {
  const token = window.localStorage.token
  config.headers['Authorization'] = 'Bearer ' + token
  return config
})

export default traeService
