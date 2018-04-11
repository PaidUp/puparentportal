<template>
  <div class="players-page">
    <div class="player">
      <v-player-info v-if="beneficiary" :player="beneficiary"/>
    </div>
    <div class="details">
      <div class="md-subheading title">Details</div>
      <md-content class="md-elevation-4 details-box">
        <v-player-details-selection  :orders="orders" />
        <v-player-details  :order="order" />
      </md-content>
    </div>
    <div class="invoices" v-if="order">
      <div class="md-subheading title">Invoices</div>
      <div class="inv-cards" >
        <v-player-invoices :invoice="invoice" v-for="invoice in order.invoices" :key="invoice._id" />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex'
  import VPlayerInfo from '@/components/shared/VPlayerInfo.vue'
  import VPlayerDetails from '@/components/shared/VPlayerDetails.vue'
  import VPlayerDetailsSelection from '@/components/shared/VPlayerDetailsSelection.vue'
  import VPlayerInvoices from '@/components/shared/VPlayerInvoices.vue'
  export default {
    components: {
      VPlayerInfo,
      VPlayerInvoices,
      VPlayerDetails,
      VPlayerDetailsSelection
    },
    data: function () {
      return {
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
        console.log('run mounted')
        this.getOrders({ userEmail: this.user.email, beneficiary: this.beneficiary })
      }
    },
    watch: {
      loaded () {
        console.log('run watch')
        this.getOrders({ userEmail: this.user.email, beneficiary: this.beneficiary })
      }
    },
    methods: {
      ...mapActions('playerModule', {
        getOrders: 'getOrders'
      })
    }
  }
</script>
