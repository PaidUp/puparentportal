<template lang="pug">
md-list-item(@click="click")
  md-avatar(v-if="item.object==='card'")
    img(:src="'/static/pm/' + item.brand + '.svg'")
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

  },
  methods: {
    click () {
      this.$emit('click', this.item)
    }
  }
}
</script>


