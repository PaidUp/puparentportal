import Vue from 'vue'
import Vuex from 'vuex'
import userModule from '@/store/modules/user-module'
import messageModule from '@/store/modules/message-module'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    userModule,
    messageModule
  }
})

export default store
