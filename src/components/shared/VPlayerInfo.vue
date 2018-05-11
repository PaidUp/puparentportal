<template lang="pug">
  .v-player-info
    md-avatar
      img(:src="avatarUrl")
    .name.md-title {{player.firstName}} {{player.lastName}}
    .team.md-subheading {{ player.organizationName }}
    md-button.md-primary(@click="editPlayerDialog = true") Edit
    EditPlayerDialog(:showDialog="editPlayerDialog")
</template>

<script>
  import config from '@/config'
  import EditPlayerDialog from '@/components/shared/EditPlayerDialog.vue'
  export default {
    components: {
      EditPlayerDialog
    },
    data () {
      return {
        editPlayerDialog: false
      }
    },
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

