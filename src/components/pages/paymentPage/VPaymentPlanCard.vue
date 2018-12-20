<template lang="pug">
  md-card.md-with-hover
    .payment-plan(@click="click")
      .title.cblue {{ plan.description }}
      div
        .title.title-total ${{ total }}
        .md-caption {{ plan.dues.length }} {{ plan.dues.length === 1 ? 'Installment' : 'Installments' }}
        .md-caption(v-if="chargeToday") ${{ currency(chargeToday) }} PaidUp by Today
        .md-caption(v-if="chargeRemaining") ${{ currency(chargeRemaining) }} PaidUp by {{ $moment.formatDate(lastDateCharge) }}

</template>
<script>
import currency from '@/helpers/currency'

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
        due.baseAmount = due.baseAmount || due.amount
        return subTotal + due.baseAmount
      }, 0)
      return currency(total)
    },
    chargeToday () {
      let resp = this.plan.dues.reduce((subTotal, due) => {
        if (this.today > due.dateCharge.getTime()) return subTotal + due.amount
        return subTotal
      }, 0)
      return resp
    },
    chargeRemaining () {
      let resp = this.plan.dues.reduce((subTotal, due) => {
        if (this.today <= due.dateCharge.getTime()) return subTotal + due.amount
        return subTotal
      }, 0)
      return resp
    },
    lastDateCharge () {
      return this.plan.dues[this.plan.dues.length - 1].dateCharge
    }
  },
  methods: {
    select (param) {
      this.$emit('select', param)
    },
    click () {
      this.$emit('click', this.plan)
    },
    currency (value) {
      return currency(value)
    }
  }
}
</script>
