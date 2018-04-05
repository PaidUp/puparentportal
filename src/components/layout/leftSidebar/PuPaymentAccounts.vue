<template lang="pug">
md-list-item(md-expand)
  span.md-list-item-text.ca1.bold Payment Accounts
  md-list(slot="md-expand")
    pu-item(:item="item" :to="item.to" v-for="item in cards" :key="item.id")
    pu-item-account(:item="item" :to="item.to" v-for="item in banks" :key="item.id")
    md-list-item
      md-icon.add-icon add
      .md-list-item-text
        div Add New Card
    md-list-item
      md-icon.add-icon add
      .md-list-item-text
        div Add New Bank
</template>
<script>
import PuItem from './PuItem.vue'
import PuItemAccount from './PuItemAccount.vue'

export default {
  components: { PuItem, PuItemAccount },
  computed: {
    cards () {
      return [
        {
          id: 'ele._id',
          to: '/players/1',
          title: 'Felipe Fernades',
          description: 'Visa****1111'
        }
      ]
    },
    banks () {
      return [
        {
          id: 'ele._id1',
          to: '/players/1',
          title: `Bank of America`,
          description: 'Account 2411'
        },
        {
          id: 'ele._id2',
          to: '/players/1',
          title: `Citibank`,
          description: 'Account 2411'
        }
      ]
    }
  }
}
</script>

