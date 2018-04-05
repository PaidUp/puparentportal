import { commerceService } from '@/services'

const module = {
  namespaced: true,

  state: {
    beneficiary: {
      _id: '5ac3c604d9903c3bdca904f3',
      organizationId: '5a85cfd53ae52527453f9fa2',
      organizationName: 'Isotopes Baseball',
      firstName: 'John',
      lastName: 'Doe',
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
    getOrders (context, userEmail) {
      return commerceService.ordersByPlayer({
        organizationId: context.state.beneficiary.organizationId,
        firstName: context.state.beneficiary.firstName,
        lastName: context.state.beneficiary.lastName,
        userEmail
      }).then(orders => {
        context.commit('setOrders', orders)
      })
    }
  }
}

export default module
