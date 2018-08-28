<template lang="pug">
md-list-item(md-expand :md-expanded.sync="expand")
  span.md-list-item-text.ca1.bold Make/Authorize Payments For
  md-list(slot="md-expand")
    pu-item(:item="item" :to="item.to" v-for="item in items" :key="item.id")
    md-list-item(to="/players/new")
      md-icon.add-icon add
      .md-list-item-text
        div Add New Player
    md-list-item(v-if="false" @click="click")
      md-icon.add-icon add
      .md-list-item-text
        div Make New Payment(s)
</template>
<script>
import PuItem from './PuItem.vue'

export default {
  components: { PuItem },
  data () {
    return {
      expand: this.expanded
    }
  },
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
  computed: {
    items () {
      return this.beneficiaries.map(ele => {
        return {
          id: ele._id,
          to: '/payments/' + ele._id,
          title: `${ele.firstName} ${ele.lastName}`,
          description: ele.organizationName,
          notification: ele.numPreorders
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
