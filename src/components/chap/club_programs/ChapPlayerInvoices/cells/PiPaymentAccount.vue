<template>
  <td>
    <div v-if="paymentMethods && item.type === 'invoice'">
      <select v-if="isEditable" name="parent-s" class="custom-select" v-model="pmSelected">
        <option v-for="pm in parentPaymentMethods" :key="pm.id" :value="pm.id">{{ pm.brand || pm.bank_name }}••••{{ pm.last4 }}</option>
      </select>
      <span v-else-if="item.paymentDetails">{{item.paymentDetails.brand}}••••{{item.paymentDetails.last4}}</span>
    </div>
  </td>
</template>
<script>
import { mapState } from 'vuex'

export default {
  props: {
    item: Object,
    parent: Object
  },
  data () {
    return {
      pmSelected: this.item.type === 'invoice' ? this.item.paymentDetails.externalPaymentMethodId : null
    }
  },
  watch: {
    parent () {
      this.pmSelected = null
    },
    pmSelected () {
      if (this.parentPaymentMethods && this.parentPaymentMethods.length) {
        this.parentPaymentMethods.forEach(account => {
          if (this.pmSelected === account.id) {
            this.$emit('change', {
              externalCustomerId: account.customer,
              statementDescriptor: this.item.paymentDetails.statementDescriptor,
              paymentMethodtype: account.object,
              externalPaymentMethodId: account.id,
              brand: account.brand || account.bank_name,
              last4: account.last4
            })
          }
        })
      }
    }
  },
  computed: {
    ...mapState('playerInvoicesModule', {
      paymentMethods: 'paymentMethods'
    }),
    isEditable () {
      return this.item.type === 'invoice' && (this.item.status === 'failed' || this.item.status === 'autopay')
    },
    parentPaymentMethods () {
      if (!this.item.user) return []
      if (this.parent) return this.paymentMethods[this.parent.userEmail]
      return this.paymentMethods[this.item.user.userEmail] || []
    }
  },
  methods: {
  }
}
</script>

