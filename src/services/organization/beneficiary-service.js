import Trae from '@/services/trae-service'
import config from '@/config'

const trae = new Trae(config.api.organization + '/beneficiary')
let beneficiaryService

class BeneficiaryService {
  create ({ organizationId, firstName, lastName, assigneesEmail, description }) {
    return trae
      .post('/', { organizationId, firstName, lastName, assigneesEmail, description })
  }

  import = function (beneficiaries) {
    return trae
      .post('/import', beneficiaries)
  }

  beneficiariesByAssegnee = function (assigneeEmail) {
    return trae
      .get(`/assegnee/${assigneeEmail}`)
  }
}

beneficiaryService = new BeneficiaryService()

export default beneficiaryService