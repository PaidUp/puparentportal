<template>
  <div class="v-player-info">
    <md-avatar>
      <img src="@/assets/avatar.jpg" />
    </md-avatar>
    <div class="name md-title">{{player.firstName}} {{player.lastName}}</div>
    <div class="team md-subheading">team</div>
    <md-button class="md-primary">Edit</md-button>
  </div>
</template>

<script>
  export default {
    props: {
      player: Object,
      team: Object
    },
    computed: {
      avatarUrl: function () {
        return '/assets/'
      }
    }
  }
</script>

