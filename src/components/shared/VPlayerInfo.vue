<template lang="pug">
  .common-player-info
    .with-menu-box
      div.player-info
        md-avatar.md-large(v-if="showAvatar")
          img(:src="avatar" @error="showAvatar = false")
        md-icon(v-else class="md-size-3x ca1") account_circle        
        .name.md-title {{player.firstName}} {{player.lastName}}
        .team.md-subheading {{ player.organizationName }}
      md-menu(md-size="small" md-direction="bottom-start")
        md-button(md-menu-trigger class="md-icon-button md-raised md-accent md-dense lblue")
          md-icon menu
        md-menu-content.custom-menu-content
          md-menu-item(:to="to") MAKE NEW PAYMENT(S)
          md-menu-item(@click="editPlayerDialog = true") EDIT PLAYER
    edit-player-dialog(:showDialog="editPlayerDialog" @avatarChanged="setAvatar" :numInvoices="numInvoices" :player="player" @close="editPlayerDialog = false")
</template>

<script>
  import EditPlayerDialog from '@/components/shared/EditPlayerDialog.vue'
  import { mapActions } from 'vuex'
  export default {
    components: {
      EditPlayerDialog
    },
    data () {
      return {
        editPlayerDialog: false,
        avatar: null,
        showAvatar: true
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
    mounted () {
      if (this.player) {
        this.avatarUrl(this.player._id).then(url => {
          this.avatar = url
        })
      }
    },
    methods: {
      ...mapActions('playerModule', {
        avatarUrl: 'avatarUrl'
      }),
      setAvatar (url) {
        this.avatar = url
        this.$emit('avatarChanged', url)
      }
    },
    computed: {
      to () {
        return '/payments/' + this.player._id
      }
    }
  }
</script>

