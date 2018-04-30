<template lang="pug">
md-list-item()
  md-avatar(v-if="item.object==='card'")
    img(src="avatarUrl")
  md-avatar.md-avatar-icon.md-accent(v-if="item.object==='bank_account'")
    md-icon account_balance
  .md-list-item-text
    div
      span {{ title }}
      br
      span.caption {{ description }}
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
    title () {
      if (this.item.object === 'card') return this.item.name
      if (this.item.object === 'bank_account') return this.item.bank_name
      return ''
    },
    description () {
      if (this.item.object === 'card') return `${this.item.brand}••••${this.item.last4}`
      if (this.item.object === 'bank_account') return `Account••••${this.item.last4}`
      return ''
    }

  }
}
</script>


