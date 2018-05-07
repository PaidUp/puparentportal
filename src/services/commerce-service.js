import Trae from '@/services/trae-service'
import config from '@/config'

const trae = new Trae(config.api.commerce)
let commerceService

class CommerceService {
  checkout ({ order, dues, product }) {
    return trae
      .post('/invoice/checkout', { order, dues, product })
  }

  invoicesByPayentMethod (paymentMethodId) {
    return trae
      .get(`/invoice/method/${paymentMethodId}`)
  }

  invoicesByBeneficiary (beneficiaryId) {
    return trae
      .get(`/invoice/beneficiary/${beneficiaryId}`)
  }

  creditsByBeneficiary (beneficiaryId) {
    return trae
      .get(`/credit/beneficiary/${beneficiaryId}`)
  }
}

commerceService = new CommerceService()

export default commerceService
