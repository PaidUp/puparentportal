<template>
  <div class="seasons-cards-page">
    <div class="club-img-box">
      <img :src="mediaUrl" alt="club">
    </div>
    <div class="search-input">
      <md-field>
        <label>Search Seasons</label>
        <md-input v-model="filter"></md-input>
      </md-field>
    </div>
    <div class="cards-layout">
      <md-card md-with-hover class="card-seasons" v-for="season in seasons" :key="season._id">
        <div class="body" @click="to(season)">
          <div class="title">{{ season.name }}</div>
        </div>
        <div class="actions">
          <md-button class="md-icon-button">
            <md-icon>visibility_off</md-icon>
          </md-button>
          <md-menu md-size="small" md-direction="top-start">
            <md-button class="md-icon-button md-accent lblue" md-menu-trigger>
              <md-icon>more_vert</md-icon>
            </md-button>
            <md-menu-content>
              <md-menu-item>
                DELETE
              </md-menu-item>
              <md-menu-item>
                EDIT
              </md-menu-item>
            </md-menu-content>
          </md-menu>
        </div>
      </md-card>
      <div class="add-button-card">
        <md-button class="md-icon-button md-raised md-accent lblue">
          <md-icon>add</md-icon>
        </md-button>
      </div>
    </div>
  </div>

</template>

<script>
  import config from '@/config'
  import { mapActions } from 'vuex'
  export default {
    components: {},
    data: function () {
      return {
        organization: null,
        filter: ''
      }
    },
    computed: {
      mediaUrl () {
        return `${config.media.organization.url}logo/${this.$route.params.id}.png`
      },
      seasons () {
        if (!this.organization || !this.organization.seasons) return []
        else if (!this.filter) return this.organization.seasons
        return this.organization.seasons.filter(season => {
          return season.name.toUpperCase().indexOf(this.filter.toUpperCase()) > -1
        })
      }
    },
    mounted () {
      this.getOrganization(this.$route.params.id).then(org => {
        this.organization = org
      })
    },
    methods: {
      ...mapActions('organizationModule', {
        getOrganization: 'getOrganization'
      }),
      to (season) {
        this.$router.push({
          name: 'clubprograms',
          params: {
            id: this.$route.params.id,
            seasonId: season._id
          }
        })
      }
    }
  }
</script>
