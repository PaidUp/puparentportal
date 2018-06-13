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
      <md-select v-model="program" placeholder="Program">
        <md-option v-for="option in programs" :key="option.id" :value="option.id">{{option.name}}</md-option>
      </md-select>
    </md-field>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: {
    items: Object
  },
  data () {
    return {
      season: null,
      program: null
    }
  },
  computed: {
    ...mapState('organizationModule', {
      'organization': 'organization'
    }),
    ...mapState('userModule', {
      'user': 'user'
    }),
    seasons () {
      if (this.organization) {
        return this.organization.seasons.sort((orgA, orgB) => {
          return new Date(orgA.date).getTime() - new Date(orgB.date).getTime()
        })
      }
      return []
    },
    programs () {
      if (!this.items) return []
      let result = []
      for (let key in this.items) {
        result.push(this.items[key])
      }
      return result
    }
  },
  methods: {
    ...mapActions('organizationModule', {
      loadOrganization: 'loadOrganization'
    })
  },
  watch: {
    user () {
      if (this.user && this.user.organizationId) this.loadOrganization(this.user.organizationId)
    },
    organization () {
      this.season = this.seasons[this.seasons.length - 1]._id
      this.$emit('selectSeason', this.season)
    },
    season () {
      this.program = null
      this.$emit('selectSeason', this.season)
    },
    program () {
      this.$emit('selectProgram', this.program)
    }
  },
  mounted () {
    if (this.user && this.user.organizationId) {
      this.loadOrganization(this.user.organizationId)
    }
  }
}
</script>

