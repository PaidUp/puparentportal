<template lang="pug">
md-list-item(md-expand)
  span.md-list-item-text.ca1.bold Pay New Invoice
  md-list(slot="md-expand")
    pu-item(:item="item" :to="item.to" v-for="item in items" :key="item.id")
    md-list-item(v-if="false" @click="click")
      md-icon.add-icon add
      .md-list-item-text
        div Make New Payment(s)
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
          to: '/payments/' + ele._id,
          title: `${ele.firstName} ${ele.lastName}`,
          description: ele.organizationName,
          notification: 2
        }
      })
    }
  },
  methods: {
    click () {
      this.$router.push('/payments/new')
    }
  }
}
</script>
