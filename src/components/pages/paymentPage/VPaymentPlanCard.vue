<template lang="pug">
  md-card.md-with-hover
    .payment-plan(@click="click")
      .title.cblue {{ plan.description }}
      div
        .title.title-total ${{ total }}
        .md-caption {{ plan.dues.length }} {{ plan.dues.length === 1 ? 'Installment' : 'Installments' }}
        .md-caption(v-if="chargeToday") ${{ chargeToday }} PaidUp by Today
        .md-caption(v-if="chargeRemaining") ${{ chargeRemaining }} PaidUp by {{ $d(lastDateCharge, 'card') }}

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
        return subTotal + due.amount
      }, 0)
      return currency(total)
    },
    chargeToday () {
      return this.plan.dues.reduce((subTotal, due) => {
        if (this.today > due.dateCharge.getTime()) return subTotal + due.amount
        return currency(subTotal)
      }, 0)
    },
    chargeRemaining () {
      return this.plan.dues.reduce((subTotal, due) => {
        if (this.today <= due.dateCharge.getTime()) return subTotal + due.amount
        return currency(subTotal)
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
    click () {
      this.$emit('click', this.plan)
    }
  }
}
</script>
