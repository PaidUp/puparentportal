<template lang="pug">
  .players-page
    .player
      v-player-info(v-if="beneficiary" :player="beneficiary")
    .details
      .md-subheading.title Details
      md-content.md-elevation-4.details-box
        v-player-details-selection(:orders="orders")
        v-player-details-totals(:order="order")
    button(class="md-button md-raised" v-on:click="openInvoiceDialog") Open Inv details
    .invoices(v-if="order")
      .md-subheading.title Invoices
      .inv-cards
        v-player-invoices(:invoice="invoice" v-for="invoice in order.invoices" :key="invoice._id")
    VInvoiceDialog(:invoice="currentInvoice" :closeDialog="closeDialog")
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex'
  import VPlayerInfo from '@/components/shared/VPlayerInfo.vue'
  import VPlayerDetailsTotals from '@/components/shared/VPlayerDetailsTotals.vue'
  import VPlayerDetailsSelection from '@/components/shared/VPlayerDetailsSelection.vue'
  import VPlayerInvoices from '@/components/shared/VPlayerInvoices.vue'
  import VInvoiceDialog from '@/components/shared/VInvoiceDialog.vue'
  export default {
    components: {
      VPlayerInfo,
      VPlayerInvoices,
      VPlayerDetailsTotals,
      VPlayerDetailsSelection,
      VInvoiceDialog
    },
    data: function () {
      return {
        currentInvoice: null
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
        order: 'order'
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
        this.currentInvoice = null
      },
      openInvoiceDialog: function () {
        this.currentInvoice = {title: 'some'}
      }
    }
  }
</script>
