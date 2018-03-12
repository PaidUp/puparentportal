import Trae from '@/services/trae-service'
import config from '@/config'

const trae = new Trae(config.api.commerce)
let commerceService

class CommerceService {
  createOrder ({ planId, beneficiaryFirstName, beneficiaryLastName, paymentMethodtype,
    externalPaymentMethodId, brand, last4, customInfo }) {
    return trae
      .post('/customer', { planId,
        beneficiaryFirstName,
        beneficiaryLastName,
        paymentMethodtype,
        externalPaymentMethodId,
        brand,
        last4,
        customInfo })
  }
}

commerceService = new CommerceService()

export default commerceService
