<template>
  <div>
    <plaid-link :env="props.env" :publicKey="props.publicKey" :clientName="props.clientName"
    :product="props.product" :selectAccount="props.selectAccount"
    :apiVersion='props.apiVersion' @onExit="onExit" :type="type" v-bind="{ onSuccess }"></plaid-link>

    <md-dialog class="checkout-success-dialog" :md-active.sync="showDialog" :md-click-outside-to-close="false">
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
          <label>Name on Checking Account*</label>
          <md-input v-model.trim="name" @input="$v.name.$touch()"></md-input>
          <span class="md-error" v-if="!$v.name.required">{{ $t('validations.required', { field: 'Name' }) }}</span>
        </md-field>
      </div>
      <div class="actions">
        <div>
          <md-button class="md-accent lblue" @click="showDialog = false">VIEW PAYMENT HISTORY</md-button>
        </div>
      </div>
        
    </md-dialog>
  </div>
  

</template>

<script>
import PlaidLink from './PlaidLink.vue'
import config from '@/config'
import { required } from 'vuelidate/lib/validators'
import { mapState, mapActions } from 'vuex'

export default {
  props: {
    type: String
  },
  data () {
    return {
      props: config.plaid,
      showDialog: false,
      name: '',
      routingNumber: '',
      accountNumber: '',
    }
  },
  computed: {
    ...mapState('userModule', {
      user: 'user'
    })
  },
  components: { PlaidLink },
  methods: {
    ...mapActions('messageModule', {
      setSuccess: 'setSuccess',
      setDanger: 'setDanger'
    }),
    ...mapActions('paymentModule', {
      addBank: 'addBank',
      listBanks: 'listBanks'
    }),
    onSuccess (publicToken, metadata) {
      const accountId = metadata.account_id
      this.addBank({ user: this.user, publicToken, accountId }).then(bank => {
        this.listBanks(this.user)
        this.setSuccess('module.payment.add_bank_success')
      }).catch(reason => {
        this.setSuccess('module.payment.add_bank_fail')
      })
    },
    onExit ({err, metadata}) {
      console.log('err: ', err)
      console.log('metadata: ', metadata)
      this.showDialog = true
    }
  },
  validations: {
      name: {
        required
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
