<template>
  <md-dialog :md-active.sync="showDialog" class="add-card-dialog" :md-close-on-esc="false" :md-click-outside-to-close="false">
    <div class="dialog-header white-dialog-header">
      <div class="title">Add New Card</div>
    </div>
    <div class="main-box">
      <div class="field-info">Credit or Debit Card</div>
      <div class="card-fields">
        <md-field>
          <span class="md-icon" v-if="cardIcon === 'mastercard'">
            <img src="@/assets/icons/mastercard.svg" alt="card" >
          </span>
          <md-icon v-if="cardIcon === 'default'">credit_card</md-icon>
          <label>Card Number</label>
          <md-input v-model="cardValue"></md-input>
        </md-field>
        <md-field>
          <label>MM/YY</label>
          <md-input></md-input>
        </md-field>
        <md-field>
          <label>CVC</label>
          <md-input></md-input>
        </md-field>
      </div>
      <md-field>
        <label>Name on Card</label>
        <md-input></md-input>
      </md-field>
      <md-field>
        <label>Address</label>
        <md-input></md-input>
      </md-field>
      <div class="address-info">
        <md-field>
          <label>City</label>
          <md-input></md-input>
        </md-field>
        <md-field>
          <label>State</label>
          <md-select name="state" id="state" md-dense>
            <md-option value="TX">TX</md-option>
            <md-option value="TX">TX</md-option>
            <md-option value="TX">TX</md-option>
            <md-option value="TX">TX</md-option>
          </md-select>
        </md-field>
        <md-field>
          <label>Zip</label>
          <md-input></md-input>
        </md-field>
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
    data () {
      return {
        cardValue: ''
      }
    },
    computed: {
      cardIcon: function () {
        if (this.cardValue === '') {
          return 'default'
        } else {
          return 'mastercard'
        }
      }
    }
  }
</script>
