<template>
  <div class="payment-single md-elevation-2">
            <div>
              <div class="title cgray bold">{{ due.description }}</div>
              <div class="caption">{{ accountDescription }}</div>
            </div>
            <div class="details">
              <div class="icon-side">
                <md-icon :class="style" class="md-size-c">today</md-icon>
                <div class="caption" :class="style">{{ overdue ? 'OVERDUE' : 'DUE' }}</div>
              </div>
              <div class="amount-side">
                <div v-if="overdue" class="caption cred">CHARGED TODAY</div>
                <div class="caption">{{ $d(due.dateCharge, 'short') }}</div>
                <v-currency :amount="due.amount" :clazz="style[0] + ' number-big'" />
              </div>
            </div>
            <div class="actions">
              <md-button class="lblue md-accent">EDIT</md-button>
            </div>
          </div>
</template>
<script>
import VCurrency from '@/components/shared/VCurrency.vue'

export default {
  components: { VCurrency },
  props: {
    due: Object,
    account: Object
  },
  data () {
    return {
      overdue: (new Date()).setHours(24, 0, 0, 0) > this.due.dateCharge.getTime()
    }
  },
  computed: {
    style () {
      if (this.overdue) return ['cred']
      return ['cblue']
    },
    accountDescription () {
      if (this.account.object === 'card') return `${this.account.brand}••••${this.account.last4}`
      else if (this.account.object === 'bank_account') return `${this.account.bank_name}••••${this.account.last4}`
      else return ''
    }
  }
}
</script>

