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
import ClubPrograms from '@/components/chap/ClubPrograms.vue'
import Clubs from '@/components/chap/Clubs.vue'
import Seasons from '@/components/chap/Seasons.vue'
import AssignPlanToParent from '@/components/chap/AssignPlanToParent.vue'
import FeesCalculator from '@/components/chap/FeesCalculator.vue'
import SearchResultPage from '@/components/board/SearchResultPage.vue'
import PaymentsReport from '@/components/board/reports/PaymentsReport.vue'
import DepositsReport from '@/components/board/reports/DepositsReport.vue'
import DepositTransfersReport from '@/components/board/reports/DepositTransfersReport.vue'
import PrintInvoice from '@/components/pages/PrintInvoice.vue'
import PrintIneligible from '@/components/pages/PrintIneligible.vue'
import PrintEligible from '@/components/pages/PrintEligible.vue'
import ChapDesigns from '@/components/chap/ChapDesigns.vue'
import ImportCredits from '@/components/chap/ImportCredits.vue'
import PreOrderAssignment from '@/components/chap/PreOrderAssignment.vue'

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
          roles: ['parent', 'coach', 'chap']
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
        path: '/clubs',
        name: 'clubs',
        meta: {
          roles: ['chap']
        },
        component: Clubs
      },
      {
        path: '/club/:id',
        name: 'seasons',
        meta: {
          roles: ['chap']
        },
        component: Seasons
      },
      {
        path: '/bulk/credits',
        name: 'importCredits',
        meta: {
          roles: ['chap']
        },
        component: ImportCredits
      },
      {
        path: '/bulk/preorders',
        name: 'preOrderAssignment',
        meta: {
          roles: ['chap']
        },
        component: PreOrderAssignment
      },
      {
        path: '/club/:id/season/:seasonId',
        name: 'clubprograms',
        meta: {
          roles: ['chap']
        },
        component: ClubPrograms
      },
      {
        path: '/chapdesigns',
        name: 'chapdesigns',
        meta: {
          roles: ['chap']
        },
        component: ChapDesigns
      },
      {
        path: '/calculator',
        meta: {
          roles: ['coach']
        },
        component: FeesCalculator
      },
      {
        path: '/chapassignplanparent',
        meta: {
          roles: ['coach']
        },
        component: AssignPlanToParent
      },
      {
        path: '/search',
        name: 'search',
        meta: {
          roles: ['chap']
        },
        component: SearchResultPage
      },
      {
        path: '/reports/payments',
        component: PaymentsReport,
        meta: {
          roles: ['coach']
        }
      },
      {
        path: '/reports/deposits',
        component: DepositsReport,
        meta: {
          roles: ['coach']
        }
      },
      {
        path: '/reports/deposits/:arrival/:source',
        component: DepositTransfersReport,
        meta: {
          roles: ['coach']
        }
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
        path: '/login/:email',
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
        path: '/signup/:email',
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
        path: '/reset/:token',
        name: 'resetpass',
        component: ResetPassPage
      }
    ]
  }
]

export default routes
