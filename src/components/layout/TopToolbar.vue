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
    <div class="search-input" v-if="isCoach">
      <md-icon>search</md-icon>
      <input type="text" placeholder="Search">
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
      isCoach () {
        if (this.user && this.user.roles) {
          return this.user.roles.includes('coach')
        }
        return false
      }
    },
    methods: {
      ...mapMutations('uiModule', {
        toggleNavigation: 'toggleNavigation'
      })
    }
  }
</script>

