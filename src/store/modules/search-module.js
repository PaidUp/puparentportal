import graphqlClient from '@/util/graphql'
import gql from 'graphql-tag'

const module = {
  namespaced: true,
  state: {
    searchResult: {
      users: [],
      beneficiaries: [],
      invoices: [],
      credits: [],
      preorders: []
    }
  },
  mutations: {
    setSearchResult (state, result) {
      state.searchResult = result
    }
  },
  actions: {
    async search ({ commit }, criteria) {
      const response = await graphqlClient.query({
        query: gql`query ASearch($criteria: String!) {
          search(criteria: $criteria) {
            users {
              _id
              firstName
              lastName
              email
              phone
            }
            beneficiaries {
              _id
              firstName
              lastName
              organizationId
              organizationName
              assigneesEmail
            }
            invoices {
              _id
              invoiceId
              beneficiaryId
              beneficiaryFirstName
              beneficiaryLastName
              organizationId
              organizationName
              productId
              productName
              season
              user {
                userFirstName
                userLastName
                userEmail
              }
            },
            credits {
              _id
              memoId,
              label,
              assigneeEmail
              organizationId
              productId
              productName
              season
              beneficiaryId
            },
            preorders {
              _id
              productName
              assigneeEmail
              organizationId
              productId
              season
              beneficiaryId,
              status
            }
          }
        }`,
        variables: { criteria },
        skip () {
          return criteria || criteria.length < 4
        }
      })
      commit('setSearchResult', response.data.search)
    }
  }
}

export default module
