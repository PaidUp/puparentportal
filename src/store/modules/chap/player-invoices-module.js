import { userService, paymentService, commerceService, productService } from '@/services'

const module = {
  namespaced: true,
  state: {
    beneficiary: null,
    parents: null,
    paymentMethods: {}
  },
  mutations: {
    setParents (state, parents) {
      state.parents = parents
    },
    setBeneficiary (state, beneficiary) {
      state.beneficiary = beneficiary
    },
    setPaymentMethods (state, paymentMethods) {
      state.paymentMethods = paymentMethods
    }
  },
  actions: {
    getProduct (context, id) {
      return productService.getProduct(id)
    },
    loadParents (context, beneficiary) {
      let parentsPromise = []
      if (beneficiary.assigneesEmail) {
        beneficiary.assigneesEmail.forEach(email => {
          parentsPromise.push(userService.getByEmail(email))
        })
        Promise.all(parentsPromise).then(values => {
          context.commit('setParents', values)
        })
      } else {
        context.commit('setParents', null)
      }
    },
    loadPaymentMethods (context) {
      if (context.state.parents) {
        let parentsAccPromises = []
        context.state.parents.forEach(parent => {
          if (parent.externalCustomerId) {
            parentsAccPromises.push(
              new Promise((resolve, reject) => {
                let accountsPromise = []
                accountsPromise.push(
                  paymentService.listCards(parent.externalCustomerId).then(results => results.data)
                )
                accountsPromise.push(
                  paymentService.listBanks(parent.externalCustomerId).then(results => results.data)
                )
                Promise.all(accountsPromise).then(accs => {
                  let concat = accs[0].concat(accs[1])
                  resolve({
                    id: parent._id,
                    accounts: concat
                  })
                })
              })
            )
          }
        })
        Promise.all(parentsAccPromises).then(values => {
          let resp = {}
          values.forEach(val => {
            resp[val.id] = val.accounts
          })
          context.commit('setPaymentMethods', resp)
        })
      }
    },
    update (context, params) {
      return commerceService.updateInvoiceCalculations(params)
    },
    new (context, params) {
      return commerceService.newInvoice(params)
    },
    getInvoiceById (context, id) {
      return commerceService.getInvoice(id)
    },
    deleteInvoice (context, id) {
      return commerceService.deleteInvoice(id)
    },
    newCredit (context, params) {
      return commerceService.newCredit(params)
    },
    updateCredit (context, params) {
      return commerceService.updateCredit(params)
    },
    deleteCredit (context, id) {
      return commerceService.deleteCredit(id)
    }
  }
}

export default module
