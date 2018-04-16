<template>
  <md-dialog :md-active.sync="showDialog" class="custom-dialog invoice-dialog">
    <div class="dialog-header white-dialog-header">
      <div class="title">{{title}}</div>
      <div class="subtitle">INV1234563</div>
    </div>
    <div class="main-box">
      <md-field>
        <label>Description</label>
        <md-input></md-input>
      </md-field>
      <md-field>
        <label>Amount</label>
        <md-input></md-input>
      </md-field>
      <md-datepicker>
        <label>Charge date</label>
      </md-datepicker>
      <md-field @:click="this.selectPaymentAccount()">
        <label for="payment">Payment Account</label>
        <md-select name="payment" id="payment">
          <md-option value="fight-club">Visa *1234</md-option>
        </md-select>
      </md-field>
      <md-field>
        <label>Status</label>
        <md-input></md-input>
      </md-field>
    </div>
    <md-dialog-actions>
      <md-button class="md-accent lblue" @click="closeDialog()">CANCEL</md-button>
      <md-button class="md-accent lblue" @click="closeDialog()">SAVE</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
  export default {
    props: {
      invoice: Object,
      closeDialog: Function
    },
    data: function () {
      return {
        title: 'Edit Invoice',
        chooseAccount: false
      }
    },
    methods: {
      selectPaymentAccount: function () {
        this.title = 'Select Payment Account'
        this.chooseAccount = true
      }
    },
    computed: {
      showDialog () {
        return this.invoice !== null
      }
    }
  }
</script>
