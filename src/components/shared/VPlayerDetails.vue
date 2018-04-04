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
      <div class="md-title gray">$1,400.<sup>00</sup></div>
    </div>
    <div>
      <div class="md-body-2 concept">Overdue</div>
      <div class="md-title red">$350.<sup>00</sup></div>
    </div>
    <div>
      <div class="md-body-2 concept">Credited</div>
      <div class="md-title blue">$250.<sup>00</sup></div>
    </div>
  </div>
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
        return subTotal + current.price
      }, 0)
    },
    paid () {
      if (!this.invoices) return 0
      return this.invoices.reduce((subTotal, current) => {
        if (this.invoices.status === 'charged') return subTotal + current.price
        return subTotal
      }, 0)
    }
  }
}
</script>

