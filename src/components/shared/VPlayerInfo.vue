<template>
  <div class="v-player-info">
    <md-avatar>
      <img :src="avatarUrl" />
    </md-avatar>
    <div class="name md-title">{{player.firstName}} {{player.lastName}}</div>
    <div class="team md-subheading">team</div>
    <md-button class="md-primary">Edit</md-button>
  </div>
</template>

<script>
  import config from '@/config'
  export default {
    props: {
      player: Object,
      team: Object
    },
    computed: {
      avatarUrl: function () {
        return this.player.avatar || config.media.beneficiary.url + 'default.png'
      }
    }
  }
</script>

