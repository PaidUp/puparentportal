<template lang="pug">
  md-step(:id="stepId" md-label="Program" :md-description="step ? selected.name : pending" :md-done.sync="step")
    .programs(v-show="!season")
      .program.md-elevation-2.md-body-2(v-for="sns in seasons" @click="season = sns" :key="sns._id") {{ sns.name }}
    .div(v-show="season")
      .custom-input-small
        md-field(md-clearable)
          md-input(placeholder="Search..." v-model="search")
          md-icon search
      .programs
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
      pending: 'Click on your program below or search to filter the list.',
      selected: {},
      search: ''
    }
  },
  mounted () {
  },
  watch: {
    player () {
      if (this.allPreorders && this.allPreorders[0] && this.products) {
        this.products.filter(prod => {
          let resp = false
          this.allPreorders.forEach(po => {
            if (prod._id === po.productId && po.status === 'active') {
              this.showBack = false
              this.select(prod)
              this.season = prod.season
              return true
            }
          })
          return resp
        })
      } else {
        this.select({})
      }
    },
    season () {
      this.applyFilter()
    },
    search () {
      this.applyFilter()
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
    applyFilter () {
      this.productFiltered = this.products.filter(prd => {
        if (!this.season) return true
        return (prd.season === this.season._id) && (prd.status === 'active') && prd.name.toLowerCase().includes(this.search.toLowerCase())
      }).sort((prodA, prodB) => {
        return prodA.name > prodB.name ? 1 : -1
      })
    },
    select (param) {
      this.selected = param
      this.$emit('select', param)
    },
    back () {
      this.search = ''
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

