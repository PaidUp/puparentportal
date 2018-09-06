<template>
  <md-dialog :md-active.sync="showDialog" class="invoice-dialog">
    <div class="dialog-header">
      <div class="title">Invoice: {{ invoice.invoiceId }}</div>
      <md-menu v-if="false" md-size="small" md-direction="bottom-end">
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
              Invoice Approval Date: {{ $d(date, 'short') }}
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
        <label v-if="!disabled" class="md-helper-text">Charge date</label>
        <md-datepicker v-if="!disabled" class="datepicker-field" v-model="dateCharge" :md-disabled-dates="disabledDates">
          <span class="md-helper-text">Selecting certain dates may require club approval.</span>
        </md-datepicker>
        <md-field v-else>
          <label>Charge date</label>
          <md-input :disabled="true" v-model="dateChargeDisable"></md-input>
        </md-field>
        <md-field>
          <label for="payment">Payment Account</label>
          <md-input :readonly="true" :disabled="disabled" v-model="paymentMethod" @click="showPaymentAccountDialog = true"></md-input>
        </md-field>
        <md-field>
          <label>Status</label>
          <md-input :disabled="true" v-model="status"></md-input>
        </md-field>
        </div>
      </md-tab>
      <md-tab v-if="false" md-label="HISTORY">
        <div class="history-card">
          <div class="row">
            <div class="title">Invoice Charge Attempt</div>
            <div>INV123444</div>
          </div>
          <div>Dues - Payment 3 of 5</div>
          <div>$350 - 11-20-2018</div>
          <div class="row">
            <div>FAILED - VISA****1234</div>
            <div>10-01-2018</div>
          </div>
        </div>
        <div class="history-card">
          <div class="row">
            <div class="title">Invoice Charge Attempt</div>
            <div>INV123444</div>
          </div>
          <div>Dues - Payment 3 of 5</div>
          <div>$350 - 11-20-2018</div>
          <div class="row">
            <div>FAILED - VISA****1234</div>
            <div>10-01-2018</div>
          </div>
        </div>
        <div class="history-card">
          <div class="row">
            <div class="title">Invoice Charge Attempt</div>
            <div>INV123444</div>
          </div>
          <div>Dues - Payment 3 of 5</div>
          <div class="row">
            <div>$350 - 11-20-2018</div>
            <div>Felipe Fernandex</div>
          </div>
          <div class="row">
            <div>FAILED - VISA****1234</div>
            <div>10-01-2018</div>
          </div>
        </div>
      </md-tab>
    </md-tabs>
    <md-dialog-actions>
      <md-button class="md-accent lblue" @click="closeDialog">CANCEL</md-button>
      <md-button v-if="!disabled" class="md-accent lblue" :disabled="submited" @click="submit">SAVE</md-button>
    </md-dialog-actions>
    <v-pay-animation :animate="submited" @finish="closeDialog" />
    <payment-accounts-dialog :showDialog="showPaymentAccountDialog" :accounts="paymentAccounts" @selected="selectAccount"/>
  </md-dialog>
</template>

<script>
  import VPayAnimation from '@/components/shared/VPayAnimation.vue'
  import PaymentAccountsDialog from '@/components/shared/payment/PaymentAccountsDialog.vue'
  import { mapGetters, mapActions } from 'vuex'
  import currency from '@/helpers/currency'
  import capitalize from '@/helpers/capitalize'
  import Calculations from '@/helpers/calculations'

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
          const today = new Date()
          today.setHours(0, 0, 0, 0)
          return date.getTime() < today.getTime() || date.getTime() > maxDateCharge
        },
        dateCharge: new Date(),
        description: '',
        amount: 0,
        status: '',
        paymentMethod: '',
        paymentMethodObj: null,
        submited: false,
        showPaymentAccountDialog: false,
        dateChargeDisable: ''
      }
    },
    watch: {
      invoice () {
        if (this.invoice._id) {
          this.dateCharge = new Date(this.invoice.dateCharge)
          this.dateChargeDisable = this.$d(this.dateCharge, 'short')
          this.description = this.invoice.label
          this.amount = currency(this.invoice.price)
          this.status = capitalize(this.invoice.status)
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
          if (this.invoice.unbundle) {
            let calculation = Calculations.exec(this.invoice, account.object, this.invoice.priceBase)
            this.amount = calculation.price
          }
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
            unbundle: this.invoice.unbundle,
            dateCharge: this.dateCharge,
            status: 'autopay'
          }
        }
        if (this.paymentMethodObj) {
          params.values.paymentDetails = {
            externalCustomerId: this.invoice.paymentDetails.externalCustomerId,
            statementDescriptor: this.invoice.paymentDetails.statementDescriptor,
            paymentMethodtype: this.paymentMethodObj.object,
            externalPaymentMethodId: this.paymentMethodObj.id,
            brand: this.paymentMethodObj.brand || this.paymentMethodObj.bank_name,
            last4: this.paymentMethodObj.last4
          }
        }

        this.updateInvoice(params).then(res => {
          this.submited = false
          this.setSuccess('component.payment.update')
          this.$emit('updated', true)
        }).catch(reason => {
          this.paymentMethodObj = null
          this.submited = false
          this.setWarning('common.error')
        })
      }
    },
    computed: {
      disabled () {
        return !(this.invoice.status === 'autopay' || this.invoice.status === 'failed')
      },
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
<style>
  .datepicker-field{
    margin-bottom: 40px;
    padding-top: 0;
    min-height: 32px;
  }
  .datepicker-field button.md-button{
    top:0;
  }
  .datepicker-field input.md-input{
    width: 100%;
    max-width: 100%;
  }
  .date-label{
    color: rgba(0, 0, 0, 0.54);
    font-size: 12px;
    position: absolute;
  }
</style>

