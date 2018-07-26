<template>
  <md-dialog :md-active.sync="showDialog" class="invoice-dialog" v-if="invoice">
    <div class="dialog-header" v-if="!isClone">
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
          <md-input v-model="updInvoice.label"></md-input>
        </md-field>
        <md-field>
          <label>Amount</label>
          <span class="md-prefix">$</span>
          <md-input v-model="updInvoice.price" :disabled="disabled"></md-input>
        </md-field>
        <md-field v-if="disabled">
          <label>Charge date</label>
          <md-input :value="$d(updInvoice.dateCharge, 'short')" :disabled="disabled"></md-input>
        </md-field>
        <div v-else>
          <label>Charge date</label>
          <md-datepicker class="datepicker-field" v-model="updInvoice.dateCharge"></md-datepicker>
        </div>
        <md-field v-if="disabled">
          <label>Max Charge Date</label>
          <md-input :value="$d(updInvoice.maxDateCharge, 'short')" :disabled="disabled"></md-input>
        </md-field>
        <div v-else>
          <label>Max Charge Date</label>
          <md-datepicker class="datepicker-field" v-model="updInvoice.maxDateCharge"></md-datepicker>
        </div>
        <md-field>
          <label>Status</label>
          <md-select disabled v-if="invoice.status !== 'failed'" class="custom-select" v-model="updInvoice.status">
            <md-option value="paidup">Paidup</md-option>
            <md-option value="autopay">Autopay</md-option>
            <md-option value="refunded">Refunded</md-option>
          </md-select>
          <md-select v-else class="custom-select" v-model="updInvoice.status">
            <md-option value="failed">Failed</md-option>
            <md-option value="autopay">Autopay</md-option>
          </md-select>
        </md-field>
        <md-field>
          <label for="payment">Parent</label>
          <md-select class="custom-select" v-model="parent" :disabled="disabled">
            <md-option v-for="parent in parents" :key="parent._id" :value="parent._id">{{ parent.firstName + ' ' + parent.lastName }}</md-option>
          </md-select>
        </md-field>
        <md-field>
          <label for="payment">Payment Account</label>
          <md-select class="custom-select" v-model="pmSelected" :disabled="disabled">
            <md-option v-for="pm in parentPaymentMethods" :key="pm.id" :value="pm.id">{{ pm.brand || pm.bank_name }}••••{{ pm.last4 }}</md-option>
          </md-select>
        </md-field>
        
        </div>
      </md-tab>
      <md-tab md-label="HISTORY" v-if="!isClone">
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
      <md-button v-if='isClone' :disabled="submited" class="md-accent lblue" @click="clone" >CLONE</md-button>
      <md-button v-else :disabled="submited" class="md-accent lblue" @click="save" >SAVE</md-button>
    </md-dialog-actions>
    <v-pay-animation :animate="submited"  @finish="showDialog = false" />
  </md-dialog>
</template>

<script>
  import VPayAnimation from '@/components/shared/VPayAnimation.vue'
  import { mapState, mapActions } from 'vuex'

  export default {
    components: { VPayAnimation },
    props: {
      invoice: Object,
      show: Boolean,
      isClone: Boolean
    },
    data () {
      return {
        updInvoice: {},
        pmSelected: null,
        showDialog: false,
        parent: null,
        submited: false
      }
    },
    watch: {
      invoice () {
        if (this.invoice) {
          this.showDialog = true
          this.reset()
        } else {
          this.showDialog = false
        }
      },
      showDialog () {
        this.$emit('changeStatus', this.showDialog)
      },
      parent () {
        this.pmSelected = null
        this.updInvoice['user'] = this.parentObj
        delete this.updInvoice.paymentDetails
      },
      pmSelected () {
        if (this.parentPaymentMethods && this.parentPaymentMethods.length) {
          this.parentPaymentMethods.forEach(account => {
            if (this.pmSelected === account.id) {
              this.updInvoice.paymentDetails = {
                externalCustomerId: account.customer,
                statementDescriptor: this.invoice.paymentDetails.statementDescriptor,
                paymentMethodtype: account.object,
                externalPaymentMethodId: account.id,
                brand: account.brand || account.bank_name,
                last4: account.last4
              }
            }
          })
        }
      }
    },
    mounted () {
      if (this.invoice) {
        this.reset()
      }
    },
    methods: {
      ...mapActions('playerInvoicesModule', {
        update: 'update',
        new: 'new',
        getProduct: 'getProduct'
      }),
      ...mapActions('messageModule', {
        setSuccess: 'setSuccess',
        setWarning: 'setWarning'
      }),
      reset () {
        this.updInvoice = {
          label: this.invoice.title,
          price: this.invoice.price,
          dateCharge: this.invoice.date,
          maxDateCharge: this.invoice.maxDate,
          status: this.isClone ? 'autopay' : this.invoice.status,
          paymentDetails: this.invoice.paymentDetails,
          user: this.invoice.user
        }
        this.pmSelected = this.invoice.paymentDetails.externalPaymentMethodId
        this.parent = this.invoice.user.userId
        this.submited = false
      },
      save () {
        this.submited = true
        if (this.updInvoice.user && !this.updInvoice.paymentDetails) {
          this.setWarning('Payment account is required')
          this.submited = false
          return false
        }
        this.getProduct(this.programSelected).then(product => {
          this.updInvoice.updateOn = new Date()
          let params = {
            id: this.invoice.id,
            product,
            values: this.updInvoice
          }
          this.update(params).then(resp => {
            this.setSuccess('Invoice was updated succeeded')
            this.$emit('updated', true)
            this.submited = false
          }).catch(reason => {
            this.setWarning('Invoice was not updated')
          })
        })
      },
      clone () {
        this.submited = true
        if (this.updInvoice.user && !this.updInvoice.paymentDetails) {
          return this.setWarning('Payment account is required')
        }
        this.getProduct(this.programSelected).then(product => {
          this.updInvoice['organizationId'] = this.organization._id
          this.updInvoice['organizationName'] = this.organization.businessName
          this.updInvoice['connectAccount'] = this.organization.connectAccount
          this.updInvoice['productId'] = product._id
          this.updInvoice['productName'] = product.name
          this.updInvoice['beneficiaryId'] = this.beneficiary.id
          this.updInvoice['beneficiaryFirstName'] = this.beneficiary.firstName
          this.updInvoice['beneficiaryLastName'] = this.beneficiary.lastName
          this.updInvoice['season'] = this.seasonSelected
          this.updInvoice['status'] = 'autopay'
          let params = {
            product,
            values: this.updInvoice
          }
          this.new(params).then(resp => {
            this.setSuccess('Invoice was cloned succeeded')
            this.$emit('updated', true)
            this.submited = false
          }).catch(reason => {
            this.submited = false
            this.setWarning('Invoice was not cloned')
          })
        })
      }
    },
    computed: {
      disabled () {
        return !this.isClone && this.invoice.status !== 'autopay' && this.invoice.status !== 'failed'
      },
      ...mapState('playerInvoicesModule', {
        beneficiary: 'beneficiary',
        paymentMethods: 'paymentMethods',
        parents: 'parents'
      }),
      ...mapState('clubprogramsModule', {
        programSelected: 'programSelected',
        seasonSelected: 'seasonSelected',
        organization: 'organization'
      }),
      parentPaymentMethods () {
        if (!this.invoice.user) return []
        if (this.parent) return this.paymentMethods[this.parent]
        return this.paymentMethods[this.invoice.user.userId] || []
      },
      date () {
        if (this.invoice.createOn) return new Date(this.invoice.createOn)
        return new Date()
      },
      parentObj () {
        let resp = null
        if (this.parent) {
          this.parents.forEach(parent => {
            if (parent._id === this.parent) {
              resp = {
                userId: parent._id,
                userFirstName: parent.firstName,
                userLastName: parent.lastName,
                userEmail: parent.email
              }
            }
          })
        }
        return resp
      }
    }
  }
</script>

