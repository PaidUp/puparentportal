<template lang="pug">
  .players-page
    .player
      v-player-info(v-if="beneficiary" :player="beneficiary")
    .player-empty(v-if="!allInvoices.length")
      div(class="title bold cgray") {{ beneficiary ? beneficiary.firstName : '' }} does not have any payment history yet.
      div(class="cgray") Start by making a payment to {{ beneficiary ? beneficiary.organizationName : '' }}.
      md-button(v-if="beneficiary" class="md-raised md-accent lblue" :to="'/payments/'+beneficiary._id") MAKE A NEW PAYMENT
      div
        img(src="@/assets/icons/ico02-01.svg" alt="pay")
    .player-with-payments(v-show="allInvoices.length")
      .details
        .md-subheading.title Details
        md-content.md-elevation-4.details-box
          v-player-details-selection(:invoices="allInvoices")
          v-player-details-totals(:invoices="invoices")
      .invoices(v-if="invoices")
        .md-subheading.title Invoices
        .inv-cards
          v-player-invoices(:invoice="invoice" v-for="invoice in invoices" :key="invoice._id" @select="selectInvoice")
    view-invoice-dialog(:invoice="viewInvoice" :closeDialog="closeDialog")
    payment-accounts-dialog(:accounts="paymentsAccounts" :closeDialog="closeDialog")
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
        viewInvoice: {},
        paymentsAccounts: null
      }
    },
    computed: {
      ...mapState('userModule', {
        user: 'user'
      }),
      ...mapState('playerModule', {
        beneficiaries: 'beneficiaries',
        allInvoices: 'allInvoices'
      }),
      ...mapGetters('playerModule', {
        invoices: 'invoices'
      }),
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
        this.getInvoices({ beneficiary: this.beneficiary })
        this.getCredits(this.beneficiary)
      }
    },
    watch: {
      loaded () {
        this.getInvoices({ beneficiary: this.beneficiary })
        this.getCredits(this.beneficiary)
      }
    },
    methods: {
      ...mapActions('playerModule', {
        getInvoices: 'getInvoices',
        getCredits: 'getCredits'
      }),
      closeDialog: function () {
        this.viewInvoice = {}
        this.paymentsAccounts = null
        this.getInvoices({ beneficiary: this.beneficiary })
      },
      selectInvoice (invoice) {
        this.viewInvoice = invoice
      }
    }
  }
</script>
