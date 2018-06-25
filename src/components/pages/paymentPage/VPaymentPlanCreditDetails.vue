<template>
  <div class="payment-single">
    <div>
      <div class="title cgray bold">{{ due.description }}</div>
      <div class="caption"></div>
    </div>
    <div class="details">
      <div class="icon-side">
        <md-icon class="md-size-c cgreen">today</md-icon>
        <div class="caption cgreen">{{ due.status.toUpperCase() }}</div>
      </div>
      <div class="amount-side">
        <div class="caption">{{ $d(due.dateCharge, 'short') }}</div>
        <v-currency :amount="due.amount" :clazz="'cgreen number-big'" />
      </div>
    </div>
    <div class="actions">
      &nbsp;
    </div>
  </div>
</template>
<script>
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
  },
  methods: {
  }
}
</script>

