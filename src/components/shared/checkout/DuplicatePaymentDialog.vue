<template>
  <md-dialog v-if="playerSelected && seasonSelected" class="checkout-success-dialog" :md-active.sync="showDialog" :md-click-outside-to-close="false">
    <md-dialog-title>
      <md-icon class="md-size-c cyellow icon"> warning </md-icon>
      <br/>
      You are about to create duplicate payments.
    </md-dialog-title>
    <div class="text-instructions">
      <ul>
        <li>
          You have already authorized payments for {{playerSelected.firstName}} {{playerSelected.lastName}} - {{seasonSelected.name}} - {{programSelected.name}}.
        </li>
        <li>
          If you want to modify a payment date/account or retry a failed payment, please visit the ‘Payment History’ section.
        </li>
        <li>
          If you are confident that you need to submit another payment, please click “Continue With Checkout” to authorize your payments.
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
