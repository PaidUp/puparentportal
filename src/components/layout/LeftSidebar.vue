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

      <md-list-item md-expand>
        <span class="md-list-item-text ca1 bold">Payment Accounts</span>
        <md-list slot="md-expand">
          <md-list-item>
            <md-avatar>
              <img src="@/assets/avatar.jpg" />
            </md-avatar>
            <div class="md-list-item-text">
              <div>
                <span>Felipe Fernandez</span>
                <br>
                <span class="caption">American Express****2341</span>
              </div>
            </div>
          </md-list-item>
          <md-list-item>
            <md-avatar class="md-avatar-icon md-accent">
              <md-icon>account_balance</md-icon>
            </md-avatar>
            <div class="md-list-item-text">
              <div>
                <span>Bank of America</span>
                <br>
                <span class="caption">Account ****2414</span>
              </div>
            </div>
          </md-list-item>
          <md-list-item>
            <md-icon class="add-icon">add</md-icon>
            <div class="md-list-item-text">
              <div>
                Add New Card
              </div>
            </div>
          </md-list-item>
          <md-list-item>
            <md-icon class="add-icon">add</md-icon>
            <div class="md-list-item-text">
              <div>
                Add New Bank
              </div>
            </div>
          </md-list-item>
        </md-list>
      </md-list-item>

    </md-list>
    <pu-botton />
  </div>
</template>

<script>
  import PuItem from './leftSidebar/PuItem.vue'
  import PuPlayerPaymentHistory from './leftSidebar/PuPlayerPaymentHistory.vue'
  import PuPayNewInvoice from './leftSidebar/PuPayNewInvoice.vue'
  import PuBotton from './leftSidebar/PuBotton.vue'
  import { mapState } from 'vuex'

  export default {
    components: { PuItem, PuBotton, PuPlayerPaymentHistory, PuPayNewInvoice },
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
