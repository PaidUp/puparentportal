<template>
  <tr>
    <pi-description :item="item"></pi-description>
    <pi-amount :item="item"></pi-amount>
    <pi-charge-date :item="item"></pi-charge-date>
    <pi-charge-max-date :item="item"></pi-charge-max-date>
    <pi-payment-account :item="item"></pi-payment-account>
    <pi-parent :item="item"></pi-parent>
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
    }
  },
  watch: {
  }
}
</script>
