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
import commonModule from './modules/common-module'

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
    uiModule
  }
})

export default store
