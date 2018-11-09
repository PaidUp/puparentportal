import { organizationService } from '@/services'
import graphqlClient from '@/util/graphql'
import gql from 'graphql-tag'

const module = {
  namespaced: true,
  state: {
    organizations: [],
    plans: {},
    payments: [],
    payouts: []
  },
  mutations: {
    setOrganizations (state, organizations) {
      state.organizations = organizations
    },
    setOrganization (state, organization) {
      state.organization = organization
    },
    setPayments (state, payments) {
      state.payments = payments
    },
    setPayouts (state, payouts) {
      state.payouts = payouts
    }
  },
  actions: {
    getOrganizations (context) {
      organizationService.getAll().then(organizations => {
        context.commit('setOrganizations', organizations)
      })
    },
    getOrganization (context, organizationId) {
      return organizationService.getOrganization(organizationId)
    },
    async fetchPayments ({ commit }, { organizationId, seasonId }) {
      const response = await graphqlClient.query({
        query: gql`query APayments($organizationId: String!, $seasonId: String!) {
          payments(organizationId: $organizationId, seasonId: $seasonId) {
            receiptId
            type
            chargeDate
            receiptDate
            description
            program
            status
            parentName
            parentEmail
            parentPhone
            playerName
            amount
            processingFee
            paidupFee
            totalFee,
            tags,
            paymentMethodBrand,
            paymentMethodLast4,
            index
          }
        }`,
        variables: { organizationId, seasonId },
        skip () {
          return !organizationId || !seasonId
        }
      })
      commit('setPayments', response.data.payments)
    },
    async fetchPayouts ({ commit }, account) {
      const response = await graphqlClient.query({
        query: gql`query fetchPayouts($account: String!) {
          fetchPayouts(account: $account) {
            _id
            id
            amount
            arrival_date
            destination {
              account
              bank_name
              last4
            }
            status
          }
        }`,
        variables: { account },
        skip () {
          return !account
        }
      })
      commit('setPayouts', response.data.fetchPayouts)
    }
  }
}

export default module
