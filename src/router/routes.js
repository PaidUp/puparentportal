import Logout from '@/components/shared/Logout.vue'
import LoginPage from '@/components/pages/LoginPage.vue'
import SignUpPage from '@/components/pages/SignUpPage.vue'
import FbSignUpPage from '@/components/pages/FbSignUpPage.vue'
import ForgotPassPage from '@/components/pages/ForgotPassPage.vue'
import ResetPassPage from '@/components/pages/ResetPassPage.vue'
import Welcome from '@/components/pages/Welcome.vue'
import PlayersPage from '@/components/pages/PlayersPage.vue'
import AddNewPlayerPage from '@/components/pages/AddNewPlayerPage.vue'
import PaymentsPage from '@/components/pages/PaymentsPage.vue'
import MainLayout from '@/components/layout/MainLayout.vue'
import PublicLayout from '@/components/layout/PublicLayout.vue'
import ProfilePage from '@/components/pages/ProfilePage.vue'
import UpgradePage from '@/components/pages/UpgradePage.vue'
import NewInvoicesPage from '@/components/pages/NewInvoicesPage.vue'
import ProgramsPage from '@/components/pages/ProgramsPage.vue'
import SearchResultPage from '@/components/pages/SearchResultPage.vue'
import ReportsPage from '@/components/pages/ReportsPage.vue'
import PrintInvoice from '@/components/pages/PrintInvoice.vue'
import PrintIneligible from '@/components/pages/PrintIneligible.vue'
import PrintEligible from '@/components/pages/PrintEligible.vue'

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
        meta: {
          roles: ['parent']
        },
        component: Welcome
      },
      {
        path: '/players/new',
        meta: {
          roles: ['parent']
        },
        component: AddNewPlayerPage
      },
      {
        path: '/profile',
        meta: {
          roles: ['parent']
        },
        component: ProfilePage
      },
      {
        path: '/programs',
        meta: {
          roles: ['coach']
        },
        component: ProgramsPage
      },
      {
        path: '/search',
        component: SearchResultPage
      },
      {
        path: '/reports/payments',
        component: ReportsPage
      },
      {
        path: '/new-invoices',
        meta: {
          roles: ['parent']
        },
        component: NewInvoicesPage
      },
      {
        path: '/upgrade',
        meta: {
          roles: ['parent']
        },
        component: UpgradePage
      },
      {
        path: '/players/:id',
        meta: {
          roles: ['parent']
        },
        component: PlayersPage,
        name: 'history'
      },
      {
        path: '/payments/:id',
        meta: {
          roles: ['parent']
        },
        component: PaymentsPage
      }
    ]
  },
  {
    path: '/print-invoice',
    component: PrintInvoice,
    meta: {
      isPublic: true
    }
  },
  {
    path: '/print-ineligible',
    component: PrintIneligible,
    meta: {
      isPublic: true
    }
  },
  {
    path: '/print-eligible',
    component: PrintEligible,
    meta: {
      isPublic: true
    }
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
        component: LoginPage,
        meta: {
          isPublic: true
        }
      },
      {
        path: '/logout',
        name: 'logout',
        component: Logout,
        meta: {
          isPublic: true
        }
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
