<template>
  <div class="top-toolbar" >
    <md-button class="md-icon-button md-primary menu-icon" @click="(toggleNavigation(!showNavigation))">
      <md-icon>menu</md-icon>
    </md-button>
    <div class="logo">
      <router-link to="/">
        <img src="@/assets/app-logo-white.svg" />
      </router-link>
    </div>
    <div class="search-input" v-if="isRole('chap')">
      <md-icon>search</md-icon>
      <input type="text" placeholder="Search" @keyup.enter="search" v-model="criteria">
      <md-icon v-show="valid">check</md-icon>
    </div>
    <div>
      <md-button class="logout-btn-top" to="/logout">LOGOUT</md-button>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    data: function () {
      return {
        criteria: '',
        placeholder: 'placeholder'
      }
    },
    computed: {
      ...mapState('userModule', {
        user: 'user'
      }),
      ...mapState('uiModule', {
        showNavigation: 'showNavigation'
      }),
      valid () {
        return this.criteria.length > 4
      }
    },
    methods: {
      ...mapMutations('uiModule', {
        toggleNavigation: 'toggleNavigation'
      }),
      isRole (role) {
        if (this.user && this.user.roles) {
          return this.user.roles.indexOf(role) > -1
        }
        return false
      },
      search () {
        this.$router.push(`/search?criteria=${encodeURI(this.criteria)}`)
      }
    }
  }
</script>

