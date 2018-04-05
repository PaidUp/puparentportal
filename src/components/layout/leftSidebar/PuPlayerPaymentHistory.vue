<template lang="pug">
md-list-item(md-expand)
  span.md-list-item-text.ca1.bold Player Payment History
  md-list(slot="md-expand")
    pu-item(:beneficiary="beneficiaries[0]" to="/players/1")
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
  methods: {
    click () {
      console.log('click')
    }
  }
}
</script>
