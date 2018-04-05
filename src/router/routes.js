import Login from '@/components/pages/Login.vue'
import SignUp from '@/components/pages/SignUp.vue'
import FbSignUp from '@/components/pages/FbSignUp.vue'
import Card from '@/components/payment/Card.vue'
import Bank from '@/components/payment/Bank.vue'
import Accounts from '@/components/payment/Accounts.vue'
import Welcome from '@/components/pages/Welcome.vue'
import PlayersPage from '@/components/pages/PlayersPage.vue'
import PaymentsPage from '@/components/pages/PaymentsPage.vue'
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
    path: '/signup/fb',
    name: 'fbSignup',
    component: FbSignUp,
    meta: {
      isPublic: true
    }
  },
  {
    path: '/',
    component: MainLayout,
    meta: {
      isPublic: true
    },
    children: [
      {
        path: '/',
        component: Welcome
      },
      {
        path: '/players/:id',
        component: PlayersPage
      },
      {
        path: '/payments/:id',
        component: PaymentsPage
      },
      {
        path: '/card',
        name: 'card',
        component: Card
      },
      {
        path: '/bank',
        name: 'bank',
        component: Bank
      },
      {
        path: '/accounts',
        name: 'accounts',
        component: Accounts
      }
    ]
  }
]

export default routes
