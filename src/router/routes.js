import Main from '@/components/pages/Main.vue'
import Login from '@/components/pages/Login.vue'
import SignUp from '@/components/pages/SignUp.vue'

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
    path: '/signup',
    name: 'signup',
    component: SignUp,
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
