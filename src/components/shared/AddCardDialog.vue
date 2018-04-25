<template>
  <md-dialog :md-active.sync="showDialog" class="add-card-dialog" :md-close-on-esc="false" :md-click-outside-to-close="false">
    <div class="dialog-header white-dialog-header">
      <div class="title">Add New Card</div>
    </div>
    <div class="main-box">
      <div class="field-info">Credit or Debit Card*</div>
      <Card :class="{'stripe-card':true, complete: complete}" :stripe='publicKey' :options='stripeOptions' @change='complete = $event.complete' />
   
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
      <md-button class="md-accent md-raised lblue" @click='add' :disabled='!complete'>ADD NEW CARD</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
  import Vue from 'vue'
  import config from '@/config'
  import { Card } from 'vue-stripe-elements-plus'
  import { mapState, mapActions } from 'vuex'

export default {
    props: {
      showDialog: Boolean,
      closeDialog: Function
    },
    components: { Card },
    data () {
      return {
        publicKey: config.stripe.publicKey,
        complete: false,
        stripeOptions: {
        // see https://stripe.com/docs/stripe.js#element-options for details
        }
      }
    },
    computed: {
      ...mapState('userModule', {
        user: 'user'
      })
    },
    created () {
      Vue.loadScript('https://cdn.plaid.com/link/v2/stable/link-initialize.js')
      .then(() => {
        console.log('script loaded')
      })
      .catch(() => {
        console.log('There was an issue loading the link-initialize.js script')
      })
    },
    methods: {
      ...mapActions('messageModule', {
        setSuccess: 'setSuccess'
      }),
      ...mapActions('paymentModule', {
        addCard: 'addCard'
      }),
      add () {
        this.complete = false
        this.addCard(this.user).then(res => {
          this.setSuccess('module.payment.add_card_success')
          this.complete = true
        })
      }
    }

}
</script>

