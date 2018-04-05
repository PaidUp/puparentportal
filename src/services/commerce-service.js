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

  ordersByPlayer (params) {
    const organizationId = encodeURI(params.organizationId)
    const beneficiaryFirstName = encodeURI(params.firstName)
    const beneficiaryLastName = encodeURI(params.lastName)
    const userEmail = encodeURI(params.userEmail)
    return trae
      .get(`/order/beneficiary?organizationId=${organizationId}&beneficiaryFirstName=${beneficiaryFirstName}&beneficiaryLastName=${beneficiaryLastName}&userEmail=${userEmail}`)
  }
}

commerceService = new CommerceService()

export default commerceService
