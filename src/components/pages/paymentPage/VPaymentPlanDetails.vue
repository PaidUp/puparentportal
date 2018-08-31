<template>
  <div class="payment-single">
    <div>
      <div class="title cgray bold">{{ due.description }}</div>
      <div class="caption">{{ accountDescription }}</div>
    </div>
    <div class="single-details">
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
      <md-button class="lblue md-accent" @click="showEditDialog = true">EDIT</md-button>
    </div>
    <view-due-dialog :due="due" :showDialog="showEditDialog" @cancel="showEditDialog = false" @updated="editDue"/>
  </div>
</template>
<script>
import VCurrency from '@/components/shared/VCurrency.vue'
import ViewDueDialog from '@/components/shared/ViewDueDialog.vue'

export default {
  components: { VCurrency, ViewDueDialog },
  props: {
    due: Object
  },
  data () {
    return {
      overdue: (new Date()).setHours(24, 0, 0, 0) > this.due.dateCharge.getTime(),
      showEditDialog: false
    }
  },
  computed: {
    style () {
      if (this.overdue) return ['cred']
      return ['cblue']
    },
    accountDescription () {
      if (this.due.account && this.due.account.object === 'card') return `${this.due.account.brand}••••${this.due.account.last4}`
      else if (this.due.account && this.due.account.object === 'bank_account') return `${this.due.account.bank_name}••••${this.due.account.last4}`
      else return ''
    }
  },
  methods: {
    editDue (due) {
      this.$emit('updated', due)
      this.showEditDialog = false
    }
  }
}
</script>

