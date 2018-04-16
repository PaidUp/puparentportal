<template lang="pug">
  md-step(id="step2" md-label="Program" :md-done.sync="step")
    .programs
      .program.md-elevation-2.md-body-2(@click="select(product)" v-for="product in products" :key="product._id") {{ product.name }}
    .step-actions
      md-button.lblue.md-accent CANCEL
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: {
    step: Boolean,
    player: Object
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState('paymentModule', {
      products: 'products'
    })
  },
  watch: {
    player () {
      if (this.player) {
        this.getProducts(this.player.organizationId)
      }
    }
  },
  methods: {
    select (param) {
      this.$emit('select', param)
    },
    ...mapActions('paymentModule', {
      getProducts: 'getProducts'
    })
  }
}
</script>
