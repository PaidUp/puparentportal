<template lang="pug">
  md-step(:id="stepId" md-label="Payment Account" :md-description="description" :md-done.sync="step")
    .payment-accounts
      .account.md-elevation-2(@click="select(account)" v-for="account in paymentAccounts" :key="account._id")
        md-icon.md-size-2x(v-if="account.object==='bank_account'") account_balance
        md-icon.md-size-2x(v-if="account.object==='card'") credit_card
        .name.md-body-2(v-if="account.object==='bank_account'") {{ account.account_holder_name }} 
        .name.md-body-2(v-if="account.object==='card'") {{ account.name }}
        .card-details.md-caption(v-if="account.object==='bank_account'") {{ account.bank_name }}
        .card-details.md-caption(v-if="account.object==='card'") {{ account.brand }}••••{{ account.last4 }}
        .card-details.md-caption(v-if="account.object==='bank_account'") ••••{{ account.last4 }}
        .card-details.md-caption(v-if="account.object==='card'") Exp. {{ account.exp_month }}/{{ account.exp_year % 100 }}

    md-button.lblue.md-accent.md-raised ADD NEW CARD
    md-button.lblue.md-accent.md-raised ADD NEW BANK
    md-button.lblue.md-accent(@click="cancel") CANCEL

</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  props: {
    stepId: {
      type: String,
      required: true
    },
    step: Boolean
  },
  data () {
    return {
      selected: null
    }
  },
  watch: {
    user () {
      if (this.user && this.user.externalCustomerId) {
        this.listCards(this.user)
        this.listBanks(this.user)
      }
    }
  },
  computed: {
    ...mapState('userModule', {
      user: 'user'
    }),
    ...mapGetters('paymentModule', {
      paymentAccounts: 'paymentAccounts'
    }),
    description () {
      if (!this.selected) return ''
      return `${this.selected.bank_name || this.selected.brand}••••${this.selected.last4}`
    }
  },
  mounted () {
    if (this.user && this.user.externalCustomerId) {
      this.listCards(this.user)
      this.listBanks(this.user)
    }
  },
  methods: {
    ...mapActions('paymentModule', {
      listCards: 'listCards',
      listBanks: 'listBanks'
    }),
    select (param) {
      this.selected = param
      this.$emit('select', param)
    },
    cancel () {
      this.$router.push({
        name: 'home'
      })
    }
  }
}
</script>
