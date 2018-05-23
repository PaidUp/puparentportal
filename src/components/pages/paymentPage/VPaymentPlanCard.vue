<template lang="pug">
  .payment-plan.md-elevation-2(@click="click")
    .md-subheading {{ plan.description }}
    div
      .md-title ${{ total }}
      .md-caption {{ plan.dues.length }} {{ plan.dues.length === 1 ? 'Installment' : 'Installments' }}
      .md-caption(v-if="chargeToday") ${{ format(chargeToday) }} PaidUp by Today
      .md-caption(v-if="chargeRemaining") ${{ format(chargeRemaining) }} PaidUp by {{ $d(lastDateCharge, 'card') }}

</template>
<script>
import numeral from 'numeral'

export default {
  props: {
    plan: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      today: (new Date()).setHours(24, 0, 0, 0)
    }
  },
  computed: {
    total () {
      let total = this.plan.dues.reduce((subTotal, due) => {
        return subTotal + due.amount
      }, 0)
      return numeral(total).format('0,0.00')
    },
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
    },
    lastDateCharge () {
      return this.plan.dues[this.plan.dues.length - 1].dateCharge
    }
  },
  methods: {
    select (param) {
      this.$emit('select', param)
    },
    format (amount) {
      return numeral(amount).format('0,0.00')
    },
    click () {
      this.$emit('click', this.plan)
    }
  }
}
</script>
