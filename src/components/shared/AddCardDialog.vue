<template>
  <md-dialog :md-active.sync="showDialog" class="add-card-dialog" :md-close-on-esc="false" :md-click-outside-to-close="false">
    <div class="dialog-header white-dialog-header">
      <div class="title">Add New Card</div>
    </div>
    <div class="main-box">
      <div class="field-info">Credit or Debit Card*</div>
      <pu-card :class="{'stripe-card':true, complete: complete}" @done="done" @token="closeDialog" :details="details"  :submited="submited" />
   
      <md-field>
        <label>Name on Card</label>
        <md-input v-model.trim="details.name" ></md-input>
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
      </div>
    </div>
    <md-dialog-actions>
      <md-button class="md-accent lblue" @click="closeDialog">Cancel</md-button>
      <md-button class="md-accent md-raised lblue" @click='submited = !submited' :disabled="!complete">ADD NEW CARD</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
  import config from '@/config'
  import PuCard from '@/components/payment/PuCard.vue'

export default {
    props: {
      showDialog: Boolean
    },
    components: { PuCard },
    data () {
      return {
        publicKey: config.stripe.publicKey,
        complete: false,
        details: {
          name: '',
          address_line1: '',
          address_city: '',
          address_state: '',
          address_country: 'US'
        },
        submited: false
      }
    },
    methods: {
      done (status) {
        this.complete = status
      },
      closeDialog () {
        this.$emit('close')
      }
    }

}
</script>

