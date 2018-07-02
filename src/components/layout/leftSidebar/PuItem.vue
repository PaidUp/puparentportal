<template lang="pug">
md-list-item(:to="item.to")
  md-avatar.md-large(v-if="showAvatar")
    img(:src="avatar" @error="showAvatar = false")
  md-icon(v-else class="md-size-2x ca1") account_circle  
  .md-list-item-text
    div
      span {{ item.title }}
      br
      span.caption {{ item.description }}
  span.notification-number(v-if="item.notification") {{ item.notification }}
</template>
<script>
import { mapActions } from 'vuex'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      avatar: null,
      showAvatar: true
    }
  },
  mounted () {
    this.loadAvatar()
  },
  watch: {
    item () {
      this.loadAvatar()
    }
  },
  methods: {
    ...mapActions('playerModule', {
      avatarUrl: 'avatarUrl'
    }),
    loadAvatar () {
      this.avatarUrl(this.item.id).then(url => {
        this.avatar = url
      })
    }
  }
}
</script>
