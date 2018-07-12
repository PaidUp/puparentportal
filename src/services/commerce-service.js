import Trae from '@/services/trae-service'
import config from '@/config'

const trae = new Trae(config.api.commerce)
let commerceService

class CommerceService {
  checkoutInvoice ({ order, dues, product }) {
    return trae
      .post('/invoice/checkout', { order, dues, product })
  }
  checkoutCredit ({ order, credits }) {
    return trae
      .post('/credit/checkout', { order, credits })
  }

  updateInvoice ({ id, values }) {
    return trae
      .put('/invoice', { id, values })
  }

  updateInvoiceCalculations ({ id, values, product }) {
    return trae
      .put('/invoice/calculations', { id, values, product })
  }

  invoicesByPayentMethod (paymentMethodId) {
    return trae
      .get(`/invoice/method/${paymentMethodId}`)
  }

  invoicesByBeneficiary (beneficiaryId, userEmail) {
    let query = ''
    if (userEmail) query = encodeURI(`?assegnee=${userEmail}`)
    return trae
      .get(`/invoice/beneficiary/${beneficiaryId}${query}`)
  }

  invoicesByOrganization (organizationId, seasonId, productId, beneficiaryId) {
    let params = `seasonId=${seasonId}`
    if (productId) params = `${params}&productId=${productId}`
    if (beneficiaryId) params = `${params}&beneficiaryId=${beneficiaryId}`
    return trae
      .get(`/invoice/organization/${organizationId}?${params}`)
  }

  creditsByOrganization (organizationId, seasonId, productId, beneficiaryId) {
    let params = `seasonId=${seasonId}`
    if (productId) params = `${params}&productId=${productId}`
    if (beneficiaryId) params = `${params}&beneficiaryId=${beneficiaryId}`
    return trae
      .get(`/credit/organization/${organizationId}?${params}`)
  }

  preordersByOrganization (organizationId, seasonId, productId, beneficiaryId) {
    let params = `seasonId=${seasonId}`
    if (productId) params = `${params}&productId=${productId}`
    if (beneficiaryId) params = `${params}&beneficiaryId=${beneficiaryId}`
    return trae
      .get(`/preorder/organization/${organizationId}?${params}`)
  }

  preordersByBeneficiary (beneficiaryId, userEmail) {
    let query = ''
    if (userEmail) query = encodeURI(`?assegnee=${userEmail}`)
    return trae
      .get(`/preorder/beneficiary/${beneficiaryId}${query}`)
  }

  inactivePreorder (id) {
    return trae
      .put('/preorder', { id, values: { status: 'inactive' } })
  }

  creditsByBeneficiary (beneficiaryId, userEmail) {
    let query = ''
    if (userEmail) query = encodeURI(`?assegnee=${userEmail}`)
    return trae
      .get(`/credit/beneficiary/${beneficiaryId}${query}`)
  }
}

commerceService = new CommerceService()

export default commerceService
