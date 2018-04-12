import { paymentService } from '@/services'
import { createToken } from 'vue-stripe-elements-plus'

const module = {
  namespaced: true,

  state: {
    active: 'step1',
    step1: false,
    step2: false,
    step3: false,
    check1: false,
    check2: false,
    check3: false,
    selectedDate: null,
    cards: [],
    bankAccounts: []
  },

  getters: {
    paymentAccounts (state) {
      return state.cards.concat(state.bankAccounts)
    }
  },

  mutations: {
    setDone (state, { id, index }) {
      state[ id ] = true
      if (index) {
        state.active = index
      }
    },
    setCards (state, cards) {
      state.cards = cards
    },
    setBankAccounts (state, bankAccounts) {
      state.bankAccounts = bankAccounts
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
    addCard (context, user) {
      return new Promise((resolve, reject) => {
        createToken().then(data => {
          const token = data.token.id
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
        paymentService.removeCard(user.externalCustomerId, cardId).then(banks => {
          context.commit('setBankAccounts', banks.data)
        })
      }
    }
  }
}

export default module
