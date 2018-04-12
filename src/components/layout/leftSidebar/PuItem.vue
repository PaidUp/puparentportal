<template lang="pug">
md-list-item(:to="item.to")
  md-avatar
    img(:src="avatarUrl")
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
  computed: {
    avatarUrl: function () {
      return this.item.avatar || config.media.beneficiary.url + 'default.png'
    }
  }
}
</script>


