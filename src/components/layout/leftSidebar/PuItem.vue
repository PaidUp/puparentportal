<template lang="pug">
md-list-item(:to="item.to")
  md-avatar.md-size-c(v-if="showAvatar")
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
import config from '@/config'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      showAvatar: true
    }
  },
  computed: {
    avatar () {
      return `${config.media.beneficiary.url}avatar/${this.item.id}.png?a=${Math.random()}`
    }
  },
  watch: {
    item () {
      this.showAvatar = true
    }
  }
}
</script>
