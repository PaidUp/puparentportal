<template>
  <md-dialog :md-active.sync="showDialog" class="custom-dialog invoice-dialog">
    <div class="title">Invoice: INV1234563</div>

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
    computed: {
      showDialog () {
        return this.invoice !== null
      }
    }
  }
</script>
