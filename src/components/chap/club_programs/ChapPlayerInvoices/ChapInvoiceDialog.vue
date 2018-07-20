<template>
  <md-dialog :md-active.sync="showDialog" class="invoice-dialog">
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
          </div>
        <md-field>
          <label>Description</label>
          <md-input disabled v-model="updInvoice.label"></md-input>
        </md-field>
        <md-field>
          <label>Amount</label>
          <span class="md-prefix">$</span>
          <md-input v-model="updInvoice.price"></md-input>
        </md-field>
        <label class="md-helper-text">Charge date</label>
        <md-datepicker class="datepicker-field" v-model="updInvoice.dateCharge">
          <span class="md-helper-text">Selecting certain dates may require club approval.</span>
        </md-datepicker>
        <md-field>
          <label for="payment">Payment Account</label>
          <md-input :readonly="true" :disabled="disabled" ></md-input>
        </md-field>
        <md-field>
          <label>Status</label>
          <md-input :disabled="true" ></md-input>
        </md-field>
        </div>
      </md-tab>
      <md-tab md-label="HISTORY">
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
      <md-button class="md-accent lblue" @click="showDialog = false">CANCEL</md-button>
      <md-button v-if="!disabled" class="md-accent lblue" >SAVE</md-button>
    </md-dialog-actions>
    <v-pay-animation  @finish="closeDialog" />
  </md-dialog>
</template>

<script>
  import VPayAnimation from '@/components/shared/VPayAnimation.vue'
  import { mapGetters, mapActions } from 'vuex'
  // import currency from '@/helpers/currency'
  // import capitalize from '@/helpers/capitalize'

  export default {
    components: { VPayAnimation },
    props: {
      invoice: Object,
      show: Boolean
    },
    data () {
      return {
        showDialog: false,
        updInvoice: {
          label: this.invoice.title,
          price: this.invoice.price,
          dateCharge: this.invoice.date,
          maxDateCharge: this.invoice.maxDate,
          paymentDetails: this.invoice.paymentDetails
        },
        parent: null,
        submited: false
      }
    },
    watch: {
      show () {
        this.showDialog = this.show
      },
      showDialog () {
        this.$emit('changeStatus', this.showDialog)
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
        setWarning: 'setWarning'
      }),
      closeDialog () {
        console.log('close')
      },
      save () {
        this.getProduct(this.invoice.productId).then(product => {
          this.updInvoice.updateOn = new Date()
          let params = {
            id: this.invoice.id,
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
    },
    computed: {
      disabled () {
        return !(this.invoice.status === 'autopay' || this.invoice.status === 'failed')
      },
      ...mapGetters('paymentModule', {
        paymentAccounts: 'paymentAccounts'
      }),
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

