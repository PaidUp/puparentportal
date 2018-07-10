import { userService, paymentService } from '@/services'

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
    loadParents (context, beneficiary) {
      let parentsPromise = []
      beneficiary.assigneesEmail.forEach(email => {
        parentsPromise.push(userService.getByEmail(email))
      })
      Promise.all(parentsPromise).then(values => {
        context.commit('setParents', values)
      })
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
                    email: parent.email,
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
            resp[val.email] = val.accounts
          })
          context.commit('setPaymentMethods', resp)
        })
      }
    }
  }
}

export default module
