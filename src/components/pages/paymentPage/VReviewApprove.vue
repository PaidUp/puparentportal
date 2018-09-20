<template lang="pug">
  md-step(:id="stepId" md-label="Review & Approve" md-description="" :md-done.sync="step")
    .review-checks(v-if="plan")
      md-checkbox.lblue(v-if="chargeToday" v-model="check1") I authorize PaidUp to charge me 
        span.cgreen
          b ${{ currency(chargeToday) }} 
        b today 
      md-checkbox.lblue(v-if="chargeRemaining" v-model="check2") I authorize PaidUp to setup the remaining 
        span.cgreen
          b ${{ currency(chargeRemaining) }} 
        b on autopay 
        | on the dates and amount in the payment plan I selected
      md-checkbox.lblue(v-model="check3") I agree that PaidUp cannot modify, cancel or refund any payments without approval from the club
    md-button.lblue.md-accent(@click="cancel") CANCEL
    md-button.lblue.md-accent.md-raised(:disabled="!enable || processing" @click="select") AUTHORIZE PAYMENTS

</template>
<script>
import currency from '@/helpers/currency'

export default {
  props: {
    stepId: {
      type: String,
      required: true
    },
    step: {
      type: Boolean,
      required: true
    },
    processing: {
      type: Boolean,
      required: true
    },
    plan: Object
  },
  data () {
    return {
      check1: true,
      check2: true,
      check3: false,
      today: (new Date()).setHours(24, 0, 0, 0)
    }
  },
  computed: {
    chargeToday () {
      if (!this.plan) return 0
      const res = this.plan.dues.reduce((subTotal, due) => {
        if (this.today > due.dateCharge.getTime()) return subTotal + due.amount
        return subTotal
      }, 0)
      if (res) this.check1 = false
      return res
    },
    chargeRemaining () {
      if (!this.plan) return 0
      const res = this.plan.dues.reduce((subTotal, due) => {
        if (this.today <= due.dateCharge.getTime()) return subTotal + due.amount
        return subTotal
      }, 0)
      if (res) this.check2 = false
      return res
    },
    enable () {
      return ((!this.chargeToday || this.check1) && (!this.chargeRemaining || this.check2) && this.check3)
    }
  },
  watch: {
    plan () {
      this.check1 = true
      this.check2 = true
      this.check3 = false
    }
  },
  methods: {
    select () {
      if (!this.processing) this.$emit('select', this.enable)
    },
    cancel () {
      this.$router.push({
        name: 'home'
      })
    },
    currency (value) {
      return currency(value)
    }
  }
}
</script>
