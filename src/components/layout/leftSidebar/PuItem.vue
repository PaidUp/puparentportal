<template lang="pug">
md-list-item(:to="item.to")
  md-icon(v-if="!item.avatar" class="md-size-2x ca1") account_circle
  md-avatar.md-large(v-if="item.avatar")
    img(:src="item.avatar")
  .md-list-item-text
    div
      span {{ item.title }}
      br
      span.caption {{ item.description }}
  span.notification-number(v-if="item.notification") {{ item.notification }}
</template>
<script>
// import config from '@/config'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    avatarUrl: function () {
      return ''
    }
  }
}
</script>
