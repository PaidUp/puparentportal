<template>
  <div class="left-sidebar">
    <md-list class="top-list">
      <md-list-item class="edit-user-nav-item" to="/profile">
        <md-avatar v-if="avatar">
          <img :src="avatar" />
        </md-avatar>
        <md-icon v-else class="md-size-2x ca1">account_circle</md-icon>
        <div class="md-list-item-text bold">
          {{ user.firstName }} {{ user.lastName}}
        </div>
      </md-list-item>
      
      <!-- CHAP CLUBS & PROGRAMS -->
      <md-list-item to="/chapclubprograms" v-if="isRole('coach')">
        <span class="md-list-item-text ca1 bold">Clubs &amp; Programs</span>
      </md-list-item>

      <!-- Programs -->
      <md-list-item to="/scoreboard" md-expand v-if="isRole('coach')">
        <span class="md-list-item-text ca1 bold">Scoreboard</span>
        <md-list slot="md-expand">
          <md-list-item to="/scoreplayers">
            <div class="md-list-item-text">
              ScorePlayers
            </div>
          </md-list-item>
          <md-list-item to="/scoreplayerdetails">
            <div class="md-list-item-text">
              ScorePlayerDetails
            </div>
          </md-list-item>
        </md-list>
      </md-list-item>

      <!-- Search Result: maybe move to somewhere else -->
      <md-list-item to="/search" v-if="isRole('coach')">
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
          <md-list-item to="/reports/deposits">
            <div class="md-list-item-text">
              Deposits
            </div>
          </md-list-item>
          <md-list-item to="/reports/cash">
            <div class="md-list-item-text">
              Cash Flow
            </div>
          </md-list-item>
          <md-list-item to="/reports/eligibility">
            <div class="md-list-item-text">
              Eligibility
            </div>
          </md-list-item>
        </md-list>
      </md-list-item>
      
      <pu-player-payment-history v-if="isRole('parent') && beneficiaries" :beneficiaries="beneficiaries"/>
      <pu-pay-new-invoice v-if="isRole('parent') && beneficiaries" :beneficiaries="beneficiaries"/>
      <pu-payment-accounts v-if="isRole('parent')" />

      

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
  import config from '@/config'

  export default {
    components: { PuItem, PuBotton, PuPlayerPaymentHistory, PuPayNewInvoice, PuPaymentAccounts },
    data: function () {
      return {
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
        this.$http.get(`${config.media.user.url}avatar/${this.user._id}.png`).then(resp => {
          this.reloadAvatar()
        }, reason => {})
      }
    },
    watch: {
      user () {
        this.getBeneficiaries(this.user.email)
        this.$http.get(`${config.media.user.url}avatar/${this.user._id}.png`).then(resp => {
          this.reloadAvatar()
        }, reason => {})
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
        if (this.user && this.user.roles) return this.user.roles.includes(role)
        return false
      }
    }
  }
</script>
