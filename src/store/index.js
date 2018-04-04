import Vue from 'vue'
import Vuex from 'vuex'
import userModule from '@/store/modules/user-module'
import paymentModule from '@/store/modules/payment-module'
import messageModule from '@/store/modules/message-module'
import playerModule from '@/store/modules/player-module'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    userModule,
    paymentModule,
    messageModule,
    playerModule
  }
})

export default store
