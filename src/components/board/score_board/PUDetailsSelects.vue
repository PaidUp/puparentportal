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
      <md-select v-model="movie1" placeholder="Program">
        <md-option value="godfather">Example Sel</md-option>
      </md-select>
    </md-field>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      season: null,
      movie1: ''
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
        return this.organization.seasons
      }
    }
  },
  methods: {
    ...mapActions('organizationModule', {
      loadOrganization: 'loadOrganization'
    })
  },
  watch: {
    user () {
      if (this.user) this.loadOrganization(this.user.organizationId)
    },
    seasons () {
      console.log('this.seasons[this.seasons.length - 1]:', this.seasons[this.seasons.length - 1]._id)
      this.season = this.seasons[this.seasons.length - 1]._id
    }
  },
  mounted () {
    if (this.user) {
      this.loadOrganization(this.user.organizationId)
    }
  }
}
</script>

