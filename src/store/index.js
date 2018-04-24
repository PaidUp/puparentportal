import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './modules/user-module'
import paymentModule from './modules/payment-module'
import messageModule from './modules/message-module'
import playerModule from './modules/player-module'
import organizationModule from './modules/organization-module'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    userModule,
    paymentModule,
    messageModule,
    playerModule,
    organizationModule
  }
})

export default store
