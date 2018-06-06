import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes
})

function isAutenticated () {
  if (window.localStorage.token && window.localStorage.user) {
    return true
  }
  return false
}

function getUser () {
  if (window.localStorage.user) return JSON.parse(window.localStorage.user)
  return null
}

router.beforeEach((to, from, next) => {
  if (!to.meta || !to.meta.roles) {
    return next()
  }
  // SKIP LOGIN: comment next if
  if (!to.meta.roles && !isAutenticated() && to.name !== 'login') {
    return next('login')
  }
  if ((to.name === 'login' || to.name === 'layout') && isAutenticated()) {
    let dest = '/home'
    if (getUser().roles.includes('coach')) dest = '/programs'
    return next(dest)
  }
  if (to.meta.roles && getUser() && getUser().roles) {
    let dest = '/home'
    if (getUser().roles.includes('coach')) dest = '/programs'
    let cond = getUser().roles.some(role => {
      return to.meta.roles.includes(role)
    })
    if (!cond) {
      return next(dest)
    }
  }
  return next()
})

export default router
