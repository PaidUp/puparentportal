<template>
  <div>
    <plaid-link :env="props.env" :publicKey="props.publicKey" :clientName="props.clientName"
    :product="props.product" :selectAccount="props.selectAccount"
    :apiVersion='props.apiVersion' @onExit="onExit" :type="type" v-bind="{ onSuccess }"></plaid-link>

    <md-dialog class="add-account-dialog" :md-active.sync="showDialog" :md-click-outside-to-close="false">
      <md-dialog-title>
        <md-icon class="md-size-c cgreen icon"> account_balance </md-icon>
        <br/>
        Manually Add Your Bank
      </md-dialog-title>
      <div class="text-instructions" align="center">
        Instant Verification is not yet supported by your bank.
        <br/>
        Please provide your routing and account number below to add it manually.
        <br/>
        We cannot charge Savings Accounts, only Checking Accounts.
      </div>
      <div class="text-instructions">
        <div align="center" class="title">What Happens Next</div>
        <ul>
          <li>
            For your security, we need to verify you are the owner of the checking account.
          </li>
          <li>
            In 2-3 business days, we will make two smalls deposits into your bank account.
          </li>
          <li>
            Please check your bank statement, visit our site and enter those amounts by clicking on your account under the “Payment Accounts” section in the menu.
          </li>
          <li>
            Once verified, you will be able to use it for all future payments.
          </li>
        </ul>
      </div>
      <div class="bank_form">
        <md-field :class="{'md-invalid': $v.name.$error}">
          <label :class="{'md-error': $v.name.$error}">Name on Checking Account*</label>
          <md-input v-model.trim="name" @input="$v.name.$touch()"></md-input>
          <!-- <span class="md-error" v-if="!$v.name.required">{{ $t('validations.required', { field: 'Name' }) }}</span> -->
        </md-field>
        
        <md-field :class="{'md-invalid': $v.routingNumber.$error}">
          <label :class="{'md-error': $v.routingNumber.$error}">Bank Routing Number*</label>
          <md-input v-model.trim="routingNumber" @input="$v.routingNumber.$touch()"></md-input>
          <!-- <span class="md-error" v-if="!$v.routingNumber.required">{{ $t('validations.required', { field: 'Routing Number' }) }}</span> -->
        </md-field>
        <md-field :class="{'md-invalid': $v.accountNumber.$error}">
          <label :class="{'md-error': $v.accountNumber.$error}">Bank Account Number*</label>
          <md-input type="password" v-model.trim="accountNumber" @input="$v.accountNumber.$touch()"></md-input>
          <!-- <span class="md-error" v-if="!$v.accountNumber.required">{{ $t('validations.required', { field: 'Account Number' }) }}</span> -->
        </md-field>
        <md-field :class="{'md-invalid': $v.confirmAccountNumber.$error}">
          <label :class="{'md-error': $v.confirmAccountNumber.$error}">Re-Enter Bank Account Number*</label>
          <md-input type="password" v-model.trim="confirmAccountNumber" @input="$v.confirmAccountNumber.$touch()"></md-input>
          <!-- <span class="md-error" v-if="!$v.confirmAccountNumber.required">{{ $t('validations.required', { field: 'Account Number' }) }}</span> -->
        </md-field>
      </div>
      <div class="actions">
        <div>
          <md-button class="md-accent lblue md-dense" @click="showDialog = false">Cancel</md-button>
          <md-button :disabled="$v.$invalid || submited" class="md-accent lblue md-dense md-raised" @click="save">Add Bank Account</md-button>
        </div>
      </div>
        
    </md-dialog>

    <md-dialog class="add-account-success-dialog" :md-active.sync="showDialogSuccess" :md-click-outside-to-close="false">
      <md-dialog-title>
        <md-icon class="md-size-c cgreen icon"> check_circle </md-icon>
        <br/>
        Thank you for adding your bank account
      </md-dialog-title>
      <div class="text-instructions">
        <div align="center" class="title">What Happens Next</div>
        <ul>
          <li>
            For your security, we need to verify you are the owner of the checking account.
          </li>
          <li>
            In 2-3 business days, we will make two smalls deposits into your bank account.
          </li>
          <li>
            Please check your bank statement, visit our site and enter those amounts by clicking on your account under the “Payment Accounts” section in the menu.
          </li>
          <li>
            Once verified, you will be able to use it for all future payments.
          </li>
        </ul>
      </div>
      
      <div class="actions">
        <div>
          <md-button class="md-accent lblue md-dense" @click="showDialogSuccess = false">View Payment Account</md-button>
        </div>
      </div>
        
    </md-dialog>
    <v-pay-animation :animate="submited" :result="source" @finish="closeDialog" />
  </div>
  

</template>

<script>
import PlaidLink from './PlaidLink.vue'
import config from '@/config'
import VPayAnimation from '@/components/shared/VPayAnimation.vue'
import { required, sameAs, numeric, minLength, maxLength } from 'vuelidate/lib/validators'
import { mapState, mapActions } from 'vuex'

export default {
  components: { PlaidLink, VPayAnimation },
  props: {
    type: String
  },
  data () {
    return {
      props: config.plaid,
      submited: false,
      showDialog: false,
      showDialogSuccess: false,
      name: '',
      routingNumber: '',
      accountNumber: '',
      confirmAccountNumber: '',
      source: null
    }
  },
  computed: {
    ...mapState('paymentModule', {
      stripe: 'stripe'
    }),
    ...mapState('userModule', {
      user: 'user'
    })
  },
  methods: {
    ...mapActions('messageModule', {
      setSuccess: 'setSuccess',
      setDanger: 'setDanger'
    }),
    ...mapActions('paymentModule', {
      addBank: 'addBank',
      addCard: 'addCard',
      listBanks: 'listBanks'
    }),
    onSuccess (publicToken, metadata) {
      const accountId = metadata.account_id
      this.addBank({ user: this.user, publicToken, accountId }).then(bank => {
        this.listBanks(this.user)
        this.setSuccess('module.payment.add_bank_success')
      }).catch(reason => {
        this.setDanger('module.payment.add_bank_fail')
      })
    },
    onExit ({error, metadata}) {
      if (error) console.log(error)
      this.showDialog = true
    },
    reset () {
      this.name = ''
      this.routingNumber = ''
      this.accountNumber = ''
      this.confirmAccountNumber = ''
      this.source = null
      this.$v.$reset()
    },
    closeDialog () {
      if (this.source) {
        this.reset()
      }
    },
    save () {
      this.submited = true
      this.stripe.createToken('bank_account', {
        country: 'US',
        currency: 'usd',
        routing_number: this.routingNumber,
        account_number: this.accountNumber,
        account_holder_name: this.name,
        account_holder_type: 'individual'
      }).then(result => {
        if (result.error) {
          this.submited = false
          const message = result.error.message || 'module.payment.add_bank_fail'
          this.setDanger(message)
          return false
        }
        this.addCard({ token: result.token.id, user: this.user }).then(source => {
          this.setSuccess('module.payment.add_bank_success')
          this.submited = false
          this.showDialog = false
          this.showDialogSuccess = true
          this.source = source
        }).catch(reason => {
          console.log('reason: ', reason.message)
          this.submited = false
          const message = reason.message || 'module.payment.add_bank_fail'
          this.setDanger(message)
        })
      }).catch(reason => {
        console.log('reason: ', reason.message)
      })
    }
  },
  validations: {
    name: {
      required
    },
    routingNumber: {
      required,
      numeric,
      minLength: minLength(9),
      maxLength: maxLength(9)
    },
    accountNumber: {
      required,
      numeric
    },
    confirmAccountNumber: {
      sameAsaccountNumber: sameAs('accountNumber')
    }
  }
}
</script>
<style>
.bank_form {
  margin-left: 15%;
  margin-right: 15%
}
</style>
