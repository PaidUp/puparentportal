<template lang="pug">
md-list-item(md-expand, :md-expanded.sync="expand")
  span.md-list-item-text.ca1.bold Player Payment History
  md-list(slot="md-expand" v-if="beneficiaries")
    pu-item(:item="item" v-for="item in items" :key="item.id")
    md-list-item(v-if="false" to="/players/new")
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
    },
    expanded: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      expand: this.expanded
    }
  },
  computed: {
    items () {
      return this.beneficiaries.map(ele => {
        return {
          id: ele._id,
          to: '/players/' + ele._id,
          title: `${ele.firstName} ${ele.lastName}`,
          description: ele.organizationName,
          notification: 0
        }
      })
    }
  },
  methods: {
  }
}
</script>
