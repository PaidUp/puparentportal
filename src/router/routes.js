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
import ScoreBoardPage from '@/components/board/ScoreBoardPage.vue'
import ScorePlayersPage from '@/components/board/ScorePlayersPage.vue'
import ScorePlayerDetailsPage from '@/components/board/ScorePlayerDetailsPage.vue'
import SearchResultPage from '@/components/board/SearchResultPage.vue'
import ReportsPage from '@/components/board/ReportsPage.vue'
import PrintInvoice from '@/components/pages/PrintInvoice.vue'
import PrintIneligible from '@/components/pages/PrintIneligible.vue'
import PrintEligible from '@/components/pages/PrintEligible.vue'

const routes = [
  {
    path: '/',
    name: 'layout',
    component: MainLayout,
    children: [
      {
        path: '/home',
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
          roles: ['parent', 'coach']
        },
        component: ProfilePage
      },
      {
        path: '/scoreboard',
        meta: {
          roles: ['coach']
        },
        component: ScoreBoardPage
      },
      {
        path: '/scoreplayers',
        meta: {
          roles: ['coach']
        },
        component: ScorePlayersPage
      },
      {
        path: '/scoreplayerdetails',
        meta: {
          roles: ['coach']
        },
        component: ScorePlayerDetailsPage
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
    component: PrintInvoice
  },
  {
    path: '/print-ineligible',
    component: PrintIneligible
  },
  {
    path: '/print-eligible',
    component: PrintEligible
  },
  {
    path: '/',
    component: PublicLayout,
    children: [
      {
        path: '/login',
        name: 'login',
        component: LoginPage
      },
      {
        path: '/logout',
        name: 'logout',
        component: Logout
      },
      {
        path: '/signup',
        name: 'signup',
        component: SignUpPage
      },
      {
        path: '/signup/fb',
        name: 'fbSignup',
        component: FbSignUpPage
      },
      {
        path: '/forgot',
        name: 'forgotpass',
        component: ForgotPassPage
      },
      {
        path: '/reset',
        name: 'resetpass',
        component: ResetPassPage
      }
    ]
  }
]

export default routes
