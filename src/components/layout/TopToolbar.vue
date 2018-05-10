<template>
  <div class="top-toolbar">
     <md-button class="md-icon-button md-primary menu-icon" @click="toggleNavigation">
        <md-icon>menu</md-icon>
      </md-button>
    <div class="logo">
      <router-link to="/">
        <img src="@/assets/app-logo-white.svg" />
      </router-link>
    </div>
    <div class="search-input">
      <md-icon>search</md-icon>
      <input type="text" placeholder="Search">
    </div>
    <div>&nbsp;</div>
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
      ...mapState('uiModule', {
        showNavigation: 'showNavigation'
      })
    },
    methods: {
      ...mapMutations('uiModule', {
        toggleNavigation: 'toggleNavigation'
      })
    }
  }
</script>

