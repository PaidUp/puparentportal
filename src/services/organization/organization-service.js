import Trae from '@/services/trae-service'
import config from '@/config'

const trae = new Trae(config.api.organization)
let organizationService

class OrganizationService {
  getAll ({ organizationId, firstName, lastName, assigneesEmail, description }) {
    return trae
      .post('/', { organizationId, firstName, lastName, assigneesEmail, description })
  }
}

organizationService = new OrganizationService()

export default organizationService
