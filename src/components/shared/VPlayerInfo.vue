<template lang="pug">
  .v-player-info
    md-avatar
      img(:src="avatarUrl")
    .name.md-title {{player.firstName}} {{player.lastName}}
    .team.md-subheading {{ player.organizationName }}
    md-button.md-primary Edit
</template>

<script>
  import config from '@/config'
  export default {
    props: {
      player: {
        type: Object,
        required: true
      }
    },
    computed: {
      avatarUrl: function () {
        return this.player.avatar || config.media.beneficiary.url + 'default.png'
      }
    }
  }
</script>

