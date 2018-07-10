<template>
  <td>
    <div v-if="paymentMethods">
      <select name="parent-s" class="custom-select">
        <option v-for="pm in parentPaymentMethods" :key="pm.id" :value="pm.id">{{ pm.brand || pm.bank_name }} •••• {{ pm.last4 }}</option>
      </select>
    </div>
  </td>
</template>
<script>
import { mapState } from 'vuex'

export default {
  props: {
    item: Object
  },
  watch: {
    parents () {
      this.loadPaymentMethods()
    }
  },
  computed: {
    ...mapState('playerInvoicesModule', {
      paymentMethods: 'paymentMethods'
    }),
    parentPaymentMethods () {
      if (!this.item.user) return []
      return this.paymentMethods[this.item.user.userEmail] || []
    }
  },
  methods: {
  }
}
</script>

