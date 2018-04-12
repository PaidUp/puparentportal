<template lang="pug">
  .details-selects
    md-field.season-select(v-if="order.orderId")
      label(for="season") Season
      md-select(name="season" id="season" v-model="season" @input="inputSaeson"  @click="clickSaeson")
        md-option(v-for="s in seasons" :value="s" :key="s") {{ s }}
    md-field(v-if="season")
      label(for="program") Program
      md-select(name="program" id="program" v-model="program")
        md-option(v-for="p in programs" :value="p" :key="p") {{ p }}
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    orders: Array
  },
  data () {
    return {
      seasonCurrent: null,
      season: null,
      program: null
    }
  },
  watch: {
    program () {
      if (this.program) {
        this.selectOrder({
          season: this.season,
          program: this.program
        })
      }
    },
    order () {
      this.seasonCurrent = this.order.season
      this.season = this.order.season
      this.program = this.order.productName
    }
  },
  computed: {
    ...mapGetters('playerModule', {
      order: 'order'
    }),
    seasons () {
      let set = new Set()
      this.orders.forEach(order => {
        set.add(order.season)
      })
      return Array.from(set)
    },
    programs () {
      if (this.season) {
        let set = new Set()
        this.orders.forEach(order => {
          if (this.season === order.season) {
            set.add(order.productName)
          }
        })
        return Array.from(set)
      }
      return []
    }
  },
  methods: {
    ...mapMutations('playerModule', {
      selectOrder: 'selectOrder'
    }),
    clickSaeson () {
      this.seasonCurrent = this.season
    },
    inputSaeson () {
      if (this.seasonCurrent !== this.season) {
        this.program = null
      } else {
        this.program = this.order.productName
      }
    }
  }
}
</script>

