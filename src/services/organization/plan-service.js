import Trae from '@/services/trae-service'
import config from '@/config'
import gql from 'graphql-tag'
import graphqlClient from '@/util/graphql'

const trae = new Trae(config.api.organization + '/plan')

class PlanService {
  async create ({ key, groupId, productId, description, visible = true, status = 'active',
    paymentMethods, credits, dues }) {
    const response = await graphqlClient.mutate({
      mutation: gql`mutation createPaymentPlan(
        $key: String!
        $groupId: String!
        $description: String!
        $paymentMethods: [String]
        $visible: Boolean
        $status: String!
        $credits: [NewPaymentPlanCredits]
        $dues: [NewPaymentPlanDues]
        $productId: String!
      ) {
        createPaymentPlan(
          key: $key
          groupId: $groupId
          paymentMethods: $paymentMethods
          visible: $visible
          status: $status
          description: $description
          credits: $credits
          dues: $dues
          productId: $productId
        ) {
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
      }
      `,
      variables: { productId, key, groupId, description, paymentMethods, visible, status, credits, dues }
    })
    return response.data.createPaymentPlan
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
