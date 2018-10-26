import Trae from '@/services/trae-service'
import config from '@/config'

const trae = new Trae(config.api.organization + '/beneficiary')

class BeneficiaryService {
  create ({ organizationId, organizationName, firstName, lastName, assigneesEmail, description }) {
    return trae
      .post('/', { organizationId, organizationName, firstName, lastName, assigneesEmail, description })
  }
  update (id, values) {
    return trae
      .put('/' + id, values)
  }

  import = function (beneficiaries) {
    return trae
      .post('/import', beneficiaries)
  }

  beneficiariesByAssignee = function (assigneeEmail) {
    return trae
      .get(`/assignee/${assigneeEmail}`)
  }

  getBeneficiary = function (id) {
    return trae
      .get(`/${id}`)
  }

  deleteBeneficiary = function (id) {
    return trae
      .delete(`/${id}`)
  }
}

export const beneficiaryService = new BeneficiaryService()
// export default beneficiaryService
