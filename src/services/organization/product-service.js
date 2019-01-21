import Trae from '@/services/trae-service'
import config from '@/config'
import graphqlClient from '@/util/graphql'
import gql from 'graphql-tag'

const trae = new Trae(config.api.organization + '/product')

class ProductService {
  create ({organizationId, season, sku, name, description, image,
    statementDescriptor, status = 'active', customInfo, processingFees,
    collectFees, payFees }) {
    return trae
      .post('/', { organizationId,
        season,
        sku,
        name,
        description,
        image,
        statementDescriptor,
        status,
        customInfo,
        processingFees,
        collectFees,
        payFees })
  }

  update (productId, params) {
    return trae
      .put(`/${productId}`, params)
  }

  getProduct (productId) {
    return trae
      .get(`/${productId}`)
  }

  async getPlans (productId) {
    const response = await graphqlClient.query({
      query: gql`query getPlans($productId: String!) {
        getPlans(productId: $productId) {
          _id
          key
          groupId
          description
          paymentMethods
          visible
          status
          credits {
            _id
            description
            dateCharge
            amount
            status
          }
          dues {
            _id
            description
            dateCharge
            maxDateCharge
            amount
          }
          productId
        }
      }`,
      variables: { productId }
    })
    return response.data.getPlans
  }

  async getReducePlans (productId) {
    const response = await graphqlClient.query({
      query: gql`query getReducePlans($productId: String!) {
        getReducePlans(productId: $productId) {
          id
          description
          amount
          installments
          startCharge
          endCharge
        }
      }`,
      variables: { productId }
    })
    return response.data.getReducePlans
  }

  getPlan (productId, planId) {
    return trae
      .get(`/${productId}/plan/${planId}`)
  }
}

export const productService = new ProductService()
// export default productService
