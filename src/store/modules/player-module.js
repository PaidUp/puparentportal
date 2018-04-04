import { commerceService } from '@/services'

const module = {
  namespaced: true,

  state: {
    beneficiary: {
      _id: '5ac3c604d9903c3bdca904f3',
      key: '5ab172323ae5252745ae2af8_testfirsname2_testlastname2',
      organizationId: '5ab172323ae5252745ae2af8',
      firstName: 'testFirsName2',
      lastName: 'testLastName2',
      type: 'athlete',
      status: 'active',
      assigneesEmail: [
        'email@test.com1'
      ]
    },
    orders: []
  },

  mutations: {
    setOrders (state, orders) {
      state.orders = orders
    }
  },
  actions: {
    getOrders (context) {
      return commerceService.ordersByPlayer(context.state.beneficiary.key).then(orders => {
        context.commit('setOrders', orders)
      })
    }
  }
}

export default module
