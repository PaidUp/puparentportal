<template>
  <div>
    <h1>Add Credit Card:</h1>
    <card class='stripe-card'
      :class='{ complete }'
      stripe='pk_test_9WTTkvwiNjZ9IMJVls1iF0fv'
      :options='stripeOptions'
      @change='complete = $event.complete'
    />
    <button class='pay-with-stripe' @click='addCard(user)' :disabled='!complete'>Add</button>
  </div>
</template>

<script>
// import { stripeKey, stripeOptions } from './stripeConfig.json'
import { Card } from 'vue-stripe-elements-plus'
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
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

  components: { Card },

  methods: {
    ...mapActions('paymentModule', {
      addCard: 'addCard'
    })
  }
}
</script>

<style>
.stripe-card {
  width: 300px;
  border: 1px solid grey;
}
.stripe-card.complete {
  border-color: green;
}
</style>