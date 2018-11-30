import { paymentService, organizationService, productService, commerceService } from '@/services'

const module = {
  namespaced: true,

  state: {
    playerSelected: null,
    seasonSelected: null,
    programSelected: {},
    paymentPlanSelected: null,
    paymentAccountSelected: null,
    dues: {},

    cards: [],
    bankAccounts: [],
    products: null,
    plans: [],
    stripe: null,
    cardElement: null
  },

  getters: {
    paymentAccounts (state) {
      return state.cards.concat(state.bankAccounts)
    }
  },

  mutations: {
    setStripe (state, stripe) {
      state.stripe = stripe
      state.cardElement = stripe.elements().create('card')
    },
    clean (state) {
      state.playerSelected = null
      state.programSelected = {}
      state.paymentPlanSelected = null
      state.paymentAccountSelected = null
      state.dues = {}
      // state.cards = []
      // state.bankAccounts = []
      state.products = null
      state.plans = []
      state.seasonSelected = null
    },
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
    delCard (state, cardId) {
      state.cards = state.cards.filter(card => {
        return cardId !== card.id
      })
    },
    delBank (state, bankId) {
      state.bankAccounts = state.bankAccounts.filter(bank => {
        return bankId !== bank.id
      })
    },
    setPlayerSelected (state, playerSelected) {
      state.playerSelected = playerSelected
    },
    setProgramSelected (state, programSelected) {
      state.programSelected = programSelected
    },
    setPaymentAccountSelected (state, paymentAccountSelected) {
      state.paymentAccountSelected = paymentAccountSelected
    },
    setPaymentPlanSelected (state, paymentPlanSelected) {
      state.paymentPlanSelected = paymentPlanSelected
    },
    setDues (state, dues) {
      state.dues = dues
    },
    setSeasonSelected (state, season) {
      state.seasonSelected = season
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
          }).catch(reason => {
            reject(reason)
          })
        } else {
          paymentService.associateCard(user.externalCustomerId, token).then(card => {
            context.commit('pushCard', card)
            resolve(card)
          }).catch(reason => {
            reject(reason)
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
              resolve(bank)
            }).catch(reason => reject(reason))
          })
        } else {
          paymentService.associateBank(user.externalCustomerId, publicToken, accountId).then(bank => {
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
    removeBank (context, { user, bankId }) {
      if (user.externalCustomerId) {
        return paymentService.removeBank(user.externalCustomerId, bankId)
      }
    },
    getProducts (context, organizationId) {
      return organizationService.getProducts(organizationId).then(products => {
        context.commit('setProducts', products)
        return products
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
    checkout (context) {
      let order = {
        organizationId: context.state.playerSelected.organizationId,
        organizationName: context.state.playerSelected.organizationName,
        productId: context.state.programSelected._id,
        productName: context.state.programSelected.name,
        season: context.state.programSelected.season,
        beneficiaryId: context.state.playerSelected._id,
        beneficiaryFirstName: context.state.playerSelected.firstName,
        beneficiaryLastName: context.state.playerSelected.lastName,
        preorderId: context.state.paymentPlanSelected.preorderId,
        planGroupId: context.state.paymentPlanSelected.groupId
      }
      return new Promise((resolve, reject) => {
        commerceService.checkout({
          order,
          dues: context.state.paymentPlanSelected.dues,
          credits: context.state.paymentPlanSelected.credits,
          product: context.state.programSelected
        }).then(resp => {
          resolve(resp)
        }).catch(reason => {
          reject(reason)
        })
      })
    },
    updateInvoice (context, { id, values }) {
      return commerceService.updateInvoice({ id, values })
    }
  }
}

export default module
