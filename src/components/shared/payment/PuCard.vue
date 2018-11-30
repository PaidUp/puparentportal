<template>
  <div id="card-element" class="field"></div>
</template>

<script>
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
      card: null,
      stripeOptions: {
        // see https://stripe.com/docs/stripe.js#element-options for details
      }
    }
  },
  computed: {
    ...mapState('paymentModule', {
      stripe: 'stripe',
      cardElement: 'cardElement'
    }),
    ...mapState('userModule', {
      user: 'user'
    })
  },
  mounted () {
    if (this.cardElement) {
      this.cardElement.mount('#card-element')
      this.cardElement.on('change', event => {
        this.$emit('done', event.complete)
      })
    }
  },
  watch: {
    submited () {
      this.stripe.createToken(this.cardElement, this.details).then(resp => {
        this.add(resp.token.id)
      })
    }
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