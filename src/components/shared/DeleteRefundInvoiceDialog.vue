<template>
  <md-dialog :md-active.sync="showDialog" class="refund-invoice-dialog small" :md-close-on-esc="false" :md-click-outside-to-close="false">
    <md-content>
      <div class="dialog-header md-elevation-4">
        <div class="title">Refund: INV12344444</div>
      </div>
      <div class="dialog-body">
        <md-field>
          <label>Refund Amount</label>
          <span class="md-prefix">$</span>
          <md-input v-model="refundAmount"></md-input>
          <span class="md-helper-text">Refund can be between $1.00 and $350.00</span>
        </md-field>
        <md-field>
          <label>Refund Reason</label>
          <span class="md-prefix">$</span>
          <md-input v-model="refundReason"></md-input>
        </md-field>
        <div class="title-info">Invoice Details</div>
        <md-field>
          <label>Description</label>
          <md-input disabled v-model="refundDesc"></md-input>
        </md-field>
        <md-field>
          <label>Amount</label>
          <span class="md-prefix">$</span>
          <md-input disabled v-model="refundAmount"></md-input>
        </md-field>
        <md-field>
          <label>Charge Date</label>
          <md-input disabled v-model="refundChargeDate"></md-input>
        </md-field>
        <md-field>
          <label>Payment Account</label>
          <md-input disabled v-model="refundAccount"></md-input>
        </md-field>
      </div>
      <div class="md-dialog-actions">
          <md-button class="md-accent lblue" @click="closeDialog()">CANCEL</md-button>
          <md-button class="md-accent lblue md-raised" @click="closeDialog()">REFUND</md-button>
      </div>
    </md-content>
  </md-dialog>
</template>

<script>
  export default {
    props: {
      showDialog: Boolean,
      closeDialog: Function
    },
    data () {
      return {
        ttt: false,
        refundAmount: 200,
        refundReason: 'Duplicate Chrage. Approved by Lindsay',
        refundDesc: 'Dues Payments 5',
        refundChargeDate: '05-01-2018',
        refundAccount: 'Visa***1234'
      }
    }
  }
</script>
