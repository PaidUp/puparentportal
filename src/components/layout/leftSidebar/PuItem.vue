<template lang="pug">
md-list-item(:to="to")
  md-avatar
    img(src="@/assets/avatar.jpg")
  .md-list-item-text
    div
      span {{ name }}
      br
      span.caption {{ beneficiary.organizationName }}
  span.notification-number 9
</template>
<script>
export default {
  props: {
    beneficiary: {
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
      return this.beneficiary.firstName + ' ' + this.beneficiary.lastName
    }
  }
}
</script>


