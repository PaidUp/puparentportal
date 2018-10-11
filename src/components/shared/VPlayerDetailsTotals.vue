<template lang="pug">
  .details-numbers
    div
      .concept  Total
      v-currency(:amount="total" clazz="title-big")
    div
      .concept  Paid
      v-currency(:amount="paid" clazz="title-big green")
    div
      .concept  Unpaid
      v-currency(:amount="unpaid" clazz="title-big gray")
    div
      .concept  Overdue
      v-currency(:amount="overdue" clazz="title-big red")
    div
      .concept  Other
      v-currency(:amount="other" clazz="title-big blue")
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
    total () {
      if (!this.invoices) return 0
      return this.invoices.reduce((subTotal, current) => {
        return current.status !== 'refunded' ? subTotal + current.price : subTotal
      }, 0)
    },
    paid () {
      if (!this.invoices) return 0
      return this.invoices.reduce((subTotal, current) => {
        if (current.status === 'paid' || current.status === 'paidup' || current.status === 'submitted' || current.status === 'credited') return subTotal + current.price
        return subTotal
      }, 0)
    },
    unpaid () {
      if (!this.invoices) return 0
      return this.invoices.reduce((subTotal, current) => {
        if (current.status === 'autopay') return subTotal + current.price
        return subTotal
      }, 0)
    },
    overdue () {
      if (!this.invoices) return 0
      return this.invoices.reduce((subTotal, current) => {
        if (current.status === 'failed') return subTotal + current.price
        return subTotal
      }, 0)
    },
    other () {
      if (!this.invoices) return 0
      return this.invoices.reduce((subTotal, current) => {
        if (current.status === 'discount') return subTotal + current.price
        return subTotal
      }, 0)
    }
  }
}
</script>

