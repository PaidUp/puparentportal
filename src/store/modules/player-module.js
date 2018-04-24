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
    season: null,
    program: null
  },
  getters: {
    invoices (state) {
      let result = []
      if (state.orders.length && state.season && state.program) {
        state.orders.forEach(order => {
          if (order.season === state.season && order.productName === state.program) result = result.concat(order.invoices)
        })
        result.sort(sort)
      }
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
    setSeason (state, season) {
      state.season = season
    },
    setProgram (state, program) {
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
    },
    create (context, body) {
      return beneficiaryService.create(body)
    }
  }
}

export default module
