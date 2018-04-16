<template lang="pug">
  md-step(id="step3" md-label="Payment Account" :md-done.sync="step")
    .payment-accounts
      .account.md-elevation-2(@click="select(account)" v-for="account in paymentAccounts" :key="account._id")
        md-icon.md-size-2x account_balance
        .name.md-body-2 Felipe 
        .card-details.md-caption Visa ****12332
        .card-details.md-caption Exp. 11/21

    md-button.lblue.md-accent.md-raised ADD NEW CARD
    md-button.lblue.md-accent.md-raised ADD NEW BANK
    md-button.lblue.md-accent CANCEL

</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  props: {
    step: Boolean
  },
  data () {
    return {
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
    })
  },
  mounted () {
    if (this.user && this.user.externalCustomerId) {
      this.listCards(this.user)
      this.listBanks(this.user)
    }
  },
  methods: {
    select (param) {
      this.$emit('select', param)
    },
    ...mapActions('paymentModule', {
      listCards: 'listCards',
      listBanks: 'listBanks'
    })
  }
}
</script>
