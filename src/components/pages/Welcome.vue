<template>
  <div class="welcome-page">
    <div class="title">
      Welcome to PaidUp Felipe.
    </div>
    <div class="title-info">Let's get started by adding a new player</div>
    <md-button class="md-raised md-accent lblue">ADD NEW PLAYER</md-button>
    <img src="@/assets/icons/ico08-01.svg" alt="welcome" @click="animate()">
    <VPayAnimation :start="startPayAnimation" :stop="stopPayAnimation"/>
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
        startPayAnimation: false,
        stopPayAnimation: false
      }
    },
    methods: {
      animate: function () {
        console.log('ANIMATION START')
        const vuewInstance = this
        vuewInstance.startPayAnimation = true
        setTimeout(function () {
          console.log('ANIMATION ENDED')
          vuewInstance.stopPayAnimation = true
        }, 5000)
      }
    },
    computed: {
      ...mapState('userModule', {
        user: 'user'
      })
    }
  }
</script>
