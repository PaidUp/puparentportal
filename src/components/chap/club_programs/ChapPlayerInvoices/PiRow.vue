<template>
  <tr>
    <td>{{index + 1}}</td>
    <pi-description :item="item" @change="updDescription"></pi-description>
    <pi-amount :item="item" @change="updAmount"></pi-amount>
    <pi-charge-date :item="item" @change="updDateCharge"></pi-charge-date>
    <pi-charge-max-date :item="item" @change="updMaxDateCharge"></pi-charge-max-date>
    <pi-parent :item="item" @change="updParent"></pi-parent>
    <pi-payment-account :item="item" :parent="parent" @change="updPaymentMethod"></pi-payment-account>
    <pi-status :item="item" @change="updStatus"></pi-status>
    <pi-invoice-number :item="item"></pi-invoice-number>
    <pi-tags :item="item"></pi-tags>
    <pi-actions :item="item" @update="save"></pi-actions>
    
    
  </tr>
</template>
<script>
import { mapActions } from 'vuex'
import { PiDescription, PiAmount, PiChargeDate, PiChargeMaxDate, PiPaymentAccount, PiParent, PiStatus, PiInvoiceNumber, PiTags, PiActions } from './cells'
export default {
  components: { PiDescription, PiAmount, PiChargeDate, PiChargeMaxDate, PiPaymentAccount, PiParent, PiStatus, PiInvoiceNumber, PiTags, PiActions },
  props: {
    item: Object,
    index: Number
  },
  data () {
    return {
      updInvoice: {
        paymentDetails: this.item.paymentDetails
      },
      parent: null,
      paymentMethod: null
    }
  },
  methods: {
    ...mapActions('playerInvoicesModule', {
      update: 'update',
      getProduct: 'getProduct'
    }),
    ...mapActions('clubprogramsModule', {
      getReducePlayerInvoices: 'getReducePlayerInvoices',
      getReducePrograms: 'getReducePrograms'
    }),
    ...mapActions('messageModule', {
      setSuccess: 'setSuccess',
      setDanger: 'setDanger'
    }),
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
      this.updInvoice['paymentDetails'] = null
      this.parent = value
    },
    updPaymentMethod (value) {
      this.updInvoice['paymentDetails'] = value
    },
    updStatus (value) {
      this.updInvoice['status'] = value
    },
    save () {
      this.getProduct(this.item.productId).then(product => {
        this.updInvoice.updateOn = new Date()
        let params = {
          id: this.item.id,
          product,
          values: this.updInvoice
        }
        this.update(params).then(resp => {
          this.setSuccess('Invoice was updated succeeded')
          this.getReducePlayerInvoices()
          this.getReducePrograms()
        }).catch(reason => {
          this.setDanger('Invoice was not updated')
        })
      })
    }
  }
}
</script>
