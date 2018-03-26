<template>
  <div class="v-player-info">
    <md-avatar>
      <img src="@/assets/avatar.jpg" />
    </md-avatar>
    <div class="name md-title">{{user.name}}</div>
    <div class="team md-subheading">{{user.team}}</div>
    <md-button class="md-primary">Edit</md-button>
  </div>
</template>

<script>
  export default {
    props: {
      user: Object
    },
    computed: {
      avatarUrl: function () {
        return '/assets/' + this.user.avatar
      }
    }
  }
</script>

