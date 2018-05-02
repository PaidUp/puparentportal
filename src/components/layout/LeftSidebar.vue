<template>
  <div class="left-sidebar">
    <md-list class="top-list">
      <md-list-item class="edit-user-nav-item" to="/profile">
        <md-avatar>
          <img src="@/assets/avatar.jpg" />
        </md-avatar>
        <div class="md-list-item-text bold">
          Diego Fortes
        </div>
      </md-list-item>

      <pu-player-payment-history v-if="beneficiaries" :beneficiaries="beneficiaries"/>
      <pu-pay-new-invoice v-if="beneficiaries" :beneficiaries="beneficiaries"/>
      <pu-payment-accounts />

      

    </md-list>
    <pu-botton />
  </div>
</template>

<script>
  import PuItem from './leftSidebar/PuItem.vue'
  import PuPlayerPaymentHistory from './leftSidebar/PuPlayerPaymentHistory.vue'
  import PuPayNewInvoice from './leftSidebar/PuPayNewInvoice.vue'
  import PuPaymentAccounts from './leftSidebar/PuPaymentAccounts.vue'
  import PuBotton from './leftSidebar/PuBotton.vue'
  import { mapState, mapActions } from 'vuex'

  export default {
    components: { PuItem, PuBotton, PuPlayerPaymentHistory, PuPayNewInvoice, PuPaymentAccounts },
    data: function () {
      return {
        msg: 'THEE MSAGE BIATH'
      }
    },
    computed: {
      ...mapState('playerModule', {
        beneficiaries: 'beneficiaries'
      }),
      ...mapState('userModule', {
        user: 'user'
      })
    },
    mounted () {
      if (this.user.email) this.getBeneficiaries(this.user.email)
    },
    watch: {
      user () {
        this.getBeneficiaries(this.user.email)
      }
    },
    methods: {
      ...mapActions('playerModule', {
        getBeneficiaries: 'getBeneficiaries'
      }),
      click () {
        console.log('clic')
      }
    }
  }
</script>
