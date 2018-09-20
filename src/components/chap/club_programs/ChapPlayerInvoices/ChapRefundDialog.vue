<template>
  <md-dialog :md-active.sync="showDialog" class="invoice-dialog" v-if="invoice" :md-click-outside-to-close="false">
    <div class="dialog-header">
      <div class="title">Refund Invoice: {{ invoice.seq }}</div>
    </div>
    <md-tabs md-alignment="fixed">
      <md-tab md-label="DETAILS">
        <div class="tab-box">
          <div class="order-numbers">
            <div>
            </div>
          </div>
        <md-field :class="{'md-invalid': $v.reason.$error}">
          <label>Reason</label>
          <md-input v-model="reason" @input="$v.reason.$touch()"></md-input>
          <span class="md-error" v-if="!$v.reason.required">{{ $t('validations.required', { field: 'Reason' }) }}</span>
        </md-field>
        <md-field :class="{'md-invalid': $v.price.$error}">
          <label>Amount</label>
          <span class="md-prefix">$</span>
          <md-input v-model="price" @input="$v.price.$touch()"></md-input>
          <span class="md-error" v-if="!$v.price.required">{{ $t('validations.required', { field: 'Amount' }) }}</span>
          <span class="md-error" v-if="!$v.price.decimal">{{ $t('validations.numeric', { field: 'Amount' }) }} </span>
        </md-field>
        </div>
      </md-tab>
    </md-tabs>
    <md-dialog-actions>
      <md-button class="md-accent lblue" @click="showDialog = false">CANCEL</md-button>
      <md-button :disabled="disableSaveButton" class="md-accent lblue" @click="refund" >REFUND</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
  import { required, decimal } from 'vuelidate/lib/validators'
  import { mapState, mapActions } from 'vuex'

  export default {
    props: {
      invoice: Object
    },
    data () {
      return {
        reason: null,
        price: null,
        invoiceReq: null,
        showDialog: false,
        submited: false
      }
    },
    watch: {
      invoice () {
        if (this.invoice) {
          this.showDialog = true
          this.getInvoiceById(this.invoice.id).then(inv => {
            this.invoiceReq = inv
            this.price = this.invoice.price
            this.submited = false
          })
        } else {
          this.showDialog = false
        }
      },
      submited () {
        this.$emit('submited', this.submited)
      }
    },
    methods: {
      ...mapActions('playerInvoicesModule', {
        getInvoiceById: 'getInvoiceById',
        refundInvoice: 'refundInvoice',
        update: 'update',
        newCredit: 'newCredit',
        getProduct: 'getProduct'
      }),
      ...mapActions('messageModule', {
        setSuccess: 'setSuccess',
        setWarning: 'setWarning'
      }),
      refund () {
        if (this.submited) return false
        this.showDialog = false
        this.submited = true
        let refundParams = {
          chargeId: this.chargeId,
          reason: this.reason,
          amount: this.price
        }
        let refundResponse
        let product
        this.refundInvoice(refundParams).then(refundResp => {
          refundResponse = refundResp
          return this.getProduct(this.programSelected)
        }).then(prd => {
          product = prd
          let params = {
            id: this.invoice.id,
            product: prd,
            values: {
              label: this.invoice.title,
              price: (this.invoice.price - this.price),
              dateCharge: this.invoice.date,
              maxDateCharge: this.invoice.maxDate,
              status: this.invoice.status,
              paymentDetails: this.invoice.paymentDetails,
              user: this.invoice.user,
              updateOn: new Date(),
              $push: {attempts: refundResponse}
            }
          }
          return this.update(params)
        }).then(resp => {
          let creditParams = {
            label: this.reason,
            description: this.reason,
            price: this.price,
            beneficiaryId: this.beneficiary.id,
            assigneeEmail: this.invoice.user.userEmail,
            productId: product._id,
            productName: product.name,
            organizationId: this.organization._id,
            season: this.seasonSelected,
            status: 'refunded',
            dateCharge: new Date()
          }
          return this.newCredit(creditParams)
        }).then(crd => {
          this.setSuccess('Invoice was refunded succeeded')
          this.$emit('updated', true)
          this.submited = false
        }).catch(reason => {
          this.setWarning('Invoice was not refunded')
        })
      }
    },
    computed: {
      ...mapState('playerInvoicesModule', {
        beneficiary: 'beneficiary',
        parents: 'parents'
      }),
      ...mapState('clubprogramsModule', {
        programSelected: 'programSelected',
        seasonSelected: 'seasonSelected',
        organization: 'organization'
      }),
      disableSaveButton () {
        return this.$v.$invalid || this.submited
      },
      chargeId () {
        let chargeId = null
        if (this.invoiceReq) {
          this.invoiceReq.attempts.forEach(attemp => {
            if (attemp.object === 'charge' && attemp.status === 'succeeded') chargeId = attemp.id
          })
        }
        return chargeId
      }
    },
    validations: {
      reason: {
        required
      },
      price: {
        required, decimal
      }
    }
  }
</script>

