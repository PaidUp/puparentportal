<template lang="pug">
  .details-numbers
    div
      .concept  Total
      v-currency(:amount="totals.total" clazz="title-big")
    div
      .concept  Paid
      v-currency(:amount="totals.paid" clazz="title-big green")
    div
      .concept  Unpaid
      v-currency(:amount="totals.unpaid" clazz="title-big gray")
    div
      .concept  Overdue
      v-currency(:amount="totals.overdue" clazz="title-big red")
    div
      .concept  Other
      v-currency(:amount="totals.other" clazz="title-big blue")
</template>

<script>
import VCurrency from '@/components/shared/VCurrency.vue'
export default {
  props: {
    invoices: Array
  },
  components: {
    VCurrency
  },
  computed: {
    totals () {
      let summary = {
        total: 0,
        paid: 0,
        unpaid: 0,
        overdue: 0,
        other: 0
      }
      if (!this.invoices) return summary
      return this.invoices.reduce((curr, inv) => {
        if (inv.status !== 'refunded') curr.total = inv.price + curr.total
        if (inv.status === 'paid' || inv.status === 'paidup' || inv.status === 'submitted' || inv.status === 'credited') curr.paid = inv.price + curr.paid
        else if (inv.status === 'autopay') curr.unpaid = inv.price + curr.unpaid
        else if (inv.status === 'failed') curr.overdue = inv.price + curr.overdue
        else curr.other = inv.price + curr.other
        return curr
      }, summary)
    }
  }
}
</script>

