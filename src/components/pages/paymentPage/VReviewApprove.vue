<template lang="pug">
  md-step(:id="stepId" md-label="Review & Approve" :md-done.sync="step")
    .review-checks(v-if="account && plan")
      md-checkbox(v-if="chargeToday" v-model="check1") I authorize PaiUp to charge me 
        span.cgreen
          b ${{ format(chargeToday) }} 
        b today 
        | on my {{ account.bank_name || account.brand }}••••{{ account.last4 }}
      md-checkbox(v-if="chargeRemaining" v-model="check2") I authorize PaiUp to setup the remaining 
        span.cgreen
          b ${{ format(chargeRemaining) }} 
        b on autopay 
        | on the dates and amount in the payment plan I selected
      md-checkbox(v-model="check3") I agree that PaidUp cannot modify or cancel any payments without approval from the club
    md-button.lblue.md-accent.md-raised(:disabled="!enable") AUTHORIZE PAYMENTS
    md-button.lblue.md-accent(@click="cancel") CANCEL

</template>
<script>
import numeral from 'numeral'

export default {
  props: {
    stepId: {
      type: String,
      required: true
    },
    currentStep: {
      type: String,
      required: true
    },
    step: Boolean,
    account: Object,
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
      console.log('exp: ', ((!this.chargeToday || this.check1) && (!this.chargeRemaining || this.check2) && this.check3))
      return ((!this.chargeToday || this.check1) && (!this.chargeRemaining || this.check2) && this.check3)
    }
  },
  watch: {
    currentStep () {
      console.log('step changed...')

      this.check1 = false
      this.check2 = false
      this.check3 = false
    }
  },
  mounted () {
    console.log('mounted')
  },
  methods: {
    select (param) {
      this.$emit('select', param)
    },
    format (amount) {
      return numeral(amount).format('0,0.00')
    },
    cancel () {
      this.$router.push({
        name: 'home'
      })
    }
  }
}
</script>
