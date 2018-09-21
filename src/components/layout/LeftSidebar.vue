<template>
  <div class="left-sidebar">
    <md-list class="top-list">
      <md-list-item class="edit-user-nav-item" to="/profile">
        <md-avatar v-if="showAvatar">
          <img :src="avatar" @error="showAvatar = false"/>
        </md-avatar>
        <md-icon v-if="!showAvatar" class="md-size-2x ca1">account_circle</md-icon>
        <div class="md-list-item-text bold">
          {{ user.firstName }} {{ user.lastName}}
        </div>
      </md-list-item>

      <!-- CHAP CLUBS CARDS -->
      <md-list-item to="/clubs" v-if="isRole('chap')">
        <span class="md-list-item-text ca1 bold">Clubs &amp; Programs</span>
      </md-list-item>

      <!-- Programs -->
      <md-list-item to="/scoreboard" v-if="isRole('coach')">
        <span class="md-list-item-text ca1 bold">Scoreboard</span>
      </md-list-item>

      <!-- Search Result: maybe move to somewhere else -->
      <md-list-item to="/search" v-if="isRole('chap')">
        <span class="md-list-item-text ca1 bold">Search Result</span>
      </md-list-item>
      
      <!-- Reports -->
      <md-list-item to="/reports/payments" md-expand v-if="isRole('coach')">
        <span class="md-list-item-text ca1 bold">Reports</span>
        <md-list slot="md-expand">
          <md-list-item to="/reports/payments">
            <div class="md-list-item-text">
              Payments
            </div>
          </md-list-item>
          <md-list-item v-if="false" to="/reports/deposits">
            <div class="md-list-item-text">
              Deposits
            </div>
          </md-list-item>
          <md-list-item v-if="false" to="/reports/cash">
            <div class="md-list-item-text">
              Cash Flow
            </div>
          </md-list-item>
          <md-list-item v-if="false" to="/reports/eligibility">
            <div class="md-list-item-text">
              Eligibility
            </div>
          </md-list-item>
        </md-list>
      </md-list-item>
      
      <!-- FEES CALCULATOR -->
      <md-list-item  to="/calculator" v-if="isRole('coach1')">
        <span class="md-list-item-text ca1 bold">Fees Calculator</span>
      </md-list-item>

      <pu-player-payment-history v-if="isRole('parent') && beneficiaries" :beneficiaries="beneficiaries"/>
      <pu-pay-new-invoice v-if="isRole('parent') && beneficiaries" :beneficiaries="beneficiaries"/>
      <pu-payment-accounts v-if="isRole('parent')" />

      <!-- TO DELETE: CHAP/SCORE DESIGNS -->
      <md-list-item to="/chapdesigns" v-if="isRole('chap')">
        <span class="md-list-item-text ca1 bold">Chap Designs</span>
      </md-list-item>

      <!-- TO BULK: CHAP/BULK -->
      <md-list-item to="/bulk/beneficiaries" v-if="isRole('chap')">
        <span class="md-list-item-text ca1 bold">Import Beneficiaries</span>
      </md-list-item>
      <md-list-item to="/bulk/preorders" v-if="isRole('chap')">
        <span class="md-list-item-text ca1 bold">PreOrder Assignment</span>
      </md-list-item>

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
  import { mapState, mapActions, mapMutations } from 'vuex'

  export default {
    components: { PuItem, PuBotton, PuPlayerPaymentHistory, PuPayNewInvoice, PuPaymentAccounts },
    data: function () {
      return {
        showAvatar: true
      }
    },
    computed: {
      ...mapState('playerModule', {
        beneficiaries: 'beneficiaries'
      }),
      ...mapState('userModule', {
        user: 'user',
        avatar: 'avatar'
      })
    },
    mounted () {
      if (this.user.email) {
        this.getBeneficiaries(this.user.email)
        this.reloadAvatar()
      }
    },
    watch: {
      user () {
        this.getBeneficiaries(this.user.email)
        this.reloadAvatar()
      },
      avatar () {
        this.showAvatar = true
      }
    },
    methods: {
      ...mapActions('playerModule', {
        getBeneficiaries: 'getBeneficiaries'
      }),
      ...mapMutations('userModule', {
        reloadAvatar: 'reloadAvatar'
      }),
      isRole (role) {
        if (this.user && this.user.roles) return this.user.roles.indexOf(role) > -1
        return false
      }
    }
  }
</script>
