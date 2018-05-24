<template>
  <md-dialog :md-active.sync="showDialog" class="invoice-dialog small">
    <div class="dialog-header">

    </div>
    <md-tabs md-alignment="fixed">
      <md-tab md-label="DETAILS">
        <div class="tab-box">
          <div class="order-numbers">
            <div>
            </div>
            <div>
            
            </div>
          </div>
          <div class="instructions">
          If you have problems making changes to your dues, please contact PaidUp Support M-F 9am-5pm CST.
          <a href="mailto:support@getpaidup.com">support@getpaidup.com</a>
          -
          <a href="tel:855-764-3232">855-764-3232</a>
        </div>
        <md-field>
          <label>Description</label>
          <md-input disabled v-model="due.description"></md-input>
        </md-field>
        <md-field>
          <label>Amount</label>
          <span class="md-prefix">$</span>
          <md-input :disabled="true" v-model="amount"></md-input>
        </md-field>
        <md-datepicker v-model="dateCharge" :md-disabled-dates="disabledDates">
          <label>Charge date</label>
        </md-datepicker>
        <md-field>
          <label for="payment">Payment Account</label>
          <md-input :readonly="true" v-model="paymentMethod" @click="showPaymentAccountDialog = true"></md-input>
        </md-field>
        </div>
      </md-tab>
    </md-tabs>
    <md-dialog-actions>
      <md-button class="md-accent lblue" @click="$emit('cancel')">CANCEL</md-button>
      <md-button class="md-accent lblue" @click="apply">APPLY</md-button>
    </md-dialog-actions>
    <payment-accounts-dialog :showDialog="showPaymentAccountDialog" :accounts="paymentAccounts" @selected="selectAccount"/>
  </md-dialog>
</template>

<script>
  import PaymentAccountsDialog from '@/components/shared/payment/PaymentAccountsDialog.vue'
  import { mapGetters } from 'vuex'
  import numeral from 'numeral'

  export default {
    components: { PaymentAccountsDialog },
    props: {
      due: Object,
      showDialog: Boolean
    },
    data: function () {
      return {
        disabledDates: date => {
          if (!this.due.maxDateCharge) return true
          const maxDateCharge = new Date(this.due.maxDateCharge).getTime()
          const today = new Date()
          today.setHours(0, 0, 0, 0)
          return date.getTime() < today.getTime() || date.getTime() > maxDateCharge
        },
        amount: numeral(this.due.amount).format('0,0.00'),
        dateCharge: new Date(this.due.dateCharge),
        description: this.due.description,
        paymentMethod: `${this.due.account.brand || this.due.account.bank_name}••••${this.due.account.last4}`,
        paymentMethodObj: null,
        submited: false,
        showPaymentAccountDialog: false
      }
    },
    methods: {
      selectAccount (account) {
        if (account && account.id) {
          this.paymentMethod = `${account.brand || account.bank_name}••••${account.last4}`
          this.paymentMethodObj = account
        } else {
          this.paymentMethodObj = null
          this.paymentMethod = `${this.due.account.brand}••••${this.due.account.last4}`
        }
        this.showPaymentAccountDialog = false
      },
      apply () {
        this.due.dateCharge = this.dateCharge
        if (this.paymentMethodObj) {
          this.due.account = this.paymentMethodObj
        }
        this.$emit('updated', this.due)
      }
    },
    computed: {
      ...mapGetters('paymentModule', {
        paymentAccounts: 'paymentAccounts'
      })
    }
  }
</script>
