import Trae from '@/services/trae-service'
import config from '@/config'

const trae = new Trae(config.api.organization)
let organizationService

class OrganizationService {
  getAll () {
    return trae
      .get('/')
  }

  getOrganization (organizationId) {
    return trae
      .get(`/${organizationId}`)
  }
  updateOrganization (organizationId, params) {
    return trae
      .put(`/${organizationId}`, params)
  }

  getProducts (organizationId) {
    return trae
      .get(`/${organizationId}/products`)
  }

  getProduct (organizationId, productId) {
    return trae
      .get(`/${organizationId}/product/${productId}`)
  }

  getBeneficiaries (organizationId) {
    return trae
      .get(`/${organizationId}/beneficiaries`)
  }

  getBeneficiary (organizationId, beneficiaryId) {
    return trae
      .get(`/${organizationId}/beneficiary/${beneficiaryId}`)
  }
}

organizationService = new OrganizationService()

export default organizationService
