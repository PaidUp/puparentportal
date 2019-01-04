import Trae from '@/services/trae-service'
import config from '@/config'
import gql from 'graphql-tag'
import graphqlClient from '@/util/graphql'

const trae = new Trae(config.api.organization + '/beneficiary')

class BeneficiaryService {
  // create ({ organizationId, organizationName, firstName, lastName, assigneesEmail, description }) {
  //   return trae
  //     .post('/', { organizationId, organizationName, firstName, lastName, assigneesEmail, description })
  // }
  async create ({ organizationId, organizationName, firstName, lastName, assigneesEmail, description }) {
    const response = await graphqlClient.mutate({
      mutation: gql`mutation createBeneficiary(
        $organizationId: String!
        $organizationName: String!
        $firstName: String!
        $lastName: String!
        $assigneesEmail: [String]
        $description: String
      ) {
        createBeneficiary(
          organizationId: $organizationId
          organizationName: $organizationName
          firstName: $firstName
          lastName: $lastName
          assigneesEmail: $assigneesEmail
          description: $description
        ) {
          _id
          organizationId
          organizationName
          type
          firstName
          lastName
          description
          assigneesEmail
          status
        }
      }`,
      variables: { organizationId, organizationName, firstName, lastName, assigneesEmail, description }
    })
    return response.data.createBeneficiary
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
