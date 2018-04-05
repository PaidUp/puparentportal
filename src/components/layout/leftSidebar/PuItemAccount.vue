<template lang="pug">
md-list-item(:to="to")
  md-avatar.md-avatar-icon.md-accent
    md-icon account_balance
  .md-list-item-text
    div
      span {{ item.title }}
      br
      span.caption {{ item.description }}
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    to: {
      type: String,
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


