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
    allInvoices: [],
    allCredits: [],
    season: null,
    program: null
  },
  getters: {
    invoices (state) {
      if (state.season && state.program) {
        let invs = state.allInvoices.filter(inv => {
          return state.season === inv.season && state.program.split('|')[0] === inv.productId
        })
        let creds = state.allCredits.filter(cred => {
          return state.season === cred.season && state.program.split('|')[0] === cred.productId
        })
        return invs.concat(creds).sort(sort)
      }
      return []
    }
  },
  mutations: {
    setAllInvoices (state, invoices) {
      state.allInvoices = invoices
    },
    setAllCredits (state, credits) {
      state.allCredits = credits
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
    getInvoices (context, { userEmail, beneficiary }) {
      return commerceService.invoicesByBeneficiary(beneficiary._id).then(invoices => {
        context.commit('setAllInvoices', invoices)
      })
    },
    getCredits (context, beneficiary) {
      return commerceService.creditsByBeneficiary(beneficiary._id).then(credits => {
        context.commit('setAllCredits', credits)
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
