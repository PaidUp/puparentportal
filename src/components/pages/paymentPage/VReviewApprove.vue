<template lang="pug">
  div
    .review-checks(v-if="paymentPlanSelected")
      md-checkbox.lblue(v-if="chargeToday" v-model="check1") I authorize PaidUp to charge me 
        span.cgreen
          b ${{ currency(chargeToday) }} 
        b today
      br(v-if="chargeToday")
      md-checkbox.lblue(v-if="chargeRemaining" v-model="check2") I authorize PaidUp to setup the remaining 
        span.cgreen
          b ${{ currency(chargeRemaining) }} 
        b on autopay 
        | on the dates and amount in the payment plan I selected
      br(v-if="chargeRemaining")
      md-checkbox.lblue(v-model="check3") I agree that PaidUp cannot modify, cancel or refund any payments without approval from the club
    md-button.lblue.md-accent(v-if="paymentPlanSelected" @click="back") BACK
    md-button.lblue.md-accent.md-raised(:disabled="!enable || processing" :class="{'blinker': enable}" @click="select") AUTHORIZE PAYMENTS

</template>
<script>
import { mapState, mapMutations } from 'vuex'
import currency from '@/helpers/currency'

export default {
  props: {
    processing: {
      type: Boolean,
      required: true
    }
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
    ...mapState('paymentModule', {
      paymentPlanSelected: 'paymentPlanSelected',
      dues: 'dues',
      paymentAccountSelected: 'paymentAccountSelected'
    }),
    chargeToday () {
      if (!this.paymentPlanSelected) return 0
      let res = 0
      Object.keys(this.dues).forEach(key => {
        const due = this.dues[key]
        if (due.type === 'invoice' && this.today > due.dateCharge.getTime()) {
          res = res + due.amount
        }
      })
      if (res) this.check1 = false
      return res
    },
    chargeRemaining () {
      if (!this.paymentPlanSelected) return 0
      let res = 0
      Object.keys(this.dues).forEach(key => {
        const due = this.dues[key]
        if (due.type === 'invoice' && this.today <= due.dateCharge.getTime()) {
          res = res + due.amount
        }
      })
      if (res) this.check2 = false
      return res
    },
    enable () {
      return ((!this.chargeToday || this.check1) && (!this.chargeRemaining || this.check2) && this.check3 && this.paymentAccountSelected)
    }
  },
  watch: {
    paymentPlanSelected () {
      this.check1 = true
      this.check2 = true
      this.check3 = false
    }
  },
  methods: {
    ...mapMutations('paymentModule', {
      setPaymentPlanSelected: 'setPaymentPlanSelected'
    }),
    select () {
      if (!this.processing) this.$emit('select', this.enable)
    },
    back () {
      this.setPaymentPlanSelected(null)
    },
    currency (value) {
      return currency(value)
    }
  }
}
</script>
<style>
.blinker {
  animation-name: blink;
  animation-duration: 3s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;

  -webkit-animation-name:blink;
  -webkit-animation-duration: 3s;
  -webkit-animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
}

@-moz-keyframes blink{  
  0% { opacity: 1.0; }
  50% { opacity: 0.6; }
  100% { opacity: 1.0; }
}

@-webkit-keyframes blink {  
  0% { opacity: 1.0; }
  50% { opacity: 0.6; }
  100% { opacity: 1.0; }
}

@keyframes blink {  
  0% { opacity: 1.0; }
  50% { opacity: 0.6; }
  100% { opacity: 1.0; }
}
</style>
