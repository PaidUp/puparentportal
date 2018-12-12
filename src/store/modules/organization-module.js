import { organizationService } from '@/services'
import graphqlClient from '@/util/graphql'
import gql from 'graphql-tag'
import {currency} from '@/helpers'

const module = {
  namespaced: true,
  state: {
    loading: false,
    organizations: [],
    plans: {},
    payments: []
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
    fetchPayments ({ commit }, { organizationId, seasonId }) {
      return graphqlClient.query({
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
      }).then(response => {
        commit('setPayments', response.data.payments)
      })
    },
    fetchPayouts ({ commit }, { account, startingAfter, endingBefore }) {
      return graphqlClient.query({
        query: gql`query fetchPayouts($account: String!, $startingAfter: String, $endingBefore: String) {
          fetchPayouts(account: $account, startingAfter: $startingAfter, endingBefore: $endingBefore) {
            has_more
            data {
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
          }
        }`,
        variables: { account, startingAfter, endingBefore },
        skip () {
          return !account
        }
      }).then(response => {
        return response.data.fetchPayouts
      })
    },
    fetchBalanceHistory ({ commit }, { account, payout }) {
      return graphqlClient.query({
        query: gql`
          query fetchBalanceHistory($account: String!, $payout: String!) {
            fetchBalanceHistory(account: $account, payout: $payout) {
              invoiceId
              invoiceDate
              chargeDate
              processed
              processingFee
              paidupFee
              totalFee
              netDeposit
              adjustment
              description
              program
              parentName
              playerName
              tags
              index
            }
          }
        `,
        variables: { account, payout },
        skip () {
          return !account
        }
      }).then(response => {
        return response.data.fetchBalanceHistory.map(tr => {
          tr.processed = currency(tr.processed)
          tr.processingFee = currency(tr.processingFee)
          tr.paidupFee = currency(tr.paidupFee)
          tr.netDeposit = currency(tr.netDeposit)
          tr.totalFee = currency(tr.totalFee)
          tr.adjustment = currency(tr.adjustment)
          return tr
        })
      })
    }
  }
}

export default module
