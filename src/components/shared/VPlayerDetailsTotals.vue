<template lang="pug">
  .details-numbers
    div
      .md-body-2.concept  Total
      v-currency(:amount="total" clazz="md-title")
    div
      .md-body-2.concept  Paid
      v-currency(:amount="paid" clazz="md-title green")
    div
      .md-body-2.concept  Unpaid
      v-currency(:amount="unpaid" clazz="md-title gray")
    div
      .md-body-2.concept  Overdue
      v-currency(:amount="overdue" clazz="md-title red")
    div
      .md-body-2.concept  Credited
      v-currency(:amount="credited" clazz="md-title blue")
</template>

<script>
import VCurrency from '@/components/shared/VCurrency.vue'
export default {
  props: {
    order: {
      type: Object,
      required: true
    }
  },
  components: {
    VCurrency
  },
  computed: {
    total () {
      if (!this.order || !this.order.invoices) return 0
      return this.order.invoices.reduce((subTotal, current) => {
        return subTotal + current.price
      }, 0)
    },
    paid () {
      if (!this.order || !this.order.invoices) return 0
      return this.order.invoices.reduce((subTotal, current) => {
        if (current.status === 'paid' || current.status === 'paidup') return subTotal + current.price
        return subTotal
      }, 0)
    },
    unpaid () {
      if (!this.order || !this.order.invoices) return 0
      return this.order.invoices.reduce((subTotal, current) => {
        if (current.status === 'autopay' || current.status === 'failed' || current.status === 'due') return subTotal + current.price
        return subTotal
      }, 0)
    },
    due () {
      if (!this.order || !this.order.invoices) return 0
      return this.order.invoices.reduce((subTotal, current) => {
        if (current.status === 'due') return subTotal + current.price
        return subTotal
      }, 0)
    },
    overdue () {
      if (!this.order || !this.order.invoices) return 0
      return this.order.invoices.reduce((subTotal, current) => {
        if (current.status === 'overdue') return subTotal + current.price
        return subTotal
      }, 0)
    },
    credited () {
      if (!this.order || !this.order.invoices) return 0
      return this.order.invoices.reduce((subTotal, current) => {
        if (current.status === 'due') return subTotal + current.price
        return subTotal
      }, 0)
    }
  }
}
</script>

