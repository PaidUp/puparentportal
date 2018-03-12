import Main from '@/components/pages/Main.vue'
import Login from '@/components/pages/Login.vue'
import SignUp from '@/components/pages/SignUp.vue'
import Card from '@/components/payment/Card.vue'
import Bank from '@/components/payment/Bank.vue'
import Accounts from '@/components/payment/Accounts.vue'
import MainLayout from '@/components/layout/MainLayout.vue'

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
    path: '/site',
    name: 'site',
    component: MainLayout,
    meta: {
      isPublic: true
    }
  },
  {
    path: '/',
    name: 'main',
    component: Main
  },
  {
    path: '/card',
    name: 'card',
    component: Card,
    meta: {
      isPublic: false
    }
  },
  {
    path: '/bank',
    name: 'bank',
    component: Bank,
    meta: {
      isPublic: false
    }
  },
  {
    path: '/accounts',
    name: 'accounts',
    component: Accounts,
    meta: {
      isPublic: false
    }
  }
]

export default routes
