import Trae from '@/services/trae-service'
import config from '@/config'

const trae = new Trae(config.api.payment)
let paymentService

class PaymentService {
  createCustomer = function (user, source) {
    let p = {
      description: `${user.firstName} ${user.lastName}`,
      email: user.email,
      paymentId: user._id,
      source
    }
    return trae
      .post('/customer', p)
  }

  associateCard = function (customerId, token) {
    let p = {
      customerId,
      token
    }
    return trae
      .post('/customer/card', p)
  }

  associateBank = function (customerId, publicToken, accountId) {
    let p = {
      customerId,
      publicToken,
      accountId
    }
    return trae
      .post('/customer/bank', p)
  }
}

paymentService = new PaymentService()

export default paymentService
