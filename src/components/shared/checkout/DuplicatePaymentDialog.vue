<template>
  <md-dialog v-if="playerSelected && seasonSelected" class="checkout-success-dialog" :md-active.sync="showDialog" :md-click-outside-to-close="false">
    <md-dialog-title>
      <md-icon class="md-size-c cyellow icon"> warning </md-icon>
      <br/>
      Be Careful Not To Create Duplicate Payments
    </md-dialog-title>
    <div class="text-instructions">
      <ul>
        <li>
          You have already authorized payment(s) for {{playerSelected.firstName}} {{playerSelected.lastName}} - {{seasonSelected.name}} - {{programSelected.name}}.
        </li>
        <li>
          <b>Dues:</b> If you have already authorized your dues payments and want to modify a payment date/account or retry a failed payment, please click VIEW PAYMENT HISTORY.
        </li>
        <li>
          <b>Travel/Tournament Fees:</b> If you are making a NEW travel/tournament payment, please click CONTINUE WITH CHECKOUT to view your options and authorize your payments.
        </li>
      </ul>
    </div>
    <div class="actions">
      <div>
        <md-button class="md-accent lblue" @click="confirm(true)">CONTINUE WITH CHECKOUT</md-button>
        <md-button class="lblue md-accent md-raised" @click="confirm(false)">VIEW PAYMENT HISTORY</md-button>
      </div>
    </div>
      
  </md-dialog>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    props: {
      show: Boolean
    },
    data () {
      return {
        showDialog: this.show
      }
    },
    watch: {
      show () {
        this.showDialog = this.show
      }
    },
    computed: {
      ...mapState('paymentModule', {
        playerSelected: 'playerSelected',
        programSelected: 'programSelected',
        seasonSelected: 'seasonSelected'
      })
    },
    methods: {
      confirm (val) {
        this.$emit('confirm', val)
      }
    }
  }
</script>
