<template>
  <div class="left-sidebar">
    <md-list class="top-list">
      <md-list-item class="user-menu">
        <md-menu md-size="auto" md-align-trigger="md-align-trigger" md-direction="bottom-end">
          <md-button class="md-primary" md-menu-trigger="md-menu-trigger">
            <md-avatar>
              <img src="@/assets/avatar.jpg" />
            </md-avatar>&nbsp; Diego Fortes
            <md-icon>keyboard_arrow_down</md-icon>
          </md-button>
          <md-menu-content>
            <md-menu-item>My Item 1</md-menu-item>
            <md-menu-item>My Item 1</md-menu-item>
            <md-menu-item>My Item 1</md-menu-item>
          </md-menu-content>
        </md-menu>
      </md-list-item>
      <md-divider></md-divider>

      <pu-player-payment-history v-if="beneficiary" :beneficiaries="[beneficiary]"/>
      <pu-pay-new-invoice v-if="beneficiary" :beneficiaries="[beneficiary]"/>
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
  import { mapState } from 'vuex'

  export default {
    components: { PuItem, PuBotton, PuPlayerPaymentHistory, PuPayNewInvoice, PuPaymentAccounts },
    data: function () {
      return {
        msg: 'THEE MSAGE BIATH'
      }
    },
    computed: {
      ...mapState('playerModule', {
        beneficiary: 'beneficiary'
      })
    },
    methods: {
      click () {
        console.log('clic')
      }
    }
  }
</script>
