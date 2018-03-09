import Trae from '@/services/trae-service'
import config from '@/config'

const trae = new Trae(config.api.organization)
let organizationService

class OrganizationService {
  getAll () {
    return trae
      .get('/')
  }
}

organizationService = new OrganizationService()

export default organizationService
