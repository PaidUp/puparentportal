<template>
  <md-dialog :md-active.sync="showDialog" class="duplicate-payment-dialog small" :md-close-on-esc="false" :md-click-outside-to-close="false">
    <div class="dialog-header white-dialog-header">
      <div class="title">Duplicate Payment</div>
    </div>
    <div class="text-instructions">
      You are already making payments for Enzo Francescoli this season in 12U Red Premier. 
      Please visit the player section to view your invoices or contact PaidUp support if you have questions
    </div>
    <div class="actions">
      <div>
        <md-button class="md-accent lblue" @click="closeDialog()">CONTINUE WITH PAYMENT</md-button>
      </div>
      <div>
        <md-button class="md-accent lblue" @click="closeDialog()">VIEW PLAYER INVOICES</md-button>
      </div>
    </div>
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
        ttt: false
      }
    }
  }
</script>
