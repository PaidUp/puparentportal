import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './modules/user-module'
import uiModule from './modules/ui-module'
import paymentModule from './modules/payment-module'
import messageModule from './modules/message-module'
import playerModule from './modules/player-module'
import organizationModule from './modules/organization-module'
import scoreboardModule from './modules/scoreboard-module'
import clubprogramsModule from './modules/chap/clubprograms-module'
import playerInvoicesModule from './modules/chap/player-invoices-module'
import preorderAssignmentModule from './modules/chap/preorder-assignment-module'
import commonModule from './modules/common-module'
import searchModule from './modules/search-module'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    userModule,
    paymentModule,
    messageModule,
    playerModule,
    organizationModule,
    scoreboardModule,
    clubprogramsModule,
    playerInvoicesModule,
    commonModule,
    uiModule,
    searchModule,
    preorderAssignmentModule
  }
})

export default store
