import { organizationService } from '@/services'
import graphqlClient from '@/util/graphql'
import gql from 'graphql-tag'
import {currency, formatDate} from '@/helpers'

const module = {
  namespaced: true,
  state: {
    loading: false,
    organizations: [],
    plans: {},
    payments: [],
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
    fetchPayouts ({ commit }, { account, startingAfter }) {
      return graphqlClient.query({
        query: gql`query fetchPayouts($account: String!) {
          fetchPayouts(account: $account) {
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
        variables: { account, startingAfter },
        skip () {
          return !account
        }
      }).then(response => {
        return response.data.fetchPayouts
      })
    },
    async fetchBalanceHistory ({ commit }, { account, payout }) {
      const response = await graphqlClient.query({
        query: gql`query fetchBalanceHistory($account: String!, $payout: String!) {
          fetchBalanceHistory(account: $account, payout: $payout) {
            id
            amount
            net
            fee
            invoice {
              _id
              label
              tags
              season
              dateCharge
              price
              paidupFee
              stripeFee
              totalFee
              priceBase
              productName
              status
            }
            source {
              source_transfer {
                source_transaction {
                  id
                  amount
                  amount_refunded
                  description
                  created
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
            }
          }
        }`,
        variables: { account, payout },
        skip () {
          return !account
        }
      })
      const transfers = response.data.fetchBalanceHistory.map(tr => {
        return {
          invoiceId: tr.source.source_transfer.source_transaction.metadata.invoiceId,
          invoiceDate: tr.invoice ? tr.invoice.dateCharge : '',
          chargeDate: formatDate.unix(tr.source.source_transfer.source_transaction.created),
          processed: currency(tr.amount / 100),
          processingFee: tr.invoice ? currency(tr.invoice.stripeFee) : '',
          paidupFee: tr.invoice ? currency(tr.invoice.paidupFee) : '',
          totalFee: tr.invoice ? currency(tr.invoice.totalFee) : '',
          netDeposit: currency(tr.net / 100),
          description: tr.source.source_transfer.source_transaction.description,
          program: tr.invoice ? tr.invoice.productName : '',
          parentName: tr.source.source_transfer.source_transaction.metadata.userFirstName + ' ' + tr.source.source_transfer.source_transaction.metadata.userLastName,
          playerName: tr.source.source_transfer.source_transaction.metadata.beneficiaryFirstName + ' ' + tr.source.source_transfer.source_transaction.metadata.beneficiaryLastName,
          tags: tr.invoice ? tr.invoice.tags : [],
          index: `${tr.source.source_transfer.source_transaction.metadata.invoiceId} 
                  ${tr.source.source_transfer.source_transaction.description} 
                  ${tr.invoice ? tr.invoice.productName : ''} 
                  ${tr.source.source_transfer.source_transaction.metadata.userFirstName} ${tr.source.source_transfer.source_transaction.metadata.userLastName} 
                  ${tr.source.source_transfer.source_transaction.metadata.beneficiaryFirstName} ${tr.source.source_transfer.source_transaction.metadata.beneficiaryLastName}`
        }
      })
      commit('setTransfers', transfers)
    }
  }
}

export default module
