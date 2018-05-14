<template>
  <md-dialog :md-active.sync="showDialog" class="invoice-dialog small">
    <div class="dialog-header">
      <div class="title">Invoice: {{ invoice.invoiceId }}</div>
      <md-menu md-size="small" md-direction="bottom-end">
        <md-button class="md-icon-button" md-menu-trigger>
          <md-icon>file_download</md-icon>
        </md-button>
        <md-menu-content class="dialog-menu-content">
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
          <md-input :disabled="true" v-model="invoice.price"></md-input>
        </md-field>
        <md-datepicker v-model="dateCharge" :md-disabled-dates="disabledDates">
          <label>Charge date</label>
        </md-datepicker>
        <md-field>
          <label for="payment">Payment Account</label>
          <md-select name="payment" id="payment" v-model="paymentMethod">
            <md-option v-for="pm in paymentAccounts" :key="pm.id" :value="pm.id">{{pm.name}}</md-option>
          </md-select>
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
  </md-dialog>
</template>

<script>
  import VPayAnimation from '@/components/shared/VPayAnimation.vue'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    props: {
      invoice: Object,
      closeDialog: Function
    },
    components: { VPayAnimation },
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
        paymentMethodObj: '',
        submited: false
      }
    },
    watch: {
      invoice () {
        if (this.invoice._id) {
          this.dateCharge = new Date(this.invoice.dateCharge)
          this.description = this.invoice.label
          this.amount = this.invoice.price
          this.status = this.invoice.status
          this.paymentMethod = this.invoice.paymentDetails.externalPaymentMethodId
        }
      },
      paymentMethod () {
        this.paymentAccounts.forEach(pa => {
          if (pa.id === this.paymentMethod) {
            this.paymentMethodObj = {
              paymentMethodtype: pa.object,
              externalPaymentMethodId: pa.id,
              brand: pa.brand || pa.bank_name,
              last4: pa.last4
            }
          }
        })
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
      submit () {
        this.submited = true
        this.updateInvoice({
          id: this.invoice._id,
          values: {
            dateCharge: this.dateCharge,
            status: 'autopay',
            paymentDetails: {
              externalCustomerId: this.invoice.paymentDetails.externalCustomerId,
              statementDescriptor: this.invoice.paymentDetails.statementDescriptor,
              paymentMethodtype: this.paymentMethodObj.paymentMethodtype,
              externalPaymentMethodId: this.paymentMethodObj.externalPaymentMethodId,
              brand: this.paymentMethodObj.brand,
              last4: this.paymentMethodObj.last4
            }
          }
        }).then(res => {
          this.submited = false
          this.setSuccess('component.payment.update')
        }).catch(reason => {
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
