<template>
  <md-dialog :md-active.sync="showDialog" class="invoice-dialog small">
    <div class="dialog-header">
      <div class="title">Invoice: {{ invoice.invoiceId }}</div>
      <md-menu md-size="small" md-direction="bottom-end">
        <md-button class="md-icon-button" md-menu-trigger>
          <md-icon>file_download</md-icon>
        </md-button>
        <md-menu-content class="custom-menu-content">
          <md-menu-item @click="v=false">Download Invoice</md-menu-item>
          <md-menu-item @click="v=false">Download Contract</md-menu-item>
        </md-menu-content>
      </md-menu>
    </div>
    <md-tabs md-alignment="fixed">
      <md-tab md-label="DETAILS">
        <div class="tab-box">
          <div class="order-numbers">
            <div>
            </div>
            <div>
              Date: {{ $d(date, 'short') }}
            </div>
          </div>
          <div class="instructions">
          If you have problems making changes to your invoice, please contact PaidUp Support M-F 9am-5pm CST.
          <a href="mailto:support@getpaidup.com">support@getpaidup.com</a>
          -
          <a href="tel:855-764-3232">855-764-3232</a>
        </div>
        <md-field>
          <label>Description</label>
          <md-input disabled v-model="invoice.label"></md-input>
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
        <md-field>
          <label>Status</label>
          <md-input :disabled="true" v-model="status"></md-input>
        </md-field>
        </div>
      </md-tab>
      <md-tab v-if="false" md-label="HISTORY">
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus
          qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus
          qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
      </md-tab>
    </md-tabs>
    <md-dialog-actions>
      <md-button class="md-accent lblue" @click="closeDialog">CANCEL</md-button>
      <md-button class="md-accent lblue" :disabled="submited" @click="submit">SAVE</md-button>
    </md-dialog-actions>
    <v-pay-animation :animate="submited" @finish="closeDialog" />
    <payment-accounts-dialog :showDialog="showPaymentAccountDialog" :accounts="paymentAccounts" @selected="selectAccount"/>
  </md-dialog>
</template>

<script>
  import VPayAnimation from '@/components/shared/VPayAnimation.vue'
  import PaymentAccountsDialog from '@/components/shared/payment/PaymentAccountsDialog.vue'
  import { mapGetters, mapActions } from 'vuex'
  import numeral from 'numeral'

  export default {
    components: { VPayAnimation, PaymentAccountsDialog },
    props: {
      invoice: Object,
      closeDialog: Function
    },
    data: function () {
      return {
        disabledDates: date => {
          if (!this.invoice.maxDateCharge) return true
          const maxDateCharge = new Date(this.invoice.maxDateCharge).getTime()
          const dateCharge = new Date(this.invoice.dateCharge).getTime()
          return date.getTime() <= dateCharge || date.getTime() > maxDateCharge
        },
        dateCharge: new Date(),
        description: '',
        amount: 0,
        status: '',
        paymentMethod: '',
        paymentMethodObj: null,
        submited: false,
        showPaymentAccountDialog: false
      }
    },
    watch: {
      invoice () {
        if (this.invoice._id) {
          this.dateCharge = new Date(this.invoice.dateCharge)
          this.description = this.invoice.label
          this.amount = numeral(this.invoice.price).format('0,0.00')
          this.status = this.invoice.status.toUpperCase()
          this.paymentMethod = `${this.invoice.paymentDetails.brand}••••${this.invoice.paymentDetails.last4}`
        }
      }
    },
    methods: {
      ...mapActions('paymentModule', {
        updateInvoice: 'updateInvoice'
      }),
      ...mapActions('messageModule', {
        setSuccess: 'setSuccess',
        setWarning: 'setWarning'
      }),
      selectAccount (account) {
        if (account && account.id) {
          this.paymentMethod = `${account.brand || account.bank_name}••••${account.last4}`
          this.paymentMethodObj = account
        } else {
          this.paymentMethodObj = null
          this.paymentMethod = `${this.invoice.paymentDetails.brand}••••${this.invoice.paymentDetails.last4}`
        }
        this.showPaymentAccountDialog = false
      },
      submit () {
        this.submited = true
        let params = {
          id: this.invoice._id,
          values: {
            dateCharge: this.dateCharge,
            status: 'autopay'
          }
        }
        if (this.paymentMethodObj) {
          params.values.paymentDetails = {
            externalCustomerId: this.invoice.paymentDetails.externalCustomerId,
            statementDescriptor: this.invoice.paymentDetails.statementDescriptor,
            paymentMethodtype: this.paymentMethodObj.paymentMethodtype,
            externalPaymentMethodId: this.paymentMethodObj.externalPaymentMethodId,
            brand: this.paymentMethodObj.brand,
            last4: this.paymentMethodObj.last4
          }
        }
  
        this.updateInvoice(params).then(res => {
          this.submited = false
          this.setSuccess('component.payment.update')
        }).catch(reason => {
          this.paymentMethodObj = null
          this.submited = false
          this.setWarning('common.error')
        })
      }
    },
    computed: {
      ...mapGetters('paymentModule', {
        paymentAccounts: 'paymentAccounts'
      }),
      showDialog () {
        return typeof this.invoice._id === 'string'
      },
      date () {
        if (this.invoice.createOn) return new Date(this.invoice.createOn)
        return new Date()
      }
    }
  }
</script>
