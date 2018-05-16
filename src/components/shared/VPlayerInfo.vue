<template lang="pug">
  .common-player-info
    .with-menu-box
      div.player-info
        md-avatar.md-large
          img(:src="avatarUrl")
        .name.md-title {{player.firstName}} {{player.lastName}}
        .team.md-subheading {{ player.organizationName }}
      md-menu(md-size="small" md-direction="bottom-start")
        md-button(md-menu-trigger class="md-icon-button md-raised md-accent md-dense lblue")
          md-icon menu
        md-menu-content.custom-menu-content
          md-menu-item MAKE NEW PAYMENT(S)
          md-menu-item(@click="editPlayerDialog = true") EDIT PLAYER
    </md-menu>
      
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

