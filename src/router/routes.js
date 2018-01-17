import Main from '@/components/pages/Main.vue'
import Login from '@/components/pages/Login.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      isPublic: true
    }
  },
  {
    path: '/',
    name: 'main',
    component: Main
  }
]

export default routes
