<template>
  <div id="card-element" class="field"></div>
</template>

<script>
import Vue from 'vue'
import config from '@/config'
import { mapState, mapActions } from 'vuex'

export default {
  props: {
    submited: {
      type: Boolean,
      default: false
    },
    details: {
      type: Object
    }
  },
  data () {
    return {
      publicKey: config.stripe.publicKey,
      stripe: null,
      elements: null,
      card: null,
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
  watch: {
    elements () {
      this.card = this.elements.create('card')
      this.card.mount('#card-element')
      this.card.on('change', event => {
        this.$emit('done', event.complete)
      })
    },
    submited () {
      this.stripe.createToken(this.card, this.details).then(resp => {
        this.add(resp.token.id)
      })
    }
  },
  created () {
    Vue.loadScript('https://cdn.plaid.com/link/v2/stable/link-initialize.js')
      .then(() => {
        this.stripe = window.Stripe(config.stripe.publicKey)
        this.elements = this.stripe.elements()
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
    add (token) {
      this.addCard({ token, user: this.user }).then(res => {
        this.$emit('token', res)
        this.setSuccess('module.payment.add_card_success')
        this.complete = true
      })
    }
  }
}
</script>

<style>
</style>