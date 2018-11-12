import { organizationService } from '@/services'
import graphqlClient from '@/util/graphql'
import gql from 'graphql-tag'

const module = {
  namespaced: true,
  state: {
    organizations: [],
    plans: {},
    payments: [],
    payouts: [],
    transfers: []
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
    },
    setTransfers (state, transfers) {
      state.transfers = transfers
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
            source_type
          }
        }`,
        variables: { account },
        skip () {
          return !account
        }
      })
      commit('setPayouts', response.data.fetchPayouts)
    },
    async fetchTransfers ({ commit }, { account, arrival, source }) {
      const response = await graphqlClient.query({
        query: gql`query fetchTransfers($account: String!, $arrival: Int!, $source: String!) {
          fetchTransfers(account: $account, arrival: $arrival, source: $source) {
            _id
            id
            amount
            amount_reversed
            source_transaction {
              created
              description
              application_fee {
                amount
                amount_refunded
                balance_transaction {
                  available_on
                }
              }
              metadata {
                organizationName
                productName
                beneficiaryFirstName
                beneficiaryLastName
                invoiceId
                userFirstName
                userLastName
                userEmail
              }
            }
          }
        }`,
        variables: { account, arrival, source },
        skip () {
          return !account
        }
      })
      commit('setTransfers', response.data.fetchTransfers)
    }
  }
}

export default module
