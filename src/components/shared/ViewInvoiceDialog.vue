<template>
  <md-dialog :md-active.sync="showDialog" class="custom-dialog">
    <div class="dialog-header">
      <div class="title">Invoice: INV1234563</div>
      <md-button class="md-icon-button" md-menu-trigger>
        <md-icon>file_download</md-icon>
      </md-button>
    </div>
    <md-tabs md-alignment="fixed">
      <md-tab md-label="DETAILS">
        <div class="order-numbers">
          <div>
            Order: ORD1234534U
          </div>
          <div>
            Order Date: 11-13-2018
          </div>
        </div>
        <div class="instructions">
          If you have problems making changes to your invoice, please contact PaidUp Support M-F 9am-5pm CST.
          <a href="mailto:support@getpaidup.com">support@getpaidup.com</a>
          -
          <a href="tel:855-764-3232">855-764-3232</a>
        </div>
        <md-field>
          <label>Description</label>
          <md-input disabled v-model="description"></md-input>
        </md-field>
        <md-field>
          <label>Amount</label>
          <md-input></md-input>
        </md-field>
        <md-datepicker>
          <label>Charge date</label>
        </md-datepicker>
        <md-field>
          <label for="payment">Payment Account</label>
          <md-select name="payment" id="payment">
            <md-option value="fight-club">Visa *1234</md-option>
          </md-select>
        </md-field>
        <md-field>
          <label>Status</label>
          <md-input></md-input>
        </md-field>
      </md-tab>
      <md-tab md-label="HISTORY">
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus
          qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus
          qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
      </md-tab>
    </md-tabs>
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
        description: 'Dues - Pay 4'
      }
    },
    methods: {
    },
    computed: {
      showDialog () {
        return this.invoice !== null
      }
    }
  }
</script>
