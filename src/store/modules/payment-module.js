import { paymentService } from '@/services'
import { createToken } from 'vue-stripe-elements-plus'

const module = {
  namespaced: true,

  state: {
    cardAccounts: [],
    bankAccounts: []
  },

  getters: {
  },

  mutations: {
  },

  actions: {
    addCard (context, user) {
      return new Promise((resolve, reject) => {
        createToken().then(data => {
          const token = data.token.id
          if (!user.externalCustomerId) {
            paymentService.createCustomer(user, token).then(externalCustomer => {
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
              resolve(bank)
            }).catch(reason => reject(reason))
          })
        } else {
          paymentService.associateBank(user.externalCustomerId, publicToken, accountId).then(bank => {
            resolve(bank)
          }).catch(reason => reject(reason))
        }
      })
    }
  }
}

export default module
