import { paymentService, organizationService, productService, commerceService } from '@/services'

const module = {
  namespaced: true,

  state: {
    cards: [],
    bankAccounts: [],
    products: [],
    plans: []
  },

  getters: {
    paymentAccounts (state) {
      return state.cards.concat(state.bankAccounts)
    }
  },

  mutations: {
    setCards (state, cards) {
      state.cards = cards
    },
    setBankAccounts (state, bankAccounts) {
      state.bankAccounts = bankAccounts
    },
    setProducts (state, products) {
      state.products = products
    },
    setPlans (state, plans) {
      state.plans = plans
    },
    pushCard (state, card) {
      state.cards.push(card)
    },
    pushBankAccount (state, bankAccount) {
      state.bankAccounts.push(bankAccount)
    },
    delCard (state, cardId) {
      state.cards = state.cards.filter(card => {
        return cardId !== card.id
      })
    },
    delBank (state, bankId) {
      state.bankAccounts = state.bankAccounts.filter(bank => {
        return bankId !== bank.id
      })
    }
  },

  actions: {
    addCard (context, {user, token}) {
      return new Promise((resolve, reject) => {
        if (!user.externalCustomerId) {
          paymentService.createCustomer(user, token).then(externalCustomer => {
            context.commit('setCards', externalCustomer.sources.data)
            const externalCustomerId = externalCustomer.id
            return context.dispatch('userModule/update', {
              id: user._id,
              values: { externalCustomerId }
            }, {
              root: true
            })
          }).then(userUpd => {
            resolve(userUpd)
          })
        } else {
          paymentService.associateCard(user.externalCustomerId, token).then(card => {
            context.commit('pushCard', card)
            resolve(card)
          })
        }
      })
    },
    addBank (context, { user, publicToken, accountId }) {
      return new Promise((resolve, reject) => {
        if (!user.externalCustomerId) {
          paymentService.createCustomer(user).then(externalCustomer => {
            const externalCustomerId = externalCustomer.id
            return context.dispatch('userModule/update', {
              id: user._id,
              values: { externalCustomerId }
            }, {
              root: true
            })
          }).then(userUpd => {
            paymentService.associateBank(userUpd.externalCustomerId, publicToken, accountId).then(bank => {
              context.commit('pushBankAccounts', bank)
              resolve(bank)
            }).catch(reason => reject(reason))
          })
        } else {
          paymentService.associateBank(user.externalCustomerId, publicToken, accountId).then(bank => {
            context.commit('pushBankAccounts', bank)
            resolve(bank)
          }).catch(reason => reject(reason))
        }
      })
    },
    listCards (context, user) {
      if (user.externalCustomerId) {
        paymentService.listCards(user.externalCustomerId).then(cards => {
          context.commit('setCards', cards.data)
        })
      }
    },
    listBanks (context, user) {
      if (user.externalCustomerId) {
        paymentService.listBanks(user.externalCustomerId).then(banks => {
          context.commit('setBankAccounts', banks.data)
        })
      }
    },
    removeCard (context, { user, cardId }) {
      if (user.externalCustomerId) {
        return paymentService.removeCard(user.externalCustomerId, cardId)
      }
    },
    getProducts (context, organizationId) {
      organizationService.getProducts(organizationId).then(products => {
        context.commit('setProducts', products)
      })
    },
    getInvoicesByPaymetMethod (context, paymentMethodId) {
      return commerceService.invoicesByPayentMethod(paymentMethodId)
    },
    getPlans (context, productId) {
      productService.getPlans(productId).then(plans => {
        plans.forEach(plan => {
          if (plan.dues.length === 1) { plan.dues[0].dateCharge = new Date(plan.dues[0].dateCharge) }
          plan.dues = plan.dues.sort((dueA, dueB) => {
            dueA.dateCharge = new Date(dueA.dateCharge)
            dueB.dateCharge = new Date(dueB.dateCharge)
            return dueA.dateCharge.getTime() - dueB.dateCharge.getTime()
          })
        })
        context.commit('setPlans', plans)
      })
    },
    inactivePreorder (context, id) {
      return commerceService.inactivePreorder(id)
    },
    checkout (context, { playerSelected, programSelected, paymentAccountSelected, paymentPlanSelected }) {
      let order = {
        organizationId: playerSelected.organizationId,
        organizationName: playerSelected.organizationName,
        productId: programSelected._id,
        productName: programSelected.name,
        productImage: programSelected.image,
        season: programSelected.season,
        beneficiaryId: playerSelected._id,
        beneficiaryFirstName: playerSelected.firstName,
        beneficiaryLastName: playerSelected.lastName
      }
      let params = {
        order,
        dues: paymentPlanSelected.dues,
        product: programSelected
      }
      return commerceService.checkout(params)
    }
  }
}

export default module
