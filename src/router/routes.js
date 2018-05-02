import LoginPage from '@/components/pages/LoginPage.vue'
import SignUpPage from '@/components/pages/SignUpPage.vue'
import FbSignUpPage from '@/components/pages/FbSignUpPage.vue'
import ForgotPassPage from '@/components/pages/ForgotPassPage.vue'
import ResetPassPage from '@/components/pages/ResetPassPage.vue'
import Card from '@/components/payment/Card.vue'
import Bank from '@/components/payment/Bank.vue'
import Accounts from '@/components/payment/Accounts.vue'
import Welcome from '@/components/pages/Welcome.vue'
import PlayersPage from '@/components/pages/PlayersPage.vue'
import AddNewPlayerPage from '@/components/pages/AddNewPlayerPage.vue'
import PaymentsPage from '@/components/pages/PaymentsPage.vue'
import MainLayout from '@/components/layout/MainLayout.vue'
import PublicLayout from '@/components/layout/PublicLayout.vue'
import ProfilePage from '@/components/pages/ProfilePage.vue'
import UpgradePage from '@/components/pages/UpgradePage.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    meta: {
      isPublic: true
    },
    children: [
      {
        path: '/',
        name: 'home',
        component: Welcome
      },
      {
        path: '/players/new',
        component: AddNewPlayerPage
      },
      {
        path: '/profile',
        component: ProfilePage
      },
      {
        path: '/upgrade',
        component: UpgradePage
      },
      {
        path: '/players/:id',
        component: PlayersPage,
        name: 'history'
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
  },
  {
    path: '/',
    component: PublicLayout,
    meta: {
      isPublic: true
    },
    children: [
      {
        path: '/login',
        name: 'login',
        component: LoginPage
      },
      {
        path: '/signup',
        name: 'signup',
        component: SignUpPage,
        meta: {
          isPublic: true
        }
      },
      {
        path: '/signup/fb',
        name: 'fbSignup',
        component: FbSignUpPage,
        meta: {
          isPublic: true
        }
      },
      {
        path: '/forgot',
        name: 'forgotpass',
        component: ForgotPassPage,
        meta: {
          isPublic: true
        }
      },
      {
        path: '/reset',
        name: 'resetpass',
        component: ResetPassPage,
        meta: {
          isPublic: true
        }
      }
    ]
  }
]

export default routes
