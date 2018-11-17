import { organizationService } from '@/services'
import graphqlClient from '@/util/graphql'
import gql from 'graphql-tag'
import {currency, formatDate} from '@/helpers'

function calculateStripeCreditFee (amount, invoice) {
  return (((amount / 100) * (invoice.processingFees.cardFee / 100)) + invoice.processingFees.cardFeeFlat)
  // if (invoice.paymentDetails.paymentMethodtype === 'bank_account') {
  //   result = result - 0.25
  // }
}

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
        query: gql`query fetchBalanceHistory($account: String!, $payout: String!) {
          fetchBalanceHistory(account: $account, payout: $payout) {
            id
            amount
            net
            fee
            type
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
              processingFees {
                cardFee
                cardFeeFlat
                achFee
                achFeeFlat
                achFeeCap
              }
              paymentDetails {
                externalCustommerId
                statementDescriptor
                paymentMethodtype
                externalPaymentMethodId
                brand
                last4
              }
            }
            source {
              amount
              amount_refunded
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
      }).then(response => {
        return response.data.fetchBalanceHistory.map(tr => {
          let {processingFee, paidupFee, invoiceDate, program, netDeposit, processed} = ''
          let tags = []
          let totalFee
          if (tr.invoice) {
            invoiceDate = tr.invoice.dateCharge
            program = tr.invoice.productName
            tags = tr.invoice.tags
            if (tr.type === 'payment') {
              processed = currency(tr.source.amount / 100)
              netDeposit = currency(tr.net / 100)
              if (tr.invoice.paymentDetails.paymentMethodtype === 'card') {
                totalFee = currency(tr.fee / 100)
                processingFee = currency(calculateStripeCreditFee(tr.source.amount, tr.invoice))
                paidupFee = currency(totalFee - processingFee)
              }
              if (tr.invoice.paymentDetails.paymentMethodtype === 'bank_account') {
                totalFee = currency(tr.fee / 100)
                processingFee = currency(0)
                paidupFee = totalFee
              }
            }
            if (tr.type === 'adjustment') {
              processed = currency((tr.source.amount_refunded / 100) * -1)
              netDeposit = currency((tr.source.amount_refunded / 100) - (tr.amount / 100)) * -1
              if (tr.invoice.paymentDetails.paymentMethodtype === 'card') {
                totalFee = currency(tr.amount / 100) * -1
                processingFee = currency(calculateStripeCreditFee(tr.source.amount_refunded, tr.invoice)) * -1
                paidupFee = currency(totalFee - processingFee)
              }
              if (tr.invoice.paymentDetails.paymentMethodtype === 'bank_account') {
                totalFee = currency(tr.amount / 100) * -1
                processingFee = currency(0)
                paidupFee = totalFee
              }
            }
          }
          return {
            invoiceId: tr.source.source_transfer.source_transaction.metadata.invoiceId,
            invoiceDate,
            chargeDate: formatDate.unix(tr.source.source_transfer.source_transaction.created),
            processed,
            processingFee,
            paidupFee,
            totalFee: totalFee,
            netDeposit,
            description: tr.source.source_transfer.source_transaction.description,
            program,
            parentName: tr.source.source_transfer.source_transaction.metadata.userFirstName + ' ' + tr.source.source_transfer.source_transaction.metadata.userLastName,
            playerName: tr.source.source_transfer.source_transaction.metadata.beneficiaryFirstName + ' ' + tr.source.source_transfer.source_transaction.metadata.beneficiaryLastName,
            tags,
            index: `${tr.source.source_transfer.source_transaction.metadata.invoiceId} 
                    ${tr.source.source_transfer.source_transaction.description} 
                    ${tr.invoice ? tr.invoice.productName : ''} 
                    ${tr.source.source_transfer.source_transaction.metadata.userFirstName} ${tr.source.source_transfer.source_transaction.metadata.userLastName} 
                    ${tr.source.source_transfer.source_transaction.metadata.beneficiaryFirstName} ${tr.source.source_transfer.source_transaction.metadata.beneficiaryLastName}`
          }
        })
      })
    }
  }
}

export default module
