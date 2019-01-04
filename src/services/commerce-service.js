import Trae from '@/services/trae-service'
import config from '@/config'
import graphqlClient from '@/util/graphql'
import gql from 'graphql-tag'

const trae = new Trae(config.api.commerce)

class CommerceService {
  checkout ({ order, dues, product, credits }) {
    return trae
      .post('/checkout', { order, dues, product, credits })
  }

  updateInvoice ({ id, values }) {
    return trae
      .put('/invoice', { id, values })
  }

  deleteInvoice (id) {
    return trae
      .delete(`/invoice/${id}`)
  }

  updateCredit ({ id, values }) {
    return trae
      .put('/credit', { id, values })
  }

  deleteCredit (id) {
    return trae
      .delete(`/credit/${id}`)
  }

  updateInvoiceCalculations ({ id, values, product }) {
    return trae
      .put('/invoice/calculations', { id, values, product })
  }

  newInvoice ({ id, values, product }) {
    return trae
      .put('/invoice/new', { id, values, product })
  }

  getInvoice (id) {
    return trae
      .get(`/invoice/${id}`)
  }

  newCredit (params) {
    return trae
      .post('/credit', params)
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

  creditsByBeneficiary (beneficiaryId, userEmail) {
    let query = ''
    if (userEmail) query = encodeURI(`?assegnee=${userEmail}`)
    return trae
      .get(`/credit/beneficiary/${beneficiaryId}${query}`)
  }

  async getReducePlayers ({ organizationId, seasonId, productId }) {
    const response = await graphqlClient.query({
      query: gql`query getReducePlayers(
        $organizationId: String!
        $seasonId: String!
        $productId: String!
      ) {
        getReducePlayers(
          organizationId: $organizationId
          seasonId: $seasonId
          productId: $productId
        ) {
          id
          firstName
          lastName
          total
          assigneesEmail
          paid
          unpaid
          overdue
          other
        }
      }`,
      variables: { organizationId, seasonId, productId }
    })
    return response.data.getReducePlayers
  }
}

export const commerceService = new CommerceService()
// export default commerceService
