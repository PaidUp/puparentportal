<template>
  <md-dialog :md-active.sync="showDialog" class="add-card-dialog">
    <div class="dialog-header white-dialog-header">
      <div class="title">Add New Card</div>
    </div>
    <div class="main-box">
      <div class="field-info">Credit or Debit Card</div>
      <div class="card-fields">
        <md-field>
          <md-icon>credit_card</md-icon>
          <label>Card Number</label>
          <md-input></md-input>
        </md-field>
        <!-- <md-field>
          <label>Exp. Date</label>
          <md-input></md-input>
        </md-field>
        <md-field>
          <label>CVC</label>
          <md-input></md-input>
        </md-field> -->
      </div>
    </div>
    <md-dialog-actions>
      <md-button class="md-accent lblue" @click="closeDialog()">Cancel</md-button>
      <md-button class="md-accent md-raised lblue" @click="closeDialog()">ADD NEW CARD</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
  export default {
    props: {
      showDialog: Boolean,
      closeDialog: Function
    },
    data: function () {
      return {
      }
    },
    methods: {
      handler: function () {}
    },
    computed: {
    }
  }
</script>
