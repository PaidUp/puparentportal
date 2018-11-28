<template>
  <div class="left-sidebar">
    <md-list class="top-list">
      <md-list-item class="edit-user-nav-item" to="/profile">
        <!-- <md-avatar v-if="avatar">
          <img :src="avatar"/>
        </md-avatar>
        <md-icon v-else class="md-size-2x ca1">account_circle</md-icon> -->
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
      
      <!-- Reports -->
      <md-list-item md-expand v-if="isRole('coach')">
        <span class="md-list-item-text ca1 bold">Reports</span>
        <md-list slot="md-expand">
          <md-list-item to="/reports/payments">
            <div class="md-list-item-text">
              Payments
            </div>
          </md-list-item>
          <md-list-item to="/reports/deposits">
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
      <md-list-item to="/reports/payments" md-expand v-if="isRole('chap')">
        <span class="md-list-item-text ca1 bold">Bulk</span>
        <md-list slot="md-expand">
          <md-list-item to="/bulk/preorders">
            <span class="md-list-item-text ca1 bold">PreOrder Assignment</span>
          </md-list-item>
          <md-list-item to="/bulk/credits">
            <span class="md-list-item-text ca1 bold">Import Credits</span>
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
  import PuPaymentAccounts from './leftSidebar/PuPaymentAccounts.vue'
  import PuBotton from './leftSidebar/PuBotton.vue'
  import { mapState, mapActions } from 'vuex'

  export default {
    components: { PuItem, PuBotton, PuPlayerPaymentHistory, PuPayNewInvoice, PuPaymentAccounts },
    data: function () {
      return {
        avatar: null
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
    async mounted () {
      // if (this.user.email) {
      //   this.getBeneficiaries(this.user.email)
      //   let url = await this.getAvatarUrl(this.user._id)
      //   this.validateUrl(url).then(response => {
      //     this.avatar = response.data.validateUrl
      //   }).catch(reason => reason)
      // }
    },
    watch: {
      async user () {
        this.getBeneficiaries(this.user.email)
        let url = await this.getAvatarUrl(this.user._id)
        this.validateUrl(url).then(response => {
          this.avatar = response.data.validateUrl
        }).catch(reason => reason)
      }
    },
    methods: {
      ...mapActions('playerModule', {
        getBeneficiaries: 'getBeneficiaries'
      }),
      ...mapActions('userModule', {
        getAvatarUrl: 'getAvatarUrl'
      }),
      ...mapActions('commonModule', {
        validateUrl: 'validateUrl'
      }),
      isRole (role) {
        if (this.user && this.user.roles) return this.user.roles.indexOf(role) > -1
        return false
      }
    }
  }
</script>
