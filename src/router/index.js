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
  return JSON.parse(window.localStorage.user)
}

router.beforeEach((to, from, next) => {
  // SKIP LOGIN: comment next if
  if (!to.meta.isPublic && !isAutenticated()) {
    return next('login')
  }
  if (to.name === 'login' && isAutenticated()) {
    return next('/')
  }
  if (to.meta.roles && getUser() && getUser().roles) {
    let cond = getUser().roles.some(role => {
      return to.meta.roles.includes(role)
    })
    if (!cond) {
      return next('/')
    }
  }
  next()
})

export default router
