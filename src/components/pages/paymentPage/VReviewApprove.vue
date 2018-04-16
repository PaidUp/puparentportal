<template>
  <md-step id="step7" md-label="Review &amp; Approve" :md-done.sync="step" :md-editable="false">
    <div v-if="account && plan" class="review-checks">
      <md-checkbox v-if="chargeToday" v-model="check1" class="">
        I authorize PaiUp to charge me
        <span class="cgreen">
          <b>${{ format(chargeToday) }}</b>
        </span>
        <b>today</b> on my {{ account.bank_name || account.brand }}••••{{ account.last4 }}
      </md-checkbox>
      <md-checkbox v-if="chargeRemaining" v-model="check2" class="">
        I authorize PaiUp to setup the remaining
        <span class="cgreen">
          <b>${{ format(chargeRemaining) }}</b>
        </span>
        <b>on autopay</b> on the dates and amount in the payment plan I selected
      </md-checkbox>
      <md-checkbox v-model="check3" class="">
        I agree that PaidUp cannot modify or cancel any payments without approval from the club
      </md-checkbox>
    </div>
    <md-button class="lblue md-accent md-raised">AUTHORIZE PAYMENTS</md-button>
    <md-button class="lblue md-accent">CANCEL</md-button>
  </md-step>
</template>
<script>
import numeral from 'numeral'

export default {
  props: {
    step: Boolean,
    account: Object,
    plan: Object
  },
  data () {
    return {
      check1: false,
      check2: false,
      check3: false,
      today: (new Date()).setHours(24, 0, 0, 0)
    }
  },
  computed: {
    chargeToday () {
      return this.plan.dues.reduce((subTotal, due) => {
        if (this.today > due.dateCharge.getTime()) return subTotal + due.amount
        return subTotal
      }, 0)
    },
    chargeRemaining () {
      return this.plan.dues.reduce((subTotal, due) => {
        if (this.today <= due.dateCharge.getTime()) return subTotal + due.amount
        return subTotal
      }, 0)
    }
  },
  methods: {
    select (param) {
      this.$emit('select', param)
    },
    format (amount) {
      return numeral(amount).format('0,0.00')
    }
  }
}
</script>
