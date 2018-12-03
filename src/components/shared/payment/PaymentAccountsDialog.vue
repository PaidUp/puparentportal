<template>
  <md-dialog :md-active.sync="show" class="accounts-dialog" :md-click-outside-to-close="false">
    <div class="dialog-header white-dialog-header">
      <div class="title">Choose Payment Account</div>
    </div>
    <div v-if="unbundle" class="details-box cred bolder">
      IMPORTANT: There is an additional 2.9% + $0.30 fee per installment for paying with a debit/credit card. Bank account/ACH payments do not have a fee.
    </div>
    <md-list class="md-double-line">
      <md-subheader>Existing Accounts</md-subheader>
      <div v-for="account in accounts" :key="account.id">
        <md-divider></md-divider>
        <md-list-item @click="selectAccount(account)" v-if="account.object === 'card'">
          <md-avatar >
            <img :src="'/static/pm/' + account.brand + '.svg'" />
          </md-avatar>
          <div class="md-list-item-text">
            <span>{{ account.name}}</span>
            <span>{{ account.brand}}••••{{ account.last4}} Exp. {{ account.exp_month}}/{{ account.exp_year}}</span>
          </div>
        </md-list-item>
        <md-list-item @click="selectAccount(account)" v-if="account.object === 'bank_account'">
          <md-icon class="md-size-c">account_balance</md-icon>
          <div class="md-list-item-text">
            <span>{{ account.account_holder_name }}</span>
            <span>{{ account.bank_name}}••••{{ account.last4}}</span>
          </div>
        </md-list-item>
      </div>
      <md-divider></md-divider>
    </md-list>
    <md-dialog-actions>
      <md-button class="md-accent lblue" @click="show = false">CANCEL</md-button>
      <md-button class="lblue md-accent md-raised" @click="showAddCardDialog=true"> ADD NEW CARD </md-button>&nbsp;
      <pu-bank type="button"></pu-bank>
    </md-dialog-actions>
    <add-card-dialog :showDialog="showAddCardDialog" @close="showAddCardDialog = false"></add-card-dialog>
    <del-bank-dialog :bank="bankSelected" :showDialog="showDelBankDialog" @close="closeBankDialog" @verified="closeBankDialogVerify"></del-bank-dialog>
  </md-dialog>
</template>

<script>
  import AddCardDialog from '@/components/shared/AddCardDialog.vue'
  import PuBank from '@/components/shared/payment/PuBank.vue'
  import DelBankDialog from '@/components/shared/DelBankDialog.vue'
  import { mapState, mapActions } from 'vuex'
  export default {
    components: { AddCardDialog, PuBank, DelBankDialog },
    props: {
      accounts: Array,
      showDialog: Boolean,
      unbundle: Boolean
    },
    data: function () {
      return {
        title: 'Edit Invoice',
        show: false,
        bankSelected: null,
        showAddCardDialog: false,
        showDelBankDialog: false
      }
    },
    methods: {
      ...mapActions('messageModule', {
        setSuccess: 'setSuccess',
        setWarning: 'setWarning'
      }),
      selectAccount (account) {
        if (account.status === 'new') {
          this.bankSelected = account
          this.showDelBankDialog = true
          return false
        }
        if (account) {
          this.$emit('selected', account)
        }
        this.show = false
      },
      closeBankDialog () {},
      closeBankDialogVerify ({response, error}) {
        this.showDelBankDialog = false
        if (error) {
          this.setWarning(error.graphQLErrors[0].message)
        } else {
          this.$emit('selected', this.bankSelected)
          this.show = false
          this.setSuccess('component.left_side_bar.verify_bank_success')
        }
      }
    },
    watch: {
      show () {
        if (!this.show) return this.$emit('close')
      },
      showDialog () {
        if (this.showDialog) this.show = true
      },
      accounts () {
        if (this.accounts && this.accounts.length === 1) {
          this.selectAccount(this.accounts[0])
        }
      }
    },
    computed: {
      ...mapState('userModule', {
        user: 'user'
      })
    }
  }
</script>
