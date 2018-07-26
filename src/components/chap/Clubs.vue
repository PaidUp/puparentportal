<template>
  <div class="clubs-cards-page">
    <div class="search-input">
      <md-field>
        <label>Search Clubs</label>
        <md-input v-model="filter"></md-input>
      </md-field>
    </div>
    <div class="cards-layout">
      <md-card md-with-hover class="card-clubs" v-for="org in filtered" :key="org._id">
        <div class="body" @click="to(org)">
          <img :src="mediaUrl + org._id + '.png'" alt="club" class="club-img">
          <div class="club-name">{{ org.businessName}}</div>
          <div class="title-info">{{ org.city }}</div>
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
                VIEW SCOREBOARD AS
              </md-menu-item>
              <md-menu-item>
                EDIT
              </md-menu-item>
            </md-menu-content>
          </md-menu>
        </div>
      </md-card>
    </div>
  </div>

</template>

<script>
  import config from '@/config'
  import { mapState, mapActions } from 'vuex'
  export default {
    components: {},
    data: function () {
      return {
        filter: '',
        mediaUrl: config.media.organization.url + 'logo/'
      }
    },
    mounted () {
      this.getOrganizations()
    },
    computed: {
      ...mapState('organizationModule', {
        organizations: 'organizations'
      }),
      filtered () {
        if (!this.filter) return this.organizations
        return this.organizations.filter(org => {
          return org.businessName.toUpperCase().indexOf(this.filter.toUpperCase()) > -1
        })
      }
    },
    methods: {
      ...mapActions('organizationModule', {
        getOrganizations: 'getOrganizations'
      }),
      to (org) {
        this.$router.push({
          name: 'seasons',
          params: { id: org._id }
        })
      }
    }
  }
</script>
