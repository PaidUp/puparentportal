<template lang="pug">
  md-step(:id="stepId" md-label="Program" :md-description="step ? selected.name : pending" :md-done.sync="step")
    .programs(v-show="!season")
      .program.md-elevation-2.md-body-2(v-for="sns in seasons" @click="season = sns" :key="sns._id") {{ sns.name }}
    .programs(v-show="season")
      .program.md-elevation-2.md-body-2(@click="select(product)" v-for="product in productFiltered" :key="product._id") {{ product.name }}
    .step-actions
      md-button.lblue.md-accent(@click="cancel") CANCEL
      md-button.lblue.md-accent(v-show="season" @click="back") BACK
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
      season: null,
      productFiltered: [],
      pending: 'Choose your program.',
      selected: {}
    }
  },
  mounted () {
  },
  watch: {
    player () {
      if (this.allPreorders && this.allPreorders[0] && this.products) {
        this.products.filter(prod => {
          if (prod._id === this.allPreorders[0].productId) {
            this.showBack = false
            this.select(prod)
            this.season = prod.season
            return true
          }
        })
      } else {
        this.select({})
      }
    },
    season () {
      this.productFiltered = this.products.filter(prd => {
        if (!this.season) return true
        return prd.season === this.season._id
      }).sort((prodA, prodB) => {
        return prodA.name > prodB.name ? 1 : -1
      })
    }
  },
  computed: {
    ...mapState('paymentModule', {
      products: 'products'
    }),
    ...mapState('playerModule', {
      allPreorders: 'allPreorders',
      organization: 'organization'
    }),
    seasons () {
      if (!this.organization) return []
      return this.organization.seasons.filter(season => {
        return season.status === 'active'
      })
    }
  },
  methods: {
    select (param) {
      this.selected = param
      this.$emit('select', param)
    },
    back () {
      this.season = null
    },
    cancel () {
      this.$router.push({
        name: 'home'
      })
    }
  }
}
</script>

