<template>
  <md-dialog :md-active.sync="showDialog" class="invoice-dialog">
    <div class="dialog-header">
      <div class="title">New Invoice</div>
    </div>
    <md-tabs md-alignment="fixed">
      <md-tab md-label="DETAILS">
        <div class="tab-box">
          <div class="order-numbers">
            <div>
            </div>
          </div>
        <md-field :class="{'md-invalid': $v.label.$error}">
          <label>Description</label>
          <md-input v-model="label" @input="$v.label.$touch()"></md-input>
          <span class="md-error" v-if="!$v.label.required">{{ $t('validations.required', { field: 'Description' }) }}</span>
        </md-field>
        <md-field :class="{'md-invalid': $v.price.$error}">
          <label>Amount</label>
          <span class="md-prefix">$</span>
          <md-input v-model="price" @input="$v.price.$touch()"></md-input>
          <span class="md-error" v-if="!$v.price.required">{{ $t('validations.required', { field: 'Amount' }) }}</span>
          <span class="md-error" v-if="!$v.price.decimal">{{ $t('validations.numeric', { field: 'Amount' }) }} </span>
        </md-field>
        <div :class="{'md-invalid': $v.dateCharge.$error}">
          <label>Charge Date</label>
          <md-datepicker class="datepicker-field" @input="$v.dateCharge.$touch()" v-model="dateCharge"></md-datepicker>
          <span class="md-error" v-if="!$v.dateCharge.required">{{ $t('validations.required', { field: 'Charge Date' }) }}</span>
        </div>
        <div v-if="status === 'autopay'" :class="{'md-invalid': $v.dateCharge.$error}">
          <label>Max Charge Date</label>
          <md-datepicker class="datepicker-field" v-model="maxDateCharge" @input="$v.maxDateCharge.$touch()"></md-datepicker>
          <span class="md-error" v-if="!$v.maxDateCharge.required">{{ $t('validations.required', { field: 'Max Charge Date' }) }}</span>
        </div>
        <md-field :class="{'md-invalid': $v.dateCharge.$error}">
          <label>Status</label>
          <md-select class="custom-select" v-model="status" @input="$v.status.$touch()">
            <md-option value="autopay">Autopay</md-option>
            <md-option value="paid">Paid</md-option>
            <md-option value="credited">Credited</md-option>
            <md-option value="refunded">Refunded</md-option>
            <md-option value="discount">Discount</md-option>
          </md-select>
          <span class="md-error" v-if="!$v.status.required">{{ $t('validations.required', { field: 'Status' }) }}</span>
        </md-field>
        <md-field :class="{'md-invalid': $v.parent.$error}">
          <label for="payment">Parent</label>
          <md-select class="custom-select" v-model="parent" @input="$v.parent.$touch()">
            <md-option v-for="parent in parents" :key="parent._id" :value="parent._id">{{ parent.firstName + ' ' + parent.lastName }}</md-option>
          </md-select>
          <span class="md-error" v-if="!$v.parent.required">{{ $t('validations.required', { field: 'Parent' }) }}</span>
        </md-field>
        <md-field v-if="status === 'autopay'" :class="{'md-invalid': $v.pmSelected.$error}">
          <label for="payment">Payment Account</label>
          <md-select class="custom-select" v-model="pmSelected" @input="$v.pmSelected.$touch()">
            <md-option v-for="pm in parentPaymentMethods" :key="pm.id" :value="pm.id">{{ pm.brand || pm.bank_name }}••••{{ pm.last4 }}</md-option>
          </md-select>
          <span class="md-error" v-if="!$v.pmSelected.required">{{ $t('validations.required', { field: 'Payment Account' }) }}</span>
        </md-field>
        
        </div>
      </md-tab>
    </md-tabs>
    <md-dialog-actions>
      <md-button class="md-accent lblue" @click="showDialog = false">CANCEL</md-button>
      <md-button v-if="!status || status === 'autopay'" :disabled="disableSaveButton" class="md-accent lblue" @click="newInvoice" >SAVE</md-button>
      <md-button v-else :disabled="disableSaveButton" class="md-accent lblue" @click="addCredit">SAVE OTHER</md-button>
    </md-dialog-actions>
    <v-pay-animation :animate="submited"  @finish="showDialog = false" />
  </md-dialog>
</template>

<script>
  import VPayAnimation from '@/components/shared/VPayAnimation.vue'
  import { mapState, mapActions } from 'vuex'
  import { required, decimal } from 'vuelidate/lib/validators'

  export default {
    components: { VPayAnimation },
    props: {
      show: Boolean
    },
    data () {
      return {
        label: null,
        price: null,
        dateCharge: null,
        maxDateCharge: null,
        status: null,
        paymentDetails: null,
        user: null,
        pmSelected: null,
        showDialog: false,
        parent: null,
        submited: false
      }
    },
    watch: {
      show () {
        this.showDialog = this.show
        if (this.show) {
          this.reset()
        }
      },
      showDialog () {
        this.$emit('changeStatus', this.showDialog)
      },
      parent () {
        this.pmSelected = null
        this.user = this.parentObj
        this.paymentDetails = null
      },
      pmSelected () {
        if (this.parentPaymentMethods && this.parentPaymentMethods.length) {
          this.parentPaymentMethods.forEach(account => {
            if (this.pmSelected === account.id) {
              this.paymentDetails = {
                externalCustomerId: account.customer,
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
      if (this.show) {
        this.reset()
      }
    },
    methods: {
      ...mapActions('playerInvoicesModule', {
        new: 'new',
        newCredit: 'newCredit',
        getProduct: 'getProduct'
      }),
      ...mapActions('messageModule', {
        setSuccess: 'setSuccess',
        setWarning: 'setWarning'
      }),
      reset () {
        this.label = null
        this.price = null
        this.dateCharge = null
        this.maxDateCharge = null
        this.status = null
        this.paymentDetails = null
        this.user = null
        this.pmSelected = null
        this.parent = null
        this.submited = false
      },
      newInvoice () {
        this.submited = true
        if (this.user && !this.paymentDetails) {
          return this.setWarning('Payment account is required')
        }
        this.getProduct(this.programSelected).then(product => {
          this.paymentDetails.statementDescriptor = product.statementDescriptor
          let inv = {
            label: this.label,
            price: this.price,
            dateCharge: this.dateCharge,
            maxDateCharge: this.maxDateCharge,
            status: 'autopay',
            paymentDetails: this.paymentDetails,
            user: this.user,
            organizationId: this.organization._id,
            organizationName: this.organization.businessName,
            connectAccount: this.organization.connectAccount,
            productId: product._id,
            productName: product.name,
            beneficiaryId: this.beneficiary.id,
            beneficiaryFirstName: this.beneficiary.firstName,
            beneficiaryLastName: this.beneficiary.lastName,
            season: this.seasonSelected
          }
          let params = {
            product,
            values: inv
          }
          this.new(params).then(resp => {
            this.setSuccess('Invoice was created succeeded')
            this.$emit('created', true)
            this.submited = false
          }).catch(reason => {
            this.submited = false
            this.setWarning('Invoice was not created')
          })
        })
      },
      addCredit () {
        this.submited = true
        this.getProduct(this.programSelected).then(product => {
          let params = {
            label: this.label,
            description: this.label,
            price: this.price,
            beneficiaryId: this.beneficiary.id,
            assigneeEmail: this.user.userEmail,
            productId: product._id,
            productName: product.name,
            organizationId: this.organization._id,
            season: this.seasonSelected,
            status: this.status,
            dateCharge: this.dateCharge
          }
          this.newCredit(params).then(resp => {
            this.setSuccess('Credit was created succeeded')
            this.$emit('created', true)
            this.submited = false
          }).catch(reason => {
            this.submited = false
            this.setWarning('Credit was not created')
          })
        })
      }
    },
    computed: {
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
      disableSaveButton () {
        return this.$v.$invalid || this.submmited
      },
      parentPaymentMethods () {
        if (!this.user) return []
        if (this.parent) return this.paymentMethods[this.parent]
        return this.paymentMethods[this.user.userId] || []
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
    },
    validations () {
      if (this.status === 'autopay') {
        return {
          label: {
            required
          },
          price: {
            required, decimal
          },
          dateCharge: {
            required
          },
          maxDateCharge: {
            required
          },
          status: {
            required
          },
          pmSelected: {
            required
          },
          parent: {
            required
          }
        }
      }
      return {
        label: {
          required
        },
        price: {
          required, decimal
        },
        dateCharge: {
          required
        },
        status: {
          required
        },
        parent: {
          required
        }
      }
    }
  }
</script>

