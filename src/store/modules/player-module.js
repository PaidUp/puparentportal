import { commerceService, beneficiaryService } from '@/services'

function sort (a, b) {
  let dataA = a.dataCharge || a.createOn
  let dataB = b.dataCharge || b.createOn

  return new Date(dataA).getTime() - new Date(dataB).getTime()
}

const module = {
  namespaced: true,

  state: {
    beneficiaries: [],
    orders: [],
    season: '',
    program: ''
  },
  getters: {
    // order (state) {
      // let result = {}
      // if (state.orders.length && !state.season && !state.program) {
        // result = state.orders[state.orders.length - 1]
        // result.invoices.sort(sort)
        // state.season = result.season
        // state.program = result.productName
      // } else {
        // state.orders.forEach(order => {
          // if (order.season === state.season && order.productName === state.program) result = order
        // })
      // }
      // return result
    // },
    invoices (state) {
      let result = []
      if (state.orders.length && !state.season && !state.program) {
        let ord = state.orders[state.orders.length - 1]
        state.season = ord.season
        state.program = ord.productName
      } else {
        state.orders.forEach(order => {
          if (order.season === state.season && order.productName === state.program) result.concat(order.invoices)
        })
      }
      result.sort(sort)
      return result
    }
  },
  mutations: {
    setOrders (state, orders) {
      state.orders = orders
    },
    setBeneficiaries (state, beneficiaries) {
      state.beneficiaries = beneficiaries
    },
    selectOrder (state, {season, program}) {
      state.season = season
      state.program = program
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
        context.commit('setBeneficiaries', beneficiaries)
      })
    }
  }
}

export default module
