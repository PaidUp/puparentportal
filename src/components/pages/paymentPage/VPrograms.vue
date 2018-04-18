<template lang="pug">
  md-step(:id="stepId" md-label="Program" :md-description="selected.name" :md-done.sync="step")
    .programs
      .program.md-elevation-2.md-body-2(@click="select(product)" v-for="product in products" :key="product._id") {{ product.name }}
    .step-actions
      md-button.lblue.md-accent(@click="cancel") CANCEL
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: {
    stepId: {
      type: String,
      required: true
    },
    step: Boolean,
    player: Object
  },
  data () {
    return {
      selected: {}
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
    ...mapActions('paymentModule', {
      getProducts: 'getProducts'
    }),
    select (param) {
      this.selected = param
      this.$emit('select', param)
    },
    cancel () {
      this.$router.push({
        name: 'home'
      })
    }
  }
}
</script>
