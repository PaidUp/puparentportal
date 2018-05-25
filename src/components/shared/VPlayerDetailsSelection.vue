<template lang="pug">
  .details-selects
    md-field(v-if="season")
      label(for="season") Season
      md-select(name="season" id="season" v-model="season" @input="inputSaeson"  @click="clickSaeson")
        md-option(v-for="s in seasons" :value="s" :key="s") {{ s }}
    md-field(v-if="season")
      label(for="program") Program
      md-select(name="program" id="program" v-model="program")
        md-option(v-for="p in programs" :value="p" :key="p") {{ p.split('|')[1] }}
</template>
<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    invoices: Array
  },
  data () {
    return {
      seasonCurrent: null,
      season: null,
      program: null
    }
  },
  mounted () {

  },
  watch: {
    invoices () {
      if (this.invoices.length && !this.season && !this.program) {
        let inv = this.invoices[this.invoices.length - 1]
        this.season = inv.season
        this.program = inv.productId + '|' + inv.productName
      }
    },
    season () {
      this.setSeason(this.season)
    },
    program () {
      this.setProgram(this.program)
    }
  },
  computed: {
    seasons () {
      let set = new Set()
      this.invoices.forEach(inv => {
        set.add(inv.season)
      })
      return Array.from(set)
    },
    programs () {
      if (this.season) {
        let set = new Set()
        this.invoices.forEach(inv => {
          if (this.season === inv.season) {
            set.add(inv.productId + '|' + inv.productName)
          }
        })
        return Array.from(set)
      }
      return []
    }
  },
  methods: {
    ...mapMutations('playerModule', {
      setSeason: 'setSeason',
      setProgram: 'setProgram'
    }),
    clickSaeson () {
      this.seasonCurrent = this.season
    },
    inputSaeson () {
      if (this.seasonCurrent !== this.season) {
        this.program = null
      } else {
        this.program = this.invoice.productName
      }
    }
  }
}
</script>

