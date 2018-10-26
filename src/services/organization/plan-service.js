import Trae from '@/services/trae-service'
import config from '@/config'

const trae = new Trae(config.api.organization + '/plan')

class PlanService {
  create ({ key, productId, description, visible = true, status = 'active',
    paymentMethods, dues }) {
    return trae
      .post('/', { key, productId, description, visible, status, paymentMethods, dues })
  }

  update (planId, params) {
    return trae
      .put(`/${planId}`, params)
  }

  getPlan (planId) {
    return trae
      .get(`/${planId}`)
  }
}

export const planService = new PlanService()
// export default planService
