import Trae from '@/services/trae-service'
import config from '@/config'

const trae = new Trae(config.api.payment)
let paymentService

class PaymentService {
  createCustomer (user, source) {
    let p = {
      description: `${user.firstName} ${user.lastName}`,
      email: user.email,
      paymentId: user._id,
      source
    }
    return trae
      .post('/customer', p)
  }

  associateCard (customerId, token) {
    let p = {
      customerId,
      token
    }
    return trae
      .post('/customer/card', p)
  }

  associateBank (customerId, publicToken, accountId) {
    let p = {
      customerId,
      publicToken,
      accountId
    }
    return trae
      .post('/customer/bank', p)
  }

  listCards (customerId) {
    return trae
      .get(`/customer/${customerId}/cards`)
  }

  listBanks (customerId) {
    return trae
      .get(`/customer/${customerId}/banks`)
  }

  removeCard (customerId, cardId) {
    return trae
      .put('/customer/card', { customerId, cardId })
  }

  removeBank (customerId, bankId) {
    return trae
      .put('/customer/bank', { customerId, bankId })
  }

  refundInvoice (chargeId, reason, amount) {
    return trae
      .put('/customer/refund', { chargeId, reason, amount })
  }
}

paymentService = new PaymentService()

export default paymentService
