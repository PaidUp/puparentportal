<template lang="pug">
  .details-selects
    md-field(v-if="season")
      label(for="season") Season
      md-select(name="season" id="season" v-model="season" @input="inputSaeson"  @click="clickSaeson")
        md-option(v-for="s in seasons" :value="s._id" :key="s._id") {{ s.name }}
    md-field(v-if="program")
      label(for="program") Program
      md-select(name="program" id="program" v-model="program")
        md-option(v-for="p in programs" :value="p" :key="p") {{ p.split('|')[1] }}
</template>
<script>
import { mapState } from 'vuex'

export default {
  props: {
  },
  data () {
    return {
      seasonCurrent: null,
      season: null,
      seasons: null,
      program: null
    }
  },
  mounted () {
    this.getSeasons()
    if (this.seasons && this.seasons.length) this.season = this.seasons[this.seasons.length - 1]._id
  },
  watch: {
    allInvoices () {
      this.getSeasons()
      if (this.seasons && this.seasons.length) this.season = this.seasons[this.seasons.length - 1]._id
    },
    allCredits () {
      this.getSeasons()
      if (this.seasons && this.seasons.length) this.season = this.seasons[this.seasons.length - 1]._id
    },
    season () {
      if (this.season) {
        this.$emit('selectSeason', this.season)
      }
    },
    programs () {
      setTimeout(() => {
        if (this.programs && this.programs.length) this.program = this.programs[this.programs.length - 1]
      }, 100)
    },
    program () {
      this.$emit('selectProgram', this.program)
    }
  },
  computed: {
    ...mapState('playerModule', {
      organization: 'organization',
      allInvoices: 'allInvoices',
      allCredits: 'allCredits'
    }),
    programs () {
      this.program = null
      let set = new Set()
      this.allInvoices.concat(this.allCredits).forEach(inv => {
        if (this.season === inv.season) {
          set.add(inv.productId + '|' + inv.productName)
        }
      })
      return Array.from(set)
    }
  },
  methods: {
    getSeasons () {
      this.seasons = this.organization.seasons.filter(season => {
        return this.allInvoices.concat(this.allCredits).some(inv => {
          return inv.season === season._id
        })
      }).sort((eleA, eleB) => {
        return new Date(eleA.date).getTime() - new Date(eleB.date).getTime()
      })
    },
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

