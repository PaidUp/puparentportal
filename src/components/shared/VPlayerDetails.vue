<template>
  <div class="details-numbers">
    <div>
      <div class="md-body-2 concept">Total</div>
      <v-currency :amount="total" clazz="md-title" />
    </div>
    <div>
      <div class="md-body-2 concept">Paid</div>
      <v-currency :amount="paid" clazz="md-title green" />
    </div>
    <div>
      <div class="md-body-2 concept">Unpaid</div>
      <v-currency :amount="unpaid" clazz="md-title gray" />      
    </div>
    <div>
      <div class="md-body-2 concept">Overdue</div>
      <v-currency :amount="overdue" clazz="md-title red" />
    </div>
    <div>
      <div class="md-body-2 concept">Credited</div>
      <v-currency :amount="credited" clazz="md-title blue" />
    </div>
  </div>
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
      if (!this.order) return 0
      return this.order.invoices.reduce((subTotal, current) => {
        return subTotal + current.price
      }, 0)
    },
    paid () {
      if (!this.order) return 0
      return this.order.invoices.reduce((subTotal, current) => {
        if (current.status === 'paid' || current.status === 'paidup') return subTotal + current.price
        return subTotal
      }, 0)
    },
    unpaid () {
      if (!this.order) return 0
      return this.order.invoices.reduce((subTotal, current) => {
        if (current.status === 'autopay' || current.status === 'failed' || current.status === 'due') return subTotal + current.price
        return subTotal
      }, 0)
    },
    due () {
      if (!this.order) return 0
      return this.order.invoices.reduce((subTotal, current) => {
        if (current.status === 'due') return subTotal + current.price
        return subTotal
      }, 0)
    },
    overdue () {
      if (!this.order) return 0
      return this.order.invoices.reduce((subTotal, current) => {
        if (current.status === 'overdue') return subTotal + current.price
        return subTotal
      }, 0)
    },
    credited () {
      if (!this.order) return 0
      return this.order.invoices.reduce((subTotal, current) => {
        if (current.status === 'due') return subTotal + current.price
        return subTotal
      }, 0)
    }
  }
}
</script>

