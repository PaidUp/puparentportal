import Trae from '@/services/trae-service'
import config from '@/config'

const trae = new Trae(config.api.organization + '/product')
let productService

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

  getPlans (productId) {
    return trae
      .get(`/${productId}/plans`)
  }

  getPlan (productId, planId) {
    return trae
      .get(`/${productId}/plan/${planId}`)
  }
}

productService = new ProductService()

export default productService
