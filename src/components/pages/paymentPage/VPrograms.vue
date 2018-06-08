<template lang="pug">
  md-step(:id="stepId" md-label="Program" :md-description="step ? selected.name : pending" :md-done.sync="step")
    .programs
      .program.md-elevation-2.md-body-2(@click="select(product)" v-for="product in productFiltered" :key="product._id") {{ product.name }}
    .step-actions
      md-button.lblue.md-accent(@click="cancel") CANCEL
</template>
<script>
import { mapState } from 'vuex'

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
      pending: 'Choose your program.',
      selected: {}
    }
  },
  computed: {
    ...mapState('paymentModule', {
      products: 'products'
    }),
    ...mapState('playerModule', {
      allPreorders: 'allPreorders'
    }),
    productFiltered () {
      if (this.allPreorders.length) {
        return this.products.filter(prod => {
          if (prod._id === this.allPreorders[0].productId) {
            this.select(prod)
            return true
          }
        })
      }
      this.select({})
      return this.products
    }
  },
  methods: {
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

