import Trae from '@/services/trae-service'
import config from '@/config'
import _trae from 'trae'

const trae = new Trae(config.api.organization + '/beneficiary')
let beneficiaryService

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

  avatar = function (id) {
    let urlPath = `${config.media.beneficiary.url}avatar/${id}.png`
    return _trae.get(urlPath, { })
      .then((response) => {
        return urlPath
      }).catch(reason => {
        return null
      })
  }
}

beneficiaryService = new BeneficiaryService()

export default beneficiaryService
