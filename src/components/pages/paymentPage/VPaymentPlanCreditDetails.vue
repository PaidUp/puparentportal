<template>
  <div class="payment-single">
    <div>
      <div class="title cgray bold">{{ due.description }}</div>
      <div class="caption">{{ mapper.subtext }}</div>
    </div>
    <div class="single-details">
      <div class="icon-side">
        <md-icon class="md-size-c cgreen">today</md-icon>
        <div class="caption cgreen">{{ mapper.desc }}</div>
      </div>
      <div class="amount-side">
        <div class="caption">{{ $moment.formatDate(due.dateCharge) }}</div>
        <v-currency :amount="due.amount" :clazz="'cgreen number-big'" />
      </div>
    </div>
    <div class="actions">
      &nbsp;
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import VCurrency from '@/components/shared/VCurrency.vue'

export default {
  components: { VCurrency },
  props: {
    due: Object
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState('commonModule', {
      invoiceMapper: 'invoiceMapper'
    }),
    mapper () {
      return this.invoiceMapper[this.due.status]
    }
  },
  methods: {
  }
}
</script>

