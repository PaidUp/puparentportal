<template lang="pug">
md-list-item(:to="item.to")
  md-avatar
    img(src="@/assets/avatar.jpg")
  .md-list-item-text
    div
      span {{ item.title }}
      br
      span.caption {{ item.description }}
  span.notification-number(v-if="item.notification") {{ item.notification }}
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    name () {
      return ''
    }
  }
}
</script>


