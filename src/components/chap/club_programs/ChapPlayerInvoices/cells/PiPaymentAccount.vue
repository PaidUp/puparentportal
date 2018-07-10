<template>
  <td>
    <div v-if="paymentMethods && item.type === 'invoice'">
      <select name="parent-s" class="custom-select" v-model="pmSelected">
        <option v-for="pm in parentPaymentMethods" :key="pm.id" :value="pm.id">{{ pm.brand || pm.bank_name }} •••• {{ pm.last4 }}</option>
      </select>
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
      pmSelected: null
    }
  },
  watch: {
    parents () {
      this.loadPaymentMethods()
    },
    pmSelected () {
      if (this.paymentMethods[this.parentEmail]) {
        this.paymentMethods[this.parentEmail].forEach(account => {
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
  mounted () {
    if (this.item.type === 'invoice') {
      this.pmSelected = this.item.paymentDetails.externalPaymentMethodId
    }
  },
  computed: {
    ...mapState('playerInvoicesModule', {
      paymentMethods: 'paymentMethods'
    }),
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

