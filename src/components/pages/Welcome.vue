<template>
  <div class="welcome-page">
    <div class="title">
      Welcome to PaidUp Felipe.
    </div>
    <div class="title-info">Let's get started by adding a new player</div>
    <md-button class="md-raised md-accent lblue">ADD NEW PLAYER</md-button>
    <img src="@/assets/icons/ico08-01.svg" alt="welcome">
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'

  export default {
    components: {},
    data: function () {
      return {
        showAddCardDialog: false
      }
    },
    methods: {},
    computed: {
      ...mapState('userModule', {
        user: 'user'
      })
    }
  }
</script>
