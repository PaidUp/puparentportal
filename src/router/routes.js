import Login from '@/components/pages/Login.vue'
import SignUp from '@/components/pages/SignUp.vue'
import Card from '@/components/payment/Card.vue'
import Bank from '@/components/payment/Bank.vue'
import Accounts from '@/components/payment/Accounts.vue'
import MainLayout from '@/components/layout/MainLayout.vue'
import Welcome from '@/components/pages/Welcome.vue'
import Players from '@/components/players/Players.vue'

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
    component: MainLayout,
    meta: {
      isPublic: false
    },
    children: [
      {
        path: '',
        name: 'home',
        component: Welcome,
        meta: {
          isPublic: true
        }
      },
      {
        path: '/players',
        component: Players,
        meta: {
          isPublic: true
        }
      },
      {
        path: '/card',
        name: 'card',
        component: Card,
        meta: {
          isPublic: true
        }
      },
      {
        path: '/bank',
        name: 'bank',
        component: Bank,
        meta: {
          isPublic: true
        }
      },
      {
        path: '/accounts',
        name: 'accounts',
        component: Accounts,
        meta: {
          isPublic: true
        }
      }
    ]
  }
]

export default routes
