import { commerceService, beneficiaryService, organizationService } from '@/services'
import config from '@/config'

const module = {
  namespaced: true,

  state: {
    beneficiaries: [],
    allInvoices: [],
    allCredits: [],
    allPreorders: null,
    organization: null
  },
  getters: {
  },
  mutations: {
    setAllInvoices (state, invoices) {
      state.allInvoices = invoices
    },
    setAllPreorders (state, preorders) {
      state.allPreorders = preorders
    },
    setAllCredits (state, credits) {
      state.allCredits = credits
    },
    setBeneficiaries (state, beneficiaries) {
      state.beneficiaries = beneficiaries
    },
    setOrganization (state, organization) {
      state.organization = organization
    }
  },
  actions: {
    getInvoices (context, { userEmail, beneficiary }) {
      return commerceService.invoicesByBeneficiary(beneficiary._id, userEmail).then(invoices => {
        context.commit('setAllInvoices', invoices)
        return invoices
      })
    },
    getPreorders (context, { userEmail, beneficiaryId }) {
      return commerceService.preordersByBeneficiary(beneficiaryId, userEmail).then(preorders => {
        context.commit('setAllPreorders', preorders)
        return preorders
      })
    },
    getCredits (context, { beneficiary, userEmail }) {
      return commerceService.creditsByBeneficiary(beneficiary._id, userEmail).then(credits => {
        context.commit('setAllCredits', credits)
      })
    },
    getBeneficiaries (context, userEmail) {
      let promises = []
      return beneficiaryService.beneficiariesByAssignee(userEmail).then(beneficiaries => {
        beneficiaries.forEach(beneficiary => {
          promises.push(
            commerceService.preordersByBeneficiary(beneficiary._id, userEmail).then(preorders => {
              beneficiary.numPreorders = preorders.filter(po => {
                return po.status === 'active'
              }).length
              return beneficiary
            })
          )
          promises.push(
            commerceService.invoicesByBeneficiary(beneficiary._id, userEmail).then(invoices => {
              beneficiary.numFailInvoices = invoices.reduce((old, curr) => {
                if (curr.status === 'failed') return old + 1
                return old
              }, 0)
            })
          )
        })
        Promise.all(promises).then(values => {
          context.commit('setBeneficiaries', beneficiaries)
        })
      })
    },
    getBeneficiary (context, id) {
      return beneficiaryService.getBeneficiary(id)
    },
    deleteBeneficiary (context, id) {
      return beneficiaryService.deleteBeneficiary(id)
    },
    create (context, body) {
      return beneficiaryService.create(body)
    },
    update (context, {id, values}) {
      return beneficiaryService.update(id, values)
    },
    getOrganization (context, {id}) {
      return organizationService.getOrganization(id).then(organization => {
        context.commit('setOrganization', organization)
        return organization
      })
    },
    avatarUrl (context, id) {
      return `${config.media.beneficiary.url}avatar/${id}.png?a=${Math.random()}`
    }
  }
}

export default module
