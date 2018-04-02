<template lang="pug">
  div
    h1 Add Credit Card:
    card.stripe-card(:class='{ complete }' :stripe='publicKey' :options='stripeOptions' @change='complete = $event.complete')
    md-button.md-raised.md-primary(@click='add' :disabled='!complete') Add
</template>

<script>
// import { stripeKey, stripeOptions } from './stripeConfig.json'
import Vue from 'vue'
import config from '@/config'
import { Card } from 'vue-stripe-elements-plus'
import { mapState, mapActions } from 'vuex'

export default {
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

  components: { Card },

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

<style>
.StripeElement {
  background-color: white;
  height: 40px;
  padding: 10px 12px;
  border-radius: 4px;
  border: 1px solid transparent;
  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
}

.StripeElement--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
}

.StripeElement--invalid {
  border-color: #fa755a;
}

.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}
</style>