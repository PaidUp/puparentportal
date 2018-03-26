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

router.beforeEach((to, from, next) => {
  // SKIP LOGIN: comment next if
  // if (!to.meta.isPublic && !isAutenticated()) {
  //   return next('login')
  // }
  if (to.name === 'login' && isAutenticated()) {
    return next('/')
  }
  next()
})

export default router
