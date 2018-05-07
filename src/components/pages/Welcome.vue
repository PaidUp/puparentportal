<template>
  <div class="welcome-page">
    <div class="title">
      Welcome to PaidUp Felipe.
    </div>
    <div class="title-info">Let's get started by adding a new player</div>
    <md-button class="md-raised md-accent lblue">ADD NEW PLAYER</md-button>
    <img src="@/assets/icons/ico08-01.svg" alt="welcome" @click="startPayAnimation=true">
    <VPayAnimation :startTrigger="startPayAnimation" :callback="exCallback"/>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  import VPayAnimation from '@/components/shared/VPayAnimation.vue'

  export default {
    components: {
      VPayAnimation
    },
    data: function () {
      return {
        startPayAnimation: false
      }
    },
    methods: {
      exCallback: function () {
        console.log('ANIMATION COMPLETED')
      }
    },
    computed: {
      ...mapState('userModule', {
        user: 'user'
      })
    }
  }
</script>
