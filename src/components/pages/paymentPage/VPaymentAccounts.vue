<template lang="pug">
  md-step(id="step3" md-label="Payment Account" :md-done.sync="step")
    .payment-accounts
      .account.md-elevation-2(@click="select('acc1')")
        md-icon.md-size-2x account_balance
        .name.md-body-2 Felipe 
        .card-details.md-caption Visa ****12332
        .card-details.md-caption Exp. 11/21

    md-button.lblue.md-accent.md-raised ADD NEW CARD
    md-button.lblue.md-accent.md-raised ADD NEW BANK
    md-button.lblue.md-accent CANCEL

</template>
<script>
export default {
  props: {
    step: Boolean
  },
  data () {
    return {
      player: null
    }
  },
  computed: {

  },
  methods: {
    select (param) {
      this.$emit('select', param)
    }
  }
}
</script>
