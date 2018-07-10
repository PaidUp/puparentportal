<template>
  <tr>
    <pi-description :item="item" @change="updDescription"></pi-description>
    <pi-amount :item="item" @change="updAmount"></pi-amount>
    <pi-charge-date :item="item" @change="updDateCharge"></pi-charge-date>
    <pi-charge-max-date :item="item" @change="updMaxDateCharge"></pi-charge-max-date>
    <pi-parent :item="item" @change="updParent"></pi-parent>
    <pi-payment-account :item="item" :parent="parent" @change="updPaymentMethod"></pi-payment-account>
    <pi-status :item="item"></pi-status>
    <pi-invoice-number :item="item"></pi-invoice-number>
    <pi-tags :item="item"></pi-tags>
    <pi-actions :item="item"></pi-actions>
    
    
  </tr>
</template>
<script>
import { PiDescription, PiAmount, PiChargeDate, PiChargeMaxDate, PiPaymentAccount, PiParent, PiStatus, PiInvoiceNumber, PiTags, PiActions } from './cells'
export default {
  components: { PiDescription, PiAmount, PiChargeDate, PiChargeMaxDate, PiPaymentAccount, PiParent, PiStatus, PiInvoiceNumber, PiTags, PiActions },
  props: {
    item: Object
  },
  data () {
    return {
      updInvoice: {},
      parent: null
    }
  },
  methods: {
    updDescription (value) {
      this.updInvoice['label'] = value
    },
    updAmount (value) {
      this.updInvoice['price'] = value
    },
    updDateCharge (value) {
      this.updInvoice['dateCharge'] = value
    },
    updMaxDateCharge (value) {
      this.updInvoice['maxDateCharge'] = value
    },
    updParent (value) {
      this.updInvoice['user'] = value
      this.parent = value
    },
    updPaymentMethod (value) {
      this.updInvoice['paymentDetails'] = value
    }
  }
}
</script>
