import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import store from '@/store'

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

function defaultDestination () {
  let dest = '/home'
  if (getUser().roles.includes('coach')) dest = '/scoreboard'
  if (getUser().roles.includes('chap')) dest = '/clubs'
  return dest
}

router.beforeEach((to, from, next) => {
  store.commit('uiModule/toggleNavigation', false)
  // SKIP LOGIN: comment next if
  if (to.meta.roles && !isAutenticated() && to.name !== 'login') {
    return next('login')
  }
  if ((to.name === 'login' || to.name === 'layout' || to.name === 'signup') && isAutenticated()) {
    let dest = defaultDestination()
    return next(dest)
  }
  if ((!to.meta || !to.meta.roles)) {
    return next()
  }
  if (to.meta.roles && getUser() && getUser().roles) {
    let dest = defaultDestination()
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
