<template>
  <md-dialog :md-active.sync="showDialog" class="invoice-dialog" v-if="invoice" :md-click-outside-to-close="false">
    <div class="dialog-header">
      <div class="title" v-if="!isClone">Credit: {{ invoice.seq }}</div>
      <md-menu v-if="!isClone" md-size="small" md-direction="bottom-end">
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
        <md-field :class="{'md-invalid': $v.updInvoice.label.$error}">
          <label>Description</label>
          <md-input v-model="updInvoice.label" @input="$v.updInvoice.label.$touch()"></md-input>
          <span class="md-error" v-if="!$v.updInvoice.label.required">{{ $t('validations.required', { field: 'Description' }) }}</span>
        </md-field>
        <md-field :class="{'md-invalid': $v.updInvoice.price.$error}">
          <label>Amount</label>
          <span class="md-prefix">$</span>
          <md-input v-model="updInvoice.price" @input="$v.updInvoice.price.$touch()"></md-input>
          <span class="md-error" v-if="!$v.updInvoice.price.required">{{ $t('validations.required', { field: 'Amount' }) }}</span>
          <span class="md-error" v-if="!$v.updInvoice.price.decimal">{{ $t('validations.numeric', { field: 'Amount' }) }} </span>
        </md-field>
        <div >
          <label>Date</label>
          <md-datepicker class="datepicker-field" @input="$v.updInvoice.dateCharge.$touch()" v-model="updInvoice.dateCharge"></md-datepicker>
          <span class="md-error" v-if="!$v.updInvoice.dateCharge.required">{{ $t('validations.required', { field: 'Date' }) }}</span>
        </div>
        <md-field :class="{'md-invalid': $v.updInvoice.status.$error}">
          <label>Status</label>
          <md-select v-if="invoice.status !== 'failed'" class="custom-select" v-model="updInvoice.status">
            <md-option value="paid">Paid</md-option>
            <md-option value="credited">Credited</md-option>
            <md-option value="discount">Discount</md-option>
            <md-option value="refunded">Refunded</md-option>
          </md-select>
          <span class="md-error" v-if="!$v.updInvoice.status.required">{{ $t('validations.required', { field: 'Status' }) }}</span>
        </md-field>
        <md-field :class="{'md-invalid': $v.updInvoice.assigneeEmail.$error}">
          <label for="payment">Parent</label>
          <md-select class="custom-select" v-model="updInvoice.assigneeEmail" @input="$v.updInvoice.assigneeEmail.$touch()">
            <md-option v-for="parent in parents" :key="parent._id" :value="parent.email">{{ parent.firstName + ' ' + parent.lastName }}</md-option>
          </md-select>
          <span class="md-error" v-if="!$v.updInvoice.assigneeEmail.required">{{ $t('validations.required', { field: 'Parent' }) }}</span>
        </md-field>
        <div>
          <label>Tags</label>
          <p>
            <md-chip class="lblue" @md-delete="removeTag(chip)" v-for="chip in updInvoice.tags" :key="chip" md-deletable>{{ chip }}</md-chip>
            <md-chip class="" @click="selectTag(chip)" v-for="chip in tagsAvailable" :key="chip" md-clickable>{{ chip }}</md-chip>
          </p>
        </div>
        </div>
      </md-tab>
    </md-tabs>
    <md-dialog-actions>
      <md-button class="md-accent lblue" @click="showDialog = false">CANCEL</md-button>
      <md-button v-if='isClone' :disabled="disableSaveButton" class="md-accent lblue" @click="clone" >CLONE</md-button>
      <md-button v-else :disabled="disableSaveButton" class="md-accent lblue" @click="save" >SAVE</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
  import VPayAnimation from '@/components/shared/VPayAnimation.vue'
  import { required, decimal } from 'vuelidate/lib/validators'
  import { mapState, mapActions } from 'vuex'

  export default {
    components: { VPayAnimation },
    props: {
      invoice: Object,
      isClone: Boolean,
      show: Boolean
    },
    data () {
      return {
        updInvoice: {},
        showDialog: this.show,
        submited: false,
        tagsAvailable: []
      }
    },
    watch: {
      invoice () {
        if (this.invoice) {
          this.reset()
        }
      },
      show () {
        this.showDialog = this.show
      },
      showDialog () {
        if (!this.showDialog) {
          this.$emit('close')
        }
      },
      submited () {
        this.$emit('submited', this.submited)
      }
    },
    mounted () {
      if (this.invoice) {
        this.reset()
      }
    },
    methods: {
      ...mapActions('playerInvoicesModule', {
        newCredit: 'newCredit',
        updateCredit: 'updateCredit',
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
          status: this.invoice.status,
          tags: this.invoice.tags,
          assigneeEmail: this.invoice.assigneeEmail
        }
        this.tagsAvailable = this.organization.tags.filter(tag => {
          if (!this.invoice.tags || !this.invoice.tags.length) return true
          return this.invoice.tags.indexOf(tag) === -1
        })
        this.submited = false
      },
      selectTag (value) {
        this.updInvoice.tags.push(value)
        this.tagsAvailable.splice(this.tagsAvailable.indexOf(value), 1)
      },
      removeTag (value) {
        this.tagsAvailable.push(value)
        this.updInvoice.tags.splice(this.updInvoice.tags.indexOf(value), 1)
      },
      save () {
        if (this.submited) return false
        this.showDialog = false
        this.submited = true
        this.updInvoice.updateOn = new Date()
        this.updInvoice.dateCharge = this.$moment.removeTimeZone(this.updInvoice.dateCharge)
        let params = {
          id: this.invoice.id,
          values: this.updInvoice
        }
        this.updateCredit(params).then(resp => {
          this.setSuccess('Credit was updated succeeded')
          this.$emit('updated', true)
          this.submited = false
        }).catch(reason => {
          this.setWarning('Credit was not updated')
        })
      },
      clone () {
        if (this.submited) return false
        this.showDialog = false
        this.submited = true
        this.getProduct(this.programSelected).then(product => {
          this.updInvoice['description'] = this.updInvoice.label
          this.updInvoice['beneficiaryId'] = this.beneficiary.id
          this.updInvoice['productId'] = product._id
          this.updInvoice['productName'] = product.name
          this.updInvoice['organizationId'] = this.organization._id
          this.updInvoice['season'] = this.seasonSelected
          this.updInvoice['dateCharge'] = this.$moment.removeTimeZone(this.updInvoice.dateCharge)
          this.newCredit(this.updInvoice).then(resp => {
            this.setSuccess('Credit was cloned succeeded')
            this.$emit('updated', true)
            this.submited = false
          }).catch(reason => {
            this.submited = false
            this.setWarning('Credit was not cloned')
          })
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
      }
    },
    validations: {
      updInvoice: {
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
        assigneeEmail: {
          required
        }
      }
    }
  }
</script>

