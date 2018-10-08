<template lang="pug">
  div(v-if="editable")
    .programs(v-show="!seasonSelected && playerSelected")
      .program.md-elevation-2.md-body-2(v-for="sns in seasons" @click="setSeasonSelected(sns)" :key="sns._id") {{ sns.name }}
    .div(v-show="seasonSelected")
      .custom-input-small(v-show="!programSelected._id")
        md-field(md-clearable)
          md-input(placeholder="Search..." v-model="search")
          md-icon search
      .programs
        .program.md-elevation-2.md-body-2(@click="select(product)" v-for="product in productFiltered" :key="product._id") {{ product.name }}
      .step-actions
        md-button.lblue.md-accent(@click="cancel") CANCEL
        md-button.lblue.md-accent(v-show="seasonSelected" @click="back") BACK
</template>
<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      editable: true,
      season: null,
      productFiltered: [],
      description: '',
      selected: {},
      search: ''
    }
  },
  mounted () {
  },
  watch: {
    playerSelected () {
      if (this.organization && this.allPreorders && this.allPreorders[0] && this.products) {
        this.products.filter(prod => {
          let resp = false
          this.allPreorders.forEach(po => {
            if (prod._id === po.productId && po.status === 'active') {
              this.showBack = false
              this.select(prod, po)
              return true
            }
          })
          return resp
        })
      } else {
        this.select({})
      }
    },
    seasonSelected () {
      this.applyFilter()
    },
    search () {
      this.applyFilter()
    }
  },
  computed: {
    ...mapState('paymentModule', {
      playerSelected: 'playerSelected',
      seasonSelected: 'seasonSelected',
      products: 'products',
      programSelected: 'programSelected'
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
    ...mapMutations('paymentModule', {
      setProgramSelected: 'setProgramSelected',
      setSeasonSelected: 'setSeasonSelected'
    }),
    applyFilter () {
      if (!this.products) return false
      this.productFiltered = this.products.filter(prd => {
        if (!this.seasonSelected) return true
        return (prd.season === this.seasonSelected._id) && (prd.status === 'active') && prd.name.toLowerCase().includes(this.search.toLowerCase())
      }).sort((prodA, prodB) => {
        return prodA.name > prodB.name ? 1 : -1
      })
    },
    select (program, preorder) {
      this.selected = program
      // this.season = program.season
      this.description = program.name || 'Click on your program below or search to filter the list.'
      this.applyFilter()
      this.setProgramSelected(program)
      this.$emit('next', true)
      if (program.restrictProductModification && preorder) {
        this.editable = false
      }
    },
    back () {
      this.search = ''
      this.setSeasonSelected(null)
    },
    cancel () {
      this.$router.push({
        name: 'home'
      })
    }
  }
}
</script>

