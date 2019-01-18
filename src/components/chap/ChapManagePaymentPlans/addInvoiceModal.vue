<template>
  <md-dialog :md-active.sync="showDialog" class="invoice-dialog" :md-click-outside-to-close="false" :md-close-on-esc="false">
    <div class="dialog-header">
      <div class="title">Add Invoice</div>
    </div>
    <md-tabs md-alignment="fixed">
      <md-tab md-label="DETAILS">
        <div class="tab-box">
          <div class="order-numbers">
            <div>
            </div>
          </div>
          <md-field :class="{'md-invalid': $v.dateCharge.$error}">
            <label>Status</label>
            <md-select class="custom-select" v-model="status" @input="$v.status.$touch()">
              <md-option value="autopay">Autopay</md-option>
              <md-option value="paid">Paid</md-option>
              <md-option value="credited">Credited</md-option>
              <md-option value="discount">Discount</md-option>
            </md-select>
            <span class="md-error" v-if="!$v.status.required">{{ $t('validations.required', { field: 'Status' }) }}</span>
          </md-field>
          <md-field :class="{'md-invalid': $v.description.$error}">
            <label>Description</label>
            <md-input v-model="description" @input="$v.description.$touch()"></md-input>
            <span class="md-error" v-if="!$v.description.required">{{ $t('validations.required', { field: 'Description' }) }}</span>
          </md-field>
          <md-field :class="{'md-invalid': $v.amount.$error}">
            <label>Amount</label>
            <span class="md-prefix">$</span>
            <md-input v-model="amount" @input="$v.amount.$touch()"></md-input>
            <span class="md-error" v-if="!$v.amount.required">{{ $t('validations.required', { field: 'Charge Amount' }) }}</span>
            <span class="md-error" v-if="!$v.amount.decimal">{{ $t('validations.numeric', { field: 'Charge Amount' }) }} </span>
          </md-field>
          <div :class="{'md-invalid': $v.dateCharge.$error}">
            <label>Charge Date</label>
            <md-datepicker class="datepicker-field" @input="$v.dateCharge.$touch()" v-model="dateCharge"></md-datepicker>
            <span class="md-error" v-if="!$v.dateCharge.required">{{ $t('validations.required', { field: 'Charge Date' }) }}</span>
          </div>
          <div v-if="status === 'autopay'" :class="{'md-invalid': $v.maxDateCharge.$error}">
            <label>Max Charge Date</label>
            <md-datepicker class="datepicker-field" v-model="maxDateCharge" @input="$v.maxDateCharge.$touch()"></md-datepicker>
            <span class="md-error" v-if="!$v.maxDateCharge.required">{{ $t('validations.required', { field: 'Max Charge Date' }) }}</span>
          </div>
        </div>
      </md-tab>
    </md-tabs>
    <md-dialog-actions>
      <md-button class="md-accent lblue" @click="close">CANCEL</md-button>
      <md-button class="md-accent lblue md-raised" :disabled="$v.$invalid" @click="add">ADD</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>
<script>
import { required, decimal } from 'vuelidate/lib/validators'
export default {
  props: {
    showDialog: Boolean
  },
  data () {
    return {
      description: null,
      amount: null,
      dateCharge: null,
      maxDateCharge: null,
      status: null
    }
  },
  methods: {
    add () {
      this.$emit('add', {
        description: this.description,
        amount: Number(this.amount),
        dateCharge: this.dateCharge,
        maxDateCharge: this.maxDateCharge,
        status: this.status
      })
      this.reset()
    },
    close () {
      this.$emit('close')
      this.reset()
    },
    reset () {
      this.description = null
      this.amount = null
      this.dateCharge = null
      this.maxDateCharge = null
      this.status = null
      this.$v.$reset()
    }
  },
  validations () {
    if (this.status === 'autopay') {
      return {
        description: {
          required
        },
        amount: {
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
        }
      }
    }
    return {
      description: {
        required
      },
      amount: {
        required, decimal
      },
      dateCharge: {
        required
      },
      status: {
        required
      }
    }
  }
}
</script>
