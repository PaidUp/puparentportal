import Trae from '@/services/trae-service'
import config from '@/config'

const trae = new Trae(config.api.organization + '/beneficiary')
let organizationService

class OrganizationService {
  create = function ({ organizationId, firstName, lastName, assigneesEmail, description }) {
    return trae
      .post('/beneficiary', { organizationId, firstName, lastName, assigneesEmail, description })
  }
}

organizationService = new OrganizationService()

export default organizationService
