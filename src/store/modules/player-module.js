import { commerceService, beneficiaryService } from '@/services'

const module = {
  namespaced: true,

  state: {
    beneficiaries: [],
    orders: []
  },

  mutations: {
    setOrders (state, orders) {
      state.orders = orders
    },
    setBeneficiaries (state, beneficiaries) {
      state.beneficiaries = beneficiaries
    }
  },
  actions: {
    getOrders (context, { userEmail, beneficiary }) {
      return commerceService.ordersByPlayer({
        organizationId: beneficiary.organizationId,
        firstName: beneficiary.firstName,
        lastName: beneficiary.lastName,
        userEmail
      }).then(orders => {
        context.commit('setOrders', orders)
      })
    },
    getBeneficiaries (context, userEmail) {
      return beneficiaryService.beneficiariesByAssignee(userEmail).then(beneficiaries => {
        console.log('benef: ', beneficiaries)
        context.commit('setBeneficiaries', beneficiaries)
      })
    }
  }
}

export default module
