<template lang="pug">
  .common-player-info
    .with-menu-box
      div.player-info
        md-icon(v-if="!player.avatar" class="md-size-3x ca1") account_circle
        md-avatar.md-large(v-if="player.avatar")
          img(:src="player.avatar")
        .name.md-title {{player.firstName}} {{player.lastName}}
        .team.md-subheading {{ player.organizationName }}
      md-menu(md-size="small" md-direction="bottom-start")
        md-button(md-menu-trigger class="md-icon-button md-raised md-accent md-dense lblue")
          md-icon menu
        md-menu-content.custom-menu-content
          md-menu-item(:to="to") MAKE NEW PAYMENT(S)
          md-menu-item(@click="editPlayerDialog = true") EDIT PLAYER
    edit-player-dialog(:showDialog="editPlayerDialog" :numInvoices="numInvoices" :player="player" @close="editPlayerDialog = false")
</template>

<script>
  // import config from '@/config'
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
      },
      numInvoices: {
        type: Number,
        required: true
      }
    },
    computed: {
      avatarUrl () {
        // return this.player.avatar || `/static/img/user.svg`
        return ''
      },
      to () {
        return '/payments/' + this.player._id
      }
    }
  }
</script>

