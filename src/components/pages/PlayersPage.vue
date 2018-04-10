<template>
  <div class="players-page">
    <div class="player">
      <VPlayerInfo v-if="beneficiary" :player="beneficiary"/>
    </div>
    <div class="details">
      <div class="md-subheading title">Details</div>
      <md-content class="md-elevation-4 details-box">
        <div class="details-selects">
          <md-field class="season-select">
            <label for="season">Season</label>
            <md-select name="season" id="season">
              <md-option value="2017/2018">2017/2018</md-option>
              <md-option value="2016/2017">2016/2017</md-option>
              <md-option value="2015/2016">2015/2016</md-option>
            </md-select>
          </md-field>
          <md-field>
            <label for="program">Program</label>
            <md-select name="program" id="program">
              <md-option value="12U Red">12U Red Premier</md-option>
              <md-option value="12U Red2">12U Red2 Premier</md-option>
              <md-option value="12U Red3">12U Red3 Premier</md-option>
            </md-select>
          </md-field>
        </div>
        <v-player-details v-if="order" :order="order" />
      </md-content>
    </div>
    <button class="md-button md-raised" v-on:click="openInvoiceDialog">Open Inv details</button>
    <div class="invoices" v-if="order">
      <div class="md-subheading title">Invoices</div>
      <div class="inv-cards" >
        <v-player-invoices :invoice="invoice" v-for="invoice in order.invoices" :key="invoice._id" />
      </div>
    </div>
    <VInvoiceDialog :invoice="currentInvoice" :closeDialog="closeDialog" />
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import VPlayerInfo from '@/components/shared/VPlayerInfo.vue'
  import VPlayerDetails from '@/components/shared/VPlayerDetails.vue'
  import VPlayerInvoices from '@/components/shared/VPlayerInvoices.vue'
  import VInvoiceDialog from '@/components/shared/VInvoiceDialog.vue'
  export default {
    components: {
      VPlayerInfo,
      VPlayerInvoices,
      VPlayerDetails,
      VInvoiceDialog
    },
    data: function () {
      return {
        currentInvoice: {title: ''}
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
      beneficiary () {
        if (this.beneficiaries) {
          let id = this.$route.params.id
          return this.beneficiaries.find(function (element) {
            return element._id === id
          })
        }
        return null
      },
      order () {
        if (this.orders.length) {
          let order = this.orders[this.orders.length - 1]
          order.invoices.sort((a, b) => {
            a.dataCharge = new Date(a.dataCharge)
            b.dataCharge = new Date(b.dataCharge)
            return a.dataCharge.getTime() - b.dataCharge.getTime()
          })
          return order
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
