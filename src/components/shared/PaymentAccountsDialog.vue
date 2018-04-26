<template>
  <md-dialog :md-active.sync="showDialog" class="accounts-dialog">
    <div class="dialog-header white-dialog-header">
      <div class="title">Choose Payment Account</div>
    </div>
    <md-list class="md-double-line">
      <md-subheader>Existing Accounts</md-subheader>
      <md-divider></md-divider>
      <md-list-item @click="handler">
        <md-icon class="md-size-c">credit_card</md-icon>
        <div class="md-list-item-text">
          <span>Felipe Fernandez</span>
          <span>Visa****1234 Exp. 11/21</span>
        </div>
      </md-list-item>
      <md-divider></md-divider>
      <md-list-item @click="handler">
        <md-icon class="md-size-c">credit_card</md-icon>
        <div class="md-list-item-text">
          <span>Felipe Fernandez</span>
          <span>Visa****1234 Exp. 11/21</span>
        </div>
      </md-list-item>
      <md-divider></md-divider>
      <md-list-item @click="handler">
        <md-icon class="md-size-c">account_balance</md-icon>
        <div class="md-list-item-text">
          <span>Felipe Fernandez</span>
          <span>Visa****1234 Exp. 11/21</span>
        </div>
      </md-list-item>
      <md-divider></md-divider>
    </md-list>
    <md-dialog-actions>
      <md-button class="md-accent lblue" @click="closeDialog()">ADD NEW BANK</md-button>
      <md-button class="md-accent lblue" @click="closeDialog()">ADD NEW CARD</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
  export default {
    props: {
      accounts: Object,
      closeDialog: Function
    },
    data: function () {
      return {
        title: 'Edit Invoice'
      }
    },
    methods: {
      handler: function () {}
    },
    computed: {
      showDialog () {
        return this.accounts !== null
      }
    }
  }
</script>
