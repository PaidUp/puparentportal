<template>
  <md-dialog class="checkout-success-dialog" :md-active.sync="showDialog" :md-click-outside-to-close="false">
    <md-dialog-title>
      <md-icon class="md-size-c cgreen icon"> check_circle </md-icon>
      <br/>
      Thank you for authorizing your payments!
    </md-dialog-title>
    <div class="text-instructions">
      <ul>
        <li>
          Your payments are on AUTOPAY and you do not need to return to our site to submit another payment.
        </li>
        <li>
          To change a payment date/account, click on EDIT on the invoice from the ‘Payment History For’ section. DO NOT go through the checkout process again.
        </li>
      </ul>
    </div>
    <div class="actions">
      <div>
        <md-button class="md-accent lblue" @click="showDialog = false">VIEW PAYMENT HISTORY</md-button>
      </div>
    </div>
      
  </md-dialog>
</template>

<script>
export default {
  props: {
    show: Boolean
  },
  data () {
    return {
      showDialog: this.show
    }
  }
}
</script>

