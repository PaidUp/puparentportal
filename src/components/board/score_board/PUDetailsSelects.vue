<template>
  <div class="details-selects">
    <md-field v-if="season">
      <label>Season</label>
      <md-select v-model="season" placeholder="Season">
        <md-option v-for="option in seasons" :key="option._id" :value="option._id">{{option.name}}</md-option>
      </md-select>
    </md-field>
    <md-field v-if="season">
      <label>Program</label>
      <md-select v-model="program" @md-selected="setProgram" placeholder="Program">
        <md-option value=""> All </md-option>
        <md-option v-for="option in programs" :key="option.id" :value="option.id">{{option.name}}</md-option>
      </md-select>
    </md-field>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      season: null,
      program: ''
    }
  },
  computed: {
    ...mapState('scoreboardModule', {
      items: 'items',
      programs: 'programs',
      playerSelected: 'playerSelected',
      programSelected: 'programSelected',
      organization: 'organization'
    }),
    seasons () {
      if (this.organization) {
        return this.organization.seasons.sort((orgA, orgB) => {
          return new Date(orgA.date).getTime() - new Date(orgB.date).getTime()
        })
      }
      return []
    }
  },
  methods: {
    ...mapMutations('scoreboardModule', {
      setPlayerSelected: 'setPlayerSelected',
      setProgramSelected: 'setProgramSelected',
      setSeasonSelected: 'setSeasonSelected'
    }),
    setProgram (id) {
      this.setProgramSelected(id)
    }
  },
  watch: {
    organization () {
      this.season = this.seasons[this.seasons.length - 1]._id
    },
    season () {
      this.program = null
      this.setSeasonSelected(this.season)
    },
    programSelected () {
      this.program = this.programSelected
      this.setPlayerSelected()
    }
  }
}
</script>

