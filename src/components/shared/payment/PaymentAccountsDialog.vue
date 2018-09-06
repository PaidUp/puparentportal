<template>
  <md-dialog :md-active.sync="show" class="accounts-dialog">
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
      <md-button class="md-accent lblue" @click="selectAccount()">CANCEL</md-button>
      <md-button class="lblue md-accent md-raised" @click="showAddCardDialog=true"> ADD NEW CARD </md-button>&nbsp;
      <pu-bank type="button"></pu-bank>
    </md-dialog-actions>
    <add-card-dialog :showDialog="showAddCardDialog" @close="showAddCardDialog = false"></add-card-dialog>
  </md-dialog>
</template>

<script>
  import AddCardDialog from '@/components/shared/AddCardDialog.vue'
  import PuBank from '@/components/shared/payment/PuBank.vue'
  export default {
    components: { AddCardDialog, PuBank },
    props: {
      accounts: Array,
      showDialog: Boolean,
      unbundle: Boolean
    },
    data: function () {
      return {
        title: 'Edit Invoice',
        show: false,
        showAddCardDialog: false
      }
    },
    methods: {
      selectAccount (account) {
        if (account) {
          this.$emit('selected', account)
        }
        this.show = false
      }
    },
    watch: {
      show () {
        if (!this.show) return this.$emit('close')
      },
      showDialog () {
        if (this.showDialog) this.show = true
      }
    },
    computed: {
    }
  }
</script>
