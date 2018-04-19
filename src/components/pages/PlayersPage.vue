<template lang="pug">
  .players-page
    .player
      v-player-info(v-if="beneficiary" :player="beneficiary")
    .player-empty(v-if="showEmpty")
      div(class="title bold cgray") Enzo does not have any payment history yet.
      div(class="cgray") Start by making a payment to Isotopes Volleyball Club.
      md-button(class="md-raised md-accent lblue") MAKE A NEW PAYMENT
      div
        img(src="@/assets/icons/ico02-01.svg" alt="pay")
    .player-with-payments(v-if="!showEmpty")
      .details
        .md-subheading.title Details
        md-content.md-elevation-4.details-box
          v-player-details-selection(:orders="orders")
          v-player-details-totals(:invoices="invoices")
      button(class="md-button md-raised" v-on:click="openViewInvoiceDialog") View Invoice
      button(class="md-button md-raised" v-on:click="openPaymentAccountsDialog") Payments Accounts
      .invoices(v-if="invoices")
        .md-subheading.title Invoices
        .inv-cards
          v-player-invoices(:invoice="invoice" v-for="invoice in invoices" :key="invoice._id")
    ViewInvoiceDialog(:invoice="viewInvoice" :closeDialog="closeDialog")
    PaymentAccountsDialog(:accounts="paymentsAccounts" :closeDialog="closeDialog")
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex'
  import VPlayerInfo from '@/components/shared/VPlayerInfo.vue'
  import VPlayerDetailsTotals from '@/components/shared/VPlayerDetailsTotals.vue'
  import VPlayerDetailsSelection from '@/components/shared/VPlayerDetailsSelection.vue'
  import VPlayerInvoices from '@/components/shared/VPlayerInvoices.vue'
  import ViewInvoiceDialog from '@/components/shared/ViewInvoiceDialog.vue'
  import PaymentAccountsDialog from '@/components/shared/PaymentAccountsDialog.vue'
  export default {
    components: {
      VPlayerInfo,
      VPlayerInvoices,
      VPlayerDetailsTotals,
      VPlayerDetailsSelection,
      ViewInvoiceDialog,
      PaymentAccountsDialog
    },
    data: function () {
      return {
        viewInvoice: null,
        paymentsAccounts: null
      }
    },
    computed: {
      ...mapState('userModule', {
        user: 'user'
      }),
      ...mapState('playerModule', {
        orders: 'orders',
        beneficiaries: 'beneficiaries'
      }),
      ...mapGetters('playerModule', {
        invoices: 'invoices'
      }),
      showEmpty () {
        return this.$route.params.id === '99'
      },
      beneficiary () {
        if (this.beneficiaries) {
          let id = this.$route.params.id
          return this.beneficiaries.find(function (element) {
            return element._id === id
          })
        }
        return null
      },
      loaded () {
        return (this.user && this.beneficiary)
      }
    },
    mounted () {
      if (this.loaded) {
        this.getOrders({ userEmail: this.user.email, beneficiary: this.beneficiary })
      }
    },
    watch: {
      loaded () {
        this.getOrders({ userEmail: this.user.email, beneficiary: this.beneficiary })
      }
    },
    methods: {
      ...mapActions('playerModule', {
        getOrders: 'getOrders'
      }),
      closeDialog: function () {
        this.viewInvoice = null
        this.paymentsAccounts = null
      },
      openViewInvoiceDialog: function () {
        this.viewInvoice = {title: 'some'}
      },
      openPaymentAccountsDialog: function () {
        this.paymentsAccounts = {title: 'some'}
      }
    }
  }
</script>
