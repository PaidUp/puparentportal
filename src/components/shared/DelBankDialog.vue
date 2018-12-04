<template>
  <md-dialog v-if="bank" :md-active.sync="showDialog" class="add-card-dialog" :md-close-on-esc="false" :md-click-outside-to-close="false">
    <div class="dialog-header white-dialog-header">
      <div class="title">Bank Details</div>
    </div>
    <div class="main-box">
      <md-field>
          <label>Bank Description*</label>
          <md-input v-model="bankDescription" disabled></md-input>
        </md-field>
      <md-field>
        <label>Name on Bank</label>
        <md-input v-model="bank.account_holder_name" disabled></md-input>
      </md-field>
      <div v-if="bank.status === 'verified'">
        <md-field >
          <label>Country</label>
          <md-input v-model="bank.country" disabled></md-input>
        </md-field>
        <md-field v-if="bank.status === 'verified'">
          <label>Currency</label>
          <md-input v-model="bank.currency" disabled></md-input>
        </md-field>
      </div>
      <div v-else>
        <md-field :class="{'md-invalid': $v.amount1.$error, 'md-focused': amount1Focus}">
          <label :class="{'md-error': $v.amount1.$error}">Verify Deposit Amount 1 (in cents)</label>
          <the-mask @focus.native="amount1Focus = true" @blur.native="amount1Focus = amount1.length" id="amountField" class="md-input" @input="$v.amount1.$touch()" mask="0.##" v-model.trim="amount1" type="numeric" :masked="false" placeholder=""></the-mask>
        </md-field>
        <md-field :class="{'md-invalid': $v.amount2.$error, 'md-focused': amount2Focus}">
          <label :class="{'md-error': $v.amount2.$error}">Verify Deposit Amount 2 (in cents)</label>
          <the-mask @focus.native="amount2Focus = true" @blur.native="amount2Focus = amount2.length" id="amountField" class="md-input" @input="$v.amount2.$touch()" mask="0.##" v-model.trim="amount2" type="numeric" :masked="false" placeholder=""></the-mask>
        </md-field>
      </div>
      
    </div>
    <v-pay-animation :animate="submited" :result="{}" @finish="done" />
    <v-pay-animation :animate="submitedVerify" :result="verifiedResult" @finish="doneVerify" />
    <md-dialog-actions>
      <md-button class="md-accent lblue" @click="closeDialog">Cancel</md-button>
      <md-button :class="{'md-raised': bank.status === 'verified'}" class="md-accent lblue" @click='remove' :disabled="submited">DELETE BANK</md-button>
      <md-button v-if="bank.status === 'new'" class="md-accent md-raised lblue" @click='verify' :disabled="submitedVerify">Verify Bank</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import VPayAnimation from '@/components/shared/VPayAnimation.vue'
import states from '@/util/states'
export default {
  props: {
    showDialog: Boolean,
    bank: Object
  },
  components: { VPayAnimation },
  data () {
    return {
      amount1: null,
      amount2: null,
      amount1Focus: false,
      amount2Focus: false,
      submited: false,
      submitedVerify: false,
      states,
      verifiedResult: null,
      verifiedResultError: null
    }
  },
  computed: {
    ...mapState('userModule', {
      user: 'user'
    }),
    bankDescription () {
      if (this.bank && this.bank.last4) return `${this.bank.bank_name}••••${this.bank.last4}`
      return ''
    }
  },
  methods: {
    ...mapActions('paymentModule', {
      removeBank: 'removeBank',
      listBanks: 'listBanks',
      getInvoicesByPaymetMethod: 'getInvoicesByPaymetMethod',
      verifySource: 'verifySource'
    }),
    remove () {
      this.getInvoicesByPaymetMethod(this.bank.id).then(invoices => {
        this.submited = true
        if (invoices.length) {
          this.submited = false
          return this.$emit('close', { deleted: false })
        }
        this.removeBank({
          user: this.user,
          bankId: this.bank.id
        }).then(res => {
          this.submited = false
          this.listBanks(this.user)
        })
      }).catch(reason => {
        this.submited = false
      })
    },
    done () {
      this.$emit('close', { deleted: true })
    },
    doneVerify () {
      this.$emit('verified', {response: this.verifiedResult, error: this.verifiedResultError})
    },
    closeDialog () {
      this.$emit('close')
    },
    verify () {
      this.verifiedResultError = null
      this.verifiedResult = null
      this.submitedVerify = true
      this.verifySource({
        customerId: this.user.externalCustomerId,
        sourceId: this.bank.id,
        amounts: [parseInt(this.amount1), parseInt(this.amount2)]
      }).then(res => {
        this.verifiedResult = res
        this.listBanks(this.user).then(res => {
          this.submitedVerify = false
        })
      }).catch(reason => {
        this.verifiedResultError = reason
        this.submitedVerify = false
      })
    }
  },
  validations: {
    amount1: {
      required,
      minLength: minLength(1),
      maxLength: maxLength(2)
    },
    amount2: {
      required,
      minLength: minLength(1),
      maxLength: maxLength(2)
    }
  }
}
</script>