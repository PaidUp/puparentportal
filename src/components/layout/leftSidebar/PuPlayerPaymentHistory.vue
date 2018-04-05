<template lang="pug">
md-list-item(md-expand)
  span.md-list-item-text.ca1.bold Player Payment History
  md-list(slot="md-expand" v-if="beneficiaries")
    pu-item(:item="item" to="/players/1" v-for="item in items" :key="item.id")
    md-list-item(@click="click")
      md-icon.add-icon add
      .md-list-item-text
        div Add New Player
</template>
<script>
import PuItem from './PuItem.vue'

export default {
  components: { PuItem },
  props: {
    beneficiaries: {
      type: Array,
      require: true
    }
  },
  computed: {
    items () {
      return this.beneficiaries.map(ele => {
        return {
          id: ele._id,
          to: '/players/1',
          title: `${ele.firstName} ${ele.lastName}`,
          description: ele.organizationName,
          notification: 2
        }
      })
    }
  },
  methods: {
    click () {
      console.log('click')
    }
  }
}
</script>
