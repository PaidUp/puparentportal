<template>
  <div class="welcome-page">
    <div class="title">
      Welcome to PaidUp {{user.firstName}}.
    </div>
    <div class="title-info">Let's get started by adding a new player</div>
    <md-button class="md-raised md-accent lblue" to="/players/new">ADD NEW PLAYER</md-button>
    <img src="@/assets/shuttle.svg" alt="welcome" @click="animate()">
    <v-pay-animation :animate="animation" />
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import VPayAnimation from '@/components/shared/VPayAnimation.vue'

  export default {
    components: {
      VPayAnimation
    },
    data: function () {
      return {
        animation: false
      }
    },
    methods: {
      animate: function () {
        const vuewInstance = this
        vuewInstance.animation = true
        setTimeout(function () {
          vuewInstance.animation = false
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
