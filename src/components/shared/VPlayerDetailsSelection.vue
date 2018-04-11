<template>
  <div class="details-selects">
          <md-field class="season-select" v-if="order.orderId">
            <label for="season">Season</label>
            <md-select name="season" id="season" v-model="seasonLoc">
              <md-option v-for="s in seasons" :value="s" :key="s">{{ s }}</md-option>
            </md-select>
          </md-field>
          <md-field v-if="order.orderId">
            <label for="program">Program</label>
            <md-select name="program" id="program" v-model="programLoc">
              <md-option v-for="p in programs" :value="p" :key="p">{{ p }}</md-option>
            </md-select>
          </md-field>
        </div>
</template>
<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    orders: Array
  },
  data () {
    return {
      seasonLoc: null,
      programLoc: null
    }
  },
  watch: {
    programLoc () {
      this.selectOrder({
        season: this.season,
        program: this.program
      })
    },
    order () {
      this.seasonLoc = this.order.season
      this.programLoc = this.order.productName
    }
  },
  computed: {
    ...mapState('playerModule', {
      season: 'season',
      program: 'program'
    }),
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
      if (this.seasonLoc) {
        let set = new Set()
        this.orders.forEach(order => {
          if (this.seasonLoc === order.season) {
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
    })
  }
}
</script>

