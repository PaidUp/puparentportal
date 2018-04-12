<template lang="pug">
  md-step(id="step4" md-label="Payment Plan" :md-description="description")
    .payment-plans
      .payment-plan.md-elevation-2(@click="select('payment 1')")
        .md-subheading Dues Payments in Full ($100 Discount)
        div
          .md-title $1,400.00
          .md-caption 1 installment
          .md-caption $1,400 PaiUp by Today
          .md-caption $900 PaiUp by March 1, 2019

    md-button.lblue.md-accent.md-raised ACEPT PAYMENT PLAN
    md-button.lblue.md-accent CANCEL

</template>
<script>
export default {
  props: {
    step: Boolean
  },
  data () {
    return {
      description: 'If you need a custom payment plan, please email support@getpaidup.com or call (855) 764-3232',
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
